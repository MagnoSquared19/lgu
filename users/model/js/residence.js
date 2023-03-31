$(document).ready(function(e)
{
	tblInstall_(plParent,pLoader_);
	pLoader_();

	$("#pTblStatus").unbind("change").change(function(e){ pLoader_(); });
});

var plParent=$("#dTable"), pLoader_bool=true;
var pLoader_ = function(tmpLoad_arg, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false; var tblNoData = true, tmpNav_class="noNav", tmpNav_lbl="", tmpAdm_lvl="";
		$.post('model/tbl.residence.php',{token:"0",fb:"27",ft:"0",uLike:plParent.find(".tblSearch").val(),sort:_sortFilter(plParent),page:_pagiFilter(plParent)},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					var tmpStatus="";
					if(v.status=="0"){ tmpStatus="For Review"; }
					else if(v.status=="1"){ tmpStatus="Processing"; }
					else if(v.status=="2"){ tmpStatus="Pending"; }
					else if(v.status=="3"){ tmpStatus="For Pickup"; }
					else if(v.status=="4"){ tmpStatus="On the way"; }
					else if(v.status=="5"){ tmpStatus="Cancelled"; }
					else if(v.status=="9"){ tmpStatus="Completed"; }

					var tmpDType= (v.d_type=="1")?"Pick-up":(v.d_type=="2")?"Deliver":"";

					tblNoData = false;					
					var tmpTbl_result = ''+
					'<div class="tblRow t-row" id="tblRow_'+v.id+'">'+
						'<input type="checkbox" class="t-row-chk" id="t-row'+v.id+'" hidden />'+
						'<div class="tColName t-cola '+tmpNav_class+'" >'+
							'<div class="t-col-qty" > <div class="t-val">'+(_tblRow_ind(plParent)+i)+'</div> </div>'+							
							'<div class="t-col-name">'+
								'<label class="cTitle t-val" for="t-row'+v.id+'"><p>'+fromDbDate(v.dated)+' - '+tmpStatus+'</p><i class="fa fa-angle-down"></i></label>'+
							'</div>'+
						'</div>'+tmpNav_lbl+
						'<div class="t-colb">'+
							'<div class="t-col  cr-a"><div class="cTitle t-val"><b>Type: </b>'+tmpDType+'</div> </div>'+
							'<div class="t-col  cr-b"><div class="cTitle t-val"><b>Date Issued: </b>'+fromDbDate(v.date_issued)+'</div> </div>'+
							'<div class="t-col  cr-c"><div class="cTitle t-val"><b>Tax Cert. No.: </b>'+v.tax_no+'</div> </div>'+
							'<div class="t-col  cr-d"><div class="cTitle t-val"><b>Tax Issued: </b>'+fromDbDate(v.tax_issued)+'</div> </div>'+
							'<div class="t-colz cr-e"><div class="cTitle t-val"><b>Remarks: </b>'+((v.remarks)?v.remarks+"<br/>":"")+((v.remarks_admin)?"Admin: "+v.remarks_admin:"")+'</div> </div>'+
						'</div>'+
					'</div>';
					plParent.find(".tblBody").append(tmpTbl_result);	
					plParent.find("#tblRow_"+v.id).data("j-v-c", {ci:v.itoken});						
				}	
				if(v.count){  _setPaginate(plParent,v.count,v.limit,v.page,pLoader_); if(v.a_level == "0"){ tmpAdm_lvl="1"; tmpNav_class=""; tmpNav_lbl='<label for="t-m-nava" class="t-row-nav" ><i></i></label>'; }		}
			}); 
		},"json").done(function(e)
		{
			pLoader_bool=true; plParent.find(".tblLoading_fr").remove();
			if(tblNoData){	plParent.find(".tblBody").append("<div class='tbl-no-result'>No Record Found</div>");	}
			if(tmpID_arg){	plParent.find("#tblRow_"+tmpID_arg).click();	}
			global_events();

		}).fail(function(xhr, status, err){ pLoader_bool=true; if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".tblBody").empty().append(tblLoading_tag);
	}	
}

/*
var tmpOpt1 = $(".grpBrgy_sel option[id='0']").text();	
function opt1_(act_arg)
{	
	$(".Sel1_sel option[id='0']").text("loading...");	
	$.post('model/table.ab.group.php',{token:"0",fb:"27",ft:"0-0-1"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ $(".Sel1_sel").append('<option class="" id="'+v.id+'" value="'+v.barangay+'">'+v.barangay+'</option>'); }	}); 
	},"json").done(function(e)
	{
		var lastSel = $(".glBrgy_sel option:selected");
		$(".Sel1_sel option[id='0']").text(tmpOpt1); if(act_arg){$(".Sel1_sel [id='"+act_arg+"']").attr("selected","selected");}	
		$(".Sel1_sel").unbind("change"), 
		$(".Sel1_sel").change(function(e){	if(pLoader_bool){opt2_();	$(".grpKey_sel [id!='0']").remove();$(".grpKey_sel [id='0']").prop("selected","selected");		}	else{lastSel.prop("selected", true);}	});

		$(".grUpdate_btn").prop("disabled",false);

	}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".Sel1_sel option[id!='0']").remove();
}
function opt2_(act_arg)
{	
	if($(".Sel1_sel").val() != "")
	{
		
		$(".Sel2_sel option[id='0']").text("loading...");	
		$.post('model/table.ab.group.php',{token:"0",fb:"27",ft:"0-0-2",selA:$(".Sel1_sel").children(":selected").val()},function(json, status, xhr)
		{		
			$.each(json,function(i, v){ if(v.id){ $(".Sel2_sel").append('<option class="" id="'+v.id+'" value="'+v.ln+", "+v.fn+" "+v.mn+'">'+v.ln+", "+v.fn+" "+v.mn+'</option>'); }	}); 
		},"json").done(function(e)
		{
			$(".Sel2_sel option[id='0']").text("Select Values"); if(act_arg){$(".Sel2_sel [id='"+act_arg+"']").attr("selected","selected");}	
			$(".Sel2_sel").unbind("change"), $(".Sel2_sel").change(function(e){	opt3_();	});

		}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	}
	else{	$(".Sel2_sel option[id='0']").prop("selected","selected").change();  }
	$(".Sel2_sel option[id!='0']").remove();
}
*/




