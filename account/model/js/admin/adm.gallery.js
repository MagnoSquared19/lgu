
$(document).ready(function(e)
{
	$(".galAdd_btn").unbind("click").click(function(e){ addNew_record(); });
	$("body").off("click",".peFilesDel_btn").on("click",".peFilesDel_btn",function(e){ delItem_mFiles(e,$(this));	});
});

var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="gallery-upload-wrap"> <div class="galPoster_wrap rpt-update-img-wrap"></div> </div>'+
				'<input type="file" name="uplFile[]" class="pmPhoto_ipt" hidden accept="image/*,video/*" multiple capture="camera" />'+
			'</div>'+
			'<div class="popFooter popup-panel-footer">'+
				'<div class="btn-fr">'+
					'<a href="#" class="pmPhoto_btn btn"><i class="fa fa-paperclip"></i>Attach</a>'+
					'<button class="btn"><i class="fa fa-save"></i>Save</button>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</form></div>';
	$("body").append(tmp_form);
	$(".pmPhoto_btn").unbind("click").click(function(e){ e.preventDefault(); $(".pmPhoto_ipt").click(); });
	mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="uplFileData_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".galPoster_wrap",extension:false});
}

var addNew_record= function(e)
{
	generate_form("aNR_form","ADD PHOTOS & VIDEOS");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault(); 
		if($(".galPoster_wrap").find(".mFiles_fr").length)
		{
			var iptData= new FormData(this); var data_= $(this).serialize();
			$.ajax({url: "model/tbl.gallery.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
			beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-1");iptData.append("data_",data_); for(var i=0, len=mFiles.length;i<len;i++){ iptData.append('data_[]', mFiles[i]);}  },
			success:function(json, status, xhr)
			{
				$.each(json, function(e, v)
				{
					if(v.result == "1")
					{
						pLoader_(); alert_("Record was Successfully Updated.", "Information");	$(".pPanel_bg").remove();
					}
					else{alert_("Error in : "+v.result,"Error Message");} 							
				});	
			},
			complete:function(e){ loading_("unload"); },
			xhr:function(){ var xhr = new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function (evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); xhr.addEventListener("progress",function (evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
			error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
		}
		else{ alert_("File Empty. Please select file.","Error Message"); }
	});
}

var getFrom_record= function(e)
{
	if(e)
	{
		var tmp_form = ''+
		'<div class="pPanel_bg pop-bg"><form class="uNR_form pPanel popup-panel draggable" autocomplete="off">'+
			'<div class="popup-panel-header"> <b>RENAME FILE</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
			'<div class="popPanel_wrap popup-panel-wrap pp5">'+
				'<div class="genMInputs_wrap popup-panel-body">'+
					'<div class="m-fr"><i class="ipt-lbl">Name</i><input type="text" name="title" required placeholder="Name" /></div>'+
				'</div>'+
				'<div class="popFooter popup-panel-footer">'+
					'<div class="btn-fr"><button class="btn"><i class="fa fa-save"></i>Save</button></div>'+
				'</div>'+
			'</div>'+
		'</form></div>';
		$("body").append(tmp_form);
		$(".pPanel input[name='title']").val(e.parents(".galleryItem").find(".galItem_name").text());
		show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});

		$(".uNR_form").unbind("submit").submit(function(ev)
		{
			ev.preventDefault();
			$.post('model/tbl.gallery.php',{token:"0",fb:"27",ft:"0-3",data_:$(this).serialize(),old:e.parents(".galleryItem").find(".Gallery_item").attr("href")},function(json, status, xhr)
			{		
				$.each(json,function(i, v)
				{
					if(v.result == "1")
					{
						e.parents(".galleryItem").find(".galItem_name").text(v.name);
						alert_("Record was Successfully Updated.", "Information"); $(".pPanel_bg").remove();							
					}
					else{	alert_(v.result,"Information");	}
				}); 
			},"json").done(function(e){ loading_("unload"); }
			).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
			loading_("Updating, Please wait...");
		});
	}
}

var delFrom_record= function(e)
{
	if(e){ $.ajax({url:"model/tbl.gallery.php",type:"post", data:{token:"0",fb:"27",ft:"0-4",old:e.parents(".galleryItem").find(".Gallery_item").attr("href")},success:function(data){	loading_("unload");	if(data == "1"){var tmpItem= e.parents(".galleryItem"); tmpItem.fadeOut(200,function(e){  tmpItem.remove(); if($(".galleryItem").length == 0){ $(".photoGallery_wrap").append("<div class='tbl-no-result'>No Photo/Video Found</div>"); } });}	else{alert_(data,"Information");}	}	});	loading_("Deleting, Please wait..."); }
	//if(e){ $.ajax({url:"model/tbl.gallery.php",type:"post", data:{token:"0",fb:"27",ft:"0-4",old:e.parents(".galleryItem").find(".Gallery_item").attr("href")},success:function(data){	loading_("unload");	if(data == "1"){dynamicFunc=function(){/**/var tmpItem= e.parents(".galleryItem"); tmpItem.fadeOut(200,function(e){  tmpItem.remove(); if($(".galleryItem").length == 0){ $(".photoGallery_wrap").append("<div class='tbl-no-result'>No Photo/Video Found</div>"); } });/**/dynamicFunc="";};	alert_("File was Successfully DELETED!","Information",dynamicFunc);}	else{alert_(data,"Information");}	}	});	loading_("Deleting, Please wait..."); }
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}

