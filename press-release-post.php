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
	<?php require_once('embed/meta-press.php');
	echo "
	<meta property='og:title' content='{$title}'>	
	<meta property='og:image' content='{$image}'>
	<meta property='og:description' content='{$description}'>
	<meta property='og:url' content='".root."press-release-post.php?id={$id}'>

	<meta name='twitter:title' content=' {$title}'>
	<meta name='twitter:description' content=' {$description}'>
	<meta name='twitter:image' content=' {$image}'>
	<meta name='twitter:card' content='summary_large_image'>";
	?>

</head>
<body>

<input type="checkbox" id="navibar" class="NaviBar_chk navibar-chk" hidden />
<div class="header"><div class="u-wrap">
	<label class="shrMenu_btn shr-menu-btn" for="navibar"><span></span><b><?php echo $municipal; ?></b></label>
	<?php echo $header; ?>
</div></div>

<div class="pageBody p-body">
<div class="p-banner orange"></div>

<div class="section">
	<div class="l-wrap">
		<div class="mainPress_wrap page-load-body"></div>		
	</div>

	<div class="r-wrap">
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


<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>



</body>
</html>
