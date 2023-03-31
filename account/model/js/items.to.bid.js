$(document).ready(function(e)
{
	tblInstall_(plParent,pLoader_); pLoader_();
	$("#pTblStatus").unbind("change").change(function(e){ pLoader_(); });
});

var plParent=$("#dTable"), pLoader_bool=true;
var pLoader_ = function(tmpLoad_arg, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false; var tblNoData = true, tmpNav_class="noNav", tmpNav_lbl="";
		$.post('model/tbl.items.to.bid.php',{token:"0",fb:"27",ft:"0",uLike:plParent.find(".tblSearch").val(),sort:_sortFilter(plParent),page:_pagiFilter(plParent),dFr:plParent.find(".tblFr_ipt").val(),dTo:plParent.find(".tblTo_ipt").val()},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{	
					tblNoData = false;					
					var tmpTbl_result = ''+
					'<div class="tblRow t-row" id="tblRow_'+v.id+'">'+
						'<input type="checkbox" class="t-row-chk" id="t-row'+v.id+'" hidden />'+
						'<div class="tColName t-cola '+tmpNav_class+'" >'+
							'<div class="t-col-qty" > <div class="t-val">'+(_tblRow_ind(plParent)+i)+'</div> </div>'+							
							'<div class="t-col-name">'+
								'<label class="cTitle t-val" for="t-row'+v.id+'"><p>'+v.name+'</p><i class="fa fa-angle-down"></i></label>'+
							'</div>'+
						'</div>'+tmpNav_lbl+
						'<div class="t-colb">'+
							'<div class="t-col  itb-a"><div class="cTitle t-val c"><b>Ref. No.: </b>'+v.ref_no+'</div> </div>'+
							'<div class="t-col  itb-b"><div class="cTitle t-val txt-rp break-word"><b>ABC: </b>'+toDecimal(v.abc)+'</div> </div>'+
							'<div class="t-col  itb-c"><div class="cTitle t-val"><b>Acceptance: </b>'+fromDbDate(v.acceptance_fr)+'</div> </div>'+
							'<div class="t-col  itb-d"><div class="cTitle t-val"><b>Pre-BID: </b>'+fromDbDate(v.pre_bid)+'</div> </div>'+
							'<div class="t-colz itb-e"><div class="cTitle t-val"><b>Opening: </b>'+fromDbDate(v.opening)+'</div> </div>'+
						'</div>'+
					'</div>';
					plParent.find(".tblBody").append(tmpTbl_result);	
					plParent.find("#tblRow_"+v.id).data("j-v-c", {ci:v.itoken});						
				}	
				if(v.count){  _setPaginate(plParent,v.count,v.limit,v.page,pLoader_); if(v.a_level == "1"){ tmpNav_class=""; tmpNav_lbl='<label for="t-m-nava" class="t-row-nav" ><i></i></label>'; }		}
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



