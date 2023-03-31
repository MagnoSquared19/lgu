
$(document).ready(function(e){ pLoader_(); });
var pLoader_bool=true;
function pLoader_()
{
	var pEmpty_value= function(e){ return (e)?e:" (not set)";  };
	if(pLoader_bool)
	{
		pLoader_bool=false; 
		$.post(host+'account/model/tbl.profile.php',{token:"0",fb:"27",ft:"0",id:$GET('id'),type:$GET("type")},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					$(".Profile_name").text(v.fn+" "+v.mn+" "+v.ln);	
					$(".Profile_birthday").text(pEmpty_value(v.bday));				
					$(".Profile_gender").text(pEmpty_value(v.gender));
					$(".Profile_address").text(pEmpty_value(v.address));				
					$(".Profile_hometown").text(pEmpty_value(v.hometown));				
					$(".Profile_phone").text(pEmpty_value(v.cp));	
					$(".Profile_email").text(pEmpty_value(v.email));	
					$(".Profile_about").text(pEmpty_value(v.about_me));					
					$(".Profile_work").text(pEmpty_value(v.work));	
					$(".Profile_position").text(pEmpty_value(v.position));	
					$(".Profile_level").text(pEmpty_value(v.level));	

					if(v.fb){ $(".proFb_ico").removeClass("disabled").attr("href",v.fb).attr("target","_blank"); }	
					else{ $(".proFb_ico").addClass("disabled").attr("href","#").attr("target","_self"); }

					if(v.twitter){ $(".proTw_ico").removeClass("disabled").attr("href",v.twitter).attr("target","_blank"); }
					else{ $(".proTw_ico").addClass("disabled").attr("href","#").attr("target","_self"); }

					if(v.instagram)	{ $(".proIn_ico").removeClass("disabled").attr("href",v.instagram).attr("target","_blank"); }
					else{ $(".proIn_ico").addClass("disabled").attr("href","#").attr("target","_self"); }			
			
					$(".Profile_pic").attr("src",v.image);	imgA=v.image;

					if(v.owner=="1")
					{
						if($(".ProfileAccount_btn").length==0){ $(".ProfileAccount_wrap").append('<div class="pagelet-footer"><div class="pagelet-footer-button"> <button class="ProfileAccount_btn ui-btn"	><i class="fa fa-pencil"></i>Update</button> </div></div>'); }
						if($(".ProfileBasic_btn").length==0)  { $(".ProfileBasic_wrap").append('<div class="pagelet-footer"><div class="pagelet-footer-button">   <button class="ProfileBasic_btn ui-btn"	><i class="fa fa-pencil"></i>Update</button> </div></div>'); }
						loadScript_(host+"account/model/js/admin/adm.profile.js","a"); 
					}
				}				
			}); 
		},"json").done(function(xhr, status, err)
		{
			pLoader_bool=true;	//imageFile_(".Profile_ipt",null,".Profile_pic",".Profile_btn",imgA);		//global_events();

		}).fail(function(xhr, status, err){ pLoader_bool=true; if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		$(".Profile_pic").attr("src","../images/files/loading/loading-c-s.gif");

	}
}








