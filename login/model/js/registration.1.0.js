$(document).ready(function(e)
{
	getLeaders();	
});

$(document).ready(function(e)
{
	option2(); option3(); option4();

	imageFile_(".uPhoto_ipt",null,".uPhoto_pic",".uPhoto_btn",$(".uPhoto_pic").attr("src"));
	$(".Registration_form").submit(function(e)
	{	
		e.preventDefault();	

		if($(".pwd_password_").val() != $(".pwd_confirm_").val()){ alert_('Confirm Password does not Match. Please check your input.','Information',null,".pwd_confirm_"); }
		else
		{
			var iptData= new FormData(this); var data_= $(this).serialize(); 	
			$.ajax({url: "model/table.registration.php",type: "POST",data:iptData,dataType:"JSON",contentType:false, cache:false, processData:false,
			beforeSend:function(data,form,opt){	loading_("Saving, Please wait...");	iptData.append("token","0");iptData.append("fb","27");iptData.append("valid","100-1");iptData.append("data_",data_); for(var i=0, len=uiFiles.length;i<len;i++){ iptData.append('files_[]', uiFiles[i]); } },
			success:function(json, status, xhr)
			{
				$.each(json, function(e, v)
				{
					if(v.result == "1")
					{	
						dynamicFunc= function(){ location='../'; dynamicFunc="";};
						confirm_("Application Saved.<br/><br/>Thank you for registering with us. We will send an email and our representative will contact you after we review your application.<br/><br/>Do you want to return to Home Page?","Information", dynamicFunc);
					}
					else if(v.result=="0")
					{					
						dynamicFunc= function(){ location=v.path; dynamicFunc="";}; confirm_(v.error,"Information", dynamicFunc);
					}
					else if(v.result=="2")
					{
						dynamicFunc= function(){ $(".Registration_form input[name='username']").focus();  dynamicFunc="";}; alert_(v.error,"Information", dynamicFunc);
					}
					else{ alert_("Error in : "+v.result,"Error Message"); }						
				});	
			},
			complete:function(e){loading_("unload");},
			error:function(xhr, status, err){ loading_("unload"); if(xhr.responseText=="SessionExpired"){logout();} else{loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	}	}).done(function(data){ loading_("unload"); });
		}
	});

	/*opt2_();opt3_();opt4_();
	$(".regFile_btn").click(function(e){ e.preventDefault(); $(".regFile_ipt").click(); });	
	$(".fn_ipt, .ln_ipt").focusout(function(e){ studentValidate(); });*/
});




function option2()
{
	var oText= $(".phProvince_sel option[id='0']").text();
	$(".phProvince_sel option[id='0']").text("Loading...");	
	$.post('../account/model/table.address.php',{token:"0",valid:"100-2",fb:"22-1"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ $(".phProvince_sel").append('<option id="'+v.id+'" data-code="'+v.prov_code+'" value="'+v.id+'">'+v.name+'</option>'); }	}); 
	},"json").done(function(e)
	{
		$(".phProvince_sel option[id='0']").text(oText);
		$(".phProvince_sel").change(function(e)
		{ 
			if($(this).val()=="OTHERS")
			{ 
				$(".phCity_sel").attr("required",false).siblings("div").text("Town/ City"); 
				$(".phBrgy_sel").attr("required",false).siblings("div").text("Barangay"); 
				$(this).siblings("input").attr("required",true);
			}
			else
			{ 
				$(".phCity_sel").attr("required",true).siblings("div").text("Town/ City*"); 
				$(".phBrgy_sel").attr("required",true).siblings("div").text("Barangay*"); 
				$(this).siblings("input").attr("required",false);
			}
			opt3(); opt4(); 
		});
		

	}).fail(function(xhr, status, err){ alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");});
	//$(".phProvince_sel option[id!='0']").remove();	
}

var aCity=[];
function option3()
{
	var oText= $(".phCity_sel option[id='0']").text();
	$(".phCity_sel option[id='0']").text("Loading...");	
	$.post('../account/model/table.address.php',{token:"0",valid:"100-3",fb:"22-2"},function(json, status, xhr)
	{		
		$.each(json,function(i, v){ if(v.id){ aCity.push({'id':v.id,'name':v.name,'prov_code':v.prov_code,'city_code':v.city_code}); }	}); 
	},"json").done(function(e)
	{
		$(".phCity_sel option[id='0']").text(oText);
		$(".phCity_sel").change(function(e){ opt4(); });		

	}).fail(function(xhr, status, err){ alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");});
	$(".phCity_sel option[id!='0']").remove();	
}
	function opt3()
	{
		$(".phCity_sel option[id!='0']").remove(); $(".phCity_sel").val("");
		var tAct= $(".phProvince_sel").children(":selected").attr("data-code");
		$.each(aCity, function(k,v) 
		{
			if(v.prov_code==tAct){ $(".phCity_sel").append('<option id="'+v.id+'" data-code="'+v.city_code+'" value="'+v.id+'">'+v.name+'</option>');  }
	    });
	}

var aBrgy=[];
function option4()
{
	var oText= $(".phBrgy_sel option[id='0']").text();
	$(".phBrgy_sel option[id='0']").text("Loading...");	
	$.post('../account/model/table.address.php',{token:"0",valid:"100-4",fb:"22-32"},function(json, status, xhr)
	{	
		$.each(json,function(i, v){ if(v.id){ aBrgy.push({'id':v.id,'name':v.name,'city_code':v.city_code}); }	}); 
	},"json").done(function(e)
	{
		$(".phBrgy_sel option[id='0']").text(oText);
		

	}).fail(function(xhr, status, err){ alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");});
	$(".phBrgy_sel option[id!='0']").remove();	
}
	function opt4()
	{
		$(".phBrgy_sel option[id!='0']").remove(); $(".phBrgy_sel").val("");
		var tAct= $(".phCity_sel").children(":selected").attr("data-code");
		$.each(aBrgy, function(k,v) 
		{
			if(v.city_code==tAct){ $(".phBrgy_sel").append('<option id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>');  }
		});
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



var aLeaders=[];
function getLeaders(e)
{
	$.post('model/table.registration.php',{token:"0",valid:"101-2",fb:"22-2"},function(json, status, xhr)
	{	
		$.each(json,function(i, v)
		{ 
			if(v.id){ aLeaders.push({'id':v.id,'type':v.type,'name':v.name}); }	
		}); 
	},"json").done(function(e)
	{
		$(".olRegType_sel").change(function(e)
		{
			if($(this).val()=="1"){ $(".olRegType_wrap").empty(); }
			else if($(this).val()=="2"){ $(".olRegType_wrap").empty().append('<div class="ipt-rfr"><div class="ipt-lbl">Provincial Leader*</div> <select class="gLeader_sel" name="prov_leader" required><option id="0" value="" selected hidden>Select Provincial Leader</option></select> </div>');	setLeaders("1"); }
			else if($(this).val()=="3"){ $(".olRegType_wrap").empty().append('<div class="ipt-rfr"><div class="ipt-lbl">Municipal Leader* </div> <select class="gLeader_sel" name="mun_leader" required ><option id="0" value="" selected hidden>Select Municipal Leader</option></select> </div>');	setLeaders("2"); }
			else if($(this).val()=="4")
			{ 
				var tmpBen= ''+
				'<div class="ipt-rfr"><div class="ipt-lbl">Precint Leader* </div> <select class="gLeader_sel" name="prec_leader" required ><option id="0" value="" selected hidden>Select Precint Leader</option></select> </div>'+
				'<div class="wrap">'+
					'<div class="ipt-lfr"><div class="ipt-lbl">Beneficiary 1</div><input type="text" name="ben1" placeholder="Beneficiary Name" ></div>'+
					'<div class="ipt-rfr"><div class="ipt-lbl">Beneficiary 2</div><input type="text" name="ben2" placeholder="Beneficiary Name" ></div>'+
				'</div>'+
				'<div class="wrap">'+
					'<div class="ipt-lfr"><div class="ipt-lbl">Beneficiary 3</div><input type="text" name="ben3" placeholder="Beneficiary Name" ></div>'+
					'<div class="ipt-rfr"><div class="ipt-lbl">Beneficiary 4</div><input type="text" name="ben4" placeholder="Beneficiary Name" ></div>'+
				'</div>';
				$(".olRegType_wrap").empty().append(tmpBen);
				setLeaders("3");			
			}
		});	

	}).fail(function(xhr, status, err){ alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");});
}

function setLeaders(a)
{
	$.each(aLeaders, function(k,v) 
	{
		if(v.type==a){ $(".gLeader_sel").append('<option id="'+v.id+'" value="'+v.id+'">'+v.name+'</option>');  }
	});
}

