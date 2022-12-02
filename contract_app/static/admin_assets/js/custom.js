$(":input").keyup(function () {
    $(this).val($(this).val().replace(/^\s+/, ""));
});
function upload_file(form_id) {
    var url = $('#' + form_id).attr("action");
    var data_id = $('#' + form_id).attr('data-id');
    $.ajax({
        type: 'POST',
        url: url,
        data: new FormData($("#" + form_id)[0]),
        contentType: false,
        processData: false,
        success: function (data) {
            if (data != '0')
                $('#' + data_id).val(data);
            else {
                $('#' + form_id).trigger("reset");
                swal('Warning', "Only JPG And PNG File Allowed", 'warning')
            }
        },
        error: function () {
            swal("Warning", "Your Account is Invalid", "warning");
        }
    });
}

$('#add_company').click(function () {
    let client_company_name = $('#client_company_name').val();
    let pan_no = $('#pan_no').val();
    let registration_no = $('#registration_no').val();
    let gst_no = $('#gst_no').val();
    let address = $('#address').val();
    let country = $('#country').val();
    let state = $('#state').val();
    let city = $('#city').val();
    let contact_person_name = $('#contact_person_name').val();
    let contact_person_email = $('#contact_person_email').val();
    let contact_person_mobileno = $('#mobileno').val();
    if (client_company_name == '')
        swal('Warning', 'Please Enter Company Name', 'warning');
    else if (pan_no == '')
        swal('Warning', 'Please Enter Pancard No.', 'warning');
    else if (registration_no == '')
        swal('Warning', 'Please Enter Company Registration No.', 'warning');
    else if (gst_no == '')
        swal('Warning', 'Please Enter GST No.', 'warning');
    else if (address == '')
        swal('Warning', 'Please Enter address.', 'warning');
    else if (country == '')
        swal('Warning', 'Please Enter country.', 'warning');
    else if (state == '')
        swal('Warning', 'Please Enter state.', 'warning');
    else if (city == '')
        swal('Warning', 'Please Enter city.', 'warning');
    else if (contact_person_name == '')
        swal('Warning', 'Please Enter Contact person name', 'warning');
    else if (contact_person_email == '')
        swal('Warning', 'Please Enter Contact person email', 'warning');
    else if (IsEmail(contact_person_email) == false) {
        swal('Warning', 'Please Enter Correct  Email id', 'warning')
        return false;
    }
    else if (contact_person_mobileno == '')
        swal('Warning', 'Please Enter Contact person Mobile Number.', 'warning');
    else if ((contact_person_mobileno.length) < 10) {
        swal('Warning', 'Mobile no. should be 10 digit', 'warning')
    } else {
        data = {
            'client_company_name': client_company_name,
            'pan_no': pan_no,
            'registration_no': registration_no,
            'gst_no': gst_no,
            'address': address,
            'country': country,
            'state': state,
            'city': city,
            'contact_person_name': contact_person_name,
            'contact_person_email': contact_person_email,
            'contact_person_mobileno': contact_person_mobileno
        }
        $.post(BASE_URL + 'admin/add_client/', data, function (fb) {
            console.log(fb);
            if (fb.match('1')) {
                swal('Success', 'Company added successfully', 'success')
                setTimeout(function () {
                    window.location.href = "../admin/client_master";
                }, 2000);
            } else {
                swal('Warning', 'Company not added successfully, Please Try Again', 'warning')
            }
        })
    }

});

$('#edit_client').click(function () {
    let id = $('#client_id').val();
    let client_company_name = $('#client_company_name').val();
    let pan_no = $('#pan_no').val();
    let registration_no = $('#registration_no').val();
    let gst_no = $('#gst_no').val();
    let address = $('#address').val();
    let country = $('#country').val();
    let state = $('#state').val();
    let city = $('#city').val();
    let contact_person_name = $('#contact_person_name').val();
    let contact_person_email = $('#empemailid').val();
    let contact_person_mobileno = $('#contact_person_mobileno').val();

    if (client_company_name == '')
        swal('Warning', 'Please Enter Company Name', 'warning');
    else if (pan_no == '')
        swal('Warning', 'Please Enter Pancard No.', 'warning');
    else if (registration_no == '')
        swal('Warning', 'Please Enter Company Registration No.', 'warning');
    else if (gst_no == '')
        swal('Warning', 'Please Enter GST No.', 'warning');
    else if (address == '')
        swal('Warning', 'Please Enter address.', 'warning');
    else if (country == '')
        swal('Warning', 'Please Enter country.', 'warning');
    // else if (country == 'India') {
    //     // alert(country)
    //     if (state == '')
    //         swal('Warning', 'Please Enter state.', 'warning');
    // }
    // else if (country == 'others') {
    //     // alert(country)
    //     if (state == '')
    //         swal('Warning', 'Please Enter state.', 'warning');
    // }
    else if (city == '')
        swal('Warning', 'Please Enter city.', 'warning');
    else if (contact_person_name == '')
        swal('Warning', 'Please Enter person_name.', 'warning');
    else if (contact_person_email == '')
        swal('Warning', 'Please Enter person_email.', 'warning');
    else if (IsEmail(contact_person_email) == false) {
        swal('Warning', 'Please Enter Correct  Email id', 'warning')
        return false;
    }
    else if (contact_person_mobileno == '')
        swal('Warning', 'Please Enter person_mobileno.', 'warning');
    else if ((contact_person_mobileno.length) < 10) {
        swal('Warning', 'Mobile no. should be 10 digit', 'warning')
    }
    else {
        data = {
            'client_company_name': client_company_name,
            'pan_no': pan_no,
            'registration_no': registration_no,
            'gst_no': gst_no,
            'address': address,
            'country': country,
            'state': state,
            'city': city,
            'contact_person_name': contact_person_name,
            'contact_person_email': contact_person_email,
            'contact_person_mobileno': contact_person_mobileno
        }
        $.post(BASE_URL + 'admin/edit_client/' + id, data, function (fb) {
            console.log(fb);
            if (fb.match('1')) {
                swal('Success', 'Company updated successfully', 'success')
                setTimeout(function () {
                    window.location.href = BASE_URL + "admin/client_master";
                }, 2000);
            }
            else {
                swal('Warning', 'Company not updated successfully, Please Try Again', 'warning')
            }
        })
    }

});
$("#update_employee").click(function () {
    let empid = $('#empid').val();
    let empname = $("#empname").val();
    let empemailid = $("#empemailid").val();
    let empmobile = $("#empmobile").val();
    let loginid = $("#loginid").val();

    if (IsEmail(empemailid) == false) {
        swal('Warning', 'Please Enter correct Employee Email id', 'warning')
        return false;
    }
    else if ($('input:checkbox').filter(':checked').length < 1) {

        swal('Warning', 'Please Check Atleast One Role', 'warning');
    }
    else {

        var roleval = '';
        $(':checkbox:checked').each(function (i) {
            roleval += $(this).val() + ',';

        });
        roleval = roleval.replace(/,\s*$/, "");

        data = {
            'empname': empname,
            'empemailid': empemailid,
            'empmobile': empmobile,
            'loginid': loginid,
            'roles': roleval
        }

        roleval = roleval.replace(/,\s*$/, "");
        $.post(BASE_URL + 'admin/edit_employee/' + empid, data, function (fb) {
            console.log(fb);
            if (fb.match('1')) {
                swal('Success', 'Employee updated successfully', 'success')
                setTimeout(function () {
                    window.location.href = BASE_URL + "admin/employees";
                }, 2000);
            }
            else {
                swal('Warning', 'Employee not updated successfully, Please Try Again', 'warning')
            }
        })
    }

});

$("#contractNew").submit(function(event){

    var sign_date = $('#sign_date').val();
    var expiry_date = $('#chk_exe_date').val();
    var attatch_docs = $('#document').val();
    
    if(attatch_docs == ''){
        swal('Warning', 'Please select documents', 'warning');
        return false;
    }else if(sign_date == '1' || expiry_date == '1'){
        swal('Warning', 'Please select correct Review Date and Client Signing Date', 'warning');
        return false;
    }else{

        event.preventDefault();
        var datastring = $("#contractNew").serialize();
    
    $.ajax({
            type: 'POST',
            url: BASE_URL + 'admin/new_contracts',
            data: new FormData(this),
            //data: datastring,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,

            beforeSend: function () {
                $('#upload_doc').attr("disabled", "disabled");
            },
            success: function (response) {
                //console.log(response.message);
                if (response.message == 'success') {
                    swal('Success', 'Contracts uploaded successfully', 'success');
                    setTimeout(function () {
                        window.location.href = BASE_URL + "admin/my_contracts";
                    }, 500);
                } else {
                    swal('Warning', 'Contracts not uploaded successfully, Please Try Again', 'warning');
                }
            }
        }); 
    }
    
});




$("#submitnewcontracttt").click(function () {
    let doc = $("#document").val();
    let createdby = $("#createdby").val();
    let createdbyid = $("#createdbyid").val();
    alert(doc);
exit();
    let reviewdby = $("#reviewdby").val();
    let approvedby = $("#approvedby").val();
    let detail = $("#detail").val();
    let duration = $("#duration").val();
    let expirydate = $("#expirydate").val();
    let stsigningdate = $("#1stsigningdate").val();
    let executiondate = $("#executiondate").val();

    let clientid = $("#clientid").val();
    let contract_type = $("#contract_type").val();
    let contract_purpose = $("#contract_purpose").val();
    let noncompete = $("#noncompete").val();
    let consideration = $("#consideration").val();
    let condition_precident = $("#condition_precident").val();
    let condition_precident_details = $("#condition_precident_details").val();
    let conditions_subsequent = $("#conditions_subsequent").val();
    let conditions_subsequent_details = $("#conditions_subsequent_details").val();

    if (clientid == '')
    swal('Warning', 'Please Company Name', 'warning')
    else if (contract_type == '')
        swal('Warning', 'Please Select contract type', 'warning')
    else if (contract_purpose == '')
        swal('Warning', 'Please Select contract purpose', 'warning')
    else if (noncompete == '')
        swal('Warning', 'Please Select noncompete', 'warning')
    else if (consideration == '')
        swal('Warning', 'Please Select consideration', 'warning')
    // else if(condition_precident=='')
    //  swal('Warning','Please Select condition_precident','warning')
    else if (condition_precident == 'yes') {
        if (condition_precident_details == '') {
            swal('Warning', 'Please Select condition precident_details', 'warning')
        }
    } else if (conditions_subsequent == 'yes') {
        if (conditions_subsequent_details == '') {
            swal('Warning', 'Please Select conditions subsequent details', 'warning')
        }
    }
    else if (doc == '')
        swal('Warning', 'Please Select The Document', 'warning');
    else if (createdby == '')
        swal('Warning', 'Please Select createby', 'warning')
    else if (reviewdby == '')
        swal('Warning', 'Please Select reviewdby', 'warning')
    else if (approvedby == '')
        swal('Warning', 'Please Select approvedby', 'warning')
    else if (detail == '')
        swal('Warning', 'Please Select detail', 'warning')
    else if (duration == '')
        swal('Warning', 'Please Select duration', 'warning')
    else if (expirydate == '')
        swal('Warning', 'Please Select expirydate', 'warning')
    else if (stsigningdate == '')
        swal('Warning', 'Please Select stsigningdate', 'warning')
    else if (executiondate == '')
        swal('Warning', 'Please Select executiondate', 'warning')
    // else if (clientid == '')
    //     swal('Warning', 'Please Select clientid', 'warning')
    else {
        $.ajax({
            type: 'POST',
            url: BASE_URL + 'admin/new_contractsss',
            data: new FormData(this),
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,

            beforeSend: function () {
                $('#upload_doc').attr("disabled", "disabled");
            },
            success: function (response) {
                if (response == '1') {
                    swal('Success', 'Contracts uploaded successfully', 'success')
                    setTimeout(function () {
                        window.location.href = BASE_URL + "admin/my_contracts";
                    }, 2000);
                } else {
                    swal('Warning', 'Contracts not uploaded successfully, Please Try Again', 'warning')
                }
            }
        });
    }
});


$("#add_employee_step1").click(function () {
    let empname = $("#empname").val();
    let empemailid = $("#empemailid").val();
    let empmobile = $("#empmobile").val();
    var chkemail = IsEmail(empemailid);
    var emailexist = $("#chkmail").val();

    if (empname == '') {
        swal('Warning', 'Please Enter Employee Name', 'warning');
    } else if (empemailid == '') {
        swal('Warning', 'Please Enter Employee Email id', 'warning');
    } else if (chkemail == false) {
        swal('Warning', 'Please write valid e-mail format', 'warning');
    } else if (empmobile == '') {
        swal('Warning', 'Please Enter Employee Mobile no.', 'warning');
    } else if ((empmobile.length) < 10) {
        swal('Warning', 'Mobile no. should be 10 digit', 'warning')
    } else if (empemailid == '1') {
        swal('Warning', 'Your Gmail Id Is All Ready Taken', 'warning');
    } else {

        $(".section2").show()
        $(".section1").hide()

        $("#ename").text(empname);
        $('#add_employee').attr('disabled', false);
        data = {
            'empname': empname,
            'empemailid': empemailid,
            'empmobile': empmobile
        }
        // $.post(BASE_URL + 'admin/add_employee/', data, function (fb) {
        //     console.log(fb);
        //     $('#add_employee').attr('disabled', false);
        //     if (fb.match('1')) {
        //         swal('Success', 'Employee added successfullyyyy', 'success')
        //         setTimeout(function () {
        //             window.location.href = "../admin/employees";
        //         }, 2000);
        //     }
        //     else {
        //         swal('Warning', 'Employee not added successfully, Please Try Again', 'warning')
        //     }
        // })
    }

});

$("#add_employee").click(function () {

    let empname = $("#empname").val();
    let empemailid = $("#empemailid").val();
    let empmobile = $("#empmobile").val();

    if ($('input:checkbox').filter(':checked').length < 1) {

        swal('Warning', 'Please Check Atleast One Role', 'warning');
    }
    else {

        var roleval = '';
        $(':checkbox:checked').each(function (i) {
            roleval += $(this).val() + ',';

        });

        roleval = roleval.replace(/,\s*$/, "");

        //$('#add_employee').attr('disabled', true);
        data = {
            'empname': empname,
            'empemailid': empemailid,
            'empmobile': empmobile,
            'roles': roleval
        }

        $.post(BASE_URL + 'admin/add_employee/', data, function (fb) {
            //console.log(fb);
            //$('#add_employee').attr('disabled', false);
            if (fb.match('1')) {
                swal('Success', 'Employee added successfulllly', 'success')
                setTimeout(function () {
                    window.location.href = BASE_URL + "admin/employees";
                }, 2000);
            }
            else {
                swal('Warning', 'Employee not added successfully, Please Try Again', 'warning')
            }
        })
    }

});
function checkemail(email) {

    $.ajax({
        url: BASE_URL + 'admin/checkemail',
        type: 'post',
        data: { 'email': email, },
        success: function (response) {
            if (response == 'taken') {

                //$('#add_employee').val(swal('Warning', 'Your Gmail Id Is All Ready Taken', 'warning'), true);
                $('#add_employee').attr("disabled", true);
                $('#empemailid').focus();
                $('#emailerror').show();
                $('#chkmail').val(1);

            } else if (response == 'not_taken') {
                $('#add_employee').attr("disabled", false);
                $('#emailerror').hide();
                $('#chkmail').val(1);
            }
        }
    });
}
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //   alert(email);

    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }


}


$('.onlyNumber').bind('keypress', function (event) {
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});
