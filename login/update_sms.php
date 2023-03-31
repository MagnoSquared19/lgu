<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<link rel="shortcut icon" type="image/x-icon" href="../img/icon.ico"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
    <?php require_once("../config/model/glocal_var.php"); ?>
	<title>Reset Login Credentials | <?php echo $Project_title; ?></title>
	
	<link rel="stylesheet" type="text/css" href="../style/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.1.3.css"/>
	<link rel="stylesheet" type="text/css" href="../style/structure.2.7.css"/>

	<script type="text/javascript" src="../js/jquery.js" 	></script>	
	<script type="text/javascript" src="../js/jquery.ui.js"	></script>
	<script type="text/javascript" src="js/global.2.7.js"	></script>	

</head>

<body>
<?php
	$error_show = "";
	$error_btn = "";	
	$username = "";
	$foc1="autofocus "; $foc2="";
	
	session_start();
	if(!isset($_SESSION['sms']['id']))
	{
		session_destroy();
		require("../config/model/validate.php");
	}
	else
	{
		if(isset($_POST['confirm_submit']))
		{
			$username=$_POST['userN']; 			
			if($_POST['nPass'] != $_POST['cPass'])
			{
				$username = $_POST['userN'];
				$error_show = "<b>Error in : </b> New Password and Confirm Password must be the same.";
			}
			else
			{
				if(strlen($_POST['nPass']) > 5)
				{
					require_once("../config/settings/settings.php");
					$db = new control();
					
					$ID = $_SESSION['sms']['id'];
					
					$db_con = $db->db_setConn();
					$query = $db->db_update("UPDATE users SET keyword='',  
						un='".mysqli_real_escape_string($db_con, $_POST['userN'])."',	
						pw=sha1('".mysqli_real_escape_string($db_con, $_POST['nPass'])."')	
						WHERE id='".mysqli_real_escape_string($db_con, $ID)."';	");			
					$result = ($query == "1") ? "1":$query;
					if($result == "1")
					{
						echo "<script>alert('New Password was successfully saved.');</script>";
						?>
						<meta http-equiv="refresh" content="0;URL='/'" />
						<?php 
					}
					mysqli_close($db_con);
				}
				else{ $error_show = "<b>Error in : </b> Less than 6 characters in password. Please add character to your password."; }				
			}
			$foc1=""; $foc2="autofocus ";
		}
	}
?>

<div class="login-page">

	<div class="login-panel"><form class="login-form" method="post">
		<div class="login-hdr">
			<img class="login-logo" src="../img/icons/logo.png" />
			<div class="login-text"><?php echo $Project_name; ?></div>
		</div>
		<div class="login-body">
			<b class="login-c-lbl">PASSWORD RESET</b>	
			<i class="login-c-inf">We recommend that you use special characters with your password. All fields below are required.</i>			
			<div class="login-ipt-fr" >	
				<div class="ipt-lbl">Old Username</div>									
				<input type="text" class="login-ipt" name="userN" required placeholder="New Username *" value="<?php echo $username; ?>" 
				<?php echo $foc1; ?> autocomplete="off" />
				<div class="login-ico fa fa-user-circle-o"><i></i></div>	
			</div>
			<div class="PwIpt_fr login-ipt-fr" >	
				<div class="ipt-lbl">New Password</div>	
				<input type="password" class="login-ipt" name="nPass" required placeholder="New Password *" autofocus <?php echo $foc2; ?> />
				<div class="login-ico fa fa-key"><i></i></div>
				<div class="EyeIpt_btn login-pw-ico fa fa-eye"><i></i></div>	
			</div>
			<div class="PwIpt_fr login-ipt-fr" >	
				<div class="ipt-lbl">Conrfirm Password</div>	
				<input type="password" class="login-ipt" name="cPass" required placeholder="Conrfirm Password *" />
				<div class="login-ico fa fa-copy"><i></i></div>
				<div class="EyeIpt_btn login-pw-ico fa fa-eye"><i></i></div>
			</div>
		</div>
		<div class="login-footer">		
			<div class="login-error"><?php echo $error_show; ?></div>
			<button class="button-r"  name="confirm_submit" >Save</button>
			<a href="../login/" class="login-lnk">Return to Login Page</a>
		</div>
	</form></div>

</div>

</body>
</html>