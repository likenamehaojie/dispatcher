

//更改List排序 普通页面
function orderByInfo(info,OrderKey,OrderBy){
	if(info==OrderKey && OrderBy=="asc"){
		document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|desc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="desc";
		searchInfo();
		}
	else if(info==OrderKey && OrderBy=="desc"){
		document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		searchInfo();
		}	
	 else if(info!=OrderKey){
		document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		searchInfo();
		}
		
	
}


//更改List排序 普通页面 新款方法
function orderByInfo_new(info,OrderKey,OrderBy){
	if(info==OrderKey && OrderBy=="asc"){
	//	document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|desc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="desc";
		searchInfo();
		}
	else if(info==OrderKey && OrderBy=="desc"){
	//	document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		searchInfo();
		}	
	 else if(info!=OrderKey){
	//	document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		searchInfo();
		}
		
	
}

//更改List排序 流程页面
function orderByInfowf(info,OrderKey,OrderBy){
	if(info==OrderKey && OrderBy=="asc"){
		document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|desc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="desc";
		wfsearchInfo();
		}
	else if(info==OrderKey && OrderBy=="desc"){
		document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		wfsearchInfo();
		}	
	 else if(info!=OrderKey){
		document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		wfsearchInfo();
		}
		
	
}


//更改List排序 流程页面 新款方法
function orderByInfowf_new(info,OrderKey,OrderBy){
	if(info==OrderKey && OrderBy=="asc"){
	//	document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|desc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="desc";
		wfsearchInfo();
		}
	else if(info==OrderKey && OrderBy=="desc"){
		//document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		wfsearchInfo();
		}	
	 else if(info!=OrderKey){
	//	document.getElementsByName("$TABLEKEYWORD")[0].value=info+"|asc";
		document.getElementsByName("OrderKey")[0].value=info;
		document.getElementsByName("OrderBy")[0].value="asc";
		wfsearchInfo();
		}
		
	
}

//加载List标题栏图标
function LoadOrder(OrderKey,OrderBy){
	if(OrderKey!="" && OrderBy!=""){
		if(OrderBy=="desc" && document.getElementById(OrderKey+"Order")) document.getElementById(OrderKey+"Order").className="orderDown";
		else if	(OrderBy=="asc" && document.getElementById(OrderKey+"Order")) document.getElementById(OrderKey+"Order").className="orderUp";
	}
}
