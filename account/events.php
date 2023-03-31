
<div class="page-loaded"><div class="page-frame" id="pPoster" data-page="0" data-limit="10" data-comment-limit="10" >
<?php 
require_once("../config/model/global_var.php");
$peBtn_p=""; $peBtn_b="";
if(intval($glevel)<=2 && $kind=="admin")
{
	$peBtn_p= 'panel2-title-wbtn';
	$peBtn_b= '<div class="panel2-title-btn"><button class="evAdd_btn ui-add-btn"><i class="fa fa-plus-circle"></i><u>Add</u></button></div>';
	echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.events.js","a");})();</script>'; 
}
?>

	<div class="panel-left">
		<div class="panel2-title <?php echo $peBtn_p; ?>">
			<div class="panel2-title-val"><b>CALENDAR OF EVENTS</b><p> - Upcoming and Previous Events</p></div>			
			<?php echo $peBtn_b; ?>
		</div>
		<div class="pagelet-panel">
			<div class="pagelet-header mpc"><i class="fa fa-sliders"></i><b>FILTERS</b> </div>
			<div class="pagelet-body-in">
				<div class="pagelet-left-search"><div class="panel2-search"> 
					<input type="search" class="patSearch_iptX pageSearch_ipt tblSearchX" placeholder="Search" /><button class="pageSearch_ico"><i class="fa fa-search"></i></button>
				</div></div>
				<div class="pagelet-left-search-cat">
					<p>Category : </p>
					<select class="pageFilter_sel">
						<option id="0">All Events</option><option id="1" selected>Upcomming</option><option id="2">Previous</option>
					</select>
				</div>
			</div>			
		</div>
		<div class="patFiltered_wrap panel2-filtered"></div>
	</div>

	<div class="panel-right">
		<div class="pagelet-panel">
			<div class="pagelet-header"> <i class="pagelet-header-icon fa fa-calendar-plus-o"></i><b class="pagelet-header-text">UPCOMING EVENTS</b> </div>
			<div class="pagelet-body"><div class="pagelet-body-in poster-side-panel">
				<ol class="evUList_panel pagelet-ol"></ol>
			</div></div>
			<div class="evUList_fter pagelet-footer"></div>
		</div>
		<div class="pagelet-panel">
			<div class="pagelet-header"> <i class="pagelet-header-icon fa fa-calendar-minus-o"></i><b class="pagelet-header-text">PREVIOUS EVENTS</b> </div>
			<div class="pagelet-body"><div class="pagelet-body-in poster-side-panel">
				<ol class="evPList_panel pagelet-ol"></ol>
			</div></div>
			<div class="evPList_fter pagelet-footer"></div>
		</div>
	</div>

	<div class="panel-left"><div class="evPost_panel poster-post-panel"></div></div>


</div></div>
<?php require_once("embed/page_footer.php"); ?>
<script class="appScript_" type="text/javascript"> (function(){ loadScript_(host+"account/model/js/events.js"); })(); </script> 

<!-- 

	<div class="panel-right blue" hidden>
		
	</div>	

	

 -->









