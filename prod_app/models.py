from django.db import models



# Create your models here.
# from __future__ import unicode_literals

# from django.db import models

# Create your models here.
# from django.db import models

class Cpu(models.Model):

	cID = models.AutoField(primary_key=True)    
	percent_util_cpu = models.FloatField(null= False)
	time_cpu = models.DateTimeField(auto_now_add=True)

class Mem(models.Model):

	mID = models.AutoField(primary_key=True)    
	percent_util_mem = models.FloatField(null= False)
	time_mem  = models.DateTimeField(auto_now_add=True)

class Db(models.Model):

	dID = models.AutoField(primary_key=True)    
	percent_util_db = models.FloatField(null= False)
	time_db  = models.DateTimeField(auto_now_add=True)