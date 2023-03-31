<?php 
	$protocol = ( (! empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') || (! empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (! empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') )?"https":"http";

	$root = explode("embed", str_replace("\\","/",dirname(__FILE__)))[0];
	$h_dir= str_replace($_SERVER['DOCUMENT_ROOT']."/", "", $root);
	$host = $protocol.'://'.$_SERVER['SERVER_NAME']."/".$h_dir;	

	define('host', $protocol.'://'.$_SERVER['SERVER_NAME']."/".$h_dir);
	define('path', $_SERVER['DOCUMENT_ROOT']."/".$h_dir);

	function random($length=10) 
	{
	   $string = '';
	   $characters = "123456789ABCDEFHJKLMNPRTVWXYZabcdefghijklmnopqrstuvwxyz";
	   for($p = 0; $p < $length; $p++){ $string .= $characters[mt_rand(0, strlen($characters)-1)]; }
	   return $string;
	}

	$dark_mode=""; $zoom_mode=""; $zoom_opt1="";$zoom_opt2="";
	if(session_status() == PHP_SESSION_NONE){ session_start(); }
	if(isset($_SESSION['brgy']['dark']) && $_SESSION['brgy']['dark']=="1"){ $dark_mode='<link rel="stylesheet" type="text/css" href="'.host.'style/dark.css" id="dark_mode" />'; }
	if(isset($_SESSION['brgy']['zoom']))
	{ 
		$zoom_mode='<link rel="stylesheet" type="text/css" href="'.host.'style/zoom.'.$_SESSION['brgy']['zoom'].'.css" id="zoom_mode" />'; 
		if($_SESSION['brgy']['zoom']=="1"){ $zoom_opt1="selected"; }
		if($_SESSION['brgy']['zoom']=="2"){ $zoom_opt2="selected"; }
	}

	$brgy= "Biluso";
	$municipal= "Silang";
	$province = "Cavite";
	$project_title= "Municipality of {$municipal}";	

	$links = array(
		['url'=>'index.php',		 	  'text'=>'Home',					'title'=>$project_title." |  Official Website"],	

		['url'=>'about.php',	 		  'text'=>"About ".$municipal,		'title'=>'About Us | '.$project_title],
		['url'=>'tourism.php',			  'text'=>'Tourism',				'title'=>'Tourism | '.$project_title],
		['url'=>'municipal-officials.php','text'=>'Municipal Officials',	'title'=>'Municipal Officials | '.$project_title],	
		['url'=>'departments.php',		  'text'=>'Deptartment Heads',		'title'=>'Deptartment Heads | '.$project_title],	
		['url'=>'directories.php',		  'text'=>'Barangay Hotlines',		'title'=>'Barangay Hotlines | '.$project_title],	

		['url'=>'oscp.php',		 		'text'=>'OSCP',						'title'=>'OSCP | '.$project_title],
		['url'=>'educ-programs.php',	'text'=>'Educational Programs',		'title'=>'Educational Programs | '.$project_title],
		['url'=>'e-governance.php',		'text'=>'E-Governance',				'title'=>'E-Governance | '.$project_title],
		['url'=>'legislatives.php',		'text'=>'SB Legislative Measures',	'title'=>'SB Legislative Measures | '.$project_title],
		['url'=>'bids-and-award.php',	'text'=>'Bids and Awards',			'title'=>'Bids and Awards | '.$project_title],
		['url'=>'budget-and-finance.php','text'=>'Local / Budget and Finance','title'=>'Local / Budget and Finance | '.$project_title],
		['url'=>'citizens-charter.php',	'text'=>'Citizens Charter',			'title'=>'Citizens Charter | '.$project_title],
		['url'=>'enviro-protection.php','text'=>'Environmental Protection',	'title'=>'Environmental Protection | '.$project_title],
		['url'=>'other-services.php',	'text'=>'Other Services',			'title'=>'Other Services | '.$project_title],
		
		['url'=>'business-hub.php',		'text'=>'Business Hub',				'title'=>'Business Hub | '.$project_title],
		['url'=>'business-requirements.php','text'=>'Requirements',			'title'=>'Requirements | '.$project_title],
		['url'=>'downloadable.php',		'text'=>'Downloadable Forms',		'title'=>'Downloadable Forms | '.$project_title],
		
		['url'=>'press-release.php',	'text'=>'Press Release',			'title'=>'Press Release | '.$project_title],
		['url'=>'events.php',			'text'=>'Events / Activities',		'title'=>'Events / Activities | '.$project_title],
		['url'=>'gallery.php',			'text'=>'Photos / Videos',			'title'=>'Photos / Videos | '.$project_title],

		['url'=>'careers.php',			'text'=>'Careers',					'title'=>'Careers | '.$project_title],

		['url'=>'contacts.php',			'text'=>'Set an Appointment',		'title'=>'Set an Appointment | '.$project_title],
	
	);
	$title= $project_title; $act=[]; $ftr=[]; $shr=[]; //$aNavbar=" actNavbar"; $fNavbar="actFootbar"; $sNavbar=" actNavibar";

	foreach($links as $key => $val)
	{
		if("/".$h_dir.$val['url']==$_SERVER['PHP_SELF'])
		{ 
			$links[$key]['url']="#";  $title=$links[$key]['title'];
			array_push($act, " actNavbar"); array_push($ftr,' class="actFootbar" '); array_push($shr," actNavibar"); 
		}
		else{ $links[$key]['url']= host.$val['url']; array_push($act, "");array_push($ftr, "");array_push($shr, ""); }
	}
	if($_SERVER['REQUEST_URI']=="/"){ $title=$links[0]['title']; $links[0]['url']="#"; }

	$meta_title= ($title==$project_title)?$project_title:$title;

	$meta = "
	<meta property='og:title' content='{$meta_title}'>	
	<meta property='og:image' content='".host."images/icons/logo.png'>
	<meta property='og:description' content='The official Website of {$brgy}, {$municipal}, {$province}.'>
	<meta property='og:url' content='".host."'>

	<meta name='twitter:title' content=' {$meta_title}'>
	<meta name='twitter:description' content=' The official Website of {$brgy}, {$municipal}, {$province}.'>
	<meta name='twitter:image' content=' ".host."images/icons/logo.png'>
	<meta name='twitter:card' content='summary_large_image'>";

	$head_rsc= "<link rel='stylesheet' type='text/css' href='".host."style/fonts.css' />
	<link rel='stylesheet' type='text/css' href='".host."style/font/style.css'/>
	<link rel='stylesheet' type='text/css' href='".host."style/jquery-ui.css'/>	
	<link rel='stylesheet' type='text/css' href='".host."style/theme.1.3.css'/>
    <link rel='stylesheet' type='text/css' href='".host."style/structure.2.7.css'/>	
    {$dark_mode}{$zoom_mode}    
    <script type='text/javascript' src='".host."js/jquery.latest.js' ></script>
	<script type='text/javascript' src='".host."js/jquery.js'	 ></script>	
	<script type='text/javascript' src='".host."js/jquery.ui.js' ></script>
	
	<script type='text/javascript' src='".host."js/global.2.7.js'></script>	
	<script type='text/javascript' src='".host."js/model.1.3.js' ></script>
	<script type='text/javascript' src='".host."embed/model/js/ui.js' ></script>
	";	


	require_once(path."config/model/global_var.php");
	if(isset($gid))
	{
		$tPath= ($kind=="admin")?"account":(($kind=="resident")?"users":"");
		if(isset($profile)){ $profile_img= $profile; }
		$accnt="<div class='navbar'><img src='{$profile_img}' /></div>
				<span><h5></h5>
					<a href='".host.$tPath."/'><i class='fa fa-vcard'></i><p>My Account</p></a>
					<a href='".host."config/model/logout.php' class='headLogout_btn'><i class='fa fa-sign-out'></i><p>Logout</p></a>
				</span>";
	}
	else{ $accnt="<a class='navbar' href='".host."login/' title='Login'><i class='fa fa-user-circle fa-sign-inX'></i></a>"; }

	$header = "
	<div class='navbar-wrap'>
		<a href='https://www.gov.ph' target='_blank' class='navbar b'>GOVPH</a>
		<a class='navbar$act[0]' href='".$links[0]['url']."' >".$links[0]['text']."</a>
		<div class='navbar-spry'>
			<div class='navbar".$act[1].$act[2].$act[3].$act[4].$act[5]."'><p>About</p><u></u></div>
			<span><h5></h5>
				<a class='$act[1]' href='".$links[1]['url']."'>".$links[1]['text']."</a>
				<a class='$act[2]' href='".$links[2]['url']."'>".$links[2]['text']."</a>
				<a class='$act[3]' href='".$links[3]['url']."'>".$links[3]['text']."</a>
				<a class='$act[4]' href='".$links[4]['url']."'>".$links[4]['text']."</a>
				<a class='$act[5]' href='".$links[5]['url']."'>".$links[5]['text']."</a>
			</span>
		</div>
		<div class='navbar-spry'>
			<div class='navbar".$act[6].$act[7].$act[8].$act[9].$act[10].$act[11].$act[12].$act[13].$act[14]."'><p>Government</p><u></u></div>
			<span><h5></h5>
				<a class='$act[6]'  href='".$links[6]['url']."'>".$links[6]['text']."</a>
				<a class='$act[7]'  href='".$links[7]['url']."'>".$links[7]['text']."</a>
				<a class='$act[8]'  href='".$links[8]['url']."'>".$links[8]['text']."</a>
				<a class='$act[9]'  href='".$links[9]['url']."'>".$links[9]['text']."</a>
				<a class='$act[10]' href='".$links[10]['url']."'>".$links[10]['text']."</a>
				<a class='$act[11]' href='".$links[11]['url']."'>".$links[11]['text']."</a>
				<a class='$act[12]' href='".$links[12]['url']."'>".$links[12]['text']."</a>
				<a class='$act[13]' href='".$links[13]['url']."'>".$links[13]['text']."</a>
				<a class='$act[14]' href='".$links[14]['url']."'>".$links[14]['text']."</a>
			</span>
		</div>
		<div class='navbar-spry'>
			<div class='navbar".$act[15].$act[16].$act[17]."'><p>Business</p><u></u></div>
			<span><h5></h5>
				<a class='$act[15]' href='".$links[15]['url']."'>".$links[15]['text']."</a>
				<a class='$act[16]' href='".$links[16]['url']."'>".$links[16]['text']."</a>
				<a class='$act[17]' href='".$links[17]['url']."'>".$links[17]['text']."</a>
			</span>
		</div>

		<div class='navbar-spry'>
			<div class='navbar".$act[18].$act[19].$act[20]."'><p>News & Media</p><u></u></div>
			<span><h5></h5>				
				<a class='$act[18]' href='".$links[18]['url']."'>".$links[18]['text']."</a>
				<a class='$act[19]' href='".$links[19]['url']."'>".$links[19]['text']."</a>
				<a class='$act[20]' href='".$links[20]['url']."'>".$links[20]['text']."</a>
			</span>
		</div>
		
		<div class='navbar-spry'>
			<div class='navbar".$act[21].$act[22]."'><p>Contacts</p><u></u></div>
			<span><h5></h5>	
				<a class='$act[21]' href='".$links[21]['url']."'>".$links[21]['text']."</a>			
				<a class='$act[22]' href='".$links[22]['url']."'>".$links[22]['text']."</a>			
			</span>
		</div>
	</div>
	<div class='search-wrap'>
		<form class='hdrSearch_form' action='".host."search.php'>
			<input type='search' name='value' required placeholder='Search' />
			<a href='#'><i class='fa fa-search'></i></a>
		</form>
		<div class='account-spry'>{$accnt}</div>
		<div class='access-spry'>
			<div class='navbar'><i class='fa fa-universal-access'></i><ins></ins></div>
			<span><h5></h5>
				<a href='#' class='headStatement_btn'><i class='fa fa-file-text-o' ></i><p>Statement</p></a>
				<a href='#' class='headContrast_btn'><i class='fa fa-low-vision'	 ></i><p>Contrast</p></a>
				<a href='#footer' class='headGoBottom_btn'><i class='fa fa-chevron-down'></i><p>Go to Footer</p></a>
				<div class='access-spry-zoom'>
					<p>Zoom</p>
					<select class='navbarZoom_selX headZoom_sel'> 
						<option id='0' selected >100%</option><option id='1' {$zoom_opt1} >125%</option><option id='2' {$zoom_opt2} >150%</option> 
					</select>
				</div>
			</span>
		</div>		
	</div>";	



	//<div class='navbar'><i class='fa fa-user'></i><ins></ins></div>

	$icon = host.'images/favicon.ico'."?".random(6);
	$logo = host.'images/icons/logo.png'."?".random(6);
	$logo2= "
	<div class='logo2-panel'>
		<i></i>
		<div class='logo'><img src='".host."images/icons/logo-2.png"."?".random(6)."' alt='' /></div>
	</div>";	
	$banner_txt="
	<u>Republic of the Philippines</u>				
	<b class='uppercase'>MUNICIPALITY OF {$municipal}</b>
	<p class='u'>PROVINCE OF {$province}</p>
	";

	$fb ="https://www.facebook.com/sangguniang.barangaylangkiwa.9";	
	$ins="#";	
	$twi="#";	
	$pin="#";	

	$weather= '<iframe class="ui-weather" src="https://www.meteoblue.com/en/weather/widget/daily/daraga_philippines_1715507?geoloc=fixed&days=7&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&pictoicon=1&maxtemperature=0&mintemperature=0&windspeed=0&windspeed=1&windgust=0&winddirection=0&uv=0&humidity=0&precipitation=0&precipitationprobability=0&spot=0&pressure=0&layout=light" frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"></iframe>';
	
	$fb_page= '';
	//$fb_page= '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKaibiganniKapOpeng&tabs=timeline&width=350&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=456207141789405" width="350" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>';
	
	
	$primary_color = "<div id='mm'> <p id='a'></p><p id='b'></p><p id='c'></p><p id='d'></p><p id='e'></p><p id='f'></p><p id='g'></p> </div>";

/*
	$subscribe="
	<div class='subscribe'>
		<p class='font'>Subscribe to our newsletter!</p>
		<form>
			<input type='text' required placeholder='Input e-mail address' />
			<button class='button'><i class='fa fa-send'></i></button>
		</form>
	</div>";


	$side_fb_page= "<div class='widget-title'><u></u><p>FOLLOW ON FACEBOOK</p></div><iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKaniguan-Memes-317966909110406%2F&tabs=timeline&width=270&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId' width='100%' height='500' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true' allow='encrypted-media'></iframe>";

	$side_fb_page= "<div class='widget-title'><u></u><p>FOLLOW ON FACEBOOK</p></div><iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDrSherryTalks%2F&tabs=timeline&width=270&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=456207141789405' width='100%' height='245' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true' allow='encrypted-media'></iframe>";
	

	$side_ins= "
	<div class='widget-title'><u></u><p>ON INSTAGRAM</p></div>
	<div class='widget-images'>
		<a href='#'><img src='images/files/pinned/1.jpg' /></a>
		<a href='#'><img src='images/files/pinned/2.jpg' /></a>
		<a href='#'><img src='images/files/pinned/3.jpg' /></a>
		<a href='#'><img src='images/files/pinned/4.jpg' /></a>
		<a href='#'><img src='images/files/pinned/5.jpg' /></a>
		<a href='#'><img src='images/files/pinned/6.jpg' /></a>
		<a href='#'><img src='images/files/pinned/7.jpg' /></a>
		<a href='#'><img src='images/files/pinned/8.jpg' /></a>
	</div>";*/

	/*$logo1= root.'images/icons/logo.png';
	$logo2= root.'images/icons/logo1.png';


http://www.castillasorsogon.gov.ph
http://pasacao.camarinessur.gov.ph/
https://lga.gov.ph/#/public/home/5ecb2a1f1476ab4fe1a75cf1

https://i.gov.ph/policies/signed/memorandum-circular-rules-regulations-migrating-gwhs-dost-ict-office/annex-c-government-website-template-design-gwtd-guidelines/

- Press Release - 
https://xtratheme.com/corporate/

https://www.youtube.com/watch?v=GzCV59lhNro
*/

?>

