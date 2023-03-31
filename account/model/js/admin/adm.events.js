
$(document).ready(function(e)
{
	$(".evAdd_btn").unbind("click").click(function(e){ addNew_record(); 			});
	$("body").on("click",".peFilesDel_btn",function(e){ delItem_mFiles(e,$(this));	});
});

var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="m-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+
				'<div class="l80-fr">'+
					'<div class="ipt-lfr"><i class="ipt-lbl">Date-time Start</i><input type="datetime-local" name="date_start" value="'+getDate_string({src:"input",input_type:"datetime",input_default_time:"00:00"})+'" required placeholder="Date-time start" /></div>'+
					'<div class="ipt-rfr"><i class="ipt-lbl">Date-time End  </i><input type="datetime-local" name="date_end" value="" placeholder="Date-time end" /></div>'+
				'</div>'+
				'<div class="r20-fr"><i class="ipt-lbl">Viewer</i>'+
					'<select name="viewer" required>'+
						'<option id="0" value="0" selected>All Users</option>'+
						'<option id="1" value="1">Admin</option>'+
						'<option id="2" value="2">Employees</option>'+
						'<option id="3" value="3">Clients</option>'+
					'</select>'+
				'</div>'+
				'<div class="m-fr"><i class="ipt-lbl">Venue</i><input type="text" name="venue" placeholder="Venue" /></div>'+
				'<div class="m-fr"><i class="ipt-lbl">Sub Title</i><textarea name="sub_title" rows="2" placeholder="Sub Title"></textarea> </div>'+
				'<div class="m-fr"><i class="ipt-lbl">Descripton</i><textarea name="description" rows="5" placeholder="Description"></textarea> </div>'+
				'<div class="evPoster_wrap rpt-update-img-wrap"></div>'+
				'<input type="file" name="uplFile[]" class="pmPhoto_ipt" hidden accept="image/*,application/pdf,video/*" multiple capture="camera" />'+
			'</div>'+
			'<div class="popFooter popup-panel-footer">'+
				'<div class="btn-fr">'+
					'<a href="#" class="pmPhoto_btn btn"><i class="fa fa-file-image-o"></i>Photo</a>'+
					'<button class="btn"><i class="fa fa-save"></i>Save</button>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</form></div>';
	$("body").append(tmp_form);
	$(".pmPhoto_btn").unbind("click").click(function(e){ e.preventDefault(); $(".pmPhoto_ipt").click(); });
	mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="uplFileData_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".evPoster_wrap",extension:false});
	//mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="uplFile_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".evPoster_wrap",extension:false});
}

var addNew_record= function(e)
{
	generate_form("aNR_form","ADD NEW EVENT");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.events.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-1");iptData.append("data_",data_); for(var i=0, len=mFiles.length;i<len;i++){ iptData.append('data_[]', mFiles[i]);}  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{
					plParent.attr("data-page","0"); $(".evPost_panel").empty(); pLoader_(); func1_();func2_();
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
		$.post('model/tbl.events.php',{token:"0",fb:"27",ft:"0-2",data_:e.parents(".evPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					var tmpSetDate= function(d){ if(d){ var tmpDateO_arr= d.split(" "); } return (d)?tmpDateO_arr[0]+"T"+tmpDateO_arr[1]:''; }

					$(".pPanel input[name='title']").val(v.title);											
					$(".pPanel input[name='date_start']").val(tmpSetDate(v.date_on));												
					$(".pPanel input[name='date_end']").val(tmpSetDate(v.date_end));
					$(".pPanel input[name='venue']").val(v.venue);
					$(".pPanel textarea[name='sub_title']").val(v.sub_title);
					$(".pPanel textarea[name='description']").val(v.description);
					$(".pPanel select[name='viewer']").val(v.viewer);

					$.each(v.files,function(ind,val)
					{						
						if(val.index)
						{
							var tPmExt= val.ext.toLowerCase(), tPmSrc="", tPmLnk="";							
							if(tPmExt=="pdf"){ tPmSrc="../images/icons/pdf.png"; tPmLnk='<a href="'+val.src+'" target="_blank" class="mf-g-photo-name-lnk">'+val.name+'</a>'; }
							if(Image_arr.includes(val.ext.toLowerCase())){ tPmSrc=val.src; tPmLnk='<p>'+val.name+'</p>'; }
							if(Video_arr.includes(val.ext.toLowerCase())){ tPmSrc="../images/icons/video.png"; tPmLnk='<p>'+val.name+'</p>'; }
							$(".evPoster_wrap").append('<span class="mFiles_fr mf-g-photo" title="'+val.name+'" > <img src="'+tPmSrc+'" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="'+val.src+'" title="Click to remove"><i class="fa fa-close"></i></div> </div> '+tPmLnk+' </span>'); //<p>'+tPmLnk+'</p>
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
				$.ajax({url: "model/tbl.events.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-3");iptData.append("smd",e.parents(".evPost").data("j-v-c").ci);iptData.append("data_",data_); for(var i=0, len=mFiles.length; i<len; i++){iptData.append('data_[]', mFiles[i]);}; for(var i=0, len=acDelFiles.length; i<len; i++){iptData.append('del_[]', acDelFiles[i]);};   },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result== "1")
						{
							$("#evPost"+v.id).find(".evPost_tit").text(v.title);
							$("#evPost"+v.id).find(".evPost_view").html('<p><b>Viewer:</b> '+v.viewer+'</p>');
							$("#evPost"+v.id).find(".evPost_dte").html('<i class="fa fa-calendar poster-label-ico"></i>	<p>'+v.date_on+((v.date_end)?' to '+v.date_end:'')+'</p>');
							$("#evPost"+v.id).find(".evPost_sti").text(v.sub_title);
							if(v.venue==''){ $("#evPost"+v.id).find(".evPost_ven").hide(); }
							$("#evPost"+v.id).find(".evPost_ven").html('<i class="fa fa-map-o poster-label-ico"></i><p>'+v.venue+'</p>');
							$("#evPost"+v.id).find(".evPost_val").html(jRead_more(v.description));
							$("#evPost"+v.id).find(".PostPdf_wrap").empty().hide();
							$("#evPost"+v.id).find(".PostImage_wrap").hide().find(".Odeum").empty().removeClass("Odeum1, Odeum4");
							//jGallery_items("#evPost"+v.id,".evPostImg_wrap",v.files); $(".Poster_photo, .Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();						

							jGallery_items(v.files,"#evPost"+v.id); $(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
							func1_();func2_(); alert_("Record was Successfully Updated.", "Information"); $(".pPanel_bg").remove();														
						}
						else{alert_("Error in : "+v.result,"Error Message");} 							
					});	
				},
				complete:function(e)
				{ 
					loading_("unload"); 
					$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
					//$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".evPostImg_wrap", ".Gallery_item", $(this)); });
				},
				xhr:function(){ var xhr= new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function(evt){ if(evt.lengthComputable){ var percentComplete= Math.round((evt.loaded / evt.total) * 100);$('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%");} }, false); xhr.addEventListener("progress", function(evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
				error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
			});

		}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();generate_form("uNR_form","UPDATE EVENT");
	}		
}


var delFrom_record= function(e){set_delete(e);}
var set_delete= function(e)
{	
	if(e)
	{
		$.post('model/tbl.events.php',{token:"0",fb:"27",ft:"0-4",newRow:e.parents(".evPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.result=="1")
				{
					$("#evPost"+v.id).fadeOut(200,function(e)
					{ 
						$("#evPost"+v.id).remove();
						if($(".evPost").length < parseInt(plParent.attr("data-limit"))){ plParent.attr("data-page",(parseInt(plParent.attr("data-page")) - 1)); tmpRstLoad(); }
					});
					func1_();func2_();
					
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

