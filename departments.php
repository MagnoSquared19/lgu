<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php require_once("embed/header.php"); ?>
	<title><?php echo $title; ?></title>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo $icon; ?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<?php echo $head_rsc; ?>
	<link rel='stylesheet' type='text/css' href='style/table.1.3.css' />
	<script type='text/javascript' src='js/table.2.1.js' ></script>		
	<script type='text/javascript' src='embed/model/js/about.js' ></script>	

</head>
<body>

<input type="checkbox" id="navibar" class="NaviBar_chk navibar-chk" hidden />
<div class="header"><div class="u-wrap">
	<label class="shrMenu_btn shr-menu-btn" for="navibar"><span></span><b><?php echo $municipal; ?></b></label>
	<?php echo $header; ?>
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
			<h1>DEPARTMENTS</h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>DEPARTMENTS</b>
			</span>
		</div>		
	</div>
</div></div>

<div class="section">
	<div class="l-wrap">
		<div class="tableDept_wrap table-wrap" data-page="1" >
			<div class="tbl-head">
				<div class="tbl-title"><i class="fa fa-sitemap"></i><p>DEPARTMENTS</p></div>
				<div class="tbl-filter">
					<div class="tbl-search">
						<input type="search" class="tblSearch_ipt" placeholder="Search"/><button class="tblSearch_btn"><i class="fa fa-search"></i></button>
					</div>
					<button class="tblRefresh_btn tbl-refresh"><i class="fa fa-refresh"></i></button>
					<select class="tblRows_sel tbl-rows-count" title="No. of Rows">
						<option id="1">10</option><option id="2" selected>15</option><option id="3">25</option><option id="4">50</option><option id="5">100</option>
					</select>
				</div>		
			</div>
			<div class="table">
				<div class="thead b">
					<div class="tbl-tr">
						<div class="tbl-th-li"></div>
						<div class="tblHdr tbl-th-name" data-sort="0"> <p>Department</p><u></u> </div>
						<div class="tbl-body c">
							<div class="tblHdr tbl-th dir-a" data-sort="1"><p>Head</p><u></u></div>
							<div class="tblHdr tbl-th dir-b" data-sort="2"><p>Phone Number</p><u></u></div>
							<div class="tblHdr tbl-th dir-c" data-sort="3"><p>Office</p><u></u></div>
						</div>						
					</div>
				</div>
				<div class="tblBody tbody"></div>			
			</div>
			<div class="tfooter">
				<div class="tbl-paginate paginate-no-button">
					<span class="tblPaginate_val"></span>
					<div class="tblPaginate_links tbl-paginate-links" hidden>
						<a href="#" class="tblFirst_btn disabled" ><i class="fa fa-angle-double-left"></i></a><a href="#" class="tblPrev_btn  disabled" ><i class="fa fa-angle-left"></i></a>
						<div class="tblPaginate_seal tbl-paginate-link-seal"></div>
						<a href="#" class="tblNext_btn disabled" ><i class="fa fa-angle-right"></i></a><a href="#" class="tblLast_btn disabled" ><i class="fa fa-angle-double-right"></i></a>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="r-wrap">
		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>EVENTS / ACTIVITIES</p></div>
			<div class="eventsBody_wrap widget-post"></div>			
		</div></div>
		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>PRESS RELEASE</p></div>
			<div class="pressBody_wrap widget-post"></div>			
		</div></div>

		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>FOLLOW ON FACEBOOK</p></div>
			<?php echo $fb_page; ?>				
		</div></div>
		<div class="pagelet-panel"><div class="pagelet-body-in">
			<div class="widget-title"><u></u><p>ON INSTAGRAM</p></div>			
		</div></div>
	</div>
</div>



<script type="text/javascript">
$(document).ready(function(e){ pageMayor_exec(); pageSubMayor_exec(); });
</script>

<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>



</body>
</html>