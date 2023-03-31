
$(document).ready(function(e)
{
	
	func1_();func2_();func3_(); func10_();func11_(); func6_();
	$(".dCalRefresh_btn").unbind("click").click(function(e)	  { func2_(); });
	$(".dNoticeRefresh_btn").unbind("click").click(function(e){ func3_(); });

	$(".dAttRefresh_btn").unbind("click").click(function(e){ func10_("button"); });
	$(".dashGraphDate_ipt").unbind("change").change(function(e){ func11_();  });

	$(".dashChat_btn").unbind("click").click(function(e){ alert_("Comming Soon! This feature is not yet available.","Information"); });


});
var plParent= $(".plDashboard");
var func1_= function(e)
{
	if($(".Dashboard_ico").length)
	{
		$.post(host+'account/model/tbl.dashboard.php',{token:"0",fb:"27",ft:"0-0-1"},function(json, status, xhr)
		{		console.log(json);
			$.each(json,function(i, v)
			{
				if(v.id)
				{	
					if($(".dashReg_pending").length>0){ plParent.find(".dashReg_pending").text(toThousand(v.ol_pending)); }
					if($(".dashProj_cnt").length>0){ plParent.find(".dashProj_cnt").text(toThousand(v.projects)); }
					if($(".dashCouncil_cnt").length>0){ plParent.find(".dashCouncil_cnt").text(toThousand(v.council)); }
					if($(".dashChapter_cnt").length>0){ plParent.find(".dashChapter_cnt").text(toThousand(v.chapter)); }


					if($(".dashMem_cnt").length>0){ plParent.find(".dashMem_cnt").text(toThousand(v.c_member)); }
					if($(".dashLog_cnt").length>0){ plParent.find(".dashLog_cnt").text(toThousand(v.logbook)); }				
					if($(".dashChat_cnt").length>0){ plParent.find(".dashChat_cnt").text(toThousand("0")); }						
				}
				if(v.storage_total)
				{
					plParent.find(".dashStorage_total").text(v.storage_total);
					plParent.find(".dashStorage_free").text(v.storage_free);
					if(v.critical=="1"){ plParent.find(".dashStorage_wrap").addClass("dashStorageCritical"); }
				}
			}); 
		},"json").done(function(e){ }).fail(function(xhr, status, err){ plParent.find(".tblLoading_fr").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".dashStd_cnt, .dashTea_cnt, .dashPar_cnt, .dashFet_cnt").text("...");
	}	
}
var func2_= function(e)
{
	var tmpEvents=[];
	$.post(host+'account/model/tbl.dashboard.php',{token:"0",fb:"27",ft:"0-0-2"},function(json, status, xhr)
	{		
		$.each(json,function(i, v)
		{
			if(v.id)
			{
				tmpEvents.push({title:v.title,start:v.date_on,end:v.date_end,description:v.description,don:v.date_on,dend:v.date_end,venue:v.venue,sub_title:v.sub_title,
				    eventRender:function(info)
				    { 
					    var tooltip= new Tooltip(info.el,{title: info.event.extendedProps.description,placement:'top',trigger:'hover',container:'body'});
					}
				});
			}	
		}); 
	},"json").done(function(e)
	{
		plParent.find(".tblLoading_fr").remove(); 
		plParent.find(".dashCalender_frame").show();
		var calendarEl= document.getElementById('calendar');
		var calendar  = new FullCalendar.Calendar(calendarEl, 
		{
			headerToolbar:{left:'title',right:'prev,next today',center:''},
			footerToolbar:{right:'dayGridMonth,timeGridWeek,timeGridDay,listMonth'},
	    	navLinks:true,businessHours:true,editable:false,selectable:false,
	    	events:tmpEvents,
	    	//initialView: 'listMonth',
	    	eventClick: function(info) 
	    	{
	    		var tobj = info.event.extendedProps;
	    		var tmpDated = fromDbDate(tobj.don)+((tobj.dend=="0000-00-00 00:00:00" || tobj.dend=='')?'':' to '+fromDbDate(tobj.dend));

	    		var tmp_event = ''+
				'<div class="pPanel_bg pop-bg"><form class="pPanel popup-panel draggable">'+
					'<div class="popup-panel-header"> <b>EVENT CALENDAR</b><a href="#" class="pPanel_cls popup-panel-close"><i class="fa fa-close"></i></a> </div>'+
					'<div class="popPanel_wrap popup-panel-wrap">'+			
						'<div class="genMInputs_wrap popup-panel-body">'+
							'<ul class="d-event-post">'+
								'<li class="u">'+info.event.title+'</li>'+
				    			'<li>'+tobj.sub_title+'</li>'+
				    			'<li> <i class="fa fa-calendar poster-label-ico"></i><p>'+tmpDated+'</p> </li>'+
				    			'<li '+((tobj.venue)?'':'hidden')+'> <i class="fa fa-map-o poster-label-ico"></i><p>'+tobj.venue+'</p> </li>'+
				    			'<li><br/>'+jRead_more(tobj.description)+'</li>'+
				    		'</ul>'+
						'</div>'+
						'<div class="popFooter popup-panel-footer"><div class="btn-fr">'+				
							'<button class="pPanel_cls btn"><i class="fa fa-close"></i>Close</button>'+
						'</div></div>'+
					'</div>'+
				'</form></div>';
				$("body").append(tmp_event);
				show2_(".pPanel_bg", ".pPanel");
	    	}
		});
		calendar.render();

	}).fail(function(xhr, status, err){ plParent.find(".tblLoading_fr").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
	plParent.find(".dashCalender_wrap").empty().append(tblLoading_tag);
}
var func3_bool= true;
var func3_= function(e)
{
	if(func3_bool)
	{
		func3_bool= false; 
		$.post(host+'account/model/tbl.dashboard.php',{token:"0",fb:"27",ft:"0-0-3",sort:"",page:plParent.find(".dNoticePanel").attr("data-limit")+","+plParent.find(".dNoticePanel").attr("data-page")},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{	
					tblNoData= false;	
					if($("#dNoticePost"+v.id).length <=0)
					{
						var tPostResult=''+
						'<div class="dNoticePost d-notice-item" id="dNoticePost'+v.id+'">'+
							'<div class="pagelet-header">'+
								'<div class="pagelet-poster">'+
									'<div class="Poster_photo pagelet-poster-photo"><img src="'+v.profile+'" title="'+v.user+'" alt="" /></div>'+
									'<div class="pagelet-poster-details">'+
										'<a href="?profile.php&id='+v.user_id+'&type=admin" class="Profile_lnk pagelet-poster-name" >'+v.user+'</a>'+
										'<div class="pagelet-poster-date">'+
											'<i class="fa fa-globe"></i><time class="timeago" datetime="'+v.date+'" title="'+fromDbDate(v.date)+'">'+v.date+'</time>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="pagelet-body-in" >'+
								'<div class="notifPost_tit poster-post-title">'+v.title+'</div>'+
								'<pre class="notifPost_val poster-post-body">'+jRead_more(v.description,20)+'</pre>'+
							'</div>'+
						'</div>';					
						plParent.find(".dNotice_wrap").append(tPostResult);		
					}												
				}
				if(v.count)
				{ 
					if(v.count=="0"){ plParent.find(".dNotice_wrap").append('<div class="notifResult_val pagelet-result">-- NO RECORD FOUND --</div>'); }
					else
					{
						var tRNum= $(".dNoticePost").length, tRCnt=parseInt(v.count);
						if(tRNum == tRCnt){ if(plParent.find(".notifResult_val").length<=0){plParent.find(".dNotice_wrap").append('<div class="notifResult_val pagelet-result">-- END --</div>');} }
						else if(tRNum<tRCnt)
						{ 
							plParent.find(".dNoticePanel").attr("data-page",(parseInt(plParent.find(".dNoticePanel").attr("data-page")) + 1));
							plParent.find(".dNotice_wrap").append('<div class="noticeShowMore_btn pagelet-show-more"><a href="#">SHOW MORE</a></div>');
							$(".noticeShowMore_btn a").unbind("click").click(function(e){ func3_(); e.preventDefault(); });
						}
					}
					$(".notifPostCount_wrap").text(v.count+" Result"+((parseInt(v.count)>1)?"s":""));
				}	
			
			});
			if(json.length==0){ plParent.find(".dNotice_wrap").append("<div class='tbl-no-result'>No Record Found</div>"); }

		},"json").done(function(e)
		{
			func3_bool= true; plParent.find(".dNoticePanel").show(); plParent.find(".ldgPost_wrap").remove(); 			
			global_events();	

		}).fail(function(xhr, status, err){ func3_bool= true; plParent.find(".ldgPost_wrap").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".dNotice_wrap").append(ldgPost); $(".noticeShowMore_btn").remove();
	}
}

var func10_= function(e)
{
	if($(".dPresent_txt").length)
	{
		$.post(host+'account/model/tbl.dashboard.php',{token:"0",fb:"27",ft:"0-0-10"},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.result=="1"){ $(".dPresent_txt").text(v.count); }
			}); 
		},"json").done(function(e){ }).fail(function(xhr, status, err){ plParent.find(".tblLoading_fr").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		if(e){ plParent.find(".dPresent_txt").text("..."); }
		
	}
}
var func11_= function(e)
{
	if($(".dashSales_graph").length)
	{
		$.post(host+'account/model/tbl.dashboard.php',{token:"0",fb:"27",ft:"0-0-11",dated:$(".dashGraphDate_ipt").val()},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.grand_total)
				{	
					plParent.find(".dGraphTotal_txt").text(toDecimal(v.grand_total));
					plParent.find(".dGraphPay_txt").text(toDecimal(v.payments));
					plParent.find(".dGraphUnp_txt").text(toDecimal(v.unpaid));
					plParent.find(".dGraphExp_txt").text(toDecimal(v.expense));
					plParent.find(".dBalance_txt").text(toDecimal((parseFloat(v.grand_total)-parseFloat(v.payments)).toString()));

					plParent.find(".dGraph_payment").css("height",percentage_(v.payments,v.grand_total)+"%");
					plParent.find(".dGraph_unpaid").css("height",percentage_(v.unpaid,v.grand_total)+"%");
					plParent.find(".dGraph_expense").css("height",percentage_(v.expense,v.grand_total)+"%");

					plParent.find(".dPayment_per").text(percentage_(v.payments,v.grand_total)+"%");
					plParent.find(".dUnpaid_per").text(percentage_(v.unpaid,v.grand_total)+"%");
					plParent.find(".dExpense_per").text(percentage_(v.expense,v.grand_total)+"%");	
					
					var tmpIncome= parseFloat(v.grand_total) - parseFloat(v.expense);					
					plParent.find(".dIncome_txt").text(toDecimal(tmpIncome.toString()));
					plParent.find(".dIncome_per").text(percentage_(tmpIncome,v.grand_total)+"%");
				}	
			}); 
		},"json").done(function(e){ }).fail(function(xhr, status, err){ plParent.find(".tblLoading_fr").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		plParent.find(".dGraphTotal_txt, .dGraphPay_txt, .dGraphUnp_txt, .dGraphExp_txt, .dIncome_txt, .dBalance_txt").text("0.00");
		plParent.find(".dGraph_payment, .dGraph_unpaid, .dGraph_expense").css("height","0px");
		plParent.find(".dNetIncome_per, .dIncome_per, .dExpense_per, .dPayment_per, .dUnpaid_per").text("0%");
	}
}

var func6_= function(e)
{
	if($(".dashStudent_subject").length)
	{
		var tmpBg_color=['4e73df','6610f2','6f42c1','e83e8c','e74a3b','fd7e14','f6c23e','1cc88a','20c9a6','36b9cc']; var tmpRan=shuffle_(0,9);
		$.post(host+'account/model/tbl.lesson.php',{token:"0",fb:"27",ft:"50",src:"dashboard"},function(json, status, xhr)
		{		
			$.each(json,function(i, v)
			{
				if(v.id)
				{
					var tmpLink= (parseInt(v.topic)>0)?('<a class="Page_lnk" href="?lessons&did='+random_(32)+'&set='+v.itoken+'&name='+v.name+'">'+v.name+'</a>'):'<a href="#">'+v.name+'</a>';
					var tmpSche= (v.sched)?v.sched:'Not Scheduled';
					var tmpDItem= ''+
					'<div class="d-std-subj-item"><div class="d-std-subj-item-in">'+
						'<div class="d-std-subj-ico" style="background-color:#'+tmpBg_color[tmpRan[i]]+'"><i class="fa fa-folder-open-o"></i></div>'+
						'<span><b>'+v.topic+'</b>'+tmpLink+'<p>'+tmpSche+'</p></span>'+
					'</div></div>';
					$(".dashStudent_subject").append(tmpDItem);
				}
			}); 
		},"json").done(function(e)
		{ 
			$(".dashStudent_subject").find(".uiLoading").remove();

		}).fail(function(xhr, status, err){ $(".dashStudent_subject").find(".uiLoading").remove(); if(xhr.responseText=="SessionExpired"){logout();} else{alert_("Error in: "+xhr.responseText+"<br/><br/>Status: ("+status+")<br/>"+err,"Error Message");}	});
		$(".dashStudent_subject").empty().append(uiLoading2);
	}
}