from django.shortcuts import render, redirect
from django.urls import reverse
from django.urls import path
from .urls import *
from . import urls
from django.urls import re_path as url
def CheckUserLogin(request):
    # if request.session.get('user_id') is None:
        # print(request.session.get('user_id'))
    return render(request, 'login.html', {})