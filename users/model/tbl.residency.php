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

/*
0-For Review
1-Processing
2-Pending
3-For Pickup
4-On the way
5-Cancelled
9-Received and Completed*/
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
		`tax_no` LIKE '%".$_POST['uLike']."%' OR `purpose` LIKE '%".$_POST['uLike']."%' 
		) AND `inactive`='0' AND resi_id={$gid} ";
		$sort= ($_POST['sort']=="")?"10-id": $_POST['sort']."- `dated`,`d_type`,`date_issued`,`tax_no`,`tax_issued`,`remarks`";	
		$col = "id,dated,remarks,remarks_admin,status,d_type,date_issued,tax_no,tax_issued";		
		//$que = "SELECT *,DATE_FORMAT(, '%Y-%m-%d') AS datedx FROM doc_residency";

		$db= new control(); 
		echo $db->j_select(['column'=>$col,'table'=>"doc_residency",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
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
			$query = $db->db_insert("INSERT INTO doc_residency(`trans_no`,`resi_id`,`dated`,`purpose`,`tax_no`,`tax_issued`,`remarks`,`d_type`,`price`) VALUES(CONCAT('RC-',LEFT(REPLACE(UUID(), '-', ''), 8)),
				'".mysqli_real_escape_string($db_con, $gid)."', NOW(),
				'".mysqli_real_escape_string($db_con, $fd['purpose'])."',
				'".mysqli_real_escape_string($db_con, $fd['tax_no'])."',
				'".mysqli_real_escape_string($db_con, $fd['issued'])."',
				'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
				'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
				(SELECT `residence_price` FROM doc_settings) );	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($rID).'", "error":"'.$err_code.'"}]';				
		}

		if($_POST['ft']=='0-2')
		{
			$rtn= []; $db= new control(); $db_con= $db->db_conn(); $qid= $db->itoken($_POST['data_']);
			$con= "`R`.`inactive`='0' AND `R`.id='{$qid}' ";
			$tbl= "doc_residency `R` LEFT JOIN residents `C` ON `R`.resi_id=`C`.id LEFT JOIN doc_settings `S` ON `S`.id='1' ";
			$q= $db->db_gen("SELECT `R`.id,`R`.purpose,`R`.tax_no,`R`.tax_issued,`R`.d_type,`R`.remarks,`R`.remarks_admin,
			`C`.fn,`C`.mn,`C`.ln,`C`.street_address,`C`.address_since,
			`S`.address_brgy,`S`.address_city,`S`.address_province FROM {$tbl} WHERE {$con} ;");

			if(!$db->hasError)
			{ 
				while($r=mysqli_fetch_array($q))
				{
					$profile= $db->j_profile("users/files/users/".$gid."/profile","../images/files/blank_profile.png");	
					array_push($rtn, array('id'=>$r['id'],'tax_no'=>$r['tax_no'],'purpose'=>$r['purpose'],'d_type'=>$r['d_type'],'tax_issued'=>$r['tax_issued'],'remarks'=>$r['remarks'],'remarks_admin'=>$r['remarks_admin'],
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
			$query = $db->db_update("UPDATE `doc_residency` SET	
				`purpose`='".mysqli_real_escape_string($db_con, $fd['purpose'])."',
				`tax_no`='".mysqli_real_escape_string($db_con, $fd['tax_no'])."',
				`tax_issued`='".mysqli_real_escape_string($db_con, $fd['issued'])."',
				`remarks`='".mysqli_real_escape_string($db_con, $fd['remarks'])."',
				`d_type`='".mysqli_real_escape_string($db_con, $fd['d_type'])."',
				`price`=(SELECT `residence_price` FROM doc_settings)
				WHERE `id`='".mysqli_real_escape_string($db_con, $db->itoken($fd['smd']))."';	");
			$result = ($query == "1") ? "1":$query;
			
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'","error":"'.$err_code.'"}]';	
		}
		if($_POST['ft']=='0-4')
		{ 
			$db= new control(); $qid=$db->itoken($_POST['newRow']);
			$q= $db->db_gen("SELECT status FROM doc_residency WHERE id='{$qid}' ;");
			$r=mysqli_fetch_array($q);

			$stat= $r['status'];
			if($stat<=2){ echo $db->db_update("UPDATE `doc_residency` SET `status`='5' WHERE `id`='{$qid}';"); }
			else if($stat==3){ echo "Status: <b>Ready for Pick-up</b><br/><br/>Sorry but your cancellation request will not be granted because your Residence Certificate is ready for Pick-up."; }
			else if($stat==4){ echo "Status: <b>Delivered/ On the way</b><br/><br/>Sorry but your cancellation request will not be granted because your Residence Certificate is on the way for delivery."; }
			else if($stat==5){ echo "1"; }
			else if($stat==9){ echo "Status: <b>Completed</b><br/><br/>Sorry but your cancellation request will not be granted because your transaction is alreay COMPLETED."; }
			/*
			0-For Review
			1-Processing
			2-Pending
			3-For Pickup
			4-On the way
			5-Cancelled
			9-Received and Completed*/
			//echo $db->j_delete("`pattern`",$_POST['newRow']); 

		}		
	}	
}
else{ echo "SessionExpired"; }

?>