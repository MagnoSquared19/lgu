$(document).ready(function(e)
{
	$(".uAdd_btn").unbind("click").click(function(e){	addNew_record();	});
	$(".uEdt_btn").unbind("click").click(function(e){	getFrom_record();	});
	$(".uDel_btn").unbind("click").click(function(e){	confirm_("Record will be permanently DELETED! Continue?","Confirmation", delFrom_record);	});
});


var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+			
			'<div class="popup-panel-body"><div class="popup-panel-body-in">'+
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
				'<div class="ipt-lfr">'+
					'<i class="ipt-lbl">Position</i>'+
					'<select class="UserPos_sel u-select" name="pos" required >'+
						'<option class="gOption" id="0" value="" selected disabled hidden >Select Position</option>'+
					'</select>'+
				'</div>'+
				'<div class="ipt-rfr">'+
					'<i class="ipt-lbl">Level</i>'+
					'<select class="UserLevel_sel u-select" name="level" required >'+
						'<option class="u-opt-df" id="0" value="" selected disabled hidden >Select Level</option>'+
					'</select>'+
				'</div>'+
				'<div class="m-fr">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Mobile No.</i>		<input type="text" name="mobile" class="mobile_" requiredX placeholder="Mobile Number" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Email Address</i>	<input type="text" name="email"  class="email_"  requiredX placeholder="Email Address" /></div>'+
				'</div>'+

				'<div class="t-dvr"></div>'+
				'<div class="m-fr">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Temporary Username</i>	<input type="text" name="usern" required placeholder="Temporary Username" /></div>'+
					'<div class="ipt-rfr">'+
						'<i class="ipt-lbl">Temporary Password</i>'+
						'<div class="PwIpt_fr m-fr">'+
							'<input type="password" name="passw" required placeholder="Temporary Password" /><i class="EyeIpt_btn ipt-pw-btn fa fa-eye"></i>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div></div>'+
			'<div class="popup-panel-footer">'+				
				'<div class="btn-fr"> <button class="btn"><i class="fa fa-save"></i>Save</button> </div>'+
			'</div>'+
		'</div>'+
	'</form></div>';
	$("body").append(tmp_form);
}


var addNew_record = function()
{	
	generate_form("aNR_form","ADD NEW RECORD");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='fn']":"")});
	imageFile_(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src")); opt1_(),opt2_();
		
	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData = new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.users.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-1");iptData.append("data_",data_);  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{	
					dynamicFunc = function(){pLoader_("new");$(".pPanel_bg").remove();dynamicFunc="";};
					alert_("New Record was Successfully Saved.", "Information",dynamicFunc);
					pLoader_("new");
				}
				else
				{
					if(v.error=="0-1"){alert_(v.result,"Information","",".pPanel input[name='usern']");}
					else{alert_("Error in : "+v.result,"Error Message");}	
				}							
			});	
		},
		complete:function(e){},
		error:function(xhr, status, err){	loading_("unload");	if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
	});
}

var getFrom_record = function()
{	
	if($(".tblRowActive").length)
	{	
		var tmpPos="", tmpLevel="";
		$.post('model/tbl.users.php',{token:"0",fb:"27",ft:"0-2",data_:gmi()},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='fn']").val(v.fn);
					$(".pPanel input[name='mn']").val(v.mn);
					$(".pPanel input[name='ln']").val(v.ln);					
					$(".pPanel input[name='mobile']").val(v.cp);
					$(".pPanel input[name='email']").val(v.email);
					$(".pPanel input[name='usern']").val(v.usern);
					$(".pPanel input[name='passw']").val(v.passw), $(".pPanel .EyeIpt_btn").hide();
					$(".uPhoto_pic").attr("src",v.image+"?"+random_());			imgA=v.image+"?"+random_();
					tmpPos=v.position;tmpLevel=v.level;
					$(".pPanel input[name='usern'], .pPanel input[name='passw']").attr("disabled",true);									
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='fn']":"")});
			imageFile_(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",imgA); opt1_(tmpPos),opt2_(tmpLevel);

			$(".uNR_form").unbind("submit").submit(function(e)
			{
				e.preventDefault(); 	var iptData = new FormData(this);
				var gd=eval(err.responseText);	var data_= get_UserInfo($(this).serialize(),gd[1]['itoken']);
				$.ajax({url: "model/tbl.users.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-3");iptData.append("data_",data_);  },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result == "1")
						{	
							dynamicFunc = function(){pLoader_("reload",v.id);$(".pPanel_bg").remove();dynamicFunc="";};
							alert_("Record was Successfully Updated.", "Information",dynamicFunc);								
						}
						else{	alert_(v.result,"Information","",".pPanel input[name='usern']");	}						
					});	
				},
				complete:function(e){setProfilePic();},
				error:function(xhr, status, err){	loading_("unload");	if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
			});

		}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();generate_form("uNR_form","UPDATE RECORD");	$(".uProfile_pic").attr("src","../images/files/loading/loading-c-s.gif");
	}		
}

var delFrom_record = function(){set_delete("const_ID");}
var set_delete = function(consID_arg)
{
	if($(".tblRowActive").length)
	{
		$.ajax({url:"model/tbl.users.php",type:"post", data:{token:"0",fb:"27",ft:"0-4",newRow:gmi()},success:function(data){	loading_("unload");	if(data == "1"){	dynamicFunc=function(){pLoader_("reload");$(".uEdt_btn, .uDel_btn").attr("disabled",true);dynamicFunc="";};	alert_("Record was Successfully DELETED!","Information",dynamicFunc);}	else{alert_(data,"Information");}	}	});	loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}

var opt1_ = function(act_arg)
{
	var tmpOpt1 = $(".UserPos_sel .gOption").text();	$(".UserPos_sel .gOption").text("loading...");	
	$.post('model/tbl.users.php',{token:"0",fb:"27",ft:"0-0-1"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ $(".UserPos_sel").append('<option class="" id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>'); }	}); 
	},"json").done(function(e)
	{
		$(".UserPos_sel .gOption").text(tmpOpt1); if(act_arg){$(".UserPos_sel [id='"+act_arg+"']").attr("selected","selected");}		
	}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".UserPos_sel option").each(function(e){ if($(this).attr("id")!="0"){$(this).remove();} });
}
var opt2_ = function(act_arg)
{
	var tmpOpt1 = $(".UserLevel_sel .gOption").text();	$(".UserLevel_sel .gOption").text("loading...");	
	$.post('model/tbl.users.php',{token:"0",fb:"27",ft:"0-0-2"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ $(".UserLevel_sel").append('<option class="" id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>'); } }); 
	},"json").done(function(e)
	{
		$(".UserLevel_sel .gOption").text(tmpOpt1); if(act_arg){$(".UserLevel_sel [id='"+act_arg+"']").attr("selected","selected");}		
	}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".UserLevel_sel option").each(function(e){ if($(this).attr("id")!="0"){$(this).remove();} });
}






