<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php 
	require_once("embed/header.php"); ?>
	<title><?php echo $title; ?></title>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo $icon; ?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<?php echo $head_rsc; ?>

</head>
<body>

<input type="checkbox" id="navibar" class="NaviBar_chk navibar-chk" hidden />
<div class="header"><div class="u-wrap">
	<label class="shrMenu_btn shr-menu-btn" for="navibar"><span></span><b><?php echo $municipal; ?></b></label>
	<?php echo $header; ?>
</div></div>

<div class="pageBody p-body">
<div class="p-banner"><div class="p-banner-in">
	<div class="p-banner-r1">
		<div class="logo-panel">		
			<div class="logo"><img src="<?php echo $logo; ?>" alt="" /></div>
			<div class="logo-text"><?php echo $banner_txt; ?></div>
		</div>
		<?php echo $logo2; ?>
	</div>
	<div class="u-wrap">
		<div class="p-banner-r2">
			<h1>PRESS RELEASE</h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>PRESS RELEASE</b>
			</span>
		</div>		
	</div>
</div></div>

<div class="section">
	<div class="pressPage_panel event-post-panel" data-limit="10" data-page="1" >
		<div class="event-post-search">
			<form class="eventPost_form event-post-search-form">
				<input type="search" class="eventSearch_ipt" placeholder="Search" />
				<button><i class="fa fa-search"></i><p>Search</p></button>
			</form>
			<div class="pagiResult event-search-result"></div>			
		</div>
		<div class="eventPost_wrap event-post-body"></div>
		<div class="event-post-footer" >
			<div class="pagiResult evPagi_cnt paginate-count"></div>			
			<div class="pagiButtons_wrap paginate-panel">
				<div class="pagiLinks paginate-links"></div>
			</div>
		</div>
	</div>
</div>

<div class="section fff">
	<div class="pressSection_panel event-section-panel">
		<div class="h2">Latest Events</div>
		<div class="event-section-wrap"><div class="eventSection_wrap event-section-wrap-in"></div></div>		
	</div>
</div>


<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>



</body>
</html>