$(document).ready(function(e)
{
	tblInstall_(plParent,pLoader_);
	pLoader_();

	$("#pTblStatus").unbind("change").change(function(e){ pLoader_(); });
});
var tmpStatus={a:"For Review",b:"Processing",c:"Pending",d:"For Pickup",e:"On the way",f:"Cancelled",g:"Completed"};

var plParent=$("#dTable"), pLoader_bool=true;
var pLoader_ = function(tmpLoad_arg, tmpID_arg)
{	
	if(pLoader_bool)
	{	
		pLoader_bool=false; var tblNoData = true, tmpNav_class="noNav", tmpNav_lbl="", tmpAdm_lvl="";
		$.post('model/tbl.business.closure.php',{token:"0",fb:"27",ft:"0",uLike:plParent.find(".tblSearch").val(),sort:_sortFilter(plParent),page:_pagiFilter(plParent)},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{	
					tblNoData = false;	
					var tmpStat_sel="", tmpDType= (v.d_type=="1")?"Pick-up":(v.d_type=="2")?"Deliver":"";
					if(v.status=="0"){ tmpStat_sel=tmpStatus.a; }
					else if(v.status=="1"){ tmpStat_sel=tmpStatus.b; }
					else if(v.status=="2"){ tmpStat_sel=tmpStatus.c; }
					else if(v.status=="3"){ tmpStat_sel=tmpStatus.d; }
					else if(v.status=="4"){ tmpStat_sel=tmpStatus.e; }
					else if(v.status=="5"){ tmpStat_sel=tmpStatus.g; }
					else if(v.status=="9"){ tmpStat_sel=tmpStatus.g; }

					var tmpTbl_result = ''+
					'<div class="tblRow t-row" id="tblRow_'+v.id+'">'+
						'<input type="checkbox" class="t-row-chk" id="t-row'+v.id+'" hidden />'+
						'<div class="tColName t-cola '+tmpNav_class+'" >'+
							'<div class="t-col-qty" > <div class="t-val">'+(_tblRow_ind(plParent)+i)+'</div> </div>'+							
							'<div class="t-col-name">'+
								'<label class="cTitle t-val" for="t-row'+v.id+'"><p>'+fromDbDate(v.dated)+' - '+tmpStat_sel+'</p><i class="fa fa-angle-down"></i></label>'+
							'</div>'+
						'</div>'+tmpNav_lbl+
						'<div class="t-colb">'+
							'<div class="t-col  biz-a"><div class="cTitle t-val"><b>Type: </b>'+tmpDType+'</div> </div>'+
							'<div class="t-col  biz-b"><div class="cTitle t-val"><b>Date Issued: </b>'+fromDbDate(v.date_issued)+'</div> </div>'+
							'<div class="t-col  biz-c"><div class="cTitle t-val"><b>Business: </b>'+v.bness_name+'</div> </div>'+
							'<div class="t-colz biz-d"><div class="cTitle t-val"><b>Remarks: </b>'+((v.remarks)?v.remarks+"<br/>":"")+((v.remarks_admin)?"Admin: "+v.remarks_admin:"")+'</div> </div>'+
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





