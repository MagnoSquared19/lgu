<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php require_once("../config/model/glocal_var.php"); ?>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo $favicon; ?>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0">
    
	<title>Confirm Reset | <?php echo $Project_title; ?></title>
	
	<link rel="stylesheet" type="text/css" href="../style/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.1.3.css"/>
</head>

<body>
<?php	
	$tmpComm = "reset";
	$ProjectName = $Project_title;
	require_once("../config/model/recover.account.php");
	
	$full_name=""; $sms=""; 
	$email="";  $tmpEmail=""; $username="";
	$mobile="";	$tmpMobile=""; $sms_radio_btn = "";
	$reset_hdr = "";
		
	if(session_status() == PHP_SESSION_NONE){session_start();}
	$id 		= $_SESSION['ret']['id'];
	$full_name 	= $_SESSION['ret']['name'];
	$sms 		= $_SESSION['ret']['sms'];
	$email 		= $_SESSION['ret']['email'];	
	$username	= $_SESSION['ret']['un'];	
	$mobile 	= $_SESSION['ret']['mobile'];

	if($email)
	{
		$arrEmail = explode('@', $email);
		
		$fchar = substr($arrEmail[0], 0, 1);
		$mchar = "";
		$lchar = substr($arrEmail[0], -1);
		
		for($i=0;$i<strlen($arrEmail[0]);$i++){	$mchar .= "*";	}		
		$tmpEmail = $fchar.$mchar.$lchar."@".$arrEmail[1];
		
		$email_radio_btn = "
			<label for='login-email' class='login-reset-label'>
				<input type='radio' class='login-reset-rad' name='reset' id='login-email' value='email' checked >
				<div class='login-reset-txt'>Email me a link to reset my password<br/>".$tmpEmail."</div>				
			</label>";
		
	}
	if($sms == "0" && $mobile == ""){	$reset_hdr = "Use email to Reset Password?";	}
	else if($sms == "1" && $mobile != "")
	{
		$reset_hdr = "How would you like to reset your password?";		
		$tmpMobile = "+**********".substr($mobile, -2);
		
		$sms_radio_btn = "
			<label for='login-sms' class='login-reset-label'>
				<input type='radio' class='login-reset-rad' name='reset' id='login-sms' value='sms'>
				<div class='login-reset-txt'>Text me a code to reset my password<br/>".$tmpMobile."</div>
			</label>";
	}

?>

<?php
$base_arr = explode("/",$_SERVER['PHP_SELF']);
$lnk = 'http://'.$_SERVER['HTTP_HOST']."/".(($base_arr[1]=="login")?$base_arr[1]."/":$base_arr[1]."/login/").'update_mail.php?token=';
$mail_token = "";
$template_a = '
	<html>
		<head>
			<title>'.$ProjectName.' | Password Reset</title>			
			<style>
				table{float:left;width:100%;height:auto;}
					tr{float:left;width:100%;height:auto;}
					td{float:left;width:auto;height:auto;}
					a{float:left;width:auto;height:auto;}					
			</style>			
		</head>
	<body>
		<table>
			<tr>
				<td style="font-size:25px;font-weight:bold; margin-bottom:0px;">Password Reset Information</td>
			</tr>
			<tr>
				<td>This link is valid for 1 use only. It will expire in 5 hours.</td>
			</tr>			
			<tr style="float:left;width:100%;height:auto;margin-top:25px;margin-bottom:15px;">
				<td>Please follow the directions below to reset your password.</td>
			</tr>
			<tr style="float:left;width:100%;height:auto;margin:20px 0px;">
				<td style="float:left;margin-left:30px;">
					<a style="text-decoration:none;	background-color:red;" href="'.$lnk;$template_b='">
						<font color="#FFFFFF" style="font-size:20px;padding:10px;border-radius:2px;	background-color:#5491d5;">Reset Your Password</font>	
					</a>
				</td>
			</tr>
			
			<tr style="float:left;width:100%;height:auto;margin-top:10px;margin-bottom:5px;">
				<td style="float:left;margin-left:30px;"><b>After you click the button above, you will be prompted to complete the following steps:</b></td>
			</tr>
			<tr>	<td style="float:left;margin-left:35px;">1. Enter your Username ( '.$username.' )</td>		</tr>
			<tr>	<td style="float:left;margin-left:35px;">2. Enter your New Password</td>	</tr>
			<tr>	<td style="float:left;margin-left:35px;">3. Confirm your New Password</td>	</tr>
			<tr>	<td style="float:left;margin-left:35px;">4. Click Continue</td>			</tr>
			
			<tr style="float:left;width:100%;height:auto;margin-top:20px;margin-bottom:5px;">
				<td> <b>NOTE!</b> If you feel you did not request a password reset and you have receive this message, please inform your admin ASAP.</td>
			</tr>
			<tr>
				<td><b>Important!</b> Nobody can change your password without access to this email.</td>
			</tr>
			<tr style="float:left;width:100%;height:auto;margin-top:20px;margin-bottom:10px;padding-top:25px;padding-bottom:25px;		background-color:#CCCCCC;	">
				<td style="float:left;width:100%;margin-left:30px;"><b>Please do not reply to this email. Emails sent to this address will not be answered.</b></td>
			</tr>
			
		</table>
	</body>
	</html>
	';


?>

<?php
	
	if(isset($_POST['reset-button']))
	{
		if($_POST['reset'] == "email")
		{			
			require_once("../config/settings/settings.php");			

			$db=new control(); $tmp_token =$db->random(30);
			$mail_token=$db->etoken($db->etoken($id)."-".$tmp_token);

			$kind=$_SESSION['ret']['kind']; $tbl="";
			if($kind=="admin"){ $tbl=" `users` "; }
			else if($kind=="driver"){ $tbl=" `driver` "; }
			else if($kind=="client"){ $tbl=" `client` "; }
						
			$db->db_update("UPDATE {$tbl} SET token='".$tmp_token."', keyword=''  WHERE id='".$id."';	");			
			
			require_once("../config/model/mailer.php");
			$to = $email;
			$subject = $Project_title." - Password Reset";
			$body = $template_a.$mail_token.$template_b;
			
			$m_result = send_mail($to, $subject, $body);
			
			if($m_result == "1")
			{	
				echo "<script>alert('Email sent! Please check your email to reset your Password.');</script>";
				?>
				<meta http-equiv="refresh" content="0;URL='/'" />
				<?php 				
			}
			else{	echo "<script>alert('$m_result');</script>";		}
		}
		else if($_POST['reset'] == "sms")
		{			
			require_once("../config/settings/settings.php");	
			
			$db = new control();
			$tmp_keyword = $db->random(6);
			
			require_once("../config/model/texter.php");
			$m_result = send_sms($mobile, "from : ".$Project_title."\nYou have request to reset your password.\n(".$tmp_keyword.") is your verification code.");
			
			if($m_result == "1")
			{
				$db->db_update("UPDATE users SET token='', keyword='".$tmp_keyword."'  	WHERE id='".$id."';	");	
				echo "<script>alert('SMS verification code were successfully sent to your cellphone. Please check your phone.');</script>";
				?>
				<meta http-equiv="refresh" content="0;URL='confirm_sms.php'" />
				<?php 
			}
			else{	echo "<script>alert('$m_result');</script>";	}
		}
	}
?>




<div class="login-page">

	<div class="login-panel"><form class="login-form" method="post">
		<div class="login-hdr">
			<img class="login-logo" src="<?php echo $logo; ?>" />
			<div class="login-text"><?php echo $Project_name; ?></div>
		</div>
		<div class="login-body">
			<div class="login-name">Name : <b class="capitalize"><?php echo $full_name; ?></b></div>	
			<?php echo $email_radio_btn; ?>
			<?php echo $sms_radio_btn; ?>
		</div>
		<div class="login-footer">
			<button class="button-r"  name="reset-button" >Continue</button>
			<a href="../login/" class="login-lnk">Return to Login Page</a>
		</div>
	</form></div>

</div>



</body>
</html>