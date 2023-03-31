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

//{0:"For Review",1:"Processing",2:"Pending",3:"For Pickup",4:"On the way",5:"Cancelled",9:"Completed"};


require_once("../../config/model/global_var.php");
if(isset($_POST['token']) && isset($_POST['jc']))
{	
	require_once("../../config/settings/settings.php");	

	function genQ($t,$id)
	{
		$db= new control(); $db_con= $db->db_conn();		

		$valid= $db->db_select("SELECT id,trans_no FROM `{$t}` WHERE id='{$id}' LIMIT 1;");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		if(mysqli_num_rows($valid)>0)
		{ 			
			$r= mysqli_fetch_array($valid); 
			return strtoupper($r['trans_no']);			
		}
		else{ return "0";  }
	}
	function newAccount($d)
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($d, $fd);

		$un= ($fd['username']!="")?$fd['username']:$fd['fn'].$fd['ln'];
		$pw= ($fd['password']!="")?$fd['password']:random_code(10);

		$valid= $db->db_select("SELECT `R`.id FROM residents `R` WHERE `R`.un='".$un."';");
		if(mysqli_num_rows($valid)>0){ $un= $un.random_code(10); }

		$query = $db->db_insert_id("INSERT INTO `residents`(fn,mn,ln,gender,bday,email,cp,civil_status,birth_place,occupation,nationality_id,pwd,street_address,brgy_id,id_philhealth,id_pwd,un,pw) VALUES(
			'".mysqli_real_escape_string($db_con, $fd['fn'])."',
			'".mysqli_real_escape_string($db_con, $fd['mn'])."',
			'".mysqli_real_escape_string($db_con, $fd['ln'])."',
			'".mysqli_real_escape_string($db_con, $fd['gender'])."',
			'".mysqli_real_escape_string($db_con, $fd['birthday'])."',
			'".mysqli_real_escape_string($db_con, $fd['email'])."',
			'".mysqli_real_escape_string($db_con, $fd['mobile'])."',
			'".mysqli_real_escape_string($db_con, $fd['civil_status'])."',
			'".mysqli_real_escape_string($db_con, $fd['birth_place'])."',
			'".mysqli_real_escape_string($db_con, $fd['occupation'])."',
			'".mysqli_real_escape_string($db_con, $fd['nationality'])."',
			'".mysqli_real_escape_string($db_con, $fd['pwd'])."',
			'".mysqli_real_escape_string($db_con, $fd['street'])."',
			'".mysqli_real_escape_string($db_con, $fd['barangay'])."',
			'".mysqli_real_escape_string($db_con, $fd['id_philhealth'])."',
			'".mysqli_real_escape_string($db_con, $fd['id_pwd'])."',
			'".mysqli_real_escape_string($db_con, $un)."',
			sha1('".mysqli_real_escape_string($db_con, $pw)."'));	");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		else
		{
			$json= json_decode($query, true);

			if(isset($_FILES['uplFile']))
			{
				$fle_err= $_FILES['uplFile']['error'];
				if(!$fle_err[0])
				{ 
					$jroot= $GLOBALS['jroot']; require_once('../../account/model/file.parser.php'); 	
					gUploader($json['id'],"photo",$jroot."/users/files/users/,profile",null,null,"400","400");	
				}
			}			
			return ['id'=>$json['id'],'un'=>$un,'pw'=>$pw];
		}		
	}


	if($_POST['gt'] == '100-0-1')
	{ 
		$db= new control(); echo $db->j_select(['column'=>"id,name",'table'=>"brgy_list",'condition'=>"inactive='0'",'sort'=>"00-name"]); 
	}
	if($_POST['gt'] == '100-1')
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);		

		function covid_exec($id)
		{
			$db = new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);
			$q20= [];
			array_push($q20, (!isset($fd['q20'])?"0":"1"));
			array_push($q20, (!isset($fd['q21'])?"0":"1"));
			array_push($q20, (!isset($fd['q22'])?"0":"1"));
			array_push($q20, (!isset($fd['q23'])?"0":"1"));
			array_push($q20, (!isset($fd['q24'])?"0":"1"));
			array_push($q20, (!isset($fd['q25'])?"0":"1"));
			array_push($q20, (!isset($fd['q26'])?"0":"1"));

			$query = $db->db_insert_id("INSERT INTO covid_immunization(`trans_no`,`resi_id`,`dated`,`occupation`,`company_name`,`company_phone`,`company_address`,`q0`,`q1`,`q2`,`q3`,`q4`,`q5`,`q6`,`q7`,`q8`,`q9`,`q10`,`q11`,`q20`,`remarks`,`category`,`id_type`,`id_type_no`,`emp_type`,`emp_icc`) VALUES(
				CONCAT('COVID19-',LEFT(REPLACE(UUID(), '-', ''), 8)),
				'".mysqli_real_escape_string($db_con, $id)."',NOW(),
				'".mysqli_real_escape_string($db_con, $fd['occupation'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_name'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_phone'])."',
				'".mysqli_real_escape_string($db_con, $fd['bness_address'])."',
				'".mysqli_real_escape_string($db_con, $fd['q0'])."',
				'".mysqli_real_escape_string($db_con, $fd['q1'])."',
				'".mysqli_real_escape_string($db_con, $fd['q2'])."',
				'".mysqli_real_escape_string($db_con, $fd['q3'])."',
				'".mysqli_real_escape_string($db_con, $fd['q4'])."',
				'".mysqli_real_escape_string($db_con, $fd['q5'])."',
				'".mysqli_real_escape_string($db_con, $fd['q6'])."',
				'".mysqli_real_escape_string($db_con, $fd['q7'])."',
				'".mysqli_real_escape_string($db_con, $fd['q8'])."',
				'".mysqli_real_escape_string($db_con, $fd['q9'])."',
				'".mysqli_real_escape_string($db_con, $fd['q10'])."',
				'".mysqli_real_escape_string($db_con, $fd['q11'])."',
				'".mysqli_real_escape_string($db_con, implode(",", $q20))."',
				'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
				'".mysqli_real_escape_string($db_con, $fd['category'])."',
				'".mysqli_real_escape_string($db_con, $fd['id_type'])."',
				'".mysqli_real_escape_string($db_con, $fd['id_type_no'])."',
				'".mysqli_real_escape_string($db_con, $fd['emp_status'])."',
				'".mysqli_real_escape_string($db_con, $fd['icc_employer'])."' );	");

			/* 1, 9, 10, 11, 12, 13 - alergies(Drug,Food,Insect,Latex,Mold,Pet,Polen) 
				0, 8, 9, 10, 11, 12, 20
			*/

			if($db->hasError){ echo $db->errorVal; $db->jdie(); }
			else
			{
				$json= json_decode($query, true);
				$tid= "
					<div class='cv-qrcode'> <img id='qr_code' alt='' /> </div>
					<div class='cv-qrcode-share'>
						<a href='#' class='shareFb_lnk' title='Share on Facebook'><i class='fa fa-facebook'></i></a>
						<a href='#' class='shareTwit_lnk' title='Share on Twitter'><i class='fa fa-twitter'></i></a>
					</div>
					<br/><h1 class='wrap c' id='qr_trans'>".genQ("covid_immunization",$json['id'])."</h1><br/><p class='c' style='margin-top:10px;font-size:13px;'>Registration ID</p><br/>";
				
				echo json_encode([array('result'=>"1",'trans_code'=>$tid,'error_code'=>"",'error'=>"")]);			 
			}
			$db->jdie();
		}

		$uid="";
		$valid= $db->db_select("SELECT id,fn,mn,ln FROM `residents` WHERE 
			`fn`='".mysqli_real_escape_string($db_con, $fd['fn'])."' AND 
			`mn`='".mysqli_real_escape_string($db_con, $fd['mn'])."' AND 
			`ln`='".mysqli_real_escape_string($db_con, $fd['ln'])."' AND inactive='0' LIMIT 1;");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		if(mysqli_num_rows($valid)>0)
		{ 			
			$r= mysqli_fetch_array($valid); $uid= $r['id']; 
			$status= $db->db_select("SELECT id,trans_no FROM covid_immunization WHERE `resi_id`='".$uid."' AND inactive='0' ORDER BY id DESC LIMIT 1;");
			
			if($db->hasError){ echo $db->errorVal; $db->jdie(); }
			if(mysqli_num_rows($status)>0)
			{
				$d= mysqli_fetch_array($status);
				$msg= "
				<div class='cv-qrcode'> <img id='qr_code' alt='' /> </div>
				<div class='cv-qrcode-share'>
					<a href='#' class='shareFb_lnk' title='Share on Facebook'><i class='fa fa-facebook'></i></a>
					<a href='#' class='shareTwit_lnk' title='Share on Twitter'><i class='fa fa-twitter'></i></a>
				</div>				
				<br/><h1 class='wrap c u' id='qr_trans'>".$d['trans_no']."</h1><br/>
				<p class='c' style='margin-top:15px;font-size:13px;'>Registration ID</p><br/>				
				<b>Registration Submitted</b> - Your Covid19 Online Registration were already Submitted.
				";

				echo json_encode([array('result'=>"0",'error'=>$msg)]); $db->jdie();
			}
			else{ covid_exec($uid); }
		}
		else{ $arr= newAccount($_POST['data_']); covid_exec($arr['id']);  }

	}



	/* 
	$ve= [
		"0"=>"<b>For Review</b> - Your Online Application is currently being Reviewed.",
		"1"=>"<b>On Process</b> - Your Online Application is currently being Processed.",
		"2"=>"<b>Pending</b> - Your Online Application is still On Hold.",
		"3"=>"<b>For Pickup</b> - Your Online Application is now ready for Pickup at the Barangay Hall.",
		"4"=>"<b>On the way</b> - Your Online Application is being delivered by the Brgy. Messenger."];

	function newAccount($d)
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($d, $fd);
		$type= (isset($fd['user_type']))?$fd['user_type']:"0";
		$table= ($type=="0")?"residents":(($type=="1")?"clients":"");
		$path= ($type=="0")?"users":(($type=="1")?"clients":"");
		$col = ($type=="0")?"civil_status,birth_place,voter,occupation,nationality_id,pwd,street_address,address_since":(($type=="1")?"address":"");
		$val = ($type=="0")
			?"'".mysqli_real_escape_string($db_con, $fd['civil_status'])."',
			'".mysqli_real_escape_string($db_con, $fd['birth_place'])."',
			'".mysqli_real_escape_string($db_con, $fd['voter'])."',
			'".mysqli_real_escape_string($db_con, $fd['occupation'])."',
			'".mysqli_real_escape_string($db_con, $fd['nationality'])."',
			'".mysqli_real_escape_string($db_con, $fd['pwd'])."',
			'".mysqli_real_escape_string($db_con, $fd['street'])."',
			'".mysqli_real_escape_string($db_con, $fd['since'])."',"
			:(($type=="1")?"'".mysqli_real_escape_string($db_con, $fd['address'])."',":"");	

		$un= ($fd['username']!="")?$fd['username']:$fd['fn'].$fd['ln'];
		$pw= ($fd['password']!="")?$fd['password']:random_code(10);

		$valid= $db->db_select("SELECT `R`.id AS id,
			(SELECT `C`.id FROM clients `C` WHERE `C`.un='".$un."') AS id2
			FROM residents `R` WHERE `R`.un='".$un."';");
		if(mysqli_num_rows($valid)>0){ $un= $un.random_code(10); }

		$query = $db->db_insert_id("INSERT INTO `{$table}`(fn,mn,ln,gender,bday,email,cp,{$col},un,pw) VALUES(
			'".mysqli_real_escape_string($db_con, $fd['fn'])."',
			'".mysqli_real_escape_string($db_con, $fd['mn'])."',
			'".mysqli_real_escape_string($db_con, $fd['ln'])."',
			'".mysqli_real_escape_string($db_con, $fd['gender'])."',
			'".mysqli_real_escape_string($db_con, $fd['birthday'])."',
			'".mysqli_real_escape_string($db_con, $fd['email'])."',
			'".mysqli_real_escape_string($db_con, $fd['mobile'])."',
			{$val}
			'".mysqli_real_escape_string($db_con, $un)."',
			sha1('".mysqli_real_escape_string($db_con, $pw)."'));	");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		else
		{
			$json= json_decode($query, true);

			if(isset($_FILES['uplFile']))
			{
				$fle_err= $_FILES['uplFile']['error'];
				if(!$fle_err[0])
				{ 
					$jroot= $GLOBALS['jroot']; require_once('../../account/model/file.parser.php'); 	
					gUploader($json['id'],"photo",$jroot.$path."/files/users/,profile",null,null,"400","400");	
				}
			}			
			return ['id'=>$json['id'],'un'=>$un,'pw'=>$pw];
		}		
	}

	function validate($d,$tbl,$t)
	{
		$ve= $GLOBALS['ve'];
		$db= new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);
		$table= "residents";
		$col  = "resi_id";
		if(isset($fd['user_type'])){ if($fd['user_type']=="1"){ $table= "clients"; $col= "client_id"; } }

		$valid= $db->db_select("SELECT id,fn,ln FROM `{$table}` WHERE 
			`fn`='".mysqli_real_escape_string($db_con, $fd['fn'])."' AND 
			`mn`='".mysqli_real_escape_string($db_con, $fd['mn'])."' AND 
			`ln`='".mysqli_real_escape_string($db_con, $fd['ln'])."' AND inactive='0' LIMIT 1;");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		if(mysqli_num_rows($valid)>0)
		{ 			
			$r= mysqli_fetch_array($valid); $nid= $r['id']; 
			$status= $db->db_select("SELECT id,status,trans_no FROM {$tbl} WHERE `{$col}`='".$nid."' AND inactive='0' ORDER BY id DESC LIMIT 1;");
			$d= mysqli_fetch_array($status);

			$tid= "<br/><h1 class='wrap c u'>".$d['trans_no']."</h1><br/><p class='c' style='margin-top:10px;font-size:13px;'>Transaction ID</p><br/>";

			if($d['status']=="0"){ echo json_encode([array('result'=>"0",'error'=>$tid.$ve["0"])]); 		$db->jdie(); }
			else if($d['status']=="1"){ echo json_encode([array('result'=>"0",'error'=>$tid.$ve["1"])]);	$db->jdie(); }
			else if($d['status']=="2"){ echo json_encode([array('result'=>"0",'error'=>$tid.$ve["2"])]);	$db->jdie(); }
			else if($d['status']=="3"){ echo json_encode([array('result'=>"0",'error'=>$tid.$ve["3"])]);	$db->jdie(); }
			else if($d['status']=="4"){ echo json_encode([array('result'=>"0",'error'=>$tid.$ve["4"])]);	$db->jdie(); }
			else{ return ['id'=>$nid]; }
		}
		else{ return $arr= newAccount($_POST['data_']);  }
	}
	// ==========================================
	if($_POST['gt'] == '0-1')
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);		
		$arr= validate($_POST['data_'], '`doc_clearance`',"BC");
		$nid= $arr['id'];		

		$query = $db->db_insert_id("INSERT INTO doc_clearance(`trans_no`,`resi_id`,`dated`,`purpose`,`remarks`,`d_type`,`price`) VALUES(
			CONCAT('BC-',LEFT(REPLACE(UUID(), '-', ''), 8)),
			'".mysqli_real_escape_string($db_con, $nid)."',NOW(),
			'".mysqli_real_escape_string($db_con, $fd['purpose'])."',
			'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
			'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
			(SELECT `clearance_price` FROM doc_settings) );	");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		else
		{
			$json= json_decode($query, true);
			$tid= "<br/><h1 class='wrap c'>".genQ("doc_clearance",$json['id'])."</h1><br/><p class='c' style='margin-top:10px;font-size:13px;'>Transaction ID</p><br/>";
			
			echo json_encode([array('result'=>"1",'trans_code'=>$tid,'error_code'=>"",'error'=>"")]);			 
		}
		$db->jdie();
	}
	// ==========================================
	if($_POST['gt'] == '1-1')
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);		
		$arr= validate($_POST['data_'], '`doc_residency`',"RC");
		$nid= $arr['id'];		

		$query = $db->db_insert_id("INSERT INTO doc_residency(`trans_no`,`resi_id`,`dated`,`purpose`,`remarks`,`d_type`,`tax_no`,`tax_issued`,`price`) VALUES(
			CONCAT('RC-',LEFT(REPLACE(UUID(), '-', ''), 8)),
			'".mysqli_real_escape_string($db_con, $nid)."',NOW(),
			'".mysqli_real_escape_string($db_con, $fd['purpose'])."',
			'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
			'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
			'".mysqli_real_escape_string($db_con, $fd['tax_no'])."',
			'".mysqli_real_escape_string($db_con, $fd['tax_issued'])."',
			(SELECT `residence_price` FROM doc_settings) );	");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		else
		{
			$json= json_decode($query, true);
			$tid= "<br/><h1 class='wrap c'>".genQ("doc_residency",$json['id'])."</h1><br/><p class='c' style='margin-top:10px;font-size:13px;'>Transaction ID</p><br/>";
			
			echo json_encode([array('result'=>"1",'trans_code'=>$tid,'error_code'=>"",'error'=>"")]);			 
		}
		$db->jdie();
	}
	// ==========================================
	if($_POST['gt'] == '2-1')
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);		
		$arr= validate($_POST['data_'], '`doc_indigency`',"CI");
		$nid= $arr['id'];		

		$query = $db->db_insert_id("INSERT INTO doc_indigency(`trans_no`,`resi_id`,`dated`,`remarks`,`d_type`,`purpose`,`requested_by`,`occupation`,`income`,`price`) VALUES(
			CONCAT('CI-',LEFT(REPLACE(UUID(), '-', ''), 8)),
			'".mysqli_real_escape_string($db_con, $nid)."',NOW(),
			'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
			'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
			'".mysqli_real_escape_string($db_con, $fd['purpose'])."',
			'".mysqli_real_escape_string($db_con, $fd['requested_by'])."',
			'".mysqli_real_escape_string($db_con, $fd['occupation'])."',
			'".mysqli_real_escape_string($db_con, str_replace(",","",$fd['income']))."',
			(SELECT `certificate_price` FROM doc_settings) );	");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		else
		{
			$json= json_decode($query, true);
			$tid= "<br/><h1 class='wrap c'>".genQ("doc_indigency",$json['id'])."</h1><br/><p class='c' style='margin-top:10px;font-size:13px;'>Transaction ID</p><br/>";
			
			echo json_encode([array('result'=>"1",'trans_code'=>$tid,'error_code'=>"",'error'=>"")]);			 
		}
		$db->jdie();
	}
	// ==========================================	
	if($_POST['gt'] == '3-1')
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);		
		$arr= validate($_POST['data_'], '`doc_biz_clearance`',"JA");
		$nid= $arr['id'];	

		$type= $fd['user_type'];
		$col = ($type=="0")?"resi_id":(($type=="1")?"client_id":"");

		$query = $db->db_insert_id("INSERT INTO doc_biz_clearance(`trans_no`,`{$col}`,`dated`,`remarks`,`d_type`,`bness_name`,`bness_street_address`,`bness_no`,`bness_industry`,`renew`,`bness_manager`,`price`) VALUES(
			CONCAT('JA-',LEFT(REPLACE(UUID(), '-', ''), 8)),
			'".mysqli_real_escape_string($db_con, $nid)."',NOW(),
			'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
			'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_name'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_address'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_no'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_type'])."',
			'".mysqli_real_escape_string($db_con, $fd['renew'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_manager'])."',
			(SELECT `biz_clearance_price` FROM doc_settings) );	");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		else
		{
			$json= json_decode($query, true);
			$tid= "<br/><h1 class='wrap c'>".genQ("doc_biz_clearance",$json['id'])."</h1><br/><p class='c' style='margin-top:10px;font-size:13px;'>Transaction ID</p><br/>";
			
			echo json_encode([array('result'=>"1",'trans_code'=>$tid,'error_code'=>"",'error'=>"")]);			 
		}
		$db->jdie();
	}
	// ==========================================
	if($_POST['gt'] == '4-1')
	{
		$db= new control(); $db_con= $db->db_conn(); parse_str($_POST['data_'], $fd);		
		$arr= validate($_POST['data_'], '`doc_biz_closure`',"JX");
		$nid= $arr['id'];

		$type= $fd['user_type'];
		$col = ($type=="0")?"resi_id":(($type=="1")?"client_id":"");		

		$query = $db->db_insert_id("INSERT INTO doc_biz_closure(`trans_no`,`{$col}`,`dated`,`remarks`,`d_type`,`bness_name`,`bness_street_address`,`bness_industry`,`managed_by`,`since`,`price`) VALUES(
			CONCAT('JX-',LEFT(REPLACE(UUID(), '-', ''), 8)),
			'".mysqli_real_escape_string($db_con, $nid)."',NOW(),
			'".mysqli_real_escape_string($db_con, $fd['remarks'])."',
			'".mysqli_real_escape_string($db_con, $fd['d_type'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_name'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_address'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_type'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_manager'])."',
			'".mysqli_real_escape_string($db_con, $fd['bness_since'])."',
			(SELECT `biz_closure_price` FROM doc_settings) );	");

		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		else
		{
			$json= json_decode($query, true);
			$tid= "<br/><h1 class='wrap c'>".genQ("doc_biz_closure",$json['id'])."</h1><br/><p class='c' style='margin-top:10px;font-size:13px;'>Transaction ID</p><br/>";
			
			echo json_encode([array('result'=>"1",'trans_code'=>$tid,'error_code'=>"",'error'=>"")]);			 
		}
		$db->jdie();
	}
	*/
	

	
}
else{ echo "Invalid Token! Session will expire on the next reload."; }

?>