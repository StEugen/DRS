from django.contrib import admin
from .models import cabinets, Hardware, Comment

admin.site.register(Comment)
admin.site.register(cabinets)
admin.site.register(Hardware)