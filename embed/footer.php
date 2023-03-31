<?php 
	
$footerX= "
<div class='footer' id='footer'><div class='u-wrap'>
	<div class='footer-social'>
		<a title='Facebook'  href='{$fb}' ><i class='fa fa-facebook'></i></a>
		<a title='Instagram' href='{$ins}'><i class='fa fa-instagram'></i></a>
		<a title='Twitter' 	 href='{$twi}'><i class='fa fa-twitter'></i></a>
		<a title='Pinterest' href='{$pin}'><i class='fa fa-pinterest'></i></a>
	</div>
	<div class='footer-bar'>
		<a $ftr[0] href='".$links[0]['url']."'>".$links[0]['text']."</a>
		<a $ftr[4] href='".$links[4]['url']."'>".$links[4]['text']."</a>
		<a $ftr[5] href='".$links[5]['url']."'>".$links[5]['text']."</a>
		<a $ftr[6] href='".$links[6]['url']."'>".$links[6]['text']."</a>
		<a $ftr[7] href='".$links[7]['url']."'>".$links[7]['text']."</a>
		<a $ftr[1] href='".$links[1]['url']."'>".$links[1]['text']."</a>
		<a $ftr[2] href='".$links[2]['url']."'>".$links[2]['text']."</a>
		<a $ftr[3] href='".$links[3]['url']."'>".$links[3]['text']."</a>
		<a href='/login'>LOGIN</a>
	</div>
	<img class='footer-logo' src='".host."images/icons/logo.png' alt='' />
	<div class='footer-bottom'><p class='font'>Copyright © 2020 Dr. Sherry Talks, All Rights Reserved.</p></div>
</div></div>";

$footer = "
<div class='footer'>
	<div class='footer-gov'><div class='u-wrap'>
		<img src='".host."images/icons/govph-seal.png' alt=''/>
		<div class='footer-gov-right'>
			<ul> <b>REPUBLIC OF THE PHILIPPINES</b><p>All Content is in the public domain unless otherwise stated.</p> </ul>
			<ul>
				<b>ABOUT GOVPH</b><p>Learn more about the Philippine government, its structure, how government works and the people behind it.</p>
				<li><a href='https://www.gov.ph'>Gov.ph</a></li>
				<li><a href='https://www.gov.ph/data'>Open Data Portal</a></li>
				<li><a href='https://www.officialgazette.gov.ph'>Official Gazette</a></li>
			</ul>
			<ul>
				<b>GOVERNMENT LINKS</b>
				<li><a href='http://president.gov.ph'>Office of the President</a></li>
				<li><a href='http://ovp.gov.ph'>Office of the Vice President</a></li>
				<li><a href='http://www.senate.gov.ph'>Senate of the Philippines</a></li>
				<li><a href='http://www.congress.gov.ph'>House of Representatives</a></li>
				<li><a href='http://sc.judiciary.gov.ph'>Supreme Court</a></li>
				<li><a href='https://ca2.judiciary.gov.ph/caws-war'>Court of Appeals</a></li>
				<li><a href='http://sb.judiciary.gov.ph'>Sandiganbayan</a></li>
			</ul>
		</div>
	</div></div>
	<div class='footer-standard' id='footer'><div class='u-wrap'>
		<p>Copyright &#169; 2019 BRGY. {$brgy}, All Rights Reserved. <a href='#'>Privacy</a> | <a href='#'>Terms</a></p>
	</div></div>
</div>";


$navibar = "
<div class='shrNavbar_fr shr-navbar-fr'>
	<label class='shrNav_cls shr-nav-ryt' for='navibar' ></label>
	<div class='shr-nav-lft'><div class='shr-nav-lft-in'>
		<div class='shr-nav-hdr-fr'>
			<div class='shr-nav-hdr-in'>
				<div class='shr-hdr-logo'><img src='".host."images/icons/logo.png' alt='' /></div>
				<div class='shr-hdr-title' hidden>
					<p>KEEPING UP WITH</p>
					<b>DR. SHERRY</b>
				</div>
			</div>
			<div class='shr-nav-d-f'>
				<a href='{$fb}'><i class='fa fa-facebook'></i></a>
				<a href='<?php echo $ins; ?>'><i class='fa fa-instagram'></i></a>					
				<a href='<?php echo $twi; ?>'><i class='fa fa-twitter'></i></a>
				<a href='<?php echo $pin; ?>'><i class='fa fa-pinterest'></i></a>
			</div>
		</div>
		<div class='shr-navbars-fr'>
			<a class='shrLnk navibar$shr[0]' href='".$links[0]['url']."'><i class='fa fa-home' ></i><b>".$links[0]['text']."</b></a>
			<div class='navibar-spry'>
				<input type='checkbox' id='navibar-spry-chk' class='navibar-spry-chk' hidden />
				<label for='navibar-spry-chk' class='".$shr[1].$shr[2].$shr[3].$shr[4].$shr[5]."'><i class='fa fa-info-circle'></i><b>About</b><u class='fa fa-angle-down'></u></label>
				<ul>
					<a class='$shr[1]' href='".$links[1]['url']."'><li>".$links[1]['text']."</li></a>
					<a class='$shr[2]' href='".$links[2]['url']."'><li>".$links[2]['text']."</li></a>
					<a class='$shr[3]' href='".$links[3]['url']."'><li>".$links[3]['text']."</li></a>
					<a class='$shr[4]' href='".$links[4]['url']."'><li>".$links[4]['text']."</li></a>
					<a class='$shr[5]' href='".$links[5]['url']."'><li>".$links[5]['text']."</li></a>
				</ul>
			</div>
			<div class='navibar-spry'>
				<input type='checkbox' id='navibar-spry2-chk' class='navibar-spry-chk' hidden />
				<label for='navibar-spry2-chk' class='".$shr[6].$shr[7].$shr[8]."'><i class='fa fa-file-text'></i><b>Transparency</b><u class='fa fa-angle-down'></u></label>
				<ul>
					<a class='$shr[6]' href='".$links[6]['url']."'><li>".$links[6]['text']."</li></a>
					<a class='$shr[7]' href='".$links[7]['url']."'><li>".$links[7]['text']."</li></a>
					<a class='$shr[8]' href='".$links[8]['url']."'><li>".$links[8]['text']."</li></a>					
				</ul>
			</div>	
			<div class='navibar-spry'>
				<input type='checkbox' id='navibar-spry3-chk' class='navibar-spry-chk' hidden />
				<label for='navibar-spry3-chk' class='".$shr[9].$shr[10].$shr[11]."'><i class='fa fa-photo'></i><b>News & Media</b><u class='fa fa-angle-down'></u></label>
				<ul>					
					<a class='$shr[9]' href='".$links[9]['url']."'><li>".$links[9]['text']."</li></a>					
					<a class='$shr[10]' href='".$links[10]['url']."'><li>".$links[10]['text']."</li></a>					
					<a class='$shr[11]' href='".$links[11]['url']."'><li>".$links[11]['text']."</li></a>					
				</ul>
			</div>
			<div class='navibar-spry' hidden>
				<input type='checkbox' id='navibar-spry4-chk' class='navibar-spry-chk' hidden />
				<label for='navibar-spry4-chk' class='".$shr[12].$shr[13]."'><i class='fa fa-vcard'></i><b>For Business</b><u class='fa fa-angle-down'></u></label>
				<ul>
					<a class='$shr[12]' href='".$links[12]['url']."'><li>".$links[12]['text']."</li></a>
					<a class='$shr[13]' href='".$links[13]['url']."'><li>".$links[13]['text']."</li></a>					
				</ul>
			</div>		
			<div class='navibar-spry'>
				<input type='checkbox' id='navibar-spry5-chk' class='navibar-spry-chk' hidden />
				<label for='navibar-spry5-chk' class='".$shr[14].$shr[15].$shr[16].$shr[17].$shr[18].$shr[19].$shr[20].$shr[21].$shr[22]."'><i class='fa fa-file-text-o'></i><b>Online Transaction</b><u class='fa fa-angle-down'></u></label>
				<ul>					
					<a class='$shr[22]' href='".$links[22]['url']."'><li>".$links[22]['text']."</li></a>
					<a class='$shr[19]' href='".$links[19]['url']."'><li>".$links[19]['text']."</li></a>
					<a class='$shr[14]' href='".$links[14]['url']."'><li>".$links[14]['text']."</li></a>
					<a class='$shr[15]' href='".$links[15]['url']."'><li>".$links[15]['text']."</li></a>
					<a class='$shr[16]' href='".$links[16]['url']."'><li>".$links[16]['text']."</li></a>
					<a class='$shr[21]' href='".$links[21]['url']."'><li>".$links[21]['text']."</li></a>
					<a class='$shr[17]' href='".$links[17]['url']."'><li>".$links[17]['text']."</li></a>
					<a class='$shr[18]' href='".$links[18]['url']."'><li>".$links[18]['text']."</li></a>
					<a class='$shr[20]' href='".$links[20]['url']."'><li>".$links[20]['text']."</li></a>					
				</ul>
			</div>		
			<a class='shrLnk navibar' href='/login'><i class='fa fa-sign-in'></i><b>LOGIN</b></a>
		</div>
	</div></div>
</div>";

$instagram_post= "
<div class='instag-wrap'>
	<div class='u-wrap font2'>Instagram</div>
	<div class='instag-body'><div class='u-wrap'>
		<div class='instag-images'><div class='instag-images-in'>
			<a href='https://www.instagram.com/p/CEXY2BUDfCs/' target='_blank'><img src='account/files/instagram/1/photo.jpg' alt='' /></a>
			<a href='https://www.instagram.com/p/CEAQrAUDGsO/' target='_blank'><img src='account/files/instagram/2/photo.jpg' alt='' /></a>
			<a href='https://www.instagram.com/p/CD1ls4dDaPR/' target='_blank'><img src='account/files/instagram/3/photo.jpg' alt='' /></a>
			<a href='https://www.instagram.com/p/CDzpKa8jDAJ/' target='_blank'><img src='account/files/instagram/4/photo.jpg' alt='' /></a>
			<a href='https://www.instagram.com/p/CDxphwdDB2R/' target='_blank'><img src='account/files/instagram/5/photo.jpg' alt='' /></a>
		</div></div>
		<div class='instag-follow-btn font'><a href='<?php echo $ins; ?>' target='_blank'>Follow on Instagram</a></div>

	</div></div>
</div>";

?>


