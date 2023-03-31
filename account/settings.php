
<div class="page-loaded"><div class="page-frame">
	
	<div class="s-ol-price"><div class="pagelet-panel">
		<div class="pagelet-header"><b>Online Transaction Price</b></div>
		<div class="pagelet-body"><div class="pagelet-body-in">
			<div class="s-ol-price-item"><p>Business Clearance</p><b class="bcPrice_val">0.00</b></div>
			<div class="s-ol-price-item"><p>Building Permit</p><b class="crPrice_val">0.00</b></div>
			<div class="s-ol-price-item"><p>Marriage Certificate</p><b class="ciPrice_val">0.00</b></div>
			<div class="s-ol-price-item"><p>Birth Certificate</p><b class="bc1Price_val">0.00</b></div>
			<div class="s-ol-price-item"><p>Death Certificate</p><b class="bc2Price_val">0.00</b></div>
		</div></div>
		<div class="pagelet-footer"><div class="pagelet-footer-button">
			<button class="sOlpEdt_btn ui-btn"><i class="fa fa-pencil"></i> Update</button>
		</div></div>
	</div></div>


	<?php
	require_once("../config/model/global_var.php");

	if(intval($glevel)==1)
	{	
		echo '
		<form class="sImport_form s-ol-import"><div class="pagelet-panel">
			<div class="pagelet-header"><b>Import Household</b></div>
			<div class="pagelet-body"><div class="pagelet-body-in">
				<input type="file" name="import_file" id="import_file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required />
			</div></div>
			<div class="pagelet-footer"><div class="pagelet-footer-button">
				<button class="sImport_btn ui-btn"><i class="fa fa-upload"></i> Import</button>
			</div></div>
		</div></form>';
	}
	?>
	

</div></div>


<?php 
if(intval($glevel)<=2){ echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.settings.js","a");})();</script>'; }
require_once("embed/page_footer.php");
?>	
	






