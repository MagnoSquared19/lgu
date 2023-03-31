<?php 

require_once("../../config/settings/settings.php");	

$byte= 8;
$kb= 1021;
$mb= 1048576;
$gb= 1073741824;
$free= number_format((disk_free_space($jroot) / $gb), 2); 
$total= number_format((disk_total_space($jroot) / $gb), 2);

echo $total.(($total>1)?" GB":" MB");
echo "</br>";
echo $free.(($free>1)?" GB":" MB");


?>



