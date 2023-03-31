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

});

var plParent=$("#pPoster"), pLoader_bool=true, tmpRstLoad= function(e){ plParent.attr("data-page","0"); plParent.find(".FlashPost_panel").empty(); pLoader_("filter",e); };
var pLoader_= function(type, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false;  plParent.attr("data-page",(parseInt(plParent.attr("data-page")) + 1));		var tSort= (plParent.find(".pageSort_ftr").hasClass("pageAsc"))?"0":"1";
		$.post('model/tbl.flash.banner.php',{token:"0",fb:"27",ft:"0",uLike:"",sort:tSort,page:plParent.attr("data-limit")+","+plParent.attr("data-page"),uLike:plParent.find(".pageSearch_ipt").val(),fid:((tmpID_arg)?tmpID_arg:""),ftrFr:$(".lFtrFr_ipt").val(),ftrTo:$(".lFtrTo_ipt").val(),ftr:removeString($(".lFtr_rad:checked").attr("id")),archive:$(".lesArchive_chk").is(":checked")},function(json, status, xhr)
		{	//console.log(json);
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

					var tLink= (v.link)?"<br/><br/>LINK BUTTON: <a target='_blank' href='"+v.link+"'>"+v.link+"</a>":"";

					var tPostResult =''+
					'<div class="FlashPost pagelet-post" id="FlashPost'+v.id+'">'+
						'<div class="pagelet-header pagelet-post-adm">'+
							'<div class="pagelet-poster">'+
								'<div class="Poster_photo pagelet-poster-photo"><img src="'+v.profile+'" title="'+v.user+'" /></div>'+
								'<div class="pagelet-poster-details">'+
									'<a href="?profile.php&id='+v.user_id+'" class="Profile_lnk pagelet-poster-name" >'+v.user+'</a>'+
									'<div class="pagelet-poster-date">'+
										'<i class="fa fa-globe"></i><time class="timeago" datetime="'+v.date+'" title="'+fromDbDate(v.date)+'">'+v.date+'</time>'+
									'</div>'+
								'</div>'+
							'</div>'+tPNavi("pat",v.id)+	
						'</div>'+
						'<div class="pagelet-body-in" >'+
							'<div class="FlashPost_tit poster-post-title">'+v.title.replace("<br/>"," ")+'</div>'+
							'<pre class="FlashPost_val poster-post-body rich-paragraph">'+v.description+tLink+'</pre>'+
							'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'</div>'+
					'</div>'; 
					plParent.find(".FlashPost_panel").append(tPostResult);
					plParent.find("#FlashPost"+v.id).data("j-v-c", {ci:v.itoken});

					if(v.files.length > 1){ jGallery_items(v.files,"#FlashPost"+v.id);  }
					else{ jGallery_items([{index:"1",ext:"jpg",name:"No Image",src:"../images/files/no-image-dark.jpg"},{count:"1"}],"#FlashPost"+v.id); }
					
				}
				if(v.count)
				{ 
					if(v.count=="0"){ plParent.find(".FlashPost_panel").append('<div class="patResult_val pagelet-result">-- NO RECORD FOUND --</div>'); }
					else
					{
						var tRNum= $(".FlashPost").length, tRCnt=parseInt(v.count);
						if(tRNum == tRCnt)	{ plParent.find(".FlashPost_panel").append('<div class="patResult_val pagelet-result">-- END --</div>'); }
						else if(tRNum<tRCnt)
						{ 
							plParent.find(".FlashPost_panel").append('<div class="FlashPostShowMore_btn pagelet-show-more"><a href="#">SHOW MORE</a></div>');
							$(".FlashPostShowMore_btn a").unbind("click").click(function(e){ pLoader_(); e.preventDefault(); });
						}
						//plParent.attr("data-page",(parseInt(v.page)+1));
					}
					$(".pageItem_cnt").html(toThousand(v.count)+" <p>Result"+((parseInt(v.count)>1)?"s":"")+"</p>");
					$(".FlashPostCount_wrap").text(toThousand(v.count)+" Result"+((parseInt(v.count)>1)?"s":""));
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
		plParent.find(".FlashPost_panel").append(ldgPost); $(".FlashPostShowMore_btn, .acResult_inf").remove();
	}	
}

var func1_= function(e)
{
	$.post('model/tbl.flash.banner.php',{token:"0",fb:"27",ft:"0-0-1",uLike:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				plParent.find(".patUList_panel").append('<li class="m-fr"><a href="#" class="acActive_lnk clamp2" data-id="'+v.id+'" data-type="1" >'+v.title.replace("<br/>"," ")+'</a></li>');			
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














