<?php

/*$host=strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,strpos( $_SERVER["SERVER_PROTOCOL"],'/'))).'://'.$_SERVER['SERVER_NAME']."/";
$jroot= $_SERVER['DOCUMENT_ROOT']."/";*/


$protocol = ( (! empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') || (! empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (! empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') )?"https":"http";

$jroot= explode("config", str_replace("\\","/",dirname(__FILE__)))[0];
$jdir = str_replace($_SERVER['DOCUMENT_ROOT']."/", "", $jroot);
$host = $protocol.'://'.$_SERVER['SERVER_NAME']."/".$jdir;

require_once($jroot."config/model/init.php");

function random_code($length=10) 
{
   $string = '';
   $characters = "123456789ABCDEFHJKLMNPRTVWXYZabcdefghijklmnopqrstuvwxyz";
   for($p = 0; $p < $length; $p++){ $string .= $characters[mt_rand(0, strlen($characters)-1)]; }
   return $string;
}

function dbDate($myDate)
{
	if(strpos($myDate, "/")!== false){	$myDate = str_replace("/",'-',$myDate);	}
	
	if(strpos($myDate, "-") !== false){	$tmpDateF 	= explode("-",$myDate);		}
	else{	$tmpDateF 	= explode("/",$myDate);			}
	
	if(strlen($tmpDateF[0])>=4)
	{
		$tmpYearF	= substr($tmpDateF[0], 0, 4);
		if($tmpDateF[1]>12)
		{
			$tmpMonthF	= substr($tmpDateF[2], 0, 2);
			$tmpDayF	= substr($tmpDateF[1], 0, 2);
		}
		else
		{
			$tmpMonthF	= substr($tmpDateF[1], 0, 2);
			$tmpDayF	= substr($tmpDateF[2], 0, 2);
		}
	}
	else if(strlen($tmpDateF[1])>=4)
	{
		$tmpYearF	= substr($tmpDateF[1], 0, 4);
		if($tmpDateF[0]>12)
		{
			$tmpMonthF	= substr($tmpDateF[2], 0, 2);
			$tmpDayF	= substr($tmpDateF[0], 0, 2);
		}
		else
		{
			$tmpMonthF	= substr($tmpDateF[1], 0, 2);
			$tmpDayF	= substr($tmpDateF[2], 0, 2);
		}
	}
	else if(strlen($tmpDateF[2])>=4)
	{
		$tmpYearF	= substr($tmpDateF[2], 0, 4);
		if($tmpDateF[0]>12)
		{
			$tmpMonthF	= substr($tmpDateF[1], 0, 2);
			$tmpDayF	= substr($tmpDateF[0], 0, 2);
		}
		else
		{
			$tmpMonthF	= substr($tmpDateF[0], 0, 2);
			$tmpDayF	= substr($tmpDateF[1], 0, 2);
		}
	}	
	$newDate = $tmpYearF."-".$tmpMonthF."-".$tmpDayF;
	
	return $newDate;
}

function jInt($s)	 { return ($s!="" || $s!=null)?$s:0; 		  }
function jDecimal($s){ return str_replace(",","",(($s!="" || $s!=null)?$s:"0")); }
function jToJson($s) { return '['.str_replace("\r\n", '\r\n', $s).']'; }
function jUCWords($s){ return mb_convert_case($s, MB_CASE_TITLE, "UTF-8"); }
function jUCTrim($s) { return trim(mb_convert_case($s, MB_CASE_TITLE, "UTF-8")); }
function jPercentage($number,$total)
{
	if($total > 0){ return round(($number * 100) / $total,2); } 
	//if($total > 0){ return round($number * ($total / 100),2); } 
	else{ return 0; }
}

function appString($str){ return str_replace("'", "''", json_encode($str)); }
function fileName($name=""){ return str_replace(array('\\','/',':','*','?','"','<','>','|'),'',$name); }

function setBase64($path)
{
	$type = pathinfo($path, PATHINFO_EXTENSION);
	$data = file_get_contents($path);
	return base64_encode($data);
}


function dbString($con,$str){ return mysqli_real_escape_string($con,htmlentities($str)); }

function mailVeriCode($code)
{
	$message = "
	<html>
		<head>
			<title>SILANG System | Validation Code</title>			
			<style>
				table{float:left;width:100%;height:auto;}
					tr{float:left;width:100%;height:auto;}
					td{float:left;width:auto;height:auto;}
					a{float:left;width:auto;height:auto;}
					h1{line-height:25px;margin:0px; letter-spacing: 3px; color:#0b5428; }				
			</style>			
		</head>
		<body>
			<tr><td><h3>VALIDATION CODE</h3></td></tr>
			<tr><td>To complete your Registration or Account Validation on Triskelion System, verification code is required to help us validate your identity.</td></tr>
			<tr><td>This ensures we have the right email in case we need to contact you.</td></tr>
			<tr><td style='margin-top:20px;'>Your Verification Code :</td></tr>
			<tr><td><h1>{$code}</h1></td></tr>
			<tr><td style='margin-top:20px;'>This code is valid for 1 use only. It will expire in 24 hours.</td></tr>	
		</body>
	</html>";

	return $message;
}

/*
settings.php
control.php
glocal_var.php
login.php
logout.php
validate.php

global.2.7.js
global.2.8.js

embed/header.php
embed/footer.php

*/

/* SESSION
global_var.php
login.php
control.php

*/




?>