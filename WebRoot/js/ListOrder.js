

//����List���� ��ͨҳ��
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


//����List���� ��ͨҳ�� �¿��
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

//����List���� ����ҳ��
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


//����List���� ����ҳ�� �¿��
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

//����List������ͼ��
function LoadOrder(OrderKey,OrderBy){
	if(OrderKey!="" && OrderBy!=""){
		if(OrderBy=="desc" && document.getElementById(OrderKey+"Order")) document.getElementById(OrderKey+"Order").className="orderDown";
		else if	(OrderBy=="asc" && document.getElementById(OrderKey+"Order")) document.getElementById(OrderKey+"Order").className="orderUp";
	}
}
