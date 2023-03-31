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
		`purpose` LIKE '%".$_POST['uLike']."%' OR
		`remarks_admin` LIKE '%".$_POST['uLike']."%' 
		) AND `inactive`='0' AND resi_id={$gid} ";						
		$sort= ($_POST['sort']=="")?"10-id": $_POST['sort']."- `dated`,`d_type`,`date_issued`,`purpose`,`remarks`";		
		$col = "id,dated,remarks,remarks_admin,status,d_type,purpose,date_issued";

		$db= new control(); 
		echo $db->j_select(['column'=>$col,'table'=>"doc_clearance",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
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
			$query = $db->db_insert("INSERT INTO doc_clearance(`trans_no`,`resi_id`,`dated`,`remarks`,`purpose`,`d_type`,`price`) VALUES(
				CONCAT('BC-',LEFT(REPLACE(UUID(), '-', ''), 8)),
				'".mysqli_real_escape_string($db_con, $gid)."',NOW(),
				'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
				'".mysqli_real_escape_string($db_con, $fd['purpose'])."',
				'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
				(SELECT `clearance_price` FROM doc_settings) );	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($rID).'", "error":"'.$err_code.'"}]';				
		}
		if($_POST['ft']=='0-2')
		{
			$rtn= []; $db= new control(); $db_con= $db->db_conn(); $qid= $db->itoken($_POST['data_']);
			$con= "`R`.`inactive`='0' AND `R`.id='{$qid}' ";
			$tbl= "doc_clearance `R` LEFT JOIN residents `C` ON `R`.resi_id=`C`.id LEFT JOIN doc_settings `S` ON `S`.id='1' ";
			$q= $db->db_gen("SELECT `R`.id,`R`.purpose,`R`.d_type,`R`.remarks,`R`.remarks_admin,
			`C`.fn,`C`.mn,`C`.ln,`C`.street_address,`C`.address_since,
			`S`.address_brgy,`S`.address_city,`S`.address_province FROM {$tbl} WHERE {$con} ;");

			if(!$db->hasError)
			{ 
				while($r=mysqli_fetch_array($q))
				{
					$profile= $db->j_profile("users/files/users/".$gid."/profile","../images/files/blank_profile.png");	
					array_push($rtn, array('id'=>$r['id'],'d_type'=>$r['d_type'],'purpose'=>$r['purpose'],'remarks'=>$r['remarks'],'remarks_admin'=>$r['remarks_admin'],
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
			$query = $db->db_update("UPDATE `doc_clearance` SET	
				`remarks`='".mysqli_real_escape_string($db_con, $fd['remarks'])."',
				`purpose`='".mysqli_real_escape_string($db_con, $fd['purpose'])."',
				`d_type`='".mysqli_real_escape_string($db_con, $fd['d_type'])."',				
				`price`= (SELECT `clearance_price` FROM doc_settings)			
				WHERE `id`='".mysqli_real_escape_string($db_con, $db->itoken($fd['smd']))."';	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'","error":"'.$err_code.'"}]';	
		}
		if($_POST['ft']=='0-4'){ $db= new control();  echo $db->j_delete("`doc_clearance`",$_POST['newRow']); }		
	}	
}
else{ echo "SessionExpired"; }

?>