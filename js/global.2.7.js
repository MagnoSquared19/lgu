
var brgy = "Change me";
var host = window.location.protocol+"//"+window.location.hostname+"/lgu/";
//var host = window.location.protocol+"//"+window.location.hostname+"/";
var baseURL = host;

function device(){ return ($(window).width()>=800)?"pc":"mobile"; }

function removeSpace(a) { return (a)?a.replace(/  +/g, ' '):"";}
function removeString(i){ return (i)?i.replace(/[^0-9\.]+/g, ""):""; }
function nl2br(str, is_xhtml) 
{
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined')?'<br'+'/>':'<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+breakTag+'$2');
}

/* New Code */
function elemToString(v,prop)
{
	var result="";
	if(v)
	{
		let sh = Object.fromEntries(Object.entries({id:"",class:""}).map(([key, value])=>[key, value]));
		if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

		var obj= $('<div/>',{html:v,id:sh.id,class:sh.class}).contents();
		result= obj.text().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
	}
	return result;
}

function getAcronym(v,prop)
{
	var result="";
	if(v)
	{
		let sh = Object.fromEntries(Object.entries({uppercase:false,dot:false}).map(([key, value])=>[key, value]));
		if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

		var arr = v.split(' ');
		for(i=0;i<arr.length;i++) 
		{
			result += arr[i].substr(0,1)+((sh.dot)?".":"");
		}
		result = (sh.uppercase)?result.toUpperCase():result;
	}
	return result;
}

function isJson(str)
{
	try{ JSON.parse(str);} 
	catch(e){ return false; }
    return true;
}

/* New Code end */

function isValidURL(string)
{
	if(string)
	{
		var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
 		return (res !== null);
	}
	return false;
};

function getUrlVal(url)
{
	var result = "", url = (url)?url:window.location.href;	
	if(url.includes("?"))
	{
		var arr_a = url.split("?");
		var arr_v = arr_a[1].split("&");
		for(var i=0; i<arr_v.length; i++){ result += ((i==0)?"?":"&")+arr_v[i]; }
	}
	return result;
}
function setUrlVal(v,a)
{	
	var url = (a)?a:window.location.href;

	if(v.toLowerCase()=="reset"){	window.history.pushState('object or string', 'Title', window.location.href.split("?")[0]);	}
	else
	{
		if(url.includes("?"))
		{	
			var result="", arr_a = url.split("?"), arr_v = arr_a[1].split("&");
			for(var i=0; i<arr_v.length; i++)
			{ 
				if(v)
				{
					var aA= arr_v[i].split("="), aB= v.split("=");
					if(aA[0]==aB[0]){	result += ((i==0)?"?":"&")+aA[0]+"="+aB[1];	}
					else{	result += ((i==0)?"?":"&")+arr_v[i];	}				 
				}
				else{ result += ((i==0)?"?":"&")+arr_v[i];	 }			
			}
			window.history.pushState('object or string', 'Title', window.location.href.split("?")[0]+result);	
		}	
		else{ window.history.pushState('object or string', 'Title', window.location.href.split("?")[0]+((v.charAt(0)=='?')?v:'?'+v));	}						
	}
	//return false;e.preventDefault();
}

function setSearch_ipt(ipt,btn,exec,tme)
{
	$(btn).unbind("click"), $(btn).click(function(e){ clearTimeout(tme); exec(); 		});
	$(ipt).unbind("search"),$(ipt).on("search", function(e){ clearTimeout(tme); exec(); });
	$(ipt).unbind("keyup"),	$(ipt).keyup(function(e){ if((e.keyCode ? e.keyCode : e.which)!=13){ clearTimeout(tme); tme = setTimeout(function(e){ exec(); }, 1500); } 	});
}


function fileImage(ipt,cnt,pic,btn,def)
{
	$(btn).unbind("click");	$(btn).click(function(e){$(ipt).click();});	
	var tmpLimit_ = (cnt==null)?1:cnt;

	$(ipt).unbind("change");
	$(ipt).change(function(e)
	{	
		var files = !!this.files ? this.files : [];
		if(!files.length || !window.FileReader)return;
		if(files.length<=tmpLimit_)
		{
			if(files[0].size<= 10000000)
			{
				if (/^image/.test( files[0].type))
				{ 
					var reader = new FileReader(); 
					reader.readAsDataURL(files[0]); 				 
					reader.onloadend = function(e){	$(pic).attr("src",this.result);	}				
				} 
			}
			else{alert_("Invalid Image Size. Please resize the image before uploading.","Information"); $(this).val('');	$(pic).attr("src",def);	 }
		}else{	alert_("Only "+tmpLimit_+" file is required.","Information"); $(this).val('');	$(pic).attr("src",def);	}
	});
}

var uiFiles=[];
function fileUpload_(a,b,prop)
{
	var sh = Object.fromEntries(Object.entries({parent:".uplFiles_panel", extension:true}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

	uiFiles.length = 0; $(".uplFiles_panel").off("click",".uplFileDel_btn"), $(".uplFiles_panel").on("click", ".uplFileDel_btn", fileUpload_del);
	//mFiles.length = 0; $(".uplFiles_panel").off("click",".uplFileDel_btn"), $(".uplFiles_panel").on("click", ".uplFileDel_btn", function(e){ alert(); });

	var uplFle_ipt = (a)?a:"#uplFile";
	var uplAppend  = (b)?b:'<span class="uplFile_wrap mf-g-photo" title="uplFile_name"> <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="uplFileDel_btn mf-g-photo-del" data-file="uplFile_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> <p>uplFile_name</p> </span>';
	$(uplFle_ipt).unbind("change").change(function(e)
	{
		/*var files = !!this.files ? this.files : [];
		if(!files.length || !window.FileReader)return;*/
		var files = e.target.files;
		var filesArr = Array.prototype.slice.call(files);
		filesArr.forEach(function(f) 
		{	
			uiFiles.push(f);			
			var reader = new FileReader();
			reader.onload = function(e) 
			{
				var tFile_name= f.name.toString().lastIndexOf("."), tFile_ext = f.name.substring(tFile_name + 1);				
				//var tmpFile_name=(sh.extension)?f.name:f.name.toString().substr(0,tFile_name);
				var tmpFile_name=(sh.extension)?f.name+"."+sh.extension:f.name.toString();
				var tmpBackground=e.target.result;
				if(tFile_ext=="pdf"){ tmpBackground=baseURL+"images/icons/pdf.png"; }
				if(Video_arr.includes(tFile_ext)){ tmpBackground=baseURL+"images/icons/video.png"; }

				$(sh.parent).append(uplAppend.replace(/uplFile_src/g,tmpBackground).replace(/uplFile_name/g,tmpFile_name).replace(/uplFileData_name/g,f.name));
			}
			reader.readAsDataURL(f); 
		});
		fileUploadEna_btn();
	});
}
	function fileUpload_del(e,p)
	{
		var file = (p!=null)?p.data("file"):$(this).data("file"), par=(p)?p:$(this);
		for(var i=0;i<uiFiles.length;i++){ if(uiFiles[i].name === file){ uiFiles.splice(i,1); break; } }
		par.parents(".uplFile_wrap").remove();
		fileUploadEna_btn();
	}
	function fileUploadEna_btn()
	{
		if($(".mFilesEna_btn").length>0)
		{
			if(uiFiles.length<=0)	{	$(".mFilesEna_btn").prop("disabled",true);	}
			else if(uiFiles.length>0){	$(".mFilesEna_btn").prop("disabled",false);	}
		}		
	}


function dateToString(date){var conTime = new Date(date).toUTCString().replace(/\s*(GMT|UTC)$/, "").slice(0, -9);	return conTime;}
function toDate(d)
{
	var tmpResult = "", tmpDT_arr = "";
	if(d)
	{
		if(d.indexOf("/") > -1){ d = d.replace(/\//g, "-");	}
		if(d.indexOf(" ") > -1)
		{
			tmpDT_arr = d.split(" ");
			var tmpDate_arr = tmpDT_arr[0].split("-");
			
			var tmpAP = "am", tmpTime_arr = tmpDT_arr[1].split(":");
			if(parseInt(tmpTime_arr[0]) == 12)		{	tmpAP = "pm"; tmpTime_arr[0] = 12;	}		
			else if(parseInt(tmpTime_arr[0]) > 12)	{	tmpAP = "pm"; tmpTime_arr[0] = parseInt(tmpTime_arr[0]) - 12;	}		
			tmpResult=tmpDate_arr[1]+"/"+tmpDate_arr[2]+"/"+tmpDate_arr[0]+" "+((tmpTime_arr[0].length==1)?"0"+tmpTime_arr[0]:tmpTime_arr[0])+":"+tmpTime_arr[1]+tmpAP;	
			//tmpDateTime_=tmpDate_arr[1]+"/"+tmpDate_arr[2]+"/"+tmpDate_arr[0]+" "+((parseInt(tmpTime_arr[0])<10)?"0"+tmpTime_arr[0]:tmpTime_arr[0])+":"+tmpTime_arr[1]+tmpAP;	
		}
		else{ var tmpDate_arr = d.split("-"); tmpResult=tmpDate_arr[1]+"/"+tmpDate_arr[2]+"/"+tmpDate_arr[0]; }		
	}
	return tmpResult;	
}
function jDate_now(prop)
{
	let obj = Object.fromEntries(Object.entries({full:true,seperator:'/',type:"" }).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { obj[k] = v;  }); }

	var tDate = new Date();
	var tYear = tDate.getFullYear();
	var tMonth= tDate.getMonth() + 1;
	var tDay  = tDate.getDate();

	var rtn= "";

	if(obj.full){ rtn= tMonth+obj.seperator+tDay+obj.seperator+tYear; }
	else
	{
		if(obj.type=="day"){ rtn= tDay; }
		else if(obj.type=="month"){ rtn= tMonth;}
		else if(obj.type=="year"){ rtn= tYear; 	}
		else{ rtn= tMonth+obj.seperator+tDay+obj.seperator+tYear; }
	} 

	return rtn;
}
function getAge(birth) 
{
	if(birth)
	{
		var ageMS= Date.parse(Date()) - Date.parse(birth);
		var age = new Date();
		age.setTime(ageMS);
		var ageYear = age.getFullYear() - 1970;
		return ageYear;
	}
	else{ return ""; }
}

function $GET(arg)
{
	arg = (arg)?arg:"";
	window.$_GET = new URLSearchParams(location.search);
	return ($_GET.get(arg))?$_GET.get(arg):"";
}
function random(a)
{
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", length = (a)?a:6, result="";
	for (var i=0; i<length; i++){ var rnum = Math.floor(Math.random() * chars.length); result += chars.substring(rnum,rnum+1); }
	return result;
}
function toDecimal(s)
{ 
	s = s.toString();
	var tmpCur_val = (s)?((s==".")?"0":s):"", toCur_val="0.00";	
	if(s){ tmpCur_val = tmpCur_val.replace(/,/g,""); toCur_val = parseFloat(tmpCur_val).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");	}
	return toCur_val;	
}
function toThousand(x){ return ((x)?x:0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
var isVideoGallery= function(g)
{
	if(g)
	{ 
		var tmpElement= document.createElement('div');
		tmpElement.innerHTML = g.trim();
		if(tmpElement.firstChild.tagName.toLowerCase()=="video"){ return true; }
	}
	return false;
}



var Image_arr = ["jpg","png","gif","apng","bmp","ico","cur","jpeg","jfif","pjpeg","pjp","svg","tif","fiff","webp"];
var Video_arr = ["mp4","mov","ogg","avi","webm","swf","flv","m4v"];

var uiLoading= "<div class='uiLoading loader-data-fr'><div class='hourglass'></div></div>",
uiLoading2= "<div class='uiLoading loader-data-fr'><i class='loader-data'></i></div>",
ldgData= '<div class="ldgPost_wrap ldg-post"> <i class="ldg-pb"> <p class="ldg-pb-a"></p><p class="ldg-pb-b"></p><p class="ldg-pb-c"></p> </i> <i class="ldg-pc"> <p class="ldg-pc-a"></p><p class="ldg-pc-b"></p><p class="ldg-pc-c"></p><p class="ldg-pc-d"></p><p class="ldg-pc-e"></p> </i> </div>',
ldgPost= '<div class="ldgPost_wrap ldg-post"><p class="ldg-pa"></p> <i class="ldg-pb"> <p class="ldg-pb-a"></p><p class="ldg-pb-b"></p><p class="ldg-pb-c"></p> </i> <i class="ldg-pc"> <p class="ldg-pc-a"></p><p class="ldg-pc-b"></p><p class="ldg-pc-c"></p><p class="ldg-pc-d"></p><p class="ldg-pc-e"></p> </i> </div>',
ldgComm= '<div class="ldgComm_wrap ldg-comm"><div class="ldg-comm-a"></div><div class="ldg-comm-b"> <p/><p class="rc-b"></p> </div></div>',
ldgPostSub= '<div class="ldgPostSub_wrap ldg-post-sub"><div class="ldg-post-sub-a"></div><div class="ldg-post-sub-b"> <p/><p class="rc-a"></p><p class="rc-b"></p> </div></div>',
loading_progress='<div class="loading-progress"> <p><b class="loading_progress_text">0</b>%</p> <span><u class="loading_progress_value"></u></span> <i>Saving, please wait...</i> </div>';
loading_bounce	= '<div class="Loading_ico loading-bounce"> <div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div> </div>';
loading_bars	= '<div class="Loading_ico loading-bars"> <div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div> </div>';
loading_spin	= '<div class="Loading_ico loading-spin"></div>';



$("document").ready(function(e)
{	
	$("body").on("focusout",".email_" ,function(e){ if($(this).val()){ if(!$(this).val().includes("@")){ $(this).addClass("ipt-error");	alert_("Invalid E-mail Format. Please check your input.","Information","",".email_");}				else{$(this).removeClass("ipt-error");}		}	});
	$("body").on("focusout",".mobile_",function(e){ if($(this).val()){	if($(this).val().length !== 11)	{$(this).addClass("ipt-error");	alert_("Invalid Mobile Number Format. Please check your input.", "Information","", ".mobile_");}	else{$(this).removeClass("ipt-error");}		}	});
	$("body").on("keypress",".name_"  ,function(e){ if(String.fromCharCode(e.keyCode).match(/[^a-z A-Z .,-]/g) && e.keyCode != 13) return false;		});
	$("body").on("keypress",".character_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^a-z A-Z]/g)  && e.keyCode != 13) return false;		});
	
	$("body").on("keypress",".numeric_, .mobile_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^0-9]/g) && e.keyCode != 13){return false;}	});
	$("body").on("focusout",".decimal_",function(e){ if($(this).val()){ $(this).val(toDecimal($(this).val())); }					});
	$("body").on("keypress",".decimal_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^0-9,.]/g) && e.keyCode != 13)  return false;			});
	$("body").on("keypress",".spe_char_",function(e){if(e.which >= 48 && event.charCode <= 57  && e.keyCode != 13){	e.preventDefault(); return false;}  });
	$("body").on("keypress",".spe_num_",function(e) {if(String.fromCharCode(e.keyCode).match(/[^0-9\+\-\*\/\.\!\@\#\$\%\^\&\(\)\=\;\:\'\"\_\|\,\`\~\\]/g) && e.keyCode != 13) return false;  });
	$("body").on("keypress",".disabled_",function(e){ e.preventDefault(); return false;	});

	$("body").off("keypress",".digit_").on("keypress",".digit_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^0-9,]/g) && e.keyCode != 13)  return false;			});
	$("body").off("focusout",".digit_").on("focusout",".digit_",function(e){ var tmpValue= $(this).val().replace(/,/g,""); $(this).val(tmpValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));  });
	
	$("body").on("mousedown touchstart",".EyeIpt_btn",function(e){ $(this).parent(".PwIpt_fr").find("input").attr('type', 'text'); 			 	});
	$("body").on("mouseup touchend"  ,".EyeIpt_btn",function(e)  { $(this).parent(".PwIpt_fr").find("input").attr('type', 'password').focus();	});	

	$("body").on("click",".EyeIpt_lnk",function(e)  
	{ 
		if($(this).children("i").hasClass("fa-eye-slash")){ $(this).children("i").removeClass("fa-eye-slash"); $(this).parent(".PwIpt_fr").find("input").attr('type', 'password') }
		else{ $(this).children("i").addClass("fa-eye-slash"); $(this).parent(".PwIpt_fr").find("input").attr('type', 'text');  }
	});

	$("body").on("keyup",".pwd_confirm_",function(e)
	{ 
		var tmp_pwd= $(this).parents(".pwd_confirm_wrap_").find(".pwd_password_").val();
		if(tmp_pwd==""){ $(this).removeClass("ipt-error"); }
		else
		{
			if($(this).val() != tmp_pwd){ $(this).addClass("ipt-error"); }
			else{ $(this).removeClass("ipt-error"); }
		}
	});
	$("body").on("keyup",".pwd_password_",function(e)
	{ 
		var tmp_conf= $(this).parents(".pwd_confirm_wrap_").find(".pwd_confirm_").val();
		if(tmp_conf==""){ $(this).parents(".pwd_confirm_wrap_").find(".pwd_confirm_").removeClass("ipt-error"); }
		else
		{
			if($(this).val() != tmp_conf){ $(this).parents(".pwd_confirm_wrap_").find(".pwd_confirm_").addClass("ipt-error"); }
			else{ $(this).parents(".pwd_confirm_wrap_").find(".pwd_confirm_").removeClass("ipt-error"); }
		}		
	});

	$(".has_invalid").each(function(e){ if($(this).hasClass("option_invalid") == false){ $(this).addClass("option_invalid"); } });
	$("body").on("change",".has_invalid",function(e)
	{ 
		var actID= $(this).children(":selected").attr("id");
		if(actID=="0"){ $(this).addClass("option_invalid"); }
		else{ $(this).removeClass("option_invalid"); }
	});
	
	/* --|-- */
	$("body").on("click","a",function(e){ if($(this).attr("href") == "#"){ e.preventDefault(); } });
	$(".NoScript").remove();
	/* --|-- */

	$("body").on("click",function(e)
	{
		var bMenu_wrap = $(".bMenu_wrap, .bMenu_btn");
		if(!bMenu_wrap.is(e.target) && bMenu_wrap.has(e.target).length === 0){ $(".bMenu_wrap").hide(); $(".bMenu_btn").find(".bMenuAD_ico").removeClass("rotate-180"); }		
	});
	$("body").on("click",".bMenu_btn",function(e){ $(".bMenu_wrap").not($(this).siblings(".bMenu_wrap")).hide(); $(this).siblings(".bMenu_wrap").toggle(); $(this).find(".bMenuAD_ico").toggleClass("rotate-180"); });
	$("body").on("click",".bMenu_chd",function(e){ $(this).parents(".bMenu_wrap").hide(); $(this).parents(".bMenu_wrap").siblings(".bMenu_btn").find(".bMenuAD_ico").removeClass("rotate-180"); });
	
	$(".bMenu_chk").remove();

	$("body").on("click",".jGallery_cls",function(e){ $(".jGallery_panel").remove(); });
	$("body").on("click",".Odeum_btn",function(e){ e.preventDefault(); });

});

function global_events()		// Move this to global.2.7.js
{	
	initDraggable(); initSpryButton();	
	$("time.timeago").timeago();	
	//$(".popPanel").draggable({cancel:'.noDrag'});	 //$(".popPanel").draggable({cancel:'.pBody'});	 //$(".Burger_menu").removeAttr("tabindex");
	/*$(".input_name").bind({ copy:function(e){$('.action').text('copy');}, paste:function(e){$('.action').text('paste');}, cut:function(e){$('.action').text('cut');}		});*/
}

var initDraggable= function() 
{
	$(".pPanel").draggable({handle:'.pHeader', cancel:'.pBody'});		
	$(".popPanel").draggable({cancel:'.popPanel_wrap'});
}
var initSpryButton= function()
{
	$(".bMenu_chk").remove(); 
	$(".bMenu_btn").each(function(e){ $(this).replaceWith($('<a href="#" '+($(this).attr("class")?" class='"+$(this).attr("class")+"' ":"")+' '+($(this).attr("id")?" id='"+$(this).attr("id")+"' ":"")+' '+($(this).attr("title")?" title='"+$(this).attr("title")+"' ":"")+' >'+$(this).html()+'</a>'));	});
}

function initDefault()
{

}

function etoken(a){ a=(a)?a:15; return random(a); }

/* New Code */
function getPaginate(a){ return a.attr("data-limit")+","+a.attr("data-page"); }
function setPaginate(p,prop)
{
	let obj = Object.fromEntries(Object.entries({count:0, limit:0, page:0, link:"", exec:"", url:"" }).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { obj[k] = v;  }); }

	if(p.length)
	{
		var link_a= obj.link.split(",");
		var tmpStart= ((parseInt(obj.limit) * parseInt(obj.page)) - parseInt(obj.limit) ) + 1;
		var tmpEnd = ((obj.limit * obj.page)>obj.count)?obj.count:(obj.limit*obj.page);
		var tmpResult= ((link_a.length > 1)?tmpStart+"-"+tmpEnd+"  of ":"")+"<b>"+obj.count+"</b> Result"+((obj.count > 1)?"s":"");
		p.find(".pagiResult").html(tmpResult);

		p.find(".pagiLinks").empty();
		p.find(".pagiButtons_wrap").find(".pagiPrev_btn, .pagiNext_btn").remove();
		if(link_a.length > 1)
		{				
			for(var i=1;i<=link_a.length;i++){ p.find(".pagiLinks").append('<a href="#" class="pageUri_btn '+((i==obj.page)?" pagiDisabled ":"")+'">'+i+'</a>'); }
			p.find(".pageUri_btn").unbind("click").click(function(e){ e.preventDefault(); if($(this).hasClass("pagiDisabled")==false){p.attr("data-page",$(this).text()); obj.exec(); } });
			p.find(".pagiButtons_wrap").prepend('<a href="#" class="pagiPrev_btn disabled paginate-prev-btn" ><i class="fa fa-angle-left"></i></a>').append('<a href="#" class="pagiNext_btn disabled paginate-next-btn"><i class="fa fa-angle-right"></i></a>');
			
			if(tmpStart > 1){ p.find(".pagiPrev_btn").removeClass("disabled").unbind("click").click(function(e){ e.preventDefault(); p.attr("data-page", parseInt(p.attr("data-page")) - 1); obj.exec(); }); }
			if((obj.page*obj.limit)<obj.count){  p.find(".pagiNext_btn").removeClass("disabled").unbind("click").click(function(e){ e.preventDefault(); p.attr("data-page", parseInt(p.attr("data-page")) + 1); obj.exec(); }); }
		}
	}
}
/* New Code end */


var sTime="";
$(document).ready(function(e)
{	
	$(".slidePanel .slideBullet").click(function(e)
	{
		$(".slidePanel .slideBullet").removeClass("slideBullet_act");$(this).addClass("slideBullet_act");
		sPlay(($(this).index()) + 1);
	});
	slideStart();
});


function slideStart(){ sTime=setInterval("sPlay()", 3000);	}
function sPlay(a,p,t,f)
{
	if($(".slideBody").length > 0)
	{
		p = (p)?p:".slidePanel";
		t = (t)?t:sTime;
		f = (f)?f:slideStart;	//alert(p);

		var sInd = parseInt($(p+" .slideBody").attr("data-slide-ind"));
		sInd = (a)?a:parseInt(sInd)+1;
		sInd = (parseInt(sInd)>parseInt($(p+" .slideBullet").length))?1:sInd;

		$(p+" .slideBody").attr("data-slide-ind",sInd);
		$(p+" .slideBody").css("margin-left","-"+((parseInt(sInd) - 1) * 100)+"%");
		$(p+" .slideBullet").eq(parseInt(sInd) - 1).addClass("slideBullet_act").siblings().removeClass("slideBullet_act");

		clearTimeout(t); f();
	}
}


function wrap_(iden_arg)		
{
	if(iden_arg){	$(iden_arg).css({"overflow":"hidden","height":"100%"});	}
	else		{	$("body").css({"overflow":"hidden","height":"100%"});	}	//$("body").css({"overflow":"hidden","height":"100%"});
}
function unwrap_(iden_arg){	if(iden_arg){$(iden_arg).css("overflow","auto");}	else{$("body").css("overflow","auto");}		}
function center_(formFr_arg, formInn_arg){	if(parseInt($(formFr_arg).height())	> parseInt($(formInn_arg).height())){$(formInn_arg).css("margin-top",(($(formFr_arg).height() - $(formInn_arg).height()) / 2));} else{$(formInn_arg).css("margin-top","10px");}		}
function center2_(formFr_arg, formInn_arg,prop)
{	
	var sh = Object.fromEntries(Object.entries({background:null, panel:null}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

	formFr_arg = (sh.background)?sh.background:formFr_arg;
	formInn_arg= (sh.panel)?sh.panel:formInn_arg;

	if(parseInt($(formFr_arg).height())	> parseInt($(formInn_arg).height()))
	{
		$(formInn_arg).css("margin-top",(($(formFr_arg).height() - $(formInn_arg).height()) / 2));} else{$(formInn_arg).css("margin-top","10px");
	}		
}


function show_(sFR_arg, sForm_arg, sStyle_arg)
{
	$(sFR_arg).css({"display":"block"}).show().animate({opacity:1},0,function(e)
	{	
		$(sForm_arg).css({"margin-top":0 - $(sForm_arg).height()});
		if(parseInt($(sFR_arg).height()) > parseInt($(sForm_arg).height())){	$(sForm_arg).animate({"margin-top":(($(sFR_arg).height() - $(sForm_arg).height()) / 2)}, 400, function(e){	});		}
		else{	$(sForm_arg).animate({"margin-top":"30px", "margin-bottom":"30px"}, 400, function(e){		});	}		
	});
}

function show2_(bg,panel,prop)
{	
	let sh = Object.fromEntries(Object.entries({lock:true, draggable:true, animation:true, center:true, info:null, close_button:".pPanel_cls", focus:"" }).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

	$(bg).css({"display":"block"}).show().animate({opacity:1},0,function(e)
	{
		if(sh.center)
		{
			var tmpPosi = (parseInt($(bg).height()) > parseInt($(bg+" "+panel).height()))?(($(bg).height() - $(bg+" "+panel).height()) / 2):"30";
			if(sh.animation)
			{ 
				$(bg+" "+panel).css({"margin-top":0 - $(bg+" "+panel).height()}); 
				$(bg+" "+panel).animate({"margin-top":tmpPosi+"px"}, 400, function(e){	});
			}
			else{ $(bg+" "+panel).css({"margin-top":tmpPosi+"px"}); }	
		}
		else{ $(bg+" "+panel).css({"margin-top":"30px"});  }		
	});
	$(sh.close_button).unbind("click").click(function(e){	$(bg).remove();unwrap_();	return false;	});

	if(sh.draggable){ $(panel).draggable({cancel:'.popPanel_wrap'}); }
	if(sh.lock == false){ $(bg).unbind("click").click(function(event){ if(!$(event.target).closest(panel).length){ $(sh.close_button).click(); return false; } }); }
	if(sh.focus !=""){ $(sh.focus).focus(); }

	wrap_();
}




//	POP UPS	-----------------------------------------------------------------------------
function loading_(text_arg, icon_arg)
{
	if(text_arg == "unload"){	$(".Loading_bg").remove();	}
	else
	{
		var _loading_txt = "Loading, Please wait...";
		if(text_arg){_loading_txt = text_arg;}

		var _loading_ico = "<div class='ldg-bar'><div></div><div></div><div></div></div>";
		if(icon_arg == "1"){_loading_ico = '<div class="ldg-spin"></div>';}
		if(icon_arg == "2"){_loading_ico = '<div class="hourglass"></div>';}
		else{_loading_ico=(icon_arg)?icon_arg:_loading_ico;}
		

		var _loader = ''+
		'<div class="Loading_bg pop-bg" style="display:block;">'+
			'<div class="Loading_fr loading-fr">'+_loading_ico+'<div class="loading-p">'+_loading_txt+'</div>'+
			'</div>'+
		'</div>';
		$(_loader).appendTo('body');	center_(".Loading_bg",".Loading_fr");
	}
}
function loading_X(text_arg, type_arg, icon_arg, style_arg)
{	
	var _loading_txt;	
	if(text_arg == null || text_arg == ''){_loading_txt = "Loading...";}
	else{	_loading_txt = text_arg;  text_arg = text_arg.toLowerCase();	}

	var loading_icon_ = "fa-refresh";
	if(icon_arg){	loading_icon_ = icon_arg;		}
	
	if(text_arg == "unload"){	$(".Loading_fr").remove();	}
	else
	{
		var load_txt_size = "";
		if( parseInt(_loading_txt.length) < 30		){}
		else if( parseInt(_loading_txt.length) < 80	){	load_txt_size="loading-txt-size1";	}
		else if( parseInt(_loading_txt.length) < 130){	load_txt_size="loading-txt-size2";	}
		else if( parseInt(_loading_txt.length) < 180){	load_txt_size="loading-txt-size3";	}

		var _loader = "";	
		
		var loadingDef = ""+
		"<div class='Loading_fr loading-fr'><div class='Loading_in loading-inn'>"+
			"<div class='loading-form'>"+
				"<div class='loading-icon-fr'><i class='loading-icon fa fa-spin "+loading_icon_+" fa-3x fa-fw'></i></div>"+
				"<i class='loading-txt "+load_txt_size+" '>"+_loading_txt+"</i>"+
			"</div>"+
		"</div></div>";
		var loadingTxt = ""+
		"<div class='Loading_fr loading-fr'><div class='Loading_in loading-inn'>"+
			"<div class='loading-form'>"+
				"<i class='loading-txt "+load_txt_size+" '>"+_loading_txt+"</i>"+
			"</div>"+
		"</div></div>";
		var loadingIcon = ""+
		"<div class='Loading_fr loading-fr'><div class='Loading_in loading-inn'>"+
			"<div class='loading-form'>"+
				"<div class='loading-icon-fr' style='margin-bottom:0px;'><i class='loading-icon fa fa-spin "+loading_icon_+" fa-3x fa-fw'></i></div>"+
			"</div>"+
		"</div></div>";		
		
		if(type_arg == null || type_arg == ''){_loader = loadingDef;}
		else if(type_arg == "text"){	_loader = loadingTxt;		}
		else if(type_arg == "icon"){	_loader = loadingIcon;		}
		
		$(_loader).appendTo('body');	center_(".Loading_fr",".Loading_in");
	}	
}

function alert_(text_arg, hdr_arg, exec_arg, focus_arg, icon_arg, btn_txt_arg)
{	
	if($(".Alert_fr").length <= 0)
	{
		var _alert_txt = "";
		if(text_arg){_alert_txt = text_arg;}

		var _alert_hdr = "";
		if(hdr_arg){_alert_hdr=hdr_arg;}

		var _alert_btn_txt = "OK";
		if(btn_txt_arg){	_alert_btn_txt = btn_txt_arg;	}
		
		var myAlert = ""+
		"<div class='Alert_bg pop-bg' style='display:block' >"+
			"<div class='Alert_fr alert-panel'>"+		
				"<div class='alert-hdr'>"+
					"<div class='alert-hdr-txt'>"+_alert_hdr+"</div>"+
					"<a href='#' class='alertClose_btn alert-cls-btn ico-close'></a>"+
				"</div>"+			
				"<div class='alert-body'>"+_alert_txt+"</div>"+

				"<div class='alert-footer'><div class='alert-footer-in'>"+
					"<button class='alertOK_btn alert-btn'>"+_alert_btn_txt+"</button>"+
				"</div>";
			"</div></div>"+
		"</div>";	
			
		$(myAlert).appendTo('body');	
		center_(".Alert_bg",".Alert_fr");
		wrap_();
		
		/*$("a, button, input").attr('tabindex', '-1');
		$(".alertOK_btn").attr('tabindex', '1');$(".alertClose_btn").attr('tabindex', '2');*/
		$(".alertOK_btn").focus();
		
		$(".alertOK_btn, .alertClose_btn").unbind("click");
		$(".alertOK_btn, .alertClose_btn").click(function(e)
		{		
			if(exec_arg){exec_arg(); /*window[exec_arg]();*/	}
			$(".Alert_bg").remove();
			unwrap_();
			
			if(focus_arg){	$(focus_arg)[0].focus();	}
			return false;	
		});	
	}	
}
function confirm_(text_arg, hdr_arg, exec_arg, focus_arg, icon_arg, btnYes_txt_arg, btnNo_txt_arg, no_exec_arg)
{
	if($(".Alert_bg").length <= 0)
	{
		var _alert_txt = "";
		if(text_arg){_alert_txt = text_arg;}
		
		var _alert_hdr = "";
		if(hdr_arg){_alert_hdr=hdr_arg;}
		
		var _alertYes_btn_txt = "Confirm";
		var _alertNo_btn_txt = "Cancel";
		if(btnYes_txt_arg)	{	_alertYes_btn_txt = btnYes_txt_arg;	}	
		if(btnNo_txt_arg)	{	_alertNo_btn_txt  = btnNo_txt_arg;	}
		
		var myAlert = ""+
		"<div class='Confirm_bg pop-bg' style='display:block' >"+
			"<div class='Confirm_fr alert-panel'>"+		
				"<div class='alert-hdr'>"+
					"<div class='alert-hdr-txt'>"+_alert_hdr+"</div>"+
					"<a href='#' class='alertClose_btn alert-cls-btn ico-close'></a>"+
				"</div>"+			
				"<div class='alert-body'>"+_alert_txt+"</div>"+

				"<div class='alert-footer'><div class='alert-footer-in'>"+
					"<button class='alertYes_btn alert-btn'>"+_alertYes_btn_txt+"</button>"+
					"<button class='alertNo_btn alert-btn'>"+_alertNo_btn_txt+"</button>"+
				"</div>";
			"</div></div>"+
		"</div>";	
		
		wrap_();	
		$(myAlert).appendTo('body');
		center_(".Confirm_bg",".Confirm_fr");
		
		//$("a, button, input").attr('tabindex', '-1');
		//$(".alertYes_btn").attr('tabindex', '1');$(".alertNo_btn").attr('tabindex', '2');$(".alertClose_btn").attr('tabindex', '3');
		$(".alertYes_btn").focus();
		
		$(".alertYes_btn, .alertNo_btn, .alertClose_btn").unbind("click");
		$(".alertYes_btn, .alertNo_btn, .alertClose_btn").click(function(e){	$(".Confirm_bg").remove();/*$("a, button, input").attr('tabindex', '1');$(".disBtn, .disBtn2").attr('tabindex', '-1');*/	unwrap_();if(focus_arg){$(focus_arg)[0].focus();}		return false;	});	
		
		if(exec_arg)	{$(".alertYes_btn").click(function(e){ exec_arg();		});	}
		if(no_exec_arg)	{$(".alertNo_btn").click(function(e) { no_exec_arg();	});	}	
	}
}
function openWindow_(url,prop)	// New Code 01/30/2021
{
	if(url)
	{
		let sh = Object.fromEntries(Object.entries({title:"",width:760,height:400,callback:null}).map(([key, value])=>[key, value]));
		if((prop) && (Object.keys(prop).length >0)){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v; }); }

		var dualScreenLeft= window.screenLeft != undefined ? window.screenLeft : screen.left;  
	    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;  
	              
	    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;  
	    height= window.innerHeight? window.innerHeight: document.documentElement.clientHeight? document.documentElement.clientHeight : screen.height;  
	              
	    var left= ((width / 2) - (sh.width / 2)) + dualScreenLeft;  
	    var top = ((height / 2) - (sh.height / 2)) + dualScreenTop;  
	    var newWindow = window.open(url, sh.title, 'scrollbars=yes, width='+sh.width+', height='+sh.height+', top='+top+', left='+left);  

	    if(sh.callback){ window.CallParentfunction= function(e){ sh.callback(); } }		
	    if(window.focus){ newWindow.focus(); } 
	}
	else{ alert_("Open Window error in: 'URL' value is Invalid or Empty. Please check the URL value.","Information"); }
}

function jGallery(p,i)
{
	if($(".jGallery_panel").length <= 0)
	{
		var tmpJG_cnt=0;	i= (i)?i:0;
		var tmpJGallery= ''+
		'<div class="jGallery_panel jgallery-bg" >'+
			'<a href="#" class="jGallery_cls jgallery-cls"><i class="fa fa-close"></i></a>'+
			'<div class="jgallery-body">'+
				'<div class="jgallery-main">'+
					'<div class="jGalPrev_btn jgallery-prev"><i class="fa fa-chevron-left"></i></div>'+
					'<img class="jGallery_item_act" src="" />'+
					'<div class="jGalNext_btn jgallery-next"><i class="fa fa-chevron-right"></i></div>'+
				'</div>'+
				'<div class="jgallery-item-wrap"><div class="gGalleryItem_body jgallery-item-body"> </div></div>'+
			'</div>'+
		'</div>';
		$("body").append(tmpJGallery);
		var tmpJImg_item= p.find("a").clone();
		tmpJImg_item.removeClass().appendTo(".gGalleryItem_body");
		tmpJG_cnt= $(".gGalleryItem_body a").length;
		/* ok na */

		$(".gGalleryItem_body a").each(function(e)
		{			
			$(this).addClass("jGallery_item jgallery-item");
			if(e==i)
			{ 
				$(this).addClass("jGallery_act"); var tmpGalActive=$(this).clone();
				$(".jGallery_item_act").replaceWith(tmpGalActive.removeClass().addClass("jGallery_item_act"));
			}
		});
		$(".jGallery_panel").show();

		$(".jGallery_item_act").unbind("click").click(function(e){ return false; });		
		$(".jGalPrev_btn").unbind("click").click(function(e) { if(i > 0){ jGalleryPlay('0'); 				} 	 });
		$(".jGalNext_btn").unbind("click").click(function(e) { if((i + 1) < tmpJG_cnt){ jGalleryPlay('1');	} 	 });
		$(".jGallery_item").unbind("click").click(function(e){ jGalleryPlay(null,$(this).index()); return false; });

		var jGalleryPlay= function(t,a)
		{
			i=(t=="0")?(i-1):(t=="1")?(i+1):(a>=0)?a:i;

			$(".jGallery_item").removeClass("jGallery_act").eq(i).addClass("jGallery_act");
			var jGalAct_src= $(".jGallery_item img").eq(i).attr("src");
			$(".jGallery_item_act").attr("href",jGalAct_src); $(".jGallery_item_act img").attr("src",jGalAct_src);

			(i<=0)?$(".jGalPrev_btn").addClass("jGalPN_dis"):$(".jGalPrev_btn").removeClass("jGalPN_dis");
			((i+1)>=tmpJG_cnt)?$(".jGalNext_btn").addClass("jGalPN_dis"):$(".jGalNext_btn").removeClass("jGalPN_dis");
		}
		jGalleryPlay(null,i);	
	}	
}
var setJGall_ind= function(p)
{
	var sGall_cnt=p.find(".Odeum4 a").length; p.find(".Odeum4 a").removeClass("OdeumI0 OdeumI4 hidden").removeAttr("data-count");
	p.find(".Odeum4 a").each(function(i)
	{
		if(i==0){ $(this).addClass("OdeumI0"); }
		else if((i==3) && ((sGall_cnt - 4) > 0)){ $(this).addClass("OdeumI4").attr("data-count","+"+(sGall_cnt - 4));  }
		else if(i > 3){ $(this).addClass("hidden"); }		
	});
}
function jGallary_exe(wrap,btn,me)
{
	var list=[];
	me.parents(wrap).find(btn).each(function(e)
	{
		var obType= ($(this).children(0).prop("nodeName")).toLowerCase();		
		if(obType=="img")
		{
			var tmpImage= $(this).find("img");
			var tmpSize = tmpImage.attr("data-size").split("x");
			list.push({src:tmpImage.attr("src"),w:tmpSize[0],h:tmpSize[1],title:tmpImage.attr("alt")});
		}
		else if(obType=="video")
		{ 
			var tmpVideo = $(this).find("video");
			list.push({html:'<video controls class="pswp-video"><source src="'+tmpVideo.attr("src")+'"></video>',title:tmpVideo.attr("title")});
		}			
	});	
	if(list.length > 0){ openGallery({index:me.parents(wrap).find(btn).index(me),items:list}); }
}

function jGallery_items(files,wrap,prop)
{
	let obj = Object.fromEntries(Object.entries({image_wrap:".PostImage_wrap", pdf_wrap:".PostPdf_wrap"}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { obj[k] = v;  }); }

	var ivCount=0;
	$.each(files,function(ind,val)
	{						
		if(val.index)
		{
			if(val.ext.toLowerCase()=="pdf"){ $(wrap).find(obj.pdf_wrap).show().append('<li><a href="'+val.src+'" target="_blank" >'+val.name+'</a></li>'); }
			if(Image_arr.includes(val.ext.toLowerCase()))
			{ 
				$(wrap).find(obj.image_wrap).show().find(".Odeum").append('<a href="'+val.src+'" class="Gallery_item GalImage_item" title="'+val.name+'" ><img id="postThumb'+val.index+'" alt="'+val.name+'" src="'+val.src+'" data-size="600x400" /></a>'); 
				$(wrap).find("#postThumb"+val.index).off("load").on("load", function(e)
				{
					var w_ = $(this).get(0).naturalWidth, h_ = $(this).get(0).naturalHeight;
					if((w_!="undefined" || w_!="0") && (h_!="undefined" || h_!="0")){ $(this).attr("data-size",w_+"x"+h_); }
				}); ivCount += 1;
			}
			if(Video_arr.includes(val.ext.toLowerCase()))
			{
				var tmpXVideo = '<a href="'+val.src+'" class="Gallery_item GalVideo_item" title="'+val.name+'" ><video controls src="'+val.src+'" title="'+val.name+'" ></video></a>';
				$(wrap).find(obj.image_wrap).show().find(".Odeum").show().append(tmpXVideo); ivCount += 1;
			}
			
		}
	});	
	if(ivCount <= 1){ $(wrap).find(".Odeum").addClass("Odeum1"); }
	else{ $(wrap).find(".Odeum").addClass("Odeum4"); setJGall_ind($(wrap)); }	
}

/* Revised Gallery */




/* Revised Gallery end */





/*
function jGallery(p,i)
{
	if($(".jGallery_panel").length <= 0)
	{
		var tmpJG_cnt=0;	i= (i)?i:0;
		var tmpJGallery= ''+
		'<div class="jGallery_panel jgallery-bg" >'+
			'<a href="#" class="jGallery_cls jgallery-cls"><i class="fa fa-close"></i></a>'+
			'<div class="jgallery-body">'+
				'<div class="jgallery-main">'+
					'<div class="jGalPrev_btn jgallery-prev"><i class="fa fa-chevron-left"></i></div>'+
					'<img class="jGallery_item_act" src="" />'+
					'<div class="jGalNext_btn jgallery-next"><i class="fa fa-chevron-right"></i></div>'+
				'</div>'+
				'<div class="jgallery-item-wrap"><div class="gGalleryItem_body jgallery-item-body"> </div></div>'+
			'</div>'+
		'</div>';
		$("body").append(tmpJGallery); p.find(".jGal_img").clone().appendTo(".gGalleryItem_body");
		tmpJG_cnt= $(".gGalleryItem_body img").length;

		$(".gGalleryItem_body img").each(function(e)
		{			
			$(this).removeClass().addClass("jGallery_item jgallery-img");
			if(e==i)
			{ 
				$(this).addClass("jGallery_act"); 
				var tmpGalActive=$(this).clone();
				$(".jGallery_item_act").replaceWith(tmpGalActive.removeClass().addClass("jGallery_item_act"));
			}
		});
		$(".jGallery_panel").show();

		$(".jGallery_item").unbind("click").click(function(e){ jGalleryPlay(null,$(this).index()); 				});
		$(".jGalPrev_btn").unbind("click").click(function(e) { if(i > 0){ jGalleryPlay('0'); 				} 	});
		$(".jGalNext_btn").unbind("click").click(function(e) { if((i + 1) < tmpJG_cnt){ jGalleryPlay('1');	} 	});

		var jGalleryPlay= function(t,a)
		{
			i=(t=="0")?(i-1):(t=="1")?(i+1):(a>=0)?a:i;

			$(".jGallery_item").removeClass("jGallery_act").eq(i).addClass("jGallery_act");
			var tmpGalActive=$(".jGallery_item").eq(i).clone();
			$(".jGallery_item_act").replaceWith(tmpGalActive.removeClass().addClass("jGallery_item_act"));

			(i<=0)?$(".jGalPrev_btn").addClass("jGalPN_dis"):$(".jGalPrev_btn").removeClass("jGalPN_dis");
			((i+1)>=tmpJG_cnt)?$(".jGalNext_btn").addClass("jGalPN_dis"):$(".jGalNext_btn").removeClass("jGalPN_dis");
		}		
	}	
}
*/

function jRead_more(val,w,prop)
{	
	if(val)
	{
		var rm= Object.fromEntries(Object.entries({words:55}).map(([key, value])=>[key, value]));
		if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { rm[k] = v;  }); }
		rm['words']= (w)?w:rm['words'];

		var rmRtn= val, rmRtn_a="", rmRtn_b="";
		if(val.split(" ").length >= rm['words'])
		{
			rmRtn=val.split(" ");
			for(var i=0;i<rmRtn.length;i++){ if(i<rm['words']){rmRtn_a += rmRtn[i]+" ";} else{ rmRtn_b += rmRtn[i]+" "; } }
			rmRtn= rmRtn_a+'<span class="readMore_oth" hidden>'+rmRtn_b+'</span> <a class="readMore_btn" data-before="... " href="#">read more</a>';
		}
		return jLink(rmRtn);		
	}else{ return ""; }	
}
$(document).ready(function(e)
{
	$("body").on("click",".readMore_btn",function(e)
	{ 
		if($(this).text()=="read more"){ $(this).siblings(".readMore_oth").show(); $(this).text("read less").attr("data-before",""); }
		else{ $(this).siblings(".readMore_oth").hide();	$(this).text("read more").attr("data-before","... "); }
	});
});

function jLink(text)
{
	text= text.replace(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,function(match, space, url)
	{
		var hyperlink=url;
		if(!hyperlink.match('^https?:\/\/')){ hyperlink = 'http://' + hyperlink; }
		return space+'<a href="'+hyperlink+'" target="_blank">'+url+'</a>';
	});
	text = text.replace(/(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim, "<a href='mailto:$1'>$1</a>");
	
	return text;
}

/*
$(document).ready(function(e)
{
	$("body").on("click",".readMore_btn",function(e){ $(this).parent().addClass("readMore_wrap");	 });
	$("body").on("click",".readLess_btn",function(e){ $(this).parent().removeClass("readMore_wrap"); });
});
function jRead_moreX(v,w,prop)
{
	var rm= Object.fromEntries(Object.entries({words:20,unlink:true}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { rm[k] = v;  }); }
	rm.words = (w)?w:rm.words;

	var obj= $('<div/>',{id:'tmpReadMore_obj',html:v}).contents();
	var count = 0, result="", rst= $("<div/>",{ id:'newReadMore_obj'});

	for(var i=0;i<obj.length;i++)
	{
		var obj_in= obj[i].innerHTML;		
		var nWord = obj[i].innerHTML.replace(/>.*?</g, function(a, b) 
		{
			var xWord="", objIn_a = a.split(/\s+/g);
			for(var j=0;j<objIn_a.length;j++)
			{
				if(objIn_a[j] != '><'){ count += 1; xWord += objIn_a[j]+' '; if(count!=0 && count==2){ xWord += '<more>'; } }
				else{ xWord += '><'; }
			}
		    return xWord.replace(/< /g, "<");;
		});
		obj[i].innerHTML=nWord
		$(rst).append(obj[i]);
	}
	var result= rst.html();
	var rst_a= rst.html().split("<more>");
	if(rst_a.length==2)
	{
		result= rst_a[0]+'<u class="readMore_btn"></u><span class="readMore_txt">'+rst_a[1]+'</span><u class="readLess_btn"></u>';
	}
	return (rm.unlink)?jLink(result):result;
}
function jRead_moreX(v,w,prop)
{	
	console.log(v);
	var rm= Object.fromEntries(Object.entries({words:5,unlink:true}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { rm[k] = v;  }); }
	rm.words = (w)?w:rm.words; 

	var result="", count=0, 
	rst= $("<div/>",{ id:'newReadMore_obj'}),
	obj= $('<div/>',{id:'tmpReadMore_obj',html:v}).contents();

	for(var i=0;i<obj.length;i++)
	{
		console.log(obj[i].nodeName);
		if(obj[i].nodeName == "#text")
		{	
			var textElements = $(obj[i]).text().split(/\s+/g);
			for(var j=0; j < textElements.length; j++)
	        {
	        	if(textElements[j] == "") continue; 	            
	            count++; rst.append(textElements[j] + " ");
	            if(count!=0 && count==rm.words){ rst.append("<more>"); }
	        }
	    }
	    else{ count++; rst.append(obj[i]); if(count!=0 && count==rm.words){ rst.append("<more>"); } }
	}

	result= rst.html();
	var rst_a= rst.html().split("<more>");
	if(rst_a.length==2)
	{
		result= rst_a[0]+'<u class="readMore_btn"></u><span class="readMore_txt">'+rst_a[1]+'</span><u class="readLess_btn"></u>';
	}

	return (rm.unlink)?jLink(result):result;
}
function jLinkX(v) 
{
    var replacedText, replacePattern1, replacePattern2, replacePattern3;
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = v.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}
*/

(function(a)
{
	(function($)
	{
		return $.fn.imgPreload= function(e)
		{
			if($(this).length>0)
			{
				var objType= ($(this).children(0).prop("nodeName")).toLowerCase();	//alert(objType);
				$(this).each(function(e)
				{
					if($(this).hasClass("fileLoaded")==false)
					{
						var tmpParent= $(this), tmpFile= "";
						tmpParent.append('<div class="img_loading preloading-icon"></div>');

						if(objType=="video")
						{ 
							tmpFile=tmpParent.find("video");	tmpFile.hide(); 
							tmpFile.on('loadstart',function(e)
							{ 
								tmpParent.find(".img_loading").fadeOut(500); tmpFile.fadeIn(500); tmpParent.addClass("fileLoaded");  /* console.log("on load");  */
						
							}).on('error', function(e){ /*console.log("error");*/ }); 
						}

						if(objType=="img")
						{
							tmpFile=tmpParent.find("img");	tmpFile.hide(); 
							tmpFile.on('load',function(e)
							{ 
								tmpParent.find(".img_loading").fadeOut(500); tmpFile.fadeIn(500); tmpParent.addClass("fileLoaded");  /* console.log("on load");  */
						
							}).on('error', function(e){ /*console.log("error");*/ }); 
						}					
					}
				});
				/*var selector = $(this).parents().map(function(){return this.tagName;}).get().reverse().concat([this.nodeName]).join(">");
				selector += ($(this).attr("id"))?("#"+$(this).attr("id")):"";
				selector += ($(this).attr("class"))?("." + $.trim($(this).attr("class")).replace(/\s/gi, ".")):"";
				alert(selector);*/
				//alert($(this).prop("nodeName"));
			}			
		};
	})(jQuery);


	(function($)
	{
		var genRichTextEditor= ''+
		'<div class="richEditor_wrap rich-editor">'+
			'<ul class="rich-editor-tools">'+				
				'<li><button type="button" class="RTE_btn RCode_btn" data-command="code" data-code="0" title="Source Code"><i class="fa fa-code"		></i></button></li>'+
				'<li><button type="button" class="RTE_btn" data-command="undo" title="Undo (Ctrl + Z)"><i class="fa fa-undo"	></i></button></li>'+
				'<li><button type="button" class="RTE_btn" data-command="redo" title="Redo (Ctrl + Y)"><i class="fa fa-repeat"	></i></button></li>'+
				'<li class="burjer-panel">'+				
					'<input type="checkbox" id="richTools1" class="bMenu_chk" />'+
					'<label for="richTools1" class="bMenu_btn" title="Text Align"> <i class="fa fa-align-left"></i><u class="bMenuAD_ico"></u> </label>'+
					'<span class="bMenu_wrap">'+
						'<button class="bMenu_chd RTE_btn" data-command="justifyLeft"	><i class="fa fa-align-left"></i>Align Left</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="justifyCenter"	><i class="fa fa-align-center"></i>Align Center</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="justifyRight"	><i class="fa fa-align-right"></i>Align Right</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="justifyFull"	><i class="fa fa-align-justify"></i>Align Justify</button>'+
					'</span>'+				
				'</li>'+
				'<li><button type="button" class="RTE_btn" data-command="bold" title="Bold (Ctrl + B)"		><i class="fa fa-bold"	></i></button></li>'+
				'<li><button type="button" class="RTE_btn" data-command="italic" title="Italic (Ctrl + I)"	><i class="fa fa-italic"></i></button></li>'+
				'<li class="burjer-panel">'+				
					'<input type="checkbox" id="richTools2" class="bMenu_chk" />'+
					'<label for="richTools2" class="bMenu_btn" title="Formatting"> <i class="fa fa-paragraph"></i><u class="bMenuAD_ico"></u> </label>'+
					'<span class="bMenu_wrap">'+
						'<button class="bMenu_chd RTE_btn" data-command="formatblock" data-block="h1">Title 1 &lt;h1&gt;</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="formatblock" data-block="h2">Title 2 &lt;h2&gt;</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="formatblock" data-block="h3">Title 3 &lt;h3&gt;</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="formatblock" data-block="h4">Title 4 &lt;h4&gt;</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="formatblock" data-block="h5">Title 5 &lt;h5&gt;</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="formatblock" data-block="h6">Subtitle &lt;h6&gt;</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="formatblock" data-block="p">Paragraph &lt;p&gt;</button>'+
						'<button hidden class="bMenu_chd RTE_btn" data-command="formatblock" data-block="pre">Preformatted &lt;pre&gt;</button>'+
					'</span>'+				
				'</li>'+
				'<li class="burjer-panel">'+				
					'<input type="checkbox" id="richTools3" class="bMenu_chk" />'+
					'<label for="richTools3" class="bMenu_btn" title="Text Size"> <i class="fa fa-text-height"></i><u class="bMenuAD_ico"></u> </label>'+
					'<span class="bMenu_wrap">'+
						'<button class="bMenu_chd RTE_btn" data-command="fontsize" data-size=1">Very Small</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="fontsize" data-size=2">Small</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="fontsize" data-size=3">Normal</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="fontsize" data-size=4">Medium</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="fontsize" data-size=5">Big</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="fontsize" data-size=6">Very Big</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="fontsize" data-size=7">Super Big</button>'+
					'</span>'+				
				'</li>'+
				'<li class="burjer-panel">'+				
					'<input type="checkbox" id="richTools4" class="bMenu_chk" />'+
					'<label for="richTools4" class="bMenu_btn" title="Text Color"> <i class="fa fa-paint-brush"></i><u class="bMenuAD_ico"></u> </label>'+
					'<span class="bMenu_wrap">'+
						'<button class="bMenu_chd RTE_btn" data-command="forecolor" data-color="red"  ><i class="fa fa-font" style="color:red;"></i>Red</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="forecolor" data-color="blue" ><i class="fa fa-font" style="color:blue;"></i>Blue</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="forecolor" data-color="green"><i class="fa fa-font" style="color:green;"></i>Green</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="forecolor" data-color="white"><i class="fa fa-font" style="color:#ddd;"></i>White</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="forecolor" data-color="black"><i class="fa fa-font" style="color:black;"></i>Black</button>'+
					'</span>'+				
				'</li>'+
				'<li class="burjer-panel">'+				
					'<input type="checkbox" id="richTools5" class="bMenu_chk" />'+
					'<label for="richTools5" class="bMenu_btn" title="Background Color"> <i class="fa fa-circle"></i><u class="bMenuAD_ico"></u> </label>'+
					'<span class="bMenu_wrap">'+
						'<button class="bMenu_chd RTE_btn" data-command="backcolor" data-color="red"  ><i class="fa fa-circle" style="color:red;"></i>Red</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="backcolor" data-color="blue" ><i class="fa fa-circle" style="color:blue;"></i>Blue</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="backcolor" data-color="green"><i class="fa fa-circle" style="color:green;"></i>Green</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="backcolor" data-color="white"><i class="fa fa-circle-o"></i>White</button>'+
						'<button class="bMenu_chd RTE_btn" data-command="backcolor" data-color="black"><i class="fa fa-circle" style="color:black;"></i>Black</button>'+
					'</span>'+				
				'</li>'+
				'<li class="burjer-panel">'+				
					'<input type="checkbox" id="richTools" class="bMenu_chk" />'+
					'<label for="richTools" class="bMenu_btn" title="Other Styles"> <i class="fa fa-ellipsis-h"></i><u class="bMenuAD_ico"></u> </label>'+
					'<span class="bMenu_wrap">'+
						'<button class="RTE_btn" data-command="underline"			 ><i class="fa fa-underline"></i>Underline</button>'+
						'<button class="RTE_btn" data-command="strikeThrough"		 ><i class="fa fa-strikethrough"></i>Strike Through</button>'+
						'<button class="RTE_btn" data-command="insertOrderedList"	 ><i class="fa fa-list-ol"></i>Ordered List</button>'+
						'<button class="RTE_btn" data-command="insertUnorderedList"><i class="fa fa-list-ul"></i>Unordered List</button>'+
						'<button class="RTE_btn" data-command="createlink"		 ><i class="fa fa-link"></i>Insert Link</button>'+
						'<button class="RTE_btn" data-command="unlink"		 	 ><i class="fa fa-unlink"></i>Remove Link</button>'+
						'<button class="RTE_btn" data-command="insertImage"		 ><i class="fa fa-file-photo-o"></i>Add Image</button>'+
						'<button class="RTE_btn" data-command="superscript"		 ><i class="fa fa-superscript"></i>Superscript</button>'+
						'<button class="RTE_btn" data-command="subscript"			 ><i class="fa fa-subscript"></i>Subscript</button>'+						
					'</span>'+				
				'</li>'+
			'</ul>'+
			'<div class="richTextarea rich-textarea" contenteditable="true" data-placeholder="" ></div>'+
		'</div>';
		function setRichTextEditor(e)
		{
			var richText= document.getElementsByClassName("richTextarea");
			var buttons = document.getElementsByClassName("RTE_btn");
			for(let btn of buttons)
			{
				btn.addEventListener("click", function(e)
				{
					e.preventDefault();
					var cmd = btn.dataset["command"];	
					if(cmd==="createlink")
					{
						var url = prompt("Enter the Link/URL here: ", 'https:\/\/'); 
						//var sText = editorWindow.document.getSelection();						
						document.execCommand(cmd, false, url);
						$('a[href="'+url+'"').attr('target', '_blank');
					}
					else if(cmd==="insertImage")
					{ 
						var url = prompt("Enter Photo Link/URL here: ", 'https:\/\/'); document.execCommand(cmd, false, url);
					}
					else if(cmd==="fontsize"){ document.execCommand(cmd, false, btn.dataset["size"]); }
					else if(cmd==="fontname"){ document.execCommand(cmd, false, btn.dataset["font"]); }
					else if(cmd==="forecolor"){ document.execCommand(cmd, false, btn.dataset["color"]); }
					else if(cmd==="backcolor"){ document.execCommand(cmd, false, btn.dataset["color"]); }
					else if(cmd==="formatblock"){ document.execCommand(cmd, false, btn.dataset["block"]); }					
					else if(cmd==="code")
					{ 
						if($(this).attr("data-code")=="0")
						{
							var tmpText_val= $(this).parents(".richEditor_wrap").find(".richTextarea").html();
							$(this).parents(".richEditor_wrap").find(".richTextarea").text(tmpText_val);
							$(".RTE_btn, .bMenu_btn").attr("disabled", true);
							$(this).attr("disabled",false);
							$(this).attr("data-code","1");
						}
						else if($(this).attr("data-code")=="1")
						{
							var tmpText_val= $(this).parents(".richEditor_wrap").find(".richTextarea").text();
							$(this).parents(".richEditor_wrap").find(".richTextarea").html(tmpText_val);
							$(".RTE_btn, .bMenu_btn").attr("disabled", false);
							$(this).attr("data-code","0");
						}
					}				
										
					else{ document.execCommand(cmd, false, null); }

				});				
			}
		}
		/* https://www.youtube.com/watch?v=gsUtM3WC--A */
		return $.fn.jTextEditor= function(prop)
		{
			if($(this).length>0)
			{
				var sh = Object.fromEntries(Object.entries({height:"250px",class:"",placeholder:"",css:{}}).map(([key, value])=>[key, value]));
				if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

				$(this).append(genRichTextEditor);
				$(this).find(".richEditor_wrap").css(sh.css);
				$(this).find(".richTextarea").css({"height":sh.height});
				$(this).find(".richTextarea").addClass(sh.class);
				$(this).find(".richTextarea").attr("data-placeholder",sh.placeholder);
				initSpryButton();
				setRichTextEditor();
			}
		};
		//readMore_wrap
		//richText_val($(".richTextEditor_txt").html());

	})(jQuery);



}).call(this);

function richText_val(obj)
{
	var isCode= obj.parents(".richEditor_wrap").find(".RCode_btn").attr("data-code");
	var txtVal= (isCode=="1")?obj.text():obj.html();
	
	return txtVal.replace(/&nbsp;|&quot;|&lt;|\/b&gt;/g,'');  
}


var openGallery= function(prop) 
{	
	var pg = Object.fromEntries(Object.entries({items:null,index:0,autoplay:false}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { pg[k] = v;  }); }

	setGalleryPanel();
    var pswpElement= document.querySelectorAll('.pswp')[0];    
    
    var options= {index:pg.index,history:false,shareEl:false,loadingIndicatorDelay: 1000,preloaderEl: true,tapToClose: false,};    
    var gallery= new PhotoSwipe(pswpElement,PhotoSwipeUI_Default, pg.items, options);
    gallery.init(); 

    gallery.listen('close', function(e){ $(".pswp").remove(); });

    /*gallery.items.push({src:"../images/x/2.jpg",w:1024,h:683}); gallery.invalidateCurrItems(); gallery.updateSize(true);*/
    /*gallery.currItem.src= '../images/gallery/2.png'; gallery.currItem.needsUpdate= true; gallery.updateSize(true);*/ //update current source image
	//if(pg.autoplay){ gallery.listen('afterChange',function(e){ if(isVideoGallery(gallery.currItem.html)){} }); } //for update
	//var options={history:false,index:2,focus:false,showAnimationDuration:2000, hideAnimationDuration:2000,closeEl:true,captionEl:true,fullscreenEl:true,zoomEl:true,shareEl:false };    	
};


/* jvc */
$(document).ready(function(e)
{	
	//setGalleryPanel();     

});

function setGalleryPanel()
{
	if($(".pswp").length<=0)
	{	
		tmpGalleryPanel= ''+
		'<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'+
			'<div class="pswp__bg"></div>'+
			'<div class="pswp__scroll-wrap">'+
				'<div class="pswp__container">'+
					'<div class="pswp__item"></div>'+
					'<div class="pswp__item"></div>'+
					'<div class="pswp__item"></div>'+
				'</div>'+
				'<div class="pswp__ui pswp__ui--hidden">'+
					'<div class="pswp__top-bar">'+
						'<div class="pswp__counter"></div>'+
						'<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'+
						'<button class="pswp__button pswp__button--share" title="Share"></button>'+
						'<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>'+
						'<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>'+
						'<div class="pswp__preloader">'+
							'<div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div> </div> </div>'+
						'</div>'+
					'</div>'+
					'<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div> </div>'+
					'<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>'+
					'<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>'+
					'<div class="pswp__caption"> <div class="pswp__caption__center"></div> </div>'+
				'</div>'+
			'</div>'+
		'</div>';
		$("body").append(tmpGalleryPanel);
	}	
}


var initPhotoSwipeFromDOM = function(gallerySelector) 
{
    var parseThumbnailElements= function(el) 
    {  
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) 
        {	
            figureEl = thumbElements[i]; 	
            if(figureEl.nodeType !== 1) { continue; }
            linkEl = figureEl.children[0];

            //size = (!("data-size" in linkEl.dataset))?'1000x600':'100x50';
            console.log(linkEl.getAttribute('data-size').split('x'));
            //size = linkEl.getAttribute('data-size');
            size = linkEl.getAttribute('data-size').split('x');

            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1){ item.title= figureEl.children[1].innerHTML;  }
            if(linkEl.children.length > 0)  { item.msrc = linkEl.children[0].getAttribute('src'); } 

            item.el = figureEl; 
            items.push(item);
        }
        return items;
    };

    var closest= function closest(el, fn){ return el && ( fn(el) ? el : closest(el.parentNode, fn) ); };
    var onThumbnailsClick = function(e) 
    {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        var clickedListItem = closest(eTarget, function(el){ return (el.tagName && el.tagName.toUpperCase() === 'FIGURE'); });

        if(!clickedListItem){ return; }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for(var i = 0; i < numChildNodes; i++) 
        {
            if(childNodes[i].nodeType !== 1){ continue; }
            if(childNodes[i] === clickedListItem){ index = nodeIndex; break; }
            nodeIndex++;
        }

        if(index >= 0){ openPhotoSwipe( index, clickedGallery ); }
        return false;
    };

    var photoswipeParseHash= function() 
    {
        var hash = window.location.hash.substring(1),
        params = {};    

        if(hash.length < 5){ return params; }   

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) 
        {
            if(!vars[i]){ continue; }
            var pair = vars[i].split('=');  
            if(pair.length < 2){ continue; }           
            params[pair[0]] = pair[1];
        }
        if(params.gid){ params.gid = parseInt(params.gid, 10); }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) 
    {
        var pswpElement = document.querySelectorAll('.pswp')[0], gallery, options, items;  

        items = parseThumbnailElements(galleryElement);
		options = 
		{
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),getThumbBoundsFn: function(index) 
			{
				var thumbnail = items[index].el.getElementsByTagName('img')[0],
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();
				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }
        };
		if(fromURL) 
		{
            if(options.galleryPIDs) 
			{
                for(var j = 0; j < items.length; j++) 
				{
                    if(items[j].pid == index) 
					{
                        options.index = j;
                        break;
                    }
                }
            } 
			else{	options.index = parseInt(index, 10) - 1;	}
        } 
		else{	options.index = parseInt(index, 10);	}
		if(isNaN(options.index)){	return;	}
        if(disableAnimation){    options.showAnimationDuration = 0;		}
		gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
	
	var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i=0, l=galleryElements.length; i<l; i++) 
	{
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
	var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid){	openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );	}
};

//initPhotoSwipeFromDOM('.my-gallery');

/* base 2 */
!function(a,b)
{ 
	"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipe=b()}(this,function()
	{
		"use strict";
		var a=function(a,b,c,d)
		{
			var e={features:null,bind:function(a,b,c,d)
			{
				var e=(d?"remove":"add")+"EventListener";
				b=b.split(" ");
				for(var f=0;f<b.length;f++)
					b[f]&&a[e](b[f],c,!1)
			},isArray:function(a){return a instanceof Array},
			createEl:function(a,b)
			{
				var c=document.createElement(b||"div");
				return a&&(c.className=a),c},getScrollY:function(){var a=window.pageYOffset;return void 0!==a?a:document.documentElement.scrollTop}
				,unbind:function(a,b,c){e.bind(a,b,c,!0)},
				removeClass:function(a,b)
				{
					var c=new RegExp("(\\s|^)"+b+"(\\s|$)");
					a.className=a.className.replace(c," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")
				}
				,addClass:function(a,b){e.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)}
				,hasClass:function(a,b){return a.className&&new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)}
				,getChildByClass:function(a,b){for(var c=a.firstChild;c;){if(e.hasClass(c,b))return c;c=c.nextSibling}}
				,arraySearch:function(a,b,c){for(var d=a.length;d--;)if(a[d][c]===b)return d;return-1}
				,extend:function(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){if(c&&a.hasOwnProperty(d))continue;a[d]=b[d]}}
				,easing:{sine:{out:function(a){return Math.sin(a*(Math.PI/2))},inOut:function(a){return-(Math.cos(Math.PI*a)-1)/2}},cubic:{out:function(a){return--a*a*a+1}}}
				,detectFeatures:function()
				{
					if(e.features)return e.features;var a=e.createEl(),b=a.style,c="",d={};
					if(d.oldIE=document.all&&!document.addEventListener,d.touch="ontouchstart"in window,window.requestAnimationFrame&&(d.raf=window.requestAnimationFrame,d.caf=window.cancelAnimationFrame),d.pointerEvent=navigator.pointerEnabled||navigator.msPointerEnabled,!d.pointerEvent){var f=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var g=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);g&&g.length>0&&(g=parseInt(g[1],10),g>=1&&8>g&&(d.isOldIOSPhone=!0))}var h=f.match(/Android\s([0-9\.]*)/),i=h?h[1]:0;i=parseFloat(i),i>=1&&(4.4>i&&(d.isOldAndroid=!0),d.androidVersion=i),d.isMobileOpera=/opera mini|opera mobi/i.test(f)}for(var j,k,l=["transform","perspective","animationName"],m=["","webkit","Moz","ms","O"],n=0;4>n;n++){c=m[n];for(var o=0;3>o;o++)j=l[o],k=c+(c?j.charAt(0).toUpperCase()+j.slice(1):j),!d[j]&&k in b&&(d[j]=k);c&&!d.raf&&(c=c.toLowerCase(),d.raf=window[c+"RequestAnimationFrame"],d.raf&&(d.caf=window[c+"CancelAnimationFrame"]||window[c+"CancelRequestAnimationFrame"]))}if(!d.raf){var p=0;d.raf=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-p)),d=window.setTimeout(function(){a(b+c)},c);return p=b+c,d},d.caf=function(a){clearTimeout(a)}}return d.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,e.features=d,d}};e.detectFeatures(),e.features.oldIE&&(e.bind=function(a,b,c,d){b=b.split(" ");for(var e,f=(d?"detach":"attach")+"Event",g=function(){c.handleEvent.call(c)},h=0;h<b.length;h++)if(e=b[h])if("object"==typeof c&&c.handleEvent){if(d){if(!c["oldIE"+e])return!1}else c["oldIE"+e]=g;a[f]("on"+e,c["oldIE"+e])}else a[f]("on"+e,c)});var f=this,g=25,h=3,i={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(a){return"A"===a.tagName}
					,getDoubleTapZoom:function(a,b){return a?1:b.initialZoomLevel<.7?1:1.33}
					,maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};
					e.extend(i,d);
					var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la=function(){return{x:0,y:0}}
					,ma=la(),na=la(),oa=la(),pa={},qa=0,ra={},sa=la(),ta=0,ua=!0,va=[],wa={},xa=!1
					,ya=function(a,b){e.extend(f,b.publicMethods),va.push(a)}
					,za=function(a){var b=_b();return a>b-1?a-b:0>a?b+a:a}
					,Aa={}
					,Ba=function(a,b){return Aa[a]||(Aa[a]=[]),Aa[a].push(b)}
					,Ca=function(a){var b=Aa[a];if(b){var c=Array.prototype.slice.call(arguments);c.shift();for(var d=0;d<b.length;d++)b[d].apply(f,c)}},Da=function(){return(new Date).getTime()},Ea=function(a){ia=a,f.bg.style.opacity=a*i.bgOpacity},Fa=function(a,b,c,d,e){(!xa||e&&e!==f.currItem)&&(d/=e?e.fitRatio:f.currItem.fitRatio),a[E]=u+b+"px, "+c+"px"+v+" scale("+d+")"},Ga=function(a){da&&(a&&(s>f.currItem.fitRatio?xa||(lc(f.currItem,!1,!0),xa=!0):xa&&(lc(f.currItem),xa=!1)),Fa(da,oa.x,oa.y,s))},Ha=function(a){a.container&&Fa(a.container.style,a.initialPosition.x,a.initialPosition.y,a.initialZoomLevel,a)},Ia=function(a,b){b[E]=u+a+"px, 0px"+v},Ja=function(a,b){if(!i.loop&&b){var c=m+(sa.x*qa-a)/sa.x,d=Math.round(a-sb.x);(0>c&&d>0||c>=_b()-1&&0>d)&&(a=sb.x+d*i.mainScrollEndFriction)}sb.x=a,Ia(a,n)},Ka=function(a,b){var c=tb[a]-ra[a];return na[a]+ma[a]+c-c*(b/t)},La=function(a,b){ a.x=b.x,a.y=b.y,b.id&&(a.id=b.id); },Ma=function(a){a.x=Math.round(a.x),a.y=Math.round(a.y);   },Na=null,Oa=function(){Na&&(e.unbind(document,"mousemove",Oa),e.addClass(a,"pswp--has_mouse"),i.mouseUsed=!0,Ca("mouseUsed")),Na=setTimeout(function(){Na=null},100)},Pa=function(){e.bind(document,"keydown",f),N.transform&&e.bind(f.scrollWrap,"click",f),i.mouseUsed||e.bind(document,"mousemove",Oa),e.bind(window,"resize scroll",f),Ca("bindEvents")},Qa=function(){e.unbind(window,"resize",f),e.unbind(window,"scroll",r.scroll),e.unbind(document,"keydown",f),e.unbind(document,"mousemove",Oa),N.transform&&e.unbind(f.scrollWrap,"click",f),U&&e.unbind(window,p,f),Ca("unbindEvents")},Ra=function(a,b){var c=hc(f.currItem,pa,a);return b&&(ca=c),c},Sa=function(a){return a||(a=f.currItem),a.initialZoomLevel},Ta=function(a){return a||(a=f.currItem),a.w>0?i.maxSpreadZoom:1}
					,Ua=function(a,b,c,d){return d===f.currItem.initialZoomLevel?(c[a]=f.currItem.initialPosition[a],!0):(c[a]=Ka(a,d),c[a]>b.min[a]?(c[a]=b.min[a],!0):c[a]<b.max[a]?(c[a]=b.max[a],!0):!1)},Va=function(){if(E){var b=N.perspective&&!G;return u="translate"+(b?"3d(":"("),void(v=N.perspective?", 0px)":")")}E="left",e.addClass(a,"pswp--ie"),Ia=function(a,b){b.left=a+"px"},Ha=function(a){var b=a.fitRatio>1?1:a.fitRatio,c=a.container.style,d=b*a.w,e=b*a.h;c.width=d+"px",c.height=e+"px",c.left=a.initialPosition.x+"px",c.top=a.initialPosition.y+"px"},Ga=function(){if(da){var a=da,b=f.currItem,c=b.fitRatio>1?1:b.fitRatio,d=c*b.w,e=c*b.h;a.width=d+"px",a.height=e+"px",a.left=oa.x+"px",a.top=oa.y+"px"}}},Wa=function(a){var b="";i.escKey&&27===a.keyCode?b="close":i.arrowKeys&&(37===a.keyCode?b="prev":39===a.keyCode&&(b="next")),b&&(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||(a.preventDefault?a.preventDefault():a.returnValue=!1,f[b]()))},Xa=function(a){a&&(X||W||ea||S)&&(a.preventDefault(),a.stopPropagation())},Ya=function(){f.setScrollOffset(0,e.getScrollY())},Za={},$a=0,_a=function(a){Za[a]&&(Za[a].raf&&I(Za[a].raf),$a--,delete Za[a])},ab=function(a){Za[a]&&_a(a),Za[a]||($a++,Za[a]={})},bb=function(){for(var a in Za)Za.hasOwnProperty(a)&&_a(a)},cb=function(a,b,c,d,e,f,g){var h,i=Da();ab(a);var j=function(){if(Za[a]){if(h=Da()-i,h>=d)return _a(a),f(c),void(g&&g());f((c-b)*e(h/d)+b),Za[a].raf=H(j)}};j()},db={shout:Ca,listen:Ba,viewportSize:pa,options:i,isMainScrollAnimating:function(){return ea},getZoomLevel:function(){return s},getCurrentIndex:function(){return m},isDragging:function(){return U},isZooming:function(){return _},setScrollOffset:function(a,b){ra.x=a,M=ra.y=b,Ca("updateScrollOffset",ra)},applyZoomPan:function(a,b,c,d){oa.x=b,oa.y=c,s=a,Ga(d)},init:function(){if(!j&&!k){var c;f.framework=e,f.template=a,f.bg=e.getChildByClass(a,"pswp__bg"),J=a.className,j=!0,N=e.detectFeatures(),H=N.raf,I=N.caf,E=N.transform,L=N.oldIE,f.scrollWrap=e.getChildByClass(a,"pswp__scroll-wrap"),f.container=e.getChildByClass(f.scrollWrap,"pswp__container"),n=f.container.style,f.itemHolders=y=[{el:f.container.children[0],wrap:0,index:-1},{el:f.container.children[1],wrap:0,index:-1},{el:f.container.children[2],wrap:0,index:-1}],y[0].el.style.display=y[2].el.style.display="none",Va(),r={resize:f.updateSize,scroll:Ya,keydown:Wa,click:Xa};var d=N.isOldIOSPhone||N.isOldAndroid||N.isMobileOpera;for(N.animationName&&N.transform&&!d||(i.showAnimationDuration=i.hideAnimationDuration=0),c=0;c<va.length;c++)f["init"+va[c]]();if(b){var g=f.ui=new b(f,e);g.init()}Ca("firstUpdate"),m=m||i.index||0,(isNaN(m)||0>m||m>=_b())&&(m=0),f.currItem=$b(m),(N.isOldIOSPhone||N.isOldAndroid)&&(ua=!1),a.setAttribute("aria-hidden","false"),i.modal&&(ua?a.style.position="fixed":(a.style.position="absolute",a.style.top=e.getScrollY()+"px")),void 0===M&&(Ca("initialLayout"),M=K=e.getScrollY());var l="pswp--open ";for(i.mainClass&&(l+=i.mainClass+" "),i.showHideOpacity&&(l+="pswp--animate_opacity "),l+=G?"pswp--touch":"pswp--notouch",l+=N.animationName?" pswp--css_animation":"",l+=N.svg?" pswp--svg":"",e.addClass(a,l),f.updateSize(),o=-1,ta=null,c=0;h>c;c++)Ia((c+o)*sa.x,y[c].el.style);L||e.bind(f.scrollWrap,q,f),Ba("initialZoomInEnd",function(){f.setContent(y[0],m-1),f.setContent(y[2],m+1),y[0].el.style.display=y[2].el.style.display="block",i.focus&&a.focus(),Pa()}),f.setContent(y[1],m),f.updateCurrItem(),Ca("afterInit"),ua||(w=setInterval(function(){$a||U||_||s!==f.currItem.initialZoomLevel||f.updateSize()},1e3)),e.addClass(a,"pswp--visible")}},close:function(){j&&(j=!1,k=!0,Ca("close"),Qa(),bc(f.currItem,null,!0,f.destroy))},destroy:function(){Ca("destroy"),Wb&&clearTimeout(Wb),a.setAttribute("aria-hidden","true"),a.className=J,w&&clearInterval(w),e.unbind(f.scrollWrap,q,f),e.unbind(window,"scroll",f),yb(),bb(),Aa=null},panTo:function(a,b,c){c||(a>ca.min.x?a=ca.min.x:a<ca.max.x&&(a=ca.max.x),b>ca.min.y?b=ca.min.y:b<ca.max.y&&(b=ca.max.y)),oa.x=a,oa.y=b,Ga()},handleEvent:function(a){a=a||window.event,r[a.type]&&r[a.type](a)},goTo:function(a){a=za(a);var b=a-m;ta=b,m=a,f.currItem=$b(m),qa-=b,Ja(sa.x*qa),bb(),ea=!1,f.updateCurrItem()},next:function(){f.goTo(m+1)},prev:function(){f.goTo(m-1)},updateCurrZoomItem:function(a){if(a&&Ca("beforeChange",0),y[1].el.children.length){var b=y[1].el.children[0];da=e.hasClass(b,"pswp__zoom-wrap")?b.style:null}else da=null;ca=f.currItem.bounds,t=s=f.currItem.initialZoomLevel,oa.x=ca.center.x,oa.y=ca.center.y,a&&Ca("afterChange")},invalidateCurrItems:function(){x=!0;for(var a=0;h>a;a++)y[a].item&&(y[a].item.needsUpdate=!0)},updateCurrItem:function(a){if(0!==ta){var b,c=Math.abs(ta);if(!(a&&2>c)){f.currItem=$b(m),xa=!1,Ca("beforeChange",ta),c>=h&&(o+=ta+(ta>0?-h:h),c=h);for(var d=0;c>d;d++)ta>0?(b=y.shift(),y[h-1]=b,o++,Ia((o+2)*sa.x,b.el.style),f.setContent(b,m-c+d+1+1)):(b=y.pop(),y.unshift(b),o--,Ia(o*sa.x,b.el.style),f.setContent(b,m+c-d-1-1));if(da&&1===Math.abs(ta)){var e=$b(z);e.initialZoomLevel!==s&&(hc(e,pa),lc(e),Ha(e))}ta=0,f.updateCurrZoomItem(),z=m,Ca("afterChange")}}},updateSize:function(b){if(!ua&&i.modal){var c=e.getScrollY();if(M!==c&&(a.style.top=c+"px",M=c),!b&&wa.x===window.innerWidth&&wa.y===window.innerHeight)return;wa.x=window.innerWidth,wa.y=window.innerHeight,a.style.height=wa.y+"px"}if(pa.x=f.scrollWrap.clientWidth,pa.y=f.scrollWrap.clientHeight,Ya(),sa.x=pa.x+Math.round(pa.x*i.spacing),sa.y=pa.y,Ja(sa.x*qa),Ca("beforeResize"),void 0!==o){for(var d,g,j,k=0;h>k;k++)d=y[k],Ia((k+o)*sa.x,d.el.style),j=m+k-1,i.loop&&_b()>2&&(j=za(j)),g=$b(j),g&&(x||g.needsUpdate||!g.bounds)?(f.cleanSlide(g),f.setContent(d,j),1===k&&(f.currItem=g,f.updateCurrZoomItem(!0)),g.needsUpdate=!1):-1===d.index&&j>=0&&f.setContent(d,j),g&&g.container&&(hc(g,pa),lc(g),Ha(g));x=!1}t=s=f.currItem.initialZoomLevel,ca=f.currItem.bounds,ca&&(oa.x=ca.center.x,oa.y=ca.center.y,Ga(!0)),Ca("resize")},zoomTo:function(a,b,c,d,f){b&&(t=s,tb.x=Math.abs(b.x)-oa.x,tb.y=Math.abs(b.y)-oa.y,La(na,oa));var g=Ra(a,!1),h={};Ua("x",g,h,a),Ua("y",g,h,a);var i=s,j={x:oa.x,y:oa.y};Ma(h);var k=function(b){1===b?(s=a,oa.x=h.x,oa.y=h.y):(s=(a-i)*b+i,oa.x=(h.x-j.x)*b+j.x,oa.y=(h.y-j.y)*b+j.y),f&&f(b),Ga(1===b)};c?cb("customZoomTo",0,1,c,d||e.easing.sine.inOut,k):k(1)}},eb=30,fb=10,gb={},hb={},ib={},jb={},kb={},lb=[],mb={},nb=[],ob={},pb=0,qb=la(),rb=0,sb=la(),tb=la(),ub=la(),vb=function(a,b){return a.x===b.x&&a.y===b.y},wb=function(a,b){return Math.abs(a.x-b.x)<g&&Math.abs(a.y-b.y)<g},xb=function(a,b){return ob.x=Math.abs(a.x-b.x),ob.y=Math.abs(a.y-b.y),Math.sqrt(ob.x*ob.x+ob.y*ob.y)},yb=function(){Y&&(I(Y),Y=null)},zb=function(){U&&(Y=H(zb),Pb())},Ab=function(){return!("fit"===i.scaleMode&&s===f.currItem.initialZoomLevel)},Bb=function(a,b){return a&&a!==document?a.getAttribute("class")&&a.getAttribute("class").indexOf("pswp__scroll-wrap")>-1?!1:b(a)?a:Bb(a.parentNode,b):!1},Cb={},Db=function(a,b){return Cb.prevent=!Bb(a.target,i.isClickableElement),Ca("preventDragEvent",a,b,Cb),Cb.prevent},Eb=function(a,b){return b.x=a.pageX,b.y=a.pageY,b.id=a.identifier,b},Fb=function(a,b,c){c.x=.5*(a.x+b.x),c.y=.5*(a.y+b.y)},Gb=function(a,b,c){if(a-P>50){var d=nb.length>2?nb.shift():{};d.x=b,d.y=c,nb.push(d),P=a}},Hb=function(){var a=oa.y-f.currItem.initialPosition.y;return 1-Math.abs(a/(pa.y/2))},Ib={},Jb={},Kb=[],Lb=function(a){for(;Kb.length>0;)Kb.pop();return F?(ka=0,lb.forEach(function(a){0===ka?Kb[0]=a:1===ka&&(Kb[1]=a),ka++})):a.type.indexOf("touch")>-1?a.touches&&a.touches.length>0&&(Kb[0]=Eb(a.touches[0],Ib),a.touches.length>1&&(Kb[1]=Eb(a.touches[1],Jb))):(Ib.x=a.pageX,Ib.y=a.pageY,Ib.id="",Kb[0]=Ib),Kb},Mb=function(a,b){var c,d,e,g,h=0,j=oa[a]+b[a],k=b[a]>0,l=sb.x+b.x,m=sb.x-mb.x;return c=j>ca.min[a]||j<ca.max[a]?i.panEndFriction:1,j=oa[a]+b[a]*c,!i.allowPanToNext&&s!==f.currItem.initialZoomLevel||(da?"h"!==fa||"x"!==a||W||(k?(j>ca.min[a]&&(c=i.panEndFriction,h=ca.min[a]-j,d=ca.min[a]-na[a]),(0>=d||0>m)&&_b()>1?(g=l,0>m&&l>mb.x&&(g=mb.x)):ca.min.x!==ca.max.x&&(e=j)):(j<ca.max[a]&&(c=i.panEndFriction,h=j-ca.max[a],d=na[a]-ca.max[a]),(0>=d||m>0)&&_b()>1?(g=l,m>0&&l<mb.x&&(g=mb.x)):ca.min.x!==ca.max.x&&(e=j))):g=l,"x"!==a)?void(ea||Z||s>f.currItem.fitRatio&&(oa[a]+=b[a]*c)):(void 0!==g&&(Ja(g,!0),Z=g===mb.x?!1:!0),ca.min.x!==ca.max.x&&(void 0!==e?oa.x=e:Z||(oa.x+=b.x*c)),void 0!==g)},Nb=function(a){if(!("mousedown"===a.type&&a.button>0)){if(Zb)return void a.preventDefault();if(!T||"mousedown"!==a.type){if(Db(a,!0)&&a.preventDefault(),Ca("pointerDown"),F){var b=e.arraySearch(lb,a.pointerId,"id");0>b&&(b=lb.length),lb[b]={x:a.pageX,y:a.pageY,id:a.pointerId}}var c=Lb(a),d=c.length;$=null,bb(),U&&1!==d||(U=ga=!0,e.bind(window,p,f),R=ja=ha=S=Z=X=V=W=!1,fa=null,Ca("firstTouchStart",c),La(na,oa),ma.x=ma.y=0,La(jb,c[0]),La(kb,jb),mb.x=sa.x*qa,nb=[{x:jb.x,y:jb.y}],P=O=Da(),Ra(s,!0),yb(),zb()),!_&&d>1&&!ea&&!Z&&(t=s,W=!1,_=V=!0,ma.y=ma.x=0,La(na,oa),La(gb,c[0]),La(hb,c[1]),Fb(gb,hb,ub),tb.x=Math.abs(ub.x)-oa.x,tb.y=Math.abs(ub.y)-oa.y,aa=ba=xb(gb,hb))}}},Ob=function(a){if(a.preventDefault(),F){var b=e.arraySearch(lb,a.pointerId,"id");if(b>-1){var c=lb[b];c.x=a.pageX,c.y=a.pageY}}if(U){var d=Lb(a);if(fa||X||_)$=d;else if(sb.x!==sa.x*qa)fa="h";else{var f=Math.abs(d[0].x-jb.x)-Math.abs(d[0].y-jb.y);Math.abs(f)>=fb&&(fa=f>0?"h":"v",$=d)}}},Pb=function(){if($){var a=$.length;if(0!==a)if(La(gb,$[0]),ib.x=gb.x-jb.x,ib.y=gb.y-jb.y,_&&a>1){if(jb.x=gb.x,jb.y=gb.y,!ib.x&&!ib.y&&vb($[1],hb))return;La(hb,$[1]),W||(W=!0,Ca("zoomGestureStarted"));var b=xb(gb,hb),c=Ub(b);c>f.currItem.initialZoomLevel+f.currItem.initialZoomLevel/15&&(ja=!0);var d=1,e=Sa(),g=Ta();if(e>c)if(i.pinchToClose&&!ja&&t<=f.currItem.initialZoomLevel){var h=e-c,j=1-h/(e/1.2);Ea(j),Ca("onPinchClose",j),ha=!0}else d=(e-c)/e,d>1&&(d=1),c=e-d*(e/3);else c>g&&(d=(c-g)/(6*e),d>1&&(d=1),c=g+d*e);0>d&&(d=0),aa=b,Fb(gb,hb,qb),ma.x+=qb.x-ub.x,ma.y+=qb.y-ub.y,La(ub,qb),oa.x=Ka("x",c),oa.y=Ka("y",c),R=c>s,s=c,Ga()}else{if(!fa)return;if(ga&&(ga=!1,Math.abs(ib.x)>=fb&&(ib.x-=$[0].x-kb.x),Math.abs(ib.y)>=fb&&(ib.y-=$[0].y-kb.y)),jb.x=gb.x,jb.y=gb.y,0===ib.x&&0===ib.y)return;if("v"===fa&&i.closeOnVerticalDrag&&!Ab()){ma.y+=ib.y,oa.y+=ib.y;var k=Hb();return S=!0,Ca("onVerticalDrag",k),Ea(k),void Ga()}Gb(Da(),gb.x,gb.y),X=!0,ca=f.currItem.bounds;var l=Mb("x",ib);l||(Mb("y",ib),Ma(oa),Ga())}}},Qb=function(a){if(N.isOldAndroid){if(T&&"mouseup"===a.type)return;a.type.indexOf("touch")>-1&&(clearTimeout(T),T=setTimeout(function(){T=0},600))}Ca("pointerUp"),Db(a,!1)&&a.preventDefault();var b;if(F){var c=e.arraySearch(lb,a.pointerId,"id");if(c>-1)if(b=lb.splice(c,1)[0],navigator.pointerEnabled)b.type=a.pointerType||"mouse";else{var d={4:"mouse",2:"touch",3:"pen"};b.type=d[a.pointerType],b.type||(b.type=a.pointerType||"mouse")}}var g,h=Lb(a),j=h.length;if("mouseup"===a.type&&(j=0),2===j)return $=null,!0;1===j&&La(kb,h[0]),0!==j||fa||ea||(b||("mouseup"===a.type?b={x:a.pageX,y:a.pageY,type:"mouse"}:a.changedTouches&&a.changedTouches[0]&&(b={x:a.changedTouches[0].pageX,y:a.changedTouches[0].pageY,type:"touch"})),Ca("touchRelease",a,b));var k=-1;if(0===j&&(U=!1,e.unbind(window,p,f),yb(),_?k=0:-1!==rb&&(k=Da()-rb)),rb=1===j?Da():-1,g=-1!==k&&150>k?"zoom":"swipe",_&&2>j&&(_=!1,1===j&&(g="zoomPointerUp"),Ca("zoomGestureEnded")),$=null,X||W||ea||S)if(bb(),Q||(Q=Rb()),Q.calculateSwipeSpeed("x"),S){var l=Hb();if(l<i.verticalDragRange)f.close();else{var m=oa.y,n=ia;cb("verticalDrag",0,1,300,e.easing.cubic.out,function(a){oa.y=(f.currItem.initialPosition.y-m)*a+m,Ea((1-n)*a+n),Ga()}),Ca("onVerticalDrag",1)}}else{if((Z||ea)&&0===j){var o=Tb(g,Q);if(o)return;g="zoomPointerUp"}if(!ea)return"swipe"!==g?void Vb():void(!Z&&s>f.currItem.fitRatio&&Sb(Q))}},Rb=function(){var a,b,c={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(d){nb.length>1?(a=Da()-P+50,b=nb[nb.length-2][d]):(a=Da()-O,b=kb[d]),c.lastFlickOffset[d]=jb[d]-b,c.lastFlickDist[d]=Math.abs(c.lastFlickOffset[d]),c.lastFlickDist[d]>20?c.lastFlickSpeed[d]=c.lastFlickOffset[d]/a:c.lastFlickSpeed[d]=0,Math.abs(c.lastFlickSpeed[d])<.1&&(c.lastFlickSpeed[d]=0),c.slowDownRatio[d]=.95,c.slowDownRatioReverse[d]=1-c.slowDownRatio[d],c.speedDecelerationRatio[d]=1},calculateOverBoundsAnimOffset:function(a,b){c.backAnimStarted[a]||(oa[a]>ca.min[a]?c.backAnimDestination[a]=ca.min[a]:oa[a]<ca.max[a]&&(c.backAnimDestination[a]=ca.max[a]),void 0!==c.backAnimDestination[a]&&(c.slowDownRatio[a]=.7,c.slowDownRatioReverse[a]=1-c.slowDownRatio[a],c.speedDecelerationRatioAbs[a]<.05&&(c.lastFlickSpeed[a]=0,c.backAnimStarted[a]=!0,cb("bounceZoomPan"+a,oa[a],c.backAnimDestination[a],b||300,e.easing.sine.out,function(b){oa[a]=b,Ga()}))))},calculateAnimOffset:function(a){c.backAnimStarted[a]||(c.speedDecelerationRatio[a]=c.speedDecelerationRatio[a]*(c.slowDownRatio[a]+c.slowDownRatioReverse[a]-c.slowDownRatioReverse[a]*c.timeDiff/10),c.speedDecelerationRatioAbs[a]=Math.abs(c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]),c.distanceOffset[a]=c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]*c.timeDiff,oa[a]+=c.distanceOffset[a])},panAnimLoop:function(){return Za.zoomPan&&(Za.zoomPan.raf=H(c.panAnimLoop),c.now=Da(),c.timeDiff=c.now-c.lastNow,c.lastNow=c.now,c.calculateAnimOffset("x"),c.calculateAnimOffset("y"),Ga(),c.calculateOverBoundsAnimOffset("x"),c.calculateOverBoundsAnimOffset("y"),c.speedDecelerationRatioAbs.x<.05&&c.speedDecelerationRatioAbs.y<.05)?(oa.x=Math.round(oa.x),oa.y=Math.round(oa.y),Ga(),void _a("zoomPan")):void 0}};return c},Sb=function(a){return a.calculateSwipeSpeed("y"),ca=f.currItem.bounds,a.backAnimDestination={},a.backAnimStarted={},Math.abs(a.lastFlickSpeed.x)<=.05&&Math.abs(a.lastFlickSpeed.y)<=.05?(a.speedDecelerationRatioAbs.x=a.speedDecelerationRatioAbs.y=0,a.calculateOverBoundsAnimOffset("x"),a.calculateOverBoundsAnimOffset("y"),!0):(ab("zoomPan"),a.lastNow=Da(),void a.panAnimLoop())},Tb=function(a,b){var c;ea||(pb=m);var d;if("swipe"===a){var g=jb.x-kb.x,h=b.lastFlickDist.x<10;g>eb&&(h||b.lastFlickOffset.x>20)?d=-1:-eb>g&&(h||b.lastFlickOffset.x<-20)&&(d=1)}var j;d&&(m+=d,0>m?(m=i.loop?_b()-1:0,j=!0):m>=_b()&&(m=i.loop?0:_b()-1,j=!0),(!j||i.loop)&&(ta+=d,qa-=d,c=!0));var k,l=sa.x*qa,n=Math.abs(l-sb.x);return c||l>sb.x==b.lastFlickSpeed.x>0?(k=Math.abs(b.lastFlickSpeed.x)>0?n/Math.abs(b.lastFlickSpeed.x):333,k=Math.min(k,400),k=Math.max(k,250)):k=333,pb===m&&(c=!1),ea=!0,Ca("mainScrollAnimStart"),cb("mainScroll",sb.x,l,k,e.easing.cubic.out,Ja,function(){bb(),ea=!1,pb=-1,(c||pb!==m)&&f.updateCurrItem(),Ca("mainScrollAnimComplete")}),c&&f.updateCurrItem(!0),c},Ub=function(a){return 1/ba*a*t},Vb=function(){var a=s,b=Sa(),c=Ta();b>s?a=b:s>c&&(a=c);var d,g=1,h=ia;return ha&&!R&&!ja&&b>s?(f.close(),!0):(ha&&(d=function(a){Ea((g-h)*a+h)}),f.zoomTo(a,0,200,e.easing.cubic.out,d),!0)};ya("Gestures",{publicMethods:{initGestures:function(){var a=function(a,b,c,d,e){A=a+b,B=a+c,C=a+d,D=e?a+e:""};F=N.pointerEvent,F&&N.touch&&(N.touch=!1),F?navigator.pointerEnabled?a("pointer","down","move","up","cancel"):a("MSPointer","Down","Move","Up","Cancel"):N.touch?(a("touch","start","move","end","cancel"),G=!0):a("mouse","down","move","up"),p=B+" "+C+" "+D,q=A,F&&!G&&(G=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),f.likelyTouchDevice=G,r[A]=Nb,r[B]=Ob,r[C]=Qb,D&&(r[D]=r[C]),N.touch&&(q+=" mousedown",p+=" mousemove mouseup",r.mousedown=r[A],r.mousemove=r[B],r.mouseup=r[C]),G||(i.allowPanToNext=!1)}}});var Wb,Xb,Yb,Zb,$b,_b,ac,bc=function(b,c,d,g){Wb&&clearTimeout(Wb),Zb=!0,Yb=!0;var h;b.initialLayout?(h=b.initialLayout,b.initialLayout=null):h=i.getThumbBoundsFn&&i.getThumbBoundsFn(m);var j=d?i.hideAnimationDuration:i.showAnimationDuration,k=function(){_a("initialZoom"),d?(f.template.removeAttribute("style"),f.bg.removeAttribute("style")):(Ea(1),c&&(c.style.display="block"),e.addClass(a,"pswp--animated-in"),Ca("initialZoom"+(d?"OutEnd":"InEnd"))),g&&g(),Zb=!1};if(!j||!h||void 0===h.x)return Ca("initialZoom"+(d?"Out":"In")),s=b.initialZoomLevel,La(oa,b.initialPosition),Ga(),a.style.opacity=d?0:1,Ea(1),void(j?setTimeout(function(){k()},j):k());var n=function(){var c=l,g=!f.currItem.src||f.currItem.loadError||i.showHideOpacity;b.miniImg&&(b.miniImg.style.webkitBackfaceVisibility="hidden"),d||(s=h.w/b.w,oa.x=h.x,oa.y=h.y-K,f[g?"template":"bg"].style.opacity=.001,Ga()),ab("initialZoom"),d&&!c&&e.removeClass(a,"pswp--animated-in"),g&&(d?e[(c?"remove":"add")+"Class"](a,"pswp--animate_opacity"):setTimeout(function(){e.addClass(a,"pswp--animate_opacity")},30)),Wb=setTimeout(function(){if(Ca("initialZoom"+(d?"Out":"In")),d){var f=h.w/b.w,i={x:oa.x,y:oa.y},l=s,m=ia,n=function(b){1===b?(s=f,oa.x=h.x,oa.y=h.y-M):(s=(f-l)*b+l,oa.x=(h.x-i.x)*b+i.x,oa.y=(h.y-M-i.y)*b+i.y),Ga(),g?a.style.opacity=1-b:Ea(m-b*m)};c?cb("initialZoom",0,1,j,e.easing.cubic.out,n,k):(n(1),Wb=setTimeout(k,j+20))}else s=b.initialZoomLevel,La(oa,b.initialPosition),Ga(),Ea(1),g?a.style.opacity=1:Ea(1),Wb=setTimeout(k,j+20)},d?25:90)};n()},cc={},dc=[],ec={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Xb.length}},fc=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},gc=function(a,b,c){var d=a.bounds;d.center.x=Math.round((cc.x-b)/2),d.center.y=Math.round((cc.y-c)/2)+a.vGap.top,d.max.x=b>cc.x?Math.round(cc.x-b):d.center.x,d.max.y=c>cc.y?Math.round(cc.y-c)+a.vGap.top:d.center.y,d.min.x=b>cc.x?0:d.center.x,d.min.y=c>cc.y?a.vGap.top:d.center.y},hc=function(a,b,c){if(a.src&&!a.loadError){var d=!c;if(d&&(a.vGap||(a.vGap={top:0,bottom:0}),Ca("parseVerticalMargin",a)),cc.x=b.x,cc.y=b.y-a.vGap.top-a.vGap.bottom,d){var e=cc.x/a.w,f=cc.y/a.h;a.fitRatio=f>e?e:f;var g=i.scaleMode;"orig"===g?c=1:"fit"===g&&(c=a.fitRatio),c>1&&(c=1),a.initialZoomLevel=c,a.bounds||(a.bounds=fc())}if(!c)return;return gc(a,a.w*c,a.h*c),d&&c===a.initialZoomLevel&&(a.initialPosition=a.bounds.center),a.bounds}return a.w=a.h=0,a.initialZoomLevel=a.fitRatio=1,a.bounds=fc(),a.initialPosition=a.bounds.center,a.bounds},ic=function(a,b,c,d,e,g){b.loadError||d&&(b.imageAppended=!0,lc(b,d,b===f.currItem&&xa),c.appendChild(d),g&&setTimeout(function(){b&&b.loaded&&b.placeholder&&(b.placeholder.style.display="none",b.placeholder=null)},500))},jc=function(a){a.loading=!0,a.loaded=!1;var b=a.img=e.createEl("pswp__img","img"),c=function(){a.loading=!1,a.loaded=!0,a.loadComplete?a.loadComplete(a):a.img=null,b.onload=b.onerror=null,b=null};return b.onload=c,b.onerror=function(){a.loadError=!0,c()},b.src=a.src,b},kc=function(a,b){return a.src&&a.loadError&&a.container?(b&&(a.container.innerHTML=""),a.container.innerHTML=i.errorMsg.replace("%url%",a.src),!0):void 0},lc=function(a,b,c){if(a.src){b||(b=a.container.lastChild);var d=c?a.w:Math.round(a.w*a.fitRatio),e=c?a.h:Math.round(a.h*a.fitRatio);a.placeholder&&!a.loaded&&(a.placeholder.style.width=d+"px",a.placeholder.style.height=e+"px"),b.style.width=d+"px",b.style.height=e+"px"}},mc=function(){if(dc.length){for(var a,b=0;b<dc.length;b++)a=dc[b],a.holder.index===a.index&&ic(a.index,a.item,a.baseDiv,a.img,!1,a.clearPlaceholder);dc=[]}};ya("Controller",{publicMethods:{lazyLoadItem:function(a){a=za(a);var b=$b(a);b&&(!b.loaded&&!b.loading||x)&&(Ca("gettingData",a,b),b.src&&jc(b))},initController:function(){e.extend(i,ec,!0),f.items=Xb=c,$b=f.getItemAt,_b=i.getNumItemsFn,ac=i.loop,_b()<3&&(i.loop=!1),Ba("beforeChange",function(a){var b,c=i.preload,d=null===a?!0:a>=0,e=Math.min(c[0],_b()),g=Math.min(c[1],_b());for(b=1;(d?g:e)>=b;b++)f.lazyLoadItem(m+b);for(b=1;(d?e:g)>=b;b++)f.lazyLoadItem(m-b)}),Ba("initialLayout",function(){f.currItem.initialLayout=i.getThumbBoundsFn&&i.getThumbBoundsFn(m)}),Ba("mainScrollAnimComplete",mc),Ba("initialZoomInEnd",mc),Ba("destroy",function(){for(var a,b=0;b<Xb.length;b++)a=Xb[b],a.container&&(a.container=null),a.placeholder&&(a.placeholder=null),a.img&&(a.img=null),a.preloader&&(a.preloader=null),a.loadError&&(a.loaded=a.loadError=!1);dc=null})},getItemAt:function(a){return a>=0&&void 0!==Xb[a]?Xb[a]:!1},allowProgressiveImg:function(){return i.forceProgressiveLoading||!G||i.mouseUsed||screen.width>1200},setContent:function(a,b){i.loop&&(b=za(b));var c=f.getItemAt(a.index);c&&(c.container=null);var d,g=f.getItemAt(b);if(!g)return void(a.el.innerHTML="");Ca("gettingData",b,g),a.index=b,a.item=g;var h=g.container=e.createEl("pswp__zoom-wrap");if(!g.src&&g.html&&(g.html.tagName?h.appendChild(g.html):h.innerHTML=g.html),kc(g),hc(g,pa),!g.src||g.loadError||g.loaded)g.src&&!g.loadError&&(d=e.createEl("pswp__img","img"),d.style.opacity=1,d.src=g.src,lc(g,d),ic(b,g,h,d,!0));else{if(g.loadComplete=function(c){if(j){if(a&&a.index===b){if(kc(c,!0))return c.loadComplete=c.img=null,hc(c,pa),Ha(c),void(a.index===m&&f.updateCurrZoomItem());c.imageAppended?!Zb&&c.placeholder&&(c.placeholder.style.display="none",c.placeholder=null):N.transform&&(ea||Zb)?dc.push({item:c,baseDiv:h,img:c.img,index:b,holder:a,clearPlaceholder:!0}):ic(b,c,h,c.img,ea||Zb,!0)}c.loadComplete=null,c.img=null,Ca("imageLoadComplete",b,c)}},e.features.transform){var k="pswp__img pswp__img--placeholder";k+=g.msrc?"":" pswp__img--placeholder--blank";var l=e.createEl(k,g.msrc?"img":"");g.msrc&&(l.src=g.msrc),lc(g,l),h.appendChild(l),g.placeholder=l}g.loading||jc(g),f.allowProgressiveImg()&&(!Yb&&N.transform?dc.push({item:g,baseDiv:h,img:g.img,index:b,holder:a}):ic(b,g,h,g.img,!0,!0))}Yb||b!==m?Ha(g):(da=h.style,bc(g,d||g.img)),a.el.innerHTML="",a.el.appendChild(h)},cleanSlide:function(a){a.img&&(a.img.onload=a.img.onerror=null),a.loaded=a.loading=a.img=a.imageAppended=!1}}});var nc,oc={},pc=function(a,b,c){var d=document.createEvent("CustomEvent"),e={origEvent:a,target:a.target,releasePoint:b,pointerType:c||"touch"};d.initCustomEvent("pswpTap",!0,!0,e),a.target.dispatchEvent(d)};ya("Tap",{publicMethods:{initTap:function(){Ba("firstTouchStart",f.onTapStart),Ba("touchRelease",f.onTapRelease),Ba("destroy",function(){oc={},nc=null})},onTapStart:function(a){a.length>1&&(clearTimeout(nc),nc=null)},onTapRelease:function(a,b){if(b&&!X&&!V&&!$a){var c=b;if(nc&&(clearTimeout(nc),nc=null,wb(c,oc)))return void Ca("doubleTap",c);if("mouse"===b.type)return void pc(a,b,"mouse");var d=a.target.tagName.toUpperCase();if("BUTTON"===d||e.hasClass(a.target,"pswp__single-tap"))return void pc(a,b);La(oc,c),nc=setTimeout(function(){pc(a,b),nc=null},300)}}}});var qc;ya("DesktopZoom",{publicMethods:{initDesktopZoom:function(){L||(G?Ba("mouseUsed",function(){f.setupDesktopZoom()}):f.setupDesktopZoom(!0))},setupDesktopZoom:function(b){qc={};var c="wheel mousewheel DOMMouseScroll";Ba("bindEvents",function(){e.bind(a,c,f.handleMouseWheel)}),Ba("unbindEvents",function(){qc&&e.unbind(a,c,f.handleMouseWheel)}),f.mouseZoomedIn=!1;var d,g=function(){f.mouseZoomedIn&&(e.removeClass(a,"pswp--zoomed-in"),f.mouseZoomedIn=!1),1>s?e.addClass(a,"pswp--zoom-allowed"):e.removeClass(a,"pswp--zoom-allowed"),h()},h=function(){d&&(e.removeClass(a,"pswp--dragging"),d=!1)};Ba("resize",g),Ba("afterChange",g),Ba("pointerDown",function(){f.mouseZoomedIn&&(d=!0,e.addClass(a,"pswp--dragging"))}),Ba("pointerUp",h),b||g()},handleMouseWheel:function(a){if(s<=f.currItem.fitRatio)return i.modal&&(!i.closeOnScroll||$a||U?a.preventDefault():E&&Math.abs(a.deltaY)>2&&(l=!0,f.close())),!0;if(a.stopPropagation(),qc.x=0,"deltaX"in a)1===a.deltaMode?(qc.x=18*a.deltaX,qc.y=18*a.deltaY):(qc.x=a.deltaX,qc.y=a.deltaY);else if("wheelDelta"in a)a.wheelDeltaX&&(qc.x=-.16*a.wheelDeltaX),a.wheelDeltaY?qc.y=-.16*a.wheelDeltaY:qc.y=-.16*a.wheelDelta;else{if(!("detail"in a))return;qc.y=a.detail}Ra(s,!0);var b=oa.x-qc.x,c=oa.y-qc.y;(i.modal||b<=ca.min.x&&b>=ca.max.x&&c<=ca.min.y&&c>=ca.max.y)&&a.preventDefault(),f.panTo(b,c)},toggleDesktopZoom:function(b){b=b||{x:pa.x/2+ra.x,y:pa.y/2+ra.y};var c=i.getDoubleTapZoom(!0,f.currItem),d=s===c;f.mouseZoomedIn=!d,f.zoomTo(d?f.currItem.initialZoomLevel:c,b,333),e[(d?"remove":"add")+"Class"](a,"pswp--zoomed-in")}}});var rc,sc,tc,uc,vc,wc,xc,yc,zc,Ac,Bc,Cc,Dc={history:!0,galleryUID:1},Ec=function(){return Bc.hash.substring(1)},Fc=function(){rc&&clearTimeout(rc),tc&&clearTimeout(tc)},Gc=function(){var a=Ec(),b={};if(a.length<5)return b;var c,d=a.split("&");for(c=0;c<d.length;c++)if(d[c]){var e=d[c].split("=");e.length<2||(b[e[0]]=e[1])}if(i.galleryPIDs){var f=b.pid;for(b.pid=0,c=0;c<Xb.length;c++)if(Xb[c].pid===f){b.pid=c;break}}else b.pid=parseInt(b.pid,10)-1;return b.pid<0&&(b.pid=0),b},Hc=function(){if(tc&&clearTimeout(tc),$a||U)return void(tc=setTimeout(Hc,500));uc?clearTimeout(sc):uc=!0;var a=m+1,b=$b(m);b.hasOwnProperty("pid")&&(a=b.pid);var c=xc+"&gid="+i.galleryUID+"&pid="+a;yc||-1===Bc.hash.indexOf(c)&&(Ac=!0);var d=Bc.href.split("#")[0]+"#"+c;Cc?"#"+c!==window.location.hash&&history[yc?"replaceState":"pushState"]("",document.title,d):yc?Bc.replace(d):Bc.hash=c,yc=!0,sc=setTimeout(function(){uc=!1},60)};ya("History",{publicMethods:{initHistory:function(){if(e.extend(i,Dc,!0),i.history){Bc=window.location,Ac=!1,zc=!1,yc=!1,xc=Ec(),Cc="pushState"in history,xc.indexOf("gid=")>-1&&(xc=xc.split("&gid=")[0],xc=xc.split("?gid=")[0]),Ba("afterChange",f.updateURL),Ba("unbindEvents",function(){e.unbind(window,"hashchange",f.onHashChange)});var a=function(){wc=!0,zc||(Ac?history.back():xc?Bc.hash=xc:Cc?history.pushState("",document.title,Bc.pathname+Bc.search):Bc.hash=""),Fc()};Ba("unbindEvents",function(){l&&a()}),Ba("destroy",function(){wc||a()}),Ba("firstUpdate",function(){m=Gc().pid});var b=xc.indexOf("pid=");b>-1&&(xc=xc.substring(0,b),"&"===xc.slice(-1)&&(xc=xc.slice(0,-1))),setTimeout(function(){j&&e.bind(window,"hashchange",f.onHashChange)},40)}},onHashChange:function(){return Ec()===xc?(zc=!0,void f.close()):void(uc||(vc=!0,f.goTo(Gc().pid),vc=!1))},updateURL:function(){Fc(),vc||(yc?rc=setTimeout(Hc,800):Hc())}}}),e.extend(f,db)};return a});
					
/* base 3 */
!function(a,b){ "function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipeUI_Default=b()}(this,function(){"use strict";var a=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=this,w=!1,x=!0,y=!0,z={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(a,b){return a.title?(b.children[0].innerHTML=a.title,!0):(b.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return a.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return a.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},A=function(a){if(r)return!0;a=a||window.event,q.timeToIdle&&q.mouseUsed&&!k&&K();for(var c,d,e=a.target||a.srcElement,f=e.getAttribute("class")||"",g=0;g<S.length;g++)c=S[g],c.onTap&&f.indexOf("pswp__"+c.name)>-1&&(c.onTap(),d=!0);if(d){a.stopPropagation&&a.stopPropagation(),r=!0;var h=b.features.isOldAndroid?600:30;s=setTimeout(function(){r=!1},h)}},B=function(){return!a.likelyTouchDevice||q.mouseUsed||screen.width>q.fitControlsWidth},C=function(a,c,d){b[(d?"add":"remove")+"Class"](a,"pswp__"+c)},D=function(){var a=1===q.getNumItemsFn();a!==p&&(C(d,"ui--one-slide",a),p=a)},E=function(){C(i,"share-modal--hidden",y)},F=function(){return y=!y,y?(b.removeClass(i,"pswp__share-modal--fade-in"),setTimeout(function(){y&&E()},300)):(E(),setTimeout(function(){y||b.addClass(i,"pswp__share-modal--fade-in")},30)),y||H(),!1},G=function(b){b=b||window.event;var c=b.target||b.srcElement;return a.shout("shareLinkClick",b,c),c.href?c.hasAttribute("download")?!0:(window.open(c.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),y||F(),!1):!1},H=function(){for(var a,b,c,d,e,f="",g=0;g<q.shareButtons.length;g++)a=q.shareButtons[g],c=q.getImageURLForShare(a),d=q.getPageURLForShare(a),e=q.getTextForShare(a),b=a.url.replace("{{url}}",encodeURIComponent(d)).replace("{{image_url}}",encodeURIComponent(c)).replace("{{raw_image_url}}",c).replace("{{text}}",encodeURIComponent(e)),f+='<a href="'+b+'" target="_blank" class="pswp__share--'+a.id+'"'+(a.download?"download":"")+">"+a.label+"</a>",q.parseShareButtonOut&&(f=q.parseShareButtonOut(a,f));i.children[0].innerHTML=f,i.children[0].onclick=G},I=function(a){for(var c=0;c<q.closeElClasses.length;c++)if(b.hasClass(a,"pswp__"+q.closeElClasses[c]))return!0},J=0,K=function(){clearTimeout(u),J=0,k&&v.setIdle(!1)},L=function(a){a=a?a:window.event;var b=a.relatedTarget||a.toElement;b&&"HTML"!==b.nodeName||(clearTimeout(u),u=setTimeout(function(){v.setIdle(!0)},q.timeToIdleOutside))},M=function(){q.fullscreenEl&&!b.features.isOldAndroid&&(c||(c=v.getFullscreenAPI()),c?(b.bind(document,c.eventK,v.updateFullscreen),v.updateFullscreen(),b.addClass(a.template,"pswp--supports-fs")):b.removeClass(a.template,"pswp--supports-fs"))},N=function(){q.preloaderEl&&(O(!0),l("beforeChange",function(){clearTimeout(o),o=setTimeout(function(){a.currItem&&a.currItem.loading?(!a.allowProgressiveImg()||a.currItem.img&&!a.currItem.img.naturalWidth)&&O(!1):O(!0)},q.loadingIndicatorDelay)}),l("imageLoadComplete",function(b,c){a.currItem===c&&O(!0)}))},O=function(a){n!==a&&(C(m,"preloader--active",!a),n=a)},P=function(a){var c=a.vGap;if(B()){var g=q.barsSize;if(q.captionEl&&"auto"===g.bottom)if(f||(f=b.createEl("pswp__caption pswp__caption--fake"),f.appendChild(b.createEl("pswp__caption__center")),d.insertBefore(f,e),b.addClass(d,"pswp__ui--fit")),q.addCaptionHTMLFn(a,f,!0)){var h=f.clientHeight;c.bottom=parseInt(h,10)||44}else c.bottom=g.top;else c.bottom="auto"===g.bottom?0:g.bottom;c.top=g.top}else c.top=c.bottom=0},Q=function(){q.timeToIdle&&l("mouseUsed",function(){b.bind(document,"mousemove",K),b.bind(document,"mouseout",L),t=setInterval(function(){J++,2===J&&v.setIdle(!0)},q.timeToIdle/2)})},R=function(){l("onVerticalDrag",function(a){x&&.95>a?v.hideControls():!x&&a>=.95&&v.showControls()});var a;l("onPinchClose",function(b){x&&.9>b?(v.hideControls(),a=!0):a&&!x&&b>.9&&v.showControls()}),l("zoomGestureEnded",function(){a=!1,a&&!x&&v.showControls()})},S=[{name:"caption",option:"captionEl",onInit:function(a){e=a}},{name:"share-modal",option:"shareEl",onInit:function(a){i=a},onTap:function(){F()}},{name:"button--share",option:"shareEl",onInit:function(a){h=a},onTap:function(){F()}},{name:"button--zoom",option:"zoomEl",onTap:a.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(a){g=a}},{name:"button--close",option:"closeEl",onTap:a.close},{name:"button--arrow--left",option:"arrowEl",onTap:a.prev},{name:"button--arrow--right",option:"arrowEl",onTap:a.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){c.isFullscreen()?c.exit():c.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(a){m=a}}],T=function(){var a,c,e,f=function(d){if(d)for(var f=d.length,g=0;f>g;g++){a=d[g],c=a.className;for(var h=0;h<S.length;h++)e=S[h],c.indexOf("pswp__"+e.name)>-1&&(q[e.option]?(b.removeClass(a,"pswp__element--disabled"),e.onInit&&e.onInit(a)):b.addClass(a,"pswp__element--disabled"))}};f(d.children);var g=b.getChildByClass(d,"pswp__top-bar");g&&f(g.children)};v.init=function(){b.extend(a.options,z,!0),q=a.options,d=b.getChildByClass(a.scrollWrap,"pswp__ui"),l=a.listen,R(),l("beforeChange",v.update),l("doubleTap",function(b){var c=a.currItem.initialZoomLevel;a.getZoomLevel()!==c?a.zoomTo(c,b,333):a.zoomTo(q.getDoubleTapZoom(!1,a.currItem),b,333)}),l("preventDragEvent",function(a,b,c){var d=a.target||a.srcElement;d&&d.getAttribute("class")&&a.type.indexOf("mouse")>-1&&(d.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(d.tagName))&&(c.prevent=!1)}),l("bindEvents",function(){b.bind(d,"pswpTap click",A),b.bind(a.scrollWrap,"pswpTap",v.onGlobalTap),a.likelyTouchDevice||b.bind(a.scrollWrap,"mouseover",v.onMouseOver)}),l("unbindEvents",function(){y||F(),t&&clearInterval(t),b.unbind(document,"mouseout",L),b.unbind(document,"mousemove",K),b.unbind(d,"pswpTap click",A),b.unbind(a.scrollWrap,"pswpTap",v.onGlobalTap),b.unbind(a.scrollWrap,"mouseover",v.onMouseOver),c&&(b.unbind(document,c.eventK,v.updateFullscreen),c.isFullscreen()&&(q.hideAnimationDuration=0,c.exit()),c=null)}),l("destroy",function(){q.captionEl&&(f&&d.removeChild(f),b.removeClass(e,"pswp__caption--empty")),i&&(i.children[0].onclick=null),b.removeClass(d,"pswp__ui--over-close"),b.addClass(d,"pswp__ui--hidden"),v.setIdle(!1)}),q.showAnimationDuration||b.removeClass(d,"pswp__ui--hidden"),l("initialZoomIn",function(){q.showAnimationDuration&&b.removeClass(d,"pswp__ui--hidden")}),l("initialZoomOut",function(){b.addClass(d,"pswp__ui--hidden")}),l("parseVerticalMargin",P),T(),q.shareEl&&h&&i&&(y=!0),D(),Q(),M(),N()},v.setIdle=function(a){k=a,C(d,"ui--idle",a)},v.update=function(){x&&a.currItem?(v.updateIndexIndicator(),q.captionEl&&(q.addCaptionHTMLFn(a.currItem,e),C(e,"caption--empty",!a.currItem.title)),w=!0):w=!1,y||F(),D()},v.updateFullscreen=function(d){d&&setTimeout(function(){a.setScrollOffset(0,b.getScrollY())},50),b[(c.isFullscreen()?"add":"remove")+"Class"](a.template,"pswp--fs")},v.updateIndexIndicator=function(){q.counterEl&&(g.innerHTML=a.getCurrentIndex()+1+q.indexIndicatorSep+q.getNumItemsFn())},v.onGlobalTap=function(c){c=c||window.event;var d=c.target||c.srcElement;if(!r)if(c.detail&&"mouse"===c.detail.pointerType){if(I(d))return void a.close();b.hasClass(d,"pswp__img")&&(1===a.getZoomLevel()&&a.getZoomLevel()<=a.currItem.fitRatio?q.clickToCloseNonZoomable&&a.close():a.toggleDesktopZoom(c.detail.releasePoint))}else if(q.tapToToggleControls&&(x?v.hideControls():v.showControls()),q.tapToClose&&(b.hasClass(d,"pswp__img")||I(d)))return void a.close()},v.onMouseOver=function(a){a=a||window.event;var b=a.target||a.srcElement;C(d,"ui--over-close",I(b))},v.hideControls=function(){b.addClass(d,"pswp__ui--hidden"),x=!1},v.showControls=function(){x=!0,w||v.update(),b.removeClass(d,"pswp__ui--hidden")},v.supportsFullscreen=function(){var a=document;return!!(a.exitFullscreen||a.mozCancelFullScreen||a.webkitExitFullscreen||a.msExitFullscreen)},v.getFullscreenAPI=function(){var b,c=document.documentElement,d="fullscreenchange";return c.requestFullscreen?b={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:d}:c.mozRequestFullScreen?b={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+d}:c.webkitRequestFullscreen?b={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+d}:c.msRequestFullscreen&&(b={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),b&&(b.enter=function(){return j=q.closeOnScroll,q.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?a.template[this.enterK]():void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},b.exit=function(){return q.closeOnScroll=j,document[this.exitK]()},b.isFullscreen=function(){return document[this.elementK]}),b}};return a});


/* base 4 */
/**
*
* UI on top of main sliding area (caption, arrows, close button, etc.).
* Built just using public methods/properties of PhotoSwipe.
* 
*/
(function (root, factory) 
{ 
	if(typeof define === 'function' && define.amd){ define(factory); } 
	else if(typeof exports === 'object'){ module.exports = factory();} 
	else{ root.PhotoSwipeUI_Default = factory(); }
})(this, function () 
{
	'use strict';

var PhotoSwipeUI_Default =
 function(pswp, framework) {

	var ui = this;
	var _overlayUIUpdated = false,
		_controlsVisible = true,
		_fullscrenAPI,
		_controls,
		_captionContainer,
		_fakeCaptionContainer,
		_indexIndicator,
		_shareButton,
		_shareModal,
		_shareModalHidden = true,
		_initalCloseOnScrollValue,
		_isIdle,
		_listen,

		_loadingIndicator,
		_loadingIndicatorHidden,
		_loadingIndicatorTimeout,

		_galleryHasOneSlide,

		_options,
		_defaultUIOptions = {
			barsSize: {top:44, bottom:'auto'},
			closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'], 
			timeToIdle: 4000, 
			timeToIdleOutside: 1000,
			loadingIndicatorDelay: 1000, // 2s
			
			addCaptionHTMLFn: function(item, captionEl /*, isFake */) {
				if(!item.title) {
					captionEl.children[0].innerHTML = '';
					return false;
				}
				captionEl.children[0].innerHTML = item.title;
				return true;
			},

			closeEl:true,
			captionEl: true,
			fullscreenEl: true,
			zoomEl: true,
			shareEl: true,
			counterEl: true,
			arrowEl: true,
			preloaderEl: true,

			tapToClose: false,
			tapToToggleControls: true,

			clickToCloseNonZoomable: true,

			shareButtons: [
				{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
				{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
				{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/'+
													'?url={{url}}&media={{image_url}}&description={{text}}'},
				{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
			],
			getImageURLForShare: function( /* shareButtonData */ ) {
				return pswp.currItem.src || '';
			},
			getPageURLForShare: function( /* shareButtonData */ ) {
				return window.location.href;
			},
			getTextForShare: function( /* shareButtonData */ ) {
				return pswp.currItem.title || '';
			},
				
			indexIndicatorSep: ' / ',
			fitControlsWidth: 1200

		},
		_blockControlsTap,
		_blockControlsTapTimeout;



	var _onControlsTap = function(e) {
			if(_blockControlsTap) {
				return true;
			}


			e = e || window.event;

			if(_options.timeToIdle && _options.mouseUsed && !_isIdle) {
				// reset idle timer
				_onIdleMouseMove();
			}


			var target = e.target || e.srcElement,
				uiElement,
				clickedClass = target.getAttribute('class') || '',
				found;

			for(var i = 0; i < _uiElements.length; i++) {
				uiElement = _uiElements[i];
				if(uiElement.onTap && clickedClass.indexOf('pswp__' + uiElement.name ) > -1 ) {
					uiElement.onTap();
					found = true;

				}
			}

			if(found) {
				if(e.stopPropagation) {
					e.stopPropagation();
				}
				_blockControlsTap = true;

				// Some versions of Android don't prevent ghost click event 
				// when preventDefault() was called on touchstart and/or touchend.
				// 
				// This happens on v4.3, 4.2, 4.1, 
				// older versions strangely work correctly, 
				// but just in case we add delay on all of them)	
				var tapDelay = framework.features.isOldAndroid ? 600 : 30;
				_blockControlsTapTimeout = setTimeout(function() {
					_blockControlsTap = false;
				}, tapDelay);
			}

		},
		_fitControlsInViewport = function() {
			return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
		},
		_togglePswpClass = function(el, cName, add) {
			framework[ (add ? 'add' : 'remove') + 'Class' ](el, 'pswp__' + cName);
		},

		// add class when there is just one item in the gallery
		// (by default it hides left/right arrows and 1ofX counter)
		_countNumItems = function() {
			var hasOneSlide = (_options.getNumItemsFn() === 1);

			if(hasOneSlide !== _galleryHasOneSlide) {
				_togglePswpClass(_controls, 'ui--one-slide', hasOneSlide);
				_galleryHasOneSlide = hasOneSlide;
			}
		},
		_toggleShareModalClass = function() {
			_togglePswpClass(_shareModal, 'share-modal--hidden', _shareModalHidden);
		},
		_toggleShareModal = function() {

			_shareModalHidden = !_shareModalHidden;
			
			
			if(!_shareModalHidden) {
				_toggleShareModalClass();
				setTimeout(function() {
					if(!_shareModalHidden) {
						framework.addClass(_shareModal, 'pswp__share-modal--fade-in');
					}
				}, 30);
			} else {
				framework.removeClass(_shareModal, 'pswp__share-modal--fade-in');
				setTimeout(function() {
					if(_shareModalHidden) {
						_toggleShareModalClass();
					}
				}, 300);
			}
			
			if(!_shareModalHidden) {
				_updateShareURLs();
			}
			return false;
		},

		_openWindowPopup = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			pswp.shout('shareLinkClick', e, target);

			if(!target.href) {
				return false;
			}

			if( target.hasAttribute('download') ) {
				return true;
			}

			window.open(target.href, 'pswp_share', 'scrollbars=yes,resizable=yes,toolbar=no,'+
										'location=yes,width=550,height=420,top=100,left=' + 
										(window.screen ? Math.round(screen.width / 2 - 275) : 100)  );

			if(!_shareModalHidden) {
				_toggleShareModal();
			}
			
			return false;
		},
		_updateShareURLs = function() {
			var shareButtonOut = '',
				shareButtonData,
				shareURL,
				image_url,
				page_url,
				share_text;

			for(var i = 0; i < _options.shareButtons.length; i++) {
				shareButtonData = _options.shareButtons[i];

				image_url = _options.getImageURLForShare(shareButtonData);
				page_url = _options.getPageURLForShare(shareButtonData);
				share_text = _options.getTextForShare(shareButtonData);

				shareURL = shareButtonData.url.replace('{{url}}', encodeURIComponent(page_url) )
									.replace('{{image_url}}', encodeURIComponent(image_url) )
									.replace('{{raw_image_url}}', image_url )
									.replace('{{text}}', encodeURIComponent(share_text) );

				shareButtonOut += '<a href="' + shareURL + '" target="_blank" '+
									'class="pswp__share--' + shareButtonData.id + '"' +
									(shareButtonData.download ? 'download' : '') + '>' + 
									shareButtonData.label + '</a>';

				if(_options.parseShareButtonOut) {
					shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
				}
			}
			_shareModal.children[0].innerHTML = shareButtonOut;
			_shareModal.children[0].onclick = _openWindowPopup;

		},
		_hasCloseClass = function(target) {
			for(var  i = 0; i < _options.closeElClasses.length; i++) {
				if( framework.hasClass(target, 'pswp__' + _options.closeElClasses[i]) ) {
					return true;
				}
			}
		},
		_idleInterval,
		_idleTimer,
		_idleIncrement = 0,
		_onIdleMouseMove = function() {
			clearTimeout(_idleTimer);
			_idleIncrement = 0;
			if(_isIdle) {
				ui.setIdle(false);
			}
		},
		_onMouseLeaveWindow = function(e) {
			e = e ? e : window.event;
			var from = e.relatedTarget || e.toElement;
			if (!from || from.nodeName === 'HTML') {
				clearTimeout(_idleTimer);
				_idleTimer = setTimeout(function() {
					ui.setIdle(true);
				}, _options.timeToIdleOutside);
			}
		},
		_setupFullscreenAPI = function() {
			if(_options.fullscreenEl && !framework.features.isOldAndroid) {
				if(!_fullscrenAPI) {
					_fullscrenAPI = ui.getFullscreenAPI();
				}
				if(_fullscrenAPI) {
					framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
					ui.updateFullscreen();
					framework.addClass(pswp.template, 'pswp--supports-fs');
				} else {
					framework.removeClass(pswp.template, 'pswp--supports-fs');
				}
			}
		},
		_setupLoadingIndicator = function() {
			// Setup loading indicator
			if(_options.preloaderEl) {
			
				_toggleLoadingIndicator(true);

				_listen('beforeChange', function() {

					clearTimeout(_loadingIndicatorTimeout);

					// display loading indicator with delay
					_loadingIndicatorTimeout = setTimeout(function() {

						if(pswp.currItem && pswp.currItem.loading) {

							if( !pswp.allowProgressiveImg() || (pswp.currItem.img && !pswp.currItem.img.naturalWidth)  ) {
								// show preloader if progressive loading is not enabled, 
								// or image width is not defined yet (because of slow connection)
								_toggleLoadingIndicator(false); 
								// items-controller.js function allowProgressiveImg
							}
							
						} else {
							_toggleLoadingIndicator(true); // hide preloader
						}

					}, _options.loadingIndicatorDelay);
					
				});
				_listen('imageLoadComplete', function(index, item) {
					if(pswp.currItem === item) {
						_toggleLoadingIndicator(true);
					}
				});

			}
		},
		_toggleLoadingIndicator = function(hide) {
			if( _loadingIndicatorHidden !== hide ) {
				_togglePswpClass(_loadingIndicator, 'preloader--active', !hide);
				_loadingIndicatorHidden = hide;
			}
		},
		_applyNavBarGaps = function(item) {
			var gap = item.vGap;

			if( _fitControlsInViewport() ) {
				
				var bars = _options.barsSize; 
				if(_options.captionEl && bars.bottom === 'auto') {
					if(!_fakeCaptionContainer) {
						_fakeCaptionContainer = framework.createEl('pswp__caption pswp__caption--fake');
						_fakeCaptionContainer.appendChild( framework.createEl('pswp__caption__center') );
						_controls.insertBefore(_fakeCaptionContainer, _captionContainer);
						framework.addClass(_controls, 'pswp__ui--fit');
					}
					if( _options.addCaptionHTMLFn(item, _fakeCaptionContainer, true) ) {

						var captionSize = _fakeCaptionContainer.clientHeight;
						gap.bottom = parseInt(captionSize,10) || 44;
					} else {
						gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
					}
				} else {
					gap.bottom = bars.bottom === 'auto' ? 0 : bars.bottom;
				}
				
				// height of top bar is static, no need to calculate it
				gap.top = bars.top;
			} else {
				gap.top = gap.bottom = 0;
			}
		},
		_setupIdle = function() {
			// Hide controls when mouse is used
			if(_options.timeToIdle) {
				_listen('mouseUsed', function() {
					
					framework.bind(document, 'mousemove', _onIdleMouseMove);
					framework.bind(document, 'mouseout', _onMouseLeaveWindow);

					_idleInterval = setInterval(function() {
						_idleIncrement++;
						if(_idleIncrement === 2) {
							ui.setIdle(true);
						}
					}, _options.timeToIdle / 2);
				});
			}
		},
		_setupHidingControlsDuringGestures = function() {

			// Hide controls on vertical drag
			_listen('onVerticalDrag', function(now) {
				if(_controlsVisible && now < 0.95) {
					ui.hideControls();
				} else if(!_controlsVisible && now >= 0.95) {
					ui.showControls();
				}
			});

			// Hide controls when pinching to close
			var pinchControlsHidden;
			_listen('onPinchClose' , function(now) {
				if(_controlsVisible && now < 0.9) {
					ui.hideControls();
					pinchControlsHidden = true;
				} else if(pinchControlsHidden && !_controlsVisible && now > 0.9) {
					ui.showControls();
				}
			});

			_listen('zoomGestureEnded', function() {
				pinchControlsHidden = false;
				if(pinchControlsHidden && !_controlsVisible) {
					ui.showControls();
				}
			});

		};



	var _uiElements = [
		{ 
			name: 'caption', 
			option: 'captionEl',
			onInit: function(el) {  
				_captionContainer = el; 
			} 
		},
		{ 
			name: 'share-modal', 
			option: 'shareEl',
			onInit: function(el) {  
				_shareModal = el;
			},
			onTap: function() {
				_toggleShareModal();
			} 
		},
		{ 
			name: 'button--share', 
			option: 'shareEl',
			onInit: function(el) { 
				_shareButton = el;
			},
			onTap: function() {
				_toggleShareModal();
			} 
		},
		{ 
			name: 'button--zoom', 
			option: 'zoomEl',
			onTap: pswp.toggleDesktopZoom
		},
		{ 
			name: 'counter', 
			option: 'counterEl',
			onInit: function(el) {  
				_indexIndicator = el;
			} 
		},
		{ 
			name: 'button--close', 
			option: 'closeEl',
			onTap: pswp.close
		},
		{ 
			name: 'button--arrow--left', 
			option: 'arrowEl',
			onTap: pswp.prev
		},
		{ 
			name: 'button--arrow--right', 
			option: 'arrowEl',
			onTap: pswp.next
		},
		{ 
			name: 'button--fs', 
			option: 'fullscreenEl',
			onTap: function() {  
				if(_fullscrenAPI.isFullscreen()) {
					_fullscrenAPI.exit();
				} else {
					_fullscrenAPI.enter();
				}
			} 
		},
		{ 
			name: 'preloader', 
			option: 'preloaderEl',
			onInit: function(el) {  
				_loadingIndicator = el;
			} 
		}

	];

	var _setupUIElements = function() {
		var item,
			classAttr,
			uiElement;

		var loopThroughChildElements = function(sChildren) {
			if(!sChildren) {
				return;
			}

			var l = sChildren.length;
			for(var i = 0; i < l; i++) {
				item = sChildren[i];
				classAttr = item.className;

				for(var a = 0; a < _uiElements.length; a++) {
					uiElement = _uiElements[a];

					if(classAttr.indexOf('pswp__' + uiElement.name) > -1  ) {

						if( _options[uiElement.option] ) { // if element is not disabled from options
							
							framework.removeClass(item, 'pswp__element--disabled');
							if(uiElement.onInit) {
								uiElement.onInit(item);
							}
							
							//item.style.display = 'block';
						} else {
							framework.addClass(item, 'pswp__element--disabled');
							//item.style.display = 'none';
						}
					}
				}
			}
		};
		loopThroughChildElements(_controls.children);

		var topBar =  framework.getChildByClass(_controls, 'pswp__top-bar');
		if(topBar) {
			loopThroughChildElements( topBar.children );
		}
	};


	

	ui.init = function() {

		// extend options
		framework.extend(pswp.options, _defaultUIOptions, true);

		// create local link for fast access
		_options = pswp.options;

		// find pswp__ui element
		_controls = framework.getChildByClass(pswp.scrollWrap, 'pswp__ui');

		// create local link
		_listen = pswp.listen;


		_setupHidingControlsDuringGestures();

		// update controls when slides change
		_listen('beforeChange', ui.update);

		// toggle zoom on double-tap
		_listen('doubleTap', function(point) {
			var initialZoomLevel = pswp.currItem.initialZoomLevel;
			if(pswp.getZoomLevel() !== initialZoomLevel) {
				pswp.zoomTo(initialZoomLevel, point, 333);
			} else {
				pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
			}
		});

		// Allow text selection in caption
		_listen('preventDragEvent', function(e, isDown, preventObj) {
			var t = e.target || e.srcElement;
			if(
				t && 
				t.getAttribute('class') && e.type.indexOf('mouse') > -1 && 
				( t.getAttribute('class').indexOf('__caption') > 0 || (/(SMALL|STRONG|EM)/i).test(t.tagName) ) 
			) {
				preventObj.prevent = false;
			}
		});

		// bind events for UI
		_listen('bindEvents', function() {
			framework.bind(_controls, 'pswpTap click', _onControlsTap);
			framework.bind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);

			if(!pswp.likelyTouchDevice) {
				framework.bind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
			}
		});

		// unbind events for UI
		_listen('unbindEvents', function() {
			if(!_shareModalHidden) {
				_toggleShareModal();
			}

			if(_idleInterval) {
				clearInterval(_idleInterval);
			}
			framework.unbind(document, 'mouseout', _onMouseLeaveWindow);
			framework.unbind(document, 'mousemove', _onIdleMouseMove);
			framework.unbind(_controls, 'pswpTap click', _onControlsTap);
			framework.unbind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
			framework.unbind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);

			if(_fullscrenAPI) {
				framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
				if(_fullscrenAPI.isFullscreen()) {
					_options.hideAnimationDuration = 0;
					_fullscrenAPI.exit();
				}
				_fullscrenAPI = null;
			}
		});


		// clean up things when gallery is destroyed
		_listen('destroy', function() {
			if(_options.captionEl) {
				if(_fakeCaptionContainer) {
					_controls.removeChild(_fakeCaptionContainer);
				}
				framework.removeClass(_captionContainer, 'pswp__caption--empty');
			}

			if(_shareModal) {
				_shareModal.children[0].onclick = null;
			}
			framework.removeClass(_controls, 'pswp__ui--over-close');
			framework.addClass( _controls, 'pswp__ui--hidden');
			ui.setIdle(false);
		});
		

		if(!_options.showAnimationDuration) {
			framework.removeClass( _controls, 'pswp__ui--hidden');
		}
		_listen('initialZoomIn', function() {
			if(_options.showAnimationDuration) {
				framework.removeClass( _controls, 'pswp__ui--hidden');
			}
		});
		_listen('initialZoomOut', function() {
			framework.addClass( _controls, 'pswp__ui--hidden');
		});

		_listen('parseVerticalMargin', _applyNavBarGaps);
		
		_setupUIElements();

		if(_options.shareEl && _shareButton && _shareModal) {
			_shareModalHidden = true;
		}

		_countNumItems();

		_setupIdle();

		_setupFullscreenAPI();

		_setupLoadingIndicator();
	};

	ui.setIdle = function(isIdle) {
		_isIdle = isIdle;
		_togglePswpClass(_controls, 'ui--idle', isIdle);
	};

	ui.update = function() {
		// Don't update UI if it's hidden
		if(_controlsVisible && pswp.currItem) {
			
			ui.updateIndexIndicator();

			if(_options.captionEl) {
				_options.addCaptionHTMLFn(pswp.currItem, _captionContainer);

				_togglePswpClass(_captionContainer, 'caption--empty', !pswp.currItem.title);
			}

			_overlayUIUpdated = true;

		} else {
			_overlayUIUpdated = false;
		}

		if(!_shareModalHidden) {
			_toggleShareModal();
		}

		_countNumItems();
	};

	ui.updateFullscreen = function(e) {

		if(e) {
			// some browsers change window scroll position during the fullscreen
			// so PhotoSwipe updates it just in case
			setTimeout(function() {
				pswp.setScrollOffset( 0, framework.getScrollY() );
			}, 50);
		}
		
		// toogle pswp--fs class on root element
		framework[ (_fullscrenAPI.isFullscreen() ? 'add' : 'remove') + 'Class' ](pswp.template, 'pswp--fs');
	};

	ui.updateIndexIndicator = function() {
		if(_options.counterEl) {
			_indexIndicator.innerHTML = (pswp.getCurrentIndex()+1) + 
										_options.indexIndicatorSep + 
										_options.getNumItemsFn();
		}
	};
	
	ui.onGlobalTap = function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;

		if(_blockControlsTap) {
			return;
		}

		if(e.detail && e.detail.pointerType === 'mouse') {

			// close gallery if clicked outside of the image
			if(_hasCloseClass(target)) {
				pswp.close();
				return;
			}

			if(framework.hasClass(target, 'pswp__img')) {
				if(pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
					if(_options.clickToCloseNonZoomable) {
						pswp.close();
					}
				} else {
					pswp.toggleDesktopZoom(e.detail.releasePoint);
				}
			}
			
		} else {

			// tap anywhere (except buttons) to toggle visibility of controls
			if(_options.tapToToggleControls) {
				if(_controlsVisible) {
					ui.hideControls();
				} else {
					ui.showControls();
				}
			}

			// tap to close gallery
			if(_options.tapToClose && (framework.hasClass(target, 'pswp__img') || _hasCloseClass(target)) ) {
				pswp.close();
				return;
			}
			
		}
	};
	ui.onMouseOver = function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;

		// add class when mouse is over an element that should close the gallery
		_togglePswpClass(_controls, 'ui--over-close', _hasCloseClass(target));
	};

	ui.hideControls = function() {
		framework.addClass(_controls,'pswp__ui--hidden');
		_controlsVisible = false;
	};

	ui.showControls = function() {
		_controlsVisible = true;
		if(!_overlayUIUpdated) {
			ui.update();
		}
		framework.removeClass(_controls,'pswp__ui--hidden');
	};

	ui.supportsFullscreen = function() {
		var d = document;
		return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
	};

	ui.getFullscreenAPI = function() {
		var dE = document.documentElement,
			api,
			tF = 'fullscreenchange';

		if (dE.requestFullscreen) {
			api = {
				enterK: 'requestFullscreen',
				exitK: 'exitFullscreen',
				elementK: 'fullscreenElement',
				eventK: tF
			};

		} else if(dE.mozRequestFullScreen ) {
			api = {
				enterK: 'mozRequestFullScreen',
				exitK: 'mozCancelFullScreen',
				elementK: 'mozFullScreenElement',
				eventK: 'moz' + tF
			};

			

		} else if(dE.webkitRequestFullscreen) {
			api = {
				enterK: 'webkitRequestFullscreen',
				exitK: 'webkitExitFullscreen',
				elementK: 'webkitFullscreenElement',
				eventK: 'webkit' + tF
			};

		} else if(dE.msRequestFullscreen) {
			api = {
				enterK: 'msRequestFullscreen',
				exitK: 'msExitFullscreen',
				elementK: 'msFullscreenElement',
				eventK: 'MSFullscreenChange'
			};
		}

		if(api) {
			api.enter = function() { 
				// disable close-on-scroll in fullscreen
				_initalCloseOnScrollValue = _options.closeOnScroll; 
				_options.closeOnScroll = false; 

				if(this.enterK === 'webkitRequestFullscreen') {
					pswp.template[this.enterK]( Element.ALLOW_KEYBOARD_INPUT );
				} else {
					return pswp.template[this.enterK](); 
				}
			};
			api.exit = function() { 
				_options.closeOnScroll = _initalCloseOnScrollValue;

				return document[this.exitK](); 

			};
			api.isFullscreen = function() { return document[this.elementK]; };
		}

		return api;
	};



};
return PhotoSwipeUI_Default;


});






