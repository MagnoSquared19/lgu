<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php require_once("embed/header.php"); ?>
	<title><?php echo $title; ?></title>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo $icon; ?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<?php echo $head_rsc; ?>
	<script type='text/javascript' src='embed/model/js/transparency.js' ></script>
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
			<h1>LOCAL/BUDGET AND FINANCE</h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>LOCAL/BUDGET AND FINANCE</b>
			</span>
		</div>		
	</div>
</div></div>

<div class="section">
	<div class="l-wrap">
		<div class="pageLocalBudget_wrap page-load-body"></div>		
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

<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>


</body>
</html>