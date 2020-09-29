from rest_framework import serializers
from .models import *

class CpuSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cpu
    fields = ( 'percent_util_cpu','time_cpu')

class MemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mem
    fields = ( 'percent_util_mem','time_mem')