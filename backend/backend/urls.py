"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from data import views
from data.views import (
    LoginView, CommentCreateView, 
    CommentListView, CommentDeleteView, HardwareList, FacultyList, 
    CabinetList, LogoutView
)

router = routers.DefaultRouter()

admin.site.site_header = 'Admin panel'
admin.site.index_title = 'Admin panel'
admin.site.site_title = 'DRS'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name="login"),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/comments/', CommentListView.as_view(), name='list-comment'),
    path('api/comments/create/', CommentCreateView.as_view(), name='create-comment'),
    path('api/comments/<int:pk>/delete', CommentDeleteView.as_view(), name='delete-comment'),
    path('api/hardwarelist/', HardwareList.as_view(), name='list-hardware'),
    path('api/facultylist/', FacultyList.as_view(), name='list-faculty'),
    path('api/cabinetslist/', CabinetList.as_view(), name='list-cabinets')
]
