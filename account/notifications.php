
<div class="page-loaded"><div class="page-table" id="notifPoster" data-page="0" data-limit="10" data-comment-limit="10" >
<?php 
require_once("../config/model/global_var.php");
$notifBtn_a=""; $notifBtn_b="";
if(intval($glevel)<=2 && $kind=="admin")
{
	$notifBtn_a= 'panel2-title-wbtn';
	$notifBtn_b= '<div class="panel2-title-btn"><button class="notifAdd_btn ui-add-btn"><i class="fa fa-plus-circle"></i><u>Add</u></button></div>';
	echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.notifications.js","a");})();</script>'; 
}
?>

	<div class="panel-left">
		<div class="panel2-title <?php echo $notifBtn_a; ?>">
			<div class="panel2-title-val"><b>NOTIFICATIONS</b><p> - Memorandum and Notifications</p></div>			
			<?php echo $notifBtn_b; ?>
		</div>
	</div>

	<div class="panel-right">
		<div class="notifFilter_wrap pagelet-panel pagelet-search-right">
			<input type="checkbox" id="dPost_ftr" class="pagelet-search-chk" />		
			<div class="pagelet-header"> <i class="fa fa-sliders"></i><b> FILTERS</b></div>
			<div class="pagelet-body"><div class="pagelet-body-in">				
				<div class="pagelet-search"> 
					<input type="search" class="pageSearch_ipt" placeholder="Search" /><button class="pageSearch_ico"><i class="fa fa-search"></i></button>
				</div>	
				<div class="pagelet-search-filter-panel">
					<label class="pagelet-search-filter-cls" for="dPost_ftr"><i class="fa fa-close"></i></label>
					<div class="pagelet-search-filter-panel-in">
						<label><input type="radio" name="check-filter" class="notifSearch_rad" id="nr1" checked >All Records</label>							
						<label><input type="radio" name="check-filter" class="notifSearch_rad" id="nr2" >Yesterday</label>							
						<label><input type="radio" name="check-filter" class="notifSearch_rad" id="nr3" >Last 7 Days</label>							
						<label><input type="radio" name="check-filter" class="notifSearch_rad" id="nr4" >Last Month</label>							
						<label><input type="radio" name="check-filter" class="notifSearch_rad" id="nr5" >Custom Date</label>
						<div class="pagelet-search-filter-date">
							<div class="m-fr"><i>From:</i><input type="date" class="pmSearchFr_ipt" disabled /></div>
							<div class="m-fr"><i>To:  </i><input type="date" class="pmSearchTo_ipt" disabled /></div>
						</div>
						<div class="pagelet-search-filter-submit"><a href="#" class="checkFtr_submit btn-r"><i class="fa fa-filter"></i>Apply</a></div>
					</div>
				</div>
			</div></div>
			<div class="pagelet-footer">
				<div class="notifPostCount_wrap pagelet-search-count"></div><label class="pagelet-search-filter" for="dPost_ftr">Filter</label>
			</div>
		</div>
	</div>

	<div class="panel-left"><div class="notifPost_panel poster-post-panel"></div></div>
</div></div>

<script class="appScript_" type="text/javascript"> (function(){ loadScript_(host+"account/model/js/notifications.js"); })(); </script> 








