$(document).ready(function(e)
{
	if($(".olNationality_sel").length >0)	{ $(".olNationality_sel").append(set_nationality_opt()); $(".olNationality_sel").val("76"); }
	if($(".CovidRegistry_form").length > 0)	
	{ 
		//brgy_list(); 
		covid_exec(); 

		$(".cvWaiver_chk").change(function(e)
		{ 
			if($(this).is(":checked")){ $(".cvSubmit_btn").attr("disabled",false); } 
			else{ $(".cvSubmit_btn").attr("disabled",true); } 
		});

		$(".q10_rad").change(function(e)
		{
			if($(this).val()=="0"){ $(".q10Iinput_wrap").hide(); $(".CovidRegistry_form select[name='q10_class'], .CovidRegistry_form select[name='q10_month'], .CovidRegistry_form input[name='q10_day'], .CovidRegistry_form input[name='q10_year']").prop('required',false).val('');  }
			else{  $(".q10Iinput_wrap").show(); $(".CovidRegistry_form select[name='q10_class'], .CovidRegistry_form select[name='q10_month'], .CovidRegistry_form input[name='q10_day'], .CovidRegistry_form input[name='q10_year']").prop('required',true); }
		});

	}

	/*
	if($(".BrgyClearance_form").length > 0){ brgy_clearance(); }
	if($(".BrgyResidency_form").length > 0){ brgy_residency(); }
	if($(".BrgyIndigency_form").length > 0){ brgy_indigency(); }
	if($(".BizClearance_form").length > 0) { biz_clearance();  }
	if($(".BizClosure_form").length > 0)   { biz_closure(); }*/

});

function covid_exec()
{
	fileImage(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));
	$(".CovidRegistry_form").submit(function(e)
	{
		e.preventDefault(); var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/table.application.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("jc","21");iptData.append("gt","100-1");iptData.append("data_",data_); for(var i=0, len=uiFiles.length;i<len;i++){ iptData.append('files_[]', uiFiles[i]); } },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result=="1")
				{
					dynamicFunc= function(){ location='../'; dynamicFunc="";};
					confirm_(v.trans_code+"Registration to Covid19 Vaccine was Successfully Saved.<br/><br/>Do you want to return to Home Page?","Information", dynamicFunc);
					genQRCode();
				}
				else if(v.result=="0"){ alert_(v.error); genQRCode(); }
				else{ alert_(v.result,"Information"); }	
			});	
		},
		complete:function(e)
		{
			loading_("unload");
			$(".shareFb_lnk").unbind("click").click(function(e)
			{
				window.open('https://www.facebook.com/sharer/sharer.php?u='+host+'users/qr.profile.php?qr='+$("#qr_trans").text(),'Facebook Share', 'width=620,height=420');
				return false;
			});
			$(".shareTwit_lnk").unbind("click").click(function(e)
			{
				window.open('http://twitter.com/share?url='+host+'users/qr.profile.php?qr='+$("#qr_trans").text()+'&via=Sitename&text=Covid-19 QR Code','Facebook Share', 'width=620,height=420');
				return false;
			});
		},
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}	}).done(function(data){ loading_("unload"); });
	});

    function genQRCode(val) 
	{    
		qr= new QRious({ element: document.getElementById('qr_code'), size: 200, value: '' });
		
		var tmpUri= host+"users/qr.profile.php?qr="+$("#qr_trans").text();
	    qr.set({ foreground: 'black', size: 250, value: tmpUri });
	}
}



/*
function brgy_list()
{
	$.post('model/table.application.php',{token:"0",fb:"27",jc:"21",gt:"100-0-1"},function(json, status, xhr)
	{	
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				$(".Brgy_sel").append('<option id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>');
			}
		});
	},"json").done(function(e)
	{
	}).fail(function(xhr, status, err){ $(".mainPress_wrap .ldgPost_wrap").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
}*/

/*
function brgy_indigency()
{
	fileImage(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));
	$(".BrgyIndigency_form").submit(function(e)
	{
		e.preventDefault(); var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/table.application.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("jc","21");iptData.append("gt","2-1");iptData.append("data_",data_); for(var i=0, len=uiFiles.length;i<len;i++){ iptData.append('files_[]', uiFiles[i]); } },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result=="1")
				{
					dynamicFunc= function(){ $(".BrgyIndigency_form")[0].reset(); $(".uPhoto_pic").attr("src","../images/files/blank_profile.png"); dynamicFunc="";};	
					alert_(v.trans_code+"New Application for Barangay Clearance was Successfully Saved.","Information", dynamicFunc);
				}
				else if(v.result=="0"){ alert_(v.error); }
				else{ alert_(v.result,"Information"); }					
			});	
		},
		complete:function(e){loading_("unload");},
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}	}).done(function(data){ loading_("unload"); });
	});
}

function brgy_residency()
{
	fileImage(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));
	$(".BrgyResidency_form").submit(function(e)
	{
		e.preventDefault(); var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/table.application.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("jc","21");iptData.append("gt","1-1");iptData.append("data_",data_); for(var i=0, len=uiFiles.length;i<len;i++){ iptData.append('files_[]', uiFiles[i]); } },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result=="1")
				{
					dynamicFunc= function(){ $(".BrgyResidency_form")[0].reset(); $(".uPhoto_pic").attr("src","../images/files/blank_profile.png"); dynamicFunc="";};	
					alert_(v.trans_code+"New Application for Barangay Clearance was Successfully Saved.","Information", dynamicFunc);
				}
				else if(v.result=="0"){ alert_(v.error); }
				else{ alert_(v.result,"Information"); }					
			});	
		},
		complete:function(e){loading_("unload");},
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}	}).done(function(data){ loading_("unload"); });
	});
}

function brgy_clearance()
{
	fileImage(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));
	$(".BrgyClearance_form").submit(function(e)
	{
		e.preventDefault(); var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/table.application.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("jc","21");iptData.append("gt","0-1");iptData.append("data_",data_); for(var i=0, len=uiFiles.length;i<len;i++){ iptData.append('files_[]', uiFiles[i]); } },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result=="1")
				{
					dynamicFunc= function(){ $(".BrgyClearance_form")[0].reset(); $(".uPhoto_pic").attr("src","../images/files/blank_profile.png"); dynamicFunc="";};	
					alert_(v.trans_code+"New Application for Barangay Clearance was Successfully Saved.","Information", dynamicFunc);
				}
				else if(v.result=="0"){ alert_(v.error); }
				else{ alert_(v.result,"Information"); }					
			});	
		},
		complete:function(e){loading_("unload");},
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}	}).done(function(data){ loading_("unload"); });
	});
}

function biz_clearance()
{
	fileImage(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));
	$(".BizClearance_form").submit(function(e)
	{
		e.preventDefault(); var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/table.application.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("jc","21");iptData.append("gt","3-1");iptData.append("data_",data_); for(var i=0, len=uiFiles.length;i<len;i++){ iptData.append('files_[]', uiFiles[i]); } },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result=="1")
				{
					dynamicFunc= function(){ $(".BizClearance_form")[0].reset(); $(".uPhoto_pic").attr("src","../images/files/blank_profile.png"); dynamicFunc="";};	
					alert_(v.trans_code+"New Application for Barangay Clearance was Successfully Saved.","Information", dynamicFunc);
				}
				else if(v.result=="0"){ alert_(v.error); }
				else{ alert_(v.result,"Information"); }					
			});	
		},
		complete:function(e){loading_("unload");},
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}	}).done(function(data){ loading_("unload"); });
	});
	clientType_exec();	
}
function biz_closure()
{
	fileImage(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));
	$(".BizClosure_form").submit(function(e)
	{
		e.preventDefault(); var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/table.application.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("jc","21");iptData.append("gt","4-1");iptData.append("data_",data_); for(var i=0, len=uiFiles.length;i<len;i++){ iptData.append('files_[]', uiFiles[i]); } },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result=="1")
				{
					dynamicFunc= function(){ $(".BizClosure_form")[0].reset(); $(".uPhoto_pic").attr("src","../images/files/blank_profile.png"); dynamicFunc="";};	
					alert_(v.trans_code+"New Application for Barangay Clearance was Successfully Saved.","Information", dynamicFunc);
				}
				else if(v.result=="0"){ alert_(v.error); }
				else{ alert_(v.result,"Information"); }					
			});	
		},
		complete:function(e){loading_("unload");},
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}	}).done(function(data){ loading_("unload"); });
	});
	clientType_exec();	
}

function clientType_exec()
{
	$(".Client_sel").change(function(e)
	{
		var tmpFields='';
		if($(this).val()=="0")
		{
			tmpFields=''+
			'<div class="wrap">'+
				'<div class="wrap">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Kasarian/ Gender*</i>'+
						'<select name="gender" required> <option id="0" value="" selected hidden>Select</option><option id="1" value="0">Female</option><option id="2" value="1">Male</option> </select>'+
					'</div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Kaarawan/ Birthday*</i><input type="date" name="birthday" required placeholder="Birthday" /></div>'+
				'</div>'+
				'<div class="wrap">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Katayuang Sibil/ Status*</i>'+
						'<select name="civil_status" required> <option id="0" value="" selected hidden>Select</option><option id="1" value="1">Single</option><option id="2" value="2">Married</option><option id="3" value="3">Widow</option><option id="4" value="4">Separated</option> </select>'+
					'</div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Nasyonalidad/ Nationality*</i>'+
						'<select name="nationality" class="nationality_sel" required> <option id="0" value="" selected hidden>Select</option>'+set_nationality_opt()+' </select>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="wrap">'+
				'<div class="l40-fr">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">PWD*</i>'+
						'<select name="pwd" required> <option value="0" selected>No</option><option value="1">Yes</option> </select>'+
					'</div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Botante/ Voter*</i>'+
						'<select name="voter" required> <option value="0" selected>No</option><option value="1">Yes</option> </select>'+
					'</div>'+					
				'</div>'+	
				'<div class="r60-fr"><i class="ipt-lbl">Trabaho/ Occupation</i><input type="text" name="occupation" placeholder="Occupation" /></div>'+				
			'</div>'+
			'<div class="wrap">'+
				'<div class="l40-fr"><i class="ipt-lbl">Telepono/ Mobile No.</i>	<input type="text" name="mobile" placeholder="Mobile Number" /></div>'+
				'<div class="r60-fr"><i class="ipt-lbl">Lugar ng Kapanganakan/ Place of Birth</i><input type="text" name="birth_place" placeholder="Place of Birth" /></div>'+			
			'</div>'+
			'<div class="wrap">'+
				'<div class="ipt-lfr"><i class="ipt-lbl">E-mail<i class="ipt-lbl-notes">(For recovering account)</i></i><input type="text" name="email" placeholder="E-mail Address" /></div>'+
				'<div class="ipt-rfr"><i class="ipt-lbl">Street Address<i class="ipt-lbl-notes">(street only)</i></i><input type="text" name="street" placeholder="House #, Block #, Lot #, Street #" /></div>'+
			'</div>'+
			'<div class="wrap">'+					
				'<div class="l30-fr"><i class="ipt-lbl">Barangay</i><input type="text" name="barangay" disabled placeholder="Barangay Address" /></div>'+
				'<div class="r70-fr">'+
					'<div class="l70-fr"><i class="ipt-lbl">City, Province</i><input type="text" name="province" disabled placeholder="City, Province Address" /></div>'+			
					'<div class="r30-fr"><i class="ipt-lbl">Since</i>	<input type="number" name="since" required placeholder="Year" min="1900" max="2021" step="1" /></div>'+			
				'</div>'+
			'</div>';
		}
		else if($(this).val()=="1")
		{
			tmpFields=''+
			'<div class="wrap">'+
				'<div class="ipt-lfr"><i class="ipt-lbl">Kasarian/ Gender</i>'+
					'<select name="gender"> <option id="0" value="" selected hidden>Select</option><option id="1" value="0">Female</option><option id="2" value="1">Male</option> </select>'+
				'</div>'+
				'<div class="ipt-rfr"><i class="ipt-lbl">Kaarawan/ Birthday</i>	<input type="date" name="birthday" placeholder="Birthday" /></div>'+
			'</div>'+
			'<div class="wrap">'+
				'<div class="ipt-lfr"><i class="ipt-lbl">Telepono/ Mobile No.</i>		<input type="text" name="mobile" placeholder="Mobile Number" /></div>'+
				'<div class="ipt-rfr"><i class="ipt-lbl">E-mail<i class="ipt-lbl-notes">(For recovering account)</i></i><input type="text" name="email" placeholder="E-mail Address" /></div>'+
			'</div>'+
			'<div class="wrap"><i class="ipt-lbl">Kumpletong Address/ Complete Address</i><input type="text" name="address" placeholder="Complete Address" /></div>';
		}

		$(".Field_wrap").empty().append(tmpFields);
		$(".nationality_sel").val("76");
	});
}
*/


