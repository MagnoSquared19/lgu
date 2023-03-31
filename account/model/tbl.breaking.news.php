<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";	
	$_POST['fb'] = "27";
	$_POST['ft'] = "0";
	$_POST['uLike'] = "";

	$_POST['dFr'] = "2016-01-01";
	$_POST['dTo'] = "2020-01-01";
	$_POST['sort']= "";
	$_POST['page']= "15,1";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}

require_once("../../config/model/global_var.php");
if(isset($gid) && isset($_POST['token']) && isset($_POST['fb']))
{	
	require_once("../../config/settings/settings.php");	
	if($_POST['ft'] == '0')
	{							
		$col = "id,dated,title,description";
		$sort= ($_POST['sort']=="")?"": $_POST['sort']."- `title`,`dated`,`description`";
		$con = "(`title` LIKE '%".$_POST['uLike']."%' OR `dated` LIKE '%".$_POST['uLike']."%' OR 
				`description` LIKE '%".$_POST['uLike']."%') AND `inactive`='0' ";

		$db= new control(); 
		echo $db->j_select(['column'=>$col,'table'=>"breaking_news",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
	}
		/*if($_POST['ft'] == '0-0-1')
		{
			$db= new control(); echo $db->j_select(['column'=>"id,fn",'table'=>"users",'condition'=>"inactive='0'"]);		
		}*/

	if($glevel=="1" || $glevel=="2")
	{
		if($_POST['ft']=='0-1')
		{
			$id="0"; $result=""; $err_code=""; $rID="";			
			parse_str($_POST['data_'], $fd);
			
			$db = new control();
			$db_con = $db->db_conn();
			$query = $db->db_insert("INSERT INTO breaking_news(`dated`,`title`,`description`) VALUES(
				'".mysqli_real_escape_string($db_con, $fd['date'])."',
				'".mysqli_real_escape_string($db_con, $fd['title'])."',
				'".mysqli_real_escape_string($db_con, str_replace(",","",$fd['desc']))."' );	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($rID).'", "error":"'.$err_code.'"}]';				
		}
		if($_POST['ft']=='0-2')
		{
			$db = new control(); 
			echo $db->j_select(['table'=>"breaking_news",'condition'=>"id='".$db->itoken($_POST['data_'])."'"]);
		}			
		if($_POST['ft']=='0-3')
		{
			$id="0"; $result=""; $err_code=""; $rID="";			
			parse_str($_POST['data_'], $fd);

			$db = new control(); $db_con = $db->db_conn();			
			$query = $db->db_update("UPDATE `breaking_news` SET	
				`dated`='".mysqli_real_escape_string($db_con, $fd['date'])."',
				`title`='".mysqli_real_escape_string($db_con, $fd['title'])."',
				`description`='".mysqli_real_escape_string($db_con, $fd['desc'])."'
				WHERE `id`='".mysqli_real_escape_string($db_con, $db->itoken($fd['smd']))."';	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'","error":"'.$err_code.'"}]';	
		}
		if($_POST['ft']=='0-4'){ $db= new control();  echo $db->j_delete("`breaking_news`",$_POST['newRow']); }		
	}	
}
else{ echo "SessionExpired"; }

?>