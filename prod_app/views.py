from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import *
from .serializers import *
import subprocess
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def index(request):
    return render(request,'index.html')

def history(request):
    Cpu_lists = Cpu.objects.all().order_by('-time_cpu')[:10]
    Mem_lists = Mem.objects.all().order_by('-time_mem')[:10]
    Db_lists = Db.objects.all().order_by('-time_db')[:10]
    return render(request, 'history.html', {'cpu_lists' : Cpu_lists, 'mem_lists': Mem_lists, 'db_lists':Db_lists} )

def cpu(request):
    process = subprocess.Popen('top -b -n1 | grep ^%Cpu | awk \'{print 100-$8}\'', 
    shell=True, 
    stdout=subprocess.PIPE, 
    stderr=subprocess.PIPE )
    cpu_util = process.stdout.read()
    cpu_obj = Cpu.objects.create(percent_util_cpu = float(cpu_util))
    # print type(process.stdout.read())
    cpu_obj.save()
    return HttpResponse(cpu_util)

   

def mem(request):

    process = subprocess.Popen('free | grep Mem | awk \'{print $3/$2 * 100.0}\'',
    shell=True, 
    stdout=subprocess.PIPE, 
    stderr=subprocess.PIPE )
    mem_util = process.stdout.read()
    mem_obj = Mem.objects.create(percent_util_mem = float(mem_util))
    # print type(process.stdout.read())
    mem_obj.save()
    return HttpResponse(mem_util)

  

def db(request):
    #TO DO: Returns a random number that may or may not be db trend :)
    #we have to find command for this

    import random
    db_util = random.randint(20,90)
    db_obj = Db.objects.create(percent_util_db =db_util)
    # print type(process.stdout.read())
    db_obj.save()
    if db_util > 60:
        sendmail()
    return HttpResponse(db_util);
    
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
        json_str['CPU Utilization'] = stri[1]
        json_str['Process Name'] = stri[2]
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
        json_str['Memory Utilization'] = stri[1]
        json_str['Process Name'] = stri[2]
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




def sendmail():
    subject_template_name = 'Prod Alert';
    fromaddr = "mishijain1605@gmail.com"
    toaddr = "mishijain1605@gmail.com"
    mail = MIMEMultipart()
    mail['From'] = fromaddr
    mail['To'] = toaddr
    mail['Subject'] = subject_template_name
    body = "You are recieving this email because the process has utilized maximum cpu"
    mail.attach(MIMEText(body, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(fromaddr, 'mishi@2020')
    text = mail.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()
    # return Response("Mail sent")

