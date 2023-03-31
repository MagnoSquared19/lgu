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

	if(intval($glevel)<=2)
	{
		if($_POST['ft'] == '10-0')
		{
			$db=new control(); 
			$col="id,certificate_price,clearance_price,residence_price,biz_clearance_price,biz_closure_price";
			echo $db->j_select(['column'=>$col,'table'=>"doc_settings"]);	
		}
		if($_POST['ft'] == '10-3')
		{
			parse_str($_POST['data_'], $fd);
			$db= new control(); $db_con = $db->db_conn();
			$q = $db->db_update("UPDATE `doc_settings` SET	
				`certificate_price`='".mysqli_real_escape_string($db_con, str_replace(",","",$fd['indigency']))."',
				`clearance_price`='".mysqli_real_escape_string($db_con, str_replace(",","",$fd['clearance']))."',
				`residence_price`='".mysqli_real_escape_string($db_con, str_replace(",","",$fd['residency']))."',
				`biz_clearance_price`='".mysqli_real_escape_string($db_con, str_replace(",","",$fd['bness_clearance']))."',
				`biz_closure_price`='".mysqli_real_escape_string($db_con, str_replace(",","",$fd['bness_closure']))."'
				;	");
			
			mysqli_close($db_con);			
			echo '[{"result":"'.$q.'","error":""}]';	
		}
	}



	if(intval($glevel)==1)
	{
		if($_POST['ft'] == 'x0-1')
		{
			if(isset($_FILES['import_file']))
			{
				$fle_err= $_FILES['import_file']['error'];
				if(!$fle_err[0])
				{	
					ini_set('max_execution_time', 60000);				
					$db= new control(); $db_con= $db->db_conn();		$result="1"; $err=""; $succ=0; $fail=0;

					require_once($jroot."config/classes/PHPExcel.php");
					//echo $_FILES['import_file']['name'];
					$path  = $_FILES['import_file']['tmp_name'];
					$reader= PHPExcel_IOFactory::createReaderForFile($path);
					$excel_Obj = $reader->load($path);
					$worksheet=$excel_Obj->getSheet('0');
					$lastRow = $worksheet->getHighestRow();
					
					for($i=2;$i<=($lastRow + 1);$i++) 
					{ 
						$h_no= $worksheet->getCell("A{$i}")->getValue();
						$head= $worksheet->getCell("B{$i}")->getValue();
						$ln = $worksheet->getCell("C{$i}")->getValue();
						$fn = $worksheet->getCell("D{$i}")->getValue();
						$mn = $worksheet->getCell("E{$i}")->getValue();
						$phone= $worksheet->getCell("F{$i}")->getValue();
						$member= $worksheet->getCell("G{$i}")->getValue();
						$zone= $worksheet->getCell("H{$i}")->getValue();
						$remarks= $worksheet->getCell("J{$i}")->getValue();	

						$member_= ($member=="0" || $member==null)?"0":$member;

						$head_=	"0";
						if(strtolower($head)=="h"){ $head_=	"1"; }
						else if(strtolower($head)=="e"){ $head_= "2"; }

						if(!is_null($ln) && !is_null($fn) && !is_null($mn))
						{
							$q= $db->db_insert("INSERT INTO residents(`fn`,`mn`,`ln`,`head_ext`,`house_no`,`cp`,`member_count`,`zone`,`hh_remarks`) VALUES(
								'".mysqli_real_escape_string($db_con, $fn)."',
								'".mysqli_real_escape_string($db_con, $mn)."',
								'".mysqli_real_escape_string($db_con, $ln)."',
								'".mysqli_real_escape_string($db_con, $head_)."',
								'".mysqli_real_escape_string($db_con, $h_no)."',
								'".mysqli_real_escape_string($db_con, $phone)."',
								'".mysqli_real_escape_string($db_con, $member_)."',
								'".mysqli_real_escape_string($db_con, $zone)."',
								'".mysqli_real_escape_string($db_con, $remarks)."' )
								ON DUPLICATE KEY UPDATE ln='{$ln}',fn='{$fn}',mn='{$mn}' ;	");
							
							if($q=="1"){$succ += 1;}		
							else{ $fail += 1; $err.= $ln.", ".$fn.", ".$mn." - ".$member." ".$q."<br/><br/>"; }	
						}						
					}
					mysqli_close($db_con);
					echo '[{"result":"'.$result.'","id":"","error":"'.$err.'","success":"'.$succ.'","fail":"'.$fail.'"}]';
				}				
			}	
		}
	}
	

	
	

}
else{ echo "SessionExpired"; }


?>