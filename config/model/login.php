<?php

//require_once("db.php");
//require_once("config/control/db.php");
//require_once("global_var.php");

class login extends db
{	
	public $xroot;

	public $newConn;	
	public function __construct(){	}	
	public function validate()
	{
		$result = "";
		if(isset($_POST['userN']) && isset($_POST['passW'])){	$result = $this->_login();	}		
		return $result;
	}	
	
	private function _login()
	{
		$result = "";
		
		$db= new control(); $db_con= $db->db_conn();
		$query = $db->db_gen("SELECT `U`.*,`P`.`name` AS `posName`,`S`.`sms` AS `s_sms`,`S`.`email` AS `s_email`
			FROM `users` `U` 
			LEFT JOIN `user_position` `P` ON `U`.`position` = `P`.`id` 
			CROSS JOIN 	`settings` `S` WHERE 
			`U`.`un`='".mysqli_real_escape_string($db_con,htmlentities($_POST['userN']))."' AND 
			`U`.`pw`=sha1('".mysqli_real_escape_string($db_con,htmlentities($_POST['passW']))."')	AND `U`.`inactive`='0';");	
		echo $db->errorVal;

		if(mysqli_num_rows($query) > 0){	$this->gen_session($query);$this->redirect();	}
		else{$result = "The Username or Password is Incorrect.";}
		
		return $result;		
	}
	private function gen_session($query_arg)
	{
		$r = mysqli_fetch_array($query_arg);		
		$_SESSION['lgu']['id']		= $r['id'];
		$_SESSION['lgu']['fn'] 	= $r['fn'];
		$_SESSION['lgu']['mn'] 	= $r['mn'];
		$_SESSION['lgu']['ln'] 	= $r['ln'];
		$_SESSION['lgu']['level'] 	= $r['level'];
		$_SESSION['lgu']['access'] = $r['access'];
		$_SESSION['lgu']['p_id']	= $r['position'];
		$_SESSION['lgu']['p_name']	= $r['posName'];
		$_SESSION['lgu']['email'] 	= $r['email'];
		$_SESSION['lgu']['cp'] 	= $r['cp'];	
		$_SESSION['lgu']['dt_reg']	= $r['dt_inserted'];
		$_SESSION['lgu']['fac']	= $r['s_sms'];
		$_SESSION['lgu']['fam']	= $r['s_email'];
		$_SESSION['lgu']['sidebar']= $r['sidebar'];
		$_SESSION['lgu_token_e'] 	= true;
		$_SESSION['lgu_token']		= $this->gen_token();

		$_SESSION['lgu']['kind']	= "admin";

		// Enable 2FA and Logs
		if($r['s_sms'] == "1" || $r['s_email'] == "1")
		{	$this->s2FA($r['id'], $r['logs_sms'], $r['logs_email'], $r['cp'], $r['email'] );	}
		else{	/*$this->logs($r['id']);*/		}
		//$this->logs($r['id']);	//	Set Logs Only
	}	
	private function logs($id_arg)
	{		
		$db = new control();
		$db_con = $db->db_conn();
		$query = $db->db_gen("INSERT INTO `user_logs`(`user_id`) VALUES('".$id_arg."');");
		mysqli_close($db_con);
	}
	private function s2FA($id_arg, $sms_logs, $email_logs, $cp_arg, $email_arg)
	{		
		$db = new control();
		$db_con = $db->db_conn();

		require_once("global_var.php");

		$log_sms = "0";
		if($fac=="1" && $sms_logs=="1" && $cp_arg!=="")
		{
			require_once("texter.php");
			$m_result = send_sms($cp_arg, "from : ".$ProjectName."\n".date("m-d-Y g:i a")."\n\nThis message is a Login Notification. You have just login from ".$ProjectName.".");

			$log_sms=($m_result=="1")?"1":"10";	
		}
		$log_email = "0";
		if($fam=="1" && $email_logs=="1" && $email_arg!=="")
		{
			require_once("mailer.php");
			$to = $email_arg;
			$subject = $ProjectName." - Login Notification";
			$body = "This message is a Login Notification.</br>You have just login from the ".$ProjectName.".</br>Server date and time :".date("m-d-Y h:i:sa");					
			$m_result = send_mail($to, $subject, $body);
			$log_email=($m_result=="1")?"1":"10";						
		}

		$query = $db->db_gen("INSERT INTO `user_logs`(`user_id`, `sms_sent`, `email_sent`)	VALUES('".$id_arg."','".$log_sms."','".$log_email."');");
		mysqli_close($db_con);
	}
	

	private function redirect()
	{
		$xroot= explode("config", str_replace("\\","/",dirname(__FILE__)))[0];
		$xdir = str_replace($_SERVER['DOCUMENT_ROOT']."/", "", $xroot);

		require_once($_SERVER['DOCUMENT_ROOT']."/{$xdir}config/model/glocal_var.php");

		echo "
		<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
			<html xmlns='http://www.w3.org/1999/xhtml'>
			<head>
				<link rel='shortcut icon' type='image/x-icon' href='{$favicon}'/>
			    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
				<meta name='viewport' content='initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no' />
				<title>Redirecting to Account Page</title>
				<link rel='stylesheet' type='text/css' href='{$host}account/style/theme.1.4.css'/>	
				<link rel='stylesheet' type='text/css' href='{$host}style/theme.1.3.css'/>	
			</head>
			<body class='body'>

			<div class='logout-body'>
				<div class='logout-fr'>
					<div class='ldg-bar'><div></div><div></div><div></div></div>
					<div class='logout-txt'>Redirecting to your Account. Please wait...</div>
				</div>
			</div>

			</body>
			</html>";		
		
		?>	<meta http-equiv='refresh' content='0;url=../account/' />	<?php	exit();		
	}
	private function gen_token()
	{
		$token = openssl_random_pseudo_bytes(16);
		return bin2hex($token);
	}
	public function set_homepage(){	$this->redirect();	}
	
}

if(session_status() == PHP_SESSION_NONE){ session_start(); }

$login_error = "";
if(isset($_SESSION['lgu']['id'])){	$page = new login();	$page->set_homepage();	}
else
{		
	if(isset($_POST['login-button']))
	{	
		$db = new login();
		$login_error = $db->validate();		
	}
}






/*			*/
$rstCookie = "";
$xZO_Port = "";
$jAdt_Serial = "";
if(isset($_COOKIE['rstCookie']) || !empty($_COOKIE['rstCookie']))
{
	$rstCookie = $_COOKIE['rstCookie'];
	if($rstCookie=="checked")
	{
		if(isset($_COOKIE['xZO_Port']) || !empty($_COOKIE['xZO_Port']))			{	$xZO_Port = encrypt_decrypt('decrypt', $_COOKIE['xZO_Port']);	}
		if(isset($_COOKIE['jAdt_Serial']) || !empty($_COOKIE['jAdt_Serial']))	{	$jAdt_Serial = encrypt_decrypt('decrypt', $_COOKIE['jAdt_Serial']);	}	
	}
}

?>