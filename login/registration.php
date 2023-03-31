<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php 
	require_once("../embed/header.php");
	echo "
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	<meta name='viewport' content='initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no' />
	{$meta}

	<title>{$title}</title>
	<link rel='shortcut icon' type='image/x-icon' href='{$icon}' />	
	{$head_rsc}
	<script type='text/javascript' src='model/js/registration.1.0.js' 	></script>
	";
?>

</head>
<body>
<?php echo $header; ?>

<div class="banner"><div class="u-wrap">
	<h1 class="ui-font">Online Registration</h1>
	<span><a href="/" class="lnk">HOME<i class="fa fa-chevron-right"></i></a><b>SIGN UP</b> </span>
</div></div>

<div class="section eee">
	<div class="r-form-panel">
		<div class="ui-font reg-header">
			<h3 class="ui-color">Create New Account</h3>
			<h1 class="h1">Online <b>Registration</b></h1>
		</div>
		<form class="Registration_form r-form" >
			<div class="ipt-profile-wrap" title="Picture must be VALID and UPDATED" ><div class="ipt-profile-image">
				<img class="uPhoto_pic" src="../images/files/blank_profile.png" />
				<span class="uPhoto_btn"><i class="fa fa-camera"></i> Select Photo</span>
				<input type="file" name="uplFile[]" id="uplFile" class="uPhoto_ipt" hidden accept="image/*" capture="camera">
			</div></div>
			<div class="ipt-profile-info">
				<div class="ipt-lfr"><div class="ipt-lbl">First Name*</div	><input type="text" name="fn" class="fn_ipt" required placeholder="First Name" ></div>
				<div class="ipt-rfr"><div class="ipt-lbl">Middle Name</div	><input type="text" name="mn" placeholder="Middle Name" ></div>
				<div class="wrap"	><div class="ipt-lbl">Last Name*</div	><input type="text" name="ln" class="ln_ipt" required placeholder="Last Name" ></div>
			</div>

			<div class="ipt-dvr"></div>
			<div class="wrap">
				<div class="ipt-lfr">
					<div class="l40-fr"><div class="ipt-lbl">Gender*</div>
						<select name="gender" required >
							<option id="0" value="" selected disabled>Select</option>
							<option id="1" value="1">Male</option>
							<option id="2" value="2">Female</option>
						</select>
					</div>
					<div class="r60-fr"><div class="ipt-lbl">Birthday*</div><input type="date" name="birthday" required placeholder="Birthday" ></div>
				</div>
				<div class="ipt-rfr"><div class="ipt-lbl">Mobile No.</div><input type="text" name="cp" class="mobile_" placeholder="Mobile Number" ></div>
			</div>
			<div class="wrap"><div class="ipt-lbl">E-mail Address</div><input type="email" name="email" placeholder="E-mail Address" ></div>
			
			<div class="ipt-dvr"></div>
			<div class="wrap">
				<div class="ipt-lfr"><div class="ipt-lbl">Precinct No.*</div><input type="text" name="precint_no" required placeholder="Precinct Number" ></div>
				<div class="ipt-rfr"><div class="ipt-lbl">Province*</div>
					<div class="chosen-wrap">
						<select class="phProvince_sel chosen_select" name="province" required >
							<option id="0" value="" selected disabled>Select Province</option>
							<option id="chosen_other">OTHERS</option>
						</select>
						<input type="text" name="prov_other" class="chosen_input" placeholder="OTHERS" />
					</div>
				</div>
			</div>
			<div class="wrap">				
				<div class="ipt-lfr"><div class="ipt-lbl">Town/ City</div>
					<select class="phCity_sel has_invalid option_invalid" name="city" ><option id="0" value="" class="option_invalid" selected disabled>Select Town or City</option></select>
				</div>
				<div class="ipt-rfr"><div class="ipt-lbl">Barangay</div>
					<select class="phBrgy_sel has_invalid option_invalid" name="barangay" ><option id="0" value="" class="option_invalid" selected disabled>Select Barangay</option></select>
				</div>
			</div>
			<div class="wrap">
				<div class="ipt-lfr">
					<div class="ipt-lfr"><div class="ipt-lbl">Purok</div><input type="text" name="purok" placeholder="Purok Number" ></div>
					<div class="ipt-rfr"><div class="ipt-lbl">Street</div><input type="text" name="street" placeholder="Street" ></div>
				</div>
				<div class="ipt-rfr"><div class="ipt-lbl">House# / Bldg.# / Lot# </div><input type="text" name="house" placeholder="House No. or Building No. or Lot No." ></div>				
			</div>
			
			<div class="ipt-dvr"></div>	
			<div class="wrap">
				<div class="ipt-lfr"><div class="ipt-lbl">Account Type*</div>
					<select name="type" class="olRegType_sel" required >
						<option id="0" value="" selected hidden>Select Type</option>
						<option id="1" value="1">Provincial Leader</option>
						<option id="2" value="2">Municipal Leader</option>
						<option id="3" value="3">Precinct Leader</option>
						<option id="4" value="4">Household Leader</option>
						<option id="5" value="5">Volunteer</option>
					</select>
				</div>
				<div class="olRegType_wrap"></div>
			</div>


			<div class="ipt-dvr"></div>			
			<div class="pwd_confirm_wrap_ wrap">
				<div class="ipt-tri"><div class="ipt-lbl">Username*</div><input type="text" name="username" required placeholder="Username" ></div>
				<!-- <div class="ipt-rfr"><div class="ipt-lbl">Password*</div><input type="password" name="password" required placeholder="Password" ></div>	 -->			
				<div class="ipt-tri-m"><div class="ipt-lbl">Password*</div>
					<div class="PwIpt_fr password-wrap" >	
						<input class="pwd_password_" name="password" type="password" minlength="6" required placeholder="Password" />
						<a href="#" class="EyeIpt_lnk"><i class="fa fa-eye"></i></a>
					</div>	
				</div>
				<div class="ipt-tri"><div class="ipt-lbl">Confirm Password*</div>
					<div class="PwIpt_fr password-wrap" >	
						<input class="pwd_confirm_" name="c_password" type="password" minlength="6" required placeholder="Confirm Password" />
						<a href="#" class="EyeIpt_lnk"><i class="fa fa-eye"></i></a>
					</div>	
				</div>
			</div>

			<div class="ipt-dvr"></div>
			<div class="button-fr"> <button class="xxi button"><i class="fa fa-send"></i>SUBMIT</button> </div>
		</form>
	</div>

	<div class="r-req-panel">
		<div class="reg-header">
			<h3 class="ui-color">General Info</h3>
			<h1 class="h1">List of <b>Requirements</b></h1>
		</div>
		<div class="r-info">			
			<ol class="r-req-wrap">
				<div class="r-info-title"><b>NEW APPLICATION</b></div>
				<li class="p">2x2 ID Photo For Verification <br/>NOTE! Picture must be <b>VALID</b> and <b>UPDATED</b></li>
				<li class="p">Precinct Number is <b>REQUIRED</b></li>
				<li class="p">Please Select Leader based from your Account Type.</li>
			</ol>
			<ol class="r-req-wrap">
				<div class="r-info-title"><b>EXISTING ACCOUNT</b> (Recovery)</div>
				<li class="p">Valid E-mail Address</li>
				<li class="p">Valid Phone Number</li>
			</ol>
			
		</div>

		<div class="r-notification ui-notification">
			<div class="ui-notif-head"><b>Important Information</b><p>Requirements</p><u></u></div>
			<div class="ui-notif-body">
				<p class="p">Using Online Registration, all the fields with asterisk (*) sign are required fields.</p>
				<br/>
				<p class="p"><b>Note!</b> Profile Picture must be image format <br/>etc.: .JPG, .JPEG, .IMG, .PNG, .GIF format.</p>
			</div>
		</div>
	</div>

</div>







<?php 

require_once('../embed/footer.php'); 
echo $footer;   
echo $navibar;

?>


</body>
</html>