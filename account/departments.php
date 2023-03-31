<?php require_once("../config/model/global_var.php"); ?>

<div class="tblFilter_wrap page-loaded">
	<div class="page-panel"><div class="page-table" >
	<div class="tblAct_ftr t-active-ftr"><div class="tblActFtr_in t-active-ftr-in"></div></div>
	<div class="dTable t-frame" id="dTable" >
		<div class="t-body">
			<div class="t-header">
				<div class="t-title" > <i class="fa fa-sitemap"></i><p class="table-title">Departments</p> </div>
				<div class="t-navbars">
					<input type="checkbox" class="t-sch-chk" id="t-sch-chk" hidden />
					<div class="t-search-fr">
						<label for="t-sch-chk" class="t-search-cls fa fa-angle-right" ></label>
						<i class="tblSearch_ico t-search-ico search-ico"></i><input type="search" class="tblSearch t-search" placeholder="Search" />
					</div>							
					<div class="t-navbar-fr">
						<label for="t-sch-chk" class="t-search-ico-m search-ico"></label>
						<div tabindex="0" class="tblRefresh_btn t-hdr-nav" title="Refresh"><i class="fa fa-refresh"></i></div>								
						<select tabindex="0" class="tblNumRows_sel t-hdr-sel" title="No. of Rows">
							<option id="1">10</option>
							<option id="2">15</option>
							<option id="3">25</option>
							<option id="4" selected>50</option>
							<option id="5">100</option>
						</select>
					</div>							
				</div>
			</div>
			<div class="t-head">
				<div class="t-cola">
					<div class="t-col-qty" > <div class="t-h-val"></div> </div>
					<div class="t-col-name" title="Department Name"> <div d-sort="0" class="tblHdr t-h-val">Name</div><u class="t-h-ico"></u> </div>
				</div>
				<div class="t-colb">
					<div class="t-col  dep-a" title="Department Head"><div d-sort="1" class="tblHdr t-h-val">Head</div><u class="t-h-ico"></u> </div>
					<div class="t-col  dep-b" title="Contact No."	 ><div d-sort="2" class="tblHdr t-h-val">Contact No.</div><u class="t-h-ico"></u> </div>
					<div class="t-colz dep-c" title="Office Address" ><div d-sort="3" class="tblHdr t-h-val">Office Address</div><u class="t-h-ico"></u> </div>
				</div>
			</div>

			<div class="tblBody tbl-body"></div>

		</div>
		<input type="checkbox" class="t-f-nav-chk" id="t-m-nav" hidden />
		<div class="t-footer">
			<div class="tblFilter_cnt t-paginate" data-page="1" >
				<button disabled class="tblPrev_btn t-p-btn"><i class="fa fa-angle-left" ></i></button>
				<button disabled class="tblNext_btn t-p-btn"><i class="fa fa-angle-right"></i></button>	
				<div class="t-paginate-val">
					<div class="tblCount_fr t-pagi-cnt">
						<div class="tblRowStart t-pagi-sta">0</div><div class="tblRowEnd t-pagi-end">0</div>
					</div>
					<div class="tblResult_total t-pagi-total">0</div>
				</div>	
			</div>
			<!-- Admin Level -->
			<div class="t-f-navbars">
			<?php 
			$tblMAdd_btn=""; $tblMNavi_btn="";
			if($glevel=="1" || $glevel=="2")
			{
				echo '
				<button class="depAdd_btn t-btn"><i class="fa fa-plus-circle"></i>Add</button>
				<button class="depEdt_btn t-btn aTbl_btn" disabled ><i class="fa fa-pencil"></i>Edit</button>
				<button class="depDel_btn t-btn aTbl_btn" disabled ><i class="fa fa-trash"></i>Delete</button>
				';
				$tblMAdd_btn = '<div class="depAdd_btn t-m-navbar"><i class="fa fa-plus-circle"></i>Add New Record</div>';
				$tblMNavi_btn='
				<input type="checkbox" class="tblNav_chk t-f-nava-chk" id="t-m-nava" hidden />
				<label for="t-m-nava" class="t-f-m-nava">
					<div class="t-m-nava-fr">
						<div class="depEdt_btn aTbl_btn t-m-navbar"><i class="fa fa-pencil"></i>Edit Record</div>
						<div class="depDel_btn aTbl_btn t-m-navbar"><i class="fa fa-trash" ></i>Delete Record</div>
					</div>
				</label>
				';
				echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.department.js","a");})();</script>';
			}
			?>				
			</div>
			<!-- Admin Level -->
			<label for="t-m-nav" class="t-f-nav"><span></span></label>					
		</div>
		<label for="t-m-nav" class="t-f-m-nav">
			<div class="t-m-nav-fr">
				<?php echo $tblMAdd_btn; ?>
				<div class="tblNumRows_btn t-m-navbar"><i class="fa fa-sort-numeric-asc" ></i>No. of Rows</div>
				<div class="tblRefresh_btn t-m-navbar"><i class="fa fa-refresh"	></i>Refresh</div>
			</div>
		</label>
		<?php echo $tblMNavi_btn; ?>
	</div>
	</div></div>
</div>


<?php require_once("embed/page_footer.php"); ?>
<script class="appScript_" type="text/javascript"> (function(){ loadScript_("model/js/department.js"); })(); </script> 




