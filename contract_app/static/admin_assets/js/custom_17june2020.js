$(":input").keyup(function () {
        $(this).val($(this).val().replace(/^\s+/, ""));
        });
function upload_file(form_id)
{
    var url=$('#'+form_id).attr("action");
    var data_id=$('#'+form_id).attr('data-id');
    $.ajax({
        type:'POST',
        url:url,
        data:new FormData($("#"+form_id)[0]),
        contentType:false,
        processData:false,
        success: function(data){
          if(data!='0')
            $('#'+data_id).val(data);
          else 
          {
            $('#'+form_id). trigger("reset");
            swal('Warning',"Only JPG And PNG File Allowed",'warning')
          }
        },
        error: function() { 
            swal("Warning","Your Account is Invalid","warning");
        }
});
}
function preview_feature_image() 
{
 document.getElementById('feature_image_preview').innerHTML = '';
var image = document.getElementById("feature_image").value;
document.getElementById("blogimage").value = image;
 var total_file=document.getElementById("feature_image").files.length;
 for(var i=0;i<total_file;i++)
 {
  $('#feature_image_preview').append("<div class='col-md-2'><img class='img-responsive' src='"+URL.createObjectURL(event.target.files[i])+"'></div>");
 }
}
$("#blogedit").click(function (){

var image = $("#image").val();
var title = $("#title").val();
var short_description = $("#short_description").val();
var description = CKEDITOR.instances.description.getData();
var case_type = $("#case_type").val();
var currently_trending = $('input[name="currently_trending"]:checked').val();
var popular_posts = $('input[name="popular_posts"]:checked').val();
var status = $('input[name="status"]:checked').val();
var id = $("#blogid").val();
    if(image=='')
        swal('Warning','Please select image','warning')
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(short_description=='')
        swal('Warning','Please Enter short description','warning')
    else if(description=='')
        swal('Warning','Please Enter description','warning')
    else if(case_type=='')
        swal('Warning','Please select case type','warning')
    else if(currently_trending=='')
        swal('Warning','Please select Currently trending','warning')
    else if(popular_posts=='')
        swal('Warning','Please select popular post','warning')
    else if(status=='')
        swal('Warning','Please select status','warning')
    else 
    {
        data={
            'title':title,
            'case_type':case_type,
            'short_desc':short_description,
            'description':description,
            'image':image,
            'created_by':'admin',
            'status':status,
            'currently_trending':currently_trending,
            'popular_post':popular_posts,
        }
        $.post(BASE_URL+'admin/blog_edit/'+id,data,function(fb){
            if(fb.match('1'))
            {
                swal('Success','Blog Successfully Updated','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Blog Not Uploaded Please Try Again','warning')   
            }
        })
    }

});
$("#edit_lawyer").click(function(){
  var id = $("#lawid").val();
  var name = $("#name").val();
   var email = $("#email").val();
   var mobile = $("#mobile").val();
   var status = $('input[name="status"]:checked').val();
   var city = $("#city").val();
   var address1 = $("#address1").val();
   var portfolio = $("#portfolio").val();
   
   var lat = $("#lat").val();
   var long = $("#long").val();
   var educational = $("#educational").val();
   var experience = $("#experience").val();
   var appointment_charges = $("#appointment_charges").val();
   var call_charges = $("#call_charges").val();
   var membership_number = $("#membership_number").val();
   var firm = $("#firm").val();
   var website = $("#website").val();
   var ac = $('input[name="ac"]:checked').val();
   var court = $('input[name="court"]:checked').val();

   var i = 0;
   var type_of_lawyer = [];
  $('.type_of_lawyer:checked').each(function () {
             type_of_lawyer[i++] = $(this).val();
         });
  var j = 0;
  var languages = [];
  $('.languages:checked').each(function () {
             languages[j++] = $(this).val();
         });
  console.log(languages);
  var k= 0;
  var timeing1 = [];
  $('.allsunday:checked').each(function () {
             timeing1[k++] = $(this).val();
         }); 
  var l =0;
  var timeing2 = [];
  $('.allmonday:checked').each(function () {
             timeing2[l++] = $(this).val();
         });
  var m=0;
  var timeing3 = [];
  $('.alltuesday:checked').each(function () {
             timeing3[m++] = $(this).val();
         });
  var n =0;
  var timeing4 = [];
  $('.allwednesday:checked').each(function () {
             timeing4[n++] = $(this).val();
         });
  var p=0;
  var timeing5 = [];
  $('.allthursday:checked').each(function () {
             timeing5[p++] = $(this).val();
         });
  var q =0;
  var timeing6 = [];
  $('.allfriday:checked').each(function () {
             timeing6[q++] = $(this).val();
         });
  var r = 0;
  var timeing7 = [];
  $('.allsaturday:checked').each(function () {
             timeing7[r++] = $(this).val();
         });
  var image = $("#image").val();
  if(image=='')
        swal('Warning','Please select image','warning')
    else if(name=='')
        swal('Warning','Please Enter name','warning')
    else if(email=='')
        swal('Warning','Please Enter email','warning')
    else if(mobile=='')
        swal('Warning','Please Enter mobile','warning')
    else if(city=='')
        swal('Warning','Please Enter city','warning')
    else if(address1=='')
        swal('Warning','Please Enter address','warning')
    
    else if(lat=='')
        swal('Warning','Please Enter Latitude','warning')
    else if(long=='')
        swal('Warning','Please Enter Longitude','warning')
    else if(educational=='')
        swal('Warning','Please Enter educational qualification','warning')
    else if(experience=='')
        swal('Warning','Please Enter Years of Experience','warning')
    else if(appointment_charges=='')
        swal('Warning','Please Enter Appointment Charges','warning')
    else if(call_charges=='')
        swal('Warning','Please Enter Call Charge','warning')
    else if(membership_number=='')
        swal('Warning','Please Enter Membership Number','warning')
    else if(court=='' || court == 'undefined' || court == null)
        swal('Warning','Please select Court','warning')
    else if(firm=='')
        swal('Warning','Please Enter Name of the Firm','warning')
    else if(ac=='')
        swal('Warning','Please Enter available for Consulting','warning')
    else{
      data={
            'name':name,
            'image':image,
            'email':email,
            'mobile':mobile,
            'city':city,
            'address1':address1,
            'status':status,
            'portfolio':portfolio,
            'lat':lat,
            'long':long,
            'educational':educational,
            'experience':experience,
            'appointment_charges':appointment_charges,
            'call_charges':call_charges,
            'membership_number':membership_number,
            'firm':firm,
            'website':website,
            'ac':ac,
            'court':court,
            'type_of_lawyer':type_of_lawyer,
            'languages':languages,
            'timeing1':timeing1,
            'timeing2':timeing2,
            'timeing3':timeing3,
            'timeing4':timeing4,
            'timeing5':timeing5,
            'timeing6':timeing6,
            'timeing7':timeing7
        }
        $.post(BASE_URL+'admin/lawyers_edit/'+id,data,function(fb){
            console.log(fb);
            
           if(fb.match('1'))
            {    $("#edit_lawyer").attr('disabled',true);
                swal('Success','Lawyer Updated Successfully ','success'); 
                setTimeout(function(){
                   window.location.href = "../lawyers";
                },2000);
            }
            else 
            {     $("#edit_lawyer").attr('disabled',false);
                 swal('Warning','Lawyer Not Updated Please Try Again','warning');   
            }
        })
    }
});

$("#add_lawyer").click(function(){
 var name = $("#name").val();
 var email = $("#email").val();
 var mobile = $("#mobile").val();
 var status = $('input[name="status"]:checked').val();
 var city = $("#city").val();
 var address1 = $("#address1").val();
 var portfolio = $("#portfolio").val();
 var password = $("#password").val();
 var lat = $("#lat").val();
 var long = $("#long").val();
 var educational = $("#educational").val();
 var experience = $("#experience").val();
 var appointment_charges = $("#appointment_charges").val();
 var call_charges = $("#call_charges").val();
 var membership_number = $("#membership_number").val();
 var firm = $("#firm").val();
 var website = $("#website").val();
 var ac = $('input[name="ac"]:checked').val();
 var court = $('input[name="court"]:checked').val();
 var i = 0;
 var type_of_lawyer = [];
$('.type_of_lawyer:checked').each(function () {
           type_of_lawyer[i++] = $(this).val();
       });
var languages = [];
$('.languages:checked').each(function () {
           languages[i++] = $(this).val();
       });
console.log(languages);
var timeing1 = [];
$('.allsunday:checked').each(function () {
           timeing1[i++] = $(this).val();
       }); 
var timeing2 = [];
$('.allmonday:checked').each(function () {
           timeing2[i++] = $(this).val();
       });
var timeing3 = [];
$('.alltuesday:checked').each(function () {
           timeing3[i++] = $(this).val();
       });
var timeing4 = [];
$('.allwednesday:checked').each(function () {
           timeing4[i++] = $(this).val();
       });
var timeing5 = [];
$('.allthursday:checked').each(function () {
           timeing5[i++] = $(this).val();
       });
var timeing6 = [];
$('.allfriday:checked').each(function () {
           timeing6[i++] = $(this).val();
       });
var timeing7 = [];
$('.allsaturday:checked').each(function () {
           timeing7[i++] = $(this).val();
       });              

var no_of_cases = $("#no_of_cases").val();
var defence = $('input[name="def1"]:checked').val();
if(defence == 'yes'){
  var handle_defence_marine_space_matters = $("#handle_defence_marine_space_matters").val();
}
else{
  var handle_defence_marine_space_matters = "";
} 

var exp = $('input[name="exp1"]:checked').val();
if(exp == 'yes'){
  var experience_in_due_digilence_complaince = $("#experience_in_due_digilence_complaince").val();
}
else{
  var experience_in_due_digilence_complaince = "";
} 

var mediation = $('input[name="mediation"]:checked').val();
if(mediation == 'yes'){
  var experience_in_mediation = $("#experience_in_mediation").val();
}
else{
  var experience_in_mediation = "";
}
 
var postgraduate = $('input[name="postgraduate"]:checked').val();

if(postgraduate == 'yes'){
  var any_pg_degree = $("#any_pg_degree").val();
}
else{
  var any_pg_degree = "";
}

var bank = $('input[name="bank"]:checked').val();
if(bank == 'yes'){
  var panel_of_any_bank = $("#panel_of_any_bank").val();
}
else{
  var panel_of_any_bank = "";
}

var no_of_associate_adv = $("#no_of_associate_adv").val();
var seminar = $('input[name="seminar"]:checked').val();
if(seminar == 'yes'){
  var organize_seminar = $("#organize_seminar").val();
}
else{
  var organize_seminar = "";
}

var organisation = $('input[name="organisation"]:checked').val();
if(organisation == 'yes'){
  var legal_trainer = $("#legal_trainer").val();
}
else{
  var legal_trainer = "";
}
var registered_on_other_websites = $("#registered_on_other_websites").val();
var image = $("#image").val();
    if(image=='')
        swal('Warning','Please select image','warning')
    else if(name=='')
        swal('Warning','Please Enter name','warning')
    else if(email=='')
        swal('Warning','Please Enter email','warning')
    else if(mobile=='')
        swal('Warning','Please Enter mobile','warning')
    else if(city=='')
        swal('Warning','Please Enter city','warning')
    else if(address1=='')
        swal('Warning','Please Enter address','warning')
    else if(password=='')
        swal('Warning','Please Enter password','warning')
    else if(lat=='')
        swal('Warning','Please Enter Latitude','warning')
    else if(long=='')
        swal('Warning','Please Enter Longitude','warning')
    else if(educational=='')
        swal('Warning','Please Enter educational qualification','warning')
    else if(experience=='')
        swal('Warning','Please Enter Years of Experience','warning')
    else if(appointment_charges=='')
        swal('Warning','Please Enter Appointment Charges','warning')
    else if(call_charges=='')
        swal('Warning','Please Enter Call Charge','warning')
    else if(membership_number=='')
        swal('Warning','Please Enter Membership Number','warning')
    else if(court=='')
        swal('Warning','Please select Court','warning')
    else if(firm=='')
        swal('Warning','Please Enter Name of the Firm','warning')
    else if(ac=='')
        swal('Warning','Please Enter available for Consulting','warning')
    else{
      data={
            'name':name,
            'image':image,
            'email':email,
            'mobile':mobile,
            'city':city,
            'address1':address1,
            'password':password,
            'status':status,
            'portfolio':portfolio,
            'lat':lat,
            'long':long,
            'educational':educational,
            'experience':experience,
            'appointment_charges':appointment_charges,
            'call_charges':call_charges,
            'membership_number':membership_number,
            'firm':firm,
            'website':website,
            'ac':ac,
            'court':court,
            'type_of_lawyer':type_of_lawyer,
            'languages':languages,
            'timeing1':timeing1,
            'timeing2':timeing2,
            'timeing3':timeing3,
            'timeing4':timeing4,
            'timeing5':timeing5,
            'timeing6':timeing6,
            'timeing7':timeing7,
            'no_of_cases':no_of_cases,
            'handle_defence_marine_space_matters':handle_defence_marine_space_matters,
            'experience_in_due_digilence_complaince':experience_in_due_digilence_complaince,
            'experience_in_mediation':experience_in_mediation,
            'any_pg_degree':any_pg_degree,
            'panel_of_any_bank':panel_of_any_bank,
            'no_of_associate_adv':no_of_associate_adv,
            'organize_seminar':organize_seminar,
            'legal_trainer':legal_trainer,
            'registered_on_other_websites':registered_on_other_websites
            
        }
        $.post(BASE_URL+'admin/lawyers/',data,function(fb){
            console.log(fb);
           if(fb.match('1'))
            {
                swal('Success','Lawyer Addedd Successfully ','success'); 
                setTimeout(function(){
                   window.location.href = "lawyers";
                },2000);
            }
            else 
            {
                 swal('Warning','Lawyer Not Added Please Try Again','warning');   
            }
        })
    }


});

$("#blogadd").click(function (){

var image = $("#image").val();
var title = $("#title").val();
var short_description = $("#short_description").val();
var description = CKEDITOR.instances.description.getData();
var case_type = $("#case_type").val();
var currently_trending = $('input[name="currently_trending"]:checked').val();
var popular_posts = $('input[name="popular_posts"]:checked').val();
var status = $('input[name="status"]:checked').val();

    if(image=='')
        swal('Warning','Please select image','warning')
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(short_description=='')
        swal('Warning','Please Enter short description','warning')
    else if(description=='' || description== null)
        swal('Warning','Please Enter description','warning')
    else if(case_type=='' || case_type== 'undefined')
        swal('Warning','Please select case type','warning')
    else if(currently_trending=='' || currently_trending== null)
        swal('Warning','Please select Currently trending','warning')
    else if(popular_posts=='')
        swal('Warning','Please select popular post','warning')
    else if(status=='')
        swal('Warning','Please select status','warning')
    else 
    {
        data={
            'title':title,
            'case_type':case_type,
            'short_desc':short_description,
            'description':description,
            'image':image,
            'created_by':'admin',
            'status':status,
            'currently_trending':currently_trending,
            'popular_post':popular_posts,
        }
        $.post(BASE_URL+'admin/blog/',data,function(fb){
            console.log(fb);
           if(fb.match('1'))
            {
                swal('Success','Blog Successfully Updated','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Blog Not Uploaded Please Try Again','warning')   
            }
        })
    }
});

$("#subcaseadd").click(function (){
   
   var caseid = $("#case_type").val();
   var fees = $("#fee").val();
   var title1 = $("#title1").val();
   var content1 = CKEDITOR.instances.description1.getData();
   var content2 = CKEDITOR.instances.description2.getData();
   var title2 = $("#title2").val();
   var status =  $("input[name='status']:checked"). val();
   var trending =  $("input[name='trending']:checked"). val();
   var image = $("#image").val();
   if(image=='')
        {
            swal('Warning','Please select image','warning');
            $("#image").focus();
        }
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(caseid=='' || caseid== 'undefined')
        swal('Warning','Please select case type','warning')
    else if(fees=='')
        swal('Warning','Please enter fees','warning')
    else if(title1=='')
        swal('Warning','Please enter title1','warning')
    else if(content1=='' || content1== null)
        swal('Warning','Please enter content1','warning')
    else if(title2=='')
        swal('Warning','Please enter title2','warning')
    else if(content2=='' || content2== null)
        swal('Warning','Please enter content2','warning')
    else{
         data={
            'subcase':title,
            'caseid':caseid,
            'fees':fees,
            'title1':title1,
            'content1':content1,
            'title2':title2,
            'content2':content2,
            'flat_rate_img':image,
            'trending':trending,
            'created_by':'admin',
            'is_active':status
        }
        $.post(BASE_URL+'admin/subcase_edit/',data,function(fb){
            console.log(fb);
           if(fb.match('1'))
            {
                swal('Success','Subcase Successfully Added','success') 
                setTimeout(function(){
                   window.location.href = "admin/subcases";
                },2000);
            }
            else 
            {
                 swal('Warning','Subcase Not Uploaded Please Try Again','warning')   
            }
        })
    }
   
});
$("#subcaseedit").click(function (){
   
   var title = $("#title").val();
   var caseid = $("#case_type").val();
   var fees = $("#fee").val();
   var title1 = $("#title1").val();
   var content1 = CKEDITOR.instances.description1.getData();
   var content2 = CKEDITOR.instances.description2.getData();
   
   var title2 = $("#title2").val();
   var status =  $("input[name='status']:checked"). val();
   var trending =  $("input[name='trending']:checked"). val();
   var image = $("#image").val();
   var id = $("#blogid").val();
   if(image=='')
        {
            swal('Warning','Please select image','warning');
            $("#image").focus();
        }
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(caseid=='' || caseid== 'undefined')
        swal('Warning','Please select case type','warning')
    else if(fees=='')
        swal('Warning','Please enter fees','warning')
    else if(title1=='')
        swal('Warning','Please enter title1','warning')
    else if(content1=='' || content1== null)
        swal('Warning','Please enter content1','warning')
    else if(title2=='')
        swal('Warning','Please enter title2','warning')
    else if(content2=='' || content2== null)
        swal('Warning','Please enter content2','warning')
    else{
         data={
            'subcase':title,
            'caseid':caseid,
            'fees':fees,
            'title1':title1,
            'content1':content1,
            'title2':title2,
            'content2':content2,
            'flat_rate_img':image,
            'trending':trending,
            'created_by':'admin',
            'is_active':status
        }
        $.post(BASE_URL+'admin/subcase_edit/'+id,data,function(fb){
            console.log(fb);
           if(fb.match('1'))
            {
                swal('Success','Subcase Successfully Added','success') 
               setTimeout(function(){
                   window.location.href = "../../admin/subcases";
                },2000);
            }
            else 
            {
                 swal('Warning','Subcase Not Uploaded Please Try Again','warning')   
            }
        })
    }
   
});

