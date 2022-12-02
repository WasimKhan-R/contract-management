from django.db import models

# Create your models here.

class Loginmaster(models.Model):
    companyid = models.IntegerField()
    loginid = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=100)
    normalpwd = models.CharField(max_length=50)
    user_role = models.IntegerField()
    user_permission = models.CharField(max_length=250)
    isactive = models.IntegerField()
    creationdate = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'loginmaster'

class States(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    isactive = models.IntegerField()
    creationdate = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'states'

class Clientmaster(models.Model):
    loginid = models.IntegerField()
    client_company_name = models.CharField(max_length=50)
    pan_no = models.CharField(max_length=10)
    registration_no = models.CharField(max_length=50)
    gst_no = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    contact_person_name = models.CharField(max_length=300, blank=True, null=True)
    contact_person_mobileno = models.CharField(max_length=200, blank=True, null=True)
    contact_person_email = models.CharField(max_length=500, blank=True, null=True)
    isactive = models.IntegerField()
    creationdate = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'clientmaster'

class DocTypeMaster(models.Model):
    name = models.CharField(max_length=50)
    isactive = models.IntegerField()
    creationdate = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'doc_type_master'

class ClientDetails(models.Model):
    loginid = models.IntegerField()
    empname = models.CharField(max_length=50)
    empmobile = models.CharField(max_length=50)
    empemailid = models.CharField(max_length=50)
    isactive = models.IntegerField()
    creationdate = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'client_details'

    
class UserPermissionDetails(models.Model):
    user_permission_id = models.AutoField(primary_key=True)
    permission_id = models.IntegerField()
    login_id = models.IntegerField()
    permission_status = models.CharField(max_length=1)
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'user_permission_details'



