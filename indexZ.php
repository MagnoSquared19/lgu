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
	echo "

	<link rel='stylesheet' type='text/css' href='style/slick.css'>
	<script type='text/javascript' src='js/slick.js' charset='utf-8'></script>
	<script type='text/javascript' src='".host."embed/model/js/index.1.0.js' ></script>
	";
?>
</head>
<body>

<?php /*echo $header;*/ ?>






<?php/* require_once('embed/footer.php'); echo $footer; echo $navibar;*/  ?>


</body>
</html>