<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php 
	require_once("../embed/header.php"); ?>
	<title><?php echo $title; ?></title>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo $icon; ?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<?php echo $head_rsc; ?>
	<link rel='stylesheet' type='text/css' href='style/structure.2.8.css' />
	<script type='text/javascript' src='model/js/application.js' ></script>		

</head>
<body>
<input type="checkbox" id="navibar" class="NaviBar_chk navibar-chk" hidden />
<div class="header"><div class="u-wrap">
	<?php echo $shrink_bar; echo $header; ?>
</div></div>

<div class="pageBody p-body">
<div class="p-banner"><div class="p-banner-in">
	<div class="p-banner-r1">
		<div class="logo-panel">		
			<div class="logo"><img src="<?php echo $logo; ?>" alt="" /></div>
			<div class="logo-text"><?php echo $banner_txt; ?></div>
		</div>
		<?php echo $logo2; ?>
	</div>
	<div class="u-wrap">
		<div class="p-banner-r2">
			<h1>ONLINE REGISTRATION</h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>COVID-19 IMMUNIZATION</b>
			</span>
		</div>		
	</div>
</div></div>



<div class="section c eee">
	<div class="c-form-panel">
		<div class="ui-header">
			<h3>Registration Form</h3>
			<h1><b class="ui-color-dark">Covid-19 </b> Immunization</h1>
		</div>
		<form class="CovidRegistry_form r-form"><div class="ui-form">	
			<div class="wrap">
				<h1>Acknowledgement</h1>
				<div class="wrap"><i class="ipt-lbl">Kategorya/ Category*</i>
					<select name="category" required> 
						<option id="0" value="" selected hidden>Select</option>
						<option id="1" value="A1">A1: Mga nagtratrabaho sa frontline health services</option>
						<option id="2" value="A2">A2: Lahat ng mga Senior Citizens (mula sa pinakamatanda)</option>
						<option id="3" value="A3">A3: Mga pasyenteng may ibang karamdaman</option>
						<option id="4" value="A4">A4: Mga non-medical frontline personnel sa mahahalagang sektor, kasama na ang uniformed personnel</option>
						<option id="5" value="A5">A5: Mga indigent or kapus-palad</option>
						<option id="6" value="B1">B1: Mga guro at social workers</option>
						<option id="7" value="B2">B2: Iba pang mga kawani ng gobyerno</option>
						<option id="8" value="B3">B3: Iba pang essential workers</option>
						<option id="9" value="B4">B4: Mga grupong may mataas na risk ng COVID-19 (maliban sa senior citizens at mga kapuspalad)</option>
						<option id="10" value="B5">B5: Overseas Filipino Workers</option>
						<option id="11" value="B6">B6: Iba pang mga Pilipinong nagtatrabaho</option>
						<option id="12" value="C1">C1: Lahat ng iba pang mamamayang Pilipino</option>
					</select>
				</div>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">ID Type/ Uri ng ID*</i>
						<select name="id_type" required> <option id="0" value="" selected hidden>Select</option><option id="1" value="1">PRC ID</option><option id="2" value="2">OSCA ID</option><option id="3" value="3">FACILITY ID</option><option id="4" value="4">OTHER ID</option> </select>
					</div>
					<div class="ipt-rfr"><i class="ipt-lbl">ID No./ Numero ng ID</i> <input type="text" name="id_type_no" placeholder="ID No./ Numero ng ID" /></div>
				</div>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">Philhealth ID No.</i> <input type="text" name="id_philhealth" placeholder="Philhealth ID Number" /></div>
					<div class="ipt-rfr"><i class="ipt-lbl">PWD ID No.</i> <input type="text" name="id_pwd" placeholder="PWD ID Number" /></div>
				</div>
				<div class="ipt-dvr"></div>
			</div>

			<div class="wrap" >
				<h1>Personal Information</h1>
				<div class="ipt-profile-wrap"><div class="ipt-profile-image">
					<img class="uPhoto_pic" src="../images/files/blank_profile.png" />
					<span class="uPhoto_btn"><i class="fa fa-camera"></i> Select Photo</span>
					<input type="file" name="uplFile[]" id="uplFile" class="uPhoto_ipt" hidden accept="image/*" capture="camera">
				</div></div>
				<div class="ipt-profile-info">
					<div class="ipt-lfr"><div class="ipt-lbl">Pangalan/ First Name*</div	><input type="text" name="fn" class="fn_ipt" required placeholder="First Name" ></div>
					<div class="ipt-rfr"><div class="ipt-lbl">Gitnang Pangalan/ Middle Name</div	><input type="text" name="mn" placeholder="Middle Name" ></div>
					<div class="wrap"	>
						<div class="l80-fr"> <div class="ipt-lbl">Apelyido/ Last Name*</div	><input type="text" name="ln" class="ln_ipt" required placeholder="Last Name" > </div>
						<div class="r20-fr"> <div class="ipt-lbl">Suffix</div	><input type="text" name="suffix" class="ln_ipt" placeholder="etc. Jr., Sr." > </div>
					</div>
				</div>
			</div>
			
			<div class="wrap">
				<div class="wrap">
					<div class="ipt-lfr">
						<div class="l30-fr"><i class="ipt-lbl">PWD*</i>
							<select name="pwd" required> <option value="0" selected>No</option><option value="1">Yes</option> </select>
						</div>
						<div class="r70-fr"><i class="ipt-lbl">Kasarian/ Gender*</i>
							<select name="gender" required> <option id="0" value="" selected hidden>Select</option><option id="1" value="0">Female</option><option id="2" value="1">Male</option> </select>
						</div>
					</div>
					<div class="ipt-rfr">
						<div class="ipt-lbl">Kaarawan/ Birthday*</div>	
						<div class="cv-bday-month">
							<select required name="bday_month">
								<option id="0" value="" selected>Select Month</option>
								<option id="1" value="01">January</option>
								<option id="1" value="02">February</option>
								<option id="1" value="03">March</option>
								<option id="1" value="04">April</option>
								<option id="1" value="05">May</option>
								<option id="1" value="06">June</option>
								<option id="1" value="07">July</option>
								<option id="1" value="08">August</option>
								<option id="1" value="09">September</option>
								<option id="1" value="10">October</option>
								<option id="1" value="11">November</option>
								<option id="1" value="12">December</option>
							</select>
						</div>
						<div class="cv-bday-day" ><input type="number" name="bday_day"  required placeholder="mm" min="0" max="31" /> </div>
						<div class="cv-bday-year"><input type="number" name="bday_year" required placeholder="yyyy" min="1900" max="2021" /> </div>
					</div>
				</div>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">Katayuang Sibil/ Status*</i>
						<select name="civil_status" required> <option id="0" value="" selected hidden>Select</option><option id="1" value="1">Single</option><option id="2" value="2">Married</option><option id="3" value="3">Widow</option><option id="4" value="4">Separated</option> </select>
					</div>
					<div class="ipt-rfr"><i class="ipt-lbl">Nasyonalidad/ Nationality</i>
						<select name="nationality" class="olNationality_sel" required> <option id="0" value="" selected hidden>Select</option> </select>
					</div>
				</div>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">Telepono/ Mobile No.*</i>	<input type="text" name="mobile" required placeholder="Mobile Number" /></div>
					<div class="ipt-rfr"><div class="ipt-lbl">E-mail<i class="ipt-lbl-notes"> (For recovering account)</i></div><input type="email" name="email" placeholder="E-mail Address" ></div>
				</div>
				<div class="wrap"><i class="ipt-lbl">Lugar ng Kapanganakan/ Place of Birth</i><input type="text" name="birth_place" placeholder="Place of Birth" /></div>
				
				<div class="wrap"><div class="ipt-lbl">Kasalukuyang Tirahan/ Current Residence*</div><input type="text" name="street" required placeholder="Unit no./ Building no./ House no., Street Name" ></div>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">Region*</i>
						<select class="phRegion_sel" name="region" required > <option id="0" value="">Select Region</option> </select>
					</div>
					<div class="ipt-rfr"><i class="ipt-lbl">Province*</i>
						<select class="phProvince_sel" name="province" required > <option id="0" value="">Select Province</option> </select>
					</div>
				</div>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">City/ Municipality*</i>
						<select class="phCity_sel" name="city" required > <option id="0" value="">Select City/ Municipality</option> </select>
					</div>
					<div class="ipt-rfr"><i class="ipt-lbl">Barangay*</i>
						<select class="phBrgy_sel" name="barangay" required > <option id="0" value="">Select Barangay</option> </select>
					</div>
				</div>

				<!-- <div calss="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">Barangay*</i>
						<select name="barangay" class="Brgy_sel" required> <option value="" selected hidden>Select</option> </select>
					</div>
					<div class="ipt-rfr"><i class="ipt-lbl"><?php echo $mun_type; ?>, Province</i><input type="text" name="city" class="u" disabled placeholder="<?php echo $mun_type; ?>, Province Address" value="<?php echo $municipal.', '.$province;; ?>" /></div>
				</div> -->
				<div class="ipt-dvr"></div>				
			</div>				

			<div class="wrap">
				<h1>Ocupation</h1>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">Employment Status/ Katayuan sa Trabaho*</i>
						<select name="emp_status" required> 
							<option id="0" value="" selected hidden>Select</option>
							<option id="1" value="1">Government Employed</option>
							<option id="2" value="2">Private Employed</option>
							<option id="3" value="3">Self-Employed</option>
							<option id="4" value="4">Private Practitioner</option> 
							<option id="5" value="5">Others</option> 
						</select>
					</div>
					<div class="ipt-rfr"><i class="ipt-lbl">Province/HUC/ICC of Employer</i> <input type="text" name="icc_employer" placeholder="Province/HUC/ICC of Employer" /></div>
				</div>
				<div class="wrap"><i class="ipt-lbl">Pangalan ng Negosyo/ Company Name</i><input type="text" name="bness_name" placeholder="Business Name" /> </div>
				<div class="wrap">
					<div class="ipt-lfr"><i class="ipt-lbl">Posisyon/ Position</i><input type="text" name="occupation" placeholder="Position" /> </div>
					<div class="ipt-rfr"><i class="ipt-lbl">Telepono/ Mobile No.</i><input type="text" name="bness_phone" placeholder="Mobile No." /> </div>
				</div>
				<div class="wrap"><i class="ipt-lbl">Lugar ng Negosyo/ Business Address</i><input type="text" name="bness_address" placeholder="Business Address" /> </div>				
				<div class="ipt-dvr"></div>
			</div>
		
			<div class="wrap">
				<h1>Vaccine Safety Screening</h1>
				<ol class="cv-ol">					
					<li>
						<div class="cv-que">Meron ka bang sakit tulad ng lagnat, ubo at sipon?</div>
						<div class="cv-tag">Do you have illnesses such as fever, cough and cold?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q1-a" name="q1" value="0" required><label for="q1-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q1-b" name="q1" value="1"><label for="q1-b"><p>Yes / Meron</p></label></div>	
						</div>
					</li>
					<li>
						<div class="cv-que">Naranasan mo na bang magkaroon ng isang matinding reaksyon ng alerdyi (hal. Anaphylaxis) sa isang bagay? Halimbawa, isang reaksyon kung saan ka nagamot ng epinephrine o EpiPen, o kung saan kailangan mong pumunta sa ospital.</div>
						<div class="cv-tag">Have you ever had a severe allergic reaction (e.g., anaphylaxis) to something? For example, a reaction for which you were treated with epinephrine or EpiPen, or for which you had to go to the hospital.</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q2-a" name="q2" value="0" required><label for="q2-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q2-b" name="q2" value="1"><label for="q2-b"><p>Yes / Meron</p></label></div>
						</div>
					</li>
					<li>
						<div class="cv-que">Naranasan mo na bang magkaroon ng isang seryosong reaksyon pagkatapos makatanggap ng pagbabakuna o ibang gamot na na-injection?</div>
						<div class="cv-tag">Have you ever had a serious reaction after receiving a vaccination or another injectable medication?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q3-a" name="q3" value="0" required><label for="q3-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q3-b" name="q3" value="1"><label for="q3-b"><p>Yes / Meron</p></label></div>
						</div>
					</li>
					<li>
						<div class="cv-que">Nakatanggap ka ba ng passive antibody therapy (monoclonal antibodies o convalescent serum) bilang paggamot para sa COVID-19 sa nagdaang 90 araw?</div>
						<div class="cv-tag">Have you received passive antibody therapy (monoclonal antibodies or convalescent serum) as treatment for COVID-19 in the past 90 days?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q4-a" name="q4" value="0" required><label for="q4-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q4-b" name="q4" value="1"><label for="q4-b"><p>Yes / Meron</p></label></div>
						</div>
					</li>
					<li>
						<div class="cv-que">Nakatanggap ka ba ng isa pang bakuna sa huling 14 na araw?</div>
						<div class="cv-tag">Have you received another vaccine in the last 14 days?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q5-a" name="q5" value="0" required><label for="q5-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q5-b" name="q5" value="1"><label for="q5-b"><p>Yes / Meron</p></label></div>							
						</div>
					</li>					
					<li>
						<div class="cv-que">Mayroon ka bang isang mahinang immune system na sanhi ng isang bagay tulad ng impeksyon sa HIV o cancer, uminom ka ba ng mga gamot na pang-immunosuppressive o therapies, o sinabi sa iyo na mayroon kang Guillain-Barre Syndrome o Bell's Palsy ng isang tagabigay ng pangangalaga ng kalusugan?</div>
						<div class="cv-tag">Do you have a weakened immune system caused by something such as HIV infection or cancer, do you take immunosuppressive drugs or therapies, or have been told you have Guillain-Barre Syndrome or Bell's Palsy by a healthcare provider?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q6-a" name="q6" value="0" required><label for="q6-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q6-b" name="q6" value="1"><label for="q6-b"><p>Yes / Meron</p></label></div>
						</div>
					</li>
					<li>
						<div class="cv-que">Mayroon ka bang sakit sa pagdurugo o kasalukuyan kang umiinum ng gamot na tumutulong sa maayos na daloy ng dugo?</div>
						<div class="cv-tag">Do you have a bleeding disorder or are you taking a blood thinner?</div>						
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q7-a" name="q7" value="0" required><label for="q7-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q7-b" name="q7" value="1"><label for="q7-b"><p>Yes / Meron</p></label></div>	
						</div>
					</li>
					<li>
						<div class="cv-que">Nagbubuntis ka ba, nagpapasuso, o nagpaplano na maging buntis sa susunod na 30 araw?</div>
						<div class="cv-tag">Are you pregnant, breastfeeding, or planning to become pregnant in the next 30 days?</div>						
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q8-a" name="q8" value="0" required><label for="q8-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q8-b" name="q8" value="1"><label for="q8-b"><p>Yes / Meron</p></label></div>	
						</div>
					</li>
					<li>
						<div class="cv-que">Direkta na nagkaroon ng pakikipag-ugnayan sa Covid-19 na pasyente?</div>
						<div class="cv-tag">Directly in interaction with Covid-19 patient?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q9-a" name="q9" value="0" required><label for="q9-a"><p>No / Hindi</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" id="q9-b" name="q9" value="1"><label for="q9-b"><p>Yes / Oo</p></label></div>
						</div>
					</li>
					<li>
						<div class="cv-que">Mayroon ka bang positibong resultang medikal para sa COVID-19 o mayroon ka bang nasabi sa iyo ng isang doktor na mayroon kang COVID-19?</div>
						<div class="cv-tag">Have you had a positive test for COVID-19 or has a doctor ever told you that you had COVID-19?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" class="q10_rad" id="q10-a" name="q10" value="0" required><label for="q10-a"><p>No / Wala</p></label> </div>
							<div class="cv-radio-wrap"> <input type="radio" class="q10_rad" id="q10-b" name="q10" value="1"><label for="q10-b"><p>Yes / Meron</p></label></div>
						</div>
						<div class="q10Iinput_wrap wrap" hidden >
							<div class="ipt-lfr">
								<div class="ipt-lbl">Date of First Positive Result*</div>	
								<div class="cv-bday-month">
									<select name="q10_month">
										<option id="0" value="" selected>Select Month</option>
										<option id="1" value="01">January</option>
										<option id="1" value="02">February</option>
										<option id="1" value="03">March</option>
										<option id="1" value="04">April</option>
										<option id="1" value="05">May</option>
										<option id="1" value="06">June</option>
										<option id="1" value="07">July</option>
										<option id="1" value="08">August</option>
										<option id="1" value="09">September</option>
										<option id="1" value="10">October</option>
										<option id="1" value="11">November</option>
										<option id="1" value="12">December</option>
									</select>
								</div>
								<div class="cv-bday-day" ><input type="number" name="q10_day"  placeholder="mm" min="0" max="31" /> </div>
								<div class="cv-bday-year"><input type="number" name="q10_year" placeholder="yyyy" min="2020" max="2021" /> </div>
							</div>
							<div class="r40-fr"><i class="ipt-lbl">Classification of Covid-19*</i>
								<select name="q10_class" > 
									<option id="0" value="" selected hidden>Select</option>
									<option id="1" value="1">Asymptomatic</option>
									<option id="2" value="2">Mild</option>
									<option id="3" value="3">Moderate</option>
									<option id="4" value="4">Severe</option> 
									<option id="5" value="5">Critical</option> 
								</select>
							</div>
						</div>
					</li>
					
					<li>
						<div class="cv-que">Sa Co-Morbidity (Mga Kundisyon ng Medikal)?</div>
						<div class="cv-tag">With Co-Morbidity (Medical Conditions)?</div>						
						<div class="cv-radio">
							<div class="ipt-lfr"> <input type="checkbox" name="q30" id="q30" value="1" /><label for="q30">Hypertension</label></div>
							<div class="ipt-rfr"> <input type="checkbox" name="q31" id="q31" value="1" /><label for="q31">Heart Disease</label></div>
							<div class="ipt-lfr"> <input type="checkbox" name="q32" id="q32" value="1" /><label for="q32">Kidney Disease</label></div>
							<div class="ipt-rfr"> <input type="checkbox" name="q33" id="q33" value="1" /><label for="q33">Diabetes Mellitus</label></div>
							<div class="ipt-lfr"> <input type="checkbox" name="q34" id="q34" value="1" /><label for="q34">Boncial Asthma</label></div>
							<div class="ipt-rfr"> <input type="checkbox" name="q35" id="q35" value="1" /><label for="q35">Immunodeficiency Status</label></div>
							<div class="ipt-lfr"> <input type="checkbox" name="q36" id="q36" value="1" /><label for="q36">Cancer</label></div>
							
						</div>
						<div class="wrap"> <i class="ipt-lbl">Others/ Iba Pa</i><input type="text" name="q30_other" placeholder="Others" /> </div>
					</li>
					<li>
						<div class="cv-que">Mga Alerhiya?</div>
						<div class="cv-tag">Allergies?</div>					
						<div class="cv-radio">
							<div class="ipt-lfr"> <input type="checkbox" name="q20" id="q20" value="1" /><label for="q20">Drug | Gamot</label></div>
							<div class="ipt-rfr"> <input type="checkbox" name="q21" id="q21" value="1" /><label for="q21">Food | Pagkain</label></div>
							<div class="ipt-lfr"> <input type="checkbox" name="q22" id="q22" value="1" /><label for="q22">Insect | Insekto</label></div>
							<div class="ipt-rfr"> <input type="checkbox" name="q23" id="q23" value="1" /><label for="q23">Latex</label></div>
							<div class="ipt-lfr"> <input type="checkbox" name="q24" id="q24" value="1" /><label for="q24">Mold | Amag</label></div>
							<div class="ipt-rfr"> <input type="checkbox" name="q25" id="q25" value="1" /><label for="q25">Pet | Alaga</label></div>
							<div class="ipt-lfr"> <input type="checkbox" name="q26" id="q26" value="1" /><label for="q26">Pollen</label></div>
						</div>
					</li>
					<li>
						<div class="cv-que">Nais mo bang mabakunahan ng Covid19 Vaccine?</div>
						<div class="cv-tag">Do you want to be vaccinated with Covid19 Vaccine?</div>
						<div class="cv-radio">
							<div class="cv-radio-wrap"> <input type="radio" id="q0-b" name="q0" value="1"><label for="q0-b"><p>Yes / Oo</p></label></div>							
							<div class="cv-radio-wrap"> <input type="radio" id="q0-a" name="q0" value="0" required><label for="q0-a"><p>No / Hindi</p></label> </div>							
							<div class="cv-radio-wrap"> <input type="radio" id="q0-c" name="q0" value="2" ><label for="q0-c"><p>Undecided / Walang Pasya</p></label> </div>
						</div>
					</li>
				</ol>	
				<div class="wrap"><div class="ipt-lbl">Remarks/ Mensahe</div><textarea rows="2" name="remarks" placeholder="Remarks / Notes"></textarea></div>			

				<div class="ipt-dvr"></div>				
				<div class="wrap" hidden>
					<div class="ipt-lfr"> <div class="ipt-lbl">Username</div><input type="text" name="username" class="Signup_username" placeholder="Username" /> </div>
					<div class="ipt-rfr"> <div class="ipt-lbl">Password</div>
						<div class="PwIpt_fr login-ipt-fr" >	
							<input type="password" class="login-ipt" name="password" placeholder="Password" minlength="6" />
							<div class="login-ico fa fa-key"><i></i></div>
							<div class="EyeIpt_btn login-pw-ico fa fa-eye"></div>
						</div>	
					</div>
				</div> 
			</div>

			<div class="wrap">
				<h1>WAIVER / PAGPAPATUNAY</h1>
				<div class="cv-waiver">
					<input type="checkbox" class="cvWaiver_chk" name="waiver" />
					<p>Ako ay nagpapatunay na ang lahat ng nasabing impormasyon ay tama at pawang katotohanan. Ito ay kinakailangan para sa <b>Daraga Covid-19 Electronic Immunization (DCEI) Registry</b> at sa pagproseso ng pagbabakuna. Ako rin ay nagpapatunay na ang aking ibinigay na impormasyong personal na nakasaad sa pagtatala ay upang maitaguyod ang aking mga karapatan at magpatupad ng naaangkop na mga hakbang sa seguridad alinsunod sa RA No. 10173 o ang Data Privacy Act of 2012. <br/><br/>Ako rin ay nagpapatunay na walang pananagutan ang Daraga Municipal Health Unit sa posibleng masamang epekto na aking mararamdaman matapos na ako ay magpabakuna.</p>
				</div>	

			</div>
			<div class="button-fr">
				<button class="cvSubmit_btn u-button" disabled ><i class="fa fa-send"></i>SUBMIT</button>
			</div>
		</div></form>

	</div>
</div>

<script src='../js/qr.js'></script>


<?php require_once('../embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>

<script type='text/javascript' src='../js/ph.locations.js' ></script>
<script type="text/javascript">
$(document).ready(function(e){ install_location_list(); });
</script>

</body>
</html>
