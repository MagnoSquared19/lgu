<?php 
	
	//require_once($_SERVER['DOCUMENT_ROOT']."/config/model/glocal_var.php");
	if(session_status() == PHP_SESSION_NONE){	session_start();	}
	if(isset($_SESSION['lgu']['id']))
	{
		$gid		= $_SESSION['lgu']['id'];
		$gpos		= $_SESSION['lgu']['p_id'];
		$glevel		= $_SESSION['lgu']['level'];
		$gposition	= $_SESSION['lgu']['p_name'];
		$u_mail 	= $_SESSION['lgu']['email'];
		$gtoken		= $_SESSION['lgu_token'];
		
		$full_name	= $_SESSION['lgu']['fn']." ".$_SESSION['lgu']['mn']." ".$_SESSION['lgu']['ln'];
		$first_name	= $_SESSION['lgu']['fn'];
		$middel_name= $_SESSION['lgu']['mn'];
		$last_name	= $_SESSION['lgu']['ln'];

		$fac		= $_SESSION['lgu']['fac'];
		$fam		= $_SESSION['lgu']['fam'];

		$kind		= $_SESSION['lgu']['kind'];
		$profile	= $_SESSION['lgu']['kind'];
	}
	$today = date('m/d/Y',strtotime('-24 hours'));

	/* Custom session expire * /
	$expireAfter = 30;
	if(isset($_SESSION['last_action']))
	{    
	    $secondsInactive = time() - $_SESSION['last_action'];    
	    $expireAfterSeconds = $expireAfter * 60;
	    
	    if($secondsInactive >= $expireAfterSeconds){ session_unset(); session_destroy(); }    
	}
	$_SESSION['last_action'] = time();
	/* Custom session expire end */

/*
// Check if email is valid
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){		}
*/

?>