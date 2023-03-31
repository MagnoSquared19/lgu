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

<div class="section">
	<?php require_once('config/model/page_unavailable.php'); ?>
</div>
<div class="section"></div>
<div class="section"></div>

<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>


</body>
</html>