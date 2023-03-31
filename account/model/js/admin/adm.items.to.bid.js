$(document).ready(function(e)
{
	$(".itbAdd_btn").click(function(e){	addNew_record("new");	});
	$(".itbEdt_btn").click(function(e){	getFrom_record();		});
	$(".itbDel_btn").click(function(e){	confirm_("Record will be permanently DELETED! Continue?","Confirmation", delFrom_record);	});

	//$(".itbAdd_btn").click();
});

var generate_form= function(form,hdr,type)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+			
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="m-fr">'+
					'<div class="m-fr"><i class="ipt-lbl">Contract Name</i><input type="text" name="name" required placeholder="Contract Name" /></div>'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Reference No.</i><input type="text" name="ref_no" required placeholder="Reference Number" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">ABC</i><input type="text" name="abc" class="decimal_ txt-r" placeholder="0.00" /></div>'+
				'</div>'+
				'<div class="t-dvr"></div>'+
				'<div class="m-fr">'+
					'<div class="ipt-lfr">'+
						'<div class="ipt-lfr"><i class="ipt-lbl">Accept. From</i><input type="date" name="acceptance_fr" /></div>'+
						'<div class="ipt-rfr"><i class="ipt-lbl">Accept. To</i><input type="date" name="acceptance_to" /></div>'+
					'</div>'+
					'<div class="ipt-rfr">'+
						'<div class="ipt-lfr"><i class="ipt-lbl">Pre-BID</i><input type="date" name="pre_bid" /></div>'+
						'<div class="ipt-rfr"><i class="ipt-lbl">Opening</i><input type="date" name="opening" /></div>'+
					'</div>'+
				'</div>'+	
			'</div>'+
			'<div class="popFooter popup-panel-footer">'+				
				'<div class="btn-fr"> <button class="btn"><i class="fa fa-save"></i>Save</button> </div>'+
			'</div>'+
		'</div>'+
	'</form></div>';
	$("body").append(tmp_form);

	if(type)
	{
		$(".popFooter").prepend('<a href="#" class="pPanelRow_btn btn">Add Row/s</a>');
		$(".pPanelRow_btn").unbind("click").click(function(e)
		{
			$(".pPanel_bg").remove(); gPanel(form,hdr); show2_(".pMFP_bg", ".pMFP_form", {focus:((device() == "pc")?".pPanel input[name='name']":""),animation:false,close_button:".pMFP_cls"}); addNew_record();
			e.preventDefault(); return false;
		});
	}
}
	var gPanel= function(form,hdr)
	{
		var form_ipt= function(o)
		{
			var tmpGPanelIpt= ''+
			'<div class="ipt-lfr"><i class="ipt-lbl">Contract Name</i><input type="text" name="name" required placeholder="Contract Name" /></div>'+
			'<div class="ipt-rfr">'+
				'<div class="ipt-lfr"><i class="ipt-lbl">Reference No.</i><input type="text" name="ref_no" required placeholder="Reference Number" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">ABC</i><input type="text" name="abc" class="decimal_ txt-r" placeholder="0.00" /></div>'+
			'</div>'+
			'<div class="m-fr">'+
				'<div class="ipt-lfr">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Accept. From</i><input type="date" name="acceptance_fr" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Accept. To</i><input type="date" name="acceptance_to" /></div>'+
				'</div>'+
				'<div class="ipt-rfr">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Pre-BID</i><input type="date" name="pre_bid" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Opening</i><input type="date" name="opening" /></div>'+
				'</div>'+
			'</div>';
			return tmpGPanelIpt;
		};		
		
		var dcItems_form = ''+
		'<div class="pMFP_bg pop-bg"><form class="'+form+' pPanel pMFP_form popup-panel draggable" autocomplete="off">'+
			'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pMFP_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
			'<div class="popPanel_wrap popup-panel-wrap pp8">'+			
				'<div class="popup-panel-body"><div class="dcNewItems_body popup-panel-body-in">'+
					'<div class="genMInputs_wrap pop-main-row-ipt">'+form_ipt()+'</div>'+
				'</div></div>'+
				'<div class="popup-panel-footer">'+
					'<div class="dcAddRow_wrap pop-add-rows"><input type="number" class="dcAddRow_ipt" min="1" max="10" maxlength="1" value="1" /><a href="#" class="dcAddRow_btn btn">Go</a></div>'+				
					'<div class="btn-fr"> <button class="btn"><i class="fa fa-save"></i>Save</button> </div>'+
				'</div>'+
			'</div>'+
		'</form></div>';
		$("body").append(dcItems_form);		
		
		$(".dcAddRow_btn").unbind("click").click(function(e)
		{ 
			var dcNewRow = $(this).parent(".dcAddRow_wrap").find(".dcAddRow_ipt").val();
			for(var i=0;i<parseInt(dcNewRow);i++){ $(".dcNewItems_body").append('<div class="genInputs_wrap pop-new-rows"> <div class="pop-new-rows-ipt">'+form_ipt()+'</div> <div class="pop-new-rows-cls"><a href="#" class="genInputs_cls"><i class="fa fa-close"></i></a></div> </div>');	}
			//for(var i=0;i<parseInt(dcNewRow);i++){  $(".srcNewItems_body").append('<div class="srcGenInput_wrap genInputs_wrap pop-new-rows"> <div class="pop-new-rows-ipt">'+form_ipt($(".genMInputs_wrap").find(".SelectToClone_sel").clone().html().toString())+'</div> <div class="pop-new-rows-cls"><a href="#" class="genInputs_cls"><i class="fa fa-close"></i></a></div> </div>'); }
			center2_(null,null,{background:$(this).parents(".pMFP_bg"),panel:$(this).parents(".pMFP_form")});
			$(this).parent(".dcAddRow_wrap").find(".dcAddRow_ipt").val("1"); genNewInputs_rst();
		});

	}


var addNew_record = function(a)
{
	if(a){ generate_form("aNR_form","ADD ITEM TO BID","u");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='name']":"")}); }			
	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault(); var inputData= InputSerialize($(this));
		$.post('model/tbl.items.to.bid.php',{token:"0",fb:"27",ft:"0-1",forms_:inputData},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.result == "1")
				{	
					pLoader_("new");
					dynamicFunc = function(){ $(".pPanel_bg, .pMFP_bg").remove();dynamicFunc="";};
					if(v.fail=="0"){ alert_("New Record was Successfully Saved.", "Information",dynamicFunc); }
					else
					{
						alert_(v.success+" - New Record was Successfully Saved.<br/>"+v.fail+" - Failed<br/><br/><b>Error Message:</b><br/>"+v.error, "Information",dynamicFunc);
					}					
				}
				else{alert_("Error in : "+v.result,"Error Message");}				
			}); 
		},"json").done(function(e){ loading_("unload"); }
		).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_("Saving, Please wait...");
	});	
}

var getFrom_record = function()
{	
	if($(".tblRowActive").length)
	{	
		var tmpStat="", tmpProd="";
		$.post('model/tbl.items.to.bid.php',{token:"0",fb:"27",ft:"0-2",data_:gmi()},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='name']").val(v.name);
					$(".pPanel input[name='ref_no']").val(v.ref_no);							
					$(".pPanel input[name='abc']").val(toDecimal(v.abc));							
					$(".pPanel input[name='acceptance_fr']").val(v.acceptance_fr);							
					$(".pPanel input[name='acceptance_to']").val(v.acceptance_to);							
					$(".pPanel input[name='pre_bid']").val(v.pre_bid);							
					$(".pPanel input[name='opening']").val(v.opening);							
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='name']":"")});
			$(".uNR_form").unbind("submit").submit(function(e)
			{
				e.preventDefault(); var gd=eval(err.responseText);	
				$.post('model/tbl.items.to.bid.php',{token:"0",fb:"27",ft:"0-3",data_:get_UserInfo($(this).serialize(),gd[0]['itoken'])},function(json, status, xhr)
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
		loading_(); generate_form("uNR_form","UPDATE ITEM TO BID");
	}		
}

var delFrom_record = function(){ set_delete("const_ID"); }
var set_delete = function(consID_arg)
{
	if($(".tblRowActive").length)
	{
		$.ajax({url:"model/tbl.items.to.bid.php",type:"post", data:{token:"0",fb:"27",ft:"0-4",newRow:gmi()},success:function(data){	loading_("unload");	if(data == "1"){	dynamicFunc=function(){pLoader_("reload");$(".itbEdt_btn, .itbDel_btn").attr("disabled",true);dynamicFunc="";};	alert_("Record was Successfully DELETED!","Information",dynamicFunc);}	else{alert_(data,"Information");}	}	});	loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}
/*
function opt1_(act_arg)
{
	var tmpOpt1 = $(".poStatus_sel .gOption").text();	$(".poStatus_sel .gOption").text("loading...");	
	$.post('model/table.multiple.forms.php',{token:"0",fb:"27",ft:"0-0-1"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ $(".poStatus_sel").append('<option class="" id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>'); }	}); 
	},"json").done(function(e)
	{
		$(".poStatus_sel .gOption").text(tmpOpt1); if(act_arg){$(".poStatus_sel [id='"+act_arg+"']").attr("selected","selected");}		
	}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".poStatus_sel option").each(function(e){ if($(this).attr("id")!="0"){$(this).remove();} });
}
function opt2_(act_arg)
{
	var tmpOpt1 = $(".poProd_sel .gOption").text();	$(".poProd_sel .gOption").text("loading...");	
	$.post('model/table.multiple.forms.php',{token:"0",fb:"27",ft:"0-0-2"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ $(".poProd_sel").append('<option class="" id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>'); } }); 
	},"json").done(function(e)
	{
		$(".poProd_sel .gOption").text(tmpOpt1); if(act_arg){$(".poProd_sel [id='"+act_arg+"']").attr("selected","selected");}		
	}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".poProd_sel option").each(function(e){ if($(this).attr("id")!="0"){$(this).remove();} });
}
*/




