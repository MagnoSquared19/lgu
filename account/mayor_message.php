
<div class="page-loaded"><div class="page-frame" id="pPoster" data-page="0" data-limit="10" data-comment-limit="10" >
<?php 
require_once("../config/model/global_var.php");
$peBtn_p=""; $peBtn_b="";
if($glevel=="1" || $glevel=="2")
{
	$peBtn_p= 'panel2-title-wbtn';
	$peBtn_b= '<div class="panel2-title-btn"><button class="mSubAdd_btn ui-add-btn"><i class="fa fa-plus-circle"></i><u>Sub-Message</u></button></div>';
	echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.mayor.message.js","a");})();</script>'; 
}
?>
	<div class="panel-left">
		<div class="panel2-title <?php echo $peBtn_p; ?>">
			<div class="panel2-title-val"><b>MAYOR' S MESSAGE</b><p> - Message from the Mayor</p></div>			
			<?php echo $peBtn_b; ?>
		</div>		
		<div class="m-fr"> <div class="pageFiltered_wrap panel2-filtered"></div><div class="stFiltered_wrap panel2-filtered"></div> </div>
		<!-- : -->
	</div>

	<div class="panel-right"><div class="pagelet-panel-fixed">
		<div class="pagelet-panel">
			<div class="pagelet-header"> <i class="pagelet-header-icon fa fa-file-text-o"></i><b class="pagelet-header-text">SUB MESSAGE</b> </div>
			<div class="pagelet-body"><div class="pagelet-body-in poster-side-panel">
				<ol class="patUEvent_panel pagelet-ol"></ol>
			</div></div>
			<div class="patUEvent_fter pagelet-footer"></div>
		</div>
	</div></div>

	<div class="panel-left">
		<div class="mayorPost_panel poster-post-panel"></div>
		<div class="mayorSubPost_panel poster-post-panel"></div>
	</div>


</div></div>

<script class="appScript_" type="text/javascript"> (function(){ loadScript_("model/js/mayor.message.js"); })(); </script> 

<!-- 

	<div class="panel-right blue" hidden>
		
	</div>	

	

 -->









