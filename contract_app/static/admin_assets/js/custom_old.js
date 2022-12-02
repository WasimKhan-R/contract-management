function upload_file(form_id)
{
    var url=$('#'+form_id).attr("action");
    var data_id=$('#'+form_id).attr('data-id');
    var data_msg=$('#'+form_id).attr('data-msg');
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
            swal('Warning',data_msg,'warning')
          }
        },
        error: function() { 
            swal("Warning","Your Account is Invalid","warning");
        }
});
}
function upload_policy_file(form_id){
	var url=$('#'+form_id).attr("action");
    var data_id=$('#'+form_id).attr('data-id');
    var data_msg=$('#'+form_id).attr('data-msg');
    $.ajax({
        type:'POST',
        url:url,
        data:new FormData($("#"+form_id)[0]),
        contentType:false,
        processData:false,
        success: function(data){
        	swal(data);
          if(data!='0')
            {
            	$('#'+data_id).val(data);
            	$('#'+form_id)[0].reset();
            	
    }
          else 
          {
            $('#'+form_id). trigger("reset");
            swal('Warning',data_msg,'warning')
          }
        },
        error: function() { 
            swal("Warning","Your Account is Invalid","warning");
        }
});
}
$(document).on('click','#update_drve_limit',function(){
	user_name=$('#user_name').val();
	limit=$('#limit').val();
	type=$('#type').val();
	active_date=$('#active_date').val();
	expiry_date=$('#expiry_date').val();
	if(user_name=='')
		swal('warning','Select User');
	else if(limit=='')
		swal('warning','Enter Limit');
	else if(type=='')
		swal('warning','Select Limit Type')
	else if(active_date=='')
		swal('warning','Select Active Date')
	else if(expiry_date=='')
		swal('warning','Select Expiry Date')
	else 
	{
		data={'user_id':user_name,'data_limit':limit,'type':type,'active_date':active_date,'expiry_date':expiry_date};
		$.post(BASE_URL+'admin/drive_allocation',data,function(fb){
			if(fb.match('1'))
			{
				swal('success','Drive Successfully Allocate');
				setTimeout(function(){ location.reload(); },2000);
			}
			else 
				swal('warning','Some Error Please Try Again')
		});
	}
	
});
$(document).on('click','#add_document',function(){
     document_name=$('#document_name').val();
    description=CKEDITOR.instances.description.getData();
    image_path=$('#image_path').val();
    doc_path=$('#doc_path').val();
    short_description=$('#short_description').val();
    if(document_name=='')
        swal('Warning','Enter Document Name','warning')
    else if(image_path=='')
        swal('Warning','Enter Document Logo','warning')
    else if(short_description=='')
    	swal('Warning','Enter Short Description')
    else if(doc_path=='')
        swal('Warning','Enter Document File','warning')
    else 
    {
        data={
            'document_name':document_name,
            'description':description,
            'image_path':image_path,
            'doc_path':doc_path,
            'short_description':short_description,
        }
        $.post(BASE_URL+'admin/add_legal_documetation',data,function(fb){
            if(fb.match('1'))
            {
                swal('Success','Document Successfully Uploaded','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Document Not Uploaded Please Tyr Again','warning')   
            }
        })
    }
});


$(document).on('click','#update_document',function(){
     document_name=$('#document_name').val();
    description=CKEDITOR.instances.description.getData();;
    image_path=$('#image_path').val();
    short_description=$('#short_description').val();
    doc_path=$('#doc_path').val();
    id=$('#id').val();
    if(document_name=='')
        swal('Warning','Enter Document Name','warning')
    else if(image_path=='')
    	swal('Warning','Enter Document Logo','warning')
    else if(short_description=='')
    	swal('Warning','Enter Short Description');
    else if(doc_path=='')
        swal('Warning','Enter Document File','warning')
    else 
    {
        data={
            'document_name':document_name,
            'description':description,
            'image_path':image_path,
            'doc_path':doc_path,
            'short_description':short_description,
        }
        $.post(BASE_URL+'admin/edit_document/'+id,data,function(fb){
            if(fb.match('1'))
            {
                swal('Success','Document Successfully Updated','success') 
                setTimeout(function(){
                  window.location.href=BASE_URL+'admin/add_legal_documetation';
                },2000);
            }
            else 
            {
                 swal('Warning','Document Not Updated Please Tyr Again','warning')   
            }
        })
    }
});

/*$('#add_document').click(function(){
   

    return false;
});*/
function status_change1(tbl_name,field,data_field,user_id)
{
    var status=$('#status_'+user_id+':checked').val();
    if(status!='1')
        status='0';
    
     var data={'tbl_name':tbl_name,'user_id':user_id,'status':status,'field':field,'data_field':data_field};
     $.post(BASE_URL+'admin/status_change1',data,function(fb){
        if(status==1)
				$('#status_type_'+user_id).text('Active');
		else 
				$('#status_type_'+user_id).text('Inactive');
     })
}

$(document).on('click','#add_coupon',function(){
	title=$('#coupon_title').val();
	url=$('#url').val();
	code=$('#coupon_code').val();
	description=CKEDITOR.instances.description.getData();
	brand_logo=$('#brand_logo').val();
	if(title=='')
		swal('Warning','Enter Brand Title','warning')
	else if(url=='')
		swal('Warning','Enter Coupon Redirect URl','warning')
	else if(code=='')
		swal('Warning','Enter  Coupon Code','warning');
	else if(brand_logo=='')
		swal('Warning','Please Select Brand Logo','warning');
	else 
	{
		data={'tc':description,'comp_name':title,'image_path':brand_logo,'redirect_url':url,'code':code};
		console.log(data);
		$.post(BASE_URL+'admin/coupons',data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Coupon Successfully Created','success');
				setTimeout(function(){
					location.reload();
				},2000);
			}
			else 
			{
				swal('Warning','Coupon Not Created','warning');
			}
		})
	}
	
});


$(document).on('click','#update_coupon',function(){
	title=$('#coupon_title').val();
	url=$('#url').val();
	code=$('#coupon_code').val();
	description=CKEDITOR.instances.description.getData();
	brand_logo=$('#brand_logo').val();
	id=$('#id').val();
	if(title=='')
		swal('Warning','Enter Brand Title','warning')
	else if(url=='')
		swal('Warning','Enter Coupon Redirect URl','warning')
	else if(code=='')
		swal('Warning','Enter  Coupon Code','warning');
	else if(brand_logo=='')
		swal('Warning','Please Select Brand Logo','warning');
	else 
	{
		data={'TC':description,'comp_name':title,'image_path':brand_logo,'redirect_url':url,'code':code};
		console.log(data);
		$.post(BASE_URL+'admin/edit_coupons/'+id,data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Coupon Successfully Updated','success');
				setTimeout(function(){
					window.location.href=BASE_URL+'admin/coupons/';
				},2000);
			}
			else 
			{
				swal('Warning','Coupon Not Updated','warning');
			}
		})
	}
	
});
$(document).on('click','#edit_user',function(){
	url=$('#edit_user_form').attr('action');
	name=$('#dr_name').val();
	mobile=$('#mobile').val();
	if(name=='')
		swal('Warning','Enter Name','warning');
	else if(mobile=='')
		swal('Warning','Enter Mobile','warning');
	else 
	{
		data=$('#edit_user_form').serialize();
		$.post(url,data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','User Successfully Updated','success');
				setTimeout(function(){
					window.location.href=BASE_URL+'admin/user_details/';
				},2000);
			}
			else 
			{
				swal('Warning','User Not Updated','warning');
			}
		});
	}
});
$("#add_user").attr("disabled", false);
$(document).on('click','#add_user',function(){
	url=$('#add_user_form').attr('action');
	name=$('#dr_name').val();
	mobile=$('#mobile').val();
	email = $('#email').val();
	if(name=='')
		swal('Warning','Enter Name','warning');
	else if(email=='')
		swal('Warning','Enter email','warning');
	else if(mobile=='')
		swal('Warning','Enter Mobile','warning');
	else 
	{
		data=$('#add_user_form').serialize();

		$.post(url,data,function(fb){
			$("#add_user").attr("disabled", true);
			if(fb.match('1'))
			{
				swal('Success','User Successfully Added','success');
				
				window.location.href=BASE_URL+'admin/user_details/';
			}
			else 
			{
				swal('Warning','User Not Updated','warning');
			}
		});
	}
});
$(document).on('click','#add_manager',function(){
	if($('#name').val()=='')
		swal('Warning','Please enter manager name','warning')
	else if($('#email').val()=='')
		swal('Warning','Please enter E-Mail','warning')
	else if($('#mobile').val()=='')
		swal('Warning','Please provide Mobile Number','warning')
	else if($('#contact_time').val()=='')
		swal('Warning','Please provide Start Time','warning')
	else if($('#contact_time_end').val()=='')
		swal('Warning','Please provide Start Time','warning')
	else 
	{
		//Start of Validation 
		if($('#mobile').val().length<9||$('#mobile').val().length>10)
		{
			swal('Warning','Please provide a Valid Mobile Number','warning');
			return false;
		}
		if($('#contact_time').val()>=$('#contact_time_end').val())
		{
			swal('Warning','Contact Start Time Should not be More Than Contact End Time','warning');
			return false;
		}
		
		
		url=$('#add_new_manager').attr('action');
		data=$('#add_new_manager').serialize();
		
		$.post(url,data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Manager Successfully Added','success')
				setTimeout(function(){
					location.reload();
				},2000);
			}
			else 
			{
				swal('Warning','Manager Not Added','warning')
			}
		})
	}
});

$(document).on('click','#edit_manager',function(){
	if($('#name').val()=='')
		swal('Warning','Please enter manager name','warning')
	else if($('#email').val()=='')
		swal('Warning','Please enter E-Mail','warning')
	else if($('#mobile').val()=='')
		swal('Warning','Please provide Mobile Number','warning')
	else if($('#contact_time').val()=='')
		swal('Warning','Please provide Start Time','warning')
	else if($('#contact_time_end').val()=='')
		swal('Warning','Please provide Start Time','warning')
	else 
	{
		//Start of Validation 
		if($('#mobile').val().length<9||$('#mobile').val().length>10)
		{
			swal('Warning','Please provide a Valid Mobile Number','warning');
			return false;
		}
		if($('#contact_time').val()>=$('#contact_time_end').val())
		{
			swal('Warning','Contact Start Time Should not be More Than Contact End Time','warning');
			return false;
		}
		
		url=$('#edit_new_manager').attr('action');
		data=$('#edit_new_manager').serialize();
		$.post(url,data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Manager Successfully Updated','success')
				setTimeout(function(){
					window.location.href=BASE_URL+'admin/relationship_manager/';
				},2000);
			}
			else 
			{
				swal('Warning','Manager Not Updated','warning')
			}
		})
	}
});
$(document).on('click','#add_image',function(){
	name=$('#name').val();
	url=$('#url').val();
	image1=$('#image').val();
	if(name=='')
		swal('Warning','Enter Name','warning')
	else if(url=='')
		swal('Warning','Enter URL','warning')
	else if(image1=='')
		swal('Warning','Select Image','warning')
	else 
	{
		$.post(BASE_URL+'admin/home_page_banner',{'bannername':name,'image_path':image1,'redirect_url':url},function(fb){
			if(fb.match('1'))
			{
				swal('Success','Image Successfully Added','success');
				setTimeout(function(){ location.reload(); },2000);
			}
			else 
			{
				swal('Warning','Image Not Added');
			}
		})
	}
});
$(document).on('click','#add_slider_image',function(){
	name=$('#name').val();
	url=$('#url').val();
	image1=$('#image').val();
	description1=$('#description1').val();
	data={ 'bannername':name,'redirect_url':url,'image_path':image1,'description':description1 };
	$.post(BASE_URL+'admin/home_page_banner',data,function(fb){
		if(fb.match('1'))
		{
			swal('Success','Banner Image Successfully Added','success');
			setTimeout(function(){
				location.reload();
			},2000);
		}
		else 
		{
			swal('Warning','Banner Image Not Added','warning')
		}
	})
});
$(document).on('click','#edit_slider_image',function(){
	name=$('#name').val();
	url=$('#url').val();
	image1=$('#image').val();
	id=$('#id').val();
	description1=$('#description1').val();
	data={ 'bannername':name,'redirect_url':url,'image_path':image1,'description':description1 };
	$.post(BASE_URL+'admin/edit_image/'+id,data,function(fb){
		if(fb.match('1'))
		{
			swal('Success','Banner Image Successfully Updated','success');
			setTimeout(function(){
				window.location.href=BASE_URL+'admin/home_page_banner';
			},2000);
		}
		else 
		{
			swal('Warning','Banner Image Not Updated  ','warning')
		}
	})
});
$(document).on('click','#add_category',function(){
	name=$('#name').val();
	if(name=='')
	{
		swal('Warning','Enter Name','warning')
	}
	else 
	{
	$.post(BASE_URL+'admin/category',{'name':name},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Category Successfully Added','success');
			setTimeout(function(){
				location.reload();
			},2000);
		}
		else 
		{
			swal('Warning','Category Not Added','warning');
		}
	})
	}
});


$(document).on('click','#edit_category',function(){
	name=$('#name').val();
	id=$('#id').val();
	if(name=='')
	{
		swal('Warning','Enter Name','warning')
	}
	else 
	{
	$.post(BASE_URL+'admin/edit_category/'+id,{'name':name},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Category Successfully Updated','success');
			setTimeout(function(){
				window.location.href=BASE_URL+'admin/category'
			},2000);
		}
		else 
		{
			swal('Warning','Category Not Updated','warning');
		}
	})
	}
});


$(document).on('click','#add_news',function(){
	title=$('#title').val();
	category=$('#category').val();
	image1=$('#image').val();
	desc=CKEDITOR.instances.description.getData();
	short_description = $("#short_description").val();
	if(title=='')
	{
		swal('Warning','Enter Name','warning');
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning');
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning');
	}
	else if(short_description==''){
		swal('Warning','Enter Short Description','warning');
	}
	else 
	{
		$("#add_news").attr("disabled", true);
		$("#add_news").attr('value', 'Uploading the Content....'); //versions older than 1.6
		
	$.post(BASE_URL+'admin/legal_news/',{'title':title,'category':category,'image':image1,'description':desc,'short_desc':short_description},function(fb){
		if(fb.match('1'))
		{
			swal('Success','News Successfully Posted','success');
			setTimeout(function(){
				location.reload();
			},2000);
		}
		else 
		{
			swal('Warning','News Not Posted','warning');
			$("#add_news").attr("disabled", false);
			$("#add_news").attr('value', 'Add'); //versions older than 1.6
		}
	})
	}
});

$(document).on('click','#add_topics',function(){
	title=$('#title').val();
	sub_title=$('#sub_title').val();
	category=$('#category').val();
	image1=$('#image').val();
	desc=CKEDITOR.instances.description.getData();
	if(title=='')
	{
		swal('Warning','Enter Title','warning')
	}
	else if(title=='')
	{
		swal('Warning','Enter Sub Title','warning')
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning')
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning')
	}
	else if(short_description==''){
		swal('Warning','Enter Short Description','warning');
	}
	else 
	{
		$("#add_news").attr("disabled", true);
		$("#add_news").attr('value', 'Uploading the Content....'); //versions older than 1.6
		
	$.post(BASE_URL+'admin/legal_topics/',{'heading':title,'sub_heading':sub_title,'category':category,'image':image1,'description':desc},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Topic Successfully Posted','success');
			setTimeout(function(){
				location.reload();
			},2000);
		}
		else 
		{
			swal('Warning','Topic Not Posted','warning');
			$("#add_news").attr("disabled", false);
			$("#add_news").attr('value', 'Add'); //versions older than 1.6
		}
	})
	}
});

$(document).on('click','#edit_news',function(){
	title=$('#title').val();
	category=$('#category').val();
	image1=$('#image').val();
	id=$('#id').val();
	short_description = $("#short_description").val();
	desc=CKEDITOR.instances.description.getData();
	if(title=='')
	{
		swal('Warning','Enter Name','warning');
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning');
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning');
	}
	else 
	{
	$.post(BASE_URL+'admin/edit_legal_news/'+id,{'title':title,'category':category,'image':image1,'description':desc,'short_desc':short_description},function(fb){
		/*if(fb.match('1'))
		{
			swal('Success','News Successfully Updated','success');
			setTimeout(function(){
				window.location.href=BASE_URL+'admin/legal_news';
			},2000);
		}
		else 
		{
			swal('Warning','News Not Updated','warning');
		}*/
	})
	}
});
$(document).on('click','#add_kit',function(){
     kit_name=$('#kit_name').val();
  //  description=$('#description').val();
	description=CKEDITOR.instances.description.getData();
    image_path=$('#image_path').val();
    doc_path=$('#doc_path').val();
	type=$('#type').val();
    if(kit_name=='')
        swal('Warning','Enter Kit Name','warning')
    else if(image_path=='')
        swal('Warning','Enter Kit Logo','warning')
    else if(doc_path=='')
        swal('Warning','Enter Kit File','warning')
    else 
    {
        data={
            'kit_name':kit_name,
            'description':description,
            'image_path':image_path,
            'doc_path':doc_path,
			'type':type,
        }
        $.post(BASE_URL+'admin/kits',data,function(fb){
            if(fb.match('1'))
            {
                swal('Success','Kit Successfully Added','success') 
                setTimeout(function(){
                   location.reload();
                },2000);
            }
            else 
            {
                 swal('Warning','Kit Not Added Please Tyr Again','warning')   
            }
        })
    }
});
$(document).on('click','#update_kit',function(){
	  kit_name=$('#kit_name').val();
  //  description=$('#description').val();
	description=CKEDITOR.instances.description.getData();
    image_path=$('#image_path').val();
    doc_path=$('#doc_path').val();
	type=$('#type').val();
	id=$('#id').val();
    if(kit_name=='')
        swal('Warning','Enter Kit Name','warning')
    else if(image_path=='')
        swal('Warning','Enter Kit Logo','warning')
    else if(doc_path=='')
        swal('Warning','Enter Kit File','warning')
    else 
    {
        data={
            'kit_name':kit_name,
            'description':description,
            'image_path':image_path,
            'doc_path':doc_path,
			'type':type,
        }
        $.post(BASE_URL+'admin/edit_kit/'+id,data,function(fb){
            if(fb.match('1'))
            {
                swal('Success','Kit Successfully Updated','success') 
                setTimeout(function(){
                  window.location.href=BASE_URL+'admin/kits';
                },2000);
            }
            else 
            {
                 swal('Warning','Kit Not Updated Please Tyr Again','warning')   
            }
        })
    }
});
$(document).on('click','#edit_topic',function(){
	title=$('#title').val();
	sub_title=$('#sub_title').val();
	category=$('#category').val();
	image1=$('#image').val();
	id=$('#id').val();
	desc=CKEDITOR.instances.description.getData();
	if(title=='')
	{
		swal('Warning','Enter Title','warning')
	}
	else if(title=='')
	{
		swal('Warning','Enter Sub Title','warning')
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning')
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning')
	}
	else 
	{
	$.post(BASE_URL+'admin/edit_legal_topic/'+id,{'heading':title,'sub_heading':sub_title,'category':category,'image':image1,'description':desc},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Topic Successfully Updated','success');
			setTimeout(function(){
				window.location.href=BASE_URL+'admin/legal_topics';
			},2000);
		}
		else 
		{
			swal('Warning','Topic Not Updated','warning');
		}
	})
	}
});
$(document).on('click','#add_inshorts',function(){
	title=$('#title').val();
	category=$('#category').val();
	image1=$('#image').val();
	link=$('#link').val();
	desc=CKEDITOR.instances.description.getData();
	if(title=='')
	{
		swal('Warning','Enter Title','warning')
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning')
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning')
	}
	else 
	{
		
		$("#add_news").attr("disabled", true);
		$("#add_news").attr('value', 'Uploading the Content....'); //versions older than 1.6
		
	$.post(BASE_URL+'admin/legal_inshorts/',{'title':title,'category':category,'image':image1,'description':desc,'link':link},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Legal Inshorts Successfully Posted','success');
			//setTimeout(function(){
				//location.reload();
			//},2000);
		}
		else 
		{
			swal('Warning','Legal Inshorts Not Posted','warning');
			$("#add_news").attr("disabled", false);
			$("#add_news").attr('value', 'Add'); //versions older than 1.6
		}
	})
	}
});
$(document).on('click','#edit_inshorts',function(){
	title=$('#title').val();
	category=$('#category').val();
	image1=$('#image').val();
	link=$('#link').val();
	id=$('#id').val();
	desc=CKEDITOR.instances.description.getData();
	if(title=='')
	{
		swal('Warning','Enter Name','warning')
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning')
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning')
	}
	else if(link=='')
	{
		swal('Warning','Please Provide Link','warning')
	}
	else 
	{
	$.post(BASE_URL+'admin/edit_legal_inshorts/'+id,{'title':title,'category':category,'image':image1,'description':desc,'link':link},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Legal Inshorts Successfully Updated','success');
			//setTimeout(function(){
			//	window.location.href=BASE_URL+'admin/legal_inshorts';
			//},2000);
		}
		else 
		{
			swal('Warning','Legal Inshorts Not Updated','warning');
		}
	})
	}
});
$(document).on('click','#add_judgements',function(){
	title=$('#title').val();
	category=$('#category').val();
	image1=$('#image').val();
	sub_title=$('#sub_title').val();
	desc=CKEDITOR.instances.description.getData();
	if(title=='')
	{
		swal('Warning','Enter Title','warning')
	}
	else if(sub_title=='')
	{
		swal('Warning','Enter Sub Title','warning')
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning')
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning')
	}
	else 
	{
		$("#add_news").attr("disabled", true);
		$("#add_news").attr('value', 'Uploading the Content....'); //versions older than 1.6
		
	$.post(BASE_URL+'admin/judgements/',{'title':title,'category':category,'image':image1,'description':desc,'sub_title':sub_title},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Judgements Successfully Posted','success');
			setTimeout(function(){
				location.reload();
			},2000);
		}
		else 
		{
			swal('Warning','Judgements Not Posted','warning');
			$("#add_news").attr("disabled", false);
			$("#add_news").attr('value', 'Add'); //versions older than 1.6
		}
	})
	}
});
$(document).on('click','#edit_judgements',function(){
	title=$('#title').val();
	id=$('#id').val();
	category=$('#category').val();
	image1=$('#image').val();
	sub_title=$('#sub_title').val();
	id=$('#id').val();
	desc=CKEDITOR.instances.description.getData();
	if(title=='')
	{
		swal('Warning','Enter Title','warning')
	}
	else if(sub_title=='')
	{
		swal('Warning','Enter Sub Title','warning')
	}
	else if(category=='')
	{
		swal('Warning','Select Category','warning')
	}
	else if(image1=='')
	{
		swal('Warning','Select Image','warning')
	}
	else 
	{
	$.post(BASE_URL+'admin/edit_judgements/'+id,{'title':title,'category':category,'image':image1,'description':desc,'sub_title':sub_title},function(fb){
		if(fb.match('1'))
		{
			swal('Success','Judgements Successfully Updated','success');
			setTimeout(function(){
				window.location.href=BASE_URL+'admin/judgements';
			},2000);
		}
		else 
		{
			swal('Warning','Judgements Not Updated','warning');
		}
	})
	}
});
$(document).on('click','#add_insurance',function(){
	user_id=$('#user_id').val();
	insurance_cost=$('#insurance_cost').val();
	image_path=$('#image_path').val();
	image_path1=$('#image_path1').val();
	valid_from=$('#valid_from').val();
	valid_to=$('#valid_to').val();
	desc=CKEDITOR.instances.description.getData();
	if(user_id=='')
		swal('Warning','Select User','warning');
	else if(insurance_cost=='')
		swal('Warning','Enter insurance cost','warning');
	else if(image_path=='')
		swal('Warning','Select Document File','warning');
	else if(valid_from=='')
		swal('Warning','Select Valid From Date','warning');
	else if(valid_to=='')
		swal('Warning','Please Select Valid To Date','warning')
	else if(valid_from>=valid_to)
		swal('Warning','Start Date Should be less than End Date')
	else 
	{
		data={
			'user_id':user_id,
			'insurance_cost':insurance_cost,
			'file':image_path,
			'file2':image_path1,
			'valid_from':valid_from,
			'valid_to':valid_to,
			'description':desc,
			'pkg_id':$('#package_id').val(),
		};
		
		
		$.post(BASE_URL+'admin/indemnity_insurance',data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Insurance Successfully Created','success');
				setTimeout(function(){
					location.reload();
				},2000)
			}
			else 
			{
				swal('Warning','Insurance Not Created','warning');
			}
		});
	}
	
});
$(document).on('click','#edit_insurance',function(){
	user_id=$('#user_id').val();
	insurance_cost=$('#insurance_cost').val();
	image_path=$('#image_path').val();
	image_path1=$('#image_path1').val();
	valid_from=$('#valid_from').val();
	valid_to=$('#valid_to').val();
	id=$('#id').val();
	desc=CKEDITOR.instances.description.getData();
	if(user_id=='')
		swal('Warning','Select User','warning');
	else if(insurance_cost=='')
		swal('Warning','Enter insurance cost','warning');
	else if(image_path=='')
		swal('Warning','Select Document File','warning');
	else if(valid_from=='')
		swal('Warning','Select Valid From Date','warning');
	else if(valid_to=='')
		swal('Warning','Please Select Valid To Date','warning')
	else 
	{
		data={
			'user_id':user_id,
			'insurance_cost':insurance_cost,
			'file':image_path,
			'file2':image_path1,
			'valid_from':valid_from,
			'valid_to':valid_to,
			'description':desc,
			'pkg_id':$('#package_id').val(),
		};
		
		
		$.post(BASE_URL+'admin/edit_insurance/'+id,data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Insurance Successfully Updated','success');
				setTimeout(function(){
					window.location.href=BASE_URL+'admin/indemnity_insurance';
				},2000)
			}
			else 
			{
				swal('Warning','Insurance Not Updated','warning');
			}
		});
	}
});
function user_info()
{
	user_id=$('#user_id').val();
	if(user_id!='')
	{
		$.post(BASE_URL+'admin/find_ins_info',{'user_id':user_id},function(fb){
			data=$.parseJSON(fb);
			$('#package').val(data.packagename);
			$('#insurance_cost').val(data.package_cost);
			$('#package_id').val(data.pak_id);
		});
	}
}
/*User Section JS Start*/
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
/*$(document).click('.open_popup',function(){
	$('#cup_pop').modal('show');
});*/
$(document).on('click','#contact_btn',function(fb){
	name=$('#name').val();
	mobile=$('#mobile').val();
	city=$('#city').val();
	msg=$('#msg').val();
	if(name=='')
		swal('Warning','Enter Name','warning')
	else if(mobile=='')
		swal('Warning','Enter Mobile No','warning')
	else if(city=='')
		swal('Warning','Enter City','warning')
	else if(msg=='')
		swal('Warning','Enter Message','warning')
	else 
	{
		data=$('#contact_form').serialize();
		$.post(BASE_URL+'users/contact',data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Contact Successfully Sent','success')
				$('#contact_form').trigger('reset');
			}
			else 
			{
				swal('Warning','Contact Not Sent','warning')
			}
		})
	}
});
$(document).on('click','#add_cheque',function(){
	if($('#username').val()=='')
		swal('Warning','Enter User Name','warning');
	else if($('#email').val()=='')
		swal('Warning','Enter Email id','warning');
	else if($('#dr_type').val()=='')
		swal('Warning','Select Doctor type','warning');
	else if($('#invoice_date').val()=='')
		swal('Warning','Select Invoice Date','warning');
	else if($('#cost').val()=='')
		swal('Warning','Enter Total cost','warning');
	else if($('#cheque_no').val()=='')
		swal('Warning','Enter Cheque Number','warning');
	else if($('#account_no').val()=='')
		swal('Warning','Enter Account Number','warning');
	else if($('#ifsc').val()=='')
		swal('Warning','Enter IFSC code','warning');
	else if($('#cheque_date').val()=='')
		swal('Warning','Enter Cheque date','warning');
	else {
		
		if($("input[name='legal_document_templates1']:checked").val()=='1'){
			legal_document_templates1=1;
		}else {
			legal_document_templates1=0;
		}
				
		if($("input[name='legal_document_templates2']:checked").val()=='2'){
			legal_document_templates2=1;}
				
			else {
				legal_document_templates2=0;
			}
		if($("input[name='legal_document_templates3']:checked").val()=='3'){
			legal_document_templates3=1;
		}
			else {
				legal_document_templates3=0;
			}
		if($("input[name='legal_document_templates4']:checked").val()=='4'){
			legal_document_templates4=1;
		}
		else {
			legal_document_templates4=0;
			}
		if($("input[name='legal_document_templates5']:checked").val()=='5'){
			legal_document_templates5=1;
		}
		else{
			legal_document_templates5=0;
		} 
		data={
			'name':$('#username').val(),
			'email':$('#email').val(),
			'dr_type':$('#dr_type').val(),
			'legato_drive_up':$('#drive').val(),
			'policy_begin_date':$('#policy_begin_date').val(),
			'policy_end_date':$('#policy_end_date').val(),
			'invoice_date':$('#invoice_date').val(),
			'indemnity_insurance_up_to':$('#indemnity_insurance_up_to').val(),
			'legal_document_templates1':legal_document_templates1,
			'legal_document_templates2':legal_document_templates2,
			'legal_document_templates3':legal_document_templates3,
			'legal_document_templates4':legal_document_templates4,
			'legal_document_templates5':legal_document_templates5,
			'discount':$('#discount').val(),
			'cost':$("#cost").val(),
			'cheque_no':$("#cheque_no").val(),
			'account_name':$("#account_name").val(),
			'account_no':$("#account_no").val(),
			'bank_name':$("#bank_name").val(),
			'bank_ifsc_code':$("#bank_ifsc_code").val(),
			'cheque_date':$("#cheque_date").val(),
			'package_name':$("#package_name").val()
		}
	if(data){
		$.post(BASE_URL+'admin/add_cheque',data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Cheque Successfully Added','success')
				setTimeout(function(){
					location.reload();
				},2000);
			}
			else 
			{
				swal('Success','Cheque Not Added','fail')
			}
		});
	}
	}


});
$(document).on('click','#add_package',function(fb){
	if($('#packagename').val()=='')
		swal('Warning','Enter Package Name','warning');
	else if($('#package_cost').val()=='')
		swal('Warning','Enter Package Cost','warning');
	else if($('#type').val()=='')
		swal('Warning','Select Duration Type','warning');
	else if($('#indemnity_insurance_up_to').val()=='')
		swal('Warning','Indemnity Insurance up to','warning')
	else 
	{
		if($("input[name='legal_document_templates']:checked").val()=='1')
				legal_document_templates=1;
			else 
				legal_document_templates=0;
			
		if($("input[name='legato_legal_kit']:checkedcked").val()=='1')
				legato_legal_kit=1;
			else 
				legato_legal_kit=0;
		if($("input[name='notification_convering_in_lows']:checked").val()=='1')
				notification_convering_in_lows=1;
			else 
				notification_convering_in_lows=0;
		if($("input[name='support_on_call']:checked").val()=='1')
				support_on_call=1;
			else 
				support_on_call=0;
		if($("input[name='query_will_be_solve']:checked").val()=='1')
				query_will_be_solve=1;
			else 
				query_will_be_solve=0;
		if($("input[name='discount_of_consulting_fees']:checked").val()=='1')
				discount_of_consulting_fees=1;
			else 
				discount_of_consulting_fees=0;
			
		
		data={
			'packagename':$('#packagename').val(),
			'package_cost':$('#package_cost').val(),
			'duration_type':$('#type').val(),
			'indemnity_insurance_up_to':$('#indemnity_insurance_up_to').val(),
			'legato_drive_up':$('#legato_drive_up').val(),
			'legal_document_templates':legal_document_templates,
			'legato_legal_kit':legato_legal_kit,
			'access_to_lawyer_netword':$("input[name='access_to_lawyer_netword']:checked").val(),
			'notification_convering_in_lows':notification_convering_in_lows,
			'support_on_call':support_on_call,
			'query_will_be_solve':query_will_be_solve,
			'discount_of_consulting_fees':discount_of_consulting_fees,
			
			
			
			
		}
		$.post(BASE_URL+'admin/add_pak',data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Package Successfully Created','success')
				setTimeout(function(){
					location.reload();
				},2000);
			}
			else 
			{
				swal('Success','Package Not Created','success')
			}
		});
	}
});


$(document).on('click','#update_package',function(fb){
	id=$('#id').val();
	if($('#packagename').val()=='')
		swal('Warning','Enter Package Name','warning');
	else if($('#package_cost').val()=='')
		swal('Warning','Enter Package Cost','warning');
	else if($('#type').val()=='')
		swal('Warning','Select Duration Type','warning');
	else if($('#indemnity_insurance_up_to').val()=='')
		swal('Warning','Indemnity Insurance up to','warning')
	else 
	{
		
		
		if($("input[name='legal_document_templates']:checked").val()=='1')
				legal_document_templates=1;
			else 
				legal_document_templates=0;
			
		if($("input[name='legato_legal_kit']:checked").val()=='1')
				legato_legal_kit=1;
			else 
				legato_legal_kit=0;
		if($("input[name='notification_convering_in_lows']:checked").val()=='1')
				notification_convering_in_lows=1;
			else 
				notification_convering_in_lows=0;
		if($("input[name='support_on_call']:checked").val()=='1')
				support_on_call=1;
			else 
				support_on_call=0;
		if($("input[name='query_will_be_solve']:checked").val()=='1')
				query_will_be_solve=1;
			else 
				query_will_be_solve=0;
		if($("input[name='discount_of_consulting_fees']:checked").val()=='1')
				discount_of_consulting_fees=1;
			else 
				discount_of_consulting_fees=0;
			
		
		data={
			'packagename':$('#packagename').val(),
			'package_cost':$('#package_cost').val(),
			'duration_type':$('#type').val(),
			'indemnity_insurance_up_to':$('#indemnity_insurance_up_to').val(),
			'legato_drive_up':$('#legato_drive_up').val(),
			'legal_document_templates':legal_document_templates,
			'legato_legal_kit':legato_legal_kit,
			'access_to_lawyer_netword':$("input[name='access_to_lawyer_netword']:checked").val(),
			'notification_convering_in_lows':notification_convering_in_lows,
			'support_on_call':support_on_call,
			'query_will_be_solve':query_will_be_solve,
			'discount_of_consulting_fees':discount_of_consulting_fees,	
		}
		
		$.post(BASE_URL+'admin/edit_package/'+id,data,function(fb){
			if(fb.match('1'))
			{
				swal('Success','Package Successfully Updated','success')
				setTimeout(function(){
					window.location.href=BASE_URL+'admin/packages';
				},2000);
			}
			else 
			{
				swal('Success','Package Not Updated','success')
			}
		});
	}
});


$(document).on('click','.like_blog',function(){
	blog_id=$(this).attr('data-id');
	user_id=$(this).attr('data-user');
	like_count=parseInt($('#like_count_'+blog_id).text());
	$.post(BASE_URL+'users/blog_like',{'bp_id':blog_id,'uid':user_id},function(fb){
		cls=$('#icon_'+blog_id).hasClass('icon-heart5');
		if(cls)
		{
			$('#like_count_'+blog_id).text(like_count-1);
			$('#icon_'+blog_id).removeClass('icon-heart5');
			$('#icon_'+blog_id).addClass('icon-heart6');
		}
		else 
		{
			$('#like_count_'+blog_id).text(like_count+1);
			$('#icon_'+blog_id).removeClass('icon-heart6');
			$('#icon_'+blog_id).addClass('icon-heart5');
		}
	})
});
$(document).on('click','#update_profile1',function(){
	address=$('#address_1').val();
	setTimeout(function(){ $('#update_profile').trigger('click');  },1000)
	
	initMap();
});
$(document).on('click','#update_profile',function(){
	address=$('#address_1').val();
	initMap();
	data=$('#profile_form').serialize();
	$.post(BASE_URL+'users/profile',data,function(fb){
		if(fb.match('1'))
		{
			swal('Success','Profile Successfully Updated','success');
			setTimeout(function(){ location.reload(); },2000);
		}
		else 
		{
			swal('Warning','Profile Not Updated','warning');
		}
	});
});
function show_invoice(id)
{
	$.post(BASE_URL+'users/invoice',{'id':id},function(fb){
		$('#invoice_container').html(fb);
		$('#invoice').modal('toggle');
	})
}
function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}
/*User Section JS End*/


$(document).on('change','#state',function(){
	data=$(this).val();
	$.post(BASE_URL+'users/find_city',{'state_id':data},function(fb){
		$('#city').html(fb);
	})
});
$(document).on('change','#states',function(){
	data=$(this).val();
	$.post(BASE_URL+'admin/find_city',{'state_id':data},function(fb){
		$('#city').html(fb);
	})
});
function delete_pop(id,data_target)
{
	//data_target=$(this).attr('data-target');
	
	$('#del_yes').attr('href',data_target);
	$('#del_model').modal('show');

}

blog_count=$('#blog_count').val();

if(blog_count=='5')
{
	
	 function load_country_data(page)
	 {
	  $.ajax({
	   url:BASE_URL+"index.php/users/blog_pagination/"+page,
	   method:"GET",
	   success:function(data)
	   {
	    $('.blog_disp').html(data);
	   }
	  });
	 }
	 
	 load_country_data(1);

	 $(document).on("click", ".pagination li a", function(event){
	  event.preventDefault();
	  var page = $(this).data("ci-pagination-page");
	  load_country_data(page);
	 });
}

