import swal from 'sweetalert2';
window.Swal = Swal;

$(":input").keyup(function () {
        $(this).val($(this).val().replace(/^\s+/, ""));
        });
//var BASE_URL = "https://legatoapp.com/legato/";
var BASE_URL = "https://ebix.legatoapp.com/";
$('#login_form').submit(function(event){
	event.preventDefault();
    $("#gifl").show();
    var url=BASE_URL+'home/login_check/login';
    
     $.ajax({
            type: 'post',
            url: url,
            dataType : 'json',
            data: $('#login_form').serialize(),
            success: function (resp) {
              //  alert(resp.status);
              $("#gifl").hide();
             if(resp.status=="success")
                { 
                    window.location.href=resp.reload;    
                }
                if(resp.status=="fail")
                {
                  swal("Warning",resp.message,"warning");
             
                }
            },
                error: function(xhr, resp, text) {
                    //console.log(text.status);
                    //console.log(xhr, resp, text);

                }
          });
    return false;
});
$("#add_calendar").click(function(){
    var title = $("#title").val();
    var start_date = $("#start_date").val();
    if(title=='')
        swal('Warning','Please enter title','warning');
    else if(start_date=='')
        swal('Warning','Please enter date','warning');
    else{
        data={
            'title':title,
            'start_date':start_date
        }
        $.post(BASE_URL+'lawyers/calendar/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Event added Successfully.','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Event Not Added Please Try Again','warning')   
            }
    })
}
});
$(".connect_to_us").click(function(){
	$("#loadergif").show();
	
	setTimeout(function(){
		$(".overlay-loader").fadeOut(300);
	},3000);
	
    var prod_id = $(this).attr('id');
    var type = $("#prod_type").val();
    $(".connect_to_us").attr('disabled',true);
    $.ajax({
            type: "POST",
            url: BASE_URL+'users/connect_to_us/', 
            data:{id: prod_id,type: type},
            success: function(value){
                console.log(value);
                if(value == '1')
                {
                    swal('Success','Request sent Successfully.','success') 
                    setTimeout(function(){
                        location.reload();
                        },2000);
                    $(".connect_to_us").attr('disabled',false);
                }else{
                    swal('Warning','Please Try Again','warning')
                    setTimeout(function(){
                        location.reload();
                        },2000);
                }
            },
            });
});
$(".addcart-btn").click(function(e){

    var prod_id = $(this).attr('id');
    var type = $("#prod_type").val();
    //alert(prod_id);
    $.ajax({
		type: "POST",
		url: BASE_URL+'users/add_to_cart/', 
		data:{id: prod_id,type: type},
		success: function(value){
			console.log(value);
			 $('#cartcount').focus();
			if(value == 'notlogin'){
				window.location.href = "<?php echo base_url().'/login'?>";
			}else if(value == '0'){
				swal("This item is not available for sale");
				
			}else{
				//console.log(value);
				location.reload();
			}
		},
	});
});
$("#applycoupon").click(function(){
	$("#loadergif").show();		
	setTimeout(function(){
		$(".overlay-loader").fadeOut(300);
	},1500);
	
    var coupon_code = $("#coupon_code").val();
    if(coupon_code=='')
        swal('Warning','Please enter Coupon code','warning');
    else{
        data={
            'coupon_code':coupon_code
        }
        $.post(BASE_URL+'users/wallet/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Wallet Updated Successfully.','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Please check your couponcode','warning')   
            }
        })
    }
});

$("#update_calendar").click(function(){
    var title = $("#utitle").val();
    var settitle = $("#settitle").val();
    var setdate = $("#setdate").val();
    var start_date = $("#ustart_date").val();
    if(title=='')
        swal('Warning','Please enter title','warning');
    else if(start_date=='')
        swal('Warning','Please enter date','warning');
    else{
        data={
            'title':title,
            'start_date':start_date,
            'settitle':settitle,
            'setdate':setdate
        }
        $.post(BASE_URL+'lawyers/update_calendar/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Event Updated Successfully.','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Event Not Updated Please Try Again','warning')   
            }
    })
}
});
$("#delete_calendar").click(function(){
    var title = $("#utitle").val();
    var start_date = $("#ustart_date").val();
    
    if(title=='')
        swal('Warning','Please enter title','warning');
    else if(start_date=='')
        swal('Warning','Please enter date','warning');
    else{
        data={
            'title':title,
            'start_date':start_date
        }
        $.post(BASE_URL+'lawyers/delete_calendar/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Event Deleted Successfully.','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Event Not Deleted Please Try Again','warning')   
            }
    })
}
});
$("#update_calendars").click(function(){
    var title = $("#utitles").val();
    var settitle = $("#settitle").val();
    var setdate = $("#setdate").val();
    var start_date = $("#ustart_dates").val();
    if(title=='')
        swal('Warning','Please enter title','warning');
    else if(start_date=='')
        swal('Warning','Please enter date','warning');
    else{
        data={
            'title':title,
            'start_date':start_date,
            'settitle':settitle,
            'setdate':setdate
        }
        $.post(BASE_URL+'lawyers/update_calendar/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Event Updated Successfully.','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Event Not Updated Please Try Again','warning')   
            }
    })
}
});
$("#delete_calendars").click(function(){
    var title = $("#utitles").val();
    var start_date = $("#ustart_dates").val();
    
    if(title=='')
        swal('Warning','Please enter title','warning');
    else if(start_date=='')
        swal('Warning','Please enter date','warning');
    else{
        data={
            'title':title,
            'start_date':start_date
        }
        $.post(BASE_URL+'lawyers/delete_calendar/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Event Deleted Successfully.','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Event Not Deleted Please Try Again','warning')   
            }
    })
}
});
$('#lawupdatetimeslot').click(function(e){
    e.preventDefault();
    var date = $("#datebook").val();
    var timeslot = $("#timeslot").val();
    var orderid = $("#orderid").val();
     $.ajax({
            type: 'post',
            url: BASE_URL+'lawyers/lawupdatetimeslot/',
            data: {appointment_date:date,appointment_time_slot:timeslot,orderid:orderid},
            success: function (resp) {
                console.log(resp);
                if(resp == '1'){
                    swal('Success','Appointment timeslot Successfully Updated','success') 
                    setTimeout(function(){
                        window.location.href = BASE_URL+'lawyers/active_call_booking/';
                    },2000);
                }
                else 
            {
                 swal('Warning','Please Try Again after some time.','warning')   
            }
             
            },
                error: function(xhr, resp, text) {

                    console.log(xhr, resp, text);
                }
          });
    
});

$('#updatetimeslot').click(function(e){
    e.preventDefault();
    var date = $("#datebook").val();
    var timeslot = $("#timeslot").val();
    var orderid = $("#orderid").val();
     $.ajax({
            type: 'post',
            url: BASE_URL+'users/updatetimeslot/',
            data: {appointment_date:date,appointment_time_slot:timeslot,orderid:orderid},
            success: function (resp) {
                console.log(resp);
                if(resp == '1'){
                    swal('Success','Appointment timeslot Successfully Updated','success') 
                    setTimeout(function(){
                        window.location.href = BASE_URL+'users/active_call_booking/';
                    },2000);
                }
                else 
            {
                 swal('Warning','Please Try Again after some time.','warning')   
            }
             
            },
                error: function(xhr, resp, text) {

                    console.log(xhr, resp, text);
                }
          });
    
});

$('#lawupdatef2ftimeslot').click(function(e){
    e.preventDefault();
    var date = $("#datebook").val();
    var timeslot = $("#timeslot").val();
    var orderid = $("#orderid").val();
     $.ajax({
            type: 'post',
            url: BASE_URL+'lawyers/lawupdatef2ftimeslot/',
            data: {appointment_date:date,appointment_time_slot:timeslot,orderid:orderid},
            success: function (resp) {
                console.log(resp);
                if(resp == '1'){
                    swal('Success','Appointment timeslot Successfully Updated','success') 
                    setTimeout(function(){
                        window.location.href = BASE_URL+'lawyers/active_f2f_booking/';
                    },2000);
                }
                else 
            {
                 swal('Warning','Please Try Again after some time.','warning')   
            }
             
            },
                error: function(xhr, resp, text) {

                    console.log(xhr, resp, text);
                }
          });
    
});
$('#updatef2ftimeslot').click(function(e){
    e.preventDefault();
    var date = $("#datebook").val();
    var timeslot = $("#timeslot").val();
    var orderid = $("#orderid").val();
     $.ajax({
            type: 'post',
            url: BASE_URL+'users/updatef2ftimeslot/',
            data: {appointment_date:date,appointment_time_slot:timeslot,orderid:orderid},
            success: function (resp) {
                console.log(resp);
                if(resp == '1'){
                    swal('Success','Appointment timeslot Successfully Updated','success') 
                    setTimeout(function(){
                         window.location.href = BASE_URL+'users/active_f2f_booking/';
                    },2000);
                }
                else 
            {
                 swal('Warning','Please Try Again after some time.','warning')   
            }
             
            },
                error: function(xhr, resp, text) {

                    console.log(xhr, resp, text);
                }
          });
    
});

$('#update_law_profile').click(function(){
    var name = $("#name").val();
    var photo = $("#photo").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var locality = $("#locality").val();
    var password = $("#password").val();
    var address1 = $("#address_1").val();
    var address2 = $("#address_2").val();
    var state = $("#state").val();
    var city = $("#city").val();
    var pincode = $("#pincode").val();
    var firm_name = $("#firm_name").val();
    var education_details = $("#education_details").val();
    var ac = $('input[name="ac"]:checked').val();
    var court = $('input[name="court"]:checked').val();
    var experience = $("#experience").val();
    var membership_number = $("#membership_number").val();
    var latitude = $("#latitude").val();
    var longitude = $("#longitude").val();
    var call_charges = $("#call_charges").val();
    var appointment_charges = $("#appointment_charges").val();
    
    var websitename = $("#websitename").val();
    var description = CKEDITOR.instances.description.getData();
    if(name=='')
        swal('Warning','Please enter name','warning');
    else if(email=='')
        swal('Warning','Please Enter email','warning');
    else if(mobile=='')
        swal('Warning','Please Enter mobile','warning');
    else if(password=='')
        swal('Warning','Please Enter password','warning');
    else if(state=='' || state == null)
        swal('Warning','Please select state','warning');
    else if(city=='' || city== null)
        swal('Warning','Please Select city','warning');
    else if(locality=='')
        swal('Warning','Please Enter locality','warning');
    else if(pincode=='')
        swal('Warning','Please Enter pincode','warning');
    else if(firm_name=='')
        swal('Warning','Please Enter firm name','warning');
    else if(education_details=='')
        swal('Warning','Please Enter education details','warning');
    else if(court=='')
        swal('Warning','Please select court name','warning');
    else if(ac=='')
        swal('Warning','Please select Available for Consulting','warning');
    else if(experience=='')
        swal('Warning','Please enter experience','warning');
    else if(call_charges=='')
        swal('Warning','Please enter call charges','warning');
    else if(appointment_charges=='')
        swal('Warning','Please enter appointment charges','warning');
    else if(address1=='')
        swal('Warning','Please Enter address1','warning');
    else if(address2=='')
        swal('Warning','Please Select address2','warning');
    else if(description=='')
        swal('Warning','Please enter description','warning');
    else{
        data={
            'name':name,
            'mobile':mobile,
            'email':email,
            'photo':photo,
            'password':password,
            'state':state,
            'city':city,
            'pincode':pincode,
            'address1':address1,
            'address2':address2,
            'locality':locality,
            'firm_name':firm_name,
            'education_details':education_details,
            'court':court,
            'ac':ac,
            'experience':experience,
            'membership_number':membership_number,
            'latitude':latitude,
            'longitude':longitude,

            'call_charges':call_charges,
            'appointment_charges':appointment_charges,
            'description':description,
            'websitename':websitename
        }
        $.post(BASE_URL+'lawyers/profile/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Profile will updated after admin approval.','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Profile Not Uploaded Please Try Again','warning')   
            }
        })
    }

});
$('#update_profile1').click(function(){

    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var locality = $("#locality").val();
    var password = $("#password").val();
    var address1 = $("#address_1").val();
    var address2 = $("#address_2").val();
    var state = $("#state").val();
    var city = $("#city").val();
    var pincode = $("#pincode").val();
    if(name=='')
        swal('Warning','Please enter name','warning');
    else if(email=='')
        swal('Warning','Please Enter email','warning');
    else if(mobile=='')
        swal('Warning','Please Enter mobile','warning');
    else if(password=='')
        swal('Warning','Please Enter password','warning');
    else if(locality=='')
        swal('Warning','Please Enter locality','warning');
    else if(state=='' || state == null)
        swal('Warning','Please select state','warning');
    else if(city=='' || city== null)
        swal('Warning','Please Select city','warning');
    else if(pincode=='')
        swal('Warning','Please Enter pincode','warning');
    else if(address1=='')
        swal('Warning','Please Enter address1','warning');
    else if(address2=='')
        swal('Warning','Please Select address2','warning');
    else 
    {
        data={
            'name':name,
            'mobile':mobile,
            'email':email,
            'password':password,
            'locality':locality,
            'state':state,
            'city':city,
            'pincode':pincode,
            'address1':address1,
            'address2':address2,
        }
        
        $.post(BASE_URL+'users/profile/',data,function(fb){
            console.log(fb);
           if(fb.match('1'))
            {
                swal('Success','Profile Successfully Updated','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Profile Not Uploaded Please Try Again','warning')   
            }
        })
    }
    
});

$("#blogeditlawyer").click(function(){
$("#blogeditlawyer").attr('disabled',true);
var image = $("#image").val();
var title = $("#title").val();
var short_description = $("#short_description").val();
var description = CKEDITOR.instances.description.getData();
var case_type = $("#case_type").val();
var bid = $("#bid").val();
if(image==''){
        swal('Warning','Please select image','warning');
        $("#blogeditlawyer").attr('disabled',false);
    }
    else if(title==''){
        swal('Warning','Please Enter title','warning');
        $("#blogeditlawyer").attr('disabled',false);
    }
    else if(short_description==''){
        swal('Warning','Please Enter short description','warning');
        $("#blogeditlawyer").attr('disabled',false);
    }
    else if(description=='' || description== null){
        swal('Warning','Please Enter description','warning');
        $("#blogeditlawyer").attr('disabled',false);
    }
    else if(case_type=='' || case_type== 'undefined'){
        swal('Warning','Please select case type','warning');
        $("#blogeditlawyer").attr('disabled',false);
    }
    else 
    {
        $("#blogeditlawyer").attr('disabled',true);
        data={
            'bid':bid,
            'title':title,
            'case_type':case_type,
            'short_desc':short_description,
            'description':description,
            'image':image
            
        }
        $.post(BASE_URL+'lawyers/blog_edit/'+bid,data,function(fb){
            console.log(fb);
            $("#blogeditlawyer").attr('disabled',false);
            
           if(fb.match('1'))
            {
                swal('Success','Blog Successfully Updated . Pending approval by admin side','success') 
                setTimeout(function(){
                   window.location.href = BASE_URL+"lawyers/myblogs";
                },2000);
            }
            else 
            {
                 swal('Warning','Blog Not Uploaded Please Try Again','warning')   
            }
        })
    }
});

$("#blogaddlawyer").click(function (){
$("#blogaddlawyer").attr('disabled',true);
var image = $("#image").val();
var title = $("#title").val();
var short_description = $("#short_description").val();
var description = CKEDITOR.instances.description.getData();
var case_type = $("#case_type").val();


    if(image==''){
        swal('Warning','Please select image','warning');
        $("#blogaddlawyer").attr('disabled',false);
    }
    else if(title==''){
        swal('Warning','Please Enter title','warning');
        $("#blogaddlawyer").attr('disabled',false);
    }
    else if(short_description==''){
        swal('Warning','Please Enter short description','warning');
        $("#blogaddlawyer").attr('disabled',false);
    }
    else if(description=='' || description== null){
        swal('Warning','Please Enter description','warning');
        $("#blogaddlawyer").attr('disabled',false);
    }
    else if(case_type=='' || case_type== 'undefined'){
        swal('Warning','Please select case type','warning');
        $("#blogaddlawyer").attr('disabled',false);
    }
    else 
    {
        $("#blogaddlawyer").attr('disabled',true);
        data={
            'title':title,
            'case_type':case_type,
            'short_desc':short_description,
            'description':description,
            'image':image,
            'created_by':'admin',
            'status':'2',
            'currently_trending':'0',
            'popular_post':'0',
            'isactive':'0'
        }
        $.post(BASE_URL+'lawyers/blogs/',data,function(fb){
            console.log(fb);
            $("#blogaddlawyer").attr('disabled',false);
            
           if(fb.match('1'))
            {
                swal('Success','Blog Successfully Added . Pending approval by admin side','success') 
                setTimeout(function(){
                   window.location.href = BASE_URL+"lawyers/myblogs";
                },2000);
            }
            else 
            {
                 swal('Warning','Blog Not Uploaded Please Try Again','warning')   
            }
        })
    }
});

function upload_filed(form_id)
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
          if(data!='0'){
            $('#'+data_id).val(data);
            $("#image_lawyer").attr("src",BASE_URL+'assets/images/blog_images/'+data);
        }
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
         location.reload();
        }
});
}
$(document).on('change','#upload_pic_user',function(){
     $.ajax({
        type:'POST',
        url:BASE_URL+'users/upload_profile_pic',
        data:new FormData($("#user_pic")[0]),
        contentType:false,
        processData:false,
        success: function(data){
       location.reload();
        /*  if(data!='0')
            $('#'+data_id).val(data);
          else 
          {
            $('#'+form_id). trigger("reset");
            swal('Warning',data_msg,'warning')
          }
        },
        error: function() { 
            swal("Warning","Your Account is Invalid","warning");*/
        }
});
});
$(document).on('change','#state',function(){
    data=$(this).val();
    $.post(BASE_URL+'users/find_city',{'state':data},function(fb){
        $('#city').html(fb);
    })
});
function top_lawyers(case_type_value){
    var city = $("#search-box").val();
    
    $("#spac").replaceWith("<span id='spac'>"+case_type_value+"</span>");
     $.ajax({
            type: 'post',
            url: BASE_URL+'home/top_lawyers',
            data: {case_type:case_type_value,city:city},
            success: function (resp) {
                $("#top_lawyers").html(resp);
             
            },
                error: function(xhr, resp, text) {

                    console.log(xhr, resp, text);
                }
          });
}
function changecity(){
    var city = $("#search-box").val();
    top_lawyers();
    //city = $(this).text(city.replace('Bengaluru', 'Bangalore'));
    $("#tcity").replaceWith("<span id='tcity'> in "+city+"</span>");
        //$("#suggesstion-box").hide();

        $('.citysd').replaceWith("<div class='row citysd'><div class='col-xs-12 col-sm-12 col-md-6 col-lg-3 lawyers_list'><a href='home/lawyers_list/Accidents/"+city+"' class='city_list_items' title='Accidents Lawyers in "+city+"'>Accidents Lawyers in "+city+"</a><a href='home/lawyers_list/Banking/"+city+"' class='city_list_items' title='Banking Lawyers in"+city+"'>Banking Lawyers in "+city+"</a><a href='home/lawyers_list/Business/"+city+"' class='city_list_items' title='Business Lawyers in '"+city+"'>Business Lawyers in "+city+"</a><a href='home/lawyers_list/Child_Custody/"+city+"' class='city_list_items' title='Child Custody Lawyers in "+city+"'>Child Custody Lawyers in "+city+"</a><a href='home/lawyers_list/Civil/"+city+"' class='city_list_items' title='Civil Lawyers in "+city+"'>Civil Lawyers in "+city+"</a><a href='home/lawyers_list/Commmercial_Contracts/"+city+"' class='city_list_items' title='Commmercial Contracts Lawyers in "+city+" '>Commmercial Contracts Lawyers in "+city+"</a><a href='home/lawyers_list/Consumer_Grivances/"+city+"' class='city_list_items' title='Consumer Grivances Lawyers in "+city+"'>Consumer Grivances Lawyers in "+city+"</a><a href='home/lawyers_list/Criminal/"+city+"' class='city_list_items' title='Criminal Lawyers in "+city+"' </a></div><div class='col-xs-12 col-sm-12 col-md-6 col-lg-3 lawyers_list'><a href='home/lawyers_list/Dishonour_of_Cheques/"+city+"' class='city_list_items' title='Dishonour of Cheques Lawyers in "+city+"'>Dishonour of Cheques Lawyers in "+city+"</a><a href='home/lawyers_list/Divorce/"+city+"' class='city_list_items' title='Divorce Lawyers in "+city+"'>Divorce Lawyers in "+city+"</a><a href='home/lawyers_list/Documentation/"+city+"' class='city_list_items' title='Documentation Lawyers in "+city+"'>Documentation Lawyers in "+city+"</a><a href='home/lawyers_list/Domestic_Violence/"+city+"' class='city_list_items' title='Domestic Violence Lawyers in "+city+"'>Domestic Violence Lawyers in "+city+"</a><a href='home/lawyers_list/Employment/"+city+"' class='city_list_items' title='Employment Lawyers in "+city+"'>Employment Lawyers in "+city+"</a><a href='home/lawyers_list/Family/"+city+"' class='city_list_items' title=Family Lawyers in "+city+"'>Family Lawyers in "+city+"</a><a href='home/lawyers_list/Finance/"+city+"' class='city_list_items' title='Finance Lawyers in "+city+"'>Finance Lawyers in "+city+"</a><a href='home/lawyers_list/Immigration/"+city+"' class='city_list_items' title='Immigration Lawyers in "+city+"'>Immigration Lawyers in "+city+"</a></div><div class='col-xs-12 col-sm-12 col-md-6 col-lg-3 lawyers_list'><a href='home/lawyers_list/Income_Tax_return/"+city+"' class='city_list_items' title='Income Tax return Lawyers in "+city+"'>Income Tax return Lawyers in "+city+"</a><a href='home/lawyers_list/Labour_Issues/"+city+"' class='city_list_items' title='Labour Issues Lawyers in "+city+"'>Labour Issues Lawyers in "+city+"</a><a href='home/lawyers_list/Landlord-Tenant/"+city+"' class='city_list_items' title='Landlord / Tenant Lawyers in "+city+"'>Landlord / Tenant Lawyers in "+city+"</a><a href='home/lawyers_list/Marriage_Registration/"+city+"' class='city_list_items' title='Marriage Registration Lawyers in "+city+"'>Marriage Registration Lawyers in "+city+"</a><a href='home/lawyers_list/Medical_Negligence/"+city+"' class='city_list_items' title='Medical Negligence Lawyers in "+city+"'>Medical Negligence Lawyers in "+city+"</a><a href='home/lawyers_list/Personal_Injury/"+city+"' class='city_list_items' title='Personal Injury Lawyers in "+city+"'>Personal Injury Lawyers in "+city+"</a><a href='home/lawyers_list/Property/"+city+"' class='city_list_items' title='Property Lawyers in "+city+"'>Property Lawyers in "+city+"</a><a href='home/lawyers_list/Ragging/"+city+"' class='city_list_items' title='Ragging Lawyers in "+city+"'>Ragging Lawyers in "+city+"</a></div><div class='col-xs-12 col-sm-12 col-md-6 col-lg-3 lawyers_list'><a href='home/lawyers_list/Recovery/"+city+"' class='city_list_items' title='Recovery Lawyers in "+city+"'>Recovery Lawyers in "+city+"</a><a href='home/lawyers_list/Sexual_Abuse/"+city+"' class='city_list_items' title='Sexual Abuse Lawyers in "+city+"'>Sexual Abuse Lawyers in "+city+"</a><a href='home/lawyers_list/Stamp_Papers_and_Notary/"+city+"' class='city_list_items' title='Stamp Papers and Notary Lawyers in "+city+"''>Stamp Papers and Notary Lawyers in "+city+"</a><a href='home/lawyers_list/Startup/"+city+"' class='city_list_items' title='Startup Lawyers in "+city+"'>Startup Lawyers in "+city+"</a><a href='home/lawyers_list/Tax/"+city+"' class='city_list_items' title='Tax Lawyers in "+city+"'>Tax Lawyers in "+city+"</a><a href='home/lawyers_list/Trademark_and_Copyright/"+city+"' class='city_list_items' title='Trademark and Copyright Lawyers in "+city+"'>Trademark and Copyright Lawyers in "+city+"</a><a href='home/lawyers_list/Wills/"+city+"' class='city_list_items' title='Wills Lawyers in "+city+"'>Wills Lawyers in "+city+"</a></div></div>");
}
function myFunctionjk(){
            var full_namer = document.getElementById("full_namer").value;
            if (full_namer === null || full_namer === "") {
                document.getElementById("f_error_msga").innerHTML = "Please enter your full name";
                document.getElementById("full_namer").focus();
                return false;
            } else{
                document.getElementById("f_error_msga").innerHTML = "";
            }
            var emailr = document.getElementById("emailr").value;
            if (emailr === null || emailr === "") {
                document.getElementById("f_error_msgb").innerHTML = "Please enter your  email";
                document.getElementById("emailr").focus();
                return false;
            } else{
                document.getElementById("f_error_msgb").innerHTML = "";
                var emailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var deci = emailr.match(emailformat);
                if (deci){
                    
                }else{
                    document.getElementById("f_error_msgb").innerHTML = "Please enter proper format of email";
                    return false;   
                }
                
            }
            var mobile_nor = document.getElementById("mobile_nor").value;
            if (mobile_nor === null || mobile_nor === "") {
                document.getElementById("f_error_msgc").innerHTML = "Please enter your  mobile number";
                document.getElementById("mobile_nor").focus();
                return false;
            } else{
                document.getElementById("f_error_msgc").innerHTML = "";
                var mobileno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                var deci = mobile_nor.match(mobileno);
                if (deci){
                    
                }else{
                    document.getElementById("f_error_msgc").innerHTML = "Please enter proper format of 10 digit mobile number";
                    return false;   
                }
            }
            
            var cityr = document.getElementById("cityr").value;
            if (cityr === null || cityr === "") {
                document.getElementById("f_error_msgd").innerHTML = "Please enter your city";
                document.getElementById("cityr").focus();
                return false;
            } else{
                document.getElementById("f_error_msgd").innerHTML = "";
            }
            var case_typer = document.getElementById("case_typer").value;
            if (case_typer === null || case_typer === "") {
                document.getElementById("f_error_msge").innerHTML = "Please select your case type";
                document.getElementById("case_typer").focus();
                return false;
            } else{
                document.getElementById("f_error_msge").innerHTML = "";
            }
            var comming = $('#comming_from').val();

            $('#myFunctionjk').attr('disabled','true');
            $.ajax({
                type: "post",
                url: BASE_URL+"home/requirementsubmit",
                data:{name:full_namer,email:emailr,mobile:mobile_nor,city:cityr,case_type:case_typer,comming_from:'footer Submit your Requirement','type':'footer Submit your Requirement'},
                success: function (response) {
                    $('#myFunctionjk').attr('disabled','true');
                    
                 if(response == '1'){
                    $('#myFunctionjk').attr('disabled','false');
                    window.location.href=BASE_URL+'home/thank_you/client_requirement/'+full_namer; 
                }
                else{
                    alert("Something went wrong.");
                    location.reload();
                }
                }
            });
        
}
function flat_fee_enq(){
        var full_namer = document.getElementById("full_namers").value;
            if (full_namer === null || full_namer === "") {
                document.getElementById("f_error_msgas").innerHTML = "Please enter your full name";
                document.getElementById("full_namers").focus();
                return false;
            } else{
                document.getElementById("f_error_msgas").innerHTML = "";
            }
            var emailr = document.getElementById("emailrs").value;
            if (emailr === null || emailr === "") {
                document.getElementById("f_error_msgbs").innerHTML = "Please enter your  email";
                document.getElementById("emailrs").focus();
                return false;
            } else{
                document.getElementById("f_error_msgbs").innerHTML = "";
                var emailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var deci = emailr.match(emailformat);
                if (deci){
                    
                }else{
                    document.getElementById("f_error_msgbs").innerHTML = "Please enter proper format of email";
                    return false;   
                }
                
            }
            var mobile_nor = document.getElementById("mobile_nors").value;
            if (mobile_nor === null || mobile_nor === "") {
                document.getElementById("f_error_msgcs").innerHTML = "Please enter your  mobile number";
                document.getElementById("mobile_nors").focus();
                return false;
            } else{
                document.getElementById("f_error_msgcs").innerHTML = "";
                var mobileno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                var deci = mobile_nor.match(mobileno);
                if (deci){
                    
                }else{
                    document.getElementById("f_error_msgcs").innerHTML = "Please enter proper format of 10 digit mobile number";
                    return false;   
                }
            }
            
            
            var comming = $('#comming_froms').val();
            var case_typer = $('#case_typers').val();
            $('#flatfree').attr('disabled','true');
          
            $.ajax({
                type: "post",
                url: BASE_URL+"home/flatfree_enquiry",
                data:{name:full_namer,email:emailr,mobile:mobile_nor,case_type:case_typer,comming_from:comming},
                success: function (response) {
                    $('#flatfree').attr('disabled','true');
                   
                 if(response == '1'){
                    $('#flatfree').attr('disabled','false');
                    window.location.href=BASE_URL+'home/thank_you/client_requirement/'+full_namer; 
                }
                else{
                    alert("Something went wrong.");
                    location.reload();
                }
                }
            });
    }
function all_case_type(case_type_id,pl=6){
        var rowperpage=pl;
        var x=case_type_id;
        if(x=="1"){
            document.getElementById("1").style.color ="#6b11c4";
            document.getElementById("1").style.fontWeight="bold";
        }else{
            document.getElementById("1").style.color ="#333";
            document.getElementById("1").style.fontWeight="bold";   
        }
        $.ajax({
            type: "post",
            url: BASE_URL+"home/get_free_services",
            data:{case_type_id:case_type_id,rowperpage:rowperpage},
            success:function(response){
                document.getElementById("get_fee_services").innerHTML =response;
            },
            error:function(xhr, textStatus, error){
                alert("Error in Creating.");
                  console.log(xhr.statusText);
                  console.log(textStatus);
                  console.log(error);
            }
        });
    }
    function myFunction(case_type_id,rowperpage) {
        var rowperpage=rowperpage+6;
        all_case_type(case_type_id,rowperpage);
    }
	$('#requestcallback').click(function(){
		
		$('#requestcallback').attr('disabled',true);
		data={
            'name':'test',
        }
        $.post(BASE_URL+'lawyers/request_call_back_email/',data,function(fb){
            alert("Request send Successfully.");
            $('#requestcallback').attr('disabled',false);
        })
		
		/* $.ajax({
            type: "post",
            url: BASE_URL+"lawyers/request_call_back_email",
            data:{lawyername:'tets'},
            success:function(response){
                alert(response);
            },
	});*/
	});