<?php 

if(session_status() == PHP_SESSION_NONE){ session_start(); }
	
/*$host=strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,strpos( $_SERVER["SERVER_PROTOCOL"],'/'))).'://'.$_SERVER['SERVER_NAME']."/";
$root= explode("config", str_replace("\\","/",dirname(__FILE__)))[0]; 
//$root= $_SERVER['DOCUMENT_ROOT']."/";*/

$g_protocol = ( (! empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') || (! empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (! empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') )?"https":"http";

$root= explode("config", str_replace("\\","/",dirname(__FILE__)))[0];
$dir = str_replace($_SERVER['DOCUMENT_ROOT']."/", "", $root);
$host = $g_protocol.'://'.$_SERVER['SERVER_NAME']."/".$dir;

$meta_ssl = ($g_protocol=="https://")?"<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'>":"";

function random($length=10) 
{
   $string = '';
   $characters = "123456789ABCDEFHJKLMNPRTVWXYZabcdefghijklmnopqrstuvwxyz";
   for($p = 0; $p < $length; $p++){ $string .= $characters[mt_rand(0, strlen($characters)-1)]; }
   return $string;
}

	$Project_title	="SILANG SYSTEM";
	$Project_name	="<b>SILANG</b> SYSTEM";
	$municipal		="SILANG";
	$favicon = $host."images/favicon.ico?".random();
	$logo = $host."images/icons/logo.png?".random();
	
	if(isset($_SESSION['lgu']['id']))
	{
		$iName  = $_SESSION['lgu']['fn']." ".$_SESSION['lgu']['ln']; $iPos=$_SESSION['lgu']['p_name'];		
	}
	$sidebar= (isset($_SESSION['lgu']['sidebar'])?(($_SESSION['lgu']['sidebar'])?"1":"0"):"");



?>