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
		$dte = ($_POST['dFr']!="" && $_POST['dTo']!="")?" AND `dated` BETWEEN '".$_POST['dFr']."' AND '".$_POST['dTo']."' ":"";
		$con = "(`name` LIKE '%".$_POST['uLike']."%' OR 
			`bulletin_no` LIKE '%".$_POST['uLike']."%' OR 
			`particulars` LIKE '%".$_POST['uLike']."%' OR 
			`changes` LIKE '%".$_POST['uLike']."%') AND `inactive`='0' ".$dte;

		$col = "id,name,bulletin_no,dated,particulars,changes";
		$sort= ($_POST['sort']=="")?"10-dated": $_POST['sort']."- `name`,`bulletin_no`,`dated`,`particulars`,`changes`";

		$db= new control(); echo $db->j_select(['column'=>$col,'table'=>"bid_supplement",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);	
	}

	if($glevel=="1" || $glevel=="2")
	{
		if($_POST['ft'] == '0-1')
		{
			$obj= $_POST['forms_']; $tr=[]; $json= json_decode($obj);				
			foreach($json as $key => $value){ array_push($tr, (array)$value); }
			
			$db= new control(); $db_con= $db->db_conn();		$result="1"; $err=""; $succ=0; $fail=0;
			for($i=0;$i<count($tr);$i++)
			{
				$q= $db->db_insert("INSERT INTO bid_supplement(`name`,`bulletin_no`,`dated`,`changes`,`particulars`) VALUES(
					'".mysqli_real_escape_string($db_con, $tr[$i]["name"])."',
					'".mysqli_real_escape_string($db_con, $tr[$i]["bulletin_no"])."',
					'".mysqli_real_escape_string($db_con, $tr[$i]["dated"])."',
					'".mysqli_real_escape_string($db_con, $tr[$i]["changes"])."',
					'".mysqli_real_escape_string($db_con, $tr[$i]["particulars"])."' );	");
				
				if($q=="1"){$succ += 1;}		else{ $fail += 1; $err.= $q."<br/><br/>"; }	
			}
			mysqli_close($db_con);	echo '[{"result":"'.$result.'","id":"","error":"'.$err.'","success":"'.$succ.'","fail":"'.$fail.'"}]';
		}

		if($_POST['ft'] == '0-2')
		{
			$db= new control(); echo $db->j_select(['table'=>"bid_supplement",'condition'=>"id='".$db->itoken($_POST['data_'])."'"]);
		}			
		if(isset($_POST['ft']) && $_POST['ft'] == '0-3')
		{
			$id="0"; $result=""; $err_code=""; $rID="";			
			parse_str($_POST['data_'], $fd);

			$db= new control(); $db_con= $db->db_conn();			
			$query = $db->db_update("UPDATE `bid_supplement` SET	
				`name`='".mysqli_real_escape_string($db_con, $fd['name'])."',
				`bulletin_no`='".mysqli_real_escape_string($db_con, $fd['bulletin_no'])."',
				`dated`='".mysqli_real_escape_string($db_con, $fd['dated'])."',
				`changes`='".mysqli_real_escape_string($db_con, $fd['changes'])."',
				`particulars`='".mysqli_real_escape_string($db_con, $fd['particulars'])."'
				WHERE `id`='".mysqli_real_escape_string($db_con, $db->itoken($fd['smd']))."';	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'", "error":"'.$err_code.'"}]';	
		}
		if($_POST['ft'] == '0-4'){ $db= new control();  echo $db->j_delete("`pattern`",$_POST['newRow']); }			
	}	
}
else{ echo "SessionExpired"; }



?>