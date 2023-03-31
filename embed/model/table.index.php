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

	if(isset($_POST['valid']) && $_POST['valid'] == '100-0')
	{
		$img= ["account/files/banner/","/","images/files/no-image-dark.jpg"];
		$db= new control(); 
		echo $db->j_select(['table'=>"ui_banner",'condition'=>"inactive='0'",'sort'=>"0x-ord,id",'image'=>$img]);
	}


	if(isset($_POST['valid']) && $_POST['valid'] == '10')
	{
		$db= new control();
		echo $db->j_select(['table'=>"breaking_news",'condition'=>"inactive='0'",'sort'=>"00-dated"]);
	}
	if(isset($_POST['valid']) && $_POST['valid'] == '20')
	{
		$rtn= []; $db= new control();  $db_con= $db->db_conn();
		
		$q= $db->db_gen("SELECT id,title,description FROM `mayor_message` WHERE inactive='0';");
		if($db->hasError){echo $db->errorVal; mysqli_close($db_con); die();}
		else
		{
			while($r=mysqli_fetch_array($q))
			{
				$profile= $db->j_profile("account/files/mayor/profile", "images/files/no-image.png");		
				//$profile= $db->j_profile("account/files/mayor/profile", "../images/files/no-image.png");		
				array_push($rtn,array('id'=>$r['id'],'title'=>$r['title'],'description'=>$r['description'],'profile'=>$profile));
			}
			echo json_encode($rtn);
			mysqli_close($db_con);
		}
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '30')
	{
		$db= new control();
		//$img= ["account/files/about/",null,"../images/files/no-image.png"];
		$img= ["account/files/about/",null,"none"];

		echo $db->j_select(['column'=>"id,title,description",'table'=>"about",'condition'=>"inactive='0'",'sort'=>"00-dt_inserted",'paginate'=>"1,1",'image'=>$img]);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '40')
	{
		$db= new control();
		$img= ["account/files/tourism/",null,"images/files/no-image.png"];
		//$img= ["account/files/tourism/",null,"../images/files/no-image.png"];

		$sel= $db->j_select(['array'=>true,'column'=>"id,title,description",'table'=>"tourism",'condition'=>"inactive='0'",'sort'=>"00-dt_inserted",'paginate'=>"7,1",'image'=>$img]);

		$count= array_column($sel, 'count');
		$rst= array_unshift($sel, array('count'=>$count[0]));

		echo json_encode($sel);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '50')
	{
		$db=new control(); 
		$q= $db->db_gen("SELECT COUNT(id) AS residents,
			(SELECT COUNT(id) FROM residents WHERE inactive='0' AND (head_ext='1' OR head_ext='2') ) AS household,
			(SELECT COUNT(id) FROM residents WHERE inactive='0' AND timestampdiff(year,bday,curdate()) > 60) AS sr
			FROM `residents` WHERE inactive='0' LIMIT 1;");

		if(!$db->hasError)
		{
			$rtn= []; $r=mysqli_fetch_array($q);
			array_push($rtn, ['residents'=>$r['residents'], 'household'=>$r['household'], 'sr'=>$r['sr']]);

			echo json_encode($rtn);
		}
		else{ echo $db->errorVal; mysqli_close($db_con); die(); }
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
		$con = "(`name` LIKE '%".$_POST['uLike']."%' OR `cp` LIKE '%".$_POST['uLike']."%' OR 
				`mail` LIKE '%".$_POST['uLike']."%' OR `address` LIKE '%".$_POST['uLike']."%') AND `inactive`='0' ";

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>"directory",'condition'=>$con,'sort'=>$sort]);
	}

	if(isset($_POST['valid']) && $_POST['valid'] == '20-0')
	{
		$col = "id,name,head,cp,address";
		$sort= ($_POST['sort']=="")?"": $_POST['sort']."- `name`,`head`,`cp`,`address`";
		$con = "(`name` LIKE '%".$_POST['uLike']."%' OR `head` LIKE '%".$_POST['uLike']."%' OR 
				`cp` LIKE '%".$_POST['uLike']."%' OR `address` LIKE '%".$_POST['uLike']."%') AND `inactive`='0' ";

		$db= new control();
		echo $db->j_select(['column'=>$col,'table'=>"department",'condition'=>$con,'sort'=>$sort]);
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
				$files= $db->get_file_info("account/files/mayor/post/main/",null,['array'=>true]);	
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
		$album= $db->get_directories("account/files/album/","album",["array"=>true]);
		$data= $db->j_select(['column'=>'id,title','table'=>"album",'condition'=>"inactive='0'",'array'=>true]);

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