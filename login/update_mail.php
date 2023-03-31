<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php require_once("../config/model/glocal_var.php"); ?>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo $favicon; ?>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />

	<title>Reset Login Credentials | <?php echo $Project_title; ?></title>
	
	<link rel="stylesheet" type="text/css" href="../style/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.1.3.css"/>
	<link rel="stylesheet" type="text/css" href="../style/structure.2.7.css"/>			
	<script src="../js/jquery.js" type="text/javascript"></script>	
	<script src="../js/global.2.7.js" type="text/javascript"></script>	

</head>

<body>
<?php
	$error_show = "";
	$error_btn = "";	
	$username = "";
	$foc1="autofocus "; $foc2="";
	
	if(isset($_GET['token']))
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
					$db=new control(); $db_con=$db->db_conn();

					$tToken=explode("-", $db->itoken($_GET['token']));
					$id=mysqli_real_escape_string($db_con, $db->itoken($tToken[0]));
					$token=mysqli_real_escape_string($db_con, $tToken[1]);	

					$q=$db->db_gen("SELECT id,@kind := '1' AS kind FROM `users` WHERE id='{$id}' AND token='{$token}';");
					
					if(mysqli_num_rows($q) > 0)
					{
						$r=mysqli_fetch_array($q); $tbl="";
						if($r['kind']=="1"){ $tbl=" `users` "; }
						else if($r['kind']=="2"){ $tbl=" `members` "; }	

						$query = $db->db_update("UPDATE {$tbl} SET token='', 
							un='".mysqli_real_escape_string($db_con, $_POST['userN'])."',
							pw=sha1('".mysqli_real_escape_string($db_con, $_POST['nPass'])."')	
							WHERE id='{$id}';	");			
						$result = ($query == "1") ? "1":$query;
						if($result == "1")
						{
							echo "<script>alert('New Password was successfully saved.');</script>";
							?> <meta http-equiv="refresh" content="0;URL='/login/'" /> <?php 
						}
					}
					else
					{
						$username = $_POST['userN'];
						$error_show = "<b>Error in : </b> Token already expired. It is recommended that you request another <a href='reset.php' style='color:#1778cb;'> Password Reset.</a>";
					}
					mysqli_close($db_con);	
				}
				else
				{	
					$username=$_POST['userN']; 
					$error_show = "<b>Error in : </b> Less than 6 characters in password. Please add character to your password.";	
				}				
			}
			$foc1=""; $foc2="autofocus ";
		}
	}
	else{ $error_show = "<b>Error in : </b> Token Required. Please contact the System Administrator."; $error_btn = "disabled"; }	
?>

<div class="login-page">

	<div class="login-panel"><form class="login-form" method="post">
		<div class="login-hdr">
			<img class="login-logo" src="<?php echo $logo; ?>" />
			<div class="login-text"><?php echo $Project_name; ?></div>
		</div>
		<div class="login-body">
			<b class="login-c-lbl">PASSWORD RESET</b>	
			<i class="login-c-inf">We recommend that you use special characters with your password. All fields below are required.</i>			
			<div class="login-ipt-fr" >	
				<div class="ipt-lbl">New Username</div>									
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
			<button class="button-r" <?php echo $error_btn; ?> name="confirm_submit" >Save</button>
			<a href="../login/" class="login-lnk">Return to Login Page</a>
		</div>
	</form></div>

</div>







</body>
</html>