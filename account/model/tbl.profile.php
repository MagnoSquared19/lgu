<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";	
	$_POST['fb'] = "27";
	$_POST['ft'] = "0-2";
	$_POST['uLike'] = "";
	$_POST['sort']="";
	$_POST['page']="15,1"; 
	$_POST['type']="3"; $_POST['comm']="5"; $_POST['ftr']="1";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}
require_once("../../config/model/global_var.php");

if(isset($gid) && isset($_POST['token']) && isset($_POST['fb']))
{
	require_once("../../config/settings/settings.php");	
	if(isset($_POST['ft']) && $_POST['ft']=='0')
	{
		$col="id,fn,mn,ln,gender,bday,email,cp,address,hometown,about_me,work,fb,twitter,instagram,owner,position,level";
		$con=" `U`.id='".(($_POST['id'])?$_POST['id']:$gid)."' AND `U`.inactive='0' ";
		$img= ["account/files/users/","/profile","../images/files/blank_profile.png"];

		$q="SELECT *,DATE_FORMAT(`U`.bday, '%b. %e, %Y') AS bday, IF(`U`.gender='0','Female','Male') AS gender,
		(SELECT name FROM user_position WHERE id=`U`.position LIMIT 1) AS position,
		(SELECT name FROM user_level WHERE id=`U`.level LIMIT 1) AS level,
		IF(`U`.id='$gid','1','0') AS owner
		FROM `users` `U`";

		$db= new control(); 
		echo $db->j_select(['column'=>$col,'table'=>"`users` `U`",'condition'=>$con,'query'=>$q,'image'=>$img]);	
	}
		/* !Important */
		if($_POST["ft"]=="0-0-1")
		{ 
			$db= new control(); $db_con= $db->db_conn();
			echo $db->db_update("UPDATE `users` SET `sidebar`='".mysqli_real_escape_string($db_con, $_POST['sidebar'])."' WHERE id='{$gid}';");
			mysqli_close($db_con); $_SESSION['lgu']['sidebar']=$_POST['sidebar'];
		}	
		if($_POST["ft"]=="0-0-2"){ $db = new control(); echo $result = $db->get_file_info("account/files/users/".$gid."/profile", null); }	
		/* !Important end */

	if(intval($glevel)<=2)
	{
		if(isset($_POST['ft']) && $_POST['ft'] == '0-2')
		{
			$img= ["account/files/users/","/profile","../images/files/blank_profile.png"];
			$db= new control(); echo $db->j_select(['table'=>"users",'condition'=>"id='".$gid."'",'image'=>$img]);
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-3-0')
		{
			parse_str($_POST['data_'], $fd); $db= new control(); $db_con = $db->db_conn();
			$s=$db->db_gen("SELECT id FROM `users` WHERE `id`='{$gid}' AND `pw`=sha1('".mysqli_real_escape_string($db_con,htmlentities($fd['password']))."')");

			if(mysqli_num_rows($s)==0){ echo json_encode([array('result'=>"0")]);}
			if(mysqli_num_rows($s)>0)
			{
				if(validateInput($_POST['data_'])=="1")
				{
					$pw= ($fd['n_password'] != "")?",`pw`=sha1('".mysqli_real_escape_string($db_con, $fd['n_password'])."') ":"";
					$q = $db->db_update("UPDATE `users` SET	
						`cp_fa`='".mysqli_real_escape_string($db_con, $fd['mobile'])."', 
						`email`='".mysqli_real_escape_string($db_con, $fd['email'])."', 
						`un`='".mysqli_real_escape_string($db_con, $fd['username'])."' 
						".$pw." WHERE `id`='".$gid."';");
					echo '[{"result":'.json_encode($q).', "id":"'.$gid.'","itoken":"","error":"'.$db->errorVal.'"}]';	mysqli_close($db_con);
				}
				else{ echo validateInput($_POST['data_']); }							
			}
		}
		if(isset($_POST['ft']) && $_POST['ft'] == '0-3-1')
		{
			parse_str($_POST['data_'], $fd); $db= new control(); $db_con = $db->db_conn();			
			$q = $db->db_update("UPDATE `users` SET	
				`fn`='".mysqli_real_escape_string($db_con, $fd['fn'])."',
				`mn`='".mysqli_real_escape_string($db_con, $fd['mn'])."',
				`ln`='".mysqli_real_escape_string($db_con, $fd['ln'])."',
				`gender`='".mysqli_real_escape_string($db_con, $fd['gender'])."',
				`bday`='".mysqli_real_escape_string($db_con, $fd['birthday'])."',
				`cp`='".mysqli_real_escape_string($db_con, $fd['mobile'])."',
				`address`='".mysqli_real_escape_string($db_con, $fd['address'])."',
				`hometown`='".mysqli_real_escape_string($db_con, $fd['hometown'])."',
				`fb`='".mysqli_real_escape_string($db_con, $fd['fb'])."',
				`twitter`='".mysqli_real_escape_string($db_con, $fd['twitter'])."',
				`instagram`='".mysqli_real_escape_string($db_con, $fd['instagram'])."'
				WHERE `id`='".$gid."';	");
			
			$fle_err = $_FILES['uplFile']['error'];
			if(!$fle_err[0]){ require_once('file.parser.php'); gUploader($gid,"photo","../files/users/,profile",null,null,"400","400"); }				
			
			mysqli_close($db_con);			
			echo '[{"result":'.json_encode($q).', "id":"'.$gid.'","itoken":"","error":""}]';	
		}
		if(isset($_POST['ft']) && $_POST['ft'] == '0-3-2')
		{
			parse_str($_POST['data_'], $fd); $db= new control(); $db_con = $db->db_conn();			
			$q = $db->db_update("UPDATE `users` SET	
				`about_me`='".mysqli_real_escape_string($db_con, $fd['about'])."', `work`='".mysqli_real_escape_string($db_con, $fd['work'])."'
				WHERE `id`='".$gid."';");				
			mysqli_close($db_con);	echo '[{"result":'.json_encode($q).', "id":"'.$gid.'","itoken":"","error":""}]';	
		}
		if(isset($_POST['ft']) && $_POST['ft'] == '0-3-3')
		{
			parse_str($_POST['data_'], $fd); $db= new control(); $db_con = $db->db_conn();			
			$q = $db->db_update("UPDATE `users` SET 
				`dt_initiated`='".mysqli_real_escape_string($db_con, $fd['initiated'])."', 
				`chapter_id`='".mysqli_real_escape_string($db_con, $fd['chapt_'])."', 
				`president`='".mysqli_real_escape_string($db_con, $fd['president'])."', 
				`mi`='".mysqli_real_escape_string($db_con, $fd['mi'])."', 
				`sponsor`='".mysqli_real_escape_string($db_con, $fd['sponsor'])."', 
				`witness`='".mysqli_real_escape_string($db_con, $fd['witness'])."',
				`batch`='".mysqli_real_escape_string($db_con, $fd['batch'])."'
				WHERE `id`='".$gid."';");				
			mysqli_close($db_con);	echo '[{"result":'.json_encode($q).', "id":"'.$gid.'","itoken":"","error":""}]';	
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '10-0')
		{
			$db= new control();
			echo $db->j_select(['column'=>'id,name','table'=>"chapters",'condition'=>"inactive='0'"]);
		}


	}
}
else{ echo "SessionExpired"; }


function validateInput($a)
{
	parse_str($a, $fd); $rtn="1";
	if($fd['n_password'] != "")		
	{ 
		if(strlen($fd['n_password']) < 8) 	  { $rtn= json_encode([array('result'=>"-1",'input'=>".ProfileNewPwd_ipt",'error'=>"<b>Error in :</b> New Password must be atleast 8 characters length.")]); 		}	
		else if(strlen($fd['r_password']) < 8){ $rtn= json_encode([array('result'=>"-1",'input'=>".ProfileConfirm_ipt",'error'=>"<b>Error in :</b> Re-Type Password must be atleast 8 characters length.")]); }
		else{	if($fd['n_password'] != $fd['r_password']){ $rtn= json_encode([array('result'=>"-1",'input'=>".ProfileConfirm_ipt",'error'=>"<b>Error in :</b> New Password and Re-Type Password must be the same.")]); }	}
	}
	return $rtn;
}

?>