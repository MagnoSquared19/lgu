<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";
	$_POST['valid'] = "x";
	$_POST['uLike'] = "";
	$_POST['sort']="";
	$_POST['page']="150,1";
	$_POST['type']="1";
	$_POST['id']="9";
}

if(session_status() == PHP_SESSION_NONE){	session_start();	}

if(isset($_POST['token']) && $_POST['token'] == "0")
{
	require_once("../../config/settings/settings.php");

	if(isset($_POST['valid']) && $_POST['valid'] == '100-0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,sub_title,venue,description,date_on AS dated,
			DATE_FORMAT(date_on, '%b. %d, %Y %l:%i %p') AS date_on, 
			DATE_FORMAT(date_end, '%b. %d, %Y %l:%i %p') AS date_end
			FROM `events` WHERE inactive='0' AND view='0' AND id='".$_POST['pid']."' ORDER BY dated DESC ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/events/".$r['id'],null,['array'=>true]);				
				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'sub_title'=>$r['sub_title'], 'date_on'=>$r['date_on'], 'date_end'=>$r['date_end'], 'venue'=>$r['venue'], 'description'=>$r['description'], 'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}
	if(isset($_POST['valid']) && $_POST['valid'] == '101-0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,venue,description,date_on AS dated,
			CONCAT(DAYNAME(date_on),', ',DATE_FORMAT(date_on, '%b. %d, %Y')) AS date_on
			FROM `press_release` WHERE inactive='0' AND id='".$_POST['pid']."' ORDER BY dated DESC ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/press_release/".$r['id'],null,['array'=>true]);				
				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'date_on'=>$r['date_on'], 'venue'=>$r['venue'], 'description'=>$r['description'], 'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '10')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		$img= ["account/files/events/","","images/files/no-image-long.png"];
		$page= (isset($_POST['page']) && ($_POST['page']!=""))?$_POST['page']:"5,1";

		$id= (isset($_POST['bid']))?" AND id!='".$_POST['bid']."' ":"";	
		$con= "(title LIKE '%".$_POST['uLike']."%' OR description LIKE '%".$_POST['uLike']."%') AND inactive='0' AND view='0' {$id} ";

		$col= "id,title,date_on,description";
		$que= "SELECT id,title,date_on AS dated,DATE_FORMAT(date_on, '%b. %d, %Y') AS date_on,description FROM `events`";
		$sort="10-dated,id";

		echo $db->j_select(['column'=>$col,'table'=>"events",'condition'=>$con,'sort'=>$sort,'paginate'=>$page,'query'=>$que,'image'=>$img]);

	}
	if(isset($_POST['valid']) && $_POST['valid'] == '20')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		$img= ["account/files/press_release/","","images/files/no-image-long.png"];

		$page= (isset($_POST['page']))?$_POST['page']:"150,1";
		$id= (isset($_POST['bid']))?" AND id!='".$_POST['bid']."' ":"";	
		$con= "(title LIKE '%".$_POST['uLike']."%' OR description LIKE '%".$_POST['uLike']."%') AND inactive='0' {$id} ";

		$col= "id,title,date_on,venue,description";
		$que= "SELECT id,title,venue,date_on AS dated,DATE_FORMAT(date_on, '%b. %d, %Y') AS date_on,description FROM `press_release`";
		$sort="10-dated,id";

		echo $db->j_select(['column'=>$col,'table'=>"press_release",'condition'=>$con,'sort'=>$sort,'paginate'=>$page,'query'=>$que,'image'=>$img]);

	}


	if(isset($_POST['valid']) && $_POST['valid'] == '50-1')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		$img= ["account/files/press_release/","","images/files/no-image.png"];	

		$col= "id,title,date_on,description";
		$que= "SELECT id,title,date_on AS dated,DATE_FORMAT(date_on, '%b. %d, %Y') AS date_on,description FROM `press_release`";
		$con= "inactive='0' ";
		$sort="10-dated,id";

		echo $db->j_select(['column'=>$col,'table'=>"press_release",'condition'=>$con,'sort'=>$sort,'paginate'=>"5,1",'query'=>$que,'image'=>$img]);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '60-1')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		$img= ["account/files/events/","","images/files/no-image.png"];	

		$col= "id,title,date_on,description";
		$que= "SELECT id,title,date_on AS dated,DATE_FORMAT(date_on, '%b. %d, %Y') AS date_on,description FROM `events`";
		$con= "inactive='0' AND view='0' ";
		$sort="10-dated,id";

		echo $db->j_select(['column'=>$col,'table'=>"events",'condition'=>$con,'sort'=>$sort,'paginate'=>"5,1",'query'=>$que,'image'=>$img]);
	}

	

	
		


	/* --:-- */
	if(isset($_POST['valid']) && $_POST['valid'] == '100-3')
	{
		if($_POST['val']=='0'){ unset($_SESSION['brgy']['dark']); }
		if($_POST['val']=='1'){ $_SESSION['brgy']['dark']=1; 	 }
	}
	if(isset($_POST['valid']) && $_POST['valid'] == '101-3')
	{
		if($_POST['val']=='0'){ unset($_SESSION['brgy']['zoom']); }
		if($_POST['val']=='1'){ $_SESSION['brgy']['zoom']=1; 	 }
		if($_POST['val']=='2'){ $_SESSION['brgy']['zoom']=2; 	 }
	}
	/*
	if(isset($_POST['valid']) && $_POST['valid'] == '1')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		$img= ["account/files/blogs/","","images/files/no-image-long.png"];	

		$col= "id,t,title,date_on,description";
		$que= "SELECT id,t,title,DATE_FORMAT(date_on, '%b. %d, %Y') AS date_on,description FROM `blogs`";
		$con= "inactive='0' AND t='".$_POST['type']."' AND id!='".$_POST['bid']."' ";
		$sort="10-date_on,id";

		echo $db->j_select(['column'=>$col,'table'=>"blogs",'condition'=>$con,'sort'=>$sort,'paginate'=>"150,1",'query'=>$que,'image'=>$img]);

	}

	if(isset($_POST['valid']) && $_POST['valid'] == '10-0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		$img= ["account/files/blogs/","","images/files/no-image-long.png"];	

		$col= "id,t,title,description";
		$que= "SELECT id,t,title,description FROM `blogs`";
		$con= "inactive='0' AND t!='".$_POST['type']."' AND id!='".$_POST['bid']."' ORDER BY RAND() ";
		$sort="00-id";

		echo $db->j_select(['column'=>$col,'table'=>"blogs",'condition'=>$con,'paginate'=>"150,1",'query'=>$que,'image'=>$img]);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '20-0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("
			(SELECT id,t,DATE_FORMAT(date_on, '%M %d, %Y') AS date_on,title,description FROM `blogs` WHERE inactive='0' AND t='1' ORDER BY date_on DESC LIMIT 1) UNION
			(SELECT id,t,DATE_FORMAT(date_on, '%M %d, %Y') AS date_on,title,description FROM `blogs` WHERE inactive='0' AND t='2' ORDER BY date_on DESC LIMIT 1) UNION
			(SELECT id,t,DATE_FORMAT(date_on, '%M %d, %Y') AS date_on,title,description FROM `blogs` WHERE inactive='0' AND t='3' ORDER BY date_on DESC LIMIT 1) UNION
			(SELECT id,t,DATE_FORMAT(date_on, '%M %d, %Y') AS date_on,title,description FROM `blogs` WHERE inactive='0' AND t='4' ORDER BY date_on DESC LIMIT 1) ");

		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$image= $db->j_profile("account/files/blogs/".$r['id'],"images/files/no-image-long.png");
				array_push($rtn, array('id'=>$r['id'],'t'=>$r['t'], 'title'=>$r['title'], 'description'=>$r['description'], 'date_on'=>$r['date_on'],'image'=>$image,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}
	if(isset($_POST['valid']) && $_POST['valid'] == '0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,DATE_FORMAT(date_on, '%b. %d, %Y') AS date_on,description FROM `blogs` WHERE inactive='0' AND id='".$_POST['id']."' ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/blogs/".$r['id'],null,['array'=>true]);
				$sub=[];
				$sq = $db->db_gen("SELECT id,title,description FROM `blog_sub` WHERE blog_id='".$r['id']."' AND inactive='0';");
				while($s=mysqli_fetch_array($sq))
				{
					$sFiles = $db->get_file_info("account/files/blogs/".$r['id']."/sub/".$s['id'],null,['array'=>true]);	
					array_push($sub,array('id'=>$s['id'],'title'=>$s['title'],'description'=>$s['description'],'itoken'=>$db->etoken($s['id']),'files'=>$sFiles));
				}
				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'description'=>$r['description'], 'date_on'=>$r['date_on'],'files'=>$files,'sub'=>$sub,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}
		*/



	
}
else{ echo "SessionExpired"; }


?>