<?php

//require_once($_SERVER['DOCUMENT_ROOT']."/config/model/glocal_var.php");

$v_root= explode("config", str_replace("\\","/",dirname(__FILE__)))[0];
require_once($v_root."config/model/glocal_var.php");

if(session_status() == PHP_SESSION_NONE){session_start();}
if(!isset($_SESSION['lgu']['id']))
{
	echo '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<link rel="shortcut icon" type="image/x-icon" href="'.$host.'images/favicon.ico"/>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
		<title>Restricted Page | Redirecting to Login</title>
		<link rel="stylesheet" type="text/css" href="'.$host.'style/theme.1.3.css"/>	
		<link rel="stylesheet" type="text/css" href="'.$host.'account/style/theme.1.4.css"/>			
	</head>
	<body class="body">
	<div class="logout-body">
		<div class="logout-fr">
			<div class="restriction-ico"></div>
			<div class="logout-txt">Session Expired! <br/> Please re-login to renew your SESSION.</div>
			<div hidden class="logout-txt">Restriction! You have been Logged Out. Please Login to continue.</div>
		</div>
	</div>
	</body>
	</html>';

	header("refresh:1; url=".$host."login/");
	die();	
}
else
{
    /*$k= $_SESSION['lgu']['kind'];
    $c_page= str_replace($v_root, '', str_replace('\\', '/', getcwd()));
    if($k=="admin")         { $panel= "account"; }
    else if($k=="employee") { $panel= "employee";}
    else if($k=="client")   { $panel= "client";  }
    if($c_page != $panel){ ?>  <meta http-equiv='refresh' content='0;url=../<?php echo $panel;?>/' />   <?php exit(); }*/
	
	$dashboard="
    <div class='NavDetails nav-details'>
    	<a class='reload navbar' id='d10' href='?dashboard.php#d10'>	
    		<i class='navbar-ico fa fa-dashboard'></i><i class='navbar-txt'>Dashboard</i>
    	</a>
    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
    		<span><div><a href='?dashboard.php#d10' class='reload navbar'>Dashboard</a></div></span>
    	</div></div>
    </div>";

 //    $notification="
	// <div class='NavDetails nav-details'>
 //    	<a class='reload navbar' id='d13' href='?notifications.php#d13'>	
 //    		<i class='navbar-ico fa fa-bell'></i><i class='navbar-txt'>Notifications</i>
 //    	</a>
 //    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
 //    		<span><div><a href='?notifications.php#d13' class='reload navbar'>Notifications</a></div></span>
 //    	</div></div>
 //    </div>";

 //    $event="
 //    <div class='NavDetails nav-details'>
 //    	<a class='reload navbar' id='d14' href='?events.php#d14'>	
 //    		<i class='navbar-ico fa fa-calendar'></i><i class='navbar-txt'>Events</i>
 //    	</a>
 //    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
 //    		<span><div><a href='?events.php#d14' class='reload navbar'>Events</a></div></span>
 //    	</div></div>
 //    </div>";

    // $chat="
    // <div class='NavDetails nav-details'>
    // 	<a class='reload navbar' id='d15' href='?chat.php#d15'>	
    // 		<i class='navbar-ico fa fa-comments'></i><i class='navbar-txt'>Chat</i>
    // 	</a>
    // 	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
    // 		<span><div><a href='?chat.php#d15' class='reload navbar'>Chat</a></div></span>
    // 	</div></div>
    // </div>";

    $projects="
    <div class='NavDetails nav-details'>
    	<a class='reload navbar' id='d15' href='?projects.php#n4'>	
    		<i class='navbar-ico fa fa-folder-open-o'></i><i class='navbar-txt'>Projects</i>
    	</a>
    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
    		<span><div><a href='?projects.php#n4' class='reload navbar'>Projects</a></div></span>
    	</div></div>
    </div>";

    $online_application="
    <div class='olTrans_wrap NavDetails nav-details'>
    	<a class='c1_lnk navbar' id='n5' href='?online_application.php#n5'>	
    		<i class='navbar-ico fa fa-user-o'></i><i class='navbar-txt'>Online Application</i>
    	</a>
    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
    		<span><div><a href='?online_application.php#n5' class='navbar'>Online Application</a></div></span>
    	</div></div>
    </div>";

    $clients="
    <div class='NavDetails nav-details'>
    	<a class='navbar' id='n6' href='?clients.php#n6'>	
    		<i class='navbar-ico fa fa-address-card'></i><i class='navbar-txt'>Members</i>
    	</a>
    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
    		<span><div><a href='?clients.php#n6' class='navbar'>Members</a></div></span>
    	</div></div>
    </div>"; 

    $employees="
    <div class='NavDetails nav-details'>
    	<a class='navbar' id='n7' href='?employees.php#n6'>	
    		<i class='navbar-ico fa fa-address-card'></i><i class='navbar-txt'>Employees</i>
    	</a>
    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
    		<span><div><a href='?employees.php#n7' class='navbar'>Employees</a></div></span>
    	</div></div>
    </div>";  
   

    $users="
    <div class='NavDetails nav-details'>
    	<a class='navbar' id='a1' href='?users.php#a1'>	
    		<i class='navbar-ico fa fa-users'></i><i class='navbar-txt'>Manage Users</i>
    	</a>
    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
    		<span><div><a href='?users.php#a1' class='navbar'>Manage Users</a></div></span>
    	</div></div>
    </div>";


    function setSubTab($p,$t)
	{   //"<a class='navbar' id='n22' href='?admission_registrar.php#n22'   >Admission</a>",
		$tabs=[
	    '0'=>['fa-info-circle','About Us',[
            "<a class='navbar capitalize' id='n19' href='?about_lgu.php#n19'>About Silang</a>",
            "<a class='navbar' id='n20' href='?tourism.php#n20'>Tourism</a>",
            "<a class='navbar' id='n21' href='?mun_officials.php#n21'>Municipal Officials</a>",
            "<a class='navbar' id='n22' href='?departments.php#n22'>Departments</a>",
            "<a class='navbar' id='n23' href='?directory.php#n23'>Directory</a>"
			 ]],
        '1'=>['fa-handshake-o','Government',[
            "<a class='navbar' id='n49' href='?oscp.php#n49'>OSCP</a>",
            "<a class='navbar' id='n50' href='?educ_programs.php#n50'>Educational Programs</a>",
            "<a class='navbar' id='n51' href='?e_governance.php#n51'>E-Governance</a>",
            "<a class='navbar' id='n52' href='?legislatives.php#n52'>SB Legislative Measures</a>",
            "<a class='navbar' id='n53' href='?items_to_bid.php#n53'>Items To Bid</a>",
            "<a class='navbar' id='n54' href='?bid_results.php#n54'>Bid Results</a>",
            "<a class='navbar' id='n55' href='?bid_supplement.php#n55'>Bid Supplement</a>",
            "<a class='navbar' id='n56' href='?local_budget_and_finance.php#n56'>Local Budget & Finance</a>",
            "<a class='navbar' id='n57' href='?citizens_charter.php#n57'>Citizens Charter</a>",
            "<a class='navbar' id='n58' href='?enviro_protection.php#n58'>Environmental Protection</a>",
            "<a class='navbar' id='n59' href='?other_services.php#n59'>Other Services</a>"
             ]],
        '2'=>['fa-building','For Business',[
            "<a class='navbar' id='n60' href='?business_portal.php#n60'>Business Portal</a>",
            "<a class='navbar' id='n61' href='?business_requirements.php#n61'>Requirements</a>",
            "<a class='navbar' id='n62' href='?downloadables.php#n62'>Downloadables</a>"
             ]],
        '3'=>['fa-calendar','Events & Notification',[
                "<a class='navbar' id='n70' href='?breaking_news.php#n70'>Breaking News</a>",
                "<a class='navbar' id='n71' href='?press_release.php#n71'>Press Release</a>",
                "<a class='navbar' id='n72' href='?events.php#n72'       >Events</a>",
                "<a class='navbar' id='n73' href='?notifications.php#n73' >Notifications</a>"
             ]],
        '4'=>['fa-picture-o','Photos / Videos',[
                "<a class='navbar' id='n80' href='?album.php#n80'>Album</a>",
                "<a class='navbar' id='n81' href='?gallery.php#n81'>Gallery</a>",
                "<a class='navbar' id='n82' href='?flash_banner.php#n82'    >Banner</a>"
             ]],
	    '5'=>['fa-users','Accounts',[
                "<a class='navbar' id='n90' href='?clients.php#n90'>Clients</a>",
                "<a class='navbar' id='n91' href='?employees.php#n91'>Employees</a>",
                "<a class='navbar' id='n92' href='?users.php#n92'    >Users</a>"
	    	 ]],	    
	    ]; 

	    $lnk="";
		for($i=0;$i<count($t);$i++){ $lnk .= $tabs[$p][2][$t[$i]]; }

	    $rtn="
	    <div class='NavDetails nav-details'>
	    	<input type='checkbox' id='snav{$p}' class='navSub_chk nav-chk' hidden/>
	    	<label tabindex='0' for='snav{$p}' class='navbarLbl navbar-lbl'>
	            <i class='navbar-ico fa {$tabs[$p][0]}'></i><i class='navbar-txt'>{$tabs[$p][1]}</i><i class='navbar-dwn fa fa-angle-down'></i>
	        </label>
	    	<div class='SubNbar_fr sub-navbar'><div class='sub-navbar-in'>
	    		<span><div>{$lnk}</div></span>	
	    	</div></div>		    	
	    </div>";

	    return $rtn;
	}


	$user_tab="";

	$user_tab.= $dashboard;
	// $user_tab.= $projects;
	// $user_tab.= $online_application;
	
	$user_tab.= setSubTab("0",[0,1,2,3,4]);
    $user_tab.= setSubTab("1",[0,1,2,3,4,5,6,7,8,9,10]);
    $user_tab.= setSubTab("2",[0,1,2]);
    $user_tab.= setSubTab("3",[0,1,2,3]);
    $user_tab.= setSubTab("4",[0,1,2]);
    $user_tab.= setSubTab("5",[0,1,2]);


}


?>