

$(document).ready(function(e)
{
	//if($(".iNewsBreak_wrap").length){ indBNews_exec(); } 
	if($(".iMayor_wrap").length){ indexMayor_exec(); }
	if($(".iAbout_wrap").length){ indAbout_exec(); }
	if($(".iData_info").length){ indDataInfo_exec() }

	if($(".iTourist_wrap").length) { indTourism_exec(); }
	if($(".iGallery_panel").length){ indGallery_exec(); }
	
	if($(".SlideShow_panel").length){ slideInit(); }

});

/* Slideshow */
function slideInit()
{
    if($(".SlideShow_panel").length > 0)
    { 
        var isEmpty= true;		//token:"0",fb:"27",valid:"50",uLike:"",sort:""
        $.post('embed/model/table.index.php',{token:"0",fb:"27",valid:"100-0"},function(json, status, xhr)
        {    console.log(json);
            $.each(json,function(i, v)
            {
                if(v.id)
                {
                    isEmpty= false; console.log(v.link);
                    //banInf.push({title:v.title,description:v.description,link:v.link});
                    var tmpFlashLink= (v.link!=="" && v.link!=="#")?'<span class="slideInfo_btn" > <a href="'+v.link+'" target="_blank" class="u-button">Learn More<i class="fa fa-arrow-right"></i></a> </span>':'';
                    //var tmpFlashLink= (v.link!=="" && v.link!=="#")?'<span class="slideInfo_btn" > <a href="'+v.link+'" target="_blank" class="button-ui"><b>Learn More</b><p><i class="fa fa-arrow-right"></i></p></a> </span>':'';
                    //$(".SlideShow_panel .slider_wrap").append('<div class="item"> <img class="img" src="'+v.image+'" /><div class="img-in"></div> </div>');
                    var tmpFlashItem= ''+
                    '<div class="item"> <img class="img" src="'+v.image+'" /><div class="img-in">'+
                        '<div class="slide-info">'+
                            '<h1><pre class="slideInfo_title">'+v.title+'</pre></h1>'+
                            '<h5><p class="slideInfo_desc">'+v.description+'</p></h5>'+tmpFlashLink+
                        '</div>'+
                    '</div> </div>';

                    $(".SlideShow_panel .slider_wrap").append(tmpFlashItem);
                }                     
            });
        },"json").done(function(e)
        {
            $(".SlideShow_panel").find(".Loading_ico").remove();
            if(isEmpty){ $(".SlideShow_panel .slider_wrap").append(''); }
            global_events();

            $('.slider_wrap').slick(
            {
                draggable: true,
                arrows: true,
                dots: true,
                fade: true,
                speed: 900,
                infinite: true,
                cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
                touchThreshold:100,    
                cssEase: 'ease-in-out',
                autoplay: true,
                autoplaySpeed: 7000,
                lazyLoad: 'ondemand', 
                prevArrow: '<button class="slide-prev"><i class="fa fa-angle-left"></i></button>', 
                nextArrow: '<button class="slide-next"><i class="fa fa-angle-right"></i></button>',
            });
            //$(".slideInfo_title, .slideInfo_desc, .slideInfo_btn").hide();
            slideNext();

        }).fail(function(xhr, status, err){ if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}  });
        $(".SlideShow_panel .slider_wrap").empty().append(loading_spin);    //$(".SlideShow_panel .slider_wrap").empty().append(loading_bounce);
    }
}

function slideNext()
{
    var trans_=700, ind= $('.slick-current').attr('data-slick-index');
    $(".slideInfo_title, .slideInfo_desc, .slideInfo_btn").show("fade",trans_);
}

$('.slider_wrap').on('afterChange', function(event, slick, currentSlide){ slideNext(); });
$('.slider_wrap').on('beforeChange', function(event, slick, currentSlide)
{
    var trans_= 300;
    $(".slideInfo_title").hide("fade",trans_);
    $(".slideInfo_desc").hide("fade",{direction:'right'},trans_);
    $(".slideInfo_btn").hide("fade");
});

/* Slideshow end */

function indDataInfo_exec()
{
	$.post('embed/model/table.index.php',{token:"0",fb:"27",valid:"50",uLike:"",sort:""},function(json, status, xhr)
	{
		$.each(json,function(i, v)
		{
			$(".iPopulation_total").text(toThousand(v.residents));
			$(".iHousehold_total").text(toThousand(v.household));
			$(".iSrCitizen_total").text(toThousand(v.sr));
		});
	},"json").done(function(e){ }).fail(function(xhr, status, err){ alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});	
}
/*
function indBNews_exec()
{
	isEmpty=true;
	$.post('embed/model/table.index.php',{token:"0",fb:"27",valid:"10",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty=false;
				$(".iNewsBreak_wrap").append('<b>'+v.title+'</b><p>'+((v.dated)?('('+v.dated+')'):'')+((v.description)?" - ":"")+v.description+'</p>');
			}
		});
	},"json").done(function(e)
	{
		if(isEmpty){ $(".iNewsBreak_panel").hide(); }
		$(".iNewsBreak_wrap").find(".Loading_ico").remove();

	}).fail(function(xhr, status, err){ $(".iNewsBreak_wrap").find(".Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
}*/

function indexMayor_exec()
{
	var tmpInd_par= $(".iMayor_wrap");	
	$.post('embed/model/table.index.php',{token:"0",fb:"27",valid:"20",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				var obj= $('<div/>',{id:'tmpReadMore_obj',html:v.description}).contents(); 
				var tmpText= obj.text().substring(0,500);
				tmpInd_par.find(".iMayor_txt").html(tmpText+((tmpText.length>=500)?'... <a href="about.php">Read More</a>':''));
				tmpInd_par.find(".iMayor_profile").append('<img src="'+v.profile+'" />');
			}
		});
	},"json").done(function(e)
	{
		tmpInd_par.find(".Loading_ico").remove();
		global_events();

	}).fail(function(xhr, status, err){ tmpInd_par.find(".Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	tmpInd_par.find(".iMayor_txt").append(loading_bounce);
	tmpInd_par.find(".iMayor_profile").append(loading_bars);
}

var indAbout_bool= true;
function indAbout_exec()
{
	if(indAbout_bool)
	{
		var isEmpty= true; indAbout_bool=false;
		$.post('embed/model/table.index.php',{token:"0",fb:"27",valid:"30",uLike:"",sort:""},function(json, status, xhr)
		{	
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false;
					var obj = $('<div/>',{id:'tmpReadMore_obj',html:v.description}).contents(); 
					var tImg= (v.image=="none")?"":'<img src="'+v.image+'" class="i-about-image" alt="" />';

					var indResult= tImg+'<b class="i-about-sub-title uppercase">ABOUT '+brgy+'</b><br/><b class="i-about-title">'+v.title+'</b><br/><br/>'+obj.text();
					$(".iAbout_wrap").append(indResult);
					
				}
			});
		},"json").done(function(e)
		{
			indAbout_bool=true; $(".iAbout_panel .Loading_ico").remove(); 
			if(isEmpty){ $(".iAbout_panel").hide(); }
			else{ $(".iAbout_wrap").show(); }
			global_events();

		}).fail(function(xhr, status, err){ indAbout_bool=true; $(".iAbout_panel .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		$(".iAbout_wrap").empty();	$(".iAbout_panel").show().append(loading_bounce);
	}
}

var indTourism_bool= true;
function indTourism_exec()
{
	if(indTourism_bool)
	{
		var isEmpty = true; indTourism_bool= false; var r_count=0;
		$.post('embed/model/table.index.php',{token:"0",fb:"27",valid:"40",uLike:"",sort:""},function(json, status, xhr)
		{	$.each(json,function(i, v)
			{
				if(v.count){ r_count=v.count; }
				if(v.id)
				{
					isEmpty = false;
					var obj= $('<div/>',{id:'tmpReadMore_obj',html:v.description}).contents(); 
					var tPostResult='<div class="i-tourist-item" style="background-image:url(\''+v.image+'\')"><div class="i-tourist-cover"><b>'+v.title+'</b><p class="clamp4">'+obj.text()+'</p></div></div>';
					$(".iTourist_wrap").append(tPostResult);

					if(i>=3 && parseInt(r_count) !=7){ return false; }
				}
			});
		},"json").done(function(e)
		{
			indTourism_bool= true; $(".iTourist_panel .Loading_ico").remove(); 
			if(isEmpty){ $(".iTourist_panel").hide(); }
			else{ $(".iTourist_panel").show(); }
			global_events();

		}).fail(function(xhr, status, err){ indTourism_bool= true; $(".iTourist_panel .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		$(".iTourist_panel").append(loading_bounce);
	}	
}

var indGallery_bool= true;
function indGallery_exec()
{
	if(indGallery_bool)
	{
		var isEmpty= true; indGallery_bool=false;
		$.post('embed/model/table.about.php',{token:"0",fb:"27",valid:"60",uLike:"",sort:"",album:""},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.index)
				{
					isEmpty = false;
					var tmpItem= "";
					if(Image_arr.includes(v.ext.toLowerCase())){ tmpItem= '<a href="'+v.src+'" class="Gallery_item GalImage_item i-gallery-item" title="'+v.name+'"> <img id="postThumb'+v.index+'" src="'+v.src+'" alt="'+v.name+'" data-size="800x508" /><div class="i-gallery-item-cover"></div> </a>'; }
					if(Video_arr.includes(v.ext.toLowerCase())){ tmpItem= '<a href="'+v.src+'" class="Gallery_item GalVideo_item i-gallery-item" title="'+v.name+'" ><video controls src="'+v.src+'" title="'+v.name+'" ></video></a>'; }

					var indGalResult='';
					if(i<2){ $(".iGallery_col1").append(tmpItem); }
					else if(i==2){ $(".iGallery_col2").append('<div class="i-gallery-title"><b>Our Gallery</b><p>Take a Look at our Photos!</p></div>'+tmpItem+'</div>'); }
					else if(i<5){ $(".iGallery_col3").append(tmpItem); }

					$(".iGallery_wrap").append(indGalResult);

					$(".iGallery_wrap #postThumb"+v.index).off("load").on("load", function(e)
					{
						var w_ = $(this).get(0).naturalWidth, h_ = $(this).get(0).naturalHeight;
						if((w_!="undefined" || w_!="0") && (h_!="undefined" || h_!="0")){ $(this).attr("data-size",w_+"x"+h_); }
					});

					
				}
			});
		},"json").done(function(e)
		{
			indGallery_bool=true; $(".iGallery_panel .Loading_ico").remove(); 
			if(isEmpty){ $(".iGallery_panel").hide(); }
			else{ $(".iGallery_wrap").show(); }

			$(".GalVideo_item").imgPreload(); $(".GalImage_item").imgPreload(); 			
			$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".iGallery_wrap", ".GalVideo_item, .Gallery_item", $(this)); });
			global_events();

		}).fail(function(xhr, status, err){ indGallery_bool=true; $(".iGallery_panel .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		$(".iGallery_col1, .iGallery_col2, .iGallery_col3").empty();	$(".iGallery_panel").append(loading_bounce);
	}
}

