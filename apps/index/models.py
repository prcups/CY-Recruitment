from django.db import models


# Create your models here.
class RcStudent(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=True)
    sex = models.CharField(max_length=10, null=True)
    birthday = models.CharField(max_length=20, null=True)
    phone_number = models.CharField(max_length=20, null=True)
    qq_number = models.CharField(max_length=20, null=True)
    photo = models.CharField(max_length=50, null=True)
    major = models.CharField(max_length=50, null=True)
    subject = models.CharField(max_length=70, null=True)
    intro = models.TextField(null=True)
