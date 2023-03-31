
$(document).ready(function(e)
{
	



});





function install_table(p,exec)
{
	p.find(".tblRefresh_btn").unbind("click").click(function(e){ exec(); });
	p.find(".tblRows_sel").unbind("change").change(function(e) { exec(); });

	var tSearch_time=null;
	p.find(".tblSearch_btn").unbind("click").click(function(e){ clearTimeout(tSearch_time); table_reset(p,exec); });
	p.find(".tblSearch_ipt").off("search").on("search",function(e){ clearTimeout(tSearch_time); table_reset(p,exec); });
	p.find(".tblSearch_ipt").unbind("keyup").keyup(function(e){ if((e.keyCode ? e.keyCode : e.which)!=13) { clearTimeout(tSearch_time); tSearch_time = setTimeout(function(e){ table_reset(p,exec); }, 1500); } 	});

	p.find(".tblHdr").click(function(e)
	{
		if($(this).hasClass("tblSort_des")){ p.find(".tblHdr").removeClass("tblSort_asc").removeClass("tblSort_des"); $(this).addClass("tblSort_asc"); }
		else{ p.find(".tblHdr").removeClass("tblSort_asc").removeClass("tblSort_des"); $(this).addClass("tblSort_des");	}
		exec();
	});

}
function table_sort(p)
{
	var tmpResult = "";
	if(p)
	{
		if(p.find(".tblHdr").hasClass("tblSort_asc"))		{ tmpResult= "0"+p.find(".tblSort_asc").attr("data-sort");	}
		else if(p.find(".tblHdr").hasClass("tblSort_des"))	{ tmpResult= "1"+p.find(".tblSort_des").attr("data-sort");	}
	}	
	return tmpResult;
}
function table_pager(p){ return (p)?p.find(".tblRows_sel").val()+","+p.attr("data-page"):""; }
function table_ind(p)  { return (p)?(parseInt(p.attr("data-page")) - 1) * parseInt(p.find(".tblRows_sel").val())+1:""; }
function _tblRow_ind(a) { a = (a)?(parseInt(a.find(".tblFilter_cnt").attr("data-page") - 1) * a.find(".tblNumRows_sel").val()) + 1:"";	return a;	}

function table_reset(p,exec,prop)
{
	if(p && exec)
	{
		p.attr("data-page","1"); exec();
	}
}


function table_paginator(prop)
{
	let v = Object.fromEntries(Object.entries({panel:null,count:0,limit:0,page:0,links:"",exec:null,col:3,asc:true,event:null}).map(([key, value])=>[key, value]));
	if((prop) && (Object.keys(prop).length >0 )){ Object.entries(prop).forEach(([k,val]) => { v[k] = val;  }); }

	var tStart= ((v.limit*v.page) - v.limit ) + 1;
	var tEnd= ((v.limit*v.page)>=v.count)?v.count:(v.limit*v.page);
	var tLinks= v.links.split(",");

	if(parseInt(v.count)<= parseInt(v.limit)){ v.panel.find(".tblPaginate_links").hide(); v.panel.find(".tblPaginate_val").html("<b>"+v.count+"</b> Result"+((parseInt(v.count)>1)?"s":"")); }
	else{ v.panel.find(".tblPaginate_val").html("("+tStart+"-"+tEnd+") of <b>"+v.count+"</b> Result"+((parseInt(v.count)>1)?"s":"")); v.panel.find(".tblPaginate_links").show(); }

	v.panel.find(".tblFirst_btn, .tblPrev_btn, .tblNext_btn, .tblLast_btn").unbind("click");
	if(parseInt(tStart) > 1)
	{
		v.panel.find(".tblFirst_btn, .tblPrev_btn").removeClass("disabled");
		v.panel.find(".tblPrev_btn").click(function(e) { v.panel.attr("data-page",(parseInt(v.page) - 1)); v.exec(); });
		v.panel.find(".tblFirst_btn").click(function(e){ v.panel.attr("data-page","1"); v.exec(); });

	}
	else{ v.panel.find(".tblFirst_btn, .tblPrev_btn").addClass("disabled"); }

	if((v.page*v.limit)<v.count)
	{ 
		v.panel.find(".tblNext_btn, .tblLast_btn").removeClass("disabled");
		v.panel.find(".tblNext_btn").click(function(e){ v.panel.attr("data-page",(parseInt(v.page) + 1));	v.exec();	});
		v.panel.find(".tblLast_btn").click(function(e){ v.panel.attr("data-page", tLinks.slice(-1)[0]);	v.exec();	});
	}
	else{ v.panel.find(".tblNext_btn, .tblLast_btn").addClass("disabled"); }

	v.panel.find(".tblPaginate_seal").empty();
	var tLink_start=0;
	var tLink_end= (parseInt(v.page)>=v.col)?(parseInt(v.page) + v.col):(v.col * 2);
	if(parseInt(v.page)>v.col){ tLink_start= (tLinks.length - parseInt(v.page) < v.col)?(tLinks.length - (v.col*2)):(parseInt(v.page) - v.col); }
	
	$(tLinks).each(function(i,val)
	{
		if(i>=tLink_start && i<tLink_end)
		{
			v.panel.find(".tblPaginate_seal").append('<a href="#" class="tblLink_btn '+((val==v.panel.attr("data-page"))?"active":"")+'">'+val+'</a>')
		}
		
	});

	v.panel.find(".tblLink_btn").unbind("click").click(function(e)
	{
		e.preventDefault(); if($(this).hasClass("active")==false){ v.panel.attr("data-page",$(this).text()); v.exec(); }
	});

}





