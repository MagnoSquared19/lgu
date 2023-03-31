

var dirBody_wrap="", deptBody_wrap="";
$(document).ready(function(e)
{
	if($(".pageAbout_wrap").length){ pageAbout_exec(); }
	if($(".pageTourism_wrap").length){ pageTourism_exec(); }
	if($(".dirBody_wrap").length) { dirBody_wrap=$(".dirBody_wrap"); install_table(dirBody_wrap,pageDir_exec); pageDir_exec(); }
	if($(".tableDept_wrap").length){ deptBody_wrap=$(".tableDept_wrap"); install_table(deptBody_wrap,pageDept_exec); pageDept_exec(); }
	//if($(".deptBody_panel").length){ uiTblInstall($(".deptBody_panel"),pageDepartment_exec); pageDepartment_exec(); }


	if($(".pageMayor_wrap").length){ pageMayor_exec(); }
		if($(".pageSubMayor_wrap").length){ pageSubMayor_exec(); }

});

function pageTourism_exec()
{
	$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"40",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var tPostResult =''+
				'<div class="pagelet-post" id="aboutPost'+v.id+'"><div class="page-load-pagelet-in">'+
					'<div class="pagelet-body-in" >'+
						'<div class="page-load-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
						'<pre class="page-load-pagelet-body rich-paragraph">'+v.description+'</pre>'+
						'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
						'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
					'</div>'+
				'</div></div>'; 
				$(".pageTourism_wrap").append(tPostResult);
				jGallery_items(v.files,"#aboutPost"+v.id);
			}
		});
	},"json").done(function(e)
	{
		$(".pageTourism_wrap .Loading_ico").remove(); if(isEmpty){ $(".pageTourism_wrap").append("<div class='no-result'>No Record Found</div>"); }
		$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
		$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
		global_events();

	}).fail(function(xhr, status, err){ $(".pageTourism_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".pageTourism_wrap").empty().append(loading_bounce);
}

function pageAbout_exec()
{ 
	$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"0",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var tPostResult =''+
				'<div class="pagelet-post" id="aboutPost'+v.id+'"><div class="page-load-pagelet-in">'+
					'<div class="pagelet-body-in" >'+
						'<div class="page-load-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
						'<pre class="page-load-pagelet-body rich-paragraph">'+v.description+'</pre>'+
						'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
						'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
					'</div>'+
				'</div></div>'; 
				$(".pageAbout_wrap").append(tPostResult);
				jGallery_items(v.files,"#aboutPost"+v.id);
			}
		});
	},"json").done(function(e)
	{
		$(".pageAbout_wrap .Loading_ico").remove(); if(isEmpty){ $(".pageAbout_wrap").append("<div class='no-result'>No Record Found</div>"); }
		$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
		$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
		global_events();

	}).fail(function(xhr, status, err){ $(".pageAbout_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".pageAbout_wrap").empty().append(loading_bounce);
}

var pDir_bool=true;
function pageDir_exec()
{	
	if(dirBody_wrap.length && (pDir_bool==true))
	{
		pDir_bool=false;
		$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"10-0",like:dirBody_wrap.find(".tblSearch_ipt").val(),sort:table_sort(dirBody_wrap),page:table_pager(dirBody_wrap)},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false;
					var tPostResult =''+
					'<div class="tbl-tr" id="tblDir'+v.id+'">'+
						'<input type="checkbox" id="dirChk'+v.id+'" class="tbl-chk" />'+
						'<div class="tbl-li"><div class="tbl-val">'+(table_ind(dirBody_wrap) + i)+'</div></div>'+
						'<div class="tbl-name"><label for="dirChk'+v.id+'" class="tbl-val"><p>'+v.name+'</p><u></u></label></div>'+
						'<div class="tbl-body">'+
							'<div class="tbl-td dir-a"><div class="tbl-val break-word"><b class="tbl-caption">E-mail: </b>'+v.mail+'</div></div>'+
							'<div class="tbl-td dir-b"><div class="tbl-val break-word c"><b class="tbl-caption">Phone No.: </b>'+v.cp+'</div></div>'+
							'<div class="tbl-td dir-c"><div class="tbl-val break-word"><b class="tbl-caption">Office: </b>'+v.address+'</div></div>'+
						'</div>'+						
					'</div>'; 
					dirBody_wrap.find(".tblBody").append(tPostResult);
				}
				if(v.count){ table_paginator({panel:dirBody_wrap,exec:pageDir_exec,count:v.count,limit:v.limit,page:v.page,links:v.page_link}); }
			});
		},"json").done(function(e)
		{
			pDir_bool=true;	dirBody_wrap.find(".tblBody .Loading_ico").remove();
			global_events();

		}).fail(function(xhr, status, err){ pDir_bool=true; dirBody_wrap.find(".tblBody .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		dirBody_wrap.find(".tblBody").empty().append(loading_bars);
	}
}

var pBids_bool=true;
function pageDept_exec()
{	
	if(deptBody_wrap.length && (pBids_bool==true))
	{
		pBids_bool=false;
		$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"20-0",like:deptBody_wrap.find(".tblSearch_ipt").val(),sort:table_sort(deptBody_wrap),page:table_pager(deptBody_wrap)},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false;
					var tPostResult =''+
					'<div class="tbl-tr" id="tblDir'+v.id+'">'+
						'<input type="checkbox" id="dirChk'+v.id+'" class="tbl-chk" />'+
						'<div class="tbl-li"><div class="tbl-val">'+(table_ind(deptBody_wrap) + i)+'</div></div>'+
						'<div class="tbl-name"><label for="dirChk'+v.id+'" class="tbl-val"><p>'+v.name+'</p><u></u></label></div>'+
						'<div class="tbl-body">'+
							'<div class="tbl-td dir-a"><div class="tbl-val break-word c"><b class="tbl-caption">Head: </b>'+v.head+'</div></div>'+
							'<div class="tbl-td dir-b"><div class="tbl-val break-word c"><b class="tbl-caption">Phone No.: </b>'+v.cp+'</div></div>'+
							'<div class="tbl-td dir-c"><div class="tbl-val break-word c"><b class="tbl-caption">Office: </b>'+v.address+'</div></div>'+
						'</div>'+						
					'</div>'; 
					deptBody_wrap.find(".tblBody").append(tPostResult);
				}
				if(v.count){ table_paginator({panel:deptBody_wrap,exec:pageDept_exec,count:v.count,limit:v.limit,page:v.page,links:v.page_link}); }
			});
		},"json").done(function(e)
		{
			pBids_bool=true;	deptBody_wrap.find(".tblBody .Loading_ico").remove();
			global_events();

		}).fail(function(xhr, status, err){ pBids_bool=true; deptBody_wrap.find(".tblBody .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		deptBody_wrap.find(".tblBody").empty().append(loading_bars);
	}
}


function pageMayor_exec()
{
	$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"30-0",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var tPostResult =''+
				'<div class="pagelet-post" id="aboutPost'+v.id+'"><div class="page-load-pagelet-in">'+
					'<div class="pagelet-body-in" >'+
						'<div class="page-load-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
						'<div class="page-load-pagelet-body">'+
							'<img class="m-mayor-img" src="'+v.profile+'" />'+
							'<pre class="m-mayor-msg rich-paragraph">'+v.description+'</pre>'+
						'</div>'+							
						'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
						'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
					'</div>'+
				'</div></div>'; 
				$(".pageMayor_wrap").append(tPostResult);
				jGallery_items(v.files,"#aboutPost"+v.id);
			}
		});
	},"json").done(function(e)
	{
		$(".pageMayor_wrap .Loading_ico").remove(); if(isEmpty){ $(".pageMayor_wrap").append("<div class='no-result'>No Record Found</div>"); }
		$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
		$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
		global_events();

	}).fail(function(xhr, status, err){ $(".pageMayor_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".pageMayor_wrap").empty().append(loading_bounce);
}
	function pageSubMayor_exec()
	{
		$.post('embed/model/table.about.php',{token:"0",fb:"221",valid:"31-0",uLike:"",sort:""},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					var tPostResult =''+
					'<div class="pagelet-post" id="mSubPost'+v.id+'"><div class="page-load-pagelet-in">'+
						'<div class="pagelet-body-in" >'+
							'<div class="page-load-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
							'<pre class="page-load-pagelet-body rich-paragraph">'+v.description+'</pre>'+
							'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
							'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'</div>'+
					'</div></div>'; 
					$(".pageSubMayor_wrap").append(tPostResult);
					jGallery_items(v.files,"#mSubPost"+v.id);
				}
			});
		},"json").done(function(e)
		{
			$(".pageSubMayor_wrap .Loading_ico").remove();
			$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
			global_events();

		}).fail(function(xhr, status, err){ $(".pageSubMayor_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		$(".pageSubMayor_wrap").empty().append(loading_bounce);
	}
	




$(document).ready(function(e)
{
	if($(".Gallery_wrap").length){ getPhotos($GET('album')); $(".GalleyHome_lnk").click(function(e){ e.preventDefault(); getPhotos(); }); }
	if($(".Album_wrap").length)	 { getAlbum();  }

});


var getPhotos_bool= true;
function getPhotos(a)
{
	if(getPhotos_bool)
	{
		var isEmpty=true; getPhotos_bool=false;
		$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"60",uLike:"",sort:"",album:(a)?a:""},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.index)
				{
					isEmpty = false;
					var tmpItem= "";
					if(Image_arr.includes(v.ext.toLowerCase())){ tmpItem= '<a href="'+v.src+'" class="Gallery_item GalImage_item gallery-lnk flex-img" title="'+v.name+'"> <img id="postThumb'+v.index+'" src="'+v.src+'" alt="'+v.name+'" data-size="800x508" /> </a>'; }
					if(Video_arr.includes(v.ext.toLowerCase())){ tmpItem= '<a href="'+v.src+'" class="Gallery_item GalVideo_item gallery-lnk flex-img" title="'+v.name+'" ><video controls src="'+v.src+'" title="'+v.name+'" ></video></a>'; }

					var galResult= ''+
					'<div class="galleryItem gallery-item" id="galItem'+v.index+'">'+
						tmpItem+'<div class="galItem_name gallery-name clamp4">'+v.name+'</div>'+
					'</div>';
					$(".Gallery_wrap").append(galResult);

					$("#postThumb"+v.index).off("load").on("load", function(e)
					{
						var w_ = $(this).get(0).naturalWidth, h_ = $(this).get(0).naturalHeight;
						if((w_!="undefined" || w_!="0") && (h_!="undefined" || h_!="0")){ $(this).attr("data-size",w_+"x"+h_); }
					});
				}
			});
		},"json").done(function(e)
		{
			getPhotos_bool=true; $(".Gallery_wrap .Loading_ico").remove(); if(isEmpty){ $(".Gallery_wrap").append("<div class='no-result'>No File Found</div>"); }
			$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".Gallery_wrap", ".Gallery_item", $(this)); });
			global_events();

		}).fail(function(xhr, status, err){ getPhotos_bool=true; $(".Gallery_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		$(".Gallery_wrap").empty().append(loading_bounce);
	}
}

var getAlbum_bool= true;
function getAlbum(a)
{
	if(getAlbum)
	{
		var isEmpty=true; getAlbum_bool=false; 
		$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"70",uLike:"",sort:""},function(json, status, xhr)
		{	//console.log(json);
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty= false;
					var obj= JSON.parse(JSON.stringify(v.files)); 
					var albumThumb= (obj.thumbnail)?obj.thumbnail:host+'images/files/no-image-long.png'; 
					if(Video_arr.includes(obj.thumbnail.split('.').pop().toLowerCase())){ albumThumb= host+'images/icons/video.png'; }
					var albumResult= ''+
					'<span class="albumItem" style="background-image:url(\''+albumThumb+'\');">'+
						'<a href="?album='+v.title+'" class="album-wrap">'+
							'<div class="album-foot"><b class="albumName" data-folder="'+obj.name+'">'+v.title+'</b><p>'+obj.cont_num+' item'+((parseInt(obj.cont_num)>1)?"s":"")+'</p></div>'+
						'</a>'+
					'</span>';
					$(".Album_wrap").append(albumResult).show(500);
				}
			});
		},"json").done(function(e)
		{
			getAlbum_bool=true; $(".Album_wrap .Loading_ico").remove(); if(isEmpty){ $(".Album_wrap").append("<div class='no-result'>No File Found</div>"); }
			$(".albumItem").click(function(e)
			{
				e.preventDefault(); var tAlbum_name=$(this).find(".albumName").attr("data-folder");
				$(".GalAlbum_name").text($(this).find(".albumName").text());
				$("html, body, .pageBody").animate({scrollTop:$(".Gallery_banner").outerHeight()+'px'},500, function(){	getPhotos(tAlbum_name);	});				
			});

		}).fail(function(xhr, status, err){ getAlbum_bool=true; $(".Album_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		$(".Album_wrap").empty().append(loading_bounce);
	}
}


