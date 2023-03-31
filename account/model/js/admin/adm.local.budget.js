
$(document).ready(function(e)
{
	$(".lbfAdd_btn").unbind("click").click(function(e){ addNew_record(); 			});
	$("body").off("click",".peFilesDel_btn").on("click",".peFilesDel_btn",function(e){ delItem_mFiles(e,$(this));	});
});

var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="l70-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+
				'<div class="r30-fr"><i class="ipt-lbl">Year</i><select name="year"><option value="2019">2019</option><option value="2020" selected>2020</option></select> </div>'+
				'<div class="m-fr"><i class="ipt-lbl">Descripton</i><textarea name="desc" rows="2" placeholder="Description"></textarea> </div>'+
				'<div class="ipt-dvr"></div>'+
				'<div class="lbfPoster_wrap rpt-update-img-wrap"></div>'+
				'<input type="file" name="uplFile[]" class="pmPhoto_ipt" hidden accept="application/pdf" multiple capture="camera" />'+
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
	mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="uplFileData_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".lbfPoster_wrap",extension:false});
}

var addNew_record= function(e)
{
	generate_form("aNR_form","ADD LOCAL BUDGET & FINANCE");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.local.budget.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-1");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("data_",data_); for(var i=0, len=mFiles.length;i<len;i++){ iptData.append('data_[]', mFiles[i]);}  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{
					plParent.attr("data-page","0"); $(".lbfPost_panel").empty(); pLoader_(); func1_();
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
		$.post('model/tbl.local.budget.php',{token:"0",fb:"27",ft:"0-2",data_:e.parents(".lbfPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='title']").val(v.title);													
					$(".pPanel select[name='year']").val(v.year);													
					$(".pPanel textarea[name='desc']").val(v.description);

					$.each(v.files,function(ind,val)
					{						
						if(val.index)
						{
							var tPmExt= val.ext.toLowerCase(), tPmSrc="", tPmLnk="";							
							if(tPmExt=="pdf"){ tPmSrc="../images/icons/pdf.png"; tPmLnk='<a href="'+val.src+'" target="_blank" class="mf-g-photo-name-lnk">'+val.name+'</a>'; }
							if(Image_arr.includes(val.ext.toLowerCase())){ tPmSrc=val.src; tPmLnk='<p>'+val.name+'</p>'; }
							if(Video_arr.includes(val.ext.toLowerCase())){ tPmSrc="../images/icons/video.png"; tPmLnk='<p>'+val.name+'</p>'; }
							$(".lbfPoster_wrap").append('<span class="mFiles_fr mf-g-photo" title="'+val.name+'" > <img src="'+tPmSrc+'" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="'+val.src+'" title="Click to remove"><i class="fa fa-close"></i></div> </div> '+tPmLnk+' </span>'); //<p>'+tPmLnk+'</p>
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
				$.ajax({url: "model/tbl.local.budget.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-3");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("smd",e.parents(".lbfPost").data("j-v-c").ci);iptData.append("data_",data_); for(var i=0, len=mFiles.length; i<len; i++){iptData.append('data_[]', mFiles[i]);}; for(var i=0, len=acDelFiles.length; i<len; i++){iptData.append('del_[]', acDelFiles[i]);};   },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result== "1")
						{
							$("#lbfPost"+v.id).find(".lbfPost_tit").text(v.title);
							$("#lbfPost"+v.id).find(".lbfPost_dte p").text(v.year);
							$("#lbfPost"+v.id).find(".lbfPost_val").html(v.description);
							$("#lbfPost"+v.id).find(".PostPdf_wrap").empty().hide();
							$("#lbfPost"+v.id).find(".PostImage_wrap").hide().find(".Odeum").empty().removeClass("Odeum1, Odeum4");
							jGallery_items(v.files,"#lbfPost"+v.id); 
							$(".Gallery_item").imgPreload(); $(".GalVideo_item").imgPreload();						

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
		loading_();generate_form("uNR_form","UPDATE LOCAL BUDGET & FINANCE");
	}		
}


var delFrom_record= function(e){set_delete(e);}
var set_delete= function(e)
{	
	if(e)
	{
		$.post('model/tbl.local.budget.php',{token:"0",fb:"27",ft:"0-4",newRow:e.parents(".lbfPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.result=="1")
				{
					$("#lbfPost"+v.id).fadeOut(200,function(e)
					{ 
						$("#lbfPost"+v.id).remove();
						if($(".lbfPost").length < parseInt(plParent.attr("data-limit"))){ plParent.attr("data-page",(parseInt(plParent.attr("data-page")) - 1)); tmpRstLoad(); }
					});
					func1_();
					
				}else{alert_(v.result,"Information");}
			}); 
		},"json").done(function(xhr, status, err){ loading_("unload"); }).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}


/* --:-- */
var genChPanel_form= function(form,hdr)
{
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="m-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+				
				'<div class="ipt-dvr"></div>'+
				'<div class="lbfPoster_wrap rpt-update-img-wrap lbf-pdf-wrap"></div>'+
				'<input type="file" name="uplFile[]" class="pmPhoto_ipt" hidden accept="application/pdf" multiple capture="camera" />'+
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
	$(".blRichText_wrap").jTextEditor({class:"blRichText_ipt",placeholder:"Descripton"});

	$(".pmPhoto_btn").unbind("click").click(function(e){ e.preventDefault(); $(".pmPhoto_ipt").click(); });
	mulFiles_(".pmPhoto_ipt",'<span class="mFiles_fr mf-g-photo" title="uplFile_name" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="uplFileData_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>',{parent:".lbfPoster_wrap",extension:false});
}

var addNew_chr= function(e)
{
	var tPar= e.parents(".lbfPost");
	genChPanel_form("aSNR_form","ADD SUB-POST");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
	$(".aSNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.local.budget.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","10-1"); iptData.append("smd",tPar.data("j-v-c").ci); iptData.append("data_",data_); for(var i=0, len=mFiles.length;i<len;i++){ iptData.append('data_[]', mFiles[i]);}  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{
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

					var tmpSubWrap= ''+
					'<div class="lbfSub_panel lbf-sub-wrap" id="lbfSub'+v.id+'">'+
						'<div class="pagelet-header pagelet-post-adm">'+
							'<div class="blSubTitle_val pagelet-poster b">'+v.title+'</div>'+tPNavi("lbfSub",v.id)+											
						'</div>'+
						'<div class="pagelet-body-in">'+
							'<ol class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
							'<div class="blSubPostImg_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+	
						'</div>'+
					'</div>';
					tPar.find(".blogSub_wrap").append(tmpSubWrap);
					tPar.find("#lbfSub"+v.id).data("c-v-c", {ci:v.itoken});
					jGallery_items(v.files,"#lbfSub"+v.id,{image_wrap:".blSubPostImg_wrap"});					
					
					alert_("Record was Successfully Saved.", "Information"); $(".pPanel_bg").remove();
					func6_();
					global_events();
				}
				else{alert_("Error in : "+v.result,"Error Message");} 							
			});	
		},
		complete:function(e)
		{ 
			loading_("unload"); func6_(); $(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap, .blSubPostImg_wrap", ".Gallery_item", $(this)); });
		},
		xhr:function(){ var xhr= new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function(evt){ if(evt.lengthComputable){ var percentComplete= Math.round((evt.loaded / evt.total) * 100);$('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%");} }, false); xhr.addEventListener("progress", function(evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
		error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
	});
}

var getFrom_chr= function(e)
{
	if(e)
	{
		var tPar= e.parents(".lbfSub_panel");
		$.post('model/tbl.local.budget.php',{token:"0",fb:"27",ft:"10-2",data_:tPar.data("c-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel input[name='title']").val(v.title);					
					$.each(v.files,function(ind,val)
					{						
						if(val.index)
						{
							var tPmExt= val.ext.toLowerCase(), tPmSrc="", tPmLnk="";							
							if(tPmExt=="pdf"){ tPmSrc="../images/icons/pdf.png"; tPmLnk='<a href="'+val.src+'" target="_blank" class="mf-g-photo-name-lnk">'+val.name+'</a>'; }
							if(Image_arr.includes(val.ext.toLowerCase())){ tPmSrc=val.src; tPmLnk='<p>'+val.name+'</p>'; }
							if(Video_arr.includes(val.ext.toLowerCase())){ tPmSrc="../images/icons/video.png"; tPmLnk='<p>'+val.name+'</p>'; }
							$(".lbfPoster_wrap").append('<span class="mFiles_fr mf-g-photo" title="'+val.name+'" > <img src="'+tPmSrc+'" /> <div class="mf-g-photo-in">	<div class="peFilesDel_btn mf-g-photo-del" data-file="'+val.src+'" title="Click to remove"><i class="fa fa-close"></i></div> </div> '+tPmLnk+' </span>'); //<p>'+tPmLnk+'</p>
						}
					});	
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='title']":"")});
			var acDelFiles=[];
			$(".peFilesDel_btn").unbind("click").click(function(e){ acDelFiles.push($(this).attr("data-file")); });

			$(".uSNR_form").unbind("submit").submit(function(s)
			{	
				s.preventDefault(); var iptData= new FormData(this); var data_= $(this).serialize();
				$.ajax({url: "model/tbl.local.budget.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","10-3");iptData.append("smd",tPar.data("c-v-c").ci);iptData.append("pad",tPar.parents(".lbfPost").data("j-v-c").ci);iptData.append("data_",data_); for(var i=0, len=mFiles.length; i<len; i++){iptData.append('data_[]', mFiles[i]);}; for(var i=0, len=acDelFiles.length; i<len; i++){iptData.append('del_[]', acDelFiles[i]);};   },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result== "1")
						{
							tPar.find(".blSubTitle_val").text(v.title);
							$("#lbfSub"+v.id).find(".PostPdf_wrap").empty().hide();
							jGallery_items(v.files,"#lbfSub"+v.id,{image_wrap:".blSubPostImg_wrap"});
							
							alert_("Record was Successfully Updated.", "Information"); $(".pPanel_bg").remove();
						}
						else{alert_("Error in : "+v.result,"Error Message");} 							
					});	
				},
				complete:function(e)
				{ 
					loading_("unload"); $(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap, .blSubPostImg_wrap", ".Gallery_item", $(this)); });
				},
				xhr:function(){ var xhr= new window.XMLHttpRequest(); xhr.upload.addEventListener("progress",function(evt){ if(evt.lengthComputable){ var percentComplete= Math.round((evt.loaded / evt.total) * 100);$('.loading_progress_text').text(percentComplete);$(".loading_progress_value").css("width",percentComplete+"%");} }, false); xhr.addEventListener("progress", function(evt){ if(evt.lengthComputable){ var percentComplete = Math.round((evt.loaded / evt.total) * 100); $('.loading_progress_text').text(percentComplete); $(".loading_progress_value").css("width",percentComplete+"%"); } }, false); return xhr; }, 
				error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
			});

		}).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();genChPanel_form("uSNR_form","UPDATE SUB-POST");
	}
}

var delFrom_chr= function(e)
{
	if(e)
	{
		var tPar= e.parents(".lbfSub_panel");
		$.post('model/tbl.local.budget.php',{token:"0",fb:"27",ft:"10-4",newRow:tPar.data("c-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.result=="1")
				{
					tPar.fadeOut(500,function(e){ $(this).remove(); });
				}else{alert_(v.result,"Information");}
			}); 
		},"json").done(function(xhr, status, err){ loading_("unload"); }).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}

/* --:-- */

