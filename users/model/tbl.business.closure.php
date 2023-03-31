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
		$con = "(`trans_no` LIKE '%".$_POST['uLike']."%' OR 
		`remarks` LIKE '%".$_POST['uLike']."%' OR 
		`remarks_admin` LIKE '%".$_POST['uLike']."%' OR 
		`bness_name` LIKE '%".$_POST['uLike']."%' OR 
		`bness_street_address` LIKE '%".$_POST['uLike']."%' OR 
		`bness_industry` LIKE '%".$_POST['uLike']."%' OR 
		`managed_by` LIKE '%".$_POST['uLike']."%' OR 
		`since` LIKE '%".$_POST['uLike']."%'
		) AND `inactive`='0' AND resi_id={$gid} ";						
		$sort= ($_POST['sort']=="")?"10-id": $_POST['sort']."- `dated`,`d_type`,`date_issued`,`bness_name`,`remarks`";		
		$col = "id,dated,remarks,remarks_admin,status,d_type,date_issued,bness_name";

		$db= new control(); 
		echo $db->j_select(['column'=>$col,'table'=>"doc_biz_closure",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
	}


	if(isset($gid))
	{
		if($_POST['ft']=='0-1-2')
		{
			$con= " `C`.`inactive`='0' AND `C`.id={$gid} ";
			$col = "id,fn,mn,ln,street_address,address_since,address_brgy,address_city,address_province";
			$img= ["users/files/users/","/profile","../images/files/blank_profile.png"];

			$que= "SELECT `C`.*,`S`.address_brgy,`S`.address_city,`S`.address_province FROM residents `C` LEFT JOIN `doc_settings` `S` ON `S`.id='1' ";

			$db= new control(); 
			echo $db->j_select(['column'=>$col,'query'=>$que,'table'=>"residents `C`",'condition'=>$con,'image'=>$img]);
		}

		if($_POST['ft']=='0-1')
		{
			$id="0"; $result=""; $err_code=""; $rID="";			
			parse_str($_POST['data_'], $fd);
			
			$db = new control(); $db_con = $db->db_conn();
			$query = $db->db_insert("INSERT INTO doc_biz_closure(`trans_no`,`resi_id`,`dated`,`remarks`,`d_type`,`bness_name`,`bness_street_address`,`bness_industry`,`managed_by`,`since`,`price`) VALUES(
				CONCAT('JX-',LEFT(REPLACE(UUID(), '-', ''), 8)),
				'".mysqli_real_escape_string($db_con, $gid)."',NOW(),
				'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
				'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_name'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_address'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_type'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_manager'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_since'])."',
				(SELECT `biz_closure_price` FROM doc_settings) );	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($rID).'", "error":"'.$err_code.'"}]';				
		}
		if($_POST['ft']=='0-2')
		{
			$rtn= []; $db= new control(); $db_con= $db->db_conn(); $qid= $db->itoken($_POST['data_']);
			$con= "`R`.`inactive`='0' AND `R`.id='{$qid}' ";
			$tbl= "doc_biz_closure `R` LEFT JOIN residents `C` ON `R`.resi_id=`C`.id LEFT JOIN doc_settings `S` ON `S`.id='1' ";
			$q= $db->db_gen("SELECT `R`.id,`R`.d_type,`R`.remarks,`R`.remarks_admin,`R`.bness_name,`R`.bness_street_address,`R`.bness_industry,`R`.managed_by,`R`.since,
			`C`.fn,`C`.mn,`C`.ln,`C`.street_address,`C`.address_since,
			`S`.address_brgy,`S`.address_city,`S`.address_province FROM {$tbl} WHERE {$con} ;");

			if(!$db->hasError)
			{ 
				while($r=mysqli_fetch_array($q))
				{
					$profile= $db->j_profile("users/files/users/".$gid."/profile","../images/files/blank_profile.png");	
					array_push($rtn, array('id'=>$r['id'],'d_type'=>$r['d_type'],'remarks'=>$r['remarks'],'remarks_admin'=>$r['remarks_admin'],'bness_name'=>$r['bness_name'],'bness_address'=>$r['bness_street_address'],'bness_type'=>$r['bness_industry'],'managed_by'=>$r['managed_by'],'since'=>$r['since'],
						'fn'=>$r['fn'],'mn'=>$r['mn'],'ln'=>$r['ln'],'street_address'=>$r['street_address'],'address_since'=>$r['address_since'],'address_brgy'=>$r['address_brgy'],'address_city'=>$r['address_city'],'address_province'=>$r['address_province'],
						'image'=>$profile,'itoken'=>$db->etoken($r['id'])));
				}
				echo json_encode($rtn); mysqli_close($db_con);
			}
			else{ echo $db->errorVal; mysqli_close($db_con); die(); }
		}			
		if($_POST['ft']=='0-3')
		{
			$id="0"; $result=""; $err_code=""; $rID="";			
			parse_str($_POST['data_'], $fd);

			$db = new control(); $db_con = $db->db_conn();			
			$query = $db->db_update("UPDATE `doc_biz_closure` SET	
				`remarks`='".mysqli_real_escape_string($db_con, $fd['remarks'])."',
				`d_type`='".mysqli_real_escape_string($db_con, $fd['d_type'])."',
				`bness_name`='".mysqli_real_escape_string($db_con, $fd['bness_name'])."',
				`bness_street_address`='".mysqli_real_escape_string($db_con, $fd['bness_address'])."',
				`bness_industry`='".mysqli_real_escape_string($db_con, $fd['bness_type'])."',
				`managed_by`='".mysqli_real_escape_string($db_con, $fd['bness_manager'])."',
				`since`='".mysqli_real_escape_string($db_con, $fd['bness_since'])."',
				`price`= (SELECT `biz_closure_price` FROM doc_settings)
				WHERE `id`='".mysqli_real_escape_string($db_con, $db->itoken($fd['smd']))."';	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'","error":"'.$err_code.'"}]';	
		}
		if($_POST['ft']=='0-4'){ $db= new control();  echo $db->j_delete("`doc_biz_closure`",$_POST['newRow']); }		
	}	
}
else{ echo "SessionExpired"; }

?>