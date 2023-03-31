<?php
//require $_SERVER['DOCUMENT_ROOT'] ."/config/control/db.php";
//if(!defined('host')) define('host', strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,strpos( $_SERVER["SERVER_PROTOCOL"],'/'))).'://'.$_SERVER['SERVER_NAME']."/");
$protocol = ( (! empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') || (! empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (! empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') )?"https":"http";

$croot= explode("config", str_replace("\\","/",dirname(__FILE__)))[0];
$cdir = str_replace($_SERVER['DOCUMENT_ROOT']."/", "", $croot);

if(!defined('host')){ define('host', $protocol.'://'.$_SERVER['SERVER_NAME']."/{$cdir}"); }
if(!defined('path')){ define('path', $_SERVER['DOCUMENT_ROOT']."/{$cdir}"); }
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
	private function gen_scan_dir($dir,$sfiles,$arr)		// New Code
	{
		$dir = path.$dir;		// New Code
		$d=['array'=>false];
		foreach($arr as $k => $v){ $d[$k]=$v; }

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
						'thumbnail'=>(($sfiles=="")?"":str_replace(path, host, $this->gen_scan_files($dir.$value,$sfiles))), 
						'cont_num'=>strval(	count(array_slice(scandir($dir.$value),2))	),						
					)); 
				}	//'thumbnail'=>(($sfiles=="")?"":$this->gen_scan_files($dir.$value,$sfiles)),
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

		if($d['array']){ $result = $folder; }
		else{ $result = json_encode($folder); }

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
	private function gen_del_all($dirname) 
	{
		$dir_handle = null;
		if(is_dir($dirname)) $dir_handle = opendir($dirname);
		if(!$dir_handle){return false;}
		while($file = readdir($dir_handle)) 
		{
			if($file != "." && $file != "..")
			{
				if(!is_dir($dirname."/".$file)){ unlink($dirname."/".$file); }
				else{ $this->gen_del_all($dirname.'/'.$file); }
			}
		}
		closedir($dir_handle);
		rmdir($dirname);
		return true;
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
	private function j2_select($arr)		// New Code (11/13/21)
	{
		$result= "";
		$d=['column'=>null,'table'=>null,'condition'=>null,'sort'=>null,'paginate'=>null,'query'=>null,'group-by'=>null,'count'=>null,'image'=>null,'image-column'=>"id",'array'=>false,'get-query'=>false,'pid'=>null,'params'=>null,'union'=>null,'limit'=>null];
		foreach($arr as $k => $v){ $d[$k]=$v; }
		
		$col= ($d["column"])?$d["column"]:"*";
		$con= ($d['condition'])?" WHERE ".$d['condition']:"";
		$p_a= explode(",",($d['paginate'])?$d['paginate']:"0,0");

		$pagi_= ($d['limit']!=null)?" LIMIT ".$d['limit']:$this->paginate($d["paginate"]);
		$query_str= (($d['query'])?$d['query']:"SELECT $col FROM ".$d['table'])." ".$con.(($d["group-by"])?" GROUP BY ".$d["group-by"]:"")." ".$this->sort($d["sort"])." ".$pagi_;		

		/*$query_str= (($d['query'])?$d['query']:"SELECT $col FROM ".$d['table'])." ".$con.(($d["group-by"])?" GROUP BY ".$d["group-by"]:"")." ".$this->sort($d["sort"])." ".$this->paginate($d["paginate"]);	*/
		if($d['get-query']){ return $query_str; die(); }

		$select= $this->gen_query($query_str);		
		if(!$this->hasError)
		{	
			$result= [];

			if($d['union']){ $tCnt= $this->gen_query("SELECT COUNT(".(($d['count'])?"DISTINCT ".$d['count']:"*").") AS cnt FROM (".$d['union'].") ".$con." AS cnt;"); }
			else{ $tCnt= $this->gen_query("SELECT COUNT(".(($d['count'])?"DISTINCT ".$d['count']:"*").") AS cnt FROM ".$d['table']." ".$con." LIMIT 1;"); }

			if($this->hasError){ echo "Count error in: ".$this->errorVal; die(); }
			else  //New Code 
			{
				$c=mysqli_fetch_array($tCnt); 
				$pLink= "";
				if($d['paginate']!=null){ $pages= ceil($c['cnt'] / $p_a[0]); for($i=1; $i<=$pages; $i++){ $pLink .= $i.","; }; }

				$folio= array('count'=>$c['cnt'],'limit'=>$p_a[0],'page'=>$p_a[1],'page_link'=>rtrim($pLink,","));
				if(isset($_SESSION['lgu']['level'])){ $folio['a_level'] = $_SESSION['lgu']['level']; $folio['a_position'] = $_SESSION['lgu']['p_id']; }	 
				array_push($result, $folio);
			}
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
			/*if(isset($_SESSION['lgu']['level'])){ array_push($result, array('a_level'=>$_SESSION['lgu']['level'],'a_position'=>$_SESSION['lgu']['p_id'])); }	*/				

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
		public function iterator($arr)		// New Code j1
		{
			$d=['paginate'=>false,'index'=>0,'current'=>null,'object'=>null];
			foreach($arr as $k => $v){ $d[$k]=$v; }

			if($d['paginate']==true){ return ((intval($d['index'])<=1)?"0":intval($d['index'])-2).",3"; }
			else
			{
				$rtn= null; $obj= $d['object']; $prev="0"; $next="0";				

				for($i=0;$i<count($obj);$i++)
				{
					if($i==1)
					{ 
						if($obj[$i]['id']!=$d['current']){ $prev=$obj[$i]['id']; } 
					}
					if($i==2){ if($prev=="0"){ $next=$obj[$i]['id']; break; } }
					if($i==3){ if($obj[$i]['id']!=$d['current']){ $next=$obj[$i]['id']; } }
				}

				$rtn= ['index'=>$d['index'],'current'=>$d['current'],'prev'=>$prev,'next'=>$next,'p_'=>$this->etoken($prev),'n_'=>$this->etoken($next)];
				return $rtn;
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
	public function delete_file_folder($path){ return $this->gen_del_file($path); }
	public function delete_files($path){ return $this->del_files($path); }
	public function delete_directory($path){ return $this->gen_del_all($path); }
	public function get_file_info($path,$format,$arr=null){ return $this->gen_get_file($path, $format, $arr); }
	public function get_directories($path_arg,$subfiles="",$prop=null){ return $this->gen_scan_dir($path_arg,$subfiles,$prop);	 }
	public function get_profile($path_arg, $format_arg, $arr=null){ return $this->gen_get_profile($path_arg, $format_arg, $arr); }
	
	public function j_select($arr)	{ return $this->j2_select($arr); }
	public function j_queries($query){ return $this->gen_multiple($query); }
	public function j_delete($tbl,$token,$arr=null){ return $this->jset_delete($tbl,$token,$arr); }
	public function j_profile($path, $def="", $arr=null){ return $this->jget_profile($path,$def,$arr); }


	public function etoken($id){ return $this->encryptor($id); }
	public function itoken($id){ return $this->encryptor($id,['encrypt'=>false]); }
	public function encryptor($str,$arr=[]) 
	{
		$d=['encrypt'=>true,'key'=>"bazaa",'iv'=>"jvc"];		
		foreach($arr as $k => $v){ $d[$k]=$v; }
		$output=false; $encrypt_method="AES-256-CBC"; $secret_key=$d['key']; $secret_iv=$d['iv'];
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


	
	




}





?>