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

		$con= "(`P`.title LIKE '%".$_POST['uLike']."%' OR `P`.description LIKE '%".$_POST['uLike']."%') AND `P`.inactive='0' {$fid} ";
		$tbl= "ui_banner `P` LEFT JOIN users `U` ON `U`.id=`P`.user_id ";
		$q= $db->db_gen("SELECT `P`.id,`P`.user_id,`P`.title,`P`.link,`P`.description,
			IFNULL(`P`.dt_updated,`P`.dt_inserted) AS dated,
			CONCAT(COALESCE(CONCAT(`U`.fn,' '),''), COALESCE(CONCAT(`U`.mn,' '),''),`U`.ln) AS user
			FROM $tbl WHERE $con GROUP BY `P`.id ORDER BY `P`.ord,`P`.id $desc ".$db->paginate($_POST['page'])." ;");

		if(!$db->hasError)
		{ 
			$count=mysqli_fetch_array($db->db_gen("SELECT COUNT(`P`.id) AS cnt FROM $tbl WHERE $con LIMIT 1;"));
			while($r=mysqli_fetch_array($q))
			{
				$profile= $db->j_profile("account/files/users/".$r['user_id']."/profile","../images/files/blank_profile.png");
				$files  = $db->get_file_info("account/files/banner/".$r['id'],null,['array'=>true]);				
	
				array_push($rtn, array('id'=>$r['id'], 'date'=>$r['dated'], 'title'=>$r['title'],'description'=>$r['description'],'link'=>$r['link'],'user'=>$r['user'], 'user_id'=>$r['user_id'], 
					'profile'=>$profile,'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}							
			array_push($rtn, array('count'=>$count['cnt'],'limit'=>$pag['0'],'page'=>$pag['1']));				
			mysqli_close($db_con);

			echo json_encode($rtn); 
		}
		else{ echo $db->errorVal; mysqli_close($db_con); die(); }
	}
	if(isset($_POST['ft']) && $_POST['ft'] == '0X')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn(); $pag= explode(",",$_POST['page']);
		$fid= ($_POST['fid'])?" AND `P`.id='".$_POST['fid']."'":"";

		$desc=($_POST['sort']=="1")?"DESC":"";
		$archive= ($_POST['archive']=="true")?" AND `P`.archived='1' ":(($_POST['archive']=="false")?" AND `P`.archived='0' ":"");
		$dt=""; 
		if($_POST['ftr']=="2"){ $dt=" AND DATE(`P`.date_on)=DATE(NOW() - INTERVAL 1 DAY) "; 	}
		if($_POST['ftr']=="3"){ $dt=" AND DATE(`P`.date_on) BETWEEN  DATE(NOW() - INTERVAL 7 DAY) AND DATE(NOW())"; 	}
		if($_POST['ftr']=="4"){ $dt= " AND DATE(`P`.date_on) BETWEEN DATE(CURRENT_DATE - INTERVAL 1 MONTH) AND CURRENT_DATE "; }
		if($_POST['ftr']=="5"){ $dt= " AND DATE(`P`.date_on) BETWEEN '".$_POST['ftrFr']."' AND '".$_POST['ftrTo']."' "; }

		$con= "(`P`.title LIKE '%".$_POST['uLike']."%' OR `P`.sub_title LIKE '%".$_POST['uLike']."%' OR 
		`P`.venue LIKE '%".$_POST['uLike']."%' OR `P`.description LIKE '%".$_POST['uLike']."%') AND `P`.inactive='0' {$fid} {$archive} {$dt} ";
		$tbl= "poster `P` LEFT JOIN users `U` ON `U`.id=`P`.user_id ";
		$q= $db->db_gen("SELECT `P`.id,`P`.user_id,`P`.title,`P`.sub_title,`P`.description,
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
				$files  = $db->get_file_info("account/files/poster/".$r['id'],null,['array'=>true]);			
	
				array_push($rtn, array('id'=>$r['id'], 'date'=>$r['dated'], 'title'=>$r['title'], 'sub_title'=>$r['sub_title'],'description'=>$r['description'], 'date_on'=>$r['date_on'], 'venue'=>$r['venue'], 'user'=>$r['user'], 'user_id'=>$r['user_id'], 'me'=>(($r['user_id']==$gid)?"1":"0"),
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
			$con= "inactive='0'"; $db = new control();
			echo $db->j_select(['column'=>"id,title",'table'=>"ui_banner",'condition'=>$con,'sort'=>"00-ord"]);
		}

	if(intval($glevel)<=2)
	{
		if(isset($_POST['ft']) && $_POST['ft'] == '0-1')
		{
			$nID=""; parse_str($_POST['data_'], $fd);				
			$db = new control(); $db_con = $db->db_conn();	
			$query= $db->db_insert_id("INSERT INTO `ui_banner`(`title`,`description`,`ord`,`link`,`user_id`)	
				VALUES(
				'".mysqli_real_escape_string($db_con, $fd['title'])."',
				'".mysqli_real_escape_string($db_con, html_entity_decode($_POST['desc']))."',
				'".mysqli_real_escape_string($db_con, $fd['ord'])."',
				'".mysqli_real_escape_string($db_con, $fd['link'])."',
				'".mysqli_real_escape_string($db_con, $gid)."');	");	

			if($db->hasError){ echo '[{"result":'.json_encode($db->errorVal).'}]'; mysqli_close($db_con); die();  }
			else
			{
				$d = json_decode($query,true);
				$nID= $d['id'];

				$fle_err = $_FILES['uplFile']['error'];
				if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload = gUploader($nID,null,"../files/banner/,",null,null,"2000","2000");	}

				echo '[{"result":"1", "id":"'.$db->etoken($nID).'"}]';
			}					
			mysqli_close($db_con);				
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-2')
		{ 
			$rtn= []; $db= new control();  $db_con= $db->db_conn();	//$_POST['data_']="M1I2M1k4bzJIeXE4RmFVWG1QaEdWdz09";
			$q= $db->db_gen("SELECT `P`.id,`P`.title,`P`.description,`P`.link,`P`.ord FROM ui_banner `P` 
				WHERE `P`.id='".$db->itoken($_POST['data_'])."' ;");
			
			if(!$db->hasError)
			{ 
				while($r=mysqli_fetch_array($q))
				{					
					$files= $db->get_file_info("account/files/banner/".$r['id'],null,['array'=>true]);			
					array_push($rtn, array('id'=>$r['id'],'title'=>$r['title'],'description'=>$r['description'],
						'ord'=>$r['ord'],'link'=>$r['link'],'itoken'=>$_POST['data_'],'files'=>$files));
				}	
				array_push($rtn, array('itoken'=>$_POST['data_']));		
				mysqli_close($db_con); echo json_encode($rtn); 
			}
			else{ echo $db->errorVal; mysqli_close($db_con); die(); }
		}	

		if($_POST['ft'] == '0-3')
		{
			$rtn=[]; $id="0"; $err_code=""; $rID="";			
			parse_str($_POST['data_'], $fd);

			$db = new control(); $db_con = $db->db_conn();		$id= $db->itoken($fd['smd']);	
			$que= $db->db_update("UPDATE `ui_banner` SET	
				`title`='".mysqli_real_escape_string($db_con, $fd['title'])."',
				`description`='".mysqli_real_escape_string($db_con, $_POST['desc'])."',
				`ord`='".mysqli_real_escape_string($db_con, $fd['ord'])."',
				`link`='".mysqli_real_escape_string($db_con, $fd['link'])."'
				WHERE `id`='".mysqli_real_escape_string($db_con, $id)."';");

			$fle_err = $_FILES['uplFile']['error'];
			if(!$fle_err[0])
			{	
				require_once('file.parser.php');
				$tUpload = gUploader($id,"photo","../files/banner/,",null,null,"2000","2000");				
			}			
			mysqli_close($db_con);

			echo '[{"result":"'.$que.'", "id":"'.$db->itoken($fd['smd']).'", "itoken":"'.$fd['smd'].'", "error":"'.$err_code.'"}]';	
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-4')  { $db= new control();  echo $db->j_delete("`ui_banner`",$_POST['newRow'],['json'=>true]); }
	}
				
	
}
else{ echo "SessionExpired"; }


?>