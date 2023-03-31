
$(document).ready(function(e)
{
	$(".mSubAdd_btn").unbind("click").click(function(e){ addNew_chr(); });
	$("body").off("click",".mmFilesDel_btn").on("click",".mmFilesDel_btn",function(e){ delItem_mFiles(e,$(this));	});
	$("body").off("click",".msFilesDel_btn").on("click",".msFilesDel_btn",function(e){ delItem_mFiles(e,$(this));	});
});

var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="mm-profile-wrap">'+
					'<div class="mm-profile">'+
						'<img class="uPhoto_pic" src="../images/files/blank_profile.png" />'+
						'<div class="uPhoto_btn u-image-btn"><i class="fa fa-camera"></i> Select Photo</div>'+
						'<input type="file" name="uplProfile[]" id="uplProfile" class="uPhoto_ipt" hidden accept="image/*" capture="camera" />'+
					'</div>'+
				'</div>'+				
				'<div class="m-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+
				'<div class="Richtext_wrap m-fr"><i class="ipt-lbl">Descripton</i></div>'+
				'<div class="mayorPoster_wrap rpt-update-img-wrap"></div>'+
				'<input type="file" name="uplFile[]" class="pmPhoto_ipt" hidden accept="image/*,application/pdf,video/*" multiple capture="camera" />'+
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
	$(".Richtext_wrap").jTextEditor({class:"Richtext_ipt",placeholder:"Descripton"});
	$(".pmPhoto_btn").unbind("click").click(function(e){ e.preventDefault(); $(".pmPhoto_ipt").click(); });
	mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="mmFilesDel_btn mf-g-photo-del" data-file="uplFileData_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".mayorPoster_wrap",extension:false});
}
var getFrom_record= function(e)
{	
	if(e)
	{
		$.post('model/tbl.mayor.message.php',{token:"0",fb:"27",ft:"0-2",data_:e.parents(".mayorPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='title']").val(v.title);
					$(".Richtext_ipt").html(v.description);
					$(".uPhoto_pic").attr("src",v.profile+"?"+random_()); imgA=v.profile+"?"+random_();

					$.each(v.files,function(ind,val)
					{						
						if(val.index)
						{
							var tPmExt= val.ext.toLowerCase(), tPmSrc="", tPmLnk="";							
							if(Image_arr.includes(val.ext.toLowerCase())){ tPmSrc=val.src; tPmLnk='<p>'+val.name+'</p>'; }
							if(Video_arr.includes(val.ext.toLowerCase())){ tPmSrc="../images/icons/video.png"; tPmLnk='<p>'+val.name+'</p>'; }
							$(".mayorPoster_wrap").append('<span class="mFiles_fr mf-g-photo" title="'+val.name+'" > <img src="'+tPmSrc+'" /> <div class="mf-g-photo-in">	<div class="mmFilesDel_btn mf-g-photo-del" data-file="'+val.src+'" title="Click to remove"><i class="fa fa-close"></i></div> </div> '+tPmLnk+' </span>'); //<p>'+tPmLnk+'</p>
						}
					});	
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});			
			
			imageFile_(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",imgA);			
			var mmDelFiles=[]; $(".mmFilesDel_btn").unbind("click").click(function(e){ mmDelFiles.push($(this).attr("data-file")); });

			$(".uNR_form").unbind("submit").submit(function(s)
			{
				s.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();				
				$.ajax({url: "model/tbl.mayor.message.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-3");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("smd",e.parents(".mayorPost").data("j-v-c").ci);iptData.append("data_",data_); for(var i=0, len=mFiles.length; i<len; i++){iptData.append('data_[]', mFiles[i]);}; for(var i=0, len=mmDelFiles.length; i<len; i++){iptData.append('del_[]', mmDelFiles[i]);};   },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result== "1")
						{
							$("#mayorPost"+v.id).find(".mayorPost_tit").text(v.title);
							$("#mayorPost"+v.id).find(".mayorPost_val").html(v.description);
							$("#mayorPost"+v.id).find(".mayorPost_profile").attr("src",v.image);
							$("#mayorPost"+v.id).find(".PostImage_wrap").hide().find(".Odeum").empty().removeClass("Odeum1, Odeum4");
							jGallery_items(v.files,"#mayorPost"+v.id); $(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();						

							alert_("Record was Successfully Updated.", "Information"); $(".pPanel_bg").remove();
							$(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();
						}
						else{alert_("Error in : "+v.result,"Error Message");} 							
					});	
				},
				complete:function(e)
				{ 
					loading_("unload"); 
					$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
				},
				xhr:function(){ var xhr= new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function(evt){ if(evt.lengthComputable){ var percentComplete= Math.round((evt.loaded / evt.total) * 100);$('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%");} }, false); xhr.addEventListener("progress", function(evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
				error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
			});

		}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();generate_form("uNR_form","UPDATE MESSAGE");
	}		
}



var genChPanel_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="m-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+
				'<div class="Richtext_wrap m-fr"><i class="ipt-lbl">Descripton</i></div>'+
				'<div class="mayorSubPoster_wrap rpt-update-img-wrap"></div>'+
				'<input type="file" name="uplFile[]" class="pmPhoto_ipt" hidden accept="image/*,application/pdf,video/*" multiple capture="camera" />'+
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
	$(".Richtext_wrap").jTextEditor({class:"Richtext_ipt",placeholder:"Descripton"});
	$(".pmPhoto_btn").unbind("click").click(function(e){ e.preventDefault(); $(".pmPhoto_ipt").click(); });
	mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="msFilesDel_btn mf-g-photo-del" data-file="uplFileData_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".mayorSubPoster_wrap",extension:false});
}

var addNew_chr= function(e)
{
	genChPanel_form("asNR_form","ADD SUB-MESSAGE");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
	$(".asNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.mayor.message.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","10-1");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("data_",data_); for(var i=0, len=mFiles.length;i<len;i++){ iptData.append('data_[]', mFiles[i]);}  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{
					plParent.attr("data-page","0"); $(".mayorSubPost_panel").empty(); func1_();func2_();
					alert_("Record was Successfully Updated.", "Information");	$(".pPanel_bg").remove();
				}
				else{alert_("Error in : "+v.result,"Error Message");} 							
			});	
		},
		complete:function(e){ loading_("unload"); },
		xhr:function(){ var xhr = new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function (evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); xhr.addEventListener("progress",function (evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
	});
}

var getFrom_chr= function(e)
{	
	if(e)
	{
		$.post('model/tbl.mayor.message.php',{token:"0",fb:"27",ft:"10-2",data_:e.parents(".mayorSubPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='title']").val(v.title);
					$(".Richtext_ipt").html(v.description);

					$.each(v.files,function(ind,val)
					{						
						if(val.index)
						{
							var tPmExt= val.ext.toLowerCase(), tPmSrc="", tPmLnk="";							
							if(Image_arr.includes(val.ext.toLowerCase())){ tPmSrc=val.src; tPmLnk='<p>'+val.name+'</p>'; }
							if(Video_arr.includes(val.ext.toLowerCase())){ tPmSrc="../images/icons/video.png"; tPmLnk='<p>'+val.name+'</p>'; }
							$(".mayorSubPoster_wrap").append('<span class="mFiles_fr mf-g-photo" title="'+val.name+'" > <img src="'+tPmSrc+'" /> <div class="mf-g-photo-in">	<div class="msFilesDel_btn mf-g-photo-del" data-file="'+val.src+'" title="Click to remove"><i class="fa fa-close"></i></div> </div> '+tPmLnk+' </span>'); //<p>'+tPmLnk+'</p>
						}
					});	
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
			var msDelFiles=[];
			$(".msFilesDel_btn").unbind("click").click(function(e){ msDelFiles.push($(this).attr("data-file")); });

			$(".usNR_form").unbind("submit").submit(function(s)
			{	
				s.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
				$.ajax({url: "model/tbl.mayor.message.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","10-3");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("smd",e.parents(".mayorSubPost").data("j-v-c").ci);iptData.append("data_",data_); for(var i=0, len=mFiles.length; i<len; i++){iptData.append('data_[]', mFiles[i]);}; for(var i=0, len=msDelFiles.length; i<len; i++){iptData.append('del_[]', msDelFiles[i]);};   },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result== "1")
						{
							$("#mayorSubPost"+v.id).find(".mayorSubPost_tit").text(v.title);
							$("#mayorSubPost"+v.id).find(".mayorSubPost_val").html(v.description);
							$("#mayorSubPost"+v.id).find(".PostImage_wrap").hide().find(".Odeum").empty().removeClass("Odeum1, Odeum4");
							jGallery_items(v.files,"#mayorSubPost"+v.id); $(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();						
							
							alert_("Record was Successfully Updated.", "Information"); $(".pPanel_bg").remove();
							func2_();
						}
						else{alert_("Error in : "+v.result,"Error Message");} 							
					});	
				},
				complete:function(e)
				{ 
					loading_("unload"); 
					$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
				},
				xhr:function(){ var xhr= new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function(evt){ if(evt.lengthComputable){ var percentComplete= Math.round((evt.loaded / evt.total) * 100);$('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%");} }, false); xhr.addEventListener("progress", function(evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
				error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
			});

		}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();genChPanel_form("usNR_form","UPDATE SUB-MESSAGE");
	}		
}

var delFrom_chr= function(e){set_delete(e);}
var set_delete= function(e)
{	
	if(e)
	{
		$.post('model/tbl.mayor.message.php',{token:"0",fb:"27",ft:"10-4",newRow:e.parents(".mayorSubPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.result=="1")
				{
					$("#mayorSubPost"+v.id).fadeOut(200,function(e)
					{ 
						$("#mayorSubPost"+v.id).remove();
						if($(".mayorSubPost").length < parseInt(plParent.attr("data-limit"))){ plParent.attr("data-page",(parseInt(plParent.attr("data-page")) - 1)); func2_();tmpRstLoad();  }
					});
					func2_();
					
				}else{alert_(v.result,"Information");}
			}); 
		},"json").done(function(xhr, status, err){ loading_("unload"); }).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}

