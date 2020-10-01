
from django.shortcuts import render
import threading

# Create your views here.
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import *
from .serializers import *
import subprocess
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import threading

def index(request):
    return render(request,'index.html')

def history(request):
    Cpu_lists = Cpu.objects.all().order_by('-time_cpu')[:100]
    Mem_lists = Mem.objects.all().order_by('-time_mem')[:100]
    Db_lists = Db.objects.all().order_by('-time_db')[:100]
    return render(request, 'history.html', {'cpu_lists' : Cpu_lists, 'mem_lists': Mem_lists, 'db_lists':Db_lists} )

cir_arr_cpu = [0,0,0,0]
avg_cpu_util = 0
counter_cpu = 0


def cpu(request):
    process = subprocess.Popen('top -b -n1 | grep %Cpu | awk \'{print 100-$8}\'', 
    shell=True, 
    stdout=subprocess.PIPE, 
    stderr=subprocess.PIPE )
    cpu_util = process.stdout.read()
    print(cpu_util)
    print("\n")

    global counter_cpu
    global avg_cpu_util
    global cir_arr_cpu

    cpu_obj = Cpu.objects.create(percent_util_cpu = float(cpu_util))
    cpu_obj.save()

    cir_arr_cpu[counter_cpu % 4] = float(cpu_util)
    avg_cpu_util = (cir_arr_cpu[0] + cir_arr_cpu[1] + cir_arr_cpu[2] + cir_arr_cpu[3]) / 4
    counter_cpu = counter_cpu + 1

    if float(avg_cpu_util) > 40:                   
        cpu_str = "Cpu Utilization is " + str(float(cpu_util)) + "%" + " on " + cpu_obj.time_cpu.strftime("%d %B,%Y,%H:%M:%S")
        # print(cpu_str)
        mThread = threading.Thread(target=sendmail, args=(cpu_str,))
        mThread.start()
        # sendmail(cpu_str)
    print(cpu_util)
    return HttpResponse(cpu_util)
   

cir_arr_mem = [0,0,0,0]
mem_count = 0
avg_mem = 0

def mem(request):

    process = subprocess.Popen('free | grep Mem | awk \'{print $3/$2 * 100.0}\'',
    shell=True, 
    stdout=subprocess.PIPE, 
    stderr=subprocess.PIPE )
    mem_util = process.stdout.read()
    mem_obj = Mem.objects.create(percent_util_mem = float(mem_util))
    mem_obj.save()

    global cir_arr_mem 
    global mem_count 
    global avg_mem 
    
    cir_arr_mem[mem_count % 4] = float(mem_util)
    avg_mem = (cir_arr_mem[0] + cir_arr_mem[1] + cir_arr_mem[2] + cir_arr_mem[3]) / 4
    mem_count = mem_count + 1
    if float(avg_mem) > 10:
        mem_str = "Mem Utilization is " + str(float(mem_util)) + "%" + " on " + mem_obj.time_mem.strftime("%d %B,%Y,%H:%M:%S")
        # print(mem_str)
        mThread = threading.Thread(target=sendmail, args=(mem_str,))
        mThread.start()
        # sendmail(mem_str)
    print(mem_util)
    return HttpResponse(mem_util)


cir_arr_db = [0,0,0,0]
db_count = 0
avg_db = 0

def db(request):
    #TO DO: Returns a random number that may or may not be db trend :)
    #we have to find command for this

    import random
    db_util = random.randint(20,90)
    db_obj = Db.objects.create(percent_util_db =db_util)
    db_obj.save()

    global cir_arr_db
    global db_count
    global avg_db 
    cir_arr_db[db_count % 4] = float(db_util)
    avg_db = (cir_arr_db[0] + cir_arr_db[1] + cir_arr_db[2] + cir_arr_db[3]) / 4
    db_count = db_count + 1

    if db_util >=10:
        db_str = "Database Utilization is " + str(float(db_util)) + "%" + " on " + db_obj.time_db.strftime("%d %B,%Y,%H:%M:%S")
        print(db_str)

        mThread = threading.Thread(target=sendmail, args=(db_str,))
        mThread.start()

        # sendmail(db_str)
    print(db_util)
    return HttpResponse(db_util)
    
def maxcpu(request):
    process = subprocess.Popen('ps -eo pid,%cpu,cmd --sort=-%cpu | head -n 6 | tail -n 5', 
    shell=True, 
    stdout=subprocess.PIPE, 
    stderr=subprocess.PIPE )
    arr_cpu = []
    for a in process.stdout:
        json_str = {}         
        a=a.decode("utf-8") 
        stri = a.split()
        json_str['Process ID'] = stri[0]
        json_str['Process Name'] = stri[2]
        json_str['% CPU Utilization'] = stri[1]
        arr_cpu.append(json_str)
    return JsonResponse(arr_cpu,safe=False)


def maxmem(request):
    #TO DO: Return the json object in response
    #filter the command to get the required things
    process = subprocess.Popen('ps -eo pid,%mem,cmd --sort=-%mem | head -n 6 | tail -n 5', 
    shell=True, 
    stdout=subprocess.PIPE, 
    stderr=subprocess.PIPE )
    arr_mem = []
    for a in process.stdout:
        json_str = {}
        a=a.decode("utf-8")
        stri = a.split();
        json_str['Process ID'] = stri[0]
        json_str['Process Name'] = stri[2]
        json_str['% Memory Utilization'] = stri[1]
        arr_mem.append(json_str)
    return JsonResponse(arr_mem,safe=False)


def GetCpuView(request):
    lists = Cpu.objects.all()
 
    serializer = CpuSerializer(lists,many=True)
    return JsonResponse(serializer.data,safe=False)


def GetMemView(request):
    lists = Mem.objects.all()
   
    serializer = MemSerializer(lists,many=True)
    return JsonResponse(serializer.data,safe=False)



def sendmail(msg):
    import time
    time.sleep(2)
    print('I have waited for 2 seconds and the message is: '+msg)
    subject_template_name = 'Prod Alert';
    fromaddr = "mishijain1605@gmail.com"
    toaddr = "mishijain1605@gmail.com"
    mail = MIMEMultipart()
    mail['From'] = fromaddr
    mail['To'] = toaddr
    mail['Subject'] = subject_template_name
    body = "You are recieving this email because the system has observed that " + msg 
    mail.attach(MIMEText(body, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(fromaddr, 'mishi@2020')
    text = mail.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()
    return Response("Mail sent")
   

