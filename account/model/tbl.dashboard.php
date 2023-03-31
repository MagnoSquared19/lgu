<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";	
	$_POST['fb'] = "27";
	$_POST['ft'] = "0-0-3";
	$_POST['uLike'] = "";
	$_POST['sort']="";
	$_POST['page']="10,1";
	$_POST['dated']="2020-08";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}

require_once("../../config/model/global_var.php");
if(isset($gid) && isset($_POST['token']) && isset($_POST['fb']))
{
	require_once("../../config/settings/settings.php");

	if($_POST['ft'] == '0')
	{
		
	}	

	if($_POST['ft']== '0-0-1')
	{
		$db=new control(); 
		$rst= [];

		if($kind=="admin")
		{
			$col= "id,c_user";
			$con= "`inactive`='0' ";
			$q  = "SELECT `id`,COUNT(`id`) AS c_user FROM `users` ";
			$rst= $db->j_select(['array'=>true,'query'=>$q,'column'=>$col,'table'=>"`users`",'condition'=>$con]);
		}
		else if($kind=="member")
		{
			$col= "id,c_member,logbook";
			$con= "`inactive`='0' AND chapter_id='{$chapter_id}' ";
			$q  = "SELECT `id`,COUNT(`id`) AS c_member,
					(SELECT COUNT(`id`) FROM `chapter_meetings` WHERE `inactive`='0' AND chapter_id='{$chapter_id}' ) AS logbook
					FROM `members` ";
			$rst= $db->j_select(['array'=>true,'query'=>$q,'column'=>$col,'table'=>"`members`",'condition'=>$con]);
		}		
	
		$gb= 1073741824;
		$tTotal= number_format((disk_total_space($jroot) / $gb), 2);
		$tFree = number_format((disk_free_space($jroot) / $gb), 2); 		
		
		$total = $tTotal.(($tTotal>1)?" GB":" MB");
		$free  = $tFree.(($tFree>1)?" GB":" MB");
		$critic= ($tFree < 10)?"1":"0";

		array_push($rst,array('storage_total'=>$total,'storage_free'=>$free,'critical'=>$critic));
		echo json_encode($rst);
	}
	
	if($_POST['ft']== '0-0-2')
	{
		$db=new control(); 
		$vw_ftr= "";
		if($kind=="member"){ $vw_ftr= " AND (view='0' OR view='3') "; }

		$con= " inactive='0' {$vw_ftr} ";
		echo $db->j_select(['column'=>"id,title,sub_title,date_on,date_end,venue,description",'table'=>"events",'condition'=>$con,'sort'=>"10- `date_on`"]);
	}
	if($_POST['ft']== '0-0-3')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn(); $pag= explode(",",$_POST['page']);	

		$vw_ftr= "";
		if($kind=="member"){ $vw_ftr= " AND (`P`.view='0' OR `P`.view='3') "; }

		$con= " `P`.inactive='0' {$vw_ftr} ";
		$tbl= "notifications `P` LEFT JOIN users `U` ON `U`.id=`P`.user_id ";
		$q= $db->db_gen("SELECT `P`.id,`P`.user_id,`P`.title,`P`.description,`P`.dt_inserted AS dated,
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
					'profile'=>$profile,'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}							
			array_push($rtn, array('count'=>$count['cnt'],'limit'=>$pag['0'],'page'=>$pag['1']));				
			mysqli_close($db_con);

			echo json_encode($rtn); 
		}
		else{ echo $db->errorVal; mysqli_close($db_con); die(); }
	}



	if($_POST['ft']== '0-0-10')
	{
		$present=[]; $db= new control(); $db_con= $db->db_conn();
		$q=$db->db_select("SELECT id,CONCAT(present,',',absent) AS present FROM `class_attendance` WHERE inactive='0' AND dated=CURDATE()");

		while($r=mysqli_fetch_array($q)) 
		{
			$arr= explode(',', $r['present']);
			for($i=0;$i<count($arr);$i++){ if($arr[$i]!='' && !in_array($arr[$i], $present)){ array_push($present, $arr[$i]); } }
		}
		echo json_encode([array('result'=>"1",'count'=>count($present))]);
	}
	if($_POST['ft']== '0-0-11')
	{ 
		$db= new control(); $db_con= $db->db_conn(); $dated= mysqli_real_escape_string($db_con, $_POST['dated']);
		$grand_total=0; $unpaid=0;

		/*echo "SELECT DISTINCT(`class_id`), 
		(
		    COALESCE((SELECT SUM(`amount`) FROM st_fees_amount WHERE inactive='0' AND class_id=`E`.class_id AND DATE_FORMAT(due_date, '%Y-%m')='{$dated}' LIMIT 1),'0') * 
		    (SELECT COUNT(`id`) FROM `class_enrolled` WHERE inactive='0' AND class_id=`E`.class_id LIMIT 1)
		) AS total 
		FROM `class_enrolled` `E` WHERE `E`.inactive='0' GROUP BY `E`.class_id"; die();*/

		$q1= $db->db_select("SELECT `E`.id,
		( 
		    COALESCE((SELECT SUM(`amount`) FROM st_fees_amount WHERE inactive='0' AND class_id=`E`.class_id 
		    AND type_id=`T`.id AND payment_mode_id=`E`.payment_mode AND DATE_FORMAT(due_date, '%Y-%m')='{$dated}' LIMIT 1),'0') * 
		    COALESCE((SELECT COUNT(`id`) FROM `class_enrolled` WHERE inactive='0' AND class_id=`E`.class_id AND class_type=`E`.class_type AND payment_mode=`E`.payment_mode LIMIT 1),0) 
		) AS total     
		FROM `class_enrolled` `E` CROSS JOIN class_type `T` WHERE `E`.inactive='0'");

		while($r=mysqli_fetch_array($q1)) 
		{
			$grand_total += floatval($r['total']);
		}
		$q2= $db->db_select("SELECT COALESCE(SUM(paid),'0') AS payments FROM `st_fees` WHERE inactive='0' AND DATE_FORMAT(dt_paid, '%Y-%m')='{$dated}' ");
		$p = mysqli_fetch_array($q2);
		$q3= $db->db_select("SELECT COALESCE(SUM(amount),'0') AS exp FROM `expense` WHERE inactive='0' AND DATE_FORMAT(dated, '%Y-%m')='{$dated}' ");
		$e = mysqli_fetch_array($q3);

		$unpaid = $grand_total - floatval($p['payments']);
		echo json_encode([array('grand_total'=>"{$grand_total}",'payments'=>$p['payments'],'expense'=>$e['exp'],'unpaid'=>"{$unpaid}" )]);
	}
	
	


/*
============================================================================
SELECT DISTINCT(`class_id`), 
(
    COALESCE((SELECT SUM(`amount`) FROM st_fees_amount WHERE inactive='0' AND class_id=`E`.class_id AND DATE_FORMAT(due_date, '%Y-%m')='2020-08' LIMIT 1),'0') * 
    (SELECT COUNT(`id`) FROM `class_enrolled` WHERE inactive='0' AND class_id=`E`.class_id LIMIT 1)
) AS total 
FROM `class_enrolled` `E` WHERE `E`.inactive='0' GROUP BY `E`.class_id
============================================================================
SELECT DISTINCT(`class_id`), 
(
    (SELECT SUM(`amount`) FROM st_fees_amount WHERE inactive='0' AND class_id=`E`.class_id AND DATE_FORMAT(due_date, '%Y-%m')='2020-08' LIMIT 1) * 
    (SELECT COUNT(`id`) FROM `class_enrolled` WHERE inactive='0' AND class_id=`E`.class_id LIMIT 1)
) AS total 

FROM `class_enrolled` `E` 
WHERE `E`.inactive='0' GROUP BY `E`.class_id
============================================================================
SELECT DISTINCT(`class_id`), 
(SELECT SUM(`amount`) FROM st_fees_amount WHERE class_id=`E`.class_id AND
inactive='0' AND DATE_FORMAT(due_date, '%Y-%m')='2020-08'
 
LIMIT 1) AS total 

FROM `class_enrolled` `E` 
WHERE `E`.inactive='0' GROUP BY `E`.class_id
============================================================================
SELECT DISTINCT(`class_id`), 
(SELECT SUM(`amount`) FROM st_fees_amount WHERE class_id=`E`.class_id LIMIT 1) AS total 

FROM `class_enrolled` `E` 
WHERE `E`.inactive='0' GROUP BY `E`.class_id
============================================================================
*/


	if($glevel=="1" || $glevel=="2")
	{
		if($_POST['ft']=='0-1'){ }
		if($_POST['ft']=='0-2'){ }			
		if($_POST['ft']=='0-3'){ }
		if($_POST['ft']=='0-4'){ }
	}
}
else{ echo "SessionExpired"; }


?>