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

	function setViewer($r)
	{
		$view="";
		if($r=="0"){ $view="All Users"; }
		if($r=="1"){ $view="Admin Only"; }
		if($r=="2"){ $view="Employees Only"; }
		if($r=="3"){ $view="Clients Only"; }

		return $view;
	}
	function ftrViewer($f)
	{
		$kind= $GLOBALS["kind"];
		$vw="";
		if($kind=="council"){ $vw="2"; }
		if($kind=="member") { $vw="3"; }
		
		if($f==1){ return $vw_=($kind=="admin")?"":" AND (`P`.view='0' OR `P`.view='".$vw."') "; }
		else if($f==2){ return $vw_=($kind=="admin")?"":" AND (view='0' OR view='".$vw."') "; }
	}


	if(isset($_POST['ft']) && $_POST['ft'] == '0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn(); $pag= explode(",",$_POST['page']);		
		$like= mysqli_real_escape_string($db_con, $_POST['uLike']);

		$dt=""; 
		if($_POST['ftr']=="2"){ $dt=" AND DATE(`P`.dt_inserted)=DATE(NOW() - INTERVAL 1 DAY) "; 	}
		if($_POST['ftr']=="3"){ $dt=" AND DATE(`P`.dt_inserted) BETWEEN DATE(NOW() - INTERVAL 7 DAY) AND DATE(NOW())"; 	}
		if($_POST['ftr']=="4"){ $dt= " AND DATE(`P`.dt_inserted) BETWEEN DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, '%Y/%m/01') 
			AND DATE_FORMAT(CURRENT_DATE, '%Y/%m/01')"; }
		if($_POST['ftr']=="5"){ $dt= " AND DATE(`P`.dt_inserted) BETWEEN '".$_POST['ftrFr']."' AND '".$_POST['ftrTo']."' "; }

		$con= "(`P`.title LIKE '%{$like}%' OR `P`.description LIKE '%{$like}%') AND `P`.inactive='0' ".ftrViewer(1)." {$dt}";

		$tbl= "notifications `P` LEFT JOIN users `U` ON `U`.id=`P`.user_id ";
		$q= $db->db_gen("SELECT `P`.id,`P`.user_id,`P`.title,`P`.description,`P`.view,`P`.dt_inserted AS dated,
			CONCAT(COALESCE(CONCAT(`U`.fn,' '),''), COALESCE(CONCAT(`U`.mn,' '),''),`U`.ln) AS user
			FROM $tbl WHERE $con GROUP BY `P`.id ORDER BY `P`.id DESC ".$db->paginate($_POST['page'])." ;");

		if(!$db->hasError)
		{ 
			$count=mysqli_fetch_array($db->db_gen("SELECT COUNT(`P`.id) AS cnt FROM $tbl WHERE $con LIMIT 1;"));
			while($r=mysqli_fetch_array($q))
			{
				$profile= $db->j_profile("account/files/users/".$r['user_id']."/profile","../images/files/blank_profile.png");	
				$files  = $db->get_file_info("account/files/notifications/".$r['id'],null,['array'=>true]);			
	
				array_push($rtn, array('id'=>$r['id'], 'date'=>$r['dated'], 'title'=>$r['title'], 'description'=>$r['description'], 'user'=>$r['user'], 'user_id'=>$r['user_id'], 'me'=>(($r['user_id']==$gid && $kind=="admin")?"1":"0"),
					'kind'=>($kind=="admin")?"1":"0",'viewer'=>setViewer($r['view']),
					'profile'=>$profile,'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}							
			array_push($rtn, array('count'=>$count['cnt'],'limit'=>$pag['0'],'page'=>$pag['1']));				
			mysqli_close($db_con);

			echo json_encode($rtn); 
		}
		else{ echo $db->errorVal; mysqli_close($db_con); die(); }
	}
		

	if(intval($glevel)<=2)
	{
		if(isset($_POST['ft']) && $_POST['ft'] == '0-1')
		{
			$nID=""; parse_str($_POST['data_'], $fd);				
			$db = new control(); $db_con = $db->db_conn();	
			$query= $db->db_insert_id("INSERT INTO `notifications`(`title`,`description`,`view`,`user_id`)
				VALUES(
				'".mysqli_real_escape_string($db_con, $fd['title'])."',
				'".mysqli_real_escape_string($db_con, html_entity_decode($_POST['desc']))."',
				'".mysqli_real_escape_string($db_con, $fd['viewer'])."',
				'".mysqli_real_escape_string($db_con, $gid)."');	");	

			if($db->hasError){ echo '[{"result":'.json_encode($db->errorVal).'}]'; mysqli_close($db_con); die();  }
			else
			{
				$d = json_decode($query,true);
				$nID= $d['id'];

				if(isset($_FILES['data_']))
				{
					$fle_err= $_FILES['data_']['error'];
					if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload = gUploader($nID,null,"../files/notifications/","data_",null, '900',"900"); }
				}					
				echo '[{"result":"1", "id":"'.$db->etoken($nID).'"}]';
			}					
			mysqli_close($db_con);				
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-2')
		{ 
			$rtn= []; $db= new control();  $db_con= $db->db_conn();	//$_POST['data_']="M1I2M1k4bzJIeXE4RmFVWG1QaEdWdz09";
			$q= $db->db_gen("SELECT `P`.id,`P`.title,`P`.description,`P`.view FROM notifications `P` 
				WHERE `P`.id='".$db->itoken($_POST['data_'])."' ;");
			
			if(!$db->hasError)
			{ 
				while($r=mysqli_fetch_array($q))
				{					
					$files= $db->get_file_info("account/files/notifications/".$r['id'],null,['array'=>true]);			
					array_push($rtn, array('id'=>$r['id'],'title'=>$r['title'],'description'=>$r['description'],'viewer'=>$r['view'],'files'=>$files));
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
			$que= $db->db_update("UPDATE `notifications` SET 
				`title`='".mysqli_real_escape_string($db_con, $fd['title'])."',
				`description`='".mysqli_real_escape_string($db_con, html_entity_decode($_POST['desc']))."',
				`view`='".mysqli_real_escape_string($db_con, $fd['viewer'])."',
				`dt_updated`=NOW()
				WHERE `id`='".mysqli_real_escape_string($db_con, $id)."';");					
			mysqli_close($db_con);

			if(isset($_FILES['data_']))
			{
				$fle_err= $_FILES['data_']['error'];
				if(!$fle_err[0]){ require_once('file.parser.php'); $tUpload= gUploader($id,null,"../files/notifications/","data_",null, '900',"900","false"); }
			}

			$files= $db->get_file_info("account/files/notifications/".$id,null,['array'=>true]);				
			
			array_push($rtn,['result'=>$que,'id'=>"$id",'title'=>$fd['title'],'description'=>html_entity_decode($_POST['desc']),'viewer'=>setViewer($fd['viewer']),'files'=>$files]);

			echo json_encode($rtn);
		}

		if(isset($_POST['ft']) && $_POST['ft'] == '0-4')  { $db= new control();  echo $db->j_delete("`notifications`",$_POST['newRow'],['json'=>true]); }
	}
				
	
}
else{ echo "SessionExpired"; }


?>