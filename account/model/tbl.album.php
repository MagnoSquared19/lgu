<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";	
	$_POST['fb'] = "27";
	$_POST['ft'] = "0";
	$_POST['uLike'] = "";
	$_POST['sort']="";
	$_POST['page']="15,1";
	$_POST['tpe']="0";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}
require_once("../../config/model/global_var.php");

if(isset($gid) && isset($_POST['token']) && $_POST['token'] == "0")
{
	require_once("../../config/settings/settings.php");	
	if(isset($_POST['ft']) && $_POST['ft'] == '0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn(); $pag= explode(",",$_POST['page']);
		$fid= ($_POST['fid'])?" AND `P`.id='".$_POST['fid']."'":"";

		$desc=($_POST['sort']=="1")?"DESC":"";

		$con= "(`P`.title LIKE '%".$_POST['uLike']."%') AND `P`.inactive='0' $fid";
		$tbl= "album `P` LEFT JOIN users `U` ON `U`.id=`P`.user_id ";
		$q= $db->db_gen("SELECT `P`.id,`P`.user_id,`P`.title,
			IFNULL(`P`.dt_updated,`P`.dt_inserted) AS dated,
			CONCAT(COALESCE(CONCAT(`U`.fn,' '),''), COALESCE(CONCAT(`U`.mn,' '),''),`U`.ln) AS user
			FROM $tbl WHERE $con GROUP BY `P`.id ORDER BY `P`.dt_inserted $desc ".$db->paginate($_POST['page'])." ;");

		if(!$db->hasError)
		{ 
			$count=mysqli_fetch_array($db->db_gen("SELECT COUNT(`P`.id) AS cnt FROM $tbl WHERE $con LIMIT 1;"));
			while($r=mysqli_fetch_array($q))
			{
				$profile= $db->j_profile("account/files/users/".$r['user_id']."/profile","../images/files/blank_profile.png");	
				$files  = $db->get_file_info("account/files/album/".$r['id'],null,['array'=>true]);			
	
				array_push($rtn, array('id'=>$r['id'], 'date'=>$r['dated'], 'title'=>$r['title'], 'user'=>$r['user'], 'user_id'=>$r['user_id'], 'me'=>(($r['user_id']==$gid)?"1":"0"),
					'profile'=>$profile,'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}							
			array_push($rtn, array('count'=>$count['cnt'],'limit'=>$pag['0'],'page'=>$pag['1']));				
			mysqli_close($db_con);

			echo json_encode($rtn); 
		}
		else{ echo $db->errorVal; mysqli_close($db_con); die(); }
	}
		if(isset($_POST['ft']) && $_POST['ft'] == '0-0-1')
		{
			$db = new control(); echo $db->j_select(['column'=>"id,title",'table'=>"album",'condition'=>"inactive='0'",'sort'=>"00-title"]);
		}

	if($glevel=="1" || $glevel=="2")
	{
		if(isset($_POST['ft']) && $_POST['ft'] == '0-1')
		{
			$nID=""; parse_str($_POST['data_'], $fd);				
			$db = new control(); $db_con = $db->db_conn();	
			$query= $db->db_insert_id("INSERT INTO `album`(`title`,`user_id`)	
				VALUES(
				'".mysqli_real_escape_string($db_con, $fd['title'])."',
				'".mysqli_real_escape_string($db_con, $gid)."');	");	

			if($db->hasError){ echo '[{"result":'.json_encode($db->errorVal).'}]'; mysqli_close($db_con); die();  }
			else
			{
				$d = json_decode($query,true);
				$nID= $d['id'];

				if(isset($_FILES['data_']))
				{
					$fle_err= $_FILES['data_']['error'];
					if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload = gUploader($nID,null,"../files/album/","data_",null, '900',"900"); }
				}					
				echo '[{"result":"1", "id":"'.$db->etoken($nID).'"}]';
			}					
			mysqli_close($db_con);				
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-2')
		{ 
			$rtn= []; $db= new control();  $db_con= $db->db_conn();
			$q= $db->db_gen("SELECT `P`.id,`P`.title FROM album `P` WHERE `P`.id='".$db->itoken($_POST['data_'])."' ;");
			
			if(!$db->hasError)
			{ 
				while($r=mysqli_fetch_array($q))
				{					
					$files= $db->get_file_info("account/files/album/".$r['id'],null,['array'=>true]);			
					array_push($rtn, array('id'=>$r['id'],'title'=>$r['title'],'files'=>$files));
				}				
				mysqli_close($db_con); echo json_encode($rtn); 
			}
			else{ echo $db->errorVal; mysqli_close($db_con); die(); }
		}	
		if(isset($_POST['ft']) && $_POST['ft'] == '0-3')
		{				
			parse_str($_POST['data_'], $fd);
			if(isset($_POST['del_'])){ for($i=0;$i<count($_POST['del_']);$i++){unlink(str_replace($host,"/",$jroot.$_POST['del_'][$i])); } }

			$rtn= []; $db= new control();  $db_con= $db->db_conn(); $id= $db->itoken($_POST['smd']);	
			$que= $db->db_update("UPDATE `album` SET 
				`title`='".mysqli_real_escape_string($db_con, $fd['title'])."',
				`dt_updated`=NOW()
				WHERE `id`='".mysqli_real_escape_string($db_con, $id)."';");					
			mysqli_close($db_con);

			if(isset($_FILES['data_']))
			{
				$fle_err= $_FILES['data_']['error'];
				if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload= gUploader($id,null,"../files/album/","data_",null, '900',"900","false"); }
			}
			$files= $db->get_file_info("account/files/album/".$id,null,['array'=>true]);			
			array_push($rtn, ['result'=>$que,'id'=>"$id",'title'=>$fd['title'],'files'=>$files]);

			echo json_encode($rtn);
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-4')  { $db= new control();  echo $db->j_delete("`album`",$_POST['newRow'],['json'=>true]); }
	}
				
	
}
else{ echo "SessionExpired"; }


?>