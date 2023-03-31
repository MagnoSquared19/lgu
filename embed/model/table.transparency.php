<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";
	$_POST['valid'] = "20-0";
	$_POST['like'] = "";
	$_POST['sort']="";
	$_POST['page']="150,1";
	$_POST['type']="1";
	$_POST['id']="9";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}

if(isset($_POST['token']) && $_POST['token'] == "0")
{
	require_once("../../config/settings/settings.php");

	if(isset($_POST['valid']) && $_POST['valid'] == '10')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,description FROM `local_budget` WHERE inactive='0' ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/local_budget/".$r['id'],null,['array'=>true]);

				$sub=[];
				$sq = $db->db_gen("SELECT id,title FROM `local_budget_sub` WHERE budget_id='".$r['id']."' AND inactive='0';");
				while($s=mysqli_fetch_array($sq))
				{
					$sFiles = $db->get_file_info("account/files/local_budget/".$r['id']."/sub/".$s['id'],null,['array'=>true]);	
					array_push($sub,array('id'=>$s['id'],'title'=>$s['title'],'itoken'=>$db->etoken($s['id']),'files'=>$sFiles));
				}

				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'description'=>$r['description'], 'files'=>$files, 'sub'=>$sub,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}

	

	if(isset($_POST['valid']) && $_POST['valid'] == '10-0')
	{
		$col = "id,name,ref_no,abc,acceptance_fr,acceptance_to,pre_bid,opening,remarks";
		$sort= ($_POST['sort']=="")?"10-acceptance_fr": $_POST['sort']."- `name`,`ref_no`,`abc`,`acceptance_fr`,`pre_bid`,`opening`,`remarks`";
		$con = "(`name` LIKE '%".$_POST['like']."%' OR `ref_no` LIKE '%".$_POST['like']."%' OR 
				`abc` LIKE '%".$_POST['like']."%') AND `inactive`='0' ";

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>"bid_items",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '11-0')
	{
		$col = "id,name,ref_no,amount,award,proceed,reason,awarded_to";
		$sort= ($_POST['sort']=="")?"10-award": $_POST['sort']."- `name`,`ref_no`,`amount`,`award`,`proceed`,`reason`,`awarded_to`";
		$con = "(`name` LIKE '%".$_POST['like']."%' OR `ref_no` LIKE '%".$_POST['like']."%' OR 
				`amount` LIKE '%".$_POST['like']."%' OR `reason` LIKE '%".$_POST['like']."%' OR 
				`awarded_to` LIKE '%".$_POST['like']."%') AND `inactive`='0' ";

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>"bid_results",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '12-0')
	{
		$col = "id,name,bulletin_no,dated,particulars,changes";
		$sort= ($_POST['sort']=="")?"10-dated": $_POST['sort']."- `name`,`bulletin_no`,`dated`,`particulars`,`changes`";
		$con = "(`name` LIKE '%".$_POST['like']."%' OR `bulletin_no` LIKE '%".$_POST['like']."%' OR 
				`particulars` LIKE '%".$_POST['like']."%' OR `changes` LIKE '%".$_POST['like']."%') AND `inactive`='0' ";

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>"bid_supplement",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
	}

	
	if(isset($_POST['valid']) && $_POST['valid'] == '20')
	{
		$col = "id,no_,title,filed_,approved_,status,description,num";						
		$sort= ($_POST['sort']=="")?"10-`id`": $_POST['sort']."- `title`,`no_`,`num`,`filed`,`approved`,`status`,`description`";

		$dte= "";
		//if($_POST['dFr'] !== "" && $_POST['dTo'] !== ""){ $dte = " AND `R`.filed BETWEEN '".$_POST['dFr']."' AND '".$_POST['dTo']."' "; }
		$stat= ($_POST['status']=="")?"":" AND `R`.status='".$_POST['status']."' ";

		$con = "(`no_` LIKE '%".$_POST['like']."%' OR 
				`title` LIKE '%".$_POST['like']."%' OR 
				`description` LIKE '%".$_POST['like']."%') AND `inactive`='0' ".$stat.$dte;

		$que = "SELECT `R`.id,`R`.no_,`R`.title,`R`.status,`R`.description,
				DATE_FORMAT(`R`.filed,'%m/%d/%Y') AS filed_, DATE_FORMAT(`R`.approved,'%m/%d/%Y') AS approved_, 
				(SELECT COUNT(id) FROM `trans_reso_items` WHERE `inactive`='0' AND reso_id=`R`.id LIMIT 1) AS num 
				FROM trans_resolutions `R`";

		$db= new control();	
		echo $db->j_select(['query'=>$que,'column'=>$col,'table'=>"trans_resolutions `R`",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page'],'file-count'=>"account/files/resolutions/"]);
	}
	if(isset($_POST['valid']) && $_POST['valid'] == '20-2')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		$id = $db->itoken($_POST['itoken']);
		
		$q= $db->db_gen("SELECT `R`.id,`R`.no_,`R`.title,`R`.status,`R`.description,`R`.filed,`R`.approved,
				(SELECT COUNT(id) FROM `trans_reso_items` WHERE `inactive`='0' AND reso_id=`R`.id LIMIT 1) AS num 
				FROM trans_resolutions `R` WHERE `R`.id='{$id}'; ");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/resolutions/".$r['id']."/docs",null,['array'=>true]);

				$sub=[];
				$sq = $db->db_gen("SELECT id,dated,title,description FROM `trans_reso_items` WHERE reso_id='{$id}' AND inactive='0';");
				while($s=mysqli_fetch_array($sq))
				{
					array_push($sub,array('id'=>$s['id'],'dated'=>$s['dated'],'title'=>$s['title'],'description'=>$s['description']));
				}

				array_push($rtn, array('id'=>$r['id'],'no_'=>$r['no_'],'title'=>$r['title'],'filed'=>$r['filed'],'approved'=>$r['approved'],'num'=>$r['num'],'status'=>$r['status'], 'description'=>$r['description'],'files'=>$files,'session'=>$sub));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}

	
}
else{ echo "SessionExpired"; }


?>