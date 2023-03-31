$(document).ready(function(e)
{
	$(".ProfileBasic_btn").unbind("click").click(function(e)
	{ 
		var sForm= ''+
		'<div class="m-fr"> <i class="ipt-lbl">About Me</i>	<textarea placeholder="About Me" rows="2" name="about"></textarea> </div>'+
		'<div class="m-fr"> <i class="ipt-lbl">Work</i>		<textarea placeholder="Work" rows="3" name="work"></textarea> </div>';	

		$.post(host+'account/model/tbl.profile.php',{token:"0",fb:"27",ft:"0-2"},function(json, status, xhr)
		{
			$.each(json,function(i,v){ if(v.id){ $(".pPanel textarea[name='about']").val(v.about_me);$(".pPanel textarea[name='work']").val(v.work); } }); 
		},"json").done(function(xhr, status, err)
		{			
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel textarea[name='about']":"")});
			$(".uBNR_form").unbind("submit").submit(function(e)
			{
				e.preventDefault();
				$.post(host+'account/model/tbl.profile.php',{token:"0",fb:"27",ft:"0-3-2",data_:$(this).serialize()},function(json, status, xhr)
				{		
					$.each(json,function(i, v)
					{
						if(v.result == "1"){ dynamicFunc= function(){$(".pPanel_bg").remove();dynamicFunc="";}; alert_("Record was Successfully Updated.", "Information",dynamicFunc); pLoader_();	}
						else{	alert_(v.result,"Information");	}
					}); 
				},"json").done(function(e){ loading_("unload"); }
				).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
				loading_("Updating, Please wait...");
			});
		}).fail(function(xhr, status, err){ loading_("unload");	if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();generate_form("uBNR_form","BASIC INFO",sForm);
	});
		
	$(".ProfileAccount_btn").unbind("click").click(function(e)
	{ 
		var sForm= ''+
		'<div class="u-image-fr">'+
			'<div class="u-image">'+
				'<img class="uPhoto_pic" src="../images/files/blank_profile.png" />'+
				'<div class="uPhoto_btn u-image-btn"><i class="fa fa-camera"></i> Select Photo</div>'+
				'<input type="file" name="uplFile[]" id="uplFile" class="uPhoto_ipt" hidden accept="image/*" capture="camera" />'+
			'</div>'+
		'</div>'+
		'<div class="u-name-fr">'+
			'<div class="ipt-lfr"><i class="ipt-lbl">First Name</i><input type="text" name="fn" required placeholder="First Name" /></div>'+
			'<div class="ipt-rfr"><i class="ipt-lbl">Middle Name</i><input type="text" name="mn" placeholder="Middle Name" /></div>'+
			'<div class="m-fr"><i class="ipt-lbl">Last Name</i><input type="text" name="ln" required placeholder="Last Name" /></div>'+
		'</div>'+
		'<div class="t-dvr"></div>'+
		'<div class="m-fr">'+
			'<div class="ipt-lfr">'+
				'<div class="ipt-lfr"><i class="ipt-lbl">Gender</i>'+
					'<select name="gender" required> <option id="0" value="" selected hidden>Select</option><option id="1" value="0">Female</option><option id="2" value="1">Male</option> </select>'+
				'</div>'+
				'<div class="ipt-rfr"><i class="ipt-lbl">Birthday</i>	<input type="date" name="birthday" placeholder="Birthday" /></div>'+
			'</div>'+
			'<div class="ipt-rfr"><i class="ipt-lbl">Mobile No.</i>		<input type="text" name="mobile" placeholder="Mobile Number" /></div>'+
		'</div>'+
		'<div class="m-fr">'+
			'<div class="ipt-lfr"><i class="ipt-lbl">Current Address</i>	<input type="text" name="address"  placeholder="Current Address" /></div>'+
			'<div class="ipt-rfr"><i class="ipt-lbl">Hometown Address</i>	<input type="text" name="hometown" placeholder="Hometown Address" /></div>'+
		'</div>'+
		'<div class="m-fr"><i class="ipt-lbl">Email Address</i>	<input type="text" name="email"  class="disabled_ eee"  placeholder="Email Address" /></div>'+		
		'<div class="t-dvr"></div>'+
		'<div class="m-fr"><i class="ipt-lbl">Facebook</i>	<input type="text" class="url_" name="fb" placeholder="eg. https://www.facebook.com/account_name" /></div>'+
		'<div class="m-fr"><i class="ipt-lbl">Twitter</i>	<input type="text" class="url_" name="twitter" placeholder="eg. https://twitter.com/account_name" /></div>'+
		'<div class="m-fr"><i class="ipt-lbl">Instagram</i>	<input type="text" class="url_" name="instagram" placeholder="eg. https://www.instagram.com/account_name" /></div>';
		
		$.post(host+'account/model/tbl.profile.php',{token:"0",fb:"27",ft:"0-2"},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='fn']").val(v.fn);$(".pPanel input[name='mn']").val(v.mn);$(".pPanel input[name='ln']").val(v.ln);
					$(".pPanel select[name='gender']").val(v.gender);
					$(".pPanel input[name='birthday']").val(v.bday);
					$(".pPanel input[name='mobile']").val(v.cp);
					$(".pPanel input[name='email']").val(v.email);
					$(".pPanel input[name='address']").val(v.address);
					$(".pPanel input[name='hometown']").val(v.hometown);
					$(".pPanel input[name='fb']").val(v.fb);
					$(".pPanel input[name='twitter']").val(v.twitter);
					$(".pPanel input[name='instagram']").val(v.instagram);
					$(".uPhoto_pic").attr("src",v.image); imgA=v.image;								
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			$(".profileForm_footer").prepend('<button class="profileSecurity_btn ui-btn"><i class="fa fa-lock"></i>Security</button>');
			$(".profileSecurity_btn").unbind("click").click(function(e){ e.preventDefault(); if($(".pMFP_bg").length<=0){ gPanel("myForm","SECURITY AND LOGIN"); } });

			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='fn']":"")});
			imageFile_(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",imgA);

			$(".uANR_form").unbind("submit").submit(function(e)
			{
				e.preventDefault(); var tValid= true;	

				$(".url_").each(function(e){ if(($(this).val()) && isValidURL($(this).val())==false){ $(this).focus(); tValid=false; return false; } });
				if(tValid)
				{
					var iptData = new FormData(this);
					var gd=eval(err.responseText);	var data_= get_UserInfo($(this).serialize(),gd[1]['itoken']);
					$.ajax({url: host+"account/model/tbl.profile.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
					beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-3-1");iptData.append("data_",data_);  },
					success:function(json, status, xhr)
					{
						$.each(json, function(e, v)
						{
							if(v.result == "1")
							{	
								setProfilePic(); pLoader_();
								dynamicFunc= function(){$(".pPanel_bg").remove();dynamicFunc="";};
								alert_("Personal Information was Successfully Updated.", "Information",dynamicFunc);								
							}
							else{	alert_(v.result,"Information","",".pPanel input[name='fn']");	}					
						});	
					},
					complete:function(e){},
					error:function(xhr, status, err){ loading_("unload");	if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
				}				
			});

		}).fail(function(xhr, status, err){	loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();generate_form("uANR_form","PERSONAL INFO",sForm);	$(".uPhoto_pic").attr("src","../images/files/loading/loading-c-s.gif");
	});
	
});


var generate_form= function(form,hdr,ipt)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+			
			'<div class="popup-panel-body"><div class="popup-panel-body-in">'+ipt+'</div></div>'+
			'<div class="popup-panel-footer">'+				
				'<div class="profileForm_footer btn-fr"> <button class="btn"><i class="fa fa-save"></i>Save</button> </div>'+
			'</div>'+
		'</div>'+
	'</form></div>';
	$("body").append(tmp_form);
}
	var gPanel= function(form,hdr)
	{
		var dcItems_form = ''+
		'<div class="pMFP_bg pop-bg"><form class="ProfileSecurity_form pPanel pMFP_form popup-panel draggable" autocomplete="off">'+
			'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pMFP_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
			'<div class="popPanel_wrap popup-panel-wrap pp5">'+			
				'<div class="popup-panel-body"><div class="popup-panel-body-in">'+
					'<div class="pop-info"><b>Note: </b><i class="i">In every update, Password is Requied.</i></div>'+
					'<div class="l30-fr"><i class="ipt-lbl">Mobile Number</i> <input type="text" name="mobile" class="mobile_" placeholder="eg. 09350000111" /></div>'+
					'<div class="r70-fr"><i class="ipt-lbl">E-mail Address</i><input type="text" name="email"  class="email_ " placeholder="Email Address" /></div>'+
					'<div class="t-dvr"></div>'+
					'<div class="ipt-lfr"><div class="ipt-lbl">Username</div><input type="text" name="username" placeholder="Username" /></div>'+
					'<div class="PwIpt_fr ipt-rfr"><div class="ipt-lbl">Password</div><input type="password" name="password" class="ProfilePassword_ipt" required placeholder="Old Password" /><i class="EyeIpt_btn ipt-pw-btn fa fa-eye"></i> </div>'+
					'<div class="m-fr">'+
						'<div class="PwIpt_fr ipt-lfr"><div class="ipt-lbl">New Password</div>	  <input type="password" class="ProfileNewPwd_ipt" 	name="n_password" placeholder="At least 8 Characters" /><i class="EyeIpt_btn ipt-pw-btn fa fa-eye"></i> </div>'+
						'<div class="PwIpt_fr ipt-rfr"><div class="ipt-lbl">Re-Type Password</div><input type="password" class="ProfileConfirm_ipt" name="r_password" placeholder="At least 8 Characters" /><i class="EyeIpt_btn ipt-pw-btn fa fa-eye"></i> </div>'+
					'</div>'+
					'<div class="ProfileUpdate_info ipt-error-text" style="margin-top:0px;">Error in </div>'+
				'</div></div>'+
				'<div class="popup-panel-footer"><div class="btn-fr"> <button class="btn"><i class="fa fa-save"></i>Save</button> </div></div>'+
			'</div>'+
		'</form></div>';
		$("body").append(dcItems_form);

		$.post(host+'account/model/tbl.profile.php',{token:"0",fb:"27",ft:"0-2"},function(json, status, xhr)
		{
			$.each(json,function(i,v)
			{ 
				if(v.id){ $(".pMFP_form input[name='mobile']").val(v.cp_fa); $(".pMFP_form input[name='email']").val(v.email); $(".pMFP_form input[name='username']").val(v.un);	} 
			}); 
		},"json").done(function(xhr, status, err)
		{			
			loading_("unload"), show2_(".pMFP_bg", ".pMFP_form", {focus:((device() == "pc")?".pPanel input[name='mobile']":""),animation:false,close_button:".pMFP_cls"});
			$(".ProfileConfirm_ipt").unbind("keyup").keyup(function(e)
			{
				if($(this).val()!="" && $(this).val()!=$(".ProfileNewPwd_ipt").val()){ $(this).addClass("ipt-error"); }
				else{ $(this).removeClass("ipt-error"); $(".ProfileUpdate_info").hide().text(""); }
			});

			$(".ProfileSecurity_form").unbind("sumbit").submit(function(e)
			{
				e.preventDefault();
				if($(".ProfileNewPwd_ipt").val()!="" && $(".ProfileNewPwd_ipt").val().length<8)
				{
					$(".ProfileNewPwd_ipt").addClass("ipt-error").focus(); $(".ProfileUpdate_info").show().html("<b>Error in :</b> New password must be atleast 8 characters length.");
					$(".ProfileNewPwd_ipt").unbind("keyup").keyup(function(e){ if($(this).val()!="" && $(this).val().length<8){$(this).addClass("ipt-error");} else{ $(this).removeClass("ipt-error");} });
				}
				else if($(".ProfileNewPwd_ipt").val()!="" && $(".ProfileNewPwd_ipt").val()!=$(".ProfileConfirm_ipt").val()){ $(".ProfileConfirm_ipt").addClass("ipt-error").focus(); $(".ProfileUpdate_info").show().html("<b>Error in :</b> New Password and Re-Type Password must be the same."); }
				else
				{ 				
					$.post(host+'account/model/tbl.profile.php',{token:"0",fb:"27",ft:"0-3-0",data_:$(this).serialize()},function(json, status, xhr)
					{		
						$.each(json,function(i, v)
						{
							if(v.result=="1")
							{ 
								$(".pPanel input[name='mobile']").val($(".pMFP_form input[name='mobile']").val());
								$(".pPanel input[name='email']").val($(".pMFP_form input[name='email']").val());
								pLoader_();	dynamicFunc= function(){$(".pMFP_bg").remove();dynamicFunc="";}; alert_("Security Details was Successfully Updated.", "Information",dynamicFunc); 
							}
							else if(v.result=="0"){ $(".ProfilePassword_ipt").addClass("ipt-error").focus(); $(".ProfileUpdate_info").show().html("<b>Access Denied :</b> Invalid Password, please try again.");  }
							else if(v.result=="-1")
							{ 
								$(v.input).addClass("ipt-error").focus(); 
								$(".ProfileUpdate_info").show().html(v.error);  
							}
							else{	alert_(v.result,"Information");	} 
						}); 
					},"json").done(function(e){ loading_("unload"); }
					).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
					loading_("Updating, Please wait..."); $(".ProfileUpdate_info").hide().text(""); $(".ProfilePassword_ipt, .ProfileNewPwd_ipt, .ProfileConfirm_ipt").removeClass("ipt-error");
				}
			});
			
		}).fail(function(xhr, status, err){ loading_("unload");	if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();
	}


$(document).ready(function(e)
{
	//gPanel("myForm","SECURITY AND LOGIN"); show2_(".pMFP_bg", ".pMFP_form", {focus:((device() == "pc")?".pPanel input[name='mobile']":""),animation:false,close_button:".pMFP_cls"});
});



