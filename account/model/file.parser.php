<?php

//$res = preg_replace("/[^a-zA-Z]/", "", $string);

ini_set('max_execution_time', 800);		ini_set('gd.jpeg_ignore_warning', true);

function move_file($a)
{
	$d=['src'=>null,'to'=>null,'size'=>null,'type'];
	foreach($a as $k => $v){ $d[$k]=$v; }
	if(!is_dir($d['to'])){ mkdir($d['to'], 0755, true); }

	$name= explode("/",$d['src']);	
	rename($d['src'], $d['to']."/".$name[count($name)-1]);
}
function copy_file($a)
{
	$d=['src'=>null,'to'=>null,'size'=>null,'type'];
	foreach($a as $k => $v){ $d[$k]=$v; }
	if(!is_dir($d['to'])){ mkdir($d['to'], 0755, true); }

	$name= explode("/",$d['src']);	
	copy($d['src'], $d['to']."/".$name[count($name)-1]);
}
//input-name,id,name,path
function gUploader($id="",$nme="",$dir_="",$ipt="",$ext="",$w="",$h="",$replace="")
{
	$loc = ($dir_!="")?$dir_.$id:"../files/users/".$id;
	$dir = ""; $sDir="";
	
	if(strpos($dir_,",") !== false)
	{
		$dir_arr=explode(",",$dir_);
		$loc = ($dir_arr[0]=="")?"../files/users/".$id:$dir_arr[0].$id;
		$dir = $loc."/".$dir_arr[1];
		$sDir= $dir_arr[1];
	}
	$dir = ($dir=="")?$loc:$dir;

	if($replace==""){
		require_once("../../config/settings/settings.php"); require_once("../../config/model/global_var.php"); 
		$control= new control(); $control->delete_files($loc);	$control->delete_files($dir);	
	}

	if(!is_dir($loc)){	mkdir($loc, 0755, true);	}
	if($dir!="")
	{	
		$tmpDir=explode("/", $sDir);
		if(count($tmpDir)==1){	if(!is_dir($dir)){mkdir($dir, 0755, true);}	}
		else
		{
			$tVal = "";
			foreach($tmpDir as $tmpVal)
			{ 
				$tVal .= "/".$tmpVal; 
				$sDir = $loc.$tVal;
				if(!is_dir($sDir)){ mkdir($sDir, 0755, true); }
			}
			unset($tmpVal);
		}
	}
	$tFile = ($ipt!="")?$ipt:"uplFile";	
	
	for($i=0;$i<count($_FILES[$tFile]["name"]);$i++)
	{
		$tmpName = $_FILES[$tFile]["name"][$i]; 
		$fileTmpLoc = $_FILES[$tFile]["tmp_name"][$i]; 
		$fileType = $_FILES[$tFile]["type"][$i]; 
		$fileSize = $_FILES[$tFile]["size"][$i]; 
		$fileErrorMsg = $_FILES[$tFile]["error"][$i];
		$Nme_arr= explode(".", $tmpName);
		$fName= ""; $fExt= strtolower($Nme_arr[count($Nme_arr) - 1]);			
		for($n=0;$n<(count($Nme_arr) - 1);$n++){ $fName .= $Nme_arr[$n].".";	}
		$fName = rtrim($fName,".");			

		$fullName = fileName(($nme!="")?$nme.".".$fExt:$fName.".".$fExt);
		$moveResult = move_uploaded_file($fileTmpLoc, $dir."/".$fullName);

		$array = array('image/gif','image/png','image/jpg','image/jpeg','image/bmp');
		if(in_array($fileType,$array))
		{
		    if($w!="" && $h!="" && $tmpName!=""){	resize_image($dir."/".$fullName, $dir."/".$fullName, $w, $h, $fExt, 100);	}
		}		
	}

}
//echo '[{"result":"1"}]';


function resize_image($src,$dest,$toWidth,$toHeight,$ext,$options=array()) 
{	
	if(!file_exists($src)){ echo "$src file does not exist";	die(); }
	$ext = strtolower($ext);
    if ($ext == "gif"){	$img = imagecreatefromgif($src);	} 
	if($ext =="png")  {	$img = imagecreatefrompng($src);	} 
	else
	{
		$img = @Imagecreatefromjpeg($src);
		if(!$img){ $img= imagecreatefromstring(file_get_contents($src)); }
	}

	list( $width , $height ) = getimagesize($src);
	$xscale=$width/$toWidth;							
	$yscale=$height/$toHeight;
	if($yscale > $xscale){ $new_width = round($width * (1/$yscale)); $new_height = round($height * (1/$yscale)); }
	else{ $new_width = round($width * (1/$xscale)); $new_height = round($height * (1/$xscale)); }	
	
	if(!($imageResized = imagecreatetruecolor($new_width, $new_height))){ echo "Could't create new image resource";die();}
	if(! imagecopyresampled($imageResized, $img , 0 , 0 , 0 , 0 , $new_width , $new_height , $width , $height)){ echo "Resampling failed"; die(); }	
	if(! imagejpeg($imageResized , $dest)){ echo "Could not save new file"; die(); }	
		
	imagedestroy($img);
	imagedestroy($imageResized);	

	return "";
}
function resizeReplace($target, $newcopy, $w, $h, $ext) 
{
    list($w_orig, $h_orig) = getimagesize($target);
    $scale_ratio = $w_orig / $h_orig;
    	
    $img = "";
    $ext = strtolower($ext);
    if ($ext == "gif")		{	$img = imagecreatefromgif($target);		} 
	else if($ext =="png")	{	$img = imagecreatefrompng($target);		} 
	else {		$img = imagecreatefromjpeg($target);	}
	
	$tci = imagecreatetruecolor($w, $h);
  
    imagecopyresampled($tci, $img, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);
	
    if ($ext == "gif")		{	imagegif($tci, $newcopy);	} 
	else if($ext =="png")	{ 	imagepng($tci, $newcopy);	} 
	else {	imagejpeg($tci, $newcopy, 84);	}
}




?>