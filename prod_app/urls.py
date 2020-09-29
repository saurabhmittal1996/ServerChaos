from .views import *
from django.urls import path

urlpatterns = [
    path('maxcpu/', maxcpu, name='home1'),
    path('cpu/', cpu, name='home2'),
    path('mem/', mem, name='home3'),
    path('db/', db, name='home4'),
    path('maxmem/', maxmem, name='home5'),
    path('cpuview/', GetCpuView, name='home6'),
    path('memview/', GetMemView, name='home7'),
    path('', index),
    path('history/', history),

  
]
