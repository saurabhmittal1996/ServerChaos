# Generated by Django 3.1.1 on 2020-09-29 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prod_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Db',
            fields=[
                ('dID', models.AutoField(primary_key=True, serialize=False)),
                ('percent_util_db', models.FloatField()),
                ('time_db', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
