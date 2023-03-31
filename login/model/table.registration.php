<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";	
	$_POST['fb'] = "27";
	$_POST['ft'] = "22-10";
	$_POST['uLike'] = "";

	$_POST['dFr'] = "2016-01-01";
	$_POST['dTo'] = "2020-01-01";
	$_POST['sort']= "";
	$_POST['page']= "15,1";	
	$_POST['sy'] = "1";

	$_POST['fn']="adxxx"; $_POST['ln']="asdf"; 

	$_POST['valid']= "100-1";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}




require_once("../../config/model/global_var.php");
if(isset($_POST['token']) && isset($_POST['fb']))
{	
	require_once("../../config/settings/settings.php");	
	
	if(isset($_POST['valid']) && $_POST['valid'] == '100-1X')
	{
		$db= new control(); $db_con= $db->db_conn();	$result="1";	 parse_str($_POST['data_'], $fd);


		$type_col=""; $type_val="";
		if($fd['type']=="2")	 { $type_col="prov_lid,"; $type_val=" '".mysqli_real_escape_string($db_con, $fd['prov_leader'])."', ";	}
		else if($fd['type']=="3"){ $type_col="mun_lid";   $type_val=" '".mysqli_real_escape_string($db_con, $fd['mun_leader'])."', "; 	}
		else if($fd['type']=="4")
		{ 
			$type_col="prec_lid,ben1,ben2,ben3,ben4,"; 
			$type_val=" '".mysqli_real_escape_string($db_con, $fd['prec_leader'])."', '".mysqli_real_escape_string($db_con, $fd['ben1'])."', '".mysqli_real_escape_string($db_con, $fd['ben2'])."', '".mysqli_real_escape_string($db_con, $fd['ben3'])."', '".mysqli_real_escape_string($db_con, $fd['ben4'])."', "; 
		}

		echo "col: ".$type_col;
		echo "<br/>";
		echo "val: ".$type_val;

		echo "<br/></br>";

		print_r($_POST['data_']);


	}
	
	if(isset($_POST['valid']) && $_POST['valid'] == '100-1')
	{
		$db= new control(); $db_con= $db->db_conn();	$result="1";	 parse_str($_POST['data_'], $fd);
		$valid= $db->db_select("SELECT id,fn,ln,approved,response FROM `ol_registration` WHERE `fn`='".mysqli_real_escape_string($db_con, $fd['fn'])."' AND `ln`='".mysqli_real_escape_string($db_con, $fd['ln'])."' AND inactive='0';");
		
		if($db->hasError){ echo $db->errorVal; $db->jdie(); }
		if(mysqli_num_rows($valid)>0)
		{
			$r= mysqli_fetch_array($valid);
			if($r['approved']=="0")		{ echo json_encode([array('result'=>"0",'error_code'=>"0-1",'path'=>"../contacts.php",'error'=>"Your registration is currently being reviewed.<br/><br/>Do you want to send us a message? Click confirm to redirect to Contact Us page?")]); $db->jdie(); }
			else if($r['approved']=="1"){ echo json_encode([array('result'=>"0",'error_code'=>"0-2",'path'=>"index.php",'error'=>"Your application is already approved.<br/><br/>Your username and password were sent to your e-mail. Click confirm to redirect to Login page?")]); $db->jdie(); }
			else if($r['approved']=="2"){ echo json_encode([array('result'=>"0",'error_code'=>"0-3",'path'=>"../contacts.php",'error'=>"Your registration was declined.<br/><br/>Reason: <br/>".$r['response'])]); $db->jdie(); }
		}
		else
		{
			$valid2= $db->db_select("SELECT id FROM `members` WHERE `un`='".mysqli_real_escape_string($db_con, $fd['username'])."' AND inactive='0';");
			if(mysqli_num_rows($valid2)>0){ echo json_encode([array('result'=>"2",'error_code'=>"0-1",'error'=>"[".$fd['username']."] - This username is already taken.<br/><br/>Please change your Username.")]); $db->jdie(); }

			$prov= ($fd['province']=="OTHERS")?"0":$fd['province'];
			$city= (isset($fd['city']))?$fd['city']:"0";
			$brgy= (isset($fd['brgy']))?$fd['brgy']:"0";

			$type_col=""; $type_val="";
			if($fd['type']=="2")	 { $type_col="prov_lid,"; $type_val=" '".mysqli_real_escape_string($db_con, $fd['prov_leader'])."', ";	}
			else if($fd['type']=="3"){ $type_col="mun_lid,";   $type_val=" '".mysqli_real_escape_string($db_con, $fd['mun_leader'])."', "; 	}
			else if($fd['type']=="4")
			{ 
				$type_col="prec_lid,ben1,ben2,ben3,ben4,"; 
				$type_val=" '".mysqli_real_escape_string($db_con, $fd['prec_leader'])."', '".mysqli_real_escape_string($db_con, $fd['ben1'])."', '".mysqli_real_escape_string($db_con, $fd['ben2'])."', '".mysqli_real_escape_string($db_con, $fd['ben3'])."', '".mysqli_real_escape_string($db_con, $fd['ben4'])."', "; 
			}

			$query = $db->db_insert_id("INSERT INTO ol_registration(fn,mn,ln,gender,bday,cp,email,type,precint_no,a_prov_other,a_province,a_city,a_brgy,a_purok,a_street,a_block,{$type_col}un,pw) VALUES(
				'".mysqli_real_escape_string($db_con, $fd['fn'])."',
				'".mysqli_real_escape_string($db_con, $fd['mn'])."',
				'".mysqli_real_escape_string($db_con, $fd['ln'])."',
				'".mysqli_real_escape_string($db_con, $fd['gender'])."',
				'".mysqli_real_escape_string($db_con, $fd['birthday'])."',
				'".mysqli_real_escape_string($db_con, $fd['cp'])."',
				'".mysqli_real_escape_string($db_con, $fd['email'])."',
				'".mysqli_real_escape_string($db_con, $fd['type'])."',
				'".mysqli_real_escape_string($db_con, $fd['precint_no'])."',
				'".mysqli_real_escape_string($db_con, $fd['prov_other'])."',
				'".mysqli_real_escape_string($db_con, $prov)."',
				'".mysqli_real_escape_string($db_con, $city)."',
				'".mysqli_real_escape_string($db_con, $brgy)."',
				'".mysqli_real_escape_string($db_con, $fd['purok'])."',
				'".mysqli_real_escape_string($db_con, $fd['street'])."',
				'".mysqli_real_escape_string($db_con, $fd['house'])."', {$type_val}
				'".mysqli_real_escape_string($db_con, $fd['username'])."',
				sha1('".mysqli_real_escape_string($db_con, $fd['password'])."'));	");	

			if($db->hasError){ echo $db->errorVal; $db->jdie(); }
			else
			{
				$json = json_decode($query, true);
				$nID = $json['id'];

				if(isset($_FILES['uplFile']))
				{
					$fle_err= $_FILES['uplFile']['error'];
					if(!$fle_err[0]){ require_once('file.parser.php'); 
					$tUpload = gUploader($nID,"photo","../files/registration/,profile",null,"jpg","400","400");	}
				}				
				
				echo json_encode([array('result'=>$result,'error_code'=>"",'error'=>"'.$db->errorVal.'")]);
			}	

		}
	}
	if(isset($_POST['valid']) && $_POST['valid'] == '101-2')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,CONCAT(ln,', ',fn,' ',mn) AS name,type,prov_lid,mun_lid,prec_lid FROM members WHERE inactive='0' AND type<'4' ORDER BY ln ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{ 
				array_push($rtn, array('id'=>$r['id'],'type'=>$r['type'],'name'=>$r['name'],'prov_lid'=>$r['prov_lid'],'mun_lid'=>$r['mun_lid'],'prec_lid'=>$r['prec_lid'])); 
			}
			echo json_encode($rtn);			
		}
		mysqli_close($db_con);
	}
	
}
else{ echo "SessionExpired"; }



?>