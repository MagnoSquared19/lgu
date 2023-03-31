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
		$col = "id,name,head,cp,address";
		$sort= ($_POST['sort']=="")?"": $_POST['sort']."- `name`,`head`,`cp`,`address`";
		$con = "(`name` LIKE '%".$_POST['uLike']."%' OR `head` LIKE '%".$_POST['uLike']."%' OR 
			`cp` LIKE '%".$_POST['uLike']."%' OR `address` LIKE '%".$_POST['uLike']."%') AND `inactive`='0' ";

		$db= new control(); echo $db->j_select(['column'=>$col,'table'=>"department",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);	
	}
		/*if($_POST['ft'] == '0-0-1')
		{
			$db= new control(); echo $db->j_select(['column'=>"id,fn",'table'=>"users",'condition'=>"inactive='0'"]);		
		}*/

	if($glevel=="1" || $glevel=="2")
	{
		if($_POST['ft'] == '0-1')
		{
			$obj= $_POST['forms_']; $tr=[]; $json= json_decode($obj);				
			foreach($json as $key => $value){ array_push($tr, (array)$value); }
			
			$db= new control(); $db_con= $db->db_conn();		$result="1"; $err=""; $succ=0; $fail=0;
			for($i=0;$i<count($tr);$i++)
			{
				$q= $db->db_insert("INSERT INTO department(`name`,`head`,`cp`,`address`) VALUES(
					'".mysqli_real_escape_string($db_con, $tr[$i]["name"])."',
					'".mysqli_real_escape_string($db_con, $tr[$i]["head"])."',
					'".mysqli_real_escape_string($db_con, $tr[$i]["phone"])."',
					'".mysqli_real_escape_string($db_con, $tr[$i]["address"])."' );	");
				
				if($q=="1"){$succ += 1;}		else{ $fail += 1; $err.= $q."<br/><br/>"; }	
			}
			mysqli_close($db_con);	echo '[{"result":"'.$result.'","id":"","error":"'.$err.'","success":"'.$succ.'","fail":"'.$fail.'"}]';
		}

		if($_POST['ft'] == '0-2')
		{
			$db= new control(); echo $db->j_select(['table'=>"department",'condition'=>"id='".$db->itoken($_POST['data_'])."'"]);
		}			
		if(isset($_POST['ft']) && $_POST['ft'] == '0-3')
		{
			$id="0"; $result=""; $err_code=""; $rID="";			
			parse_str($_POST['data_'], $fd);

			$db= new control(); $db_con= $db->db_conn();			
			$query = $db->db_update("UPDATE `department` SET	
				`name`='".mysqli_real_escape_string($db_con, $fd['name'])."',
				`head`='".mysqli_real_escape_string($db_con, $fd['head'])."',
				`cp`='".mysqli_real_escape_string($db_con, $fd['phone'])."',
				`address`='".mysqli_real_escape_string($db_con, $fd['address'])."'
				WHERE `id`='".mysqli_real_escape_string($db_con, $db->itoken($fd['smd']))."';	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'", "error":"'.$err_code.'"}]';	
		}
		if($_POST['ft'] == '0-4'){ $db= new control();  echo $db->j_delete("`department`",$_POST['newRow']); }			
	}	
}
else{ echo "SessionExpired"; }



?>