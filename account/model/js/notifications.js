$(document).ready(function(e)
{
	pLoader_(); tblInstall_(plParent,tmpRstLoad);	

	$(".notifSearch_rad").unbind("change").change(function(e)
	{ 
		if($(this).attr("id")=="nr5"){ $(this).parents(".notifFilter_wrap").find(".pmSearchFr_ipt, .pmSearchTo_ipt").attr("disabled",false); $(".pmSearchFr_ipt").focus(); }
		else{ $(this).parents(".notifFilter_wrap").find(".pmSearchFr_ipt, .pmSearchTo_ipt").attr("disabled","disabled").val(""); }
	});
	$(".checkFtr_submit").unbind("click").click(function(e)
	{
		var tmpRSrch_p= $(".notifFilter_wrap");
		if(tmpRSrch_p.find(".notifSearch_rad").val())
		{
			if(tmpRSrch_p.find(".notifSearch_rad:checked").attr("id")=="nr5" && tmpRSrch_p.find(".pmSearchFr_ipt").val()=="")	  { var tmpFunc_= function(e){tmpRSrch_p.find(".pmSearchFr_ipt").focus();}; alert_("Filter Date From is null, Please input date <b>'From: '</b>","Information",tmpFunc_); }
			else if(tmpRSrch_p.find(".notifSearch_rad:checked").attr("id")=="nr5" && tmpRSrch_p.find(".pmSearchTo_ipt").val()==""){ var tmpFunc_= function(e){tmpRSrch_p.find(".pmSearchTo_ipt").focus();}; alert_("Filter Date To is null, Please input date <b>'To: '</b>","Information",tmpFunc_); }
			else{ plParent.attr("data-page","0"); $(".pmPost_panel").empty(); tmpRstLoad(); }

			$(".notifFilter_wrap").find("#pmSrch_chk").prop("checked",false);
		}
	});
	
	$(".pageLoaded").scroll(function(e){ scrollUp(); });	

});

var plParent=$("#notifPoster"), pLoader_bool=true, tmpRstLoad= function(e){ plParent.attr("data-page","0"); plParent.find(".notifPost_panel").empty(); pLoader_("filter",e); };
var pLoader_= function(type, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false;  plParent.attr("data-page",(parseInt(plParent.attr("data-page")) + 1));	var tmpPMSrch_p= $(".notifFilter_wrap");
		$.post(host+'account/model/tbl.notifications.php',{token:"0",fb:"27",ft:"0",sort:"",page:plParent.attr("data-limit")+","+plParent.attr("data-page"),uLike:plParent.find(".pageSearch_ipt").val(),ftr:removeString(tmpPMSrch_p.find(".notifSearch_rad:checked").attr("id")),ftrFr:tmpPMSrch_p.find(".pmSearchFr_ipt").val(),ftrTo:tmpPMSrch_p.find(".pmSearchTo_ipt").val()},function(json, status, xhr)
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
					'<div class="notifPost pagelet-post" id="notifPost'+v.id+'">'+
						'<div class="pagelet-header '+((v.me=="1")?'pagelet-post-adm':'')+'">'+
							'<div class="pagelet-poster">'+
								'<div class="Poster_photo pagelet-poster-photo"><img src="'+v.profile+'" title="'+v.user+'" alt="" /></div>'+
								'<div class="pagelet-poster-details">'+
									'<a href="?profile.php&id='+v.user_id+'&type=admin" class="Profile_lnk pagelet-poster-name" >'+v.user+'</a>'+
									'<div class="pagelet-poster-date">'+
										'<i class="fa fa-globe"></i><time class="timeago" datetime="'+v.date+'" title="'+fromDbDate(v.date)+'">'+v.date+'</time>'+
									'</div>'+
								'</div>'+
							'</div>'+((v.me=="1")?tPNavi("notif",v.id):'')+	
						'</div>'+
						'<div class="pagelet-body-in" >'+
							'<div class="notifPost_tit poster-post-title">'+v.title+'</div>'+
							'<div class="notifPost_view poster-post-label" '+((v.kind=="1")?'':'hidden')+'><p><b>Viewer:</b> '+v.viewer+'</p></div>'+
							'<pre class="notifPost_val poster-post-body rich-paragraph">'+v.description+'</pre>'+
							'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
							'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'</div>'+
					'</div>'; 
					plParent.find(".notifPost_panel").append(tPostResult);
					plParent.find("#notifPost"+v.id).data("j-v-c", {ci:v.itoken});
					jGallery_items(v.files,"#notifPost"+v.id);			
				}
				if(v.count)
				{ 
					if(v.count=="0"){ plParent.find(".notifPost_panel").append('<div class="notifResult_val pagelet-result">-- NO RECORD FOUND --</div>'); }
					else
					{
						var tRNum= $(".notifPost").length, tRCnt=parseInt(v.count);
						if(tRNum == tRCnt)	{ plParent.find(".notifPost_panel").append('<div class="notifResult_val pagelet-result">-- END --</div>'); }
						else if(tRNum<tRCnt)
						{ 
							plParent.find(".notifPost_panel").append('<div class="notifPostShowMore_btn pagelet-show-more"><a href="#">SHOW MORE</a></div>');
							$(".notifPostShowMore_btn a").unbind("click").click(function(e){ pLoader_(); e.preventDefault(); });
						}
						//plParent.attr("data-page",(parseInt(v.page)+1));
					}
					$(".notifPostCount_wrap").text(v.count+" Result"+((parseInt(v.count)>1)?"s":""));
				}	
			
			});
			if(json.length==0){ plParent.find(".tblBody").append("<div class='tbl-no-result'>No Record Found</div>"); }

		},"json").done(function(e)
		{
			pLoader_bool=true; plParent.find(".ldgPost_wrap").remove(); 
			$(".notifDel_btn").unbind("click").click(function(e){ var tmpPar=$(this), tmpRD= function(e){ delFrom_record(tmpPar);}; confirm_("Record will be permanently DELETED! Continue?","Confirmation", tmpRD); });
			$(".notifEdt_btn").unbind("click").click(function(e){ getFrom_record($(this)); });

			$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
			global_events();		

		}).fail(function(xhr, status, err){ pLoader_bool=true; plParent.find(".ldgPost_wrap").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".notifPost_panel").append(ldgPost); $(".notifPostShowMore_btn, .acResult_inf").remove();
	}	
}
















