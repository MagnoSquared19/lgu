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
	<script type='text/javascript' src='embed/model/js/about.js' ></script>

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
			<h1>ABOUT <?php echo $municipal; ?></h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>ABOUT US</b>
			</span>
		</div>		
	</div>
</div></div>

<div class="section">
	<div class="l-wrap">
		<div class="page-load-body">
			<div class="wrap pageAbout_wrap"></div>
		</div>		
	</div>

	<div class="r-wrap">
		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>PRESS RELEASE</p></div>
			<div class="pressBody_wrap widget-post"></div>			
		</div></div>
		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>EVENTS / ACTIVITIES</p></div>
			<div class="eventsBody_wrap widget-post"></div>			
		</div></div>


		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>FOLLOW ON FACEBOOK</p></div>
			<?php echo $fb_page; ?>			
		</div></div>
		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>ON INSTAGRAM</p></div>			
		</div></div>

	</div>

</div>

<div class="section fff">
	<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.210465804974!2d123.71087231493414!3d13.149120290739608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a103fde149cbbf%3A0x7b4b02673d0e2d7f!2sDaraga%20Municipal%20Hall!5e0!3m2!1sen!2sph!4v1602172211438!5m2!1sen!2sph" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
</div>



<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>



</body>
</html>
