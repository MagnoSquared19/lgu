

$(document).ready(function(e)
{
	if($(".mainEvent_wrap").length){ mainEvent_exec(); }
	if($(".mainPress_wrap").length){ mainPress_exec(); }

	if($(".eventPost_panel").length)
	{
		eventList_exec("10");
		$(".eventPost_form").submit(function(e){ e.preventDefault(); eventList_exec("10"); });
		$(".eventSearch_ipt").off("search").on("search",function(e){ eventList_exec("10"); });
	}
	if($(".eventSection_panel").length){ eventSection_exec("20"); }
	
	if($(".pressPage_panel").length)
	{
		eventList_exec("20");
		$(".eventPost_form").submit(function(e){ e.preventDefault(); eventList_exec("20"); });
		$(".eventSearch_ipt").off("search").on("search",function(e){ eventList_exec("20"); });
	}
	if($(".pressSection_panel").length){ eventSection_exec("10"); }

	if($(".pressBody_wrap").length)	{ pressWidget_exec();  }
	if($(".eventsBody_wrap").length){ eventsWidget_exec(); }
});

function mainPress_exec(a)
{
	var isEmpty = true;
	$.post('embed/model/table.ui.php',{token:"0",fb:"27",valid:"101-0",uLike:"",sort:"",pid:$GET("id")},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var tPostResult =''+
				'<div class="pagelet-post" id="pressPost'+v.id+'"><div class="page-load-pagelet-in">'+
					'<div class="pagelet-body-in" >'+
						'<div class="poster-post-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
						'<div class="poster-post-label" '+((v.date_on)?'':'hidden')+'><i class="fa fa-calendar poster-label-ico"></i>	<p>'+v.date_on+'</p></div>'+
						'<div class="poster-post-label" '+((v.venue)?'':'hidden')+'><i class="fa fa-map-o poster-label-ico"></i><p>'+v.venue+'</p></div>'+
						'<pre class="poster-post-body rich-paragraph">'+v.description+'</pre>'+
						'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
						'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
					'</div>'+
				'</div></div>'; 
				$(".mainPress_wrap").append(tPostResult);
				jGallery_items(v.files,"#pressPost"+v.id);
			}
		});
	},"json").done(function(e)
	{
		$(".mainPress_wrap .ldgPost_wrap").remove(); if(isEmpty){ $(".mainPress_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }
		$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
		$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
		global_events();

	}).fail(function(xhr, status, err){ $(".mainPress_wrap .ldgPost_wrap").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".mainPress_wrap").empty().append(ldgPost);
}

function mainEvent_exec(a)
{
	var isEmpty = true;
	$.post('embed/model/table.ui.php',{token:"0",fb:"27",valid:"100-0",uLike:"",sort:"",pid:$GET("id")},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var tPostResult =''+
				'<div class="pagelet-post" id="eventPost'+v.id+'"><div class="page-load-pagelet-in">'+
					'<div class="pagelet-body-in" >'+
						'<div class="poster-post-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
						'<pre class="poster-post-label">'+v.sub_title+'</pre>'+
						'<div class="poster-post-label" '+((v.date_on)?'':'hidden')+'><i class="fa fa-calendar poster-label-ico"></i>	<p>'+v.date_on+((v.date_end)?" - "+v.date_end:"")+'</p></div>'+
						'<div class="poster-post-label" '+((v.venue)?'':'hidden')+'><i class="fa fa-map-o poster-label-ico"></i><p>'+v.venue+'</p></div>'+
						'<pre class="poster-post-body rich-paragraph">'+v.description+'</pre>'+
						'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
						'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
					'</div>'+
				'</div></div>'; 
				$(".mainEvent_wrap").append(tPostResult);
				jGallery_items(v.files,"#eventPost"+v.id);
			}
		});
	},"json").done(function(e)
	{
		$(".mainEvent_wrap .ldgPost_wrap").remove(); if(isEmpty){ $(".mainEvent_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }
		$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
		$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
		global_events();

	}).fail(function(xhr, status, err){ $(".mainEvent_wrap .ldgPost_wrap").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".mainEvent_wrap").empty().append(ldgPost);
}

function eventSection_exec(a)
{
	var isEmpty=true
	$.post('embed/model/table.ui.php',{token:"0",fb:"27",valid:a,uLike:"",sort:"",page:"10,1"},function(json, status, xhr)
	{	
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false; var tmpUri= (a=="10")?"events-post.php":(a=="20")?"press-release-post.php":"#";
				var tmpItem= ''+
				'<div class="event-section-item">'+
					'<div class="event-section-banner"><img src="'+v.image+'"/></div>'+
					'<a href="'+tmpUri+'?id='+v.id+'" title="'+v.title+'">'+v.title+'</a>'+
					'<p>'+v.date_on+'</p>'+
				'</div>';
				$(".eventSection_wrap").append(tmpItem);
			}
			if(v.count){ if(v.page_link){ var tmpPage_a= v.page_link.split(","); if(tmpPage_a.length > 1){ $(".eventSection_wrap").append('<div class="event-section-show-more"><a href="'+host+((a=="10")?"events.php":"press-release.php")+'">Show More</a></div>'); } } }
		});
	},"json").done(function(e)
	{
		$(".eventSection_wrap .Loading_ico").remove(); if(isEmpty){ $(".eventSection_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }

	}).fail(function(xhr, status, err){ $(".eventSection_wrap .Loading_ico").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".eventSection_wrap").empty().append(loading_bounce);
}

var eventList_bool= true;
function eventList_exec(a)
{
	if(eventList_bool)
	{
		eventList_bool=false; var isEmpty=true, isLike= ($(".eventSearch_ipt").length)?$(".eventSearch_ipt").val():"";
		var tmpPage= (a=="10")?".eventPost_panel":(a=="20")?".pressPage_panel":"";
		var tPage= ($(tmpPage).length)?getPaginate($(tmpPage)):"";
		$.post('embed/model/table.ui.php',{token:"0",fb:"27",valid:a,uLike:isLike,sort:"",page:tPage,bid:$GET("id")},function(json, status, xhr)
		{	
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false; var tmpUri= (a=="10")?"events-post.php":(a=="20")?"press-release-post.php":"#";
					var obj= $('<div/>',{id:'tmpReadMore_obj',html:v.description}).contents();
					var tmpItem=''+
					'<div class="event-post-item">'+
						'<div class="event-post-item-banner"><img src="'+v.image+'" /></div>'+
						'<div class="event-post-item-body">'+
							'<div class="event-post-item-share">'+
								'<a href="#" title="Share on Facebook" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u='+host+tmpUri+'?id='+v.id+'\',\'Facebook Share\', \'width=620,height=420\'); return false;"><i class="fa fa-facebook"></i></a>'+
								'<a href="#" title="Share on Twitter" onclick="window.open(\'http://twitter.com/share?url='+host+tmpUri+'?id='+v.id+'&via=Sitename&text='+v.title+'\',\'Twitter Share\', \'width=620,height=420\'); return false;"><i class="fa fa-twitter"></i></a>'+
								'<a href="#" title="Share on Pinterest" ><i class="fa fa-pinterest"></i></a>'+
								'<a href="#" title="Send as E-mail" ><i class="fa fa-envelope"></i></a>'+
							'</div>'+
							'<span>'+
								'<b class="nowrap" title="'+v.title+'">'+v.title+'</b>'+							
								'<u>'+v.date_on+((v.venue)?' @ '+v.venue:'')+'</u>'+
								'<p class="clamp4">'+obj.text()+'</p>'+
								'<a href="'+tmpUri+'?id='+v.id+'">Read More</a>'+
							'</span>'+
						'</div>'+
					'</div>';
					$(".eventPost_wrap").append(tmpItem);
				}
				if(v.count)
				{ 
					var tmpPagiLink= function(){ eventList_exec(a); };
					setPaginate($(tmpPage),{count:v.count,limit:v.limit,page:v.page,link:v.page_link,exec:tmpPagiLink});
					if(v.page_link){ var tmpPage_a = v.page_link.split(","); if(tmpPage_a.length > 1){$(tmpPage).find(".evPagi_cnt").show();} else{$(tmpPage).find(".evPagi_cnt").hide();} }
				}
			});
		},"json").done(function(e)
		{
			eventList_bool=true; $(".eventPost_wrap .Loading_ico").remove(); if(isEmpty){ $(".eventPost_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }

		}).fail(function(xhr, status, err){ eventList_bool=true; $(".eventPost_wrap .Loading_ico").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		$(".eventPost_wrap").empty().append(loading_bounce);
	}	
}

function pressWidget_exec(a)
{
	var isEmpty=true;
	$.post('embed/model/table.ui.php',{token:"0",fb:"27",valid:"50-1",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var obj= $('<div/>',{id:'tmpReadMore_obj',html:v.description}).contents();
				var tmpItem=''+
				'<div class="widget-post-item">'+
					'<div class="widget-post-icon"><img src="'+v.image+'" alt="" /></div>'+
					'<span>'+
						'<a href="press-release-post.php?id='+v.id+'" class="widget-post-title nowrap" title="'+v.title+'">'+v.title+'</a>'+
						'<u><i class="fa fa-globe"></i> '+v.date_on+'</u>'+
						'<p class="clamp2" title="'+obj.text()+'">'+obj.text()+'</p>'+
						'<div class="widget-social">'+
							'<a href="#" title="Facebook" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u='+host+'press-release.php?id='+v.id+'\',\'Facebook Share\', \'width=620,height=420\'); return false;"><i class="fa fa-facebook"></i></a>'+
							'<a href="#" title="Twitter" onclick="window.open(\'http://twitter.com/share?url=http://'+host+'press-release.php?id='+v.id+'&via=Sitename&text='+v.title+'\',\'Twitter Share\', \'width=620,height=420\'); return false;"><i class="fa fa-twitter"></i></a>'+
							'<a href="#" title="Pinterest"><i class="fa fa-pinterest"></i></a>'+
							'<a href="#" title="E-mail"><i class="fa fa-envelope"></i></a>'+							
						'</div>'+
					'</span>'+
				'</div>';
				$(".pressBody_wrap").append(tmpItem);
			}
		});
	},"json").done(function(e)
	{
		$(".pressBody_wrap .Loading_ico").remove(); if(isEmpty){ $(".pressBody_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }

	}).fail(function(xhr, status, err){ $(".pressBody_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".pressBody_wrap").empty().append(loading_bounce);
}

function eventsWidget_exec(a)
{
	var isEmpty=true;
	$.post('embed/model/table.ui.php',{token:"0",fb:"27",valid:"60-1",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var obj= $('<div/>',{id:'tmpReadMore_obj',html:v.description}).contents();
				var tmpItem=''+
				'<div class="widget-post-item">'+
					'<div class="widget-post-icon"><img src="'+v.image+'" alt="" /></div>'+
					'<span>'+
						'<a href="events-post.php?id='+v.id+'" class="widget-post-title nowrap" title="'+v.title+'">'+v.title+'</a>'+
						'<u><i class="fa fa-globe"></i> '+v.date_on+'</u>'+
						'<p class="clamp2" title="'+obj.text()+'">'+obj.text()+'</p>'+
						'<div class="widget-social">'+
							'<a href="#" title="Facebook" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u='+host+'events.php?id='+v.id+'\',\'Facebook Share\', \'width=620,height=420\'); return false;"><i class="fa fa-facebook"></i></a>'+
							'<a href="#" title="Twitter" onclick="window.open(\'http://twitter.com/share?url=http://'+host+'events.php?id='+v.id+'&via=Sitename&text='+v.title+'\',\'Twitter Share\', \'width=620,height=420\'); return false;"><i class="fa fa-twitter"></i></a>'+
							'<a href="#" title="Pinterest"><i class="fa fa-pinterest"></i></a>'+
							'<a href="#" title="E-mail"><i class="fa fa-envelope"></i></a>'+							
						'</div>'+
					'</span>'+
				'</div>';
				$(".eventsBody_wrap").append(tmpItem);
			}
		});
	},"json").done(function(e)
	{
		$(".eventsBody_wrap .Loading_ico").remove(); if(isEmpty){ $(".eventsBody_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }

	}).fail(function(xhr, status, err){ $(".eventsBody_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".eventsBody_wrap").empty().append(loading_bounce);
}






