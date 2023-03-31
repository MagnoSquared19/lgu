$(document).ready(function(e)
{
	$(".bnAdd_btn").click(function(e){	addNew_record();	});
	$(".bnEdt_btn").click(function(e){	getFrom_record();	});
	$(".bnDel_btn").click(function(e){	confirm_("Record will be permanently DELETED! Continue?","Confirmation", delFrom_record);	});

});
var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+			
			'<div class="popup-panel-body"><div class="popup-panel-body-in">'+
				'<div class="m-fr">'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Date</i><input type="date"  name="date" /></div>'+
					'<div class="m-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+
				'</div>'+
				'<div class="t-dvr"></div>'+
				'<div class="m-fr">'+
					'<i class="ipt-lbl">Description</i>'+
					'<textarea placeholder="Description" rows="5" name="desc"></textarea>'+
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
	generate_form("aNR_form","ADD BREAKING NEWS","u");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='date']":"")});
	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();			
		var inputData = $(this).serialize();		
		$.post('model/tbl.breaking.news.php',{token:"0",fb:"27",ft:"0-1",data_:inputData},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.result == "1")
				{	
					dynamicFunc = function(){pLoader_("new");$(".pPanel_bg").remove();dynamicFunc="";};
					alert_("New Record was Successfully Saved.", "Information",dynamicFunc);
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
		$.post('model/tbl.breaking.news.php',{token:"0",fb:"27",ft:"0-2",data_:gmi()},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='date']").val(v.dated);
					$(".pPanel input[name='title']").val(v.title);
					$(".pPanel textarea[name='desc']").val(v.description);						
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='date']":"")});
			$(".uNR_form").unbind("submit").submit(function(e)
			{
				e.preventDefault(); var gd=eval(err.responseText);	
				$.post('model/tbl.breaking.news.php',{token:"0",fb:"27",ft:"0-3",data_:get_UserInfo($(this).serialize(),gd[0]['itoken'])},function(json, status, xhr)
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
		loading_(); generate_form("uNR_form","UPDATE BREAKING NEWS");
	}		
}

var delFrom_record = function(){ set_delete("const_ID"); }
var set_delete = function(consID_arg)
{
	if($(".tblRowActive").length)
	{
		$.ajax({url:"model/tbl.breaking.news.php",type:"post", data:{token:"0",fb:"27",ft:"0-4",newRow:gmi()},success:function(data){	loading_("unload");	if(data == "1"){	dynamicFunc=function(){pLoader_("reload");$(".bnEdt_btn, .bnDel_btn").attr("disabled",true);dynamicFunc="";};	alert_("Record was Successfully DELETED!","Information",dynamicFunc);}	else{alert_(data,"Information");}	}	});	loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}
/*
function opt1_(act_arg)
{
	var tmpOpt1 = $(".poStatus_sel .gOption").text();	$(".poStatus_sel .gOption").text("loading...");	
	$.post('model/tbl.breaking.news.php',{token:"0",fb:"27",ft:"0-0-1"},function(json, status, xhr)
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
	$.post('model/tbl.breaking.news.php',{token:"0",fb:"27",ft:"0-0-2"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ $(".poProd_sel").append('<option class="" id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>'); } }); 
	},"json").done(function(e)
	{
		$(".poProd_sel .gOption").text(tmpOpt1); if(act_arg){$(".poProd_sel [id='"+act_arg+"']").attr("selected","selected");}		
	}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".poProd_sel option").each(function(e){ if($(this).attr("id")!="0"){$(this).remove();} });
}
*/




