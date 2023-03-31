<?php 


$x_protocol = ( (! empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') || (! empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (! empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') )?"https":"http";

$xroot= explode("config", str_replace("\\","/",dirname(__FILE__)))[0];
$xdir = str_replace($_SERVER['DOCUMENT_ROOT']."/", "", $xroot);

require_once($_SERVER['DOCUMENT_ROOT']."/{$xdir}config/model/glocal_var.php");
require_once($_SERVER['DOCUMENT_ROOT']."/{$xdir}config/model/global_var.php");
require_once($_SERVER['DOCUMENT_ROOT']."/{$xdir}config/settings/settings.php");

//$db= new control(); $db_con= $db->db_conn();
//$query = $db->db_gen("UPDATE `user_logs` SET `logout`=NOW() WHERE `user_id`='{$gid}' AND `logout`='0000-00-00 00:00:00' ORDER BY id	DESC LIMIT 1;");	

echo '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link rel="shortcut icon" type="image/x-icon" href="'.$host.'images/favicon.ico"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<title>Logout Page | Redirecting to Login</title>
	<link rel="stylesheet" type="text/css" href="'.$host.'account/style/theme.1.4.css"/>	
	<link rel="stylesheet" type="text/css" href="'.$host.'style/theme.1.3.css"/>	
</head>
<body class="body">

<div class="logout-body">
	<div class="logout-fr">
		<div class="ldg-bar"><div></div><div></div><div></div></div>
		<div class="logout-txt">Logging Out, Please wait... <br/>You will be returned to Login page.</div>
	</div>
</div>

</body>
</html>';

resetPage();
function resetPage(){ session_destroy(); header("Location: ../../login/"); die(); }

?>







