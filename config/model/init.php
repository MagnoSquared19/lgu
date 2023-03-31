<?php
spl_autoload_register(function($class)
{
	/*
	$base_arr = explode("/",$_SERVER['PHP_SELF']);
	$_iniBasepath = $_SERVER['DOCUMENT_ROOT']."/".$base_arr[1]."/";
	require_once $_iniBasepath."config/control/{$class}.php";
	//require_once(__DIR__."/{$class}.php");	
	*/


	require_once rtrim(dirname(__FILE__),'model')."control/{$class}.php";		//Server side

});
?>