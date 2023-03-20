from django.db import models
from django.contrib.auth.models import User


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Hardware(models.Model):
    hardware_name = models.TextField(null=False)
    hardware_number = models.TextField(unique=True, null=False)
    comment = models.TextField(blank=True)
    cabinet = models.ForeignKey('data.cabinets', blank=True, null=True, on_delete=models.DO_NOTHING, related_name='Hardware')


    def __str__(self):
        return self.hardware_name


class Faculty(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class cabinets(models.Model):
    cabinet = models.TextField(unique=True, null=False)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='cabinets')

    def __str__(self):
        return self.cabinet
