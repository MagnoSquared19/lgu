<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";
	$_POST['valid'] = "70";
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

	if(isset($_POST['valid']) && $_POST['valid'] == '0-0')
	{
		$ol= array("bc","rc","ci","ja","jx","jb","jc","covid19");

		$ol_= explode("-", $_POST['like']); $ol_[0]= strtolower($ol_[0]);
		if(in_array($ol_[0], $ol)) 
		{
			if($ol_[0] == "covid19")
			{
				$rtn= []; $db= new control(); 
			    $q=$db->db_gen("SELECT id,DATE_FORMAT(dt_inserted, '%Y-%m-%d') AS dated,
			    (SELECT CONCAT(fn,' ',mn,' ',ln) FROM residents WHERE id=resi_id) AS name	
			    FROM covid_immunization WHERE trans_no='".$_POST['like']."' ;");

			    if($db->hasError){echo $db->errorVal; $db->jdie(); }
				else
				{
					while($r=mysqli_fetch_array($q))
					{
						array_push($rtn, array('id'=>$r['id'], 'title'=>$r['name'], 'dated'=>$r['dated'], 'status'=>"", 'description'=>"Registered to Covid19 Vaccine", 'itoken'=>$db->etoken($r['id']), 'count'=>"1"));
					}
					echo json_encode($rtn);
				}
			}
		    else
		    {
		    	$tbl="";
			    $ve= [
					"0"=>"<b>For Review</b> - Your Online Application is currently being Reviewed.",
					"1"=>"<b>On Process</b> - Your Online Application is currently being Processed.",
					"2"=>"<b>Pending</b> - Your Online Application is still On Hold.",
					"3"=>"<b>For Pickup</b> - Your Online Application is now ready for Pickup at the Barangay Hall.",
					"4"=>"<b>On the way</b> - Your Online Application is being delivered by the Brgy. Messenger.",
					"5"=>"<b>Cancelled</b> - Your Online Application was Cancelled.",
					"9"=>"<b>Completed</b> - Your Online Application was Successfully Completed"];
			    
			    if($ol_[0]==$ol[0]){ $tbl="doc_clearance"; 		$title="Barangay Clearance"; 		}
			    else if($ol_[0]==$ol[1]){ $tbl="doc_residency"; $title="Certificate of Residency";	}
			    else if($ol_[0]==$ol[2]){ $tbl="doc_indigency"; $title="Certificate of Indigency";	}
			    else if($ol_[0]==$ol[3]){ $tbl="doc_biz_clearance";	$title="Business Clearance";	}
			    else if($ol_[0]==$ol[4]){ $tbl="doc_biz_closure"; 	$title="Business Closure";		}
			    else if($ol_[0]==$ol[5]){ $tbl="doc_bldg_clearance";$title="Building Clearance";	}
			    else if($ol_[0]==$ol[6]){ $tbl="doc_guardianship"; 	$title="Certificate of Guardianship";	}

			    $rtn= []; $db= new control(); 
			    $q=$db->db_gen("SELECT id,dated,status,@title := '{$title}' AS title FROM {$tbl} WHERE trans_no='".$_POST['like']."' ;");

			    if($db->hasError){echo $db->errorVal; $db->jdie(); }
				else
				{
					while($r=mysqli_fetch_array($q))
					{
						array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'dated'=>$r['dated'], 'status'=>$r['status'], 'description'=>$ve[$r['status']], 'itoken'=>$db->etoken($r['id']), 'count'=>"1"));
					}
					echo json_encode($rtn);
				}
		    }



			$db->jdie();
		}
		else
		{
			$rtn= []; $db= new control();
		
			$con = "(`title` LIKE '%".$_POST['like']."%' OR 
				`description` LIKE '%".$_POST['like']."%') AND `inactive`='0' ";

			$q= $db->db_gen("
				SELECT id,title,description,date_on,@t:='1' AS t FROM `events` WHERE {$con} AND view='0' 
				UNION 
				SELECT id,title,description,date_on,@t:='2' AS t FROM `press_release` WHERE {$con}

			;");

			if($db->hasError){echo $db->errorVal; $db->jdie(); }
			else
			{
				array_push($rtn, array('count'=>mysqli_num_rows($q)));
				while($r=mysqli_fetch_array($q))
				{			
					array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'dated'=>$r['date_on'], 
						'description'=>$r['description'],'uri'=>$r['t'], 'itoken'=>$db->etoken($r['id'])));
				}
				echo json_encode($rtn);
			}
			$db->jdie(); 
		}
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '0-0XXXX')
	{
		$ol= array("bc","rc","ci","ja","jx");

		$ol_= explode("-", $_POST['like']); $ol_[0]= strtolower($ol_[0]);
		if(in_array($ol_[0], $ol)) 
		{
		    $tbl="";
		    $ve= [
				"0"=>"<b>For Review</b> - Your Online Application is currently being Reviewed.",
				"1"=>"<b>On Process</b> - Your Online Application is currently being Processed.",
				"2"=>"<b>Pending</b> - Your Online Application is still On Hold.",
				"3"=>"<b>For Pickup</b> - Your Online Application is now ready for Pickup at the Barangay Hall.",
				"4"=>"<b>On the way</b> - Your Online Application is being delivered by the Brgy. Messenger.",
				"5"=>"<b>Cancelled</b> - Your Online Application was Cancelled.",
				"9"=>"<b>Completed</b> - Your Online Application was Successfully Completed"];
		    
		    if($ol_[0]==$ol[0]){ $tbl="doc_clearance"; 		$title="Barangay Clearance"; }
		    else if($ol_[0]==$ol[1]){ $tbl="doc_residency"; $title="Certificate of Residency";	}
		    else if($ol_[0]==$ol[2]){ $tbl="doc_indigency"; $title="Certificate of Indigency";	}
		    else if($ol_[0]==$ol[3]){ $tbl="doc_biz_clearance";	$title="Business Clearance";}
		    else if($ol_[0]==$ol[4]){ $tbl="doc_biz_closure"; 	$title="Business Closure";	}

		    $rtn= []; $db= new control(); 
		    $q=$db->db_gen("SELECT id,dated,status,@title := '{$title}' AS title FROM {$tbl} WHERE trans_no='".$_POST['like']."' ;");

		    if($db->hasError){echo $db->errorVal; $db->jdie(); }
			else
			{
				while($r=mysqli_fetch_array($q))
				{
					array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'dated'=>$r['dated'], 'status'=>$r['status'], 'description'=>$ve[$r['status']], 'itoken'=>$db->etoken($r['id']), 'count'=>"1"));
				}
				echo json_encode($rtn);
			}
			$db->jdie();
		}
		else
		{
			$rtn= []; $db= new control();
		
			$con = "(`title` LIKE '%".$_POST['like']."%' OR 
				`description` LIKE '%".$_POST['like']."%') AND `inactive`='0' ";

			$q= $db->db_gen("
				SELECT id,title,description,date_on,@t:='1' AS t FROM `events` WHERE {$con} AND view='0' 
				UNION 
				SELECT id,title,description,date_on,@t:='2' AS t FROM `press_release` WHERE {$con}

			;");

			if($db->hasError){echo $db->errorVal; $db->jdie(); }
			else
			{
				array_push($rtn, array('count'=>mysqli_num_rows($q)));
				while($r=mysqli_fetch_array($q))
				{			
					array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'dated'=>$r['date_on'], 
						'description'=>$r['description'],'uri'=>$r['t'], 'itoken'=>$db->etoken($r['id'])));
				}
				echo json_encode($rtn);
			}
			$db->jdie(); 
		}
	}


/*
	if(isset($_POST['valid']) && $_POST['valid'] == '0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,description FROM `about` WHERE inactive='0' ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/about/".$r['id'],null,['array'=>true]);				
				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'description'=>$r['description'], 'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}
	if(isset($_POST['valid']) && $_POST['valid'] == '40')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,description FROM `tourism` WHERE inactive='0' ORDER BY title ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/tourism/".$r['id'],null,['array'=>true]);				
				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'description'=>$r['description'], 'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '10-0')
	{
		$col = "id,name,cp,mail,address";
		$sort= ($_POST['sort']=="")?"": $_POST['sort']."- `name`,`cp`,`mail`,`address`";
		$con = "(`name` LIKE '%".$_POST['like']."%' OR `cp` LIKE '%".$_POST['like']."%' OR 
				`mail` LIKE '%".$_POST['like']."%' OR `address` LIKE '%".$_POST['like']."%') AND `inactive`='0' ";

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>"directory",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '20-0')
	{
		$col = "id,name,head,cp,address";
		$sort= ($_POST['sort']=="")?"": $_POST['sort']."- `name`,`head`,`cp`,`address`";
		$con = "(`name` LIKE '%".$_POST['like']."%' OR `head` LIKE '%".$_POST['like']."%' OR 
				`cp` LIKE '%".$_POST['like']."%' OR `address` LIKE '%".$_POST['like']."%') AND `inactive`='0' ";

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>"department",'condition'=>$con,'sort'=>$sort,'paginate'=>$_POST['page']]);
	}

	

	if(isset($_POST['valid']) && $_POST['valid'] == '30-0')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,description FROM `mayor_message` WHERE inactive='0' ;");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$files= $db->get_file_info("account/files/mayor/profile/photos/",null,['array'=>true]);	
				$mayor= $db->j_profile("account/files/mayor/profile","");	
				array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'description'=>$r['description'],'profile'=>$mayor, 'files'=>$files,'itoken'=>$db->etoken($r['id'])));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}
		if(isset($_POST['valid']) && $_POST['valid'] == '31-0')
		{
			$rtn= []; $db= new control();  $db_con= $db->db_conn();
			
			$q= $db->db_gen("SELECT id,title,description FROM `mayor_message_sub` WHERE inactive='0' ;");
			if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
			else
			{
				while($r=mysqli_fetch_array($q))
				{
					$files= $db->get_file_info("account/files/mayor/post/".$r['id'],null,['array'=>true]);				
					array_push($rtn, array('id'=>$r['id'], 'title'=>$r['title'], 'description'=>$r['description'], 'files'=>$files,'itoken'=>$db->etoken($r['id'])));
				}
				echo json_encode($rtn);
				mysqli_close($db_con);
			}
		}




	if(isset($_POST['valid']) && $_POST['valid'] == '60')
	{
		$db= new control(); $dir= ($_POST['album']!=="")?"album/".$_POST['album']:"gallery";
		echo $db->get_file_info("account/files/".$dir,null);
	}
	
	if(isset($_POST['valid']) && $_POST['valid'] == '70')
	{
		$db= new control(); 
		//$album= $db->get_directories($jroot."account/files/album/","album",["array"=>true]);
		$album= $db->get_directories("../../account/files/album/","album",["array"=>true]);
		$data= $db->j_select(['column'=>'id,title','table'=>"album",'condition'=>"inactive='0'",'array'=>true]);

		//print_r($album);

		foreach($data as $key => $val) 
		{
			if(array_key_exists('id', $data[$key]))
			{
				foreach ($album as $k => $v) 
				{
					if(array_key_exists('name', $album[$k]))
					{
						if($v['name']==$val['id']){ $data[$key]['files']=$album[$k]; }
					}					
				}
			}
		}
		echo json_encode($data);
	}
*/


	
}
else{ echo "SessionExpired"; }


?>