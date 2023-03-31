$(document).ready(function(e)
{
	$(".icAdd_btn").click(function(e){	addNew_record();	});
	$(".icEdt_btn").click(function(e){	getFrom_record();	});
	$(".icDel_btn").click(function(e){	confirm_("Record will be permanently DELETED! Continue?","Confirmation", delFrom_record);	});

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
					'</div>'+
				'</div>'+
				'<div class="u-name-fr">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">First Name</i><input type="text" name="fn" disabled placeholder="First Name" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Middle Name</i><input type="text" name="mn" disabled placeholder="Middle Name" /></div>'+
					'<div class="wrap"><i class="ipt-lbl">Last Name</i><input type="text" name="ln" disabled placeholder="Last Name" /></div>'+
				'</div>'+
				'<div class="wrap">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Barangay</i><input type="text" name="street" disabled placeholder="Barangay Address" /></div>'+
					'<div class="ipt-rfr">'+
						'<div class="l70-fr"><i class="ipt-lbl">City, Province</i><input type="text" name="city" disabled placeholder="City, Province Address" /></div>'+				
						'<div class="r30-fr"><i class="ipt-lbl">Since</i><input type="text" name="since" disabled placeholder="Year" /></div>'+				
					'</div>'+
				'</div>'+
				'<div class="t-dvr"></div>'+

				'<div class="wrap">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Purpose</i><input type="text" name="purpose" required placeholder="Purpose/ Reason" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Requested By</i><input type="text" name="requested_by" required placeholder="Name of: Agency, Company, Person" /></div>'+
				'</div>'+
				
				'<div class="wrap">'+
					'<div class="l20-fr"><i class="ipt-lbl">Monthly Income</i><input type="text" name="income" class="decimal_ txt-r" required placeholder="0.00" /></div>'+
					'<div class="r80-fr"><i class="ipt-lbl">Occupation</i><input type="text" name="occupation" required placeholder="Occupation" /></div>'+
				'</div>'+
				'<div class="wrap">'+
					'<div class="l20-fr"><i class="ipt-lbl">Order Type</i>'+
						'<select required name="d_type">'+
							'<option id="0" value="">Select</option>'+
							'<option id="1" value="1">Pickup</option>'+
							'<option id="2" value="2">Delivery</option>'+
						'</select>'+
					'</div>'+
					'<div class="r80-fr"><i class="ipt-lbl">Remarks</i><textarea placeholder="Remarks" rows="1" name="remarks"></textarea></div>'+
				'</div>'+				
				'<div class="wrap"><i class="ipt-lbl">Admin Message</i><textarea placeholder="" rows="2" name="remarks_admin" disabled ></textarea></div>'+
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
	$.post('model/tbl.indigency.certificate.php',{token:"0",fb:"27",ft:"0-1-2"},function(json, status, xhr)
	{
		$.each(json,function(i, v)
		{												
			if(v.id)
			{
				$(".pPanel input[name='fn']").val(v.fn);
				$(".pPanel input[name='mn']").val(v.mn);
				$(".pPanel input[name='ln']").val(v.ln);
				$(".pPanel input[name='street']").val(func1_(v.street_address)+v.address_brgy);
				$(".pPanel input[name='city']").val(func1_(v.address_city)+v.address_province);
				$(".pPanel input[name='since']").val(v.address_since);
				$(".uPhoto_pic").attr("src",v.image);				
			}
		}); 
	},"json").done(function(xhr, status, err)
	{
		loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='purpose']":"")});
		$(".aNR_form").unbind("submit").submit(function(e)
		{
			e.preventDefault(); var inputData = $(this).serialize();
			$.post('model/tbl.indigency.certificate.php',{token:"0",fb:"27",ft:"0-1",data_:inputData},function(json, status, xhr)
			{		
				$.each(json,function(i, v)
				{
					if(v.result == "1")
					{	
						dynamicFunc = function(){$(".pPanel_bg").remove();dynamicFunc="";};
						alert_("New Record was Successfully Saved.", "Information",dynamicFunc);
						pLoader_("reload",v.id);								
					}
					else{	alert_(v.result,"Information");	}
				}); 
			},"json").done(function(e){ loading_("unload"); }
			).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
			loading_("Updating, Please wait...");
		});

	}).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	loading_(); generate_form("aNR_form","ADD INDIGENCY CERTIFICATE","u");
}

var getFrom_record = function()
{	
	if($(".tblRowActive").length)
	{	
		var tmpStat="", tmpProd="";
		$.post('model/tbl.indigency.certificate.php',{token:"0",fb:"27",ft:"0-2",data_:gmi()},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='fn']").val(v.fn);
					$(".pPanel input[name='mn']").val(v.mn);
					$(".pPanel input[name='ln']").val(v.ln);
					$(".pPanel input[name='street']").val(func1_(v.street_address)+v.address_brgy);
					$(".pPanel input[name='city']").val(func1_(v.address_city)+func1_(v.address_province));
					$(".pPanel input[name='since']").val(v.address_since);
					$(".pPanel select[name='d_type']").val(v.d_type);
					$(".pPanel textarea[name='remarks']").val(v.remarks);
					$(".pPanel textarea[name='remarks_admin']").val(v.remarks_admin);
					$(".pPanel input[name='requested_by']").val(v.requested_by);
					$(".pPanel input[name='purpose']").val(v.purpose);
					$(".pPanel input[name='occupation']").val(v.occupation);
					$(".pPanel input[name='income']").val(toDecimal(v.income));
					$(".uPhoto_pic").attr("src",v.image);						
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='purpose']":"")});
			$(".uNR_form").unbind("submit").submit(function(e)
			{
				e.preventDefault(); var gd=eval(err.responseText);	
				$.post('model/tbl.indigency.certificate.php',{token:"0",fb:"27",ft:"0-3",data_:get_UserInfo($(this).serialize(),gd[0]['itoken'])},function(json, status, xhr)
				{		
					$.each(json,function(i, v)
					{
						if(v.result == "1")
						{	
							dynamicFunc = function(){$(".pPanel_bg").remove();dynamicFunc="";};
							alert_("Record was Successfully Updated.", "Information",dynamicFunc);
							pLoader_("reload",v.id);								
						}
						else{	alert_(v.result,"Information");	}
					}); 
				},"json").done(function(e){ loading_("unload"); }
				).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
				loading_("Updating, Please wait...");
			});

		}).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_(); generate_form("uNR_form","UPDATE INDIGENCY CERTIFICATE");
	}		
}

var delFrom_record = function(){ set_delete("const_ID"); }
var set_delete = function(consID_arg)
{
	if($(".tblRowActive").length)
	{
		$.ajax({url:"model/tbl.indigency.certificate.php",type:"post", data:{token:"0",fb:"27",ft:"0-4",newRow:gmi()},success:function(data){	loading_("unload");	if(data == "1"){ pLoader_("reload");dynamicFunc=function(){$(".icEdt_btn, .icDel_btn").attr("disabled",true);dynamicFunc="";};	alert_("Record was Successfully DELETED!","Information",dynamicFunc);}	else{alert_(data,"Information");}	}	});	loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}


var func1_= function(a){ return (a)?a+", ":a; }




