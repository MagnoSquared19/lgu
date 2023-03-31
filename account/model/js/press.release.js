$(document).ready(function(e)
{
	pLoader_(); func1_(); tblInstall_(plParent,tmpRstLoad);
	
	$("body").off("click",".acActive_lnk").on("click",".acActive_lnk",function(e)  
	{
		plParent.find(".pageSearch_ipt").val(""); plParent.find(".pageFilter_sel option[id='"+$(this).attr("data-type")+"']").prop("selected","selected");
		$(".pageFiltered_wrap").empty().append('<span class="pageActive_ftr"><p>'+$(this).text()+'</p><a href="#"><i class="fa fa-close"></i></a></span>'); 
		tmpRstLoad($(this).attr("data-id"));
	});
	$(".pageLoaded").scroll(function(e){ scrollUp(); });	


	/* --:-- */
	$(".lFtr_rad").unbind("change").change(function(e)
	{
		if(removeString($(this).attr("id"))=="6"){ $(".lFtrFr_ipt, .lFtrTo_ipt").attr("disabled",false); }
		else{$(".lFtrFr_ipt, .lFtrTo_ipt").attr("disabled",true).val(""); }
	});
	$(".prFilter_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();
		var tmpFtrRad_id= parseInt(removeString($(".lFtr_rad:checked").attr("id")));
		if(tmpFtrRad_id==1){ $(".lesDate_ftr").remove(); }
		else if(tmpFtrRad_id>1)
		{
			$(".lesDate_ftr").remove();
			if(tmpFtrRad_id==6)
			{
				$(".pageFiltered_wrap").append('<span class="lesDate_ftr"><p>'+fromDbDate($(".lFtrFr_ipt").val())+' to '+fromDbDate($(".lFtrTo_ipt").val())+'</p><a href="#"><i class="fa fa-close"></i></a></span>');  
			}
			else if(tmpFtrRad_id<6){ $(".pageFiltered_wrap").append('<span class="lesDate_ftr"><p>'+$(".lFtr_rad:checked").siblings("p").text()+'</p><a href="#"><i class="fa fa-close"></i></a></span>');   }			
			
			$(".lesDate_ftr").unbind("click").click(function(e){ e.preventDefault(); $(this).remove(); $("#df1").prop("checked",true).change(); tmpRstLoad(); });
		}	
		$(".stFiltered_wrap").empty(); tmpRstLoad();$(".lesFilter_cls").click();	
	});
	/* --:-- */


});

var plParent=$("#pPoster"), pLoader_bool=true, tmpRstLoad= function(e){ plParent.attr("data-page","0"); plParent.find(".prPost_panel").empty(); pLoader_("filter",e); };
var pLoader_= function(type, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false;  plParent.attr("data-page",(parseInt(plParent.attr("data-page")) + 1));		var tSort= (plParent.find(".pageSort_ftr").hasClass("pageAsc"))?"0":"1";
		$.post('model/tbl.press.release.php',{token:"0",fb:"27",ft:"0",uLike:"",sort:tSort,page:plParent.attr("data-limit")+","+plParent.attr("data-page"),uLike:plParent.find(".pageSearch_ipt").val(),fid:((tmpID_arg)?tmpID_arg:""),ftrFr:$(".lFtrFr_ipt").val(),ftrTo:$(".lFtrTo_ipt").val(),ftr:removeString($(".lFtr_rad:checked").attr("id"))},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{	
					tblNoData= false;
					var tPNavi= function(a,i)
					{	
						return ''+
						'<div class="burjer-panel">'+
							'<input type="checkbox" id="burjer'+a+i+'" class="bMenu_chk burjer-chk" />'+
							'<label for="burjer'+a+i+'" class="bMenu_btn burjer-btn"><div class="burjer-ico bj-ic"></div></label>'+
							'<div class="bMenu_wrap burjer-wrap">'+
								'<div class="'+a+'Edt_btn bMenu_chd burjer-wbtn"><i class="fa fa-pencil"></i>Edit</div>'+
								'<div class="'+a+'Del_btn bMenu_chd burjer-wbtn"><i class="fa fa-trash"></i>Delete</div>'+
							'</div>'+
						'</div>';
					}

					var tPostResult =''+
					'<div class="prPost pagelet-post" id="prPost'+v.id+'">'+
						'<div class="pagelet-header '+((v.me=="1")?'pagelet-post-adm':'')+'">'+
							'<div class="pagelet-poster">'+
								'<div class="Poster_photo pagelet-poster-photo"><img src="'+v.profile+'" title="'+v.user+'" /></div>'+
								'<div class="pagelet-poster-details">'+
									'<a href="?profile.php&id='+v.user_id+'" class="Profile_lnk pagelet-poster-name" >'+v.user+'</a>'+
									'<div class="pagelet-poster-date">'+
										'<i class="fa fa-globe"></i><time class="timeago" datetime="'+v.date+'" title="'+fromDbDate(v.date)+'">'+v.date+'</time>'+
									'</div>'+
								'</div>'+
							'</div>'+((v.me=="1")?tPNavi("pr",v.id):'')+	
						'</div>'+
						'<div class="pagelet-body-in" >'+
							'<div class="prPost_tit poster-post-title">'+v.title+'</div>'+
							'<div class="prPost_dte poster-post-label" '+((v.date_on)?'':'hidden')+'><i class="fa fa-calendar poster-label-ico"></i>	<p>'+v.date_on+'</p></div>'+							
							'<div class="prPost_ven poster-post-label" '+((v.venue)?'':'hidden')+'><i class="fa fa-map-o poster-label-ico"></i><p>'+v.venue+'</p></div>'+							
							'<pre class="prPost_val poster-post-body rich-paragraph">'+v.description+'</pre>'+
							'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
							'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'</div>'+
					'</div>'; 
					plParent.find(".prPost_panel").append(tPostResult);
					plParent.find("#prPost"+v.id).data("j-v-c", {ci:v.itoken});
					jGallery_items(v.files,"#prPost"+v.id);
				}
				if(v.count)
				{ 
					if(v.count=="0"){ plParent.find(".prPost_panel").append('<div class="patResult_val pagelet-result">-- NO RECORD FOUND --</div>'); }
					else
					{
						var tRNum= $(".prPost").length, tRCnt=parseInt(v.count);
						if(tRNum == tRCnt)	{ plParent.find(".prPost_panel").append('<div class="patResult_val pagelet-result">-- END --</div>'); }
						else if(tRNum<tRCnt)
						{ 
							plParent.find(".prPost_panel").append('<div class="prPostShowMore_btn pagelet-show-more"><a href="#">SHOW MORE</a></div>');
							$(".prPostShowMore_btn a").unbind("click").click(function(e){ pLoader_(); e.preventDefault(); });
						}
						//plParent.attr("data-page",(parseInt(v.page)+1));
					}
					$(".pageItem_cnt").html(toThousand(v.count)+" <p>Result"+((parseInt(v.count)>1)?"s":"")+"</p>");
					$(".prPostCount_wrap").text(toThousand(v.count)+" Result"+((parseInt(v.count)>1)?"s":""));
				}	
			
			});
			if(json.length==0){ plParent.find(".tblBody").append("<div class='tbl-no-result'>No Record Found</div>"); }

		},"json").done(function(e)
		{
			pLoader_bool=true; plParent.find(".ldgPost_wrap").remove(); 
			$(".prDel_btn").unbind("click").click(function(e){ var tmpPar=$(this), tmpRD= function(e){ delFrom_record(tmpPar);}; confirm_("Record will be permanently DELETED! Continue?","Confirmation", tmpRD); });
			$(".prEdt_btn").unbind("click").click(function(e){ getFrom_record($(this)); });

			$(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
			global_events();	

		}).fail(function(xhr, status, err){ pLoader_bool=true; plParent.find(".ldgPost_wrap").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".prPost_panel").append(ldgPost); $(".prPostShowMore_btn, .acResult_inf").remove();
	}	
}

var func1_= function(e)
{
	$.post('model/tbl.press.release.php',{token:"0",fb:"27",ft:"0-0-1",uLike:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				plParent.find(".patUList_panel").append('<li class="m-fr"><a href="#" class="acActive_lnk clamp2" data-id="'+v.id+'" data-type="1" >'+v.title+'</a><p>'+fromDbDate(v.date_on)+'</p></li>');			
			}
			if(v.count)
			{ 
				if(v.count=="0"){ plParent.find(".patUList_panel").empty().append("<div class='tbl-no-result'>No Record Found</div>"); }
				plParent.find(".patUList_fter").text(v.count+" Record"+((parseInt(v.count)>1)?"s":"")); 
			}			
		});
	},"json").done(function(e)
	{		
		plParent.find(".patUList_panel .Loading_ico").remove();	

	}).fail(function(xhr, status, err){ pLoader_bool=true; plParent.find(".patUList_panel .Loading_ico").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	plParent.find(".patUList_panel").empty().append(loading_bounce); plParent.find(".patUList_fter").text("0"); 
}














