$(document).ready(function(e)
{
	//$(window).resize(function(e){	if(windowScreen=="pc"){ if($(".shrNavbar_fr").is(":visible")){unwrap_();} } });
	$(".shrMenu_btn").click(function(e)	{ wrap_(); 	 });
	$(".shrNav_cls").click(function(e)	{ unwrap_(); });
	$(".shrLnk").click(function(e)		{ if($(this).attr("href") != "#"){$(".NaviBar_chk").prop("checked",false);}		});

	$(window).scroll(function(e){scrollUp(); });
	scrollUp();

});

function scrollUp()
{	
	if($(window).scrollTop()>=80)
	{		
		if($(".scrollUp_btn").length == 0)
		{		
			$("body").append("<div class='scrollUp_btn scroll-up-btn fa fa-chevron-up'></div>");
			$(".scrollUp_btn").unbind("click").click(function(e){ $("html , body").animate({scrollTop:'0px'},1000); });
			$(".scrollUp_btn").show("fade",500);
		}		
	}
	else{$(".scrollUp_btn").hide("fade",500,function(e){ $(".scrollUp_btn").remove(); }); }	
}


/*
blind
bounce
clip
drop
explode
fade
fold
highlight
puff
pulsate
scale
shake
size
slide
*/

