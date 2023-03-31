

var pPreBid_pan="", pBidResult_pan="", pageBidSupp_pan="", pageResolution_pan=""; 
$(document).ready(function(e)
{
	if($(".pageLocalBudget_wrap").length){ pageReq_exec(); }

	if($(".tableIBids_wrap").length){ pPreBid_pan=$(".tableIBids_wrap"); install_table(pPreBid_pan,pagePreBid_exec); }
	if($(".tableRBids_wrap").length){ pBidResult_pan=$(".tableRBids_wrap"); install_table(pBidResult_pan,pageBidResult_exec); }
	if($(".tableSBids_wrap").length){ pBidSupp_pan=$(".tableSBids_wrap"); install_table(pBidSupp_pan,pageBidSupp_exec); }
	
	if($(".tableResolution_wrap").length){ pageResolution_pan=$(".tableResolution_wrap"); install_table(pageResolution_pan,pageResolution_exec); pageResolution_exec(); }
	$(".tblStatus_sel").change(function(e){  table_reset(pageResolution_pan,pageResolution_exec); });


	if($(".bBids_ftr").length)
	{
		setBids_display($(".bBids_ftr").val());
		$(".bBids_ftr").change(function(e){ setBids_display($(".bBids_ftr").val()); });
	}
	
	//getTransSummary();
});

var res_bool=true;
function pageResolution_exec()
{	
	if(pageResolution_pan.length && (res_bool==true))
	{
		res_bool=false;	var isEmpty = true;
		$.post('embed/model/table.transparency.php',{token:"0",fb:"27",valid:"20",like:pageResolution_pan.find(".tblSearch_ipt").val(),sort:table_sort(pageResolution_pan),page:table_pager(pageResolution_pan),status:$(".tblStatus_sel").val()},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false;
					var tmpStatus= (v.status=="2")?"Pending":((v.status=="1")?"Approved":"");
					var tPostResult =''+
					'<div class="tblResult_wrap tbl-tr" id="tblDir'+v.id+'" data-token="'+v.itoken+'" >'+
						'<input type="checkbox" id="dirChk'+v.id+'" class="tbl-chk" />'+
						'<div class="tbl-li"><div class="tbl-val">'+(table_ind(pageResolution_pan) + i)+'</div></div>'+
						'<div class="tbl-name"><label for="dirChk'+v.id+'" class="trTitle_btn tr-title tbl-val"><p>'+v.title+'</p><u></u></label></div>'+
						'<div class="tbl-body">'+
							'<div class="tbl-td tr-a"><div class="tbl-val break-word c"><b class="tbl-caption">Res. No.: </b>'+v.no_+'</div></div>'+
							'<div class="tbl-td tr-b"><div class="tbl-val break-word c"><b class="tbl-caption">Sessions: </b>'+toThousand(v.num)+'</div></div>'+
							'<div class="tbl-td tr-c"><div class="tbl-val break-word c"><b class="tbl-caption">Files Attached: </b>'+toThousand(v.file_count)+'</div></div>'+
							'<div class="tbl-td tr-d"><div class="tbl-val break-word"><b class="tbl-caption">Date Filed: </b>'+v.filed_+'</div></div>'+
							'<div class="tbl-td tr-e"><div class="tbl-val break-word"><b class="tbl-caption">Date Approved: </b>'+v.approved_+'</div></div>'+
							'<div class="tbl-td tr-f"><div class="tbl-val break-word"><b class="tbl-caption">Status: </b>'+tmpStatus+'</div></div>'+
							'<div class="tbl-td tr-g"><div class="tbl-val break-word"><b class="tbl-caption">Description: </b>'+v.description+'</div></div>'+
							'<div class="tbl-td tr-h"><div class="tbl-val"><a href="#" class="trView_lnk tr-view-lnk">View</a></div></div>'+
						'</div>'+						
					'</div>'; 
					pageResolution_pan.find(".tblBody").append(tPostResult);
				}
				if(v.count){ table_paginator({panel:pageResolution_pan,exec:pageResolution_exec,count:v.count,limit:v.limit,page:v.page,links:v.page_link}); }
			});
		},"json").done(function(e)
		{
			if(isEmpty){ pageResolution_pan.find(".tblBody").append("<div class='tbl-no-record'>No Record Found</div>"); }
			res_bool=true;	pageResolution_pan.find(".tblBody .Loading_ico").remove();
			global_events();

			$(".trView_lnk").unbind("click").click(function(e){ getTransSummary($(this)); });

		}).fail(function(xhr, status, err){ res_bool=true; pageResolution_pan.find(".tblBody .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		pageResolution_pan.find(".tblBody").empty().append(loading_bars);
	}
}

function getTransSummary(a)
{
	//alert(a.parents(".tblResult_wrap").attr("data-token"));
	//alert(a.parents(".tblResult_wrap").attr("id"));
	var tmp_form = ''+
	'<div class="pPanel_bg pop-bg"><form class="pPanel popup-panel draggable" autocomplete="off">'+
		'<div class="popup-panel-header"> <b>SUMMARY</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
		'<div class="popPanel_wrap popup-panel-wrap">'+			
			'<div class="popup-panel-body">'+
				'<div class="m-fr"><i class="ipt-lbl">Title</i><input type="text" name="title" required placeholder="Title" /></div>'+
				'<div class="m-fr">'+
					'<div class="ipt-tri">'+
						'<div class="l40-fr"><i class="ipt-lbl">No.</i><input type="number" name="no_" class="c" placeholder="0" min="0" max="10000" /></div>'+
						'<div class="r60-fr"><i class="ipt-lbl">Status</i>'+
							'<select name="status" class="option_invalid has_invalid"><option id="0" value="">Select</option><option id="2" value="2">Pending</option><option id="1" value="1">Approved</option> </select>'+
						'</div>'+
					'</div>'+
					'<div class="ipt-tri-m"><i class="ipt-lbl">Filed</i><input type="date" name="filed" placeholder="" /></div>'+
					'<div class="ipt-tri"  ><i class="ipt-lbl">Approved</i><input type="date" name="approved" placeholder="" /></div>'+
				'</div>'+
				'<div class="t-dvr"></div>'+
				'<div class="m-fr"> <i class="ipt-lbl">Description</i><textarea placeholder="Description" rows="5" name="desc"></textarea> </div>'+	
				'<div class="trFile_wrap wrap rpt-update-img-wrap"></div>'+	
				'<input type="file" name="admFile[]" class="trFile_ipt" hidden accept="image/*,application/pdf" multiple capture="camera" />'+
				'<div class="trSession_wrap wrap"></div>'+	
			'</div>'+
			'<div class="popFooter popup-panel-footer">'+				
				'<button class="pPanel_cls button-r"><i class="fa fa-close"></i>Close</button>'+
			'</div>'+
		'</div>'+
	'</form></div>';
	$("body").append(tmp_form);

	$.post('embed/model/table.transparency.php',{token:"0",itoken:a.parents(".tblResult_wrap").attr("data-token"),id:a.parents(".tblResult_wrap").attr("id"),fb:"27",valid:"20-2"},function(json, status, xhr)
	{
		$.each(json,function(i, v)
		{												
			if(v.id)
			{
				$(".pPanel input[name='no_']").val(v.no_);
				$(".pPanel input[name='title']").val(v.title);
				$(".pPanel input[name='filed']").val(v.filed);
				$(".pPanel input[name='approved']").val(v.approved);
				$(".pPanel select[name='status']").val(v.status).change();
				$(".pPanel textarea[name='desc']").val(v.description);						
			}
			if(v.files)
			{
				$.each(v.files ,function(ind,val)
				{					
					if(val.index)
					{
						var tPmExt= val.ext.toLowerCase(), tPmSrc="", tPmLnk="";							
						if(tPmExt=="pdf"){ tPmSrc="../images/icons/pdf.png"; tPmLnk='<a href="'+val.src+'" target="_blank" class="mf-g-photo-name-lnk">'+val.name+'</a>'; }
						if(Image_arr.includes(val.ext.toLowerCase())){ tPmSrc=val.src; tPmLnk='<a href="'+val.src+'" target="_blank" class="mf-g-photo-name-lnk">'+val.name+'</a>'; }
						$(".trFile_wrap").append('<span class="mFiles_fr mf-g-photo" title="'+val.name+'" > <img src="'+tPmSrc+'" /> <div class="mf-g-photo-in">	<div class="admFilesDel_btn mf-g-photo-del" data-file="'+val.src+'" title="Click to remove"><i class="fa fa-close"></i></div> </div> '+tPmLnk+' </span>'); //<p>'+tPmLnk+'</p>
					}
				});	
			}
			if(v.session)
			{
				$.each(v.session ,function(ind,val)
				{					
					if(val.id)
					{
						var tmpSession = ''+
						'<div class="tr-s-row">'+
							'<div class="wrap b u">'+val.title+'</div>'+
							'<div class="wrap">'+dateToString(val.dated)+'</div>'+
							'<div class="wrap"><br/>'+val.description+'</div>'+
						'</div>';
						$(".trSession_wrap").append(tmpSession);
					}
				});	
			}
		}); 
	},"json").done(function(xhr, status, err)
	{
		loading_("unload"), show2_(".pPanel_bg", ".pPanel", {focus:((device() == "pc")?".pPanel input[name='name']":"")});		

	}).fail(function(xhr, status, err){ loading_("unload"); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	loading_();
}

function setBids_display(a)
{
	$(".tableIBids_wrap, .tableRBids_wrap, .tableSBids_wrap").hide();
	if(a=="1"){ $(".tableIBids_wrap").show(); table_reset(pPreBid_pan,pagePreBid_exec); }
	else if(a=="2"){ $(".tableRBids_wrap").show(); table_reset(pBidResult_pan,pageBidResult_exec); }
	else if(a=="3"){ $(".tableSBids_wrap").show(); table_reset(pBidSupp_pan,pageBidSupp_exec); }
}




var pBids_bool=true;
function pagePreBid_exec()
{	
	if(pPreBid_pan.length && (pBids_bool==true))
	{
		pBids_bool=false;
		$.post('embed/model/table.transparency.php',{token:"0",fb:"27",valid:"10-0",like:pPreBid_pan.find(".tblSearch_ipt").val(),sort:table_sort(pPreBid_pan),page:table_pager(pPreBid_pan)},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false;
					var tPostResult =''+
					'<div class="tbl-tr" id="tblDir'+v.id+'">'+
						'<input type="checkbox" id="dirChk'+v.id+'" class="tbl-chk" />'+
						'<div class="tbl-li"><div class="tbl-val">'+(table_ind(pPreBid_pan) + i)+'</div></div>'+
						'<div class="tbl-name"><label for="dirChk'+v.id+'" class="tbl-val"><p>'+v.name+'</p><u></u></label></div>'+
						'<div class="tbl-body">'+
							'<div class="tbl-td b-itb-a"><div class="tbl-val break-word c"><b class="tbl-caption">Ref. No.: </b>'+v.ref_no+'</div></div>'+
							'<div class="tbl-td b-itb-b"><div class="tbl-val break-word txt-rp"><b class="tbl-caption">ABC: </b>'+toDecimal(v.abc)+'</div></div>'+
							'<div class="tbl-td b-itb-c"><div class="tbl-val break-word c"><b class="tbl-caption">Acceptance: </b>'+toDate(v.acceptance_fr)+'</div></div>'+
							'<div class="tbl-td b-itb-d"><div class="tbl-val break-word c"><b class="tbl-caption">Pre-BID: </b>'+toDate(v.pre_bid)+'</div></div>'+
							'<div class="tbl-td b-itb-e"><div class="tbl-val break-word c"><b class="tbl-caption">Opening: </b>'+toDate(v.opening)+'</div></div>'+
						'</div>'+						
					'</div>'; 
					pPreBid_pan.find(".tblBody").append(tPostResult);
				}
				if(v.count){ table_paginator({panel:pPreBid_pan,exec:pagePreBid_exec,count:v.count,limit:v.limit,page:v.page,links:v.page_link}); }
			});
		},"json").done(function(e)
		{
			pBids_bool=true;	pPreBid_pan.find(".tblBody .Loading_ico").remove();
			global_events();

		}).fail(function(xhr, status, err){ pBids_bool=true; pPreBid_pan.find(".tblBody .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		pPreBid_pan.find(".tblBody").empty().append(loading_bars);
	}
}

var pRBid_bool=true;
function pageBidResult_exec()
{
	if(pBidResult_pan.length && (pRBid_bool==true))
	{
		pRBid_bool=false;
		$.post('embed/model/table.transparency.php',{token:"0",fb:"27",valid:"11-0",like:pBidResult_pan.find(".tblSearch_ipt").val(),sort:table_sort(pBidResult_pan),page:table_pager(pBidResult_pan)},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false;
					var tPostResult =''+
					'<div class="tbl-tr" id="tblDir'+v.id+'">'+
						'<input type="checkbox" id="dirChk'+v.id+'" class="tbl-chk" />'+
						'<div class="tbl-li"><div class="tbl-val">'+(table_ind(pBidResult_pan) + i)+'</div></div>'+
						'<div class="tbl-name"><label for="dirChk'+v.id+'" class="tbl-val"><p>'+v.name+'</p><u></u></label></div>'+
						'<div class="tbl-body">'+
							'<div class="tbl-td b-br-a"><div class="tbl-val break-word c"><b class="tbl-caption">Ref. No.: </b>'+v.ref_no+'</div></div>'+
							'<div class="tbl-td b-br-b"><div class="tbl-val break-word txt-rp"><b class="tbl-caption">Amount: </b>'+toDecimal(v.amount)+'</div></div>'+
							'<div class="tbl-td b-br-c"><div class="tbl-val break-word c"><b class="tbl-caption">Award Date: </b>'+toDate(v.award)+'</div></div>'+
							'<div class="tbl-td b-br-d"><div class="tbl-val break-word c"><b class="tbl-caption">Proc. Date: </b>'+toDate(v.proceed)+'</div></div>'+
							'<div class="tbl-td b-br-e"><div class="tbl-val break-word c"><b class="tbl-caption">R.F.A.: </b>'+v.reason+'</div></div>'+
							'<div class="tbl-td b-br-f"><div class="tbl-val break-word"><b class="tbl-caption">Awarded To: </b>'+v.awarded_to+'</div></div>'+
						'</div>'+						
					'</div>'; 
					pBidResult_pan.find(".tblBody").append(tPostResult);
				}
				if(v.count){ table_paginator({panel:pBidResult_pan,exec:pageBidResult_exec,count:v.count,limit:v.limit,page:v.page,links:v.page_link}); }
			});
		},"json").done(function(e)
		{
			pRBid_bool=true;	pBidResult_pan.find(".tblBody .Loading_ico").remove();
			global_events();

		}).fail(function(xhr, status, err){ pRBid_bool=true; pBidResult_pan.find(".tblBody .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		pBidResult_pan.find(".tblBody").empty().append(loading_bars);
	}
}

var pSBids_bool=true;
function pageBidSupp_exec()
{	
	if(pBidSupp_pan.length && (pSBids_bool==true))
	{
		pSBids_bool=false;
		$.post('embed/model/table.transparency.php',{token:"0",fb:"27",valid:"12-0",like:pBidSupp_pan.find(".tblSearch_ipt").val(),sort:table_sort(pBidSupp_pan),page:table_pager(pBidSupp_pan)},function(json, status, xhr)
		{
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					isEmpty = false;
					var tPostResult =''+
					'<div class="tbl-tr" id="tblDir'+v.id+'">'+
						'<input type="checkbox" id="dirChk'+v.id+'" class="tbl-chk" />'+
						'<div class="tbl-li"><div class="tbl-val">'+(table_ind(pBidSupp_pan) + i)+'</div></div>'+
						'<div class="tbl-name"><label for="dirChk'+v.id+'" class="tbl-val"><p>'+v.name+'</p><u></u></label></div>'+
						'<div class="tbl-body">'+
							'<div class="tbl-td b-bs-a"><div class="tbl-val break-word c"><b class="tbl-caption">Bulleting No.: </b>'+v.bulletin_no+'</div></div>'+
							'<div class="tbl-td b-bs-b"><div class="tbl-val break-word c"><b class="tbl-caption">Date: </b>'+toDate(v.dated)+'</div></div>'+
							'<div class="tbl-td b-bs-c"><div class="tbl-val break-word"><b class="tbl-caption">Particulars: </b>'+v.particulars+'</div></div>'+
							'<div class="tbl-td b-bs-d"><div class="tbl-val break-word"><b class="tbl-caption">Changes: </b>'+v.changes+'</div></div>'+
						'</div>'+						
					'</div>'; 
					pBidSupp_pan.find(".tblBody").append(tPostResult);
				}
				if(v.count){ table_paginator({panel:pBidSupp_pan,exec:pageBidSupp_exec,count:v.count,limit:v.limit,page:v.page,links:v.page_link}); }
			});
		},"json").done(function(e)
		{
			pSBids_bool=true;	pBidSupp_pan.find(".tblBody .Loading_ico").remove();
			global_events();

		}).fail(function(xhr, status, err){ pSBids_bool=true; pBidSupp_pan.find(".tblBody .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
		pBidSupp_pan.find(".tblBody").empty().append(loading_bars);
	}
}

function pageReq_exec()
{ 
	$.post('embed/model/table.transparency.php',{token:"0",fb:"27",valid:"10",uLike:"",sort:""},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				isEmpty = false;
				var tPostResult =''+
				'<div class="pagelet-post" id="reqPost'+v.id+'"><div class="page-load-pagelet-in">'+
					'<div class="pagelet-body-in" >'+
						'<div class="page-load-title">'+((v.title)?'<p>'+v.title+'</p>':'')+'</div>'+
						'<pre class="page-load-pagelet-body rich-paragraph">'+v.description+'</pre>'+
						'<ol  class="PostPdf_wrap poster-post-pdf" hidden></ol>'+
						'<div class="PostImage_wrap pagelet-body-photos" hidden><div class="Odeum"></div></div>'+
						'<div class="PostSub_wrap lb-sub-wrap"></div>'+
					'</div>'+
				'</div></div>'; 
				$(".pageLocalBudget_wrap").append(tPostResult);
				jGallery_items(v.files,"#reqPost"+v.id);

				$.each(v.sub,function(ii,vv)
				{						
					if(vv.id)
					{
						var tPostSub= ''+
						'<div class="lb-sub-item" id="reqSub'+vv.id+'">'+
							'<b>'+vv.title+'</b><ol class="PostPdf_wrap poster-post-pdf"></ol>'+
						'</div>';
						$("#reqPost"+v.id).find(".PostSub_wrap").append(tPostSub);
						jGallery_items(vv.files,"#reqSub"+vv.id);
					}
				});
			}
		});
	},"json").done(function(e)
	{
		$(".pageLocalBudget_wrap .Loading_ico").remove(); if(isEmpty){ $(".pageLocalBudget_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }
		$(".GalImage_item").imgPreload(); $(".GalVideo_item").imgPreload();
		$(".Gallery_item").unbind("click").click(function(e){ e.preventDefault(); jGallary_exe(".PostImage_wrap", ".Gallery_item", $(this)); });
		global_events();

	}).fail(function(xhr, status, err){ $(".pageLocalBudget_wrap .Loading_ico").remove(); alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");	});
	$(".pageLocalBudget_wrap").empty().append(loading_bounce);
}


