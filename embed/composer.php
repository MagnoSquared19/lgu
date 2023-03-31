

<style type="text/css">


	.navbar{float:left;width:auto;height:auto;margin:0px 1px;	padding:10px 15px;				}
		.navbar:hover,
		.navbarAct, .navbarAct:hover, .navbarAct:focus
		{background-color:#eee;		}


	.f-navbar{display:inline-block;width:auto;height:auto;margin:0px 1px; padding:5px 10px;	border-radius:3px;	background-color:#ccc;		}
		.f-navbar:hover,
		.fNavbarAct, .fNavbarAct:hover, .fNavbarAct:active
		{	background-color:orange;		}


.shrbar{display:none;position:fixed;height:100%; width:300px;	top:0px;bottom:0px;	background-color:#17253a;		}
	.navibar{float:left;height:auto;width:80%;	padding:10px 10%;	border-bottom:1px solid #ccc;	color:#eee;	background-color:rgba(0,0,0,.2);		}
	.navibar:hover,
	.naviAct, .naviAct:hover, .naviAct:active
	{background-color:rgba(0,0,0,.6);}

@media screen and (max-width:800px)
{ 
	.shrbar{display:block;		}
}

</style>






<?php 

	$lnks = array(
		'index.php'		=>array("Home",	"HOME"), 
		'about.php'		=>array("About Us","ABOUT US"), 
		'contacts.php'	=>array("Contact Us","CONTACT US"),
	);
	$aNavbar="navbarAct"; $fNavbar="fNavbarAct"; $sNavbar="naviAct";





	$title=""; $lnk_i=0; $act=[]; $ftr=[]; $shr=[]; $nme=[]; $lnk=array_keys($lnks);		
	foreach($lnks as $key => $val)
	{ 

		if($key==basename($_SERVER['PHP_SELF']))
		{ 
			$title=$val[0];	$lnk[$lnk_i]="#"; 
			array_push($act, $aNavbar); array_push($ftr, $fNavbar); array_push($shr, $sNavbar);
		}
		else{ array_push($act, "");array_push($ftr, "");array_push($shr, ""); }
		array_push($nme, $val[1]);
		$lnk_i += 1;
	}


	$header = "
		<div class='p-fr orange' style='padding-top:10px;padding-bottom:10px; color:white;' >
			<a href='$lnk[0]' class='navbar $act[0]' >$nme[0]</a>
			<a href='$lnk[1]' class='navbar $act[1]' >$nme[1]</a>
			<a href='$lnk[2]' class='navbar $act[2]' >$nme[2]</a>
		</div>";

	$footer = "
		<div class='p-fr c' style='padding-top:10px;padding-bottom:10px; color:white;	background-color:#242424;' >
			<a href='$lnk[0]' class='f-navbar $ftr[0]' >$nme[0]</a>
			<a href='$lnk[1]' class='f-navbar $ftr[1]' >$nme[1]</a>
			<a href='$lnk[2]' class='f-navbar $ftr[2]' >$nme[2]</a>
		</div>
	";

	$navibar = "
		<div class='shrbar' >
			<div class='m-fr' style='height:150px;border-bottom:1px solid #ccc;	'></div>
			<a href='$lnk[0]' class='navibar $shr[0]' >$nme[0]</a>
			<a href='$lnk[1]' class='navibar $shr[1]' >$nme[1]</a>
			<a href='$lnk[2]' class='navibar $shr[2]' >$nme[2]</a>
		</div>
	";


?>














