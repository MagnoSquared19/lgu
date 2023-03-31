
<div class="page-loaded"><div class="page-frame" id="pPoster" data-page="0" data-limit="13" data-comment-limit="10" >
<?php 
require_once("../config/model/global_var.php");
$peBtn_p=""; $peBtn_b="";
if($glevel=="1" || $glevel=="2")
{
	$patBtn_p= 'panel2-title-wbtn';
	$patBtn_b= '<div class="panel2-title-btn"><button class="lbfAdd_btn ui-add-btn"><i class="fa fa-plus-circle"></i><u>Add</u></button></div>';
	echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.local.budget.js","a");})();</script>'; 
}
?>

	<div class="panel-left">
		<div class="panel2-title <?php echo $patBtn_p; ?>">
			<div class="panel2-title-val"><b>LOCAL BUDGET & FINANCE</b><p> - Local Budget and Finance</p></div>			
			<?php echo $patBtn_b; ?>
		</div>
		<!-- : -->
		<div class="page-menu">
			<div class="page-menu-head">
				<div class="page-menu-head-title"><i class="fa fa-sliders"></i><b>FILTERS</b></div>				
			</div>
			<div class="page-menu-body">
				<div class="pageItem_cnt page-menu-count"></div>
				<div class="page-menu-filsort">
					<div class="page-menu-search lbf-search-sel"><div class="panel2-search"> 
						<input type="search" class="pageSearch_ipt" placeholder="Search" /><button class="pageSearch_ico"><i class="fa fa-search"></i></button>
					</div></div>
					<select class="lbfYear_ftr lbf-year-sel" data-default="<?php echo date('Y'); ?>">
						<option value="2020" selected>2020</option>
						<option value="2019">2019</option>						
					</select>
					<div class="page-menu-sort"> <button class="pageSort_ftr ui-btn-ipt"><i class="fa fa-sort-alpha-desc fa-sort-alpha-asc"></i></button> </div>					
				</div>
			</div>
		</div>
		<div class="m-fr"> <div class="pageFiltered_wrap panel2-filtered"></div><div class="stFiltered_wrap panel2-filtered"></div> </div>
		<!-- : -->
	</div>

	<div class="panel-right"><div class="pagelet-panel-fixed">
		<div class="pagelet-panel">
			<div class="pagelet-header"> <i class="pagelet-header-icon fa fa-calendar"></i><b class="pagelet-header-text">ACTIVITIES</b> </div>
			<div class="pagelet-body"><div class="pagelet-body-in poster-side-panel">
				<ol class="patUList_panel pagelet-ol"></ol>
			</div></div>
			<div class="patUList_fter pagelet-footer"></div>
		</div>
	</div></div>

	<div class="panel-left"><div class="lbfPost_panel poster-post-panel"></div></div>


</div></div>

<script class="appScript_" type="text/javascript"> (function(){ loadScript_("model/js/local.budget.js"); })(); </script> 

<!-- 

	<div class="panel-right blue" hidden>
		
	</div>	

	

 -->









