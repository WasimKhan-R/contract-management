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
$("#add_page").click(function(){
  var page = $("#page").val();
  var page_url = $("#page_url").val();
  var icon = $("#icon").val();
   if(page=='')
      swal('Warning','Please enter page name','warning');
  else if(page_url=='')
      swal('Warning','Please enter page url','warning');
    else{
      data={
              'page':page,
              'page_url':page_url,
              'icon':icon
            }
            $.post(BASE_URL+'admin/add_page/',data,function(fb){
            console.log(fb);
            if(fb.match('1'))
              {
                  swal('Success','Page added Successfully Added','success') 
                  setTimeout(function(){
                     location.href = BASE_URL+"admin/pages";
                  },2000);
              }
              else 
              {
                   swal('Warning','Page Not added Please Try Again','warning')   
              }

            });
    }
});
$("#edit_page").click(function(){
  var page = $("#page").val();
  var page_url = $("#page_url").val();
  var icon = $("#icon").val();
  var page_id = $("#page_id").val();
   if(page=='')
      swal('Warning','Please enter page name','warning');
  else if(page_url=='')
      swal('Warning','Please enter page url','warning');
    else{
      data={
              'page':page,
              'page_url':page_url,
              'icon':icon
            }
            $.post(BASE_URL+'admin/page_edit/'+page_id,data,function(fb){
            console.log(fb);
            if(fb.match('1'))
              {
                  swal('Success','Page Updated Successfully Added','success') 
                  setTimeout(function(){
                     location.href = BASE_URL+"admin/pages";
                  },2000);
              }
              else 
              {
                   swal('Warning','Page Not Updated Please Try Again','warning')   
              }

            });
    }
});
$("#add_emp").click(function(){
  var emp_name = $("#emp_name").val();
  var email = $("#email").val();
  var mobileno = $("#mobileno").val();
  var department = $("#dept_id").val();
  if(emp_name=='')
      swal('Warning','Please enter Employee name','warning');
  else if(email=='')
      swal('Warning','Please enter email','warning');
  else if(department=='')
      swal('Warning','Please select department','warning');
  else if(mobileno=='')
      swal('Warning','Please enter mobileno','warning');  
  else{
    data={
              'emp_name':emp_name,
              'email':email,
              'mobileno':mobileno,
              'department':department
            }
            $.post(BASE_URL+'admin/add_emp/',data,function(fb){
              console.log(fb);
              if(fb.match('1'))
                {
                    swal('Success','Employee added Successfully Added','success') 
                    setTimeout(function(){
                       location.href = BASE_URL+"admin/pages_assign";
                    },2000);
                }
                else 
                {
                     swal('Warning','Employee Not added Please Try Again','warning')   
                }

          });
  }
});
$("#edit_emp").click(function(){
  var emp_id = $("#emp_id").val();
  var emp_name = $("#emp_name").val();
  var email = $("#email").val();
  var mobileno = $("#mobileno").val();
  var department = $("#dept_id").val();
  var status = $('input[name="status"]:checked').val();
  if(emp_name=='')
      swal('Warning','Please enter Employee name','warning');
  else if(email=='')
      swal('Warning','Please enter email','warning');
  else if(department=='')
      swal('Warning','Please select department','warning');
  else if(mobileno=='')
      swal('Warning','Please enter mobileno','warning');  
  else{
    data={
              'emp_name':emp_name,
              'email':email,
              'mobileno':mobileno,
              'department':department,
              'status':status
            }
            $.post(BASE_URL+'admin/edit_emp/'+emp_id,data,function(fb){
              console.log(fb);
             if(fb.match('1'))
                {
                    swal('Success','Employee updated Successfully Added','success') 
                    setTimeout(function(){
                       location.href = BASE_URL+"admin/pages_assign";
                    },2000);
                }
                else 
                {
                     swal('Warning','Employee Not updated Please Try Again','warning')   
                }

          });
  }
});
$("#add_department").click(function(){
  var department = $("#department").val();
    var pages = [];
    $('input.pages:checkbox:checked').each(function () {
      pages.push($(this).val());
    });
    if(department=='')
      swal('Warning','Please enter department name','warning');
    else{
        data={
              'department':department,
              'pages':pages,
            }
          $.post(BASE_URL+'admin/add_department/',data,function(fb){
          console.log(fb);
          if(fb.match('1'))
            {
                swal('Success','Department added Successfully Added','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/department";
                },2000);
            }
            else 
            {
                 swal('Warning','Department Not added Please Try Again','warning')   
            }

          });
      }
  });
$("#edit_department").click(function(){
  var department = $("#department").val();
  var dept_id = $("#dept_id").val();
    var pages = [];
    $('input.pages:checkbox:checked').each(function () {
      pages.push($(this).val());
    });
    if(department=='')
      swal('Warning','Please enter department name','warning');
    else{
        data={
              'department':department,
              'pages':pages,
            }
          $.post(BASE_URL+'admin/department_edit/'+dept_id,data,function(fb){
          console.log(fb);
          if(fb.match('1'))
            {
                swal('Success','Department added Successfully Added','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/department";
                },2000);
            }
            else 
            {
                 swal('Warning','Department Not added Please Try Again','warning')   
            }

          });
      }
  });
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
var blog_type = $("#blog_type").val();
var created_by = $("#created_by").val();
var title = $("#title").val();
var short_description = $("#short_description").val();
var description = CKEDITOR.instances.description.getData();
var case_type = $("#case_type").val();
var currently_trending = $('input[name="currently_trending"]:checked').val();
var popular_posts = $('input[name="popular_posts"]:checked').val();
var status = $('input[name="status"]:checked').val();
var created_by= $("#created_by").val();
var id = $("#blogid").val();
    if(image=='')
        swal('Warning','Please select image','warning')
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(short_description=='')
        swal('Warning','Please Enter short description','warning')
    else if(description=='')
        swal('Warning','Please Enter description','warning')
      else if(created_by=='')
        swal('Warning','Please Enter Created by','warning')
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
            'type':blog_type,
            'short_desc':short_description,
            'description':description,
            'image':image,
            'created_by':created_by,
            'status':status,
            'currently_trending':currently_trending,
            'popular_post':popular_posts,
		
        }
        $.post(BASE_URL+'admin/blog_edit/'+id,data,function(fb){
            if(fb.match('1'))
            {
                swal('Success','Blog Successfully Updated','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/blog";
                },2000);
            }
            else 
            {
                 swal('Warning','Blog Not Uploaded Please Try Again','warning')   
            }
        })
    }

});
$("#blogeditlawyeradmin").click(function(){
  $("#blogeditlawyeradmin").attr('disabled',true);
  var image = $("#image").val();
  var title = $("#title").val();
  var short_description = $("#short_description").val();
  var description = CKEDITOR.instances.description.getData();
  var case_type = $("#case_type").val();
  var bid = $("#bid").val();
if(image==''){
        swal('Warning','Please select image','warning');
        $("#blogeditlawyeradmin").attr('disabled',false);
    }
    else if(title==''){
        swal('Warning','Please Enter title','warning');
        $("#blogeditlawyeradmin").attr('disabled',false);
    }
    else if(short_description==''){
        swal('Warning','Please Enter short description','warning');
        $("#blogeditlawyeradmin").attr('disabled',false);
    }
    else if(description=='' || description== null){
        swal('Warning','Please Enter description','warning');
        $("#blogeditlawyeradmin").attr('disabled',false);
    }
    else if(case_type=='' || case_type== 'undefined'){
        swal('Warning','Please select case type','warning');
        $("#blogeditlawyeradmin").attr('disabled',false);
    }
    else 
    {
        $("#blogeditlawyeradmin").attr('disabled',true);
        data={
            'bid':bid,
            'title':title,
            'case_type':case_type,
            'short_desc':short_description,
            'description':description,
            'image':image
            
        }
        $.post(BASE_URL+'admin/lawyer_blog_edit/'+bid,data,function(fb){
            console.log(fb);
            $("#blogeditlawyeradmin").attr('disabled',false);
            
           if(fb.match('1'))
            {
                swal('Success','Blog Successfully Updated . Pending approval by admin side','success') 
                setTimeout(function(){
                   window.location.href = BASE_URL+"admin/lawyer_blog";
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
$("#edit_subscribe_invoice").click(function(){
  var package_type = $("#package_type").val();
  var lawyer_name = $("#lawyer_name").val();
  var lawyer_email = $("#lawyer_email").val();
  var lawyer_address = $("#lawyer_address").val();
  var lawyer_state = $("#lawyer_state").val();
  var invoice_no = $("#invoice_no").val();
  var invoice_date = $("#invoice_date").val();
  var order_id = $("#order_id").val();
  var description = $("#descriptions").val();
  var sac = $("#sac").val();
  var amount = $("#amount").val();
  var taxableamount = $("#taxableamount").val();
  var cgst = $("#cgst").val();
  var igst = $("#igst").val();
  var tamount = $("#totalamount").val();
  var transactionid = $("#transactionid").val();
  var lawyer_gstin = $("#lawyer_gstin").val();
  var originalinvno = $("#originalinvno").val();
  if(package_type=='')
      swal('Warning','Please select package type','warning');
  else if(invoice_no=='')
      swal('Warning','Please Enter invoice no','warning')
  else if(lawyer_state=='')
      swal('Warning','Please select lawyer state','warning')
  else if(invoice_date=='')
      swal('Warning','Please Enter invoice date','warning')
  else if(order_id=='')
      swal('Warning','Please Enter order id','warning')
  else if(description=='')
      swal('Warning','Please Enter description','warning')
  else if(amount=='')
      swal('Warning','Please Enter amount','warning')
  else if(transactionid =='')
      swal('Warning','Please Enter payment id')
  else{
    data={
            'type':'Subscribe package',
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_address':lawyer_address,
            'lawyer_state':lawyer_state,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'transactionid':transactionid,
            'lawyer_gstin':lawyer_gstin,
            'description':description,
            'amount':amount,
            'sac':sac,
            'cgst':cgst,
            'igst':igst,
            'package_type':package_type,
            'tamount':tamount
          }
          url_invoice_no = $("#url_invoice_no").val();
          url_year = $("#url_year").val();
         $.post(BASE_URL+'admin/edit_subscribe_invoice/'+originalinvno,data,function(fb){
          console.log(fb);
          url = BASE_URL+'admin/download_subscribe_invoice/'+url_invoice_no+url_year;
          $("#view_invoice").attr("href",url);
          window.open(url);
         location.href = BASE_URL+"admin/subscription_invoices";
         });
  }
});
$("#create_subscribe_invoice").click(function(){
  var package_type = $("#package_type").val();
  var lawyer_name = $("#lawyer_name").val();
  var lawyer_email = $("#lawyer_email").val();
  var lawyer_address = $("#lawyer_address").val();
  var lawyer_state = $("#lawyer_state").val();
  var invoice_no = $("#invoice_no").val();
  var invoice_date = $("#invoice_date").val();
  var order_id = $("#order_id").val();
  var description = $("#descriptions").val();
  var sac = $("#sac").val();
  var amount = $("#amount").val();
  var taxableamount = $("#taxableamount").val();
  var cgst = $("#cgst").val();
  var igst = $("#igst").val();
  var tamount = $("#totalamount").val();
  var transactionid = $("#transactionid").val();
  var lawyer_gstin = $("#lawyer_gstin").val();
  if(package_type=='')
      swal('Warning','Please select package type','warning');
  else if(invoice_no=='')
      swal('Warning','Please Enter invoice no','warning')
  else if(lawyer_state=='')
      swal('Warning','Please select lawyer state','warning')
  else if(invoice_date=='')
      swal('Warning','Please Enter invoice date','warning')
  else if(order_id=='')
      swal('Warning','Please Enter order id','warning')
  else if(description=='')
      swal('Warning','Please Enter description','warning')
  else if(amount=='')
      swal('Warning','Please Enter amount','warning')
  else if(transactionid =='')
      swal('Warning','Please Enter payment id')
  else{
    data={
            'type':'Subscribe package',
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_address':lawyer_address,
            'lawyer_state':lawyer_state,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'transactionid':transactionid,
            'lawyer_gstin':lawyer_gstin,
            'description':description,
            'amount':amount,
            'sac':sac,
            'cgst':cgst,
            'igst':igst,
            'package_type':package_type,
            'tamount':tamount
          }
          url_invoice_no = $("#url_invoice_no").val();
          url_year = $("#url_year").val();
         $.post(BASE_URL+'admin/create_subscribe_invoice/',data,function(fb){
          console.log(fb);
          url = BASE_URL+'admin/download_subscribe_invoice/'+url_invoice_no+url_year;
          $("#view_invoice").attr("href",url);
          window.open(url);
         });
  }
});
$("#create_invoice").click(function(){
      var invoice_type = $("#invoice_type").val();
      var lawyer_name = $("#lawyer_name").val();
      var lawyer_email = $("#lawyer_email").val();
      var lawyer_address = $("#lawyer_address").val();
      var lawyer_state = $("#lawyer_state").val();
      var customer_fname = $("#customer_fname").val();
      var customer_address = $("#customer_address").val();
      var customer_state = $("#customer_state").val();
      var invoice_no = $("#invoice_no").val();
      var invoice_date = $("#invoice_date").val();
      var order_id = $("#order_id").val();
      var purpose = $("#purpose").val();
      var customer_email = $("#customer_email").val();
      var customer_mobile = $("#customer_mobile").val();
      var description = $("#descriptions").val();
      var sac = $("#sac").val();
      var amount = $("#amount").val();
      var taxableamount = $("#taxableamount").val();
      var ins = $("#ins").val();
      var cgst = $("#cgst").val();
      var igst = $("#igst").val();
      var tamount = $("#totalamount").val();

      if(invoice_type=='')
        swal('Warning','Please select invoice type','warning');
      else if(purpose=='')
        swal('Warning','Please select purpose','warning')
      else if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
      else if(invoice_date=='')
        swal('Warning','Please Enter invoice date','warning')
      else if(order_id=='')
        swal('Warning','Please Enter order id','warning')
      else if(description=='')
        swal('Warning','Please Enter description','warning')
      else if(amount=='')
        swal('Warning','Please Enter amount','warning')
      else{
        
        if(invoice_type=='ltol_invoice'){

          if(lawyer_name=='')
            swal('Warning','Please select lawyer name','warning')
          else if(lawyer_address=='')
            swal('Warning','Please Enter lawyer address','warning')
          else if(lawyer_state=='')
            swal('Warning','Please Enter lawyer state','warning')

          data={
            'type':invoice_type,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_address':lawyer_address,
            'lawyer_state':lawyer_state,
            'customer_fname':customer_fname,
            'customer_address':customer_address,
            'customer_state':customer_state,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'customer_email':customer_email,
            'customer_mobile':customer_mobile,
            'description':description,
            'amount':amount,
            'sac':sac,
            'cgst':cgst,
            'igst':igst,
            'purpose':purpose,
            'tamount':tamount
          }
          url_invoice_no = $("#url_invoice_no").val();
          url_year = $("#url_year").val();
          console.log(data);
          $.post(BASE_URL+'admin/create_invoice/',data,function(fb){
          console.log(fb);
          $("#handling").show();
          url = BASE_URL+'admin/download_off_inv/'+url_invoice_no+url_year;
          $("#view_invoice").attr("href",url);
          $("#handling_invoice").show();
          $("#handling_invoice").attr("href",BASE_URL+'admin/ltol_lawyer_invoice/'+fb);
          window.open(url);

        });
        }else if(invoice_type == 'ltoc_invoice'){
          if(customer_fname=='')
            swal('Warning','Please Enter customer name','warning')
          else if(customer_address=='')
            swal('Warning','Please Enter customer address','warning')
          else if(customer_state=='')
            swal('Warning','Please select customer state','warning')
          data={
            'type':invoice_type,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_address':lawyer_address,
            'lawyer_state':lawyer_state,
            'customer_fname':customer_fname,
            'customer_address':customer_address,
            'customer_state':customer_state,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'customer_email':customer_email,
            'customer_mobile':customer_mobile,
            'description':description,
            'amount':amount,
            'sac':sac,
            'cgst':cgst,
            'igst':igst,
            'purpose':purpose,
            'tamount':tamount
          }
          url_invoice_no = $("#url_invoice_no").val();
          url_year = $("#url_year").val();
        $.post(BASE_URL+'admin/create_invoice/',data,function(fb){
          console.log(fb);
          $("#handling_invoice").show();
          url = BASE_URL+'admin/download_off_inv/'+url_invoice_no+url_year;
          $("#view_invoice").attr("href",url);
          $("#handling_invoice").show();
          $("#handling_invoice").attr("href",BASE_URL+'admin/ltoc_lawyer_invoice/'+fb);
       
          window.open(url);

        });
        }
      }
});

$("#ltoc_lawyer_invoice").click(function(){
  var invoice_type = 'ltoc_po_invoice';
  var lawyer_name = $("#lawyer_name").val();
  var lawyer_email = $("#lawyer_email").val();
  var lawyer_address = $("#lawyer_address").val();
  var lawyer_city = $("#lawyer_city").val();
  var lawyer_id = $("#lawyer_id").val();
  var invoice_no = $("#invoice_no").val();
  var invoice_date = $("#invoice_date").val();
  var order_id = $("#order_id").val();
  var description = $("#descriptions").val();
  var amount = $("#amount").val();
  var customer_fname = $("#customer_fname").val();
  var lawyer_mobile = $("#lawyer_mobile").val();
  var lawyer_state = $("#lawyer_state").val();
  if(invoice_type=='')
    swal('Warning','Please select invoice type','warning');
  else if(lawyer_name=='')
    swal('Warning','Please select lawyer name','warning')
  else if(lawyer_address=='')
    swal('Warning','Please Enter lawyer address','warning')
  else if(invoice_no=='')
    swal('Warning','Please Enter invoice no','warning')
  else if(invoice_date=='')
    swal('Warning','Please Enter invoice date','warning')
  else if(order_id=='')
    swal('Warning','Please Enter order id','warning')
  else if(description=='')
    swal('Warning','Please Enter description','warning')
  else if(amount=='')
    swal('Warning','Please Enter amount','warning')
  else{
    data={
            'type':invoice_type,
            'lawyer_id':lawyer_id,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_city':lawyer_city,
            'lawyer_mobile':lawyer_mobile,
            'lawyer_state':lawyer_state,
            'customer_fname': customer_fname,
            'lawyer_address':lawyer_address,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'description':description,
            'amount':amount
          }
          url_invoice_no = $("#url_invoice_no").val();
          url_year = $("#url_year").val();
          console.log(data);
          $.post(BASE_URL+'admin/ltoc_lawyer_invoice/',data,function(fb){
          console.log(fb);
          $("#handling").show();
          url = BASE_URL+'admin/download_off_inv/'+url_invoice_no+url_year;
          $("#view_invoice").attr("href",url);
          $("#ltoc_handling_charges_invoice").show();
          $("#ltoc_handling_charges_invoice").attr("href",BASE_URL+'admin/handling_ltoc_invoice/'+fb);
          window.open(url);
        });
      }
  
});
$("#ltol_lawyer_invoice").click(function(){
  var invoice_type = 'ltol_po_invoice';
  var lawyer_name = $("#lawyer_name").val();
  var lawyer_email = $("#lawyer_email").val();
  var lawyer_address = $("#lawyer_address").val();
  var lawyer_city = $("#lawyer_city").val();
  var lawyer_id = $("#lawyer_id").val();
  var invoice_no = $("#invoice_no").val();
  var invoice_date = $("#invoice_date").val();
  var order_id = $("#order_id").val();
  var description = $("#descriptions").val();
  var amount = $("#amount").val();
  var customer_fname = $("#customer_fname").val();
  var lawyer_mobile = $("#lawyer_mobile").val();
  var lawyer_state = $("#lawyer_state").val();
  if(invoice_type=='')
    swal('Warning','Please select invoice type','warning');
  else if(lawyer_name=='')
    swal('Warning','Please select lawyer name','warning')
  else if(lawyer_address=='')
    swal('Warning','Please Enter lawyer address','warning')
  else if(invoice_no=='')
    swal('Warning','Please Enter invoice no','warning')
  else if(invoice_date=='')
    swal('Warning','Please Enter invoice date','warning')
  else if(order_id=='')
    swal('Warning','Please Enter order id','warning')
  else if(description=='')
    swal('Warning','Please Enter description','warning')
  else if(amount=='')
    swal('Warning','Please Enter amount','warning')
  else{
    data={
            'type':invoice_type,
            'lawyer_id':lawyer_id,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_city':lawyer_city,
            'lawyer_mobile':lawyer_mobile,
            'lawyer_state':lawyer_state,
            'customer_fname': customer_fname,
            'lawyer_address':lawyer_address,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'description':description,
            'amount':amount
          }
          url_invoice_no = $("#url_invoice_no").val();
          url_year = $("#url_year").val();
          console.log(data);
          $.post(BASE_URL+'admin/ltol_lawyer_invoice/',data,function(fb){
          console.log(fb);
          $("#handling").show();
          url = BASE_URL+'admin/download_off_inv/'+url_invoice_no+url_year;
          $("#view_invoice").attr("href",url);
          $("#handling_charges_invoice").show();
          $("#handling_charges_invoice").attr("href",BASE_URL+'admin/handling_ltol_invoice/'+fb);
          window.open(url);
        });
      }
  
});
$("#handling_ltol_invoice").click(function(){
      var type = 'handling_ltol_invoice';
      var lawyer_name = $("#lawyer_name").val();
      var lawyer_email = $("#lawyer_email").val();
      var lawyer_city = $("#lawyer_city").val();
      var lawyer_address = $("#lawyer_address").val();
      var lawyer_state = $("#lawyer_state").val();
      var lawyer_id = $("#lawyer_id").val();
      var customer_fname = $("#customer_fname").val();
      var lawyer_mobile = $("#lawyer_mobile").val();
      var lawyer_gstin = $("#lawyer_gstin").val();
      var invoice_no = $("#invoice_no").val();
      var invoice_date = $("#invoice_date").val();
      var order_id = $("#order_id").val();
      var description = $("#descriptions").val();
      var sac = $("#sac").val();
      var amount = $("#amount").val();
      var taxableamount = $("#taxableamount").val();
      var cgst = $("#cgst").val();
      var igst = $("#igst").val();
      var tamount = $("#tamount").val();
      if(lawyer_name=='')
        swal('Warning','Please select lawyer name','warning')
      else if(lawyer_address=='')
        swal('Warning','Please Enter lawyer address','warning')
      else if(lawyer_email=='')
        swal('Warning','Please Enter lawyer email','warning')
      else if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
      else if(invoice_date=='')
        swal('Warning','Please Enter invoice date','warning')
      else if(order_id=='')
        swal('Warning','Please Enter order id','warning')
      else if(description=='')
        swal('Warning','Please Enter description','warning')
      else if(amount=='')
        swal('Warning','Please Enter amount','warning')
      else{
        data={
            'type':type,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_id':lawyer_id,
            'lawyer_address':lawyer_address,
            'lawyer_city':lawyer_city,
            'lawyer_state':lawyer_state,
            'customer_fname':customer_fname,
            'lawyer_mobile':lawyer_mobile,
            'lawyer_gstin':lawyer_gstin,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'description':description,
            'amount':amount,
            'cgst':cgst,
            'igst':igst,
            'tamount':tamount
        }
          url_invoice_no = $("#url_invoice_no").val();
          
          console.log(data);
          $.post(BASE_URL+'admin/handling_ltol_invoice/',data,function(fb){
          console.log(fb);
          $("#handling").show();
          url = BASE_URL+'admin/download_off_inv/'+url_invoice_no;
          $("#view_invoice").attr("href",url);
          $("#handling_ltol_invoice").hide();
          window.open(url);
        });
      }


});
$("#handling_ltoc_invoice").click(function(){
      var type = 'handling_ltoc_invoice';
      var lawyer_name = $("#lawyer_name").val();
      var lawyer_email = $("#lawyer_email").val();
      var lawyer_address = $("#lawyer_address").val();
      var lawyer_city = $("#lawyer_city").val();
      var lawyer_state = $("#lawyer_state").val();
      var lawyer_id = $("#lawyer_id").val();
      var customer_fname = $("#customer_fname").val();
      var lawyer_mobile = $("#lawyer_mobile").val();
      var lawyer_gstin = $("#lawyer_gstin").val();
      var invoice_no = $("#invoice_no").val();
      var invoice_date = $("#invoice_date").val();
      var order_id = $("#order_id").val();
      var description = $("#descriptions").val();
      var sac = $("#sac").val();
      var amount = $("#amount").val();
      var taxableamount = $("#taxableamount").val();
      var cgst = $("#cgst").val();
      var igst = $("#igst").val();
      var tamount = $("#tamount").val();
      if(lawyer_name=='')
        swal('Warning','Please select lawyer name','warning')
      else if(lawyer_address=='')
        swal('Warning','Please Enter lawyer address','warning')
      else if(lawyer_email=='')
        swal('Warning','Please Enter lawyer email','warning')
      else if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
      else if(invoice_date=='')
        swal('Warning','Please Enter invoice date','warning')
      else if(order_id=='')
        swal('Warning','Please Enter order id','warning')
      else if(description=='')
        swal('Warning','Please Enter description','warning')
      else if(amount=='')
        swal('Warning','Please Enter amount','warning')
      else{
        data={
            'type':type,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_id':lawyer_id,
            'lawyer_address':lawyer_address,
            'lawyer_city':lawyer_city,
            'lawyer_state':lawyer_state,
            'customer_fname':customer_fname,
            'lawyer_mobile':lawyer_mobile,
            'lawyer_gstin':lawyer_gstin,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'description':description,
            'amount':amount,
            'cgst':cgst,
            'igst':igst,
            'tamount':tamount
        }
          url_invoice_no = $("#url_invoice_no").val();
          
          console.log(data);
          $.post(BASE_URL+'admin/handling_ltoc_invoice/',data,function(fb){
          console.log(fb);
          $("#handling").show();
          url = BASE_URL+'admin/download_off_inv/'+url_invoice_no;
          $("#view_invoice").attr("href",url);
          $("#handling_ltoc_invoice").hide();
          window.open(url);
        });
      }


});
$("#generate_invoice").click(function(){
$("#generate_invoice").hide();
      var lawyer_name = $("#lawyer_name").val();
      var lawyer_email = $("#lawyer_email").val();
      var lawyer_address = $("#lawyer_address").val();
      var customer_fname = $("#customer_fname").val();
      var customer_lname = $("#customer_lname").val();
      var customer_address = $("#customer_address").val();
      var invoice_no = $("#invoice_no").val();
      var invoice_date = $("#invoice_date").val();
      var order_id = $("#order_id").val();
      var customer_email = $("#customer_email").val();
      var customer_mobile = $("#customer_mobile").val();
      var description = $("#descriptions").val();
      var amount = $("#amount").val();
      var type = 'lawyer to customer invoice';
      var ins = $("#ins").val();
      var consult_date = $("#consult_date").val();
      var appoint_type = $("#appoint_type").val();
      var timeslot = $("#timeslot").val();

      if(lawyer_name=='')
        swal('Warning','Please select lawyer name','warning')
      else if(lawyer_address=='')
        swal('Warning','Please Enter lawyer address','warning')
      else if(customer_fname=='')
        swal('Warning','Please Enter customer first name','warning')
      else if(customer_lname=='')
        swal('Warning','Please Enter customer last name','warning')
      else if(customer_address=='')
        swal('Warning','Please Enter customer address','warning')
      else if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
      else if(invoice_date=='')
        swal('Warning','Please Enter invoice date','warning')
      else if(order_id=='')
        swal('Warning','Please Enter order id','warning')
      else if(description=='')
        swal('Warning','Please Enter description','warning')
      else if(amount=='')
        swal('Warning','Please Enter amount','warning')
      else{

        data={
            'type':type,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_address':lawyer_address,
            'customer_fname':customer_fname,
            'customer_lname':customer_lname,
            'customer_address':customer_address,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'customer_email':customer_email,
            'customer_mobile':customer_mobile,
            'description':description,
            'amount':amount,
            'consult_date':consult_date,
            'appoint_type':appoint_type,
            'timeslot':timeslot
        }
        url_invoice_no = $("#url_invoice_no").val();
        url_year = $("#url_year").val();
        $.post(BASE_URL+'admin/lawyer_customer/',data,function(fb){
          console.log(fb);
          $("#handling").show();
          url = BASE_URL+'admin/download_inv/'+url_invoice_no+url_year;
          $("#view_invoice").attr("href",url);
          $("#handling").attr("href",BASE_URL+'admin/handling_charges/'+fb);
          
          window.open(url);

        })
      }
    });

$("#update_ltoc").click(function(e){
e.preventDefault();
      var lawyer_name = $("#lawyer_name").val();
      var lawyer_email = $("#lawyer_email").val();
      var lawyer_address = $("#lawyer_address").val();
      var customer_fname = $("#customer_fname").val();
      var customer_lname = $("#customer_lname").val();
      var customer_address = $("#customer_address").val();
      var invoice_no = $("#invoice_no").val();
      var invoice_date = $("#invoice_date").val();
      var order_id = $("#order_id").val();
      var customer_email = $("#customer_email").val();
      var customer_mobile = $("#customer_mobile").val();
      var description = $("#descriptions").val();
      var amount = $("#amount").val();
      var type = 'lawyer to customer invoice';
      var ins = $("#ins").val();
      var percentage = $("#percentage").val();
      var invoiceno = $("#invoiceno").val();
      var consult_date = $("#consult_date").val();
      var appoint_type = $("#appoint_type").val();
      var timeslot = $("#timeslot").val();
      if(lawyer_name=='')
        swal('Warning','Please select lawyer name'
          ,'warning')
      else if(lawyer_address=='')
        swal('Warning','Please Enter lawyer address','warning')
      else if(customer_fname=='')
        swal('Warning','Please Enter customer first name','warning')
      
      else if(customer_address=='')
        swal('Warning','Please Enter customer address','warning')
      else if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
      else if(invoice_date=='')
        swal('Warning','Please Enter invoice date','warning')
      else if(order_id=='')
        swal('Warning','Please Enter order id','warning')
      else if(description=='')
        swal('Warning','Please Enter description','warning')
      else if(amount=='')
        swal('Warning','Please Enter amount','warning')
      else{
       

        data={
            'type':type,
            'lawyer_name':lawyer_name,
            'lawyer_email':lawyer_email,
            'lawyer_address':lawyer_address,
            'customer_fname':customer_fname,
            'customer_lname':customer_lname,
            'customer_address':customer_address,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'customer_email':customer_email,
            'customer_mobile':customer_mobile,
            'description':description,
            'amount':amount,
            'percentage':percentage,
            'amount':amount,
            'consult_date':consult_date,
            'appoint_type':appoint_type,
            'timeslot':timeslot
        }
        console.log(data);
        url_invoice_no = $("#url_invoice_no").val();
        $.post(BASE_URL+'admin/edit_ltoc_invoice/'+invoiceno,data,function(fb){
          console.log(fb);
          if(fb.match('1'))
            {
                swal('Success','Invoice updated Successfully Added','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/lawyer_customer_all";
                },2000);
            }
            else 
            {
                 swal('Warning','Invoice Not updated Please Try Again','warning')   
            }

        });
      }
});
$("#edit_handlingcharges_invoice").click(function(){
  var percentage = $("#percentage").val();
var invoice_no = $("#invoice_no").val();
var lawyer_name = $("#lawyer_name").val();
var invoice_date = $("#invoice_date").val();
var lawyer_address = $("#lawyer_address").val();
var order_id = $("#order_id").val();
var lawyer_email = $("#lawyer_email").val();
var lawyer_mobile = $("#lawyer_mobile").val();
var lawyer_gstin = $("#lawyer_gstin").val();
var reference = $("#reference").val();
var description = $("#descriptions").val();
var sac = $("#sac").val();
var amount = $("#amount").val();
var cgst = $("#cgst").val();
var igst = $("#igst").val();
var type = "Handling Charges";
var tamount = $("#tamount").val();
 var invoiceno = $("#invoiceno").val();
if(percentage=='')
        swal('Warning','Please Enter percentage','warning')
else if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
else if(lawyer_name=='')
        swal('Warning','Please select lawyer name','warning')
else if(lawyer_address=='')
        swal('Warning','Please Enter lawyer address','warning')
else if(amount=='')
        swal('Warning','Please Enter amount','warning')
else if(description=='')
        swal('Warning','Please Enter description','warning')
else{
  data={
            'type':type,
            'percentage':percentage,
            'lawyer_name':lawyer_name,
            'lawyer_address':lawyer_address,
            'lawyer_email':lawyer_email,
            'lawyer_mobile':lawyer_mobile,
            'gst':lawyer_gstin,
            'reference':reference,
            'sac':sac,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'cgst':cgst,
            'igst':igst,
            'description':description,
            'amount':amount,
            'tamount':tamount
        }
        console.log(data);

       
        $.post(BASE_URL+'admin/edit_hc_invoice/'+invoiceno,data,function(fb){
          console.log(fb);
        if(fb.match('1'))
            {
                swal('Success','Invoice updated Successfully Added','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/lawyer_customer_all";
                },2000);
            }
            else 
            {
                 swal('Warning','Invoice Not updated Please Try Again','warning')   
            }
        })
}
});
$("#handlingcharges_invoice").click(function(){
var percentage = $("#percentage").val();
var invoice_no = $("#invoice_no").val();
var lawyer_name = $("#lawyer_name").val();
var invoice_date = $("#invoice_date").val();
var lawyer_address = $("#lawyer_address").val();
var order_id = $("#order_id").val();
var lawyer_email = $("#lawyer_email").val();
var lawyer_mobile = $("#lawyer_mobile").val();
var lawyer_gstin = $("#lawyer_gstin").val();
var reference = $("#reference").val();
var description = $("#descriptions").val();
var sac = $("#sac").val();
var amount = $("#amount").val();
var cgst = $("#cgst").val();
var igst = $("#igst").val();
var type = "Handling Charges";
var tamount = $("#tamount").val();

if(percentage=='')
        swal('Warning','Please Enter percentage','warning')
else if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
else if(lawyer_name=='')
        swal('Warning','Please select lawyer name','warning')
else if(lawyer_address=='')
        swal('Warning','Please Enter lawyer address','warning')
else if(amount=='')
        swal('Warning','Please Enter amount','warning')
else if(description=='')
        swal('Warning','Please Enter description','warning')
else{
  data={
            'type':type,
            'percentage':percentage,
            'lawyer_name':lawyer_name,
            'lawyer_address':lawyer_address,
            'lawyer_email':lawyer_email,
            'lawyer_mobile':lawyer_mobile,
            'gst':lawyer_gstin,
            'reference':reference,
            'sac':sac,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'cgst':cgst,
            'igst':igst,
            'description':description,
            'amount':amount,
            'tamount':tamount
        }
        console.log(data);
        url_invoice_no = $("#url_invoice_no").val();
        $.post(BASE_URL+'admin/handling_charges/',data,function(fb){
          console.log(fb);
          $("#paymentorder").show();
          url = BASE_URL+'admin/download_inv/'+url_invoice_no;
          $("#paymentorder").attr("href",BASE_URL+'admin/payment_order/'+fb);
          
          window.open(url);

        })
}
});
$("#edit_paymentorder_invoice").click(function(){
  var lawyer_name = $("#lawyer_name").val();
var lawyer_address = $("#lawyer_address").val();
var customer_fname = $("#customer_fname").val();
var invoice_no = $("#invoice_no").val();
var invoice_date = $("#invoice_date").val();
var order_id = $("#order_id").val();
var gst = $("#gst").val();
var lawyer_email = $("#lawyer_email").val();
var lawyer_mobile = $("#lawyer_mobile").val();
var customer_address = $("#customer_address").val();
var cust_invoice_no = $("#cust_invoice_no").val();
var handling_invoice_no = $("#handling_invoice_no").val();
var description = $("#descriptions").val();
var amount = $("#amount").val();
var type = "Payment order";
var invoiceno = $("#invoiceno").val();
if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
else if(invoice_date=='')
        swal('Warning','Please Enter invoice date','warning')
else if(amount=='')
        swal('Warning','Please Enter amount','warning')
else if(customer_address=='')
        swal('Warning','Please Enter customer address','warning')
else if(description=='')
        swal('Warning','Please Enter description','warning')
else{
  data={
            'type':type,
            'lawyer_name':lawyer_name,
            'lawyer_address':lawyer_address,
            'lawyer_email':lawyer_email,
            'lawyer_mobile':lawyer_mobile,
            'customer_address':customer_address,
            'cust_invoice_no':cust_invoice_no,
            'handling_invoice_no':handling_invoice_no,
            'gst':gst,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'description':description,
            'amount':amount,
            'customer_fname':customer_fname
        }
        console.log(data);
       
        $.post(BASE_URL+'admin/edit_po_invoice/'+invoiceno,data,function(fb){
          console.log(fb);
         if(fb.match('1'))
            {
                swal('Success','Invoice updated Successfully Added','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/lawyer_customer_all";
                },2000);
            }
            else 
            {
                 swal('Warning','Invoice Not updated Please Try Again','warning')   
            }
        });

}

});
$("#paymentorder_invoice").click(function(){
var lawyer_name = $("#lawyer_name").val();
var lawyer_address = $("#lawyer_address").val();
var invoice_no = $("#invoice_no").val();
var invoice_date = $("#invoice_date").val();
var order_id = $("#order_id").val();
var gst = $("#gst").val();
var lawyer_email = $("#lawyer_email").val();
var lawyer_mobile = $("#lawyer_mobile").val();
var customer_address = $("#customer_address").val();
var cust_invoice_no = $("#cust_invoice_no").val();
var handling_invoice_no = $("#handling_invoice_no").val();
var description = $("#descriptions").val();
var amount = $("#amount").val();
var type = "Payment order";
if(invoice_no=='')
        swal('Warning','Please Enter invoice no','warning')
else if(invoice_date=='')
        swal('Warning','Please Enter invoice date','warning')
else if(amount=='')
        swal('Warning','Please Enter amount','warning')
else if(customer_address=='')
        swal('Warning','Please Enter customer address','warning')
else if(description=='')
        swal('Warning','Please Enter description','warning')
else{
  data={
            'type':type,
            'lawyer_name':lawyer_name,
            'lawyer_address':lawyer_address,
            'lawyer_email':lawyer_email,
            'lawyer_mobile':lawyer_mobile,
            'customer_address':customer_address,
            'cust_invoice_no':cust_invoice_no,
            'handling_invoice_no':handling_invoice_no,
            'gst':gst,
            'invoice_no':invoice_no,
            'invoice_date':invoice_date,
            'order_id':order_id,
            'description':description,
            'amount':amount
        }
        console.log(data);
        url_invoice_no = $("#url_invoice_no").val();
        $.post(BASE_URL+'admin/payment_order/',data,function(fb){
          console.log(fb);
          url = BASE_URL+'admin/download_inv/'+url_invoice_no;
          window.open(url);
        });

}

});
$("#add_project").click(function(){
  var title = $("#title").val();
  var state = $("#states").val();
  var city = $("#citys").val();
  var lawyerid = $("#lawyer").val();
  var client_name = $("#client_name").val();
  var client_mobile = $("#client_mobile").val();
  var client_email = $("#client_email").val();
  var start_date = $("#start_date").val();
  var end_date = $("#end_date").val();
  var case_type = $("#case_type").val();
  var total_project_amt = $("#total_project_amt").val();
  var reimbursement_amt = $("#reimbursement_amt").val();
  var hearing_charges = $("#hearing_charges").val();
  var percentage = $("#percentage").val();
  var legato_commission = $("#legato_commission").val();
  var legato_commission_of_case_hearing = $("#legato_commission_of_case_hearing").val();
  var GST = $("#GST").val();
  var lawyer_fees = $("#lawyer_fees").val();
  var project_type = $('input[name="project_type"]:checked').val(); 
  var client_coming_from = $("#client_coming_from").val();
  var project_status = $('input[name="project_status"]:checked').val();
  var project_description = CKEDITOR.instances.description.getData();
  if(title == '')
    swal('Warning','Please enter Name of project','warning')
  else if(state == '')
    swal('Warning','Please select state','warning')
  else if(city == '')
    swal('Warning','Please select city','warning')
  else if(lawyerid == '')
    swal('Warning','Please select lawyer name','warning')
  else{
    data={
            'title':title,
            'state':state,
            'city':city,
            'lawyerid':lawyerid,
            'client_name':client_name,
            'client_mobile':client_mobile,
            'client_email':client_email,
            'end_date':end_date,
            'start_date':start_date,
            'case_type':case_type,
            'total_project_amt':total_project_amt,
            'reimbursement_amt':reimbursement_amt,
            'hearing_charges':hearing_charges,
            'percentage':percentage,
            'legato_commission':legato_commission,
            'legato_commission_of_case_hearing':legato_commission_of_case_hearing,
            'GST':GST,
            'lawyer_fees':lawyer_fees,
            'project_type':project_type,
            'client_coming_from':client_coming_from,
            'project_status':project_status,
            'project_description':project_description
        }
        $.post(BASE_URL+'admin/projecttracker/',data,function(fb){
          console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Project Successfully Added','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/projecttracker";
                },2000);
            }
            else 
            {
                 swal('Warning','Project Not Added Please Try Again','warning')   
            }
        })
  }

   });

$("#update_project").click(function(){
  var projectid = $("#projectid").val();
  var title = $("#title").val();
  var state = $("#states").val();
  var city = $("#citys").val();
  var lawyerid = $("#lawyer").val();
  var client_name = $("#client_name").val();
  var client_mobile = $("#client_mobile").val();
  var client_email = $("#client_email").val();
  var start_date = $("#start_date").val();
  var end_date = $("#end_date").val();
  var case_type = $("#case_type").val();
  var total_project_amt = $("#total_project_amt").val();
  var reimbursement_amt = $("#reimbursement_amt").val();
  var hearing_charges = $("#hearing_charges").val();
  var percentage = $("#percentage").val();
  var legato_commission = $("#legato_commission").val();
  var legato_commission_of_case_hearing = $("#legato_commission_of_case_hearing").val();
  var GST = $("#GST").val();
  var lawyer_fees = $("#lawyer_fees").val();
  var project_type = $('input[name="project_type"]:checked').val(); 
  var client_coming_from = $("#client_coming_from").val();
  var project_status = $('input[name="project_status"]:checked').val();
  var project_description = CKEDITOR.instances.description.getData();
  if(title == '')
    swal('Warning','Please enter Name of project','warning')
  else if(state == '')
    swal('Warning','Please select state','warning')
  else if(city == '')
    swal('Warning','Please select city','warning')
  else if(lawyerid == '')
    swal('Warning','Please select lawyer name','warning')
  else{
    data={
            'title':title,
            'state':state,
            'city':city,
            'lawyerid':lawyerid,
            'client_name':client_name,
            'client_mobile':client_mobile,
            'client_email':client_email,
            'end_date':end_date,
            'start_date':start_date,
            'case_type':case_type,
            'total_project_amt':total_project_amt,
            'reimbursement_amt':reimbursement_amt,
            'hearing_charges':hearing_charges,
            'percentage':percentage,
            'legato_commission':legato_commission,
            'legato_commission_of_case_hearing':legato_commission_of_case_hearing,
            'GST':GST,
            'lawyer_fees':lawyer_fees,
            'project_type':project_type,
            'client_coming_from':client_coming_from,
            'project_status':project_status,
            'project_description':project_description
        }
        $.post(BASE_URL+'admin/edit_project/'+projectid,data,function(fb){
          console.log(fb);
            if(fb.match('1'))
            {
                swal('Success','Project Successfully Updated','success') 
                setTimeout(function(){
                   location.href = BASE_URL+"admin/projecttracker";
                },2000);
            }
            else 
            {
                 swal('Warning','Project Not Updated Please Try Again','warning')   
            }
        })
  }

});
// Snippet Edit Starts//

$("#snippetedit").click(function (){

var image = $("#imagename").val();
var title = $("#title").val();
var shortdesc = $("#shortdesc").val();
var description = CKEDITOR.instances.description.getData();
var status = $('input[name="status"]:checked').val();
var id = $("#snippetid").val();
    if(image=='')
        swal('Warning','Please select image','warning')
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(shortdesc=='')
        swal('Warning','Please Enter short description','warning')
    else if(description=='')
        swal('Warning','Please Enter description','warning')
    else if(status=='')
        swal('Warning','Please select status','warning')
    else 
    {
        data={
            'title':title,
            'shortdesc':shortdesc,
            'description':description,
            'image':image,
            'isactive':status,
        }
        $.post(BASE_URL+'admin/snippet_edit/'+id,data,function(fb){
            if(fb.match('1'))
            {
                swal('Success','Snippet Successfully Updated','success') 
                setTimeout(function(){
                   //location.reload();
				   location.href = "https://legatoapp.com/legato/admin/snippets";
                },2000);
            }
            else 
            {
                 swal('Warning','Snippet Not Uploaded Please Try Again','warning')   
            }
        })
    }

});

// Snippet Edit Ends

$("#edit_lawyer").click(function(){
  var id = $("#lawid").val();
  var name = $("#name").val();
   var email = $("#email").val();
   var mobile = $("#mobile").val();
   var status = $('input[name="status"]:checked').val();
   var state = $("#state").val();
   var city = $("#city").val();
   var pincode = $("#pincode").val();
   var locality = $("#locality").val();
   var address1 = $("#address1").val();
   var address2 = $("#address2").val();
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
   var court = $('#court').val();

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
            'state':state,
            'city':city,
            'pincode':pincode,
            'locality':locality,
            'address1':address1,
            'address2':address2,
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

$(document).on('change','#state',function(){
    data=$(this).val();
    $.post(BASE_URL+'admin/find_city',{'state':data},function(fb){
        $('#city').html(fb);
    })
});
$(document).on('change','#states',function(){
    data=$(this).val();
    $.post(BASE_URL+'admin/find_citys',{'state':data},function(fb){
        $('#citys').html(fb);
    })
});
$(document).on('change','#citys',function(){
    data=$(this).val();
    $.post(BASE_URL+'admin/find_lawyer',{'city':data},function(fb){
        $('#lawyer').html(fb);
    })
});
$("#add_lawyer").click(function(){
  
 var name = $("#name").val();
 var email = $("#email").val();
 var mobile = $("#mobile").val();
 var status = $('input[name="status"]:checked').val();
 var state = $("#state").val();
 var city = $("#city").val();
 var pincode = $("#pincode").val();
 var locality = $("#locality").val();
 var address1 = $("#address1").val();
 var address2 = $("#address2").val();
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
 var court = $('#court').val();
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
    else if(state=='')
        swal('Warning','Please Enter state','warning')
    else if(city=='')
        swal('Warning','Please Enter city','warning')
    else if(pincode=='')
        swal('Warning','Please Enter pincode','warning')
    else if(locality=='')
        swal('Warning','Please Enter locality','warning')
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
      $("#add_lawyer").attr('disabled',true);
      data={
            'name':name,
            'image':image,
            'email':email,
            'mobile':mobile,
            'state' : state,
            'city':city,
            'pincode':pincode,
            'locality':locality,
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
            {    $("#add_lawyer").attr('disabled',true);
                swal('Success','Lawyer Addedd Successfully ','success'); 
                setTimeout(function(){
                   window.location.href = "lawyers";
                },2000);
            }
            else 
            {     $("#add_lawyer").attr('disabled',false);
                 swal('Warning','Lawyer Not Added Please Try Again','warning');   
            }
        })
    }


});

$("#blogadd").click(function (){

var image = $("#image").val();
var blog_type = $("#blog_type").val();
var title = $("#title").val();
var created_by = $("#created_by").val();
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
      else if(created_by=='')
        swal('Warning','Please Enter Created by','warning')
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
            'type':blog_type,
            'case_type':case_type,
            'short_desc':short_description,
            'description':description,
            'created_by':created_by,
            'image':image,
            
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
                   window.location.href = "blog";
                },2000);
            }
            else 
            {
                 swal('Warning','Blog Not Uploaded Please Try Again','warning')   
            }
        })
    }
});


//Snippet Starts//

$("#SnippetAdd").click(function (){

var image = $("#image").val();
var title = $("#title").val();
var shortdesc = $("#shortdesc").val();
var description = CKEDITOR.instances.description.getData();
var status = $('input[name="status"]:checked').val();

    if(image=='')
        swal('Warning','Please select image','warning')
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(shortdesc=='')
        swal('Warning','Please Enter short description','warning')
    else if(description=='' || description== null)
        swal('Warning','Please Enter description','warning')
    else if(status=='')
        swal('Warning','Please select status','warning')
    else 
    {
        data={
            'title':title,
            'shortdesc':shortdesc,
            'description':description,
            'imagename':image,
            'isactive':status,
        }
        $.post(BASE_URL+'admin/snippets/',data,function(fb){
            console.log(fb);
           if(fb.match('1'))
            {
                swal('Success','Snippet News Successfully Updated','success') 
                setTimeout(function(){
                   //location.reload();
				   window.location.href = "https://legatoapp.com/legato/admin/snippets";
                },2000);
            }
            else 
            {
                 swal('Warning','News Not Uploaded Please Try Again','warning')   
            }
        })
    }
});

$("#SnippetEdit").click(function(){
var image = $("#image").val();
var title = $("#title").val();
var shortdesc = $("#shortdesc").val();
var description = CKEDITOR.instances.description.getData();
var status = $('input[name="status"]:checked').val();
var snippetid = $("#snippetid").val();
if(image=='')
        swal('Warning','Please select image','warning')
    else if(title=='')
        swal('Warning','Please Enter title','warning')
    else if(shortdesc=='')
        swal('Warning','Please Enter short description','warning')
    else if(description=='' || description== null)
        swal('Warning','Please Enter description','warning')
    else if(status=='')
        swal('Warning','Please select status','warning')
    else 
    {
        data={
            'title':title,
            'shortdesc':shortdesc,
            'description':description,
            'imagename':image,
            'isactive':status,
            'snippetid':snippetid
        }
        $.post(BASE_URL+'admin/snippet_edit/'+snippetid,data,function(fb){
            console.log(fb);
           if(fb.match('1'))
            {
                swal('Success','Snippet News Successfully Updated','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','News Not Uploaded Please Try Again','warning')   
            }
        })
    }
});
// Snippet Ends//



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

