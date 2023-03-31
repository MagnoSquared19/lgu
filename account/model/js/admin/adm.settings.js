$(document).ready(function(e)
{
	func1_();
});


var func1_= function(e)
{
	$.post('model/tbl.settings.php',{token:"0",fb:"27",ft:"10-0"},function(json, status, xhr)
	{
		$.each(json,function(i, v)
		{												
			if(v.id)
			{
				$(".bcPrice_val").text(toDecimal(v.clearance_price));	
				$(".crPrice_val").text(toDecimal(v.residence_price));	
				$(".ciPrice_val").text(toDecimal(v.certificate_price));	
				$(".bc1Price_val").text(toDecimal(v.biz_clearance_price));	
				$(".bc2Price_val").text(toDecimal(v.biz_closure_price));
			}
		}); 
	},"json").done(function(xhr, status, err)
	{
		var gd=eval(err.responseText);
		$(".sOlpEdt_btn").unbind("click").click(function(e)
		{ 
			var tmp_form = ''+
			'<div class="pPanel_bg pop-bg"><form class="sOlp_form pPanel popup-panel draggable" autocomplete="off">'+
				'<div class="popup-panel-header"> <b>UPDATE PRICES</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
				'<div class="popPanel_wrap popup-panel-wrap pp4">'+			
					'<div class="genMInputs_wrap popup-panel-body s-ol-price-form">'+
						'<div class="m-fr">'+
							'<div class="l60-fr"><i class="ipt-lbl-left">Business Clearance</i></div>'+
							'<div class="r40-fr"><input type="text" name="clearance" required class="decimal_" placeholder="0.00" value="'+toDecimal(gd[1]['clearance_price'])+'" /></div>'+
						'</div>'+
						'<div class="m-fr">'+
							'<div class="l60-fr"><i class="ipt-lbl-left">Building Permit</i></div>'+
							'<div class="r40-fr"><input type="text" name="residency" required class="decimal_" placeholder="0.00" value="'+toDecimal(gd[1]['residence_price'])+'" /></div>'+
						'</div>'+
						'<div class="m-fr">'+
							'<div class="l60-fr"><i class="ipt-lbl-left">Marriage Certificate</i></div>'+
							'<div class="r40-fr"><input type="text" name="indigency" required class="decimal_" placeholder="0.00" value="'+toDecimal(gd[1]['certificate_price'])+'" /></div>'+
						'</div>'+
						'<div class="m-fr">'+
							'<div class="l60-fr"><i class="ipt-lbl-left">Birth Certificate</i></div>'+
							'<div class="r40-fr"><input type="text" name="bness_clearance" required class="decimal_" placeholder="0.00" value="'+toDecimal(gd[1]['biz_clearance_price'])+'" /></div>'+
						'</div>'+
						'<div class="m-fr">'+
							'<div class="l60-fr"><i class="ipt-lbl-left">Death Certificate</i></div>'+
							'<div class="r40-fr"><input type="text" name="bness_closure" required class="decimal_" placeholder="0.00" value="'+toDecimal(gd[1]['biz_closure_price'])+'" /></div>'+
						'</div>'+
					'</div>'+
					'<div class="popFooter popup-panel-footer">'+				
						'<div class="btn-fr"> <button class="btn"><i class="fa fa-save"></i>Save</button> </div>'+
					'</div>'+
				'</div>'+
			'</form></div>';
			$("body").append(tmp_form);	
			show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='clearance']":"")});

			$(".sOlp_form").unbind("submit").submit(function(e)
			{
				e.preventDefault(); var gd=eval(err.responseText);	
				$.post('model/tbl.settings.php',{token:"0",fb:"27",ft:"10-3",data_:$(this).serialize()},function(json, status, xhr)
				{		
					$.each(json,function(i, v)
					{
						if(v.result == "1")
						{
							func1_();
							dynamicFunc = function(){$(".pPanel_bg").remove();dynamicFunc="";};
							alert_("Record was Successfully Updated.", "Information",dynamicFunc);						
						}
						else{	alert_(v.result,"Information");	}
					}); 
				},"json").done(function(e){ loading_("unload"); }
				).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
				loading_("Updating, Please wait...");
			});

		});
	}).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".bcPrice_val, .crPrice_val, .ciPrice_val, .bc1Price_val, .bc2Price_val").text("...");
}



$(document).ready(function(e)
{
	$(".sImport_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.settings.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","x0-1");iptData.append("data_",data_);  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{
					dynamicFunc = function(){ $(".pPanel_bg, .pMFP_bg").remove();dynamicFunc="";};
					if(v.fail=="0"){ alert_("New Record was Successfully Saved.", "Information",dynamicFunc); }
					else
					{
						alert_(v.success+" - New Record was Successfully Saved.<br/>"+v.fail+" - Failed<br/><br/><b>Error Message:</b><br/>"+v.error, "Information",dynamicFunc);
					}
				}
				else{alert_("Error in : "+v.result,"Error Message");} 							
			});	
		},
		complete:function(e){ loading_("unload"); },
		xhr:function(){ var xhr = new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function (evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); xhr.addEventListener("progress",function (evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
	});









	$(".sImport_formX").unbind("submit").submit(function(e)
	{
		e.preventDefault();
		var file = _("import_file").files[0];
	
		var formdata = new FormData();
		formdata.append("import_file", file);
		var ajax = new XMLHttpRequest();
		//ajax.addEventListener("progress", dyProgress, true);
		//ajax.upload.addEventListener("progress", dyProgress, false);
		/*ajax.addEventListener("load", dyComplete, false);
		ajax.addEventListener("error", dyError, false);
		ajax.addEventListener("abort", dyAbort, false);*/
		ajax.open("POST", "model/tbl.settings.php");	
		ajax.send(formdata);	

	});
});


