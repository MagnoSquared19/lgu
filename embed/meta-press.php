<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";
	$_POST['valid'] = "0";
	$_POST['uLike'] = "";
	$_POST['sort']="";
	$_POST['page']="150,1";
	$_POST['type']="1";
	$_POST['id']="9";
}


if(isset($_GET['id']))
{
	require_once("config/settings/settings.php");

	$db= new control();  $db_con= $db->db_conn();
	$q= $db->db_gen("SELECT id,title,description FROM `press_release` WHERE inactive='0' AND id='".$_GET['id']."' LIMIT 1;");
	if($db->hasError){ }
	else
	{
		$r=mysqli_fetch_array($q);
		$id= $r['id'];
		$title= $r['title'];
		$description= strip_tags($r['description']);
		$image= $db->j_profile("account/files/press_release/{$id}","images/files/no-image-long.png");
	}

}
else{ echo "SessionExpired"; }


?>