<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";
	$_POST['valid'] = "20-0";
	$_POST['uLike'] = "";
	$_POST['sort']="";
	$_POST['page']="150,1";
	$_POST['type']="1";
	$_POST['id']="9";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}

if(isset($_POST['token']) && $_POST['token'] == "0")
{
	require_once("../../config/settings/settings.php");

	if(isset($_POST['valid']) && $_POST['valid'] == '0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,description FROM `business_requirements` WHERE inactive='0' ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/business_requirements/".$r['id'],null,['array'=>true]);				
				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'description'=>$r['description'], 'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}

	


	
}
else{ echo "SessionExpired"; }


?>