<?php require_once("../config/model/global_var.php"); ?>
<div class="plDashboard dashboard-panel page-loaded"><div class="page-frame">


<?php
	if($kind=="admin")
	{  
		echo '
		<div class="Dashboard_ico wrap">
			<div class="dash-l-widget">
				<div class="l2-left"><div class="dash-entity-2 dash-entity-members">
					<a href="?online_registration.php" title="Pending Application"><i class="fa fa-user-o"></i></a><h3 class="dashReg_pending" title="Pending Application">.</h3>
					<span> <p>Total Registered: </p><b class="dashMem_cnt">...</b> </span>
				</div></div>
				<div class="l2-right">
					<div class="dash-entity dash-entity-logbook">
						<a class="Page_lnk" href="?log_book.php"><i class="fa fa-folder-open-o"></i><p>Projects</p></a><b class="dashProj_cnt">.</b>
					</div>
				</div>
			</div>
			<div class="dash-r-widget">
				<div class="l2-left"><div class="dash-entity-2 dash-entity-members">
					<a href="?municipal_council.php" title="Councils"><i class="fa fa-university"></i></a><h3 class="dashCouncil_cnt" title="Councils">.</h3>
					<span> <p>Total Chapters: </p><b class="dashChapter_cnt">...</b> </span>
				</div></div>
				<div class="l2-right">
					<div class="dashStorage_wrap dash-storage">
						<i class="fa fa-database"></i>
						<h3 class="dashStorage_total">...</h3>
						<span> <p>Available: </p><b class="dashStorage_free">...</b> </span>
					</div>
				</div>
			</div>
		</div>';
	}	
?>

	<div class="wrap">
		<div class="dashCalender_frame l2-left" hidden>
			<div class="pagelet-panel">		
				<div class="pagelet-header"><b>Event Calendar</b>
					<a href="#" class="dCalRefresh_btn d-refresh-ico"><i class="fa fa-refresh"></i></a>
				</div>	
				<div class="pagelet-body"><div class="pagelet-body-in">
					<div class="dashCalender_wrap dash-calendar" id="calendar"></div>
				</div></div>
			</div>
		</div>
		<div class="l2-right">
			<div class="dNoticePanel d-notice-panel pagelet-panel" data-page="1" data-limit="5">		
				<div class="pagelet-header"><b>Notice Board</b><a href="#" class="dNoticeRefresh_btn d-refresh-ico"><i class="fa fa-refresh"></i></a></div>	
				<div class="d-notice-body pagelet-body"><div class="dNotice_wrap pagelet-body-in"></div></div>
			</div>
		</div>
	</div>
</div></div>


<?php require_once("embed/page_footer.php"); ?>
<script class="appScript_" type="text/javascript"> (function(){ loadScript_(host+"account/model/js/dashboard.js"); })(); </script> 




