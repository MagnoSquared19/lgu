

$(document).ready(function(e)
{
	if($(".pageRequirements_wrap").length){ pageReq_exec(); }
	/*
	if($(".dirBody_panel").length) { uiTblInstall($(".dirBody_panel"),pageDirectory_exec); pageDirectory_exec(); }
	if($(".deptBody_panel").length){ uiTblInstall($(".deptBody_panel"),pageDepartment_exec); pageDepartment_exec(); }


	if($(".pageMayor_wrap").length){ pageMayor_exec(); }
		if($(".pageSubMayor_wrap").length){ pageSubMayor_exec(); }*/

});

function pageReq_exec()
{ 
	$.post('embed/model/table.business.php',{token:"0",fb:"27",valid:"0",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var tPostResult =''+
				'<div class="pagelet-post" id="reqPost'+v.id+'"><div class="page-load-pagelet-in">'+
					'<div class="pagelet-body-in" >'+
						'<div class="page-load-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
						'<pre class="page-load-pagelet-body rich-paragraph">'+v.description+'</pre>'+
						'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
						'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
					'</div>'+
				'</div></div>'; 
				$(".pageRequirements_wrap").append(tPostResult);
				jGallery_items(v.files,"#reqPost"+v.id);
			}
		});
	},"json").done(function(e)
	{
		$(".pageRequirements_wrap .Loading_ico").remove(); if(isEmpty){ $(".pageRequirements_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }
		$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
		$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
		global_events();

	}).fail(function(xhr, status, err){ $(".pageRequirements_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".pageRequirements_wrap").empty().append(loading_bounce);
}


