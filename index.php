<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php 
	require_once("embed/header.php");
	echo "
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	<meta name='viewport' content='initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no' />
	{$meta}

	<title>{$title}</title>
	<link rel='shortcut icon' type='image/x-icon' href='{$icon}' />	
	{$head_rsc}";
	echo "<script type='text/javascript' src='".host."embed/model/js/index.js' ></script>

	<link rel='stylesheet' type='text/css' href='style/slick.css'>
	<script type='text/javascript' src='js/slick.js' charset='utf-8'></script>
	";
?>

</head>
<body>

<input type="checkbox" id="navibar" class="NaviBar_chk navibar-chk" hidden />

<div class="header">
	<div class="u-wrap">
		<label class="shrMenu_btn shr-menu-btn" for="navibar"><span></span><b><?php echo $municipal; ?></b></label>
		<?php echo $header; ?>
	</div>
</div>

<div class="pageBody p-body">
<div class="SlideShow_panel slideshow"> <div class="slider_wrap slider"></div> </div>


<div class="i-banner" hidden><div class="i-banner-in">
	<div class="p-banner-r1">
		<div class="logo-panel">		
			<div class="logo"><img src="<?php echo $logo; ?>" alt="" /></div>
			<div class="logo-text"><?php echo $banner_txt; ?></div>
		</div>
		<?php echo $logo2; ?>
	</div>
	<div class="u-wrap">
		<div class="i-banner-r2">
			<span><p>Tuloy po sa</p><h1><?php echo $brgy; ?></h1></span>
		</div>		
	</div>

	<div class="iNewsBreak_panel u-wrap"><div class="i-breaking-news">
		<span><b>BREAKING NEWS</b><u></u></span>
		<section><marquee class="iNewsBreak_wrap marquee"><i class="i Loading_ico">...</i></marquee></section>
	</div></div>

</div></div>

<div class="section fff">
	<div class="iMayor_wrap i-mayor">
		<div class="iMayor_profile i-mayor-profile"></div>
		<div class="i-mayor-message">
			<div class="i-mayor-title">
				<p class="uppercase">WELCOME TO <?php echo $municipal.", ".$province; ?>!</p>
				<b>A QUICK TOUR</b>				
			</div>
			<div class="iMayor_txt i-mayor-text p"></div>
		</div>
	</div>
</div>


<div class="iData_info section i-data-info">
	<div class="ipt-tri"><div class="i-data-val">
		<b class="iHousehold_total">0</b><p>HOUSEHOLD</p>
	</div></div>
	<div class="ipt-tri-m"><div class="i-data-val">
		<b class="iPopulation_total">0</b><p>POPULATION</p>
	</div></div>
	<div class="ipt-tri"><div class="i-data-val">
		<b class="iSrCitizen_total">0</b><p>SR. CITIZEN</p>
	</div></div>
</div>

<div class="wrap ccc" >
	<div class="" style="float:left;height:auto;width:100%;">
		<video autoplay muted loop style="float:left;height:auto;width:100%;">
			<source src="videos/video.mp4" type="video/mp4" />
		</video>
	</div>
</div>

<div class="iTourist_panel section" >
	<div class="h1 c">Tourist Attractions</div>
	<div class="iTourist_wrap wrap"></div>
	<div class="i-tourism-footer">
		<p>Be inspired and discover top experiences!</p><a href="tourism.php" class="u-button">Read More</a>
	</div>
</div>

<div class="section fff">
	<div class="h1 c">Press Release</div>
	<div class="pressPage_panel event-post-panel" data-limit="3" data-page="1" >
		<div class="eventPost_wrap event-post-body"></div>
	</div>
</div>

<div class="section eee">
	<div class="pressSection_panel event-section-panel">
		<div class="h2">Latest Events</div>
		<div class="event-section-wrap"><div class="eventSection_wrap event-section-wrap-in"></div></div>		
	</div>
</div>

<div class="iGallery_panel section c">
	<div class="iGallery_wrap fix-fr">
		<div class="iGallery_col1 i-gallery-col "></div>
		<div class="iGallery_col2 i-gallery-col-m"></div>
		<div class="iGallery_col3 i-gallery-col"></div>
	</div>
	<div class="i-tourism-footer">
		<a href="gallery.php" class="u-button">Show More</a>
	</div>
</div>


<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>



</body>
</html>