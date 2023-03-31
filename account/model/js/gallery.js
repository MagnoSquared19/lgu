$(document).ready(function(e)
{
	pLoader_(); 
});

var pLoader_bool=true;
var pLoader_= function(type, tmpID_arg)
{	
	if(pLoader_bool)
	{
		pLoader_bool=false; var tmpAdmin="";
		$.post('model/tbl.gallery.php',{token:"0",fb:"27",ft:"0",uLike:""},function(json, status, xhr)
		{
			$.each(json,function(i, val)
			{
				if(val.admin){ tmpAdmin= val.admin; } 
				if(val.files)
				{
					$.each(val.files,function(ind,v)
					{
						if(v.index)
						{
							var tmpItem= "";
							if(Image_arr.includes(v.ext.toLowerCase())){ tmpItem= '<a href="'+v.src+'" class="Gallery_item gallery-lnk" title="'+v.name+'"> <img id="postThumb'+v.index+'" src="'+v.src+'" alt="'+v.name+'" data-size="800x508" /> </a>'; }
							if(Video_arr.includes(v.ext.toLowerCase())){ tmpItem= '<a href="'+v.src+'" class="Gallery_itemX GalVideo_item gallery-lnk" title="'+v.name+'" ><video controls src="'+v.src+'" title="'+v.name+'" ></video></a>'; }

							function galAdmin()
							{
								var tmpBurger=''+
								'<div class="gallery-hdr">'+
									'<div class="galBurder_btn burger-menu-w" tabindex="0">'+
										'<span></span>'+
										'<div class="burger-panel-l" >'+
											'<a href="#" class="galRename_btn burger-navbar"><i class="fa fa-pencil"></i>Rename</a>'+
											'<a href="#" class="galDelete_btn burger-navbar"><i class="fa fa-trash"></i>Delete</a>'+
										'</div>'+
									'</div>'+
								'</div>';
								return tmpBurger;
							}
							var tPostResult= ''+
							'<div class="galleryItem gallery-item" id="galItem'+v.index+'">'+
								tmpItem+'<div class="galItem_name gallery-name clamp4">'+v.name+'</div>'+((tmpAdmin=="1")?galAdmin():"")+
							'</div>';
							$(".photoGallery_wrap").append(tPostResult);

							$("#postThumb"+v.index).off("load").on("load", function(e)
							{
								var w_ = $(this).get(0).naturalWidth, h_ = $(this).get(0).naturalHeight;
								if((w_!="undefined" || w_!="0") && (h_!="undefined" || h_!="0")){ $(this).attr("data-size",w_+"x"+h_); }
							});
						}
					});					
				}			
				if(val.files.length<=1){ $(".photoGallery_wrap").append("<div class='tbl-no-result'>No Photo/Video Found</div>"); }	
			});
			

		},"json").done(function(e)
		{
			pLoader_bool= true; $(".photoGallery_body").find(".Loading_ico").remove();
			$(".Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();
			$(".Gallery_item, .GalVideo_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".photoGallery_wrap", ".Gallery_item, .GalVideo_item", $(this)); });
			
			$(".galRename_btn").unbind("click").click(function(e){ getFrom_record($(this)); });
			$(".galDelete_btn").unbind("click").click(function(e)
			{ 
				var tDel_btn= $(this); var nDelete= function(){ delFrom_record(tDel_btn); };
				confirm_(tDel_btn.parents(".galleryItem").find(".galItem_name").text()+" will be permanently DELETED! Continue?","Confirmation", nDelete);
			});

			global_events();

		}).fail(function(xhr, status, err){ pLoader_bool=true; $(".photoGallery_body").find(".Loading_ico").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		$(".photoGallery_wrap").empty(); $(".photoGallery_body").append(loading_bounce);
	}	
}















