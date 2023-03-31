<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link rel="shortcut icon" type="image/x-icon" href="../images/favicon.ico"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<title>Covid-19 Registration Profile | LGU Management System</title>

	<link rel="stylesheet" type="text/css" href="../style/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="../style/jquery-ui.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.1.3.css"/>
	<link rel="stylesheet" type="text/css" href="../style/calendar.css"/>
	<link rel="stylesheet" type="text/css" href="../account/style/table.1.4.css"/>
	<link rel="stylesheet" type="text/css" href="../account/style/theme.1.4.css"/>	
	<!-- <link rel="stylesheet" type="text/css" href="../account/style/structure.2.8.css"/>	 -->
    <link rel="stylesheet" type="text/css" href="style/structure.2.8.css"/>	
    <link rel="stylesheet" type="text/css" href="style/theme.m.1.4.css"/>	
	
	<script type="text/javascript" src="../js/jquery.js" 	></script>	
	<script type="text/javascript" src="../js/jquery.ui.js" ></script>		
	<script type="text/javascript" src="../js/calendar.js"  ></script>	
	<script type="text/javascript" src="../js/global.2.7.js"></script>				
	<script type="text/javascript" src="js/model.1.4.js" 	></script>	

	<?php 
	require_once("../embed/header.php");
	$title = "Covid-19 Registration Profile";
	$image = host."images/files/background/daraga-profile.jpg";
	$description= "LGU Daraga Online Registration for Covid-19 Immunization";
	echo "
	<meta property='og:title' content='{$title}'>	
	<meta property='og:image' content='{$image}'>
	<meta property='og:description' content='{$description}'>
	<meta property='og:url' content='".host."users/qr.profile.php?qr=".$_GET['qr']."'>

	<meta name='twitter:title' content=' {$title}'>
	<meta name='twitter:description' content=' {$description}'>
	<meta name='twitter:image' content=' {$image}'>
	<meta name='twitter:card' content='summary_large_image'>";
	?>
</head>
<body>

<div class="m-body"><div class="m-body-in">
<?php
if(!isset($_GET['qr'])){ echo ProfileValidate(); }
else
{
	require_once("../config/settings/settings.php"); 
	$db= new control(); $aid= $db->encryptor($_GET['qr'],['id'=>true,'encrypt'=>false]);

	$q= $db->db_gen("SELECT `U`.*, DATE_FORMAT(`U`.bday, '%M %d, %Y') AS bday, timestampdiff(year,`U`.bday,curdate()) AS age,
		(SELECT name FROM brgy_list WHERE id=`U`.brgy_id) AS brgy_address,
		DATE_FORMAT(`C`.dated, '%M %d, %Y') AS dated, `C`.trans_no, 
		`C`.dose_date1 AS dose1, `C`.dose_date2 AS dose2,
		`C`.dose_brand1, `C`.dose_brand2
		FROM residents `U` LEFT JOIN covid_immunization `C` ON `U`.id=`C`.resi_id 
		WHERE `C`.inactive='0' AND `C`.trans_no='".$_GET['qr']."';");

	if($db->hasError){ echo ProfileValidate($db->errorVal); }
	else
	{
		if(mysqli_num_rows($q) <= 0){ echo ProfileValidate(); }
		else
		{				
			$r= mysqli_fetch_array($q);
			$profile= $db->j_profile("users/files/users/".$r['id']."/profile","../images/files/blank_profile.png");	

			$address= $r['street_address'].(($r['brgy_address']=='')?"":", ".$r['brgy_address']);
			$gender = ($r['gender']=="1")?"Male":(($r['gender']=="0")?"Female":"Not Set");
			$bday	= ($r['bday']=='')?"":"<div class='m-profile-tr'><i class='fa fa-calendar'></i><p>{$r['bday']} - {$r['age']} years old</p></div>";
			$work	= ($r['work']=='')?"":"<div class='m-profile-tr'><i class='fa fa-briefcase'></i><pre>{$r['work']}</pre></div>";
			//$d1		= ($r['dose1']=='')?"00/00/0000":date_format(date_create($r['dose1']), 'F j, Y');
			$d1		= ($r['dose1']=='0000-00-00' || $r['dose1']=='')?"00/00/0000":date_format(date_create($r['dose1']), 'M. d, Y');
			$d2		= ($r['dose2']=='0000-00-00' || $r['dose2']=='')?"00/00/0000":date_format(date_create($r['dose2']), 'M. d, Y');

			echo "
			<div class='m-pagelet'>
				<div class='m-profile-pic'>
					<img src='{$profile}' />
					<div class='m-profile-pic-label'><i class='fa fa-qrcode'></i><p>{$r['trans_no']}</p></div>							
				</div>
				<div class='m-pagelet-in'>
					<div class='m-accnt-name'>
						<b>{$r['fn']} {$r['mn']} {$r['ln']}</b>
						<p>Registered Since - {$r['dated']}</p>	
					</div>
					<div class='m-accnt-qr'><div class='m-accnt-qr-in'> 
						<img id='qr_code' alt='' /> 
						<p>".$r['trans_no']."</p>
					</div></div>
					<div class='m-accnt-info'>
						<div class='m-profile-title'>BASIC INFORMATION</div>
						{$bday}	
						<div class='m-profile-tr'><i class='fa fa-intersex'></i><p>Gender : {$gender}</p></div>
						{$work}
						<div class='m-profile-tr'><i class='fa fa-map-marker'></i><p>
							Lives in ".(($address=='')?'(not set)':$address)."
							".(($r['hometown']=='')?'':"<br>Hometown: ".$r['hometown'])."
						</p></div>
						<div class='m-profile-tr'><i class='fa fa-calendar-check-o'></i>
							<p>
								<span class='wrap'><b>1st Dose:</b> {$d1} - ".$r['dose_brand1']."</span>
								<span class='wrap'><b>2nd Dose:</b> {$d2} - ".$r['dose_brand2']."</span>
							</p>
						</div>
					</div>						
				</div>
			</div>

			<div class='m-pagelet m-covid-footer'>
				<img src='../images/files/background/daraga-profile.jpg' />
				<div class='m-pagelet-in'>
					<div class='m-covid-footer-data'>
						<b>Daraga COVID-19 Immunization</b>
						<p>Registration Profile</p>
					</div>
				</div>
			</div>
			";

			$uri= $host."users/qr.profile.php?qr=".$r['trans_no'];
			echo "
			<script src='{$host}js/qr.js'></script>
			<script type='text/javascript'>
			(function(){ var qr=window.qr= new QRious({ element: document.getElementById('qr_code'), padding:0,size: 250, value:'{$uri}' }); })();	
			</script>";
		}
	}
}

function ProfileValidate($s=null)
{
	$no_result='
	<div class="m-profile-no-result">
		<div class="blank-profile-ico"><b></b><p></p></div>
		<div class="no-result-title">'.(($s)?"System Error in : ":"No Result Found").'</div>
		<div class="no-result-result">'.(($s)?$s:"Sorry the code that you scanned is Not Valid.<br/>Please try a New QR-Code or Re-scan the Previous.").'</div>
	</div>';

	return $no_result;
}
?>
</div></div>


</body>
</html>