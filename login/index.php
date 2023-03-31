<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php 
		require_once("../config/settings/settings.php");
		require_once("../config/model/login.php"); 
		require_once("../config/model/glocal_var.php"); 

		echo "<link rel='shortcut icon' type='image/x-icon' href='$favicon' />";
		echo "<title>Login | $Project_title</title>";
	?>
	
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />	

	<link rel="stylesheet" type="text/css" href="../style/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.1.3.css"/>
	<link rel="stylesheet" type="text/css" href="../style/structure.2.7.css"/>

	<script type="text/javascript" src="../js/jquery.js" 	></script>	
	<script type="text/javascript" src="../js/jquery.ui.js"	></script>
	<script type="text/javascript" src="../js/global.2.7.js"	></script>	
	
	
	
</head>
<body>

<div class="login-page">

	<div class="login-panel"><form class="login-form" method="post">
		<div class="login-hdr">
		<?php 
			echo "<img class='login-logo' src='$logo' />";
			echo "<div class='login-text'>$Project_name</div>";
		?>			
		</div>
		<div class="login-body">
			<div class="login-ipt-fr" >										
				<input type="text" class="login-ipt" name="userN" required placeholder="Username" autofocus autocomplete="off" />
				<div class="login-ico fa fa-user-circle-o"><i></i></div>	
			</div>
			<div class="PwIpt_fr login-ipt-fr" >	
				<input type="password" class="login-ipt" name="passW" required placeholder="Password" />
				<div class="login-ico fa fa-key"><i></i></div>
				<div class="EyeIpt_btn login-pw-ico fa fa-eye"><i></i></div>
			</div>			
		</div>
		<div class="login-footer">		
			<div class="login-error"><?php echo $login_error; ?></div>	
			<button class="button-r"  name="login-button" >Login</button>
			<a href="validate.php" class="login-lnk">Forget Password?</a>
			<div class="login-home-lnk"><a href="../"><i class="fa fa-arrow-left"></i>Back to Home Page?</a> </div>
		</div>
	</form></div>

</div>


</body>
</html>