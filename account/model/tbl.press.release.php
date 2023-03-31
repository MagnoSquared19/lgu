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

		$dt=""; 
		if($_POST['ftr']=="2"){ $dt=" AND DATE(`P`.date_on)=DATE(NOW() - INTERVAL 1 DAY) "; 	}
		if($_POST['ftr']=="3"){ $dt=" AND DATE(`P`.date_on) BETWEEN DATE(NOW() - INTERVAL 7 DAY) AND DATE(NOW())"; 	}
		if($_POST['ftr']=="4"){ $dt=" AND DATE(`P`.date_on) BETWEEN DATE(NOW() - INTERVAL 14 DAY) AND DATE(NOW())"; }
		if($_POST['ftr']=="5"){ $dt=" AND DATE(`P`.date_on) BETWEEN DATE(CURRENT_DATE - INTERVAL 1 MONTH) AND CURRENT_DATE "; }
		if($_POST['ftr']=="6"){ $dt=" AND DATE(`P`.date_on) BETWEEN '".$_POST['ftrFr']."' AND '".$_POST['ftrTo']."' "; }

		$desc=($_POST['sort']=="1")?"DESC":"";

		$con= "(`P`.title LIKE '%".$_POST['uLike']."%' OR  
		`P`.venue LIKE '%".$_POST['uLike']."%' OR `P`.description LIKE '%".$_POST['uLike']."%') AND `P`.inactive='0' {$dt} {$fid} ";
		$tbl= "press_release `P` LEFT JOIN users `U` ON `U`.id=`P`.user_id ";
		$q= $db->db_gen("SELECT `P`.id,`P`.user_id,`P`.title,`P`.description,
			IFNULL(`P`.dt_updated,`P`.dt_inserted) AS dated,
			CONCAT(DAYNAME(`P`.date_on),', ',DATE_FORMAT(`P`.date_on, '%b. %d, %Y')) AS date_on,
			`P`.venue, CONCAT(COALESCE(CONCAT(`U`.fn,' '),''), COALESCE(CONCAT(`U`.mn,' '),''),`U`.ln) AS user
			FROM $tbl WHERE $con GROUP BY `P`.id ORDER BY `P`.date_on $desc ".$db->paginate($_POST['page'])." ;");

		if(!$db->hasError)
		{ 
			$count=mysqli_fetch_array($db->db_gen("SELECT COUNT(`P`.id) AS cnt FROM $tbl WHERE $con LIMIT 1;"));
			while($r=mysqli_fetch_array($q))
			{
				$profile= $db->j_profile("account/files/users/".$r['user_id']."/profile","../images/files/blank_profile.png");	
				$files  = $db->get_file_info("account/files/press_release/".$r['id'],null,['array'=>true]);			
	
				array_push($rtn, array('id'=>$r['id'], 'date'=>$r['dated'], 'title'=>$r['title'],'description'=>$r['description'], 'date_on'=>$r['date_on'], 'venue'=>$r['venue'], 'user'=>$r['user'], 'user_id'=>$r['user_id'], 'me'=>(($r['user_id']==$gid)?"1":"0"),
					'profile'=>$profile,'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}							
			array_push($rtn, array('count'=>$count['cnt'],'limit'=>$pag['0'],'page'=>$pag['1']));
			echo json_encode($rtn); 
			mysqli_close($db_con);
		}
		else{ echo $db->errorVal; mysqli_close($db_con); die(); }
	}
		if(isset($_POST['ft']) && $_POST['ft'] == '0-0-1')
		{
			$con= "inactive='0'"; $db = new control();
			echo $db->j_select(['column'=>"id,title,date_on",'table'=>"press_release",'condition'=>$con,'sort'=>"10-date_on"]);
		}

	if($glevel=="1" || $glevel=="2")
	{
		if(isset($_POST['ft']) && $_POST['ft'] == '0-1')
		{
			$nID=""; parse_str($_POST['data_'], $fd);				
			$db = new control(); $db_con = $db->db_conn();	
			$query= $db->db_insert_id("INSERT INTO `press_release`(`title`,`description`,`date_on`,`venue`,`user_id`)	
				VALUES(
				'".mysqli_real_escape_string($db_con, $fd['title'])."',
				'".mysqli_real_escape_string($db_con, html_entity_decode($_POST['desc']))."',
				'".mysqli_real_escape_string($db_con, $fd['date'])."',
				'".mysqli_real_escape_string($db_con, $fd['venue'])."',
				'".mysqli_real_escape_string($db_con, $gid)."');	");	

			if($db->hasError){ echo '[{"result":'.json_encode($db->errorVal).'}]'; mysqli_close($db_con); die();  }
			else
			{
				$d = json_decode($query,true);
				$nID= $d['id'];

				if(isset($_FILES['data_']))
				{
					$fle_err= $_FILES['data_']['error'];
					if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload = gUploader($nID,null,"../files/press_release/","data_",null, '900',"900"); }
				}					
				echo '[{"result":"1", "id":"'.$db->etoken($nID).'"}]';
			}					
			mysqli_close($db_con);				
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-2')
		{ 
			$rtn= []; $db= new control();  $db_con= $db->db_conn();	//$_POST['data_']="M1I2M1k4bzJIeXE4RmFVWG1QaEdWdz09";
			$q= $db->db_gen("SELECT `P`.id,`P`.title,`P`.description,`P`.date_on,`P`.venue FROM press_release `P` 
				WHERE `P`.id='".$db->itoken($_POST['data_'])."' ;");
			
			if(!$db->hasError)
			{ 
				while($r=mysqli_fetch_array($q))
				{					
					$files= $db->get_file_info("account/files/press_release/".$r['id'],null,['array'=>true]);			
					array_push($rtn, array('id'=>$r['id'],'title'=>$r['title'],'description'=>$r['description'],
						'date_on'=>$r['date_on'],'venue'=>$r['venue'],'files'=>$files));
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
			$que= $db->db_update("UPDATE `press_release` SET 
				`title`='".mysqli_real_escape_string($db_con, $fd['title'])."',				
				`description`='".mysqli_real_escape_string($db_con, html_entity_decode($_POST['desc']))."',
				`date_on`='".mysqli_real_escape_string($db_con, $fd['date'])."',
				`venue`='".mysqli_real_escape_string($db_con, $fd['venue'])."',
				`dt_updated`=NOW()
				WHERE `id`='".mysqli_real_escape_string($db_con, $id)."';");					
			mysqli_close($db_con);

			if(isset($_FILES['data_']))
			{
				$fle_err= $_FILES['data_']['error'];
				if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload= gUploader($id,null,"../files/press_release/","data_",null, '900',"900","false"); }
			}

			$date =($fd['date'])?date('l, M. d, Y',strtotime($fd['date'])):"";
			$files= $db->get_file_info("account/files/press_release/".$id,null,['array'=>true]);				
			
			array_push($rtn, ['result'=>$que,'id'=>"$id",'title'=>$fd['title'],'description'=>html_entity_decode($_POST['desc']), 'date_on'=>"$date",'venue'=>$fd['venue'],'files'=>$files]);

			echo json_encode($rtn);
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-4')  { $db= new control();  echo $db->j_delete("`press_release`",$_POST['newRow'],['json'=>true]); }
	}
				
	
}
else{ echo "SessionExpired"; }


?>