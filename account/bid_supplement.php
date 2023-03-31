<?php require_once("../config/model/global_var.php"); ?>

<div class="tblFilter_wrap page-loaded">
	<div class="page-panel"><div class="page-table" >
	<div class="tblAct_ftr t-active-ftr"><div class="tblActFtr_in t-active-ftr-in"></div></div>
	<div class="dTable t-frame" id="dTable" >
		<div class="t-body">
			<div class="t-header">
				<div class="t-title" > <i class="fa fa-file"></i><p class="table-title">BID Supplement</p> </div>
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
						<label hiddenX tabindex="0" for="t-ftr-chk" class="t-hdr-navicon" title="Show Filters"><i></i></label>
						<input type="checkbox" class="t-ftr-chk" id="t-ftr-chk" hidden />
						<label for="t-ftr-chk" class="t-ftr-panel-bg"></label>
						<div class="t-ftr-panel" >
							<div class="t-ftr-panel-in" >
								<input type="date" id="tblFr_ipt" class="tblFtr_change tblFr_ipt t-ftr-from" data-default="" data-label="From: " value="" required placeholder />
								<input type="date" id="tblTo_ipt" class="tblFtr_change tblTo_ipt t-ftr-to"   data-default="" data-label="To: " 	 value="" required placeholder />
							</div>
						</div>
					</div>							
				</div>
			</div>
			<div class="t-head">
				<div class="t-cola">
					<div class="t-col-qty" > <div class="t-h-val"></div> </div>
					<div class="t-col-name" title="Project Name"> <div d-sort="0" class="tblHdr t-h-val">Project Name</div><u class="t-h-ico"></u> </div>
				</div>
				<div class="t-colb">
					<div class="t-col  bs-a" title="Bid Bulletin No."> <div d-sort="1" class="tblHdr t-h-val c">Bulletin No.</div><u class="t-h-ico"></u> </div>
					<div class="t-col  bs-b" title="Date">		 <div d-sort="2" class="tblHdr t-h-val">Date</div><u class="t-h-ico"></u> </div>
					<div class="t-col  bs-c" title="Particulars"><div d-sort="3" class="tblHdr t-h-val">Particulars</div><u class="t-h-ico"></u> </div>
					<div class="t-colz bs-d" title="Changes">	 <div d-sort="4" class="tblHdr t-h-val">Changes</div><u class="t-h-ico"></u> </div>
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
				<button class="bsAdd_btn t-btn"><i class="fa fa-plus-circle"></i>Add</button>
				<button class="bsEdt_btn t-btn aTbl_btn" disabled ><i class="fa fa-pencil"></i>Edit</button>
				<button class="bsDel_btn t-btn aTbl_btn" disabled ><i class="fa fa-trash"></i>Delete</button>
				';
				$tblMAdd_btn = '<div class="bsAdd_btn t-m-navbar"><i class="fa fa-plus-circle"></i>Add New Record</div>';
				$tblMNavi_btn='
				<input type="checkbox" class="tblNav_chk t-f-nava-chk" id="t-m-nava" hidden />
				<label for="t-m-nava" class="t-f-m-nava">
					<div class="t-m-nava-fr">
						<div class="bsEdt_btn aTbl_btn t-m-navbar"><i class="fa fa-pencil"></i>Edit Record</div>
						<div class="bsDel_btn aTbl_btn t-m-navbar"><i class="fa fa-trash" ></i>Delete Record</div>
					</div>
				</label>
				';
				echo '<script class="appAScript_">(function(){loadScript_("model/js/admin/adm.bid.supplement.js","a");})();</script>';
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
<script class="appScript_" type="text/javascript"> (function(){ loadScript_("model/js/bid.supplement.js"); })(); </script> 




