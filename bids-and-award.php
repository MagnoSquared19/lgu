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
	<script type='text/javascript' src='embed/model/js/transparency.js' ></script>	

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
			<h1>BIDS AND AWARDS</h1>
			<span>
				<a href="/" class="lnk">HOME <i class="fa fa-chevron-right"></i></a>
				<b>BIDS AND AWARDS</b>
			</span>
		</div>		
	</div>
</div></div>

<div class="section">

<div class="b-header">
	<b>BIDS AND AWARDS</b>
	<div class="b-header-filter">
		<p>Filter</p>
		<select class="bBids_ftr"><option value="1">ITEMS TO BID</option><option value="2">BID RESULTS</option><option value="3">BID SUPPLEMENT</option></select>
	</div>
</div>
<!-- Table -->
<div class="tableIBids_wrap table-wrap" data-page="1" >
	<div class="tbl-head">
		<div class="tbl-title"><i class="fa fa-file"></i><p>ITEMS TO BID</p></div>
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
				<div class="tblHdr tbl-th-name" data-sort="0"> <p>Contract Name</p><u></u> </div>
				<div class="tbl-body c">
					<div class="tblHdr tbl-th b-itb-a" data-sort="1"><p>Ref. No.</p><u></u></div>
					<div class="tblHdr tbl-th b-itb-b" data-sort="2"><p>ABC</p><u></u></div>
					<div class="tblHdr tbl-th b-itb-c" data-sort="3"><p>Acceptance</p><u></u></div>
					<div class="tblHdr tbl-th b-itb-d" data-sort="4"><p>Pre-BID</p><u></u></div>
					<div class="tblHdr tbl-th b-itb-e" data-sort="5"><p>Opening</p><u></u></div>
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
<!-- : -->
<div class="tableRBids_wrap table-wrap" data-page="1" >
	<div class="tbl-head">
		<div class="tbl-title"><i class="fa fa-file"></i><p>BID RESULTS</p></div>
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
				<div class="tblHdr tbl-th-name" data-sort="0"> <p>Contract Name</p><u></u> </div>
				<div class="tbl-body c">
					<div class="tblHdr tbl-th b-br-a" data-sort="1"><p>Ref. No.</p><u></u></div>
					<div class="tblHdr tbl-th b-br-b" data-sort="2"><p>Amount</p><u></u></div>
					<div class="tblHdr tbl-th b-br-c" data-sort="3"><p>Award Date</p><u></u></div>
					<div class="tblHdr tbl-th b-br-d" data-sort="4"><p>Proc. Date</p><u></u></div>
					<div class="tblHdr tbl-th b-br-e" data-sort="5"><p>R.F.A.</p><u></u></div>
					<div class="tblHdr tbl-th b-br-f" data-sort="6"><p>Award To</p><u></u></div>
				</div>						
			</div>
		</div>
		<div class="tblBody tbody"></div>			
	</div>
	<div class="tfooter">
		<div class="tbl-paginate paginate-no-button">
			<span class="tblPaginate_val"></span>
			<div class="tblPaginate_links tbl-paginate-links" hidden >
				<a href="#" class="tblFirst_btn disabled" ><i class="fa fa-angle-double-left"></i></a><a href="#" class="tblPrev_btn  disabled" ><i class="fa fa-angle-left"></i></a>
				<div class="tblPaginate_seal tbl-paginate-link-seal"></div>
				<a href="#" class="tblNext_btn disabled" ><i class="fa fa-angle-right"></i></a><a href="#" class="tblLast_btn disabled" ><i class="fa fa-angle-double-right"></i></a>
			</div>
		</div>
	</div>
</div>
<!-- : -->
<div class="tableSBids_wrap table-wrap" data-page="1" >
	<div class="tbl-head">
		<div class="tbl-title"><i class="fa fa-file"></i><p>BID SUPPLEMENT</p></div>
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
				<div class="tblHdr tbl-th-name" data-sort="0"> <p>Project Name</p><u></u> </div>
				<div class="tbl-body c">
					<div class="tblHdr tbl-th b-bs-a" data-sort="1"><p>Bulletin No.</p><u></u></div>
					<div class="tblHdr tbl-th b-bs-b" data-sort="2"><p>Date</p><u></u></div>
					<div class="tblHdr tbl-th b-bs-c" data-sort="3"><p>Particulars</p><u></u></div>
					<div class="tblHdr tbl-th b-bs-d" data-sort="4"><p>Changes</p><u></u></div>
				</div>						
			</div>
		</div>
		<div class="tblBody tbody"></div>			
	</div>
	<div class="tfooter">
		<div class="tbl-paginate paginate-no-button">
			<span class="tblPaginate_val"></span>
			<div class="tblPaginate_links tbl-paginate-links" hidden >
				<a href="#" class="tblFirst_btn disabled" ><i class="fa fa-angle-double-left"></i></a><a href="#" class="tblPrev_btn  disabled" ><i class="fa fa-angle-left"></i></a>
				<div class="tblPaginate_seal tbl-paginate-link-seal"></div>
				<a href="#" class="tblNext_btn disabled" ><i class="fa fa-angle-right"></i></a><a href="#" class="tblLast_btn disabled" ><i class="fa fa-angle-double-right"></i></a>
			</div>
		</div>
	</div>
</div>
<!-- Table end -->
</div>




<?php require_once('embed/footer.php'); echo $footer;   ?>
</div>
<?php echo $navibar; ?>


</body>
</html>