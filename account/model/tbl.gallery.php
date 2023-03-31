<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";	
	$_POST['fb'] = "27";
	$_POST['ft'] = "0";
	$_POST['uLike'] = "";
	$_POST['sort']="";
	$_POST['page']="15,1";
	$_POST['tpe']="0";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}
require_once("../../config/model/global_var.php");

if(isset($gid) && isset($_POST['token']) && $_POST['token'] == "0")
{
	require_once("../../config/settings/settings.php");	
	if(isset($_POST['ft']) && $_POST['ft'] == '0')
	{
		$db= new control(); 
		$rst= array('admin'=>($glevel=="1" || $glevel=="2")?"1":"0", "files"=>$db->get_file_info("account/files/gallery",null,['array'=>true]));
		echo json_encode([$rst]);	
	}

	if($glevel=="1" || $glevel=="2")
	{
		if(isset($_POST['ft']) && $_POST['ft'] == '0-1')
		{
			if(isset($_FILES['data_']))
			{
				$fle_err= $_FILES['data_']['error'];
				if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload = gUploader(null,null,"../files/gallery/","data_",null, '900',"900", "false"); }
			}					
			echo '[{"result":"1"}]';			
		}		

		if(isset($_POST['ft']) && $_POST['ft'] == '0-3')
		{
			require_once("../../config/model/glocal_var.php"); $path = $root."account/files/gallery/";
			
			$name= str_replace($host."account/files/gallery/", "", $_POST['old']);
			$obj= explode(".", $name); $ext= end($obj);
			parse_str($_POST['data_'], $fd);

			$result= rename($path.$name, $path.$fd['title'].".".end($obj));
			echo json_encode([array('result'=>$result,'name'=>$fd['title'])]);
		}
		if(isset($_POST['ft']) && $_POST['ft'] == '0-4')
		{ 
			require_once("../../config/model/glocal_var.php"); $path = $root."account/files/gallery/";
			$name= str_replace($host."account/files/gallery/", "", $_POST['old']);
			echo unlink($path.$name);
		}
	}
				
	
}
else{ echo "SessionExpired"; }


?>