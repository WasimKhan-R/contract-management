from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import States, Clientmaster, Loginmaster, DocTypeMaster, ClientDetails, UserPermissionDetails
from datetime import datetime
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import login as auth_login
# Create your views here.
from django.contrib.auth import login as authlogin
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
# import pprint
from django import forms
from pprint import pprint
import random
import hashlib
from contract_app.common import CheckUserLogin


def add_client(request):
    if request.method == 'POST':
        loginid = '1'
        client_company_name = request.POST['client_company_name']
        pan_no = request.POST['pan_no']
        registration_no = request.POST['registration_no']
        gst_no = request.POST['gst_no']
        address = request.POST['address']
        country = request.POST['country']
        state = request.POST['state']
        city = request.POST['city']
        contact_person_name = request.POST['contact_person_name']
        contact_person_email = request.POST['contact_person_email']
        contact_person_mobileno = request.POST['contact_person_mobileno']
        isactive = '1'
        creationdate = datetime.now()
        newclient = Clientmaster(client_company_name=client_company_name, pan_no=pan_no, registration_no=registration_no, gst_no=gst_no, address=address, country=country, state=state, city=city,
                                 contact_person_name=contact_person_name, contact_person_email=contact_person_email, contact_person_mobileno=contact_person_mobileno, loginid=loginid, isactive=isactive, creationdate=creationdate)
        newclient.save()
    statess = States.objects.all()
    context = {
        'statess': statess
    }
    return render(request, 'add_client.html', context)


def Checkclient_company_name(request):
    contact_person_name = request.GET.get("contact_person_name", None)
    res = Clientmaster.objects.filter(
        contact_person_name=contact_person_name).exists()
    # check = res.filter(isactive=1)
    # print(check)
    if str(res) != 'True':
        return HttpResponse("not_taken")
    else:
        return HttpResponse("taken")
    Clientmasterdetails = Clientmaster.objects.filter(isactive=1)
    pass


def client_master(request):
    statess = States.objects.filter(isactive=1)
    Clientmasterdetails = Clientmaster.objects.filter(isactive=1)
    context = {'Clientmasterdetails': Clientmasterdetails, 'statess': statess}
    return render(request, 'client_master.html', context=context)


def edit_client(request, id):
    if request.method == 'POST':
        pi = Clientmaster.objects.get(id=id)
        pi.loginid = '1'
        pi.client_company_name = request.POST['client_company_name']
        pi.pan_no = request.POST['pan_no']
        pi.registration_no = request.POST['registration_no']
        pi.gst_no = request.POST['gst_no']
        pi.address = request.POST['address']
        pi.country = request.POST['country']
        pi.state = request.POST['state']
        pi.city = request.POST['city']
        pi.contact_person_name = request.POST['contact_person_name']
        pi.contact_person_email = request.POST['contact_person_email']
        pi.contact_person_mobileno = request.POST['contact_person_mobileno']
        pi.isactive = '1'
        pi.creationdate = datetime.now()
        pi.save()
        print(pi.save)
    edit_value = Clientmaster.objects.filter(id=id)
    for a in edit_value:
        stateid = a.state
    # statess = States.objects.filter(id=stateid)
    statess = States.objects.all()
    context = {
        'statess': statess,
        'edit_value': edit_value,
    }
    return render(request, 'edit_client.html', context)


def delelteClient(request, id):
    t = Clientmaster.objects.get(id=id)
    t.isactive = 0
    t.save()
    return redirect("client_master")


def index(request):
    return render(request, 'index.html', {})


def login(request):
    if request.session.get('user_id') is not None:
        return redirect("dashboard")
    # else:
        # return redirect("login")
    if request.method == 'POST':
        loginids = request.POST['email']
        normalpwds = request.POST['password']
        employees = Loginmaster.objects.filter(loginid=loginids).exists()
        employeessss = Loginmaster.objects.get(loginid=loginids)
        # print(employeessss.loginid)
        request.session['emailid'] = employeessss.loginid
        request.session['companyid'] = employeessss.companyid
        request.session['user_id'] = employeessss.id
        print(request.session.get('user_id'))
        if (Loginmaster.objects.filter(loginid=loginids, normalpwd=normalpwds)).exists():
            messages.info(request, 'Welcome Back')

            return redirect("dashboard")
    return render(request, 'login.html')


def logout(request):
    del request.session['emailid']
    del request.session['companyid']
    del request.session['user_id']
    # print(request.session.get('user_id'))
    return redirect('login')


def dashboard(request):
    # if request.session.has_key('user_id'):
    if request.session.get('user_id') is None:
        return redirect('login')
        # lv = CheckUserLogin(request)
    return render(request, 'dashboard.html', {})


def employees(request):
    # print(request.session.get('emailid'))
    Loginmasters = Loginmaster.objects.all()
    ClientDetailss = ClientDetails.objects.all()
    context = {
        'Loginmasters': Loginmasters,
        'ClientDetailss': ClientDetailss,
    }
    return render(request, 'employees.html', context)


def edit_employee(request, id):
    ClientDetailss = ClientDetails.objects.filter(loginid=id)
    context = {
        'ClientDetailss': ClientDetailss,
    }
    return render(request, 'edit_employee.html', context)


def repository(request):
    ClientDetailss = Clientmaster.objects.filter(isactive=1)
    context = {
        'ClientDetailss': ClientDetailss,
    }

    # geeks_field = forms.FilePathField(path = "checkpath/")
    #  if (client_name != ""):
    # {
    # client_name = urldecode($client_name);

    # data['clients'] = directory_map("./Companies/$comp_name/$client_name", 1);

    # // echo($client_name);

    # // if(isset($data['compname'])){
    # //     $data['compname'] = $client_name;
    # // }
    # // else{
    # //     $data['compname'] = 0;
    # // }
    # $data['compname'] = $client_name;
    # }
    # else {
    # $data['clients'] = $this->main_model->get_clients_list($this->session->userdata['cid']);
    # $data['compname'] = '';
    # }
    return render(request, 'repository.html', context)


def fileList(request):
    fileList = ""
    docf = 'New folder'
    client_name = 'jioss'
    comp_name = 'jioss'
    if (client_name != ""):
        # client_name = urldecode(client_name)
        if (docf != ""):
            # data = FilePathField("./checkpath/$comp_name/$client_name/$docf", 1);
            pass
        else:
            pass
            # data = directory_map("./checkpath/$comp_name/$client_name", 1);
    # return render(request, 'my_contracts.html', {})


def my_contracts(request):
    return render(request, 'my_contracts.html', {})


def new_contract(request):
    if request.method == 'POST':
        pi = Clientmaster.objects.get(id=id)
        pi.loginid = '1'
        pi.client_company_name = request.POST['client_company_name']
        pi.pan_no = request.POST['pan_no']
        pi.registration_no = request.POST['registration_no']
        pi.gst_no = request.POST['gst_no']
        pi.address = request.POST['address']
        pi.country = request.POST['country']
        pi.state = request.POST['state']
        pi.city = request.POST['city']
        pi.contact_person_name = request.POST['contact_person_name']
        pi.contact_person_email = request.POST['contact_person_email']
        pi.contact_person_mobileno = request.POST['contact_person_mobileno']
        pi.isactive = '1'
        pi.creationdate = datetime.now()
        pi.save()
        print(pi.save)

    DocTypeMasters = DocTypeMaster.objects.filter(isactive=1)
    Clientmasterdetails = Clientmaster.objects.filter(isactive=1)
    context = {'Clientmasterdetails': Clientmasterdetails,
               'DocTypeMasters': DocTypeMasters}

    return render(request, 'new_contract.html', context)


def add_employee(request):
    if request.method == 'POST':
        loginid = request.session.get('companyid')
        empname = request.POST.get("empname", None)
        empemailid = request.POST.get("empemailid", None)
        empmobile = request.POST.get("empmobile", None)
        isactive = '1'
        creationdate = datetime.now()
        addNewEmployee = ClientDetails(loginid=loginid,empname=empname, empemailid=empemailid,empmobile=empmobile,isactive=isactive, creationdate=creationdate)
        addNewEmployee.save()

        roles = request.POST.get("roles", None)
        for role in roles: 
            permission_id = role
            login_id = '1'
            permission_status = '1'
            created_date = datetime.now()
            modified_date = datetime.now()
            AddEmployeeUserPermission = UserPermissionDetails(permission_id=permission_id,login_id=login_id,permission_status=permission_status,created_date=created_date,modified_date=modified_date)
            AddEmployeeUserPermission.save()

        companyid = request.session.get('companyid')
        loginid = request.POST.get("empemailid", None)
        first5letter = loginid[:5]
        conver_string= random.randint(000,999) 
        final_password = first5letter+str(conver_string)
        convert_password_formate = final_password
        # password = hashlib.md5(final_password).hexdigest()
        password =final_password
        normalpwd = convert_password_formate
        user_role= '1'
        isactive = '1'
        creationdate = datetime.now()
        addNewEmployee = Loginmaster(companyid=companyid,loginid=loginid,password=password, normalpwd=normalpwd,user_role=user_role,isactive=isactive, creationdate=creationdate)
        addNewEmployee.save()
        print(addNewEmployee)
    return render(request, 'add_employee.html', {})
