<?php
//require $_SERVER['DOCUMENT_ROOT'] ."/config/control/db.php";
define('host', strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,strpos( $_SERVER["SERVER_PROTOCOL"],'/'))).'://'.$_SERVER['SERVER_NAME']."/");
define('path', $_SERVER['DOCUMENT_ROOT']."/");
//define('path', rtrim(dirname(dirname(__FILE__)),'config'));

class control extends db
{
	public function __construct(){ }	
	private function gen_query($query_arg)	{ return db::db_Builder($query_arg); 		}
	private function gen_insert($query_arg)	{ return db::db_Builder_Insert($query_arg); }
	private function gen_multiple($query)	{ return db::db_multiple($query);			}
	//private function db13conn19gateway_8627_13221410(){ return db::db13conn19gateway_8627_132214();	}
	//public function gatecon(){	return $this->db13conn19gateway_8627_13221410();					}

	/*errorCode=="1062" = duplicate*/

	/* ver 2.0 */
	private function gen_get_file($path_arg,$format_arg,$arr)
	{
		$d=['array'=>false];
		if($arr){ foreach($arr as $k => $v){ $d[$k]=$v; } }

		$path_arg=path.$path_arg;
		$dir = $path_arg;
		$format = "/*.*";
		if($format_arg){ $format= "/*.".$format_arg; }
		
		$i= 0; $values= []; 
		if(is_dir($dir))
		{			
			$dir = $path_arg.$format;
			foreach(glob($dir) as $file) 
			{
				$i += 1; $nArr= explode(".", basename($file)); $ext= end($nArr);
				array_push($values, array('index'=>$i,'name'=>basename($file,".".$ext),'ext'=>$ext,'src'=>(($file)?host.str_replace(strval(path),"",$file):"") ));
			}			
		}
		array_push($values, array('count'=>"$i"));

		$values= ($d["array"])?$values:json_encode($values);
		return $values;		
	}
	private function gen_scan_dir($dir,$sfiles)		//check sorting here
	{
		$folder = array();
		if(!is_dir($dir)){	echo '[{"result":"CTR Error in : Primary Path does not exists!"}]';	return; }

		$result = array(); 
		$cdir = array_slice(scandir($dir), 2);
		foreach ($cdir as $key => $value) 
		{
			if(is_dir($dir.DIRECTORY_SEPARATOR.$value))
			{
				if($sfiles=="album")
				{
					array_push($folder, array(
						'name'=>$value,
						'thumbnail'=>(($sfiles=="")?"":$this->gen_scan_files($dir.$value,$sfiles)), 
						'cont_num'=>strval(	count(array_slice(scandir($dir.$value),2))	),						
					)); 
				}
				else
				{
					array_push($folder, array(
						'name'=>$value,
						'cont_num'=>strval(	count(array_slice(scandir($dir.$value),2))	),
						'contents'=>(($sfiles=="")?"":$this->gen_scan_files($dir.$value,$sfiles)), 
					)); 
				}				
			}
		} 
		//arsort($folder);
		array_push($folder, array('count'=>strval(count($folder))));
		$result = json_encode($folder);
		//$result = $folder;
		//arsort(array,sortingtype);
		return $result;
	}
		private function gen_scan_files($dir,$par)
		{			
			$p_arr = explode(",", str_replace(" ","",$par));
			$tSrc=in_array("src", $p_arr);
			$tExt=in_array("ext", $p_arr);

			$result=""; $rst_arr=[];
			$cdir = array_slice(scandir($dir), 2);
			foreach ($cdir as $key => $value) 
			{
				if(is_dir($dir.DIRECTORY_SEPARATOR.$value)){ /*echo $value;*/ }
				else
				{
					if($par=="album"){	return $dir.'/'.$value;		}
					else
					{
						$nArr = explode(".", basename($value));
						$ext  = end($nArr);
						$nme  = basename($value,".".$ext);
						if($tSrc==false){ array_push($rst_arr, array('f_name'=>$nme)); }
						if($tSrc==false && $tExt==true){ array_push($rst_arr, array('f_name'=>$nme,'f_ext'=>$ext)); }
						if($tSrc==true && $tExt==false){ array_push($rst_arr, array('f_name'=>$nme,'f_src'=>$dir.'/'.$value)); }
						if($tSrc==true && $tExt==true) { array_push($rst_arr, array('f_name'=>$nme,'f_ext'=>$ext, 'f_src'=>$dir.'/'.$value)); }
					}				
				} 
			}
			if(in_array("count", $p_arr)==true){ array_push($rst_arr, array('f_count'=>strval(count($rst_arr)))); }			

			if(count($rst_arr)>0){ $result = $rst_arr; }

			return $result;
		}

	private function del_files($path_arg)
	{
		$dir = $path_arg;
		$return = "";

		if(is_dir($dir))
		{
			foreach (glob($dir."/*.*") as $filename){	if(is_file($filename)){	unlink($filename);	}	}
		}	
		return $return;
	}
	private function gen_del_file($path_arg)	// delete all files including folder
	{
		$dir = $path_arg;
		$return = "";

		if(is_dir($dir))
		{
			foreach (glob($dir."/*.*") as $filename){	if(is_file($filename)){	unlink($filename);	}	}
			$filenames = scandir($dir);
			foreach($filenames as $name)
			{
				if(is_dir($name))			{	continue;					}
				elseif(!strpos($name,"."))	{	unlink ($dir."/".$name);	}
			}
			rmdir($dir);
		}		
		return $return;
	}

	private function gen_get_profile($path_arg, $format_arg)
	{
		$path_arg=path.$path_arg;
		$dir = $path_arg;
		$format = "/*.*";
		if($format_arg){	$format = "/*.".$format_arg;	}	
		
		$i = 0; $index="";$name="";$src="";
		if(is_dir($dir))
		{			
			$dir = $path_arg.$format;
			foreach(glob($dir) as $file) 
			{
				$i += 1;
				$index=$i;$name=basename($file);$src=$file;			
			}			
		}
		$values = '{"count":"'.$i.'","index":"'.$i.'","name":'.json_encode($name).',"src":'.json_encode((($src)?host.str_replace(path,"",$src):"")).'}';
		
		return $values;
	}

	private function set_field_name($filter_arg,$table_arg)
	{
		$arrTbl = [];		
		if($filter_arg=="*")
		{
			$tbl_result = $this->gen_query("SHOW COLUMNS FROM ".$table_arg.";"); 
			while($r_fields = mysqli_fetch_array($tbl_result)){	$arrTbl[] = $r_fields['Field'];		}
		}
		else
		{
			$myArray = explode(',', $filter_arg);			
			for($i=0;$i<count($myArray);$i++){	$arrTbl[] = $myArray[$i];	}		
		}
		return $arrTbl;
	}
	private function j2_select($arr)		// New Code
	{
		$result= "";
		$d=['column'=>null,'table'=>null,'condition'=>null,'sort'=>null,'paginate'=>null,'query'=>null,'group-by'=>null,'count'=>null,'image'=>null,'image-column'=>"id",'array'=>false,'get-query'=>false,'pid'=>null,'params'=>null];
		foreach($arr as $k => $v){ $d[$k]=$v; }
		
		$col= ($d["column"])?$d["column"]:"*";
		$con= ($d['condition'])?" WHERE ".$d['condition']:"";
		$p_a= explode(",",($d['paginate'])?$d['paginate']:"0,0");

		$query_str= (($d['query'])?$d['query']:"SELECT $col FROM ".$d['table'])." ".$con.(($d["group-by"])?" GROUP BY ".$d["group-by"]:"")." ".$this->sort($d["sort"])." ".$this->paginate($d["paginate"]);		
		if($d['get-query']){ return $query_str; die(); }

		$select= $this->gen_query($query_str);		
		if(!$this->hasError)
		{	
			$result= [];

			$tCnt= $this->gen_query("SELECT COUNT(".(($d['count'])?"DISTINCT ".$d['count']:"*").") AS cnt FROM ".$d['table']." ".$con." LIMIT 1;");
			if($this->hasError){ echo "Count error in: ".$this->errorVal; die(); }
			else{ $c=mysqli_fetch_array($tCnt); array_push($result, array('count'=>$c['cnt'],'limit'=>$p_a[0],'page'=>$p_a[1])); }
			/* --:-- */
			$col_a= $this->set_field_name($col,$d['table']);			
			while($r = mysqli_fetch_array($select))
			{
				$image=($d['image'])?$this->jget_profile($d['image'][0].$r[$d['image-column']].$d['image'][1],(isset($d['image'][2])?$d['image'][2]:"")):null;
				$val= array();
				for($i=0;$i<count($col_a);$i++){ $val[$col_a[$i]]= strval($r[$col_a[$i]]); }
				$val['itoken']=$this->etoken($r['id']);
				($image)?$val['image']=$image:"";

				if($val){ array_push($result,$val); }				
			}	
			/* --:-- */
			if($d['pid']){ array_push($result, array('pid'=>$d['pid'])); }
			if(isset($_SESSION['lgu']['level'])){ array_push($result, array('a_level'=>$_SESSION['lgu']['level'],'a_position'=>$_SESSION['lgu']['p_id'])); }					

		}else{ echo $this->errorVal; die();	/*$result= $this->errorVal;*/	}

		$result = ($d["array"])?$result:json_encode($result);
		return $result;
	}	
		public function sort($p)
		{
			$sort= "";
			if($p)
			{
				$sa = explode("-", $p);
				$desc = (substr($sa[0],0,1)=="1")?" DESC ":"";
				if(strtolower(substr($sa[0], 1))=="x"){ $sort = " ORDER BY ".$sa[1];  }
				else{ $cols= explode(",", $sa[1]); $sort= " ORDER BY ".$cols[substr($sa[0], 1)];	}			
				$sort .=" ".$desc;
			}
			return $sort;	
		}
		public function paginate($p)
		{
			if(isset($p) && !$p == null)
			{			
				$page_arr = explode(',', $p);
				$limit= $page_arr[0];
				$start= ((($page_arr[1]<=0)?1:$page_arr[1])-1) * $limit;
				$page = '"limit":"'.$limit.'","page":"'.(($page_arr[1]<=0)?1:$page_arr[1]).'",';

				return 'LIMIT '.$start.', '.$limit;
			}
		}

	private function jset_delete($tbl,$token,$arr=null)
	{
		 $val=[]; $d=['id'=>false,'array'=>false,'json'=>false];
		if($arr){ foreach($arr as $k => $v){ $d[$k]=$v; } }

		$con= db::db_conn(); $id= $this->itoken($token);
		$this->gen_query("UPDATE {$tbl} SET `inactive`='1' WHERE id='".mysqli_real_escape_string($con,$id)."';");
		$rst= ($this->hasError)?$this->errorVal:"1";
		mysqli_close($con);

		$val=['result'=>$rst,'id'=>$id];
		if($d['json']){ $rtn= (($d['array'])?$val:json_encode([$val])); }
		else if($d['array']){ $rtn= $val; }
		else{ $rtn= ($d['id'])?$id:$val['result']; }

		return $rtn;
	}
	private function jget_profile($path_arg,$def="",$arr=null)
	{
		$d=['name'=>"",'format'=>"*",'json'=>false,'array'=>false,'random'=>true];
		if($arr){ foreach($arr as $k => $v){ $d[$k]=$v; } }

		$val=[]; $path_arg=path.$path_arg; $dir= $path_arg;
		
		$i = 0; $index="";$name="";$src=null;
		if(is_dir($dir))
		{	
			$dir = $path_arg."/".$d['name'];
			foreach(glob($dir."*.{jpg,png,gif}", GLOB_BRACE) as $file) 
			//foreach(array_reverse(glob($dir."*.{jpg,png,gif}", GLOB_BRACE)) as $file) 
			{
				$i += 1; $index=$i;$name=basename($file);$src=$file; break;
			}			
		}
		array_push($val, array('index'=>"$i",'name'=>"$name",'src'=>(($src)?host.str_replace(path,"",$src):$def).((($src) && ($d['random']))?"?".$this->random(6):"") ));
		if($d['array']){ $rtn= (($d['json'])?json_encode($val):$val); }
		else{ $rtn= $val[0]['src']; }

		return $rtn;
	}

	/* --|-- */
	
	public function db_select($query_arg)
	{
		$tmpResult = $this->gen_query($query_arg);		
		if($this->hasError){ $tmpResult= $this->errorVal; }

		return $tmpResult;
	}
	public function db_gen($query_arg)
	{
		$tmpResult = $this->gen_query($query_arg);		
		if($this->hasError){	$tmpResult = $this->errorVal;	}

		return $tmpResult;
	}
	
	public function db_insert($query_arg){ return $this->db_gen($query_arg); }
	public function db_insert_id($query_arg){ return $this->gen_insert($query_arg); }	
	public function db_update($query_arg){ return $this->db_gen($query_arg); }
	public function db_delete($query_arg){ return $this->db_gen($query_arg); }
	public function delete_file_folder($path_arg){ return $this->gen_del_file($path_arg); }
	public function delete_files($path_arg){ return $this->del_files($path_arg); }
	public function get_file_info($path,$format,$arr=null){ return $this->gen_get_file($path, $format, $arr); }
	public function get_directories($path_arg,$subfiles=""){ return $this->gen_scan_dir($path_arg,$subfiles); }
	public function get_profile($path_arg, $format_arg, $arr=null){ return $this->gen_get_profile($path_arg, $format_arg, $arr); }
	
	public function j_select($arr)	{ return $this->j2_select($arr); }
	public function j_queries($query){ return $this->gen_multiple($query); }
	public function j_delete($tbl,$token,$arr=null){ return $this->jset_delete($tbl,$token,$arr); }
	public function j_profile($path, $def="", $arr=null){ return $this->jget_profile($path,$def,$arr); }


	public function etoken($id){ return $this->encryptor($id); }
	public function itoken($id){ return $this->encryptor($id,['encrypt'=>false]); }
	public function encryptor($str,$arr=[]) 
	{
		$d=['encrypt'=>true];		
		foreach($arr as $k => $v){ $d[$k]=$v; }
		$output=false; $encrypt_method="AES-256-CBC"; $secret_key='bazaa'; $secret_iv='jvc';
		$key= hash('sha256', $secret_key); $iv= substr(hash('sha256', $secret_iv), 0, 16);

		if($d['encrypt']==true) { $output= openssl_encrypt($str,$encrypt_method,$key,0,$iv);$output= base64_encode($output); }
		if($d['encrypt']==false){ $output= openssl_decrypt(base64_decode($str), $encrypt_method, $key, 0, $iv); }
		
		return $output;
	}
	public function random($len=6)
	{
		$keys= array_merge(range(0,9),range('A','Z'));
		$key = "";
		for($i=0;$i<$len;$i++){ $key .= $keys[mt_rand(0, count($keys) - 1)]; }
		return $key;
	}

	public function mail_user($proj,$un,$pw,$lnk)
	{
		$tmpLayout="
		<html>
			<head>
				<title>{$proj} | System Access</title>			
				<style>
					table{float:left;width:100%;height:auto;}
						tr{float:left;width:100%;height:auto;}
						td{float:left;width:auto;height:auto;}
						a{float:left;width:auto;height:auto;}	
						.m-fr{float:left;height:auto;width:100%;	}				
				</style>			
			</head>
		<body>
			<table>
				<tr><td style='font-size:25px;font-weight:bold; margin-bottom:0px;'>LOGIN Account Access</td></tr>
				<tr><td>Great news! Your Account to VanderPol Christian Academy, Inc. has been activated. Bellow is the information you need to access the System.</td></tr>
				<br/>
				<tr><td><b>USERNAME: </b> {$un}</td></tr>			
				<tr><td><b>PASSWORD: </b> {$pw}</td></tr>			
				<br/>
				<tr><td>This link is valid for 1 use only. It will expire in 5 hours.</td></tr>			
				<tr><td>Please follow the directions below to reset your password.</td></tr>
				<br/><br/>
				<tr class='m-fr'>
					<td style='float:left;margin-left:30px;'>
						<a style='text-decoration:none;	background-color:red;' href='{$lnk}'>
							<font color='#FFFFFF' style='font-size:20px;padding:10px;border-radius:2px;	background-color:#5491d5;'>Reset Your Password</font>		
						</a>
					</td>
				</tr>
				
				<tr style='float:left;width:100%;height:auto;margin-top:10px;margin-bottom:5px;'>
					<td style='float:left;margin-left:30px;'><b>After you click the button above, you will be prompted to complete the following steps:</b></td>
				</tr>
				<tr>	<td style='float:left;margin-left:35px;'>1. Enter your Username ( {$un} )</td>		</tr>
				<tr>	<td style='float:left;margin-left:35px;'>2. Enter your New Password</td>	</tr>
				<tr>	<td style='float:left;margin-left:35px;'>3. Confirm your New Password</td>	</tr>
				<tr>	<td style='float:left;margin-left:35px;'>4. Click Continue</td>			</tr>
				
				<tr style='float:left;width:100%;height:auto;margin-top:20px;margin-bottom:5px;'>
					<td> <b>NOTE!</b> If you feel you did not request a password reset and you have receive this message, please inform your admin ASAP.</td>
				</tr>
				<tr>
					<td><b>Important!</b> Nobody can change your password without access to this email.</td>
				</tr>
				<tr style='float:left;width:100%;height:auto;margin-top:20px;margin-bottom:10px;padding-top:25px;padding-bottom:25px;		background-color:#CCCCCC;	'>
					<td style='float:left;width:100%;margin-left:30px;'><b>Please do not reply to this email. Emails sent to this address will not be answered.</b></td>
				</tr>
				
			</table>
		</body>
		</html>";

		return $tmpLayout;
	}


	/*public function random($len=6)
	{
		$string = '';
		$characters = "123456789ABCDEFHJKLMNPRTVWXYZabcdefghijklmnopqrstuvwxyz";
		for($p=0;$p<$len;$p++){ $string .= $characters[mt_rand(0, strlen($characters)-1)]; }
		return $string;
	}
	private function j2_selectXX($arr)
	{
		$result= "";
		$d=['column'=>null,'table'=>null,'condition'=>null,'sort'=>null,'paginate'=>null,'query'=>null,'group-by'=>null,'count'=>null,'image'=>null,'array'=>false,'get-query'=>false,'pid'=>null,'params'=>null];
		foreach($arr as $k => $v){ $d[$k]=$v; }
		
		$col= ($d["column"])?$d["column"]:"*";
		$con= ($d['condition'])?" WHERE ".$d['condition']:"";
		$p_a= explode(",",($d['paginate'])?$d['paginate']:"0,0");

		$query_str= (($d['query'])?$d['query']:"SELECT $col FROM ".$d['table'])." ".$con.(($d["group-by"])?" GROUP BY ".$d["group-by"]:"")." ".$this->sort($d["sort"])." ".$this->paginate($d["paginate"]);		
		if($d['get-query']){ return $query_str; die(); }

		$select= $this->gen_query($query_str);

		if(!$this->hasError)
		{	
			$result= [];
			$col_a= $this->set_field_name($col,$d['table']);
			while($r = mysqli_fetch_array($select))
			{
				$image=null;
				if($d['image'])
				{
					$arr = $this->gen_get_profile($d['image'][0].$r['id'].$d['image'][1], null);
					$json = json_decode($arr, true);
					foreach ($json as $key => $val){ if($key=='src'){$image=($val)?host.str_replace(host,"", $val):$d['image'][2];}		}
				}

				$val= array();
				for($i=0;$i<count($col_a);$i++){ $val[$col_a[$i]]= strval($r[$col_a[$i]]); }
				$val['itoken']=$this->etoken($r['id']);
				($image)?$val['image']=$image:"";

				if($val){ array_push($result,$val); }				
			}
			$c=mysqli_fetch_array($this->gen_query("SELECT COUNT(".(($d['count'])?"DISTINCT ".$d['count']:"*").") AS cnt FROM ".$d['table']." ".$con." LIMIT 1;"));

			//echo $this->errorVal; die();

			array_push($result, array('count'=>$c['cnt'],'limit'=>$p_a[0],'page'=>$p_a[1]));
			if($d['pid']){ array_push($result, array('pid'=>$d['pid'])); }
			if(isset($_SESSION['lgu']['level'])){ array_push($result, array('a_level'=>$_SESSION['lgu']['level'],'a_position'=>$_SESSION['lgu']['p_id'])); }

		}else{ echo $this->errorVal; die();		}

		$result = ($d["array"])?$result:json_encode($result);

		mysqli_close($this->db_Conn);
		return $result;
	}
	private function j2_select0($arr)
	{
		$d= ['column'=>null,'table'=>null,'condition'=>null,'sort'=>null,'paginate'=>null,'image'=>null,'array'=>false];
		foreach($arr as $k => $v){ $d[$k]=$v; }
		
		$col= ($d["column"])?$d["column"]:"*";
		$con= ($d['condition'])?" WHERE ".$d['condition']:"";
		$p_a= explode(",",($d['paginate'])?$d['paginate']:"0,0");			
		
		$q_str = "SELECT $col FROM ".$d['table']." ".$con." ".$this->sort($d["sort"])." ".$this->paginate($d["paginate"]);
		$select= $this->gen_query($q_str);

		$result= "";
		if(!$this->hasError)
		{
			$result= [];
			$col_a= $this->set_field_name($col,$d['table']);			
			while($r = mysqli_fetch_array($select))
			{
				$image=null;
				if($d['image'])
				{
					$arr = $this->gen_get_profile($d['image'][0].$r['id'].$d['image'][1], null);
					$json = json_decode($arr, true);
					foreach ($json as $key => $val){ if($key=='src'){$image=($val)?host.str_replace(host,"", $val):$d['image'][2];}		}
				}

				$val= array();
				for($i=0;$i<count($col_a);$i++){ $val[$col_a[$i]]= $r[$col_a[$i]]; }
				$val['itoken']=$this->etoken($r['id']);
				($image)?$val['image']=$image:"";

				if($val){ array_push($result,$val); }				
			}
			$c= mysqli_fetch_array($this->gen_query("SELECT COUNT(*) AS count FROM ".$d['table']." ".$con));
			array_push($result, array('count'=>$c['count'],'limit'=>$p_a[0],'page'=>$p_a[1]));

			if(isset($_SESSION['lgu']['level'])){ array_push($result, array('a_level'=>$_SESSION['lgu']['level'],'a_position'=>$_SESSION['lgu']['p_id'])); }

		}else{	$result= $this->errorVal;	}

		$result = ($d["array"])?$result:json_encode($result);

		mysqli_close($this->db_Conn);
		return $result;
	}
	*/
	


	/* ver 2.0 end */


//Deprecated here
/*	
	private function gen_scan_dir_filesX($dir)	//searched folder names and contents
	{
		$result = array(); 
		$cdir = scandir($dir);
		foreach ($cdir as $key => $value) 
		{
			if (!in_array($value,array(".","..")))
			{
				if(is_dir($dir . DIRECTORY_SEPARATOR . $value))
				{
					$result[$value] = $this->gen_scan_dir($dir . DIRECTORY_SEPARATOR . $value); 
				}
				else{  $result[] = $value;  } 
			}
		} 
		return json_encode($result); 
	}
	private function gen_scan_dirX($path_arg)
	{
		$result = "";
		$val_arr = [];
		//print_r($files=array_slice(scandir($dir), 2));
		//$values = json_encode(array_slice(scandir($path_arg), 2));
		$arr = array_slice(scandir($path_arg), 2);
		foreach($arr as $val) 
		{
			$tmpArr = array('name' => $val, );
		    array_push($val_arr, $tmpArr);
		}
		array_push($val_arr, array('count' => strval(count($arr))));
		$result = json_encode($val_arr);

		return $result;
	}	
	private function j_select1($filter_arg,$table_arg,$condition_arg,$date_arg,$sort_arg,$pageant_arg,$img)
	{
		$arrVal = [];
		$eachVal = "";

		$q_start = null;
		$q_end	 = null;

		$sort = "";
		if($sort_arg!="")
		{
			$sa = explode("-", $sort_arg);
			$desc = (substr($sa[0],0,1)=="1")?" DESC ":"";
			if(strtolower(substr($sa[0], 1))=="x"){ $sort = " ORDER BY ".$sa[1];  }
			else
			{
				$cols = explode(",", $sa[1]);
				$sort = " ORDER BY ".$cols[substr($sa[0], 1)];	
			}			
			$sort .=" ".$desc;
		}
		
		$condition_arg	= (isset($condition_arg)) ? "WHERE ".$condition_arg:null;

		$page="";
		if(isset($pageant_arg) && !$pageant_arg == null)
		{			
			$page_arr = explode(',', $pageant_arg);
			$limit= $page_arr[0];
			$start= ((($page_arr[1]<=0)?1:$page_arr[1])-1) * $limit;
			$page = '"limit":"'.$limit.'","page":"'.(($page_arr[1]<=0)?1:$page_arr[1]).'",';

			$pageant_arg ='LIMIT '.$start.', '.$limit;
		}

		$qCounter=",(SELECT COUNT(`id`) FROM ".$table_arg." ".$condition_arg." ".$date_arg.") AS `XXcNtXX` ";		
		$result = $this->gen_query("SELECT ".$filter_arg.$qCounter." FROM ".$table_arg." ".$condition_arg." ".$date_arg." ".$sort." ".$pageant_arg." ;");
		$values = "[{"; 
		
		if(!$this->hasError)
		{
			$field_name = $this->set_field_name($filter_arg,$table_arg);			
			$n_rows = "0";
			while($row = mysqli_fetch_array($result))
			{
				$arr = $this->gen_get_profile($img[0].$row['id'].$img[1], null);
				$json = json_decode($arr, true);
				foreach ($json as $key => $val){ if($key=='src'){$image=($val)?host.str_replace(host,"", $val):$img[2];}	}

				$rowVal = "";
				for($i=0;$i<count($field_name);$i++)
				{
					$rowVal .= json_encode($field_name[$i]).":".json_encode(str_replace ("null", " ", $row["$field_name[$i]"])).",";
				}
				$eachVal .= rtrim($rowVal, ",").(($img)?',"image":'.json_encode($image):"").',"itoken":"'.$this->encrypt_decrypt("encrypt", $row['id']).'"'."},{";
				$n_rows = $row['XXcNtXX'];	
			}
			$aLevel = (isset($_SESSION['lgu']['level']))?',"a_level":"'.$_SESSION['lgu']['level'].'"':"";
			$aPosit = (isset($_SESSION['lgu']['p_id'])) ?',"a_position":"'.$_SESSION['lgu']['level'].'"':"";
				
			$values .= rtrim($eachVal, ",{}").'},{"count":"'.$n_rows.'",'.$page.'"start":"'.$q_start.'","end":"'.$q_end.'"'.$aLevel.$aPosit.'}]';

		}else{	$values = $this->errorVal;		}
		
		return $values;
	}	
	public function json_select($filter_arg,$table_arg,$condition_arg,$date_arg,$sort_arg,$pageant_arg,$img)
	{
		return $this->j_select1($filter_arg,$table_arg,$condition_arg,$date_arg,$sort_arg,$pageant_arg,$img);
	}
	public function jquery($filter_arg,$table_arg,$condition_arg,$date_arg,$sort_arg,$pageant_arg,$img)
	{
		return $this->j_select1($filter_arg,$table_arg,$condition_arg,$date_arg,$sort_arg,$pageant_arg,$img);
	}
	
	public function set_field_name_lf($filter_arg,$table_arg)
	{
		$arrTbl = [];
		//UPDATE this if not; !Important
		// SELECT `COLUMN_NAME` from `information_schema`.`columns` where `table_schema` = 'db_name' and `table_name` in ('first_table', 'second_table');
		if($filter_arg=="*")
		{
			$tbl_result = $this->gen_query("SHOW COLUMNS FROM ".$table_arg.";"); 
			while($r_fields = mysqli_fetch_array($tbl_result)){	$arrTbl[] = $r_fields['Field'];		}
		}
		else
		{
			$myArray = explode(',', $filter_arg);			
			for($i=0;$i<count($myArray);$i++){	$arrTbl[] = $myArray[$i];	}
		}
		return $arrTbl;
	}	
	private function j_select_lf($fields_arg, $table_arg, $query_arg, $filter_arg, $sort_arg, $pageant_arg, $join, $img)
	{
		$eachVal = "";
		$q_start = null;
		$q_end	 = null;

		$sort = "";
		if($sort_arg!="")
		{
			$sa = explode("-", $sort_arg);
			$desc = (substr($sa[0],0,1)=="1")?" DESC ":"";
			if(strtolower(substr($sa[0], 1))=="x"){ $sort = " ORDER BY ".$sa[1];  }
			else
			{
				$cols = explode(",", $sa[1]);
				$sort = " ORDER BY ".$cols[substr($sa[0], 1)];	
			}			
			$sort .=" ".$desc;
		}
		
		$fields = [];		
		$arrField = explode(',', $fields_arg);			
		for($i=0;$i<count($arrField);$i++){	$fields[] = $arrField[$i];	}			
		
		$page="";
		if(isset($pageant_arg) && !$pageant_arg == null)
		{			
			$page_arr = explode(',', $pageant_arg);
			$limit= $page_arr[0];
			$start= ((($page_arr[1]<=0)?1:$page_arr[1])-1) * $limit;
			$page = '"limit":"'.$limit.'","page":"'.(($page_arr[1]<=0)?1:$page_arr[1]).'",';

			$pageant_arg ='LIMIT '.$start.', '.$limit;
		}	

		$qfilter = ($filter_arg)?" WHERE ".$filter_arg:"";

		$result = $this->gen_query("SELECT (SELECT COUNT(*) FROM ".$table_arg." ".$join." ".$qfilter." ) AS `XXcNtXX`, ".substr($query_arg,7)." ".$qfilter." ".$sort." ".$pageant_arg.";");

		$values = "[{";		
		if(!$this->hasError)
		{
			$n_rows = "0";			
			while($row = mysqli_fetch_array($result))
			{
				$arr = $this->gen_get_profile($img[0].$row['id'].$img[1], null);
				$json = json_decode($arr, true);
				foreach ($json as $key => $val){ if($key=='src'){$image=($val)?host.str_replace(host,"", $val):$img[2];} }
				//foreach ($json as $key => $val){	if($key=='src'){$image=($val)?str_replace("../","",$val):$img[2];}		}				

				$rowVal = "";
				for($i=0;$i<count($fields);$i++)
				{
					$rowVal .= json_encode($fields[$i]).":".json_encode(str_replace ("null", " ", $row["$fields[$i]"])).",";
				}
				$rowVal .= (($img)?'"image":'.json_encode($image).',':"").'"itoken":"'.$this->encrypt_decrypt("encrypt", $row[$fields[0]]).'"';
				$eachVal .= rtrim($rowVal, ",")."},{";
				$n_rows = $row['XXcNtXX'];	
			}
			$aLevel = (isset($_SESSION['lgu']['level']))?',"a_level":"'.$_SESSION['lgu']['level'].'"':"";
			$aPosit = (isset($_SESSION['lgu']['p_id'])) ?',"a_position":"'.$_SESSION['lgu']['level'].'"':"";
				
			$values .= rtrim($eachVal, ",{}").'},{"count":"'.$n_rows.'",'.$page.'"start":"'.$q_start.'","end":"'.$q_end.'"'.$aLevel.$aPosit.'}]';

		}else{	$values = $this->errorVal;		}
		
		return $values;
	}
	public function json_select_lf($fields_arg, $table_arg, $query_arg, $filter_arg, $sort_arg, $pageant_arg, $join, $img)
	{
		return $this->j_select_lf($fields_arg, $table_arg, $query_arg, $filter_arg, $sort_arg, $pageant_arg, $join, $img);
	}
	public function jquery2($fields_arg, $table_arg, $query_arg, $filter_arg, $sort_arg, $pageant_arg, $join, $img)
	{
		return $this->j_select_lf($fields_arg, $table_arg, $query_arg, $filter_arg, $sort_arg, $pageant_arg, $join, $img);
	}
	

	public function db_insert2($tbl_name_arg, $params_arg, $sha_arg)
	{
		$db_con = db::db_setConn();
		
		$query_syntax = "";		
		$fields = "";
		$values = "";
		
		$tmpArray = explode("&", $params_arg);
		for($i=0;$i<count($tmpArray);$i++)
		{	
			$tmpArray_ = explode("=", $tmpArray[$i]);			
			$fields .= "`".$tmpArray_[0]."`,";
			//$values .= "'".mysqli_real_escape_string($db_con, str_replace("%22",'"',$tmpArray_[1]) )."',";			
			if(!$sha_arg == "")
			{
				if( strtolower($tmpArray_[0]) == strtolower($sha_arg) )
				{
					$values .= "sha1('".mysqli_real_escape_string($db_con, $tmpArray_[1] )."'),";
				}
				else{	$values .= "'".mysqli_real_escape_string($db_con, str_replace("%22",'"',$tmpArray_[1]) )."',";		}
				
			}	
			else{	$values .= "'".mysqli_real_escape_string($db_con, str_replace("%22",'"',$tmpArray_[1]) )."',";	}			
		}				
		$query_syntax = "INSERT INTO ".$tbl_name_arg." (".substr($fields, 0, -1).") VALUES(".substr($values, 0, -1).");";

		$result = $this->db_gen($query_syntax);
		return $result;
		
		//return $query_syntax ;
	}
	
	public function db_insert1($tbl_name_arg, $params_arg)
	{
		$query_syntax = "";		
		$fields = "";
		$values = "";
		
		$tmpArray = explode("&", $params_arg);
		for($i=0;$i<count($tmpArray);$i++)
		{
			$tmpArray_ = explode("=", $tmpArray[$i]);			
			$fields .= "`".$tmpArray_[0]."`,";
			$values .= "'".$tmpArray_[1]."',";
			//$values .= "'".str_replace("'","''",$tmpArray_[1])."',";
		}		
		$query_syntax = $fields." - ".$values;		
		$query_syntax = "INSERT INTO ".$tbl_name_arg." (".substr($fields, 0, -1).") VALUES(".substr($values, 0, -1).");";

		$result = $this->db_gen($query_syntax);
		return $result;
		
		//return $query_syntax;
	}*/
	/*
	private function remove_null_index($values_arg)
	{
		$tmpArray = explode("&", $values_arg);
		$values = "";
		
		for($i=0;$i<count($tmpArray);$i++)
		{
			$tmpArray_ = explode("=", $tmpArray[$i]);
			$newVal = "";
			for($j=0;$j<count($tmpArray_);$j++)
			{			
				if( $tmpArray_[1] == "" ){	$j=count($tmpArray_);	}
				else{	$newVal = $tmpArray[$i]."&";		}			
			}		
			$values .= $newVal;
		}	
		$values = substr($values, 0, -1);			
		return $values;
	}
	public function remove_index($arr_arg, $item_arg)
	{	
		$tmpArray = explode("&", $arr_arg);
		$values = "";
		
		for($i=0;$i<count($tmpArray);$i++)
		{
			$tmpArray_ = explode("=", $tmpArray[$i]);
			$newVal = "";
			for($j=0;$j<count($tmpArray_);$j++)
			{			
				if( strtolower($tmpArray_[$j]) == strtolower($item_arg) ){	$j=count($tmpArray_);	}
				else{	$newVal = $tmpArray[$i]."&";		}			
			}		
			$values .= $newVal;
		}	
		$values = substr($values, 0, -1);
		
		return $this->remove_null_index($values);
	}		
	
	public function encrypt_decrypt($action, $string) 
	{
		$output = false;
		$encrypt_method= "AES-256-CBC";
		$secret_key= '';$secret_iv = '';

		$key = hash('sha256', $secret_key); 
		$iv = substr(hash('sha256', $secret_iv), 0, 16);
		
		if($action == 'encrypt'){		$output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);$output = base64_encode($output);    }
		else if($action == 'decrypt'){	$output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);    }
		return $output;
	}
	*/	




}




//select column_name 
/*
SELECT `COLUMN_NAME`
from `information_schema`.`columns` 
where `table_schema` = 'qr_db' and `table_name` in ('tbl_users', 'tbl_positions');


from `information_schema`.`columns` 
where `table_schema` = 'qr_db' and `table_name` in ('tbl_users', 'tbl_positions');
*/

/*
$users = new priSelect();
$result = $users->selectQuery("SELECT * FROM tbl_users;");

if(!$users->hasError)
{
	while($row = mysqli_fetch_assoc($result))
	{
		echo $row['fn'];
	}
}else{	echo $users->errorVal;		}
*/

?>