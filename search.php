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
	<script type='text/javascript' src='embed/model/js/search.js' ></script>

</head>
<body>
<?php echo $header; ?>
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
			<h1>GENERAL SEARCH</h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>SEARCH</b>
			</span>
		</div>		
	</div>
</div></div>

<div class="section">
	<div class="l-wrap"><div class="pageAbout_wrap page-load-body">
		<div class="wrap" id="eventPanel" data-page="0" data-limit="5" >
			<form class="pageSearch_form ui-post-search-wrap">
				<div class="s-search-iptX ui-post-search">
					<input type="search" class="pageSearch_ipt" name="search" placeholder="Search" /><button name="seach_button"><i class="fa fa-search"></i></button>
				</div>
				<!-- <select name="status" class="searchFilter_sel s-search-sel" required >
					<option id="" value="0" selected >ALL RECORDS</option>
					<option id="1" value="1">ONLINE TRANSACTION</option>
					<option id="2" value="2">PRESS RELEASE</option>
					<option id="3" value="3">EVENTS/ ACTIVITIES</option>
				</select> -->
				<div class="searchNum_rows ui-post-search-count">0 Result</div>
			</form>
			<div class="eventPost_filtered ui-post-filtered"></div>
			<div class="searchLoad_wrap ui-post-loaded"></div>	
		</div>
	</div></div>

	
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

	</div>

</div>


<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>



</body>
</html>
