/* Base functions */
//function device_(){windowScreen = ($(window).width()>=800)?"pc":"mobile";}
//var windowScreen = "", dynamicFunc = "", dynamicNestFunc = "", imgA="", imgB="", imgC="", imgD="", mFiles=[]/*, baseURL = window.location.protocol+"//"+window.location.host+"/"*/;

var dynamicFunc = "", dynamicNestFunc = "", imgA="", imgB="", imgC="", imgD="", mFiles=[], uFiles=[], uFiles1=[],uFiles2=[], uFiles3=[], uFiles4=[], uFiles5=[]; /*, baseURL = window.location.protocol+"//"+window.location.host+"/"*/;
var li_a=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','aa','ab','ac','ad','ae','af','ag','ah','ai','aj','ak','al','am','an','ao','ap','aq','ar','as','at','au','av','aw','ax','ay','az'];
$(document).ready(function(e)
{
	setProfilePic();
	//device_(), $(window).resize(function(e){device_();});
	$(".Sidebar_btn").click(function(e){ setSidebar(); });
});

function device(){ return ($(window).width()>=800)?"pc":"mobile"; }


function getDate_ipt()
{
	var date = new Date();
    var datestring = ('0000' + date.getFullYear()).slice(-4) + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);// + 'T'+  ('00' +  date.getHours()).slice(-2) + ':'+ ('00' + date.getMinutes()).slice(-2) +'Z';
    return datestring;
}
function getDate_string(prop)
{
	var sh = Object.fromEntries(Object.entries({date:true,time:false,format:"24",src:"",input_type:"date",input_default_time:""}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

	var today = new Date(); var tmpDate="", tmpTime= "";
	if(sh.src=="input")
	{ 
		tmpDate= ('0000'+today.getFullYear()).slice(-4)+"-"+('00'+(today.getMonth() + 1)).slice(-2)+"-"+('00' + today.getDate()).slice(-2); 
		if(sh.input_type=="datetime")
		{
			//tmpTime= (sh.input_default_time=="")?(('00'+today.getHours()).slice(-2)+':'+('00' + today.getMinutes()).slice(-2)):sh.input_default_time;
			tmpTime= (sh.input_default_time=="")?(('00'+today.getHours()).slice(-2)+':'+('00' + today.getMinutes()).slice(-2)):sh.input_default_time;
			return tmpDate+"T"+tmpTime;
		}
	}
	else
	{ 
		tmpDate= ('00'+(today.getMonth() + 1)).slice(-2)+"-"+('00' + today.getDate()).slice(-2)+"-"+('0000'+today.getFullYear()).slice(-4); 
		tmpTime= ('00'+today.getHours()).slice(-2)+':'+('00' + today.getMinutes()).slice(-2);
	
		var tmpHour= today.getHours(), tmpP=" am";
		if(sh.format=="12")
		{ 
			var tmpCHour= today.getHours();
			if(tmpHour > 12){ tmpP=" pm"; tmpCHour -= 12; }
			tmpTime = ('00'+tmpCHour).slice(-2)+":"+('00' + today.getMinutes()).slice(-2)+tmpP;
		}
	}	
	var tmpResult = ((sh.date)?tmpDate:"")+((sh.time)?" "+tmpTime:"");

	return tmpResult;
}
function DatetoString(date){var conTime = new Date(date).toUTCString().replace(/\s*(GMT|UTC)$/, "").slice(0, -9);	return conTime;}
function fromDbDate(d)
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
function toDecimal(s)
{ 
	s = s.toString();
	var tmpCur_val = (s)?((s==".")?"0":s):"", toCur_val="0.00";	
	if(s){ tmpCur_val = tmpCur_val.replace(/,/g,""); toCur_val = parseFloat(tmpCur_val).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");	}
	return toCur_val;	
}
function removeString(i){ return (i)?i.replace(/[^0-9\.]+/g, ""):""; }
function toThousand(x){ return ((x)?x:0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function random_(){return Math.random().toString(36).substr(0, 6);}
function percentage_(a,b)
{
	a=(a)?a:0; b=(b)?b:0;
	var tmpPercent= (a>0 && b>0)?((a*100) / b).toFixed(2):"0";
	//var tmpPercent= ((a / b) * 100).toFixed(2);	alert(a);
	return tmpPercent;
}
function randomString(a)
{
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", length = (a)?a:6, result="";
	for (var i=0; i<length; i++){ var rnum = Math.floor(Math.random() * chars.length); result += chars.substring(rnum,rnum+1); }
	return result;
}
var shuffle_ = function(min,max,size)
{
	var arr=[];
	for(var i=0;i<max;i++)
	{
		var x = Math.floor(Math.random() * max) + min ;
		if(arr.includes(x) == true){ i -= 1; }
		else{ if(x>max==false){ arr.push(x); } }
	}
	return arr;
}
function getCredString(){ return randomString(25); }
function setProfilePic()
{
	//var subp = (document.location.pathname.split(/\/(?=.)/).length == 3)?"../":"";
	$.post(host+'account/model/tbl.profile.php',{tmpCode:"27",token:"0",fb:"22",ft:"0-0-2"},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{ 
			if(v.index){	$(".iProfile_pic").attr("src",v.src+"?"+random_());	}
			if(v.count && v.count == "0"){	$(".iProfile_pic").attr("src",host+"images/files/blank_profile.png"+"?"+random_());	}	
		});	
	},"json").done(function(e){}).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	$(".iProfile_pic").attr("src",host+"images/files/loading/loading-c-l.gif");
}
/* New Updates */
function setSidebar(e){	$.ajax({url:host+'account/model/tbl.profile.php',type:"post", data:{tmpCode:"27",token:"0",fb:"22",ft:"0-0-1",sidebar:($(".Sidebar_chk").prop("checked"))?"0":"1"},success:function(data){ if(data != "1"){ alert(data); /*alert_("Sidebar error in: "+data+"<br/>","Error Message");*/ } }	});		}

/* New Updates end */


/* new code j1 */
function setUrlParam(par)
{
	if(par)
	{
		var tUri= document.location.href; var uri_= tUri.split('?');
	 	var params_="", page_= uri_[0]; var uri_par= uri_[1].split('&');

	 	for(var i in uri_par)
	 	{
	 		if(i==0){ page_+= "?"+uri_par[i]; }
	 		else
	 		{
	 			var ox= uri_par[i].split("="); var nval = ox[1];
	 			Object.keys(par).forEach(function(key){ if(ox[0]==key){ nval = par[key]; } });
	 			params_ += "&"+ox[0]+"="+nval;
	 		}
	 	}
	 	/*console.log(page_); console.log(params_);*/
	 	window.history.pushState('object or string', 'Title', page_+params_);
	}	
}
/* new code j1 end */
function urlParams(url)
{
	var result = "", v_arr = url.split('&');
	for(var i=0; i<v_arr.length; i++){ if(i>0){ result += "&"+v_arr[i]; } }
	return result;
}
function setUrlParams(a)
{
	if(a.toLowerCase()=="reset"){	window.history.pushState('object or string', 'Title', window.location.href.split("&")[0]);	}
	else{	window.history.pushState('object or string', 'Title', window.location.href.split("&")[0]+a);						}
}
function UrlParam(a,b)		
{
	if(a.toLowerCase()=="reset"){ window.history.pushState('object or string', 'Title', window.location.href.split("&")[0]);	}
	else{ window.history.pushState('object or string', 'Title', window.location.href.split("&")[0]+"&"+a+"="+b);		}
	
}
/* Base functions end here */


/* Navigation */
$(document).ready(function(e)
{
	$(".navbar").each(function(e){ $(this).attr("href",$(this).attr("href").split("#")[0]); });
	$(".NavDetails").hover(function(e){	if($(".Sidebar_chk").prop("checked")){	$(this).find(".SubNbar_fr").css("top",$(this).offset().top);	}	});
	$(".navbar").click(function(e)		
	{	
		if($(this).hasClass("logout")==false)
		{	
			for(var i=0;i<dSrc.length;i++){ $('script[src="'+dSrc[i]+'"]').remove(); }
			setActivePage($(this).attr("href").split("#")[0]);
			
			$(".navSub_chk").prop("checked",false);
			$(this).parents(".NavDetails").find(".navSub_chk").prop("checked",true);			

			if(device()=="mobile")
			{
				$(".SidebarM_chk").prop("checked",false);
			}	
			e.preventDefault();return false;		
		}		
	});
});
window.onpopstate = function(e){ if(location.search){ setActivePage(location.search,"back"); } /*setActivePage(location.search.split("&")[0]+".php"); //alert(location.search);*/ }
function logout(){	dynamicFunc=function(){window.location.replace("../../login/");dynamicFunc="";}; alert_("Please re-login to renew your session.","Session Expired",dynamicFunc);	}
function setActivePage(a,b,p)
{	
	if(a)
	{	
		$(".pPanel_bg, .popPanel_bg, .jGallery_panel, .gUp_btn").remove(); 
		var tURL = ((a.charAt(0)=="?")?"":"?")+a.split('&')[0]+((a.split('&')[0].substring(a.split('&')[0].length - 4)==".php")?"":".php");
		$.ajax({url:tURL.substr(1,tURL.length),cache:false,success:function(html){$(".pageLoaded").empty();$('.pageLoaded').append(html);},complete: function(e)
		{	
			resetDefault(); global_events(); $(".pageLoading").remove();			
			var nURL= tURL.substring(0, tURL.length - 4)+((!p)?"":"&"+p);
			
			if(!b){window.history.pushState('object or string', 'Title', nURL+urlParams(a));}
			$(".navbar, .navbarLbl").removeClass("actNavbar"),
			$(".navbar").each(function(e)
			{	
				if(tURL==$(this).attr("href").split("&")[0].split("#")[0])
				{ 
					$(this).addClass("actNavbar"); 
					$(this).parents(".NavDetails").find("label").addClass("actNavbar"); 
					$(this).parents(".NavDetails").find(".navSub_chk").prop("checked","checked"); 
				}		
			});
			var nTitle = "";
			if(a)
			{
				var tPage_arr = tURL.substring(0, tURL.length - 4).substr(1,tURL.length).split('_');
				for(var i = 0; i < tPage_arr.length; i++){ nTitle += tPage_arr[i].charAt(0).toUpperCase()+tPage_arr[i].slice(1)+" "; }
			}
			document.title = (nTitle) ? nTitle+" | Management":"Management System";

		},error: function(xhr, ajaxOptions, thrownError){$('.pageLoaded').append("<div class='page-frame'>Error : <b>"+xhr.status+"</b> - "+thrownError+"</div>");}	});
		$(".pageLoaded").empty();	$(".pageLoaded").append('<div class="pageLoading page-loading ldg-bar"><div></div><div></div><div></div></div>');
	}
	else{ $(".pageLoaded").empty();$('.pageLoaded').append("<div class='page-frame'>Error : <b>404</b> - Not Found</div>"); }

	if($(".indSetActive").length>0){	$(".indSetActive").remove();	}
}
/* Navigation end */
var dSrc=[];
function loadScript_(e,a)
{
	if(e)
	{
		var script = document.createElement("SCRIPT");
		script.type= "text/javascript"; script.src = e;	script.defer=true;
	    script.onload = function(){	var $ = window.jQuery;	};
		if($('script[src="'+e+'"]').length > 0){ $('script[src="'+e+'"]').remove(), document.getElementsByTagName("head")[0].appendChild(script); }
		else{	document.getElementsByTagName("head")[0].appendChild(script);	}

		if(a=="a"){	if($(".appAScript_").length>0){	$(".appAScript_").remove();	}	}
		else{		if($(".appScript_").length>0) {	$(".appScript_").remove();	}	}
		if(dSrc.indexOf(e)== -1){ dSrc.push(e);	}

	}else{}		
}


$(document).ready(function(e)
{	
	$("body").on("focusout",".email_" ,function(e){ if($(this).val()){ if(!$(this).val().includes("@")){alert_("Invalid E-mail Format. Please check your input.","Information","",".email_");}				}	});
	$("body").on("keypress",".name_"  ,function(e){ if(String.fromCharCode(e.keyCode).match(/[^a-z A-Z .,-]/g) && e.keyCode != 13) return false;		});
	$("body").on("keypress",".character_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^a-z A-Z]/g)  && e.keyCode != 13) return false;		});
	$("body").on("focusout",".mobile_",function(e){ if($(this).val()){	if($(this).val().length !== 11)	{alert_("Invalid Mobile Number Format. Please check your input.", "Information","", ".mobile_");}	}	});
	$("body").on("keypress",".numeric_, .mobile_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^0-9]/g) && e.keyCode != 13){return false;}	});
	$("body").on("focusout",".decimal_",function(e){ if($(this).val()){ $(this).val(toDecimal($(this).val())); }					});
	$("body").on("keypress",".decimal_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^0-9,.]/g) && e.keyCode != 13)  return false;			});
	$("body").on("keypress",".spe_char_",function(e){if(e.which >= 48 && event.charCode <= 57  && e.keyCode != 13){	e.preventDefault(); return false;}  });
	$("body").on("keypress",".spe_num_",function(e) {if(String.fromCharCode(e.keyCode).match(/[^0-9\+\-\*\/\.\!\@\#\$\%\^\&\(\)\=\;\:\'\"\_\|\,\`\~\\]/g) && e.keyCode != 13) return false;  });

	$("body").on("keypress keyup",".digit_",function(e){ if(String.fromCharCode(e.keyCode).match(/[^0-9]/g) && e.keyCode != 13){return false;}	});	//update this

	$("body").on("keypress keyup",".url_",function(e)
	{  
		if($(this).val())
		{ 
			if(isValidURL($(this).val())){ $(this).removeClass("ipt-error"); }
			else{ $(this).addClass("ipt-error"); }
		}
		else{ $(this).removeClass("ipt-error"); }	
	});

	$("body").on("keypress keyup",".autoComplete.validate_",function(e)
	{ 
		if(e.keyCode!=13 && e.keyCode!=38 && e.keyCode!=40 )
		{ 
			if($(this).val()){ $(this).attr("data-indx",""); $(this).addClass("ipt-error"); }
			else{ $(this).attr("data-indx","");$(this).removeClass("ipt-error"); }
		} 
		
	});

	$("body").on("mousedown",".EyeIpt_btn",function(e){ $(this).parent(".PwIpt_fr").find("input").attr('type', 'text'); });
	$("body").on("mouseup"  ,".EyeIpt_btn",function(e){ $(this).parent(".PwIpt_fr").find("input").attr('type', 'password').focus(); });
	
	$("body").on("keypress keyup",".FileName_ipt",function(e){ if(String.fromCharCode(e.keyCode).match(/[\\/:"*?<>|]/g)){ return false; }	/*$(this).val($(this).val().replace(/[\\/:"*?<>|]/g, '')); */ 		});
	$("body").on("paste", ".FileName_ipt", function(e)		 { var content=(isIE())?window.clipboardData.getData('text'):e.originalEvent.clipboardData.getData('text/plain'); $(this).val(content.replace(/[\\/:"*?<>|]/g, '')); return false;	});

	$("body").on("mouseover", ".cTitle", function(e)
	{
		if(device()=="pc")
		{
			if($(this).clone().find('b').remove().end().text().length > 1)	//if($(this).text().length > 5)
			{
				$("html").append("<div class='dTitle'><div class='d-title-txt'>"+$(this).clone().find('b').remove().end().text()+"</div></div>");	
				$(".dTitle").css({"top":( parseFloat($(this).offset().top) + 25 ),"left":( parseFloat($(this).offset().left) + 20 )});
				$(".dTitle").delay(500).fadeIn(400);	
			}	
		}
	});
	$("body").on("mouseout", ".cTitle", function(e){ $(".dTitle").remove(); });

	$("body").on("change",".tblFtr_change",function(e)		// New Code
	{ 
		var tmpID = $(this).attr("id"), tmpDef = $(this).attr("data-default"), tmpTxtVal="", tmpType="";
		//console.log($(this).attr("type"));
		if($(this).is("input"))		 { tmpType="input";  tmpTxtVal= $(this).val(); }
		else if($(this).is("select")){ tmpType="select"; tmpTxtVal= $(this).children(":selected").text(); }

		var tmpTblFilter_btn = ''+
			'<div class="tActFter_fr t-aftr-btn" data-id="'+$(this).attr("id")+'" data-default="'+$(this).attr("data-default")+'" data-type="'+tmpType+'" >'+
				'<p class="tActFtr_val">'+$(this).attr("data-label")+tmpTxtVal+'</p>'+
				'<a class="tActFter_btn" ></a>'+
			'</div>';		

		if($(".tActFter_fr[data-id='"+$(this).attr("id")+"']").length > 0)
		{ 
			$(".tActFter_fr").each(function(e){ if($(this).attr("data-id")==tmpID){ if($(this).attr("data-default")==tmpTxtVal){ $(this).remove(); } }	});
			$(".tActFter_fr[data-id='"+$(this).attr("id")+"']").find(".tActFtr_val").text($(this).attr("data-label")+tmpTxtVal); 			
		}
		else{ ($(this).parents(".tblFilter_wrap").find(".tblActFtr_in").length > 0)?$(this).parents(".tblFilter_wrap").find(".tblActFtr_in").append(tmpTblFilter_btn):$(this).parents(".tblFilter_wrap").find(".tblAct_ftr").append(tmpTblFilter_btn); }
	
		if($(".tFtr_chk").length >0 && device()=="mobile"){ $(".tFtr_chk").prop("checked",false); }

	});

	$("body").on("click",".tActFter_btn",function(e)		// New Code
	{ 
		var tmpTblFtr_obj = $(this).parent(".tActFter_fr"); var tmpTblFtr_type= tmpTblFtr_obj.attr("data-type");
		if(tmpTblFtr_type=="input")		 { $(this).parents(".tblFilter_wrap").find("#"+tmpTblFtr_obj.attr("data-id")).val(tmpTblFtr_obj.attr("data-default")).change(); }
		else if(tmpTblFtr_type=="select"){ $(this).parents(".tblFilter_wrap").find("#"+tmpTblFtr_obj.attr("data-id")+" option[id='0']").prop("selected","selected").change(); }
		
		$(this).parent(".tActFter_fr").remove();
	});

	$("body").on("click",".genInputs_cls",function(e)
	{
		var thisGInput = $(this).parents(".genInputs_wrap"), thisGHasVal=false, thisGRemove=function(e){ thisGInput.remove(); center_(".pPanel_bg, .pMFP_bg",".popPanel_form, .pMFP_form"); genNewInputs_rst(); };
		thisGInput.find("input, select, textarea").each(function(e){ if($(this).val() !=""){ thisGHasVal=true; } });

		if(thisGHasVal){ confirm_("Value to this Record will not be save, do you want to continue?","Confirmation", thisGRemove); }
		else{ thisGRemove(); }

		genNewInputs_rst();
	});

	$("body").on("click", ".Odeum_btn", function(e){ jGallery($(this).closest(".Odeum4"), $(this).closest(".Odeum4").find("a").index(this)); return false; });
	$("body").on("click", ".Gallery_item", function(e){ e.preventDefault(); });



	
});

function InputSerialize(form,attr)
{
	if(form)
	{
		var thisForm= form, key=[], result=[], formHasVal=false;
		thisForm.find(".genMInputs_wrap").find("input, select, textarea").each(function(e){ key.push($(this).attr("name")); });
		thisForm.find(".genMInputs_wrap, .genInputs_wrap").each(function(e){ $(this).find("input, select, textarea").each(function(e){ if($(this).val() !=""){ formHasVal=true; } });	});
	
		if(formHasVal)
		{			 
			thisForm.find(".genMInputs_wrap, .genInputs_wrap").each(function(i,e)
			{
				var rHasVal=false;
				$(this).find("input, select, textarea").each(function(e){ if($(this).val()!=""){ rHasVal=true; } });

				if(rHasVal)
				{
					var tInx={};
					$(this).find("input, select, textarea").each(function(ii,e){ tInx[key[ii]] = $(this).val(); });
					result.push(tInx);
				}
			});
		}
		else{ result=""; }	

		return (result !="")?JSON.stringify(result):"";
	}
	else{return "";}
}

function genNewInputs_rst()
{
	if($(".genInputs_wrap").length > 0){ $(".genMInputs_wrap").addClass("popMainRow_ipt"); }
	else{ $(".genMInputs_wrap").removeClass("popMainRow_ipt"); }
}

/*
function global_events()		// Move this to global.2.7.js
{	
	$(".pPanel").draggable({handle:'.pHeader', cancel:'.pBody'});		
	$(".popPanel").draggable({cancel:'.popPanel_wrap'});

	$(".bMenu_chk").remove(); $(".bMenu_btn").each(function(e){ $(this).replaceWith($('<a href="#" '+($(this).attr("class")?" class='"+$(this).attr("class")+"' ":"")+' '+($(this).attr("id")?" id='"+$(this).attr("id")+"' ":"")+' >'+$(this).html()+'</a>'));	});

	$("time.timeago").timeago();	
	//$(".popPanel").draggable({cancel:'.noDrag'});	 //$(".popPanel").draggable({cancel:'.pBody'});	 //$(".Burger_menu").removeAttr("tabindex");
	// $(".input_name").bind({ copy:function(e){$('.action').text('copy');}, paste:function(e){$('.action').text('paste');}, cut:function(e){$('.action').text('cut');}		});
}
*/

(function(e){ resetDefault(); })();
var tblContainer_="";
function resetDefault()
{
	tblContainer_ = ".tblRow, .aTbl_btn, .tblNav_chk, .Confirm_bg, .Alert_bg, .Loading_bg, .pPanel_bg, .pPanel1_bg, .pPanel2_bg, .pPanel3_bg, .pPanel4_bg, .pPanel5_bg, .pMFP_bg, .pMFP1_bg, .pMFP2_bg, .pMFP3_bg, .pMFP4_bg, .pMFP5_bg ";
	//tblContainer_ = ".tblRow, .tblRowA, .aTbl_btn, .bTbl_btn, .tblNav_chk, .pPanel_bg, .Confirm_bg, .Alert_bg, .Loading_bg";
	
	if(typeof pLoader_ !== 'undefined')		{delete pLoader_;pLoader_=undefined;}
	if(typeof pLoader_bool !== 'undefined')	{delete pLoader_bool;}

	if(typeof generate_form !== 'undefined') {delete generate_form;generate_form=undefined;}
	if(typeof addNew_record !== 'undefined') {delete addNew_record;addNew_record=undefined;}
	if(typeof getFrom_record !== 'undefined'){delete getFrom_record;getFrom_record=undefined;}
	if(typeof updFrom_record !== 'undefined'){delete updFrom_record;updFrom_record=undefined;}
	if(typeof delFrom_record !== 'undefined'){delete delFrom_record;delFrom_record=undefined;}
	if(typeof canFrom_record !== 'undefined'){delete canFrom_record;canFrom_record=undefined;}
	if(typeof set_delete !== 'undefined')	 {delete set_delete;set_delete=undefined;}	

	if(typeof func1_ !== 'undefined')		{delete func1_;func1_=undefined;}
	if(typeof func2_ !== 'undefined')		{delete func2_;func2_=undefined;}
	if(typeof func3_ !== 'undefined')		{delete func3_;func3_=undefined;}
	if(typeof func4_ !== 'undefined')		{delete func4_;func4_=undefined;}
	if(typeof func5_ !== 'undefined')		{delete func5_;func5_=undefined;}
	if(typeof func6_ !== 'undefined')		{delete func6_;func6_=undefined;}
	if(typeof func7_ !== 'undefined')		{delete func7_;func7_=undefined;}
	if(typeof func8_ !== 'undefined')		{delete func8_;func8_=undefined;}
	if(typeof func9_ !== 'undefined')		{delete func9_;func9_=undefined;}
	if(typeof func10_ !== 'undefined')		{delete func10_;func10_=undefined;}
	if(typeof func11_ !== 'undefined')		{delete func11_;func11_=undefined;}
	if(typeof func12_ !== 'undefined')		{delete func12_;func12_=undefined;}
	if(typeof func13_ !== 'undefined')		{delete func13_;func13_=undefined;}
	if(typeof func14_ !== 'undefined')		{delete func14_;func14_=undefined;}
	if(typeof func15_ !== 'undefined')		{delete func15_;func15_=undefined;}
	
	if(typeof opt1_ !== 'undefined')		{delete opt1_;opt1_=undefined;}
	if(typeof opt2_ !== 'undefined')		{delete opt2_;opt2_=undefined;}
	if(typeof opt3_ !== 'undefined')		{delete opt3_;opt3_=undefined;}
	if(typeof opt4_ !== 'undefined')		{delete opt4_;opt4_=undefined;}
	if(typeof opt5_ !== 'undefined')		{delete opt5_;opt5_=undefined;}
	if(typeof opt6_ !== 'undefined')		{delete opt6_;opt6_=undefined;}
	if(typeof opt7_ !== 'undefined')		{delete opt7_;opt7_=undefined;}
	if(typeof opt8_ !== 'undefined')		{delete opt8_;opt8_=undefined;}
	if(typeof opt9_ !== 'undefined')		{delete opt9_;opt9_=undefined;}
	if(typeof opt10_ !== 'undefined')		{delete opt10_;opt10_=undefined;}
	if(typeof opt11_ !== 'undefined')		{delete opt11_;opt11_=undefined;}
	if(typeof opt12_ !== 'undefined')		{delete opt12_;opt12_=undefined;}
	if(typeof opt13_ !== 'undefined')		{delete opt13_;opt13_=undefined;}
	if(typeof opt14_ !== 'undefined')		{delete opt14_;opt14_=undefined;}
	if(typeof opt15_ !== 'undefined')		{delete opt15_;opt15_=undefined;}

	if(typeof subPage_  !== 'undefined')	{delete subPage_; subPage_=undefined; }
	if(typeof subPage1_ !== 'undefined')	{delete subPage1_;subPage1_=undefined;}
	if(typeof subPage2_ !== 'undefined')	{delete subPage2_;subPage2_=undefined;}
	if(typeof subPage3_ !== 'undefined')	{delete subPage3_;subPage3_=undefined;}
	if(typeof subPage4_ !== 'undefined')	{delete subPage4_;subPage4_=undefined;}
	if(typeof subPage5_ !== 'undefined')	{delete subPage5_;subPage5_=undefined;}
	if(typeof subPage6_ !== 'undefined')	{delete subPage6_;subPage6_=undefined;}
	if(typeof subPage7_ !== 'undefined')	{delete subPage7_;subPage7_=undefined;}
	if(typeof subPage8_ !== 'undefined')	{delete subPage8_;subPage8_=undefined;}
	if(typeof subPage9_ !== 'undefined')	{delete subPage9_;subPage9_=undefined;}
	if(typeof subPage10_!== 'undefined')	{delete subPage10_;subPage10_=undefined;}
	if(typeof subPage11_!== 'undefined')	{delete subPage11_;subPage11_=undefined;}
	if(typeof subPage12_!== 'undefined')	{delete subPage12_;subPage12_=undefined;}
	if(typeof subPage13_!== 'undefined')	{delete subPage13_;subPage13_=undefined;}
	if(typeof subPage14_!== 'undefined')	{delete subPage14_;subPage14_=undefined;}
	if(typeof subPage15_!== 'undefined')	{delete subPage15_;subPage15_=undefined;}

	if(typeof sTblDbl_ !== 'undefined')	{delete sTblDbl_; sTblDbl_=undefined; }

	if(typeof sLoader_ !== 'undefined')	{delete sLoader_; sLoader_=undefined; }
	if(typeof sLoader_b!== 'undefined')	{delete sLoader_b;}

	if(typeof genChPanel_form  !== 'undefined') {delete genChPanel_form; genChPanel_form=undefined; }
	if(typeof genChPanel1_form !== 'undefined') {delete genChPanel1_form;genChPanel1_form=undefined;}
	if(typeof genChPanel2_form !== 'undefined') {delete genChPanel2_form;genChPanel2_form=undefined;}
	if(typeof genChPanel3_form !== 'undefined') {delete genChPanel3_form;genChPanel3_form=undefined;}
	if(typeof genChPanel4_form !== 'undefined') {delete genChPanel4_form;genChPanel4_form=undefined;}
	if(typeof genChPanel5_form !== 'undefined') {delete genChPanel5_form;genChPanel5_form=undefined;}

	if(typeof addNew_chr !== 'undefined')  {delete addNew_chr; addNew_chr=undefined; }
	if(typeof addNew1_chr !== 'undefined') {delete addNew1_chr;addNew1_chr=undefined;}
	if(typeof addNew2_chr !== 'undefined') {delete addNew2_chr;addNew2_chr=undefined;}
	if(typeof addNew3_chr !== 'undefined') {delete addNew3_chr;addNew3_chr=undefined;}
	if(typeof addNew4_chr !== 'undefined') {delete addNew4_chr;addNew4_chr=undefined;}
	if(typeof addNew5_chr !== 'undefined') {delete addNew5_chr;addNew5_chr=undefined;}

	if(typeof getFrom_chr !== 'undefined') {delete getFrom_chr; getFrom_chr=undefined; }
	if(typeof getFrom1_chr !== 'undefined'){delete getFrom1_chr;getFrom1_chr=undefined;}
	if(typeof getFrom2_chr !== 'undefined'){delete getFrom2_chr;getFrom2_chr=undefined;}
	if(typeof getFrom3_chr !== 'undefined'){delete getFrom3_chr;getFrom3_chr=undefined;}
	if(typeof getFrom4_chr !== 'undefined'){delete getFrom4_chr;getFrom4_chr=undefined;}
	if(typeof getFrom5_chr !== 'undefined'){delete getFrom5_chr;getFrom5_chr=undefined;}

	if(typeof delFrom_chr !== 'undefined') {delete delFrom_chr; delFrom_chr=undefined; }
	if(typeof delFrom1_chr !== 'undefined'){delete delFrom1_chr;delFrom1_chr=undefined;}
	if(typeof delFrom2_chr !== 'undefined'){delete delFrom2_chr;delFrom2_chr=undefined;}
	if(typeof delFrom3_chr !== 'undefined'){delete delFrom3_chr;delFrom3_chr=undefined;}
	if(typeof delFrom4_chr !== 'undefined'){delete delFrom4_chr;delFrom4_chr=undefined;}
	if(typeof delFrom5_chr !== 'undefined'){delete delFrom5_chr;delFrom5_chr=undefined;}	

	if(typeof gPanel !== 'undefined'){delete gPanel;gPanel=undefined;}
	if(typeof gPanel1 !== 'undefined'){delete gPanel1;gPanel1=undefined;}
	if(typeof gPanel2 !== 'undefined'){delete gPanel2;gPanel2=undefined;}
	if(typeof gPanel3 !== 'undefined'){delete gPanel3;gPanel3=undefined;}
	if(typeof gPanel4 !== 'undefined'){delete gPanel4;gPanel4=undefined;}
	if(typeof gPanel5 !== 'undefined'){delete gPanel5;gPanel5=undefined;}
	if(typeof gPanel6 !== 'undefined'){delete gPanel6;gPanel6=undefined;}
	if(typeof gPanel7 !== 'undefined'){delete gPanel7;gPanel7=undefined;}
	if(typeof gPanel8 !== 'undefined'){delete gPanel8;gPanel8=undefined;}
	if(typeof gPanel9 !== 'undefined'){delete gPanel9;gPanel9=undefined;}
	if(typeof gPanel10!== 'undefined'){delete gPanel10;gPanel10=undefined;}
	

	if(typeof popTblLoader!== 'undefined') {delete popTblLoader;popTblLoader=undefined;}
	if(typeof popTblLoader1!== 'undefined'){delete popTblLoader1;popTblLoader1=undefined;}
	if(typeof popTblLoader2!== 'undefined'){delete popTblLoader2;popTblLoader2=undefined;}
	if(typeof popTblLoader3!== 'undefined'){delete popTblLoader3;popTblLoader3=undefined;}
	if(typeof popTblLoader4!== 'undefined'){delete popTblLoader4;popTblLoader4=undefined;}
	if(typeof popTblLoader5!== 'undefined'){delete popTblLoader5;popTblLoader5=undefined;}
	if(typeof popTblLoader6!== 'undefined'){delete popTblLoader6;popTblLoader6=undefined;}
	if(typeof popTblLoader7!== 'undefined'){delete popTblLoader7;popTblLoader7=undefined;}
	if(typeof popTblLoader8!== 'undefined'){delete popTblLoader8;popTblLoader8=undefined;}
	if(typeof popTblLoader9!== 'undefined'){delete popTblLoader9;popTblLoader9=undefined;}
	if(typeof popTblLoader10!== 'undefined'){delete popTblLoader10;popTblLoader10=undefined;}

	mFiles=[], uFiles=[], uFiles1=[],uFiles2=[], uFiles3=[], uFiles4=[], uFiles5=[];

	//optLoaded
	if(typeof optLoaded !== 'undefined') {delete optLoaded; optLoaded=undefined; }
	if(typeof opt1Loaded !== 'undefined'){delete opt1Loaded;opt1Loaded=undefined;}
	if(typeof opt2Loaded !== 'undefined'){delete opt2Loaded;opt2Loaded=undefined;}
	if(typeof opt3Loaded !== 'undefined'){delete opt3Loaded;opt3Loaded=undefined;}
	if(typeof opt4Loaded !== 'undefined'){delete opt4Loaded;opt4Loaded=undefined;}
	if(typeof opt5Loaded !== 'undefined'){delete opt5Loaded;opt5Loaded=undefined;}

	if(typeof solo_reset !== 'undefined') {delete solo_reset;solo_reset=undefined;	}
	if(typeof solo_mFiles !== 'undefined'){delete solo_mFiles;solo_mFiles=undefined;}	
	
}

function mulFiles_(a,b,prop)		/* new code jeric */
{
	var sh = Object.fromEntries(Object.entries({parent:".mFiles_panel", extension:true, callback:null }).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { sh[k] = v;  }); }

	mFiles.length = 0; $(".mFiles_panel").off("click", ".mFilesDel_btn"); $(".mFiles_panel").on("click", ".mFilesDel_btn", delItem_mFiles);

	var uplFle_ipt = (a)?a:"#uplFile";
	var uplAppend  = (b)?b:'<span class="mFiles_fr mf-g-photo" > <img src="uplFile_src" /> <div class="mf-g-photo-in">	<div class="mFilesDel_btn mf-g-photo-del" data-file="uplFile_name" title="Click to remove"><i class="fa fa-close"></i></div> </div> </span>';
	$(uplFle_ipt).unbind("change").change(function(e)
	{
		/*var files = !!this.files ? this.files : [];
		if(!files.length || !window.FileReader)return;*/ 
		var files = e.target.files;
		var filesArr = Array.prototype.slice.call(files);
		filesArr.forEach(function(f) 
		{	
			mFiles.push(f);			
			var reader = new FileReader();
			reader.onload = function(e) 
			{
				var tFile_name= f.name.toString().lastIndexOf("."), tFile_ext = f.name.substring(tFile_name + 1);				
				var tmpFile_name=(sh.extension)?f.name:f.name.toString().substr(0,tFile_name);
				var tmpBackground=e.target.result;
				if(tFile_ext=="pdf"){ tmpBackground=baseURL+"images/icons/pdf.png"; }
				if(Video_arr.includes(tFile_ext)){ tmpBackground=baseURL+"images/icons/video.png"; }

				//console.log(tFile_ext);
				$(sh.parent).append(uplAppend.replace(/uplFile_src/g,tmpBackground).replace(/uplFile_name/g,tmpFile_name).replace(/uplFileData_name/g,f.name));
			}
			reader.readAsDataURL(f);
		});
		mulFilesEna_btn();	
		if(sh.callback){ sh.callback(); }	
	});
}
	function delItem_mFiles(e,p) //OLD code /*function delItem_mFiles(e){ var file = (e)?e.data("file"):$(this).data("file"), par=(e)?e:$(this); for(var i=0;i<mFiles.length;i++){ if(mFiles[i].name === file){ mFiles.splice(i,1); break; } }  par.parents(".mFiles_fr").remove(); mulFilesEna_btn(); }*/
	{
		var file = (p!=null)?p.data("file"):$(this).data("file"), par=(p)?p:$(this);
		for(var i=0;i<mFiles.length;i++){ if(mFiles[i].name === file){ mFiles.splice(i,1); break; } }
		par.parents(".mFiles_fr").remove();
		mulFilesEna_btn();
	}
	function mulFilesEna_btn()
	{
		if($(".mFilesEna_btn").length>0)
		{
			if(mFiles.length<=0)	{	$(".mFilesEna_btn").prop("disabled",true);	}
			else if(mFiles.length>0){	$(".mFilesEna_btn").prop("disabled",false);	}
		}		
	}


function imageFile_(ipt,cnt,pic,btn,def)
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




// UPLOAD SINGLE IMAGE ------------------------------------------------------ malapit ng i remove
var image_callback = "";
function _(el)	{	return document.getElementById(el);		}
function uploadImage(iptName_arg,smd_arg,file_name_arg,folder_arg,call_arg)		//must have sub folder name parameter
{	
	var tmpFolder = "";
	if(folder_arg){	tmpFolder =	folder_arg;	}

	if(call_arg){image_callback=call_arg;}
	
	var file = _(iptName_arg).files[0];
	
	var formdata = new FormData();
	formdata.append(iptName_arg, file);
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", "model/image.parser.php?smd="+smd_arg+"&name="+file_name_arg+"&folder="+tmpFolder);
	ajax.send(formdata);	
}
function progressHandler(event)
{
	/*
	_("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	var percent = (event.loaded / event.total) * 100;
	_("progressBar").value = Math.round(percent);
	_("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
	*/
}
function completeHandler(event)	{if(image_callback){image_callback();image_callback="";}		/*_("status").innerHTML = event.target.responseText;	//_("progressBar").value = 0;*/	}
function errorHandler(event)	{/*_("status").innerHTML = "Upload Failed";*/ }
function abortHandler(event)	{/*_("status").innerHTML = "Upload Aborted";*/}
// UPLOAD SINGLE IMAGE End Here		 ------------------------------------------------------



/* New Code j1 */
function subPageInstall(a,exec)
{
	a.find(".subPrev_btn, .subNext_btn").unbind("click").click(function(e)
	{ 
		if($(this).hasClass("disabled")==false)
		{
			var x_ = $(this).attr("data-set");
			var cind = (x_=="0")?(parseInt($GET('ind'))-1):(parseInt($GET('ind'))+1);
			if(parseInt(cind)>0)
			{ 
				setUrlParam({ind:cind,set:$(this).attr("data-inn")}); exec();
			}			
		} 
	});
}

function _iterate(a,obj,prop)
{
	if(obj.prev=="0"){ a.find(".subPrev_btn").addClass("disabled").attr("disabled",true).attr("data-inn","");  }
	else{ a.find(".subPrev_btn").removeClass("disabled").attr("disabled",true).attr("data-inn",obj.p_); }

	if(obj.next=="0"){ a.find(".subNext_btn").addClass("disabled").attr("disabled",true).attr("data-inn",""); }
	else{ a.find(".subNext_btn").removeClass("disabled").attr("disabled",true).attr("data-inn",obj.n_); }

}
/* New Code end */



/* Table Properties */
/* --|-- */
function tblInstall_(a,exec)
{
	a.find(".tblRefresh_btn").unbind("click").click(function(e)  { exec();	});	
	a.find(".pageFilter_sel").unbind("change").change(function(e){ pReset_(a,exec);	});
	a.find(".tblNumRows_btn").unbind("click").click(function(e)  { _setOptions(a.find(".tblNumRows_sel")); });	
	a.find(".tblNumRows_sel").unbind("change").change(function(e){ if(parseInt($(this).val()) >= parseInt(a.find(".tblResult_total").text())){ a.find(".tblFilter_cnt").attr("data-page","1");	}	exec();	});	

	$("body").off("click",".pageActive_ftr a").on("click",".pageActive_ftr a",function(e){ $(this).parents(".pageActive_ftr").remove(); exec();  });

	var tSrch_time = "";
	a.find(".tblSearch_ico, .pageSearch_ico").unbind("click").click(function(e){ clearTimeout(tSrch_time); pReset_(a,exec); });
	a.find(".tblSearch, .pageSearch_ipt").off("search"), a.find(".tblSearch, .pageSearch_ipt").on("search", function(e){ clearTimeout(tSrch_time); pReset_(a,exec); });
	a.find(".tblSearch, .pageSearch_ipt").unbind("keyup").keyup(function(e){ if((e.keyCode ? e.keyCode : e.which)!=13) { clearTimeout(tSrch_time); tSrch_time = setTimeout(function(e){ pReset_(a,exec); }, 1500); } 	});
	a.find(".pageSort_ftr").unbind("click").click(function(e){ $(this).toggleClass("pageAsc").find("i").toggleClass("fa-sort-alpha-desc"); clearTimeout(tSrch_time); pReset_(a,exec); });
		
	a.find(".tblFr_ipt, .tblTo_ipt").unbind("change").change(function(e){ pReset_(a,exec); });	
	
	a.find(".tblHdr").unbind("click").click(function(e)
	{
		if($(this).hasClass("tblSort_des")){ a.find(".tblHdr").removeClass("tblSort_asc").removeClass("tblSort_des"); $(this).addClass("tblSort_asc"); }
		else{ a.find(".tblHdr").removeClass("tblSort_asc").removeClass("tblSort_des"); $(this).addClass("tblSort_des");	}
		pReset_(a,exec);	
	});
}

//function pReset_(a,exec){ if(a && exec){	a.find(".tblFilter_cnt").attr("data-page","1"); exec();	}	}
function pReset_(a,exec,prop)
{ 
	if(a && exec)
	{
		let pr = Object.fromEntries(Object.entries({asc:true,event:null}).map(([key, value])=>[key, value]));
		if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,v]) => { pr[k] = v;  }); }	

		var prDataPage = "1";
		if(pr.event=="new")
		{ 
			a.find(".tblHdr").removeClass("tblSort_asc, tblSort_des"); 
			if(pr.asc)
			{
				var prNum= a.find(".tblResult_total").text().replace(/,/g,""), prDelim= a.find(".tblNumRows_sel").val();
				prNum= (prNum)?parseInt(prNum):0;  prDelim= (prDelim)?parseInt(prDelim):0;
				if(prDelim<prNum)
				{  
					var prFtr= (parseInt(prNum) + 1) / parseInt(prDelim);
					prDataPage= (prFtr % 1)?(parseInt(prFtr)+1):parseInt(prFtr);
				}				
			}
		}
		a.find(".tblFilter_cnt").attr("data-page",prDataPage);
		exec();	
	}	
}
function _pagiFilter(a) { a = (a)?a.find(".tblNumRows_sel").val()+","+a.find(".tblFilter_cnt").attr("data-page"):"";		return a;	}
function _tblRow_ind(a) { a = (a)?(parseInt(a.find(".tblFilter_cnt").attr("data-page") - 1) * a.find(".tblNumRows_sel").val()):"0";	return a;	}		// New Update

function _sortFilter(a)
{
	var tmpResult = "";	
	if(a.find(".tblHdr").hasClass("tblSort_asc"))		{ tmpResult= "0"+a.find(".tblSort_asc").attr("d-sort");	}
	else if(a.find(".tblHdr").hasClass("tblSort_des"))	{ tmpResult= "1"+a.find(".tblSort_des").attr("d-sort");	}
	return tmpResult;
}
function _setPaginate(a,c,l,p,exec)
{
	a.find(".tblFilter_cnt").attr("data-page",p), a.find(".tblResult_total").text(toThousand(c));
	var tRStart = ((l*p) - l ) + 1, tREnd = ((l*p)>=c)?c:(l*p);

	a.find(".tblRowStart").text(tRStart), a.find(".tblRowEnd").text(tREnd);

	if((c / l) > 1){ a.find(".tblResult_total").attr('bt-result',"of"), a.find(".tblPrev_btn, .tblNext_btn, .tblCount_fr").show(); }
	else{ a.find(".tblResult_total").attr('bt-result',""), a.find(".tblPrev_btn, .tblNext_btn, .tblCount_fr").hide(); }

	if(device() == "pc"){ a.find(".tblResult_total").attr('t-result',(parseInt(c) > 1)?"Results":"Result"); }	

	a.find(".tblNext_btn").unbind("click"), a.find(".tblPrev_btn").unbind("click");
	if((p*l)<c)
	{ 
		a.find(".tblNext_btn").attr("disabled",false); 
		a.find(".tblNext_btn").click(function(e){ a.find(".tblFilter_cnt").attr("data-page",(parseInt(p) + 1));	exec();	});
	}
	else{ a.find(".tblNext_btn").attr("disabled",true); 		}

	if(tRStart>1)
	{ 
		a.find(".tblPrev_btn").attr("disabled",false);
		a.find(".tblPrev_btn").click(function(e){ a.find(".tblFilter_cnt").attr("data-page",(parseInt(p) - 1));	exec();	});	
	}
	else{ a.find(".tblPrev_btn").attr("disabled",true); 	}
}
function _setOptions(a,exec)
{
	var tmpOptions = '';
	a.find("option").each(function(e)
	{		
		tmpOptions += ''+
		'<label class="genOpt_btn g-option-lbl" for="gOpt'+$(this).attr("id")+'" >'+
			'<input type="radio" name="genOpt" id="gOpt'+$(this).attr("id")+'" class="gOption g-option" value="'+$(this).val()+'" '+(($(this).prop("selected"))?"checked":"")+' ><p>'+$(this).val()+'</p>'+
		'</label>';
	})
	if($(".gOption_bg").length > 0){ $(".gOption_bg").remove(); }	
	$('body').append('<div class="gOption_bg pop-bg"> <div class="gOption_panel opt-panel">'+tmpOptions+'</div> </div>');
	wrap_();show_(".gOption_bg",".gOption_panel");

	$(".gOption_bg, .genOpt_btn").unbind("click");	
	$(".genOpt_btn").click(function(e)
	{		
		a.find("option[id='"+removeString($(this).find(".gOption").attr("id"))+"']").attr("selected","selected").change();
		if(exec){exec();}	$(".gOption_bg").remove(); unwrap_();				
	});
	$(".gOption_bg").click(function(e){ var gOpt_evt = $(".gOption_panel"); if(!gOpt_evt.is(e.target) && gOpt_evt.has(e.target).length === 0){	$(".gOption_bg").remove(); unwrap_();	} 	});
}
/* --|-- */
var tblLoading_tag 	= "<div class='tblLoading_fr loader-data-fr'><i class='loader-data'></i></div>";
$(document).ready(function(e)
{
	$("body").on("click", function(e)
	{
		var tblCont_evt = $(tblContainer_);
		if(!tblCont_evt.is(e.target) && tblCont_evt.has(e.target).length === 0){	$(".tblRow").removeClass("tblRowActive");	$(".aTbl_btn").attr("disabled",true).addClass("disabled");		}
	});
	$("body").on("click", ".aTbl_btn", function(e){ if($(this).hasClass("disabled")){ e.preventDefault(); return false; } });

	$("body").on("click", ".tblRow", function(e)
	{	
		if($(this).hasClass("tblRowActive") == false){ 	$(".tblRow").removeClass("tblRowActive"); $(this).addClass("tblRowActive");	}
		$(".aTbl_btn").attr("disabled",true).addClass("disabled"), $(this).parents(".dTable").find(".aTbl_btn").attr("disabled",false).removeClass("disabled");
		/* --:-- */
		var tActive_row="tblRowActive", tName_row=".tblRow", tblBody_row=".tblBody";	//".tblBody"
		var tblRow_count = $(this).parent(".tblBody").find(".tblRow").length;
		var tblParent_obj= $(this).parent(".tblBody").get(0);
		var tblParent_bdy= $(this).parent(".tblBody");

		$(window).unbind("keydown");	
		$(window).bind( "keydown", function(e)
		{
			if(((e.keyCode || e.which) == 38 || (e.keyCode || e.which) == 40) && device()=="pc" && $(".pPanel_bg").length == 0 && $("."+tActive_row).is(":visible"))
			{
				var tblRow_index = getChildIndex($(".tblRowActive")[0]);
				var tmpParent = tblParent_obj; var tmpChild = $("."+tActive_row).get(0);
				var indRow_pos= (parseInt(tmpChild.offsetTop) + parseInt(tmpChild.offsetHeight));
				var indPar_top= tblParent_bdy.outerHeight();

				if((e.keyCode || e.which) == 38)
				{
					if(parseInt(tblRow_index) > 0)
					{
						$(tName_row).removeClass(tActive_row); tblParent_obj.childNodes[tblRow_index - 1].classList.add("tblRowActive");						
						if(indRow_pos > indPar_top+10 ){	e.preventDefault();	 }																
					}	
				}
				else if((e.keyCode || e.which) == 40)
				{
					if( parseInt(tblRow_index) < (parseInt(tblRow_count) - 1) )
					{
						$(tName_row).removeClass(tActive_row); tblParent_obj.childNodes[tblRow_index + 1].classList.add("tblRowActive");
						if(indRow_pos < indPar_top ){	e.preventDefault();	 }
					}					
				}
			}			
		});
	});
});
	var getChildIndex = function(child)
	{
	    var parent = child.parentNode;
	    for(var i=parent.children.length - 1; i >= 0; i--){ if(child == parent.children[i]){ break; } }
	    return i;
	};

function get_UserInfo(a,b)
{
	var tmpValue = "0";	
	if(a.indexOf('=') > -1)
	{
		if(b){ tmpValue=b; }
		else{	if($(".tblRow").hasClass("tblRowActive")){ $(".tblRow").each(function(e){ if($(this).hasClass("tblRowActive")){ tmpValue = $(this).data("j-v-c").ci; } });	}	}		
	}
	else{	alert_("Error in : System Error from ('fck-u'.dll), missing from your keyboard and computer chair. Please troubleshoot first.");		}
	return a+"&smd="+tmpValue;
}
function gmi(a)
{
	var rst="", tmpParent = (a)?$(a).find(".tblRowActive"):$(".tblRowActive");	
	if(tmpParent.length){ rst=tmpParent.data("j-v-c").ci; }
	return rst;
}

/* Table Properties end here*/

function gmb(a)
{
	if(a){ return $(a).parents(".itemFr_").data("j-v-c").ci;	}
	return null;
}
function gma(a)
{
	if(a){ return $(a).data("j-v-c").ci;	}
	return null;
}


$("document").ready(function(e)
{
	//$("body").on("click",".Profile_lnk",function(e){ setActivePage($(this).attr("href").split("&")[0],null,$(this).attr("href").split("&")[1]); alert($(this).attr("href").split("&")[1]); e.preventDefault(); });
	$("body").on("click",".Profile_lnk",function(e)
	{
		$(".navSub_chk").prop("checked",false);  setActivePage($(this).attr("href").split("&")[0],null,$(this).attr("href").split("&")[1]+(($(this).attr("href").split("&")[2])?"&"+$(this).attr("href").split("&")[2]:"")); 
		e.preventDefault(); 
	});
	$("body").on("click",".Page_lnk",function(e){ $(".navSub_chk").prop("checked",false);  setActivePage($(this).attr("href")); e.preventDefault(); });

	$("body").on("input",".AddPost_txt", function(e)
	{
		var scroll_height = $(this).get(0).scrollHeight;
		if(scroll_height > $(this).outerHeight(true)){ $(this).css('height', (scroll_height + 5)+"px"); }
		if($(this).val()==""){ $(this).css('height',"40px"); }
	});	

	$("body").on("input",".PostComment_txt", function(e)
	{
		var scroll_height = $(this).get(0).scrollHeight;
		if(scroll_height > $(this).outerHeight(true)){ $(this).css('height', (scroll_height + 5)+"px"); }
		if($(this).val()==""){ $(this).css('height',"17px"); }
	});
	
});

function scrollUp()
{	
	if($(".pageLoaded").scrollTop()>=80)
	{		
		if($(".scrollUp_btn").length == 0)
		{		
			$(".pageLoaded").append("<div class='scrollUp_btn scroll-up-btn fa fa-chevron-up'></div>");
			$(".scrollUp_btn").unbind("click").click(function(e){ $(".pageLoaded").animate({scrollTop:'0px'},1000); });
			$(".scrollUp_btn").show("fade",500);
		}		
	}
	else{$(".scrollUp_btn").hide("fade",500,function(e){ $(".scrollUp_btn").remove(); }); }	
}



/* to be Validated */
function isIE(){ var ua = window.navigator.userAgent; return ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0 }
/* to be Validated end here */








/*
	$(".Sample_sel")[0].selectedIndex = 0;


*/













