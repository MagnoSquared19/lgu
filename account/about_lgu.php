
<div class="page-loaded"><div class="page-frame" id="pPoster" data-page="0" data-limit="10" data-comment-limit="10" >
<?php 
require_once("../config/model/global_var.php");
require_once("../config/model/glocal_var.php");
$peBtn_p=""; $peBtn_b="";
if($glevel=="1" || $glevel=="2")
{
	$patBtn_p= 'panel2-title-wbtn';
	$patBtn_b= '<div class="panel2-title-btn"><button class="adAdd_btn ui-add-btn"><i class="fa fa-plus-circle"></i><u>Add</u></button></div>';
	echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.about.barangay.js","a");})();</script>'; 
}
?>

	<div class="panel-left">
		<div class="panel2-title <?php echo $patBtn_p; ?>">
			<div class="panel2-title-val">
				<b class="uppercase">ABOUT <?php echo $municipal; ?></b>
				<p> - Informations About <?php echo $municipal; ?></p>
			</div>			
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
					<div class="page-menu-search"><div class="panel2-search"> 
						<input type="search" class="pageSearch_ipt" placeholder="Search" /><button class="pageSearch_ico"><i class="fa fa-search"></i></button>
					</div></div>
					<div class="page-menu-sort"> <button class="pageSort_ftr pageAsc ui-btn-ipt"><i class="fa fa-sort-alpha-asc"></i></button> </div>
				</div>
			</div>
		</div>
		<div class="m-fr"> <div class="pageFiltered_wrap panel2-filtered"></div><div class="stFiltered_wrap panel2-filtered"></div> </div>
		<!-- : -->
	</div>

	<div class="panel-right"><div class="pagelet-panel-fixed">
		<div class="pagelet-panel">
			<div class="pagelet-header"> <i class="pagelet-header-icon fa fa-file-text-o"></i><b class="pagelet-header-text uppercase">ABOUT <?php echo $municipal; ?></b> </div>
			<div class="pagelet-body"><div class="pagelet-body-in poster-side-panel">
				<ol class="patUEvent_panel pagelet-ol"></ol>
			</div></div>
			<div class="patUEvent_fter pagelet-footer"></div>
		</div>
	</div></div>

	<div class="panel-left"><div class="adPost_panel poster-post-panel"></div></div>


</div></div>

<script class="appScript_" type="text/javascript"> (function(){ loadScript_("model/js/about.barangay.js"); })(); </script> 

<!-- 

	<div class="panel-right blue" hidden>
		
	</div>	

	

 -->









