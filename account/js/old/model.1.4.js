
$("document").ready(function(e)
{
	$("body").on("click",".Profile_lnk",function(e){ setActivePage($(this).attr("href").split("&")[0],null,$(this).attr("href").split("&")[1]); e.preventDefault(); });

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

function pScrollUp()
{		
	if($(".pageLoaded").scrollTop()>=80)
	{		
		if($(".gUp_btn").length == 0)
		{		
			$(".pageLoaded").append("<div class='gUp_btn g-up-btn fa fa-chevron-up'></div>");
			//$("body").append("<div class='gUp_btn g-up-btn fa fa-chevron-up'></div>");
			$(".gUp_btn").unbind("click").click(function(e){	$(".pageLoaded").animate({scrollTop:'0px'},500); });
		}
		$(".gUp_btn").fadeIn("slow");
	}
	else{$(".up-btn-fr").fadeOut("slow");$(".gUp_btn").remove();}

	if($(".dPostSearch_panel").length > 0)
	{ 
		if($(".dPostSearch_panel").offset().top <= 20){ $(".dPostSearch_wrap").outerWidth($(".dPostSearch_panel").outerWidth()).addClass("pageletSearch_wrap"); }
		else{ $(".dPostSearch_wrap").outerWidth($(".dPostSearch_panel").outerWidth()).removeClass("pageletSearch_wrap"); }
	}	
}


/*
var video = document.createElement('video');

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d')
video.addEventListener('loadeddata', function() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.pause();

  var dataURI = canvas.toDataURL('image/jpeg');
  var img = document.createElement("img");
  img.src = dataURI;
  that.css('background-image', 'url(' + dataURI + ')');
}, false);

video.preload = 'metadata';
video.muted = true;
video.playsInline = true;
video.setAttribute('crossOrigin', 'anonymous');
video.src = $(this).data('src');
video.play();

*/