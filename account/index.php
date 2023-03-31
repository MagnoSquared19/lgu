<?php require_once("../config/model/validate.php"); require_once("../config/model/glocal_var.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link rel="shortcut icon" type="image/x-icon" href="../images/favicon.ico"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<title><?php echo $Project_title; ?> | Management System</title>

	<link rel="stylesheet" type="text/css" href="../style/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="../style/jquery-ui.css"/>
	<link rel="stylesheet" type="text/css" href="../style/calendar.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.1.3.css"/>
	<link rel="stylesheet" type="text/css" href="../style/theme.2.0.css"/>
	<link rel="stylesheet" type="text/css" href="style/table.1.4.css"/>
	<link rel="stylesheet" type="text/css" href="style/theme.1.4.css"/>	
    <link rel="stylesheet" type="text/css" href="style/structure.2.8.css"/>	
	
	<script type="text/javascript" src="../js/jquery.js" 	></script>	
	<script type="text/javascript" src="../js/jquery.ui.js" ></script>	
	<script type="text/javascript" src="../js/calendar.js" ></script>	
	<script type="text/javascript" src="../js/global.2.7.js"></script>		
	<script type="text/javascript" src="js/global.2.8.js" 	></script>						
	<script type="text/javascript" src="js/model.1.4.js" 	></script>
	
</head>
<body>

<input type="checkbox" id="sbar-w-chk" class="Sidebar_chk"  hidden <?php echo ($sidebar=="1")?"checked":""; ?> />
<input type="checkbox" id="sbar-m-chk" class="SidebarM_chk" hidden />
<div class="sidebar-body"><div class="sidebar-body-in">
	<div class="sidebar">
		<div class="sidebar-hdr">
			<section class="sidebar-head">
				<div class="sidebar-icon"><img src="../images/icons/dashboard.png" /></div>	
				<label for="sbar-w-chk" class="Sidebar_btn sidebar-w-navicon"><span></span></label>
			</section>
			<section>
				<img class="iProfile_pic sidebar-profile" src="../images/files/blank_profile.png" />
				<div class="sidebar-name">Welcome,<b><?php echo $iName; ?></b></div>
			</section>
		</div>
		<menu class="sidebar-menu">
			<?php echo $user_tab; ?>
	        
		    <div class="NavDetails nav-details">
	        	<a class="navbar" id="d1" href="?profile.php#d1">	
	        		<i class="navbar-ico fa fa-user-circle"></i><i class="navbar-txt">Profile</i>
	        	</a>
	        	<div class="SubNbar_fr sub-navbar"><div class="sub-navbar-in">
	        		<span><div><a href="?profile.php#d1" class="Profile_nav navbar">Profile</a></div></span>
	        	</div></div>
	        </div>
	        <div class="NavDetails nav-details">
	        	<a class="navbar" id="d2" href="?faq.php#d2">	
	        		<i class="navbar-ico fa fa-question-circle"></i><i class="navbar-txt">FAQ</i>
	        	</a>
	        	<div class="SubNbar_fr sub-navbar"><div class="sub-navbar-in">
	        		<span><div><a href="?profile.php#d2" class="Profile_nav navbar">FAQ</a></div></span>
	        	</div></div>
	        </div>
	        <div class="NavDetails nav-details">
	        	<a class="logout navbar" href="../config/model/logout.php">	
	        		<i class="navbar-ico fa fa-sign-out"></i><i class="navbar-txt">Logout</i>
	        	</a>
	        	<div class="SubNbar_fr sub-navbar"><div class="sub-navbar-in">
	        		<span><div><a class="logout navbar" href="../config/model/logout.php">Logout</a></div></span>
	        	</div></div>
	        </div>
		    <div class="m-fr" style="height:50px;"></div>
		</menu>
	</div>	
	<label for="sbar-m-chk" class="sidebar-bar"></label>
</div></div>

<div class="page-body"><div class="page-body-in">
	<div class="p-body-hdr">
		<label for="sbar-m-chk" class="sidebar-m-navicon"><span></span></label>
		<div class="p-body-tle"><?php echo $Project_title; ?></div>
		<div class="p-body-ryt">
			<div class="pbHdr_noti p-body-hdr-ico disabled" title="Email (disabled)"	><i class="fa fa-envelope"></i></div>
			<div class="pbHdr_msg  p-body-hdr-ico disabled" title="Message (disabled)"	><i class="fa fa-comments"></i></div>			
			
			<input type="checkbox" id="p-body-acct-chk" class="p-body-acct-chk" hidden />
			<div class="p-body-acct">
				<label class="p-body-acct-w" for="p-body-acct-chk">
					<img class="iProfile_pic" src="../images/files/blank_profile.png" /><p><?php echo $iName; ?></p>
				</label>
				<label class="p-body-acct-fr" for="p-body-acct-chk">
					<div class="p-body-acct-in">
						<div class="p-b-acct-ra">
							<img class="iProfile_pic" src="../images/files/blank_profile.png" />
							<div class="p-b-acct-name"><?php echo $iName; ?></div>
							<div class="p-b-acct-lbl"><?php echo $iPos; ?></div>
						</div>
						<div class="p-b-acct-rb">
							<a href="?profile.php#n2" class="btn">Profile</a>
							<a href="../config/model/logout.php" class="btn-r">Logout</a>
						</div>
					</div>
				</label>			
			</div>			
		</div>
	</div>

	<div class="pageLoaded p-body-panel">
<noscript class="NoScript">
<?php $qStr=explode("&", $_SERVER["QUERY_STRING"]); if($qStr[0]!="" || $qStr[0]!=null){require_once((substr($qStr[0], -4)==".php")?$qStr[0]:$qStr[0].".php");} ?>
</noscript>		
	</div>	

</div></div>

<?php

setActivePage($_SERVER["QUERY_STRING"]);
function setActivePage($page_arg)
{	
    if($page_arg=="" || $page_arg==null){ $page_arg="?dashboard.php"; }    
    echo "<script class='indSetActive' type='text/javascript'>$(document).ready(function(e){ setActivePage('".$page_arg."'); });</script>"; 
}

?>

<?php
function add($a,$b)
{
  $c=$a+$b;
  return $c;
}
?>

<script>
function phpadd() {
  var phpadd= '<?php echo add(5,2); ?>' //call the php add function
  alert(phpadd); // result in undefined
}
</script>


</body>
</html>