<?php
/**/
if(isset($_GET['test']))	
{	
	$_POST['token'] = "0";
	$_POST['valid'] = "70";
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
	/*if(isset($_POST['valid']) && $_POST['valid'] == '70')
	{
		$db= new control(); echo $db->get_directories("account/files/album/","album");
	}*/
	
	if(isset($_POST['valid']) && $_POST['valid'] == '70')
	{
		$db= new control(); 
		//$album= $db->get_directories($jroot."account/files/album/","album",["array"=>true]);
		//$album= $db->get_directories("../../account/files/album/","album",["array"=>true]);
		$album= $db->get_directories("account/files/album/","album",["array"=>true]);
		$data= $db->j_select(['column'=>'id,title','table'=>"album",'condition'=>"inactive='0'",'array'=>true]);
		//echo $jroot.$host;

		foreach($data as $key => $val) 
		{
			if(array_key_exists('id', $data[$key]))
			{
				foreach ($album as $k => $v) 
				{
					if(array_key_exists('name', $album[$k]))
					{
						if($v['name']==$val['id'])
						{ 
							$album[$k]['thumbnail'] = str_replace($jroot,$host,$album[$k]['thumbnail']);
							$data[$key]['files']=$album[$k];
						}
					}					
				}
			}
		}
		echo json_encode($data);
	}



	
}
else{ echo "SessionExpired"; }


?>