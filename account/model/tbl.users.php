<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";	
	$_POST['fb'] = "27";
	$_POST['ft'] = "0-2";
	$_POST['uLike'] = "";

	$_POST['sort']="10"; $_POST['page']="15,1";
	
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}

require_once("../../config/model/global_var.php");
if(isset($gid) && isset($_POST['token']) && isset($_POST['fb']))
{
	require_once("../../config/settings/settings.php");
	if($_POST['ft']== '0')
	{
		$sort=($_POST['sort']=="")?"": $_POST['sort']."- `U`.`fn`, `P`.`name`, `L`.`name`, `U`.`cp`, `U`.`email` ";
		$con = "(`U`.`fn` LIKE '%".$_POST['uLike']."%' OR `U`.`mn` LIKE '%".$_POST['uLike']."%' OR `U`.`ln` LIKE '%".$_POST['uLike']."%' OR 
		`U`.`gender` LIKE '%".$_POST['uLike']."%' OR 
		`P`.`name` LIKE '%".$_POST['uLike']."%' OR `L`.`name` LIKE '%".$_POST['uLike']."%' OR 
		(CONCAT(U.`fn`,' ',U.`mn`) LIKE '%".$_POST['uLike']."%') OR 
		(CONCAT(U.`fn`,' ',U.`ln`) LIKE '%".$_POST['uLike']."%') OR 
		(CONCAT(U.`fn`,' ',U.`mn`,' ',U.`ln`) LIKE '%".$_POST['uLike']."%')
		)	
		AND `U`.`inactive`='0' ".(($gpos=="1")?"":" AND `U`.position!='1' ");

		$col= "id,fn,mn,ln,email,cp,address,position,level";
		$tbl= "users `U` LEFT JOIN `user_position` `P` ON `P`.`id`=`U`.`position` LEFT JOIN `user_level` `L` ON `L`.`id`=`U`.`level` ";
		$que= "SELECT `U`.`id`,`U`.`fn`,`U`.`mn`,`U`.`ln`,`U`.`email`,`U`.`cp`,`U`.`address`,`P`.`name` AS position,`L`.`name` AS level FROM ".$tbl;

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>$tbl,'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page'],'query'=>$que]);
	}		
		if($_POST['ft']== '0-0-1'){ $db=new control(); echo $db->j_select(['column'=>"id,name",'table'=>"user_position",'condition'=>"inactive='0'"]); }
		if($_POST['ft']== '0-0-2'){ $db= new control(); echo $db->j_select(['column'=>"id,name",'table'=>"user_level",'condition'=>"inactive='0'"]); }	
	
	if(intval($glevel)<=2)
	{
		if($_POST['ft']== '0-1')
		{
			$nID="";$result="1";$err="";$err_bool=""; 			
			parse_str($_POST['data_'], $fd);
			
			$db = new control();
			$db_con = $db->db_conn();	

			$validate = $db->db_select("SELECT `un` FROM users WHERE `un`='".mysqli_real_escape_string($db_con, $fd['usern'])."' AND inactive='0';");
			if(mysqli_num_rows($validate) > 0){	$err="0-1"; $result="Not valid Username! This username was already taken. Please change username.";}
			else
			{
				$query = $db->db_insert_id("INSERT INTO users(`fn`,`mn`,`ln`,`level`,`position`,`email`,`cp`,`un`,`pw`)	
					VALUES(
					'".mysqli_real_escape_string($db_con, $fd['fn'])."',
					'".mysqli_real_escape_string($db_con, $fd['mn'])."',
					'".mysqli_real_escape_string($db_con, $fd['ln'])."',
					'".mysqli_real_escape_string($db_con, $fd['level'])."',
					'".mysqli_real_escape_string($db_con, $fd['pos'])."',
					'".mysqli_real_escape_string($db_con, $fd['email'])."',
					'".mysqli_real_escape_string($db_con, $fd['mobile'])."',
					'".mysqli_real_escape_string($db_con, $fd['usern'])."', 
					sha1('".mysqli_real_escape_string($db_con, $fd['passw'])."'));	");

				if($db->hasError){ echo '[{"result":'.json_encode($db->errorVal).'}]'; mysqli_close($db_con); die();  }
				else
				{
					$d= json_decode($query,true);
					$fle_err = $_FILES['uplFile']['error'];
					if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload = gUploader($d['id'],"photo",",profile",null,null,"400","400"); }
				}				
			}
					
			echo '[{"result":"'.$result.'", "id":"'.$db->etoken($nID).'", "error":"'.$err.'"}]';	
			mysqli_close($db_con);				
		}
		if($_POST['ft']== '0-2')
		{
			$img= ["account/files/users/","/profile","../images/files/blank_profile.png"];				
			$db= new control(); echo $db->j_select(['table'=>"users",'condition'=>"id='".$db->itoken($_POST['data_'])."'",'image'=>$img]);
		}
	
		if($_POST['ft']== '0-3')
		{
			$id="0"; $result=""; $err_code=""; $rID="";	
			parse_str($_POST['data_'], $fd);

			$db= new control(); $db_con= $db->db_conn();			
			$query = $db->db_update("UPDATE users	SET	
				`fn`='".mysqli_real_escape_string($db_con, $fd['fn'])."',
				`mn`='".mysqli_real_escape_string($db_con, $fd['mn'])."',
				`ln`='".mysqli_real_escape_string($db_con, $fd['ln'])."',
				`position`='".mysqli_real_escape_string($db_con, $fd['pos'])."',
				`level`='".mysqli_real_escape_string($db_con, $fd['level'])."',
				`cp`='".mysqli_real_escape_string($db_con, $fd['mobile'])."',
				`email`='".mysqli_real_escape_string($db_con, $fd['email'])."'	
				WHERE `id`='".mysqli_real_escape_string($db_con, $db->itoken($fd['smd']))."';	");
			$result = ($query == "1") ? "1":$query;

			$fle_err = $_FILES['uplFile']['error'];
			if(!$fle_err[0])
			{	
				require_once('file.parser.php');
				$tUpload = gUploader($db->itoken($fd['smd']),"photo",",profile",null,null,"400","400");					
			}				
			mysqli_close($db_con);			
			echo '[{"result":"'. $result .'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'", "error":"'.$err_code.'"}]';	
		}
		if($_POST['ft']== '0-4'){ $db= new control();  echo $db->j_delete("`users`",$_POST['newRow']); }	
	}	
}
else{ echo "SessionExpired"; }


?>