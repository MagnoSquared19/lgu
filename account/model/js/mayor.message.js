$(document).ready(function(e)
{
	pLoader_(); func1_();func2_(); tblInstall_(plParent,tmpRstLoad);
	
	$("body").off("click",".acActive_lnk").on("click",".acActive_lnk",function(e)  
	{
		plParent.find(".pageSearch_ipt").val(""); plParent.find(".pageFilter_sel option[id='"+$(this).attr("data-type")+"']").prop("selected","selected");
		$(".pageFiltered_wrap").empty().append('<span class="pageActive_ftr mSubPost_ftr"><p>'+$(this).text()+'</p><a href="#"><i class="fa fa-close"></i></a></span>'); 
		
		plParent.find(".mayorPost_panel").hide();
		$(".mSubPost_ftr").unbind("click").click(function(e){ plParent.find(".mayorPost_panel").show(); });
		tmpRstLoad($(this).attr("data-id"));
	});
	$(".pageLoaded").scroll(function(e){ scrollUp(); });	


});

var plParent=$("#pPoster"), pLoader_bool=true;
var pLoader_= function()
{	
	if(pLoader_bool)
	{
		pLoader_bool=false;
		$.post('model/tbl.mayor.message.php',{token:"0",fb:"27",ft:"0"},function(json, status, xhr)
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
							'</div>'+
						'</div>';
					}

					var tPostResult =''+
					'<div class="mayorPost pagelet-post" id="mayorPost'+v.id+'">'+
						'<div class="pagelet-header '+((v.me=="1")?'pagelet-post-adm':'')+'">'+
							'<div class="pagelet-poster">'+
								'<div class="Poster_photo pagelet-poster-photo"><img src="'+v.profile+'" title="'+v.user+'" /></div>'+
								'<div class="pagelet-poster-details">'+
									'<a href="?profile.php&id='+v.user_id+'" class="Profile_lnk pagelet-poster-name" >'+v.user+'</a>'+
									'<div class="pagelet-poster-date">'+
										'<i class="fa fa-globe"></i><time class="timeago" datetime="'+v.date+'" title="'+fromDbDate(v.date)+'">'+v.date+'</time>'+
									'</div>'+
								'</div>'+
							'</div>'+((v.me=="1")?tPNavi("mm",v.id):'')+
						'</div>'+
						'<div class="pagelet-body-in" >'+
							'<div class="mayorPost_tit poster-post-title">'+v.title+'</div>'+
							'<pre class="poster-post-body">'+
								'<img class="mayorPost_profile mm-main-img" src="'+v.mayor+'" alt="" />'+
								'<div class="mayorPost_val mm-main-msg rich-paragraph">'+v.description+'</div>'+
							'</pre>'+
							'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'</div>'+
					'</div>'; 
					plParent.find(".mayorPost_panel").append(tPostResult);
					plParent.find("#mayorPost"+v.id).data("j-v-c", {ci:v.itoken});
					jGallery_items(v.files,"#mayorPost"+v.id);							
				}			
			});

		},"json").done(function(e)
		{
			pLoader_bool=true; plParent.find(".mayorPost_panel .ldgPost_wrap").remove(); 
			$(".mmEdt_btn").unbind("click").click(function(e){ getFrom_record($(this)); });

			$(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
			global_events();	

		}).fail(function(xhr, status, err){ pLoader_bool=true; plParent.find(".mayorPost_panel .ldgPost_wrap").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".mayorPost_panel").append(ldgPost); $(".mayorPostShowMore_btn, .acResult_inf").remove();
	}	
}

var func1_bool= true, tmpRstLoad= function(e){ plParent.attr("data-page","0"); plParent.find(".mayorSubPost_panel").empty(); func1_("filter",e); };
var func1_= function(type, tmpID_arg)
{
	if(func1_bool)
	{
		func1_bool= false; plParent.attr("data-page",(parseInt(plParent.attr("data-page")) + 1));
		$.post('model/tbl.mayor.message.php',{token:"0",fb:"27",ft:"10-0",uLike:"",page:plParent.attr("data-limit")+","+plParent.attr("data-page"),uLike:plParent.find(".pageSearch_ipt").val(),fid:((tmpID_arg)?tmpID_arg:"")},function(json, status, xhr)
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
					'<div class="mayorSubPost pagelet-post" id="mayorSubPost'+v.id+'">'+
						'<div class="pagelet-header '+((v.me=="1")?'pagelet-post-adm':'')+'">'+
							'<div class="pagelet-poster">'+
								'<div class="Poster_photo pagelet-poster-photo"><img src="'+v.profile+'" title="'+v.user+'" /></div>'+
								'<div class="pagelet-poster-details">'+
									'<a href="?profile.php&id='+v.user_id+'" class="Profile_lnk pagelet-poster-name" >'+v.user+'</a>'+
									'<div class="pagelet-poster-date">'+
										'<i class="fa fa-globe"></i><time class="timeago" datetime="'+v.date+'" title="'+fromDbDate(v.date)+'">'+v.date+'</time>'+
									'</div>'+
								'</div>'+
							'</div>'+((v.me=="1")?tPNavi("ms",v.id):'')+	
						'</div>'+
						'<div class="pagelet-body-in" >'+
							'<div class="mayorSubPost_tit poster-post-title">'+v.title+'</div>'+
							'<pre class="mayorSubPost_val poster-post-body rich-paragraph">'+v.description+'</pre>'+
							'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'</div>'+
					'</div>'; 
					plParent.find(".mayorSubPost_panel").append(tPostResult);
					plParent.find("#mayorSubPost"+v.id).data("j-v-c", {ci:v.itoken});
					jGallery_items(v.files,"#mayorSubPost"+v.id);
								
				}
				if(v.count)
				{ 
					if(v.count=="0"){ /*plParent.find(".mayorSubPost_panel").append('<div class="patResult_val pagelet-result">-- NO RECORD FOUND --</div>');*/ }
					else
					{
						var tRNum= $(".mayorSubPost").length, tRCnt=parseInt(v.count);
						if(tRNum == tRCnt)	{ plParent.find(".mayorSubPost_panel").append('<div class="patResult_val pagelet-result">-- END --</div>'); }
						else if(tRNum<tRCnt)
						{ 
							plParent.find(".mayorSubPost_panel").append('<div class="mayorSubPostShowMore_btn pagelet-show-more"><a href="#">SHOW MORE</a></div>');
							$(".mayorSubPostShowMore_btn a").unbind("click").click(function(e){ func1_(); e.preventDefault(); });
						}
					}
					$(".mayorSubPostCount_wrap, .pageItem_cnt").text(toThousand(v.count)+" Result"+((parseInt(v.count)>1)?"s":""));
				}	
			
			});
			//if(json.length==0){ plParent.find(".tblBody").append("<div class='tbl-no-result'>No Record Found</div>"); }

		},"json").done(function(e)
		{
			func1_bool=true; plParent.find(".mayorSubPost_panel .ldgPost_wrap").remove(); 
			$(".msDel_btn").unbind("click").click(function(e){ var tmpPar=$(this), tmpRD= function(e){ delFrom_chr(tmpPar);}; confirm_("Record will be permanently DELETED! Continue?","Confirmation", tmpRD); });
			$(".msEdt_btn").unbind("click").click(function(e){ getFrom_chr($(this)); });

			$(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
			global_events();	

		}).fail(function(xhr, status, err){ func1_bool=true; plParent.find(".mayorSubPost_panel .ldgPost_wrap").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".mayorSubPost_panel").append(ldgPost); $(".mayorSubPostShowMore_btn, .acResult_inf").remove();
	}
}

var func2_= function(e)
{
	$.post('model/tbl.mayor.message.php',{token:"0",fb:"27",ft:"10-0-1",uLike:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				plParent.find(".patUEvent_panel").append('<li class="m-fr"><a href="#" class="acActive_lnk clamp2" data-id="'+v.id+'" data-type="1" >'+v.title+'</a><p>'+fromDbDate(v.date_on)+'</p></li>');			
			}
			if(v.count)
			{ 
				if(v.count=="0"){ plParent.find(".patUEvent_panel").empty().append("<div class='tbl-no-result'>No Record Found</div>"); }
				plParent.find(".patUEvent_fter").text(v.count+" Record"+((parseInt(v.count)>1)?"s":"")); 
			}			
		});
	},"json").done(function(e)
	{		
		plParent.find(".patUEvent_panel .tblLoading_fr").remove();	

	}).fail(function(xhr, status, err){ plParent.find(".patUEvent_panel .tblLoading_fr").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	plParent.find(".patUEvent_panel").append(tblLoading_tag); plParent.find(".patUEvent_fter").text("0"); plParent.find(".patUEvent_panel").empty();
}














