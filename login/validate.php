<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php require_once("../config/model/glocal_var.php"); ?>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo $favicon; ?>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />   	
	<title>Reset Validation | <?php echo $Project_title; ?></title>	
	<link rel="stylesheet" type="text/css" href="../style/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.1.3.css"/>	

</head>

<body>
<?php	
	$tmpComm = ""; $search_error = "";

	if(empty($_POST['UserInfo']) && isset($_POST['UserInfo'])){ $search_error="The e-mail field is required."; }
	else
	{
		if(isset($_POST['cancel_submit']))
		{
			echo "Loading.Please wait...";	?>	<meta http-equiv='refresh' content='0;url=../' />	<?php	exit();
		}
		if(isset($_POST['search-button']))
		{
			$tmpComm = "search";
			require_once("../config/model/recover.account.php");
		}
	}	
?>


<div class="login-page">

	<div class="login-panel"><form class="login-form" method="post">
		<div class="login-hdr">
			<img class="login-logo" src="<?php echo $logo; ?>" />
			<div class="login-text"><?php echo $Project_name; ?></div>			
		</div>
		<div class="login-bodyX green">
			<div class="login-ipt-fr" >	
				<div class="ipt-lbl">Enter your Email, Phone Number or Username to Search your Account.</div>					
				<input type="text" class="login-ipt" name="UserInfo" required placeholder="e.g. myemail@gmail.com" autofocus autocomplete="off" />
				<div class="login-ico fa fa-envelope"></div>	
			</div>
		</div>
		<div class="login-footer">		
			<div class="login-error"><?php echo $search_error; ?></div>	
			<button class="button-r" name="search-button" >Submit</button>
			<a href="../login/" class="login-lnk">Return to Login Page</a>
		</div>
	</form></div>

</div>


</body>
</html>