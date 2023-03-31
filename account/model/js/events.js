$(document).ready(function(e)
{
	pLoader_(); func1_();func2_(); tblInstall_(plParent,tmpRstLoad);
	
	$("body").off("click",".acActive_lnk").on("click",".acActive_lnk",function(e)  
	{
		plParent.find(".pageSearch_ipt").val(""); plParent.find(".pageFilter_sel option[id='"+$(this).attr("data-type")+"']").prop("selected","selected");
		$(".patFiltered_wrap").empty().append('<span class="pageActive_ftr"><p>'+$(this).text()+'</p><a href="#"><i class="fa fa-close"></i></a></span>'); 
		tmpRstLoad($(this).attr("data-id"));
	});
	$(".pageLoaded").scroll(function(e){ scrollUp(); });	

});

var plParent=$("#pPoster"), pLoader_bool=true, tmpRstLoad= function(e){ plParent.attr("data-page","0"); plParent.find(".evPost_panel").empty(); pLoader_("filter",e); };
var pLoader_= function(type, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false;  plParent.attr("data-page",(parseInt(plParent.attr("data-page")) + 1));
		$.post(host+'account/model/tbl.events.php',{token:"0",fb:"27",ft:"0",uLike:"",sort:"",page:plParent.attr("data-limit")+","+plParent.attr("data-page"),uLike:plParent.find(".pageSearch_ipt").val(),tpe:plParent.find(".pageFilter_sel option:selected").attr("id"),fid:((tmpID_arg)?tmpID_arg:"")},function(json, status, xhr)
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
					'<div class="evPost pagelet-post" id="evPost'+v.id+'">'+
						'<div class="pagelet-header '+((v.me=="1")?'pagelet-post-adm':'')+'">'+
							'<div class="pagelet-poster">'+
								'<div class="Poster_photo pagelet-poster-photo"><img src="'+v.profile+'" title="'+v.user+'" /></div>'+
								'<div class="pagelet-poster-details">'+
									'<a href="?profile.php&id='+v.user_id+'&type=admin" class="Profile_lnk pagelet-poster-name" >'+v.user+'</a>'+
									'<div class="pagelet-poster-date">'+
										'<i class="fa fa-globe"></i><time class="timeago" datetime="'+v.date+'" title="'+fromDbDate(v.date)+'">'+v.date+'</time>'+
									'</div>'+
								'</div>'+
							'</div>'+((v.me=="1")?tPNavi("pat",v.id):'')+	
						'</div>'+
						'<div class="pagelet-body-in" >'+
							'<div class="evPost_tit poster-post-title">'+v.title+'</div>'+
							'<pre class="evPost_sti poster-post-label">'+v.sub_title+'</pre>'+
							'<div class="evPost_view poster-post-label" '+((v.kind=="1")?'':'hidden')+'><p><b>Viewer:</b> '+v.viewer+'</p></div>'+
							'<div class="evPost_dte poster-post-label" '+((v.date_on)?'':'hidden')+'><i class="fa fa-calendar poster-label-ico"></i>	<p>'+v.date_on+((v.date_end)?' to '+v.date_end:'')+'</p></div>'+							
							'<div class="evPost_ven poster-post-label" '+((v.venue)?'':'hidden')+'><i class="fa fa-map-o poster-label-ico"></i><p>'+v.venue+'</p></div>'+							
							'<pre class="evPost_val poster-post-body">'+jRead_more(v.description)+'</pre>'+
							'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
							'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'</div>'+
					'</div>'; 
					plParent.find(".evPost_panel").append(tPostResult);
					plParent.find("#evPost"+v.id).data("j-v-c", {ci:v.itoken});
					jGallery_items(v.files,"#evPost"+v.id);	
				}
				if(v.count)
				{ 
					if(v.count=="0"){ plParent.find(".evPost_panel").append('<div class="patResult_val pagelet-result">-- NO RECORD FOUND --</div>'); }
					else
					{
						var tRNum= $(".evPost").length, tRCnt=parseInt(v.count);
						if(tRNum == tRCnt)	{ plParent.find(".evPost_panel").append('<div class="patResult_val pagelet-result">-- END --</div>'); }
						else if(tRNum<tRCnt)
						{ 
							plParent.find(".evPost_panel").append('<div class="evPostShowMore_btn pagelet-show-more"><a href="#">SHOW MORE</a></div>');
							$(".evPostShowMore_btn a").unbind("click").click(function(e){ pLoader_(); e.preventDefault(); });
						}
						//plParent.attr("data-page",(parseInt(v.page)+1));
					}
					$(".evPostCount_wrap").text(v.count+" Result"+((parseInt(v.count)>1)?"s":""));
				}	
			
			});
			if(json.length==0){ plParent.find(".tblBody").append("<div class='tbl-no-result'>No Record Found</div>"); }

		},"json").done(function(e)
		{
			pLoader_bool=true; plParent.find(".ldgPost_wrap").remove(); 
			$(".patDel_btn").unbind("click").click(function(e){ var tmpPar=$(this), tmpRD= function(e){ delFrom_record(tmpPar);}; confirm_("Record will be permanently DELETED! Continue?","Confirmation", tmpRD); });
			$(".patEdt_btn").unbind("click").click(function(e){ getFrom_record($(this)); });

			$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
			global_events();				

		}).fail(function(xhr, status, err){ pLoader_bool=true; plParent.find(".ldgPost_wrap").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".evPost_panel").append(ldgPost); $(".evPostShowMore_btn, .acResult_inf").remove();
	}	
}

var func1_= function(e)
{
	$.post(host+'account/model/tbl.events.php',{token:"0",fb:"27",ft:"0-0-1",uLike:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				plParent.find(".evUList_panel").append('<li><span><a href="#" class="acActive_lnk nowrap" data-id="'+v.id+'" data-type="1" >'+v.title+'</a><p>'+fromDbDate(v.date_on)+'</p></span></li>');			
			}
			if(v.count)
			{ 
				if(v.count=="0"){ plParent.find(".evUList_panel").empty().append("<div class='tbl-no-result'>No Record Found</div>"); }
				plParent.find(".evUList_fter").text(v.count+" Record"+((parseInt(v.count)>1)?"s":"")); 
			}			
		});
	},"json").done(function(e)
	{		
		plParent.find(".evUList_panel .Loading_ico").remove();	

	}).fail(function(xhr, status, err){ pLoader_bool=true; plParent.find(".evUList_panel .Loading_ico").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	plParent.find(".evUList_panel").empty().append(loading_bounce); plParent.find(".evUList_fter").text("0");
}
var func2_= function(e)
{
	$.post(host+'account/model/tbl.events.php',{token:"0",fb:"27",ft:"0-0-2",uLike:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				plParent.find(".evPList_panel").append('<li class="m-fr"><span><a href="#" class="acActive_lnk nowrap" data-id="'+v.id+'" data-type="2" >'+v.title+'</a><p>'+fromDbDate(v.date_on)+'</p></span></li>');			
			}
			if(v.count)
			{ 
				if(v.count=="0"){ plParent.find(".evPList_panel").empty().append("<div class='tbl-no-result'>No Record Found</div>"); }
				plParent.find(".evPList_fter").text(v.count+" Record"+((parseInt(v.count)>1)?"s":"")); 
			}			
		});
	},"json").done(function(e)
	{		
		plParent.find(".evPList_panel .Loading_ico").remove();

	}).fail(function(xhr, status, err){ pLoader_bool=true; plParent.find(".evPList_panel .Loading_ico").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	plParent.find(".evPList_panel").empty().append(loading_bounce); plParent.find(".evPList_fter").text("0"); 
}














