$(document).ready(function(e){ tblInstall_(plParent,pLoader_); pLoader_();	 });
var plParent=$("#dTable"), pLoader_bool=true;
var pLoader_ = function(tmpLoad_arg, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false; var tblNoData = true, tmpNav_class="noNav", tmpNav_lbl="";
		$.post('model/tbl.users.php',{token:"0",fb:"27",ft:"0",uLike:plParent.find(".tblSearch").val(),sort:_sortFilter(plParent),page:_pagiFilter(plParent)},function(json, status, xhr)
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
								'<label class="t-val" for="t-row'+v.id+'"><p>'+v.fn+" "+v.mn+" "+v.ln+'</p><i class="fa fa-angle-down"></i></label>'+
							'</div>'+
						'</div>'+tmpNav_lbl+
						'<div class="t-colb">'+
							'<div class="t-col  user-a" ><div class="t-val"				><b>Position :</b>'+v.position+'</div> </div>'+
							'<div class="t-col  user-b" ><div class="t-val"				><b>Level :</b>'+v.level+'</div> </div>'+
							'<div class="t-col  user-c" ><div class="t-val break-word"	><b>Mobile :</b>'+v.cp+'</div> </div>'+
							'<div class="t-colz user-d" ><div class="t-val"				><b>Email:</b>'+v.email+'</div> </div>'+
						'</div>'+
					'</div>';

					plParent.find(".tblBody").append(tmpTbl_result);	
					plParent.find("#tblRow_"+v.id).data("j-v-c", {ci:v.itoken});						
				}	
				if(v.count){  _setPaginate(plParent,v.count,v.limit,v.page,pLoader_); if(v.a_level == "1" || v.a_level == "2"){ tmpNav_class=""; tmpNav_lbl='<label for="t-m-nava" class="t-row-nav" ><i></i></label>'; }		}	
				//if(v.count)			{ _setPaginate(plParent,v.count,v.limit,v.page,pLoader_);				}	
				//if(v.a_level == "1"){ plParent.find(".tColName").removeClass("noNav"),plParent.find(".tColName").after('<label for="t-m-nava" class="t-row-nav" ><i></i><label>'); }
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
var setTbl_opt_bool = true;
function setTbl_opt(arg)
{
	if(setTbl_opt_bool)
	{
		setTbl_opt_bool=false; var isONull=true;		var tmpOption_val = $(".tblOption_sel .Select_def").text();
		$.post('model/table.examinations.php',{token:"0",fb:"27",ft:"0-0-1"},function(json, status, xhr)
		{	
			$.each(json,function(i, v){	if(v.id){	isONull = false;
			$(".tblOption_sel").append("<option class='uOpt u-option' id='"+v.id+"' value='"+v.title+"'>"+v.row_+" - "+v.title+"</option>");	}	}); 	
		},"json").done(function(e)
		{
			setTbl_opt_bool=true;if(isONull){$(".tblOption_sel .Select_def").text("No Record");}	else{$(".tblOption_sel .Select_def").text(tmpOption_val);}
			$(".tblOption_sel").change(function(e){pReset_($(".tblNumRows_sel").val());});

		}).fail(function(e){	$.ajax({url:"model/table.examinations.php",type:"POST", data:{token:"0",fb:"27",ft:"0-0-1"},success:function(data){	alert_(data);		 }});		});
		$(".tblOption_sel .Select_def").text("Loading, Please wait...");$(".tblOption_sel .uOpt").each(function(e){$(this).remove();});
	}
}
*/





