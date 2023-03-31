
$(document).ready(function(e)
{
	$(".patAdd_btn").unbind("click").click(function(e){ addNew_record(); 			});
	$("body").off("click",".peFilesDel_btn");
	$("body").on("click",".peFilesDel_btn",function(e){ delItem_mFiles(e,$(this));	});
});

var generate_form= function(form,hdr)
{	
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="'+form+' pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>'+hdr+'</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+
			'<div class="genMInputs_wrap popup-panel-body">'+
				'<div class="m-fr"><i class="ipt-lbl">Title</i><textarea name="title" rows="2" required placeholder="Title"></textarea> </div>'+
				'<div class="m-fr">'+
					'<div class="l10-fx"><i class="ipt-lbl">Sort</i><input type="number" name="ord" class="c" required placeholder="0" /></div>'+
					'<div class="r90-fx"><i class="ipt-lbl">Link</i><input type="text" name="link" placeholder="Link Button" /></div>'+
				'</div>'+
				
				'<div class="Richtext_wrap m-fr"><i class="ipt-lbl">Descripton</i></div>'+
				'<div class="FlashPoster_wrap rpt-update-img-wrap"></div>'+
				'<div class="ui-ban-img"><img class="uPhoto_pic" src="" /></div>'+
				'<input type="file" name="uplFile[]" id="uplFile" class="uPhoto_ipt" hidden accept="image/*" capture="camera" />'+
			'</div>'+
			'<div class="popFooter popup-panel-footer">'+
				'<div class="btn-fr">'+
					'<a href="#" class="uPhoto_btn btn"><i class="fa fa-photo"></i>Photo</a>'+
					'<button class="btn"><i class="fa fa-save"></i>Save</button>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</form></div>';
	$("body").append(tmp_form);
	$(".Richtext_wrap").jTextEditor({class:"Richtext_ipt",placeholder:"Descripton",height:"100px"});
	$(".pmPhoto_btn").unbind("click").click(function(e){ e.preventDefault(); $(".pmPhoto_ipt").click(); });
	
}

var addNew_record= function(e)
{
	generate_form("aNR_form","ADD BANNER");show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel textarea[name='title']":"")});
	imageFile_(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));

	$(".aNR_form").unbind("submit").submit(function(e)
	{
		e.preventDefault();	var iptData= new FormData(this); var data_= $(this).serialize();
		$.ajax({url: "model/tbl.flash.banner.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
		beforeSend:function(data,form,opt){	loading_(loading_progress,"<i></i>");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-1");iptData.append("desc",$(".Richtext_ipt").html());iptData.append("data_",data_); for(var i=0, len=mFiles.length;i<len;i++){ iptData.append('data_[]', mFiles[i]);}  },
		success:function(json, status, xhr)
		{
			$.each(json, function(e, v)
			{
				if(v.result == "1")
				{
					plParent.attr("data-page","0"); $(".FlashPost_panel").empty(); pLoader_(); func1_();
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
		$.post('model/tbl.flash.banner.php',{token:"0",fb:"27",ft:"0-2",data_:e.parents(".FlashPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.id)
				{
					$(".pPanel textarea[name='title']").val(v.title);													
					$(".pPanel input[name='ord']").val(v.ord);													
					$(".pPanel input[name='link']").val(v.link);
					$(".Richtext_ipt").html(v.description);

					var tImg = (v.files.length > 1)?v.files[0].src:"../images/files/no-image-dark.jpg";

					$(".uPhoto_pic").attr("src",tImg+"?"+random_());		imgA=tImg+"?"+random_();
				}
			}); 
		},"json").done(function(xhr, status, err)
		{
			loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel textarea[name='title']":"")});
			imageFile_(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",imgA);

			$(".uNR_form").unbind("submit").submit(function(e)
			{
				e.preventDefault(); 	var iptData = new FormData(this);
				var gd=eval(err.responseText);	var data_= get_UserInfo($(this).serialize(),gd[1]['itoken']);
				$.ajax({url: "model/tbl.flash.banner.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
				beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("fb","27");iptData.append("ft","0-3");iptData.append("data_",data_); iptData.append("desc",$(".Richtext_ipt").html());  },
				success:function(json, status, xhr)
				{
					$.each(json, function(e, v)
					{
						if(v.result == "1")
						{	
							func1_(); tmpRstLoad();
							dynamicFunc = function(){$(".pPanel_bg").remove();dynamicFunc="";};
							alert_("Record was Successfully Updated.", "Information",dynamicFunc);	
						}
						else{	alert_(v.result,"Information","",".pPanel input[name='usern']");	}						
					});	
				},
				complete:function(e){},
				error:function(xhr, status, err){	loading_("unload");	if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}		}).done(function(data){ loading_("unload"); });
			});			

		}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_();generate_form("uNR_form","UPDATE BANNER");
	}		
}


var delFrom_record= function(e){set_delete(e);}
var set_delete= function(e)
{	
	if(e)
	{
		$.post('model/tbl.flash.banner.php',{token:"0",fb:"27",ft:"0-4",newRow:e.parents(".FlashPost").data("j-v-c").ci},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{												
				if(v.result=="1")
				{
					$("#FlashPost"+v.id).fadeOut(200,function(e)
					{ 
						$("#FlashPost"+v.id).remove();
						if($(".FlashPost").length < parseInt(plParent.attr("data-limit"))){ plParent.attr("data-page",(parseInt(plParent.attr("data-page")) - 1)); tmpRstLoad(); }
					});
					func1_();
					
				}else{alert_(v.result,"Information");}
			}); 
		},"json").done(function(xhr, status, err){ loading_("unload"); }).fail(function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		loading_("Deleting, Please wait...");
	}
	else{alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.","Error Message");}
}

