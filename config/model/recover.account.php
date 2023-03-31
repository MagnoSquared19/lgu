<?php


	if($tmpComm == "search")
	{
		require_once("../config/settings/settings.php");
		$search="";
		
		$db=new control(); $db_con=$db->db_conn();

		$mail=mysqli_real_escape_string($db_con, $_POST['UserInfo']);
		$cp	 =mysqli_real_escape_string($db_con, $_POST['UserInfo']);
		$un  =mysqli_real_escape_string($db_con, $_POST['UserInfo']);
		
		$result = $db->db_gen("
			SELECT id,fn,mn,ln,email,cp,un,@kind := 'admin' AS kind FROM `users` WHERE (email='{$mail}' OR cp='{$cp}' OR un='{$un}') AND inactive='0' ;");
		
		if($db->hasError){ $search_error = "Error in : ".$db->ErrorVal; }
		else
		{
			if(mysqli_num_rows($result) > 0)
			{			
				$val = mysqli_fetch_array($result);			
				
				session_start();
				$sms_result = $db->db_gen("SELECT * FROM settings;");
				$sms = mysqli_fetch_array($sms_result);	
				
				$_SESSION['ret']['id']		= $val['id'];
				$_SESSION['ret']['name']	= $val['fn']." ".$val['mn']." ".$val['ln'];
				$_SESSION['ret']['mobile']	= $val['cp'];
				$_SESSION['ret']['email']	= $val['email'];
				$_SESSION['ret']['un']		= $val['un'];
				$_SESSION['ret']['sms']		= $sms['sms'];
				$_SESSION['ret']['kind']	= $val['kind'];

				header("Location: reset.php");die();
			}
			else{	$search=$_POST['UserInfo'];	$search_error = "Search did not match to records. Please try again.";	}	
		}		
		mysqli_close($db_con);	
	}
	else if($tmpComm == "reset"){	/*echo "reset";*/	}

	
	
	
	
	/*
	require_once("../config/settings/settings.php");
	//require_once("../config/model/init.php");
	
	$db = new control();
	$result = $db->json_select("*","tbl_positions",null,null,null, null);	
		
	echo $result;	
	mysqli_close($db->db_Conn);
	*/
?>