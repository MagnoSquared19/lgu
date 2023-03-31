
<div class="page-loaded">
<?php 
require_once("../config/model/global_var.php");
$galBtn_p=""; $galBtn_b="";
if($glevel=="1" || $glevel=="2")
{
	$galBtn_p= 'panel2-title-wbtn';
	$galBtn_b= '<button class="galAdd_btn ui-add-btn" title="Add Photos / Videos"><i class="fa fa-camera"></i><u>Add Photo</u></button>';
	echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.gallery.js","a");})();</script>';  
}
?>

	<div class="page-in-hdr gal-head <?php echo $galBtn_p; ?>">		
		<b class="panel2-title-val">Gallery</b>
		<?php echo $galBtn_b; ?>
	</div>
	<div class="page-in-bdy"><div class='photoGallery_body page-frame'>
		<div class="photoGallery_wrap gallery-wrap"></div>
	</div></div>	

	<!-- 
	<div class="page-in-bdy"><div class='page-frame'>
		<div class="photoGallery_body gallery-wrap"></div>
	</div></div>
	 -->

</div>

<script class="appScript_" type="text/javascript"> (function(){ loadScript_("model/js/gallery.js"); })(); </script> 
<?php require_once("embed/page_footer.php"); ?>





