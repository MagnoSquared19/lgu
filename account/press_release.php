
<div class="page-loaded"><div class="page-frame" id="pPoster" data-page="0" data-limit="10" data-comment-limit="10" >
<?php 
require_once("../config/model/global_var.php");
$peBtn_p=""; $peBtn_b="";
if($glevel=="1" || $glevel=="2")
{
	$patBtn_p= 'panel2-title-wbtn';
	$patBtn_b= '<div class="panel2-title-btn"><button class="prAdd_btn ui-add-btn"><i class="fa fa-plus-circle"></i><u>Add</u></button></div>';
	echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.press.release.js","a");})();</script>'; 
}
?>

	<div class="panel-left">
		<div class="panel2-title <?php echo $patBtn_p; ?>">
			<div class="panel2-title-val"><b>PRESS RELEASE</b><p> - Press Release Records</p></div>			
			<?php echo $patBtn_b; ?>
		</div>
		<!-- : -->
		<div class="page-menu">
			<div class="page-menu-head">
				<div class="page-menu-head-title"><i class="fa fa-sliders"></i><b>FILTERS</b></div>
				<div class="page-menu-head-burjer">
					<input type="checkbox" id="burjerMenu" class="bMenu_chk page-menu-head-burjer-chk" />
					<label for="burjerMenu" class="bMenu_btn lesFilter_cls page-menu-head-burjer-btn"><u class="burjer-ico-o"></u></label>
					<div class="bMenu_wrap page-menu-head-burjer-wrap2">
						<label for="burjerMenu" class="bMenu_btn page-menu-head-burjer-close"></label>
						<form class="prFilter_form page-menu-head-burjer-panel">
							<b class="page-menu-head-burjer-title">FILTERS</b>
							<div class="page-menu-head-burjer-date">
								<label><input type="radio" name="check-filter" class="lFtr_rad" id="df1" checked /><p>All Records</p></label>
								<label><input type="radio" name="check-filter" class="lFtr_rad" id="df2"/><p>Yesterday</p></label>		
								<label><input type="radio" name="check-filter" class="lFtr_rad" id="df3"/><p>Last 7 Days</p></label>		
								<label><input type="radio" name="check-filter" class="lFtr_rad" id="df4"/><p>Last 2 Weeks</p></label>		
								<label><input type="radio" name="check-filter" class="lFtr_rad" id="df5"/><p>Last 30 Days</p></label>		
								<label><input type="radio" name="check-filter" class="lFtr_rad" id="df6"/><p>Custom Date</p></label>
								<div class="page-menu-head-burjer-date-custom">
									<div class="page-menu-hbd-from"><b>From</b><input type="date" class="lFtrFr_ipt" required disabled /></div>
									<div class="page-menu-hbd-to"  ><b>To</b>  <input type="date" class="lFtrTo_ipt" required disabled /></div>
								</div>								
							</div>
							<div class="page-menu-head-burjer-foot"><button class="bMenu_chdX checkFtr_submit ui-btn-r"><i class="fa fa-filter"></i>Apply</button></div>
							<!-- <div class="page-menu-head-burjer-foot"><a href="#" class="bMenu_chd checkFtr_submit ui-btn-r"><i class="fa fa-filter"></i>Apply</a></div> -->
						</form>
					</div>
				</div>
			</div>
			<div class="page-menu-body">
				<div class="pageItem_cnt page-menu-count"></div>
				<div class="page-menu-filsort">
					<div class="page-menu-search"><div class="panel2-search"> 
						<input type="search" class="pageSearch_ipt" placeholder="Search" /><button class="pageSearch_ico"><i class="fa fa-search"></i></button>
					</div></div>
					<div class="page-menu-sort"> <button class="pageSort_ftr tblRefresh_btnX ui-btn-ipt"><i class="fa fa-sort-alpha-desc fa-sort-alpha-asc"></i></button> </div>
				</div>
			</div>
		</div>
		<div class="m-fr"> <div class="pageFiltered_wrap panel2-filtered"></div><div class="stFiltered_wrap panel2-filtered"></div> </div>
		<!-- : -->
	</div>

	<div class="panel-right"><div class="pagelet-panel-fixed">
		<div class="pagelet-panel">
			<div class="pagelet-header"> <i class="pagelet-header-icon fa fa-calendar"></i><b class="pagelet-header-text">PRESS RELEASE</b> </div>
			<div class="pagelet-body"><div class="pagelet-body-in poster-side-panel">
				<ol class="patUList_panel pagelet-ol"></ol>
			</div></div>
			<div class="patUList_fter pagelet-footer"></div>
		</div>
	</div></div>

	<div class="panel-left"><div class="prPost_panel poster-post-panel"></div></div>


</div></div>

<script class="appScript_" type="text/javascript"> (function(){ loadScript_("model/js/press.release.js"); })(); </script> 

<!-- 

	<div class="panel-right blue" hidden>
		
	</div>	

	

 -->









