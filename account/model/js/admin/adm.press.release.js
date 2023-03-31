
$(document).ready(function(e)
{
	$(".prAdd_btn").unbind("click").click(function(e){ addNew_record(); 			});
	$("body").off("click",".peFilesDel_btn").on("click",".peFilesDel_btn",function(e){ delItem_mFiles(e,$(this));	});
});

var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="m-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+
				'<div class="m-fr">'+
					'<div class="l30-fr"><i class="ipt-lbl">Date </i><input type="date" name="date" required placeholder="Date" /></div>'+
					'<div class="r70-fr"><i class="ipt-lbl">Venue</i><input type="text" name="venue" placeholder="Venue" /></div>'+
				'</div>'+
				'<div class="Richtext_wrap m-fr"><i class="ipt-lbl">Descripton</i></div>'+
				'<div class="prPoster_wrap rpt-update-img-wrap"></div>'+
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
	mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="uplFileData_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".prPoster_wrap",extension:false});
	//mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="uplFile_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".prPoster_wrap",extension:false});
}

var addNew_record= function(e)
{
	generate_form("aNR_form","ADD PRESS RELEASE");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.press.release.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-1");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("data_",data_); for(var i=0, len=mFiles.length;i<len;i++){ iptData.append('data_[]', mFiles[i]);}  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{
					plParent.attr("data-page","0"); $(".prPost_panel").empty(); pLoader_(); func1_();
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

var getFrom_record= function(e)
{	
	if(e)
	{
		$.post('model/tbl.press.release.php',{token:"0",fb:"27",ft:"0-2",data_:e.parents(".prPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='title']").val(v.title);													
					$(".pPanel input[name='date']").val(v.date_on);													
					$(".pPanel input[name='venue']").val(v.venue);
					$(".Richtext_ipt").html(v.description);

					$.each(v.files,function(ind,val)
					{						
						if(val.index)
						{
							var tPmExt= val.ext.toLowerCase(), tPmSrc="", tPmLnk="";							
							if(tPmExt=="pdf"){ tPmSrc="../images/icons/pdf.png"; tPmLnk='<a href="'+val.src+'" target="_blank" class="mf-g-photo-name-lnk">'+val.name+'</a>'; }
							if(Image_arr.includes(val.ext.toLowerCase())){ tPmSrc=val.src; tPmLnk='<p>'+val.name+'</p>'; }
							if(Video_arr.includes(val.ext.toLowerCase())){ tPmSrc="../images/icons/video.png"; tPmLnk='<p>'+val.name+'</p>'; }
							$(".prPoster_wrap").append('<span class="mFiles_fr mf-g-photo" title="'+val.name+'" > <img src="'+tPmSrc+'" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="'+val.src+'" title="Click to remove"><i class="fa fa-close"></i></div> </div> '+tPmLnk+' </span>'); //<p>'+tPmLnk+'</p>
						}
					});	
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
			var acDelFiles=[];
			$(".peFilesDel_btn").unbind("click").click(function(e){ acDelFiles.push($(this).attr("data-file")); });

			$(".uNR_form").unbind("submit").submit(function(s)
			{	
				s.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
				$.ajax({url: "model/tbl.press.release.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-3");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("smd",e.parents(".prPost").data("j-v-c").ci);iptData.append("data_",data_); for(var i=0, len=mFiles.length; i<len; i++){iptData.append('data_[]', mFiles[i]);}; for(var i=0, len=acDelFiles.length; i<len; i++){iptData.append('del_[]', acDelFiles[i]);};   },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result== "1")
						{
							$("#prPost"+v.id).find(".prPost_tit").text(v.title);
							$("#prPost"+v.id).find(".prPost_dte p").text("On "+v.date_on);							
							$("#prPost"+v.id).find(".prPost_ven p").text(v.venue);
							$("#prPost"+v.id).find(".prPost_val").html(v.description);
							$("#prPost"+v.id).find(".PostPdf_wrap").empty().hide();
							$("#prPost"+v.id).find(".PostImage_wrap").hide().find(".Odeum").empty().removeClass("Odeum1, Odeum4");
							jGallery_items(v.files,"#prPost"+v.id); $(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();						

							func1_(); alert_("Record was Successfully Updated.", "Information"); $(".pPanel_bg").remove(); 
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
		loading_();generate_form("uNR_form","UPDATE PRESS RELEASE");
	}		
}


var delFrom_record= function(e){set_delete(e);}
var set_delete= function(e)
{	
	if(e)
	{
		$.post('model/tbl.press.release.php',{token:"0",fb:"27",ft:"0-4",newRow:e.parents(".prPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.result=="1")
				{
					$("#prPost"+v.id).fadeOut(200,function(e)
					{ 
						$("#prPost"+v.id).remove();
						if($(".prPost").length < parseInt(plParent.attr("data-limit"))){ plParent.attr("data-page",(parseInt(plParent.attr("data-page")) - 1)); tmpRstLoad(); }
					});
					func1_();
					
				}else{alert_(v.result,"Information");}
			}); 
		},"json").done(function(xhr, status, err){ loading_("unload"); }).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}


/*
var func1_= function(e)
{
	alert(e.attr("data-file"));
}
*/

