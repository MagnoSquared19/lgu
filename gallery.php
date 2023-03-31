<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php require_once("embed/header.php"); ?>
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
<div class="Gallery_banner p-banner"><div class="p-banner-in">
	<div class="p-banner-r1">
		<div class="logo-panel">		
			<div class="logo"><img src="<?php echo $logo; ?>" alt="" /></div>
			<div class="logo-text"><?php echo $banner_txt; ?></div>
		</div>
		<?php echo $logo2; ?>
	</div>
	<div class="u-wrap">
		<div class="p-banner-r2">
			<h1>PHOTOS AND VIDEOS</h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>IMAGES AND VIDEOS</b>
			</span>
		</div>		
	</div>
</div></div>

<div class="Gallery_panel section c"><div class="fix-fr">
	<div class="h2">FEATURED PHOTOS</div>
	<div class="g-sub-lnk">
		<a href="gallery.php" class="GalleyHome_lnk lnk">MAIN PHOTOS <i class="fa fa-chevron-right"></i></a>
		<b class="GalAlbum_name"></b>
	</div>
	<div class="wrap"><div class="Gallery_wrap fix-gallery g-photos"></div></div>
</div></div>


<div class="section c fff"><div class="fix-fr">
	<div class="h2">PHOTO / VIDEO ALBUM</div>
	<div class="g-album-wrap"><div class="Album_wrap fix-album g-photos"></div></div>
</div></div>


<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>


<script type="text/javascript">
$(document).ready(function(e)
{
	//getPhotos();

});
</script>


</body>
</html>