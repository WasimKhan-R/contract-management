
from django.urls import path
#now import the views.py file into this code
from . import views

from django.contrib.auth import views as auth_view
from contract_app.views import (
    Checkclient_company_name
)
urlpatterns=[
  # path('',views.index,name='home'),
  path('',views.login,name='login'),
  path('logout/',views.logout,name='logout'),
  path('dashboard/',views.dashboard,name='dashboard'),
  
  
  path('client_master/',views.client_master,name='client_master'),
  path('repository/',views.repository,name='repository'),
  
  
  path('my_contracts/',views.my_contracts,name='my_contracts'),
  path('new_contract/',views.new_contract,name='new_contract'),

 path('get/ajax/validate/Checkclient_company_name', views.Checkclient_company_name, name = "validate_nickname"),
  path('add_client/',views.add_client,name='add_client'),
  path('edit_client/<int:id>',views.edit_client,name='edit_client'),
  path('delelteClient/<int:id>',views.delelteClient,name='delelteClient'),


  path('employees/',views.employees,name='employees'),
  path('add_employee/',views.add_employee,name='add_employee'),
  path('edit_employee/<int:id>',views.edit_employee,name='edit_employee'),



]