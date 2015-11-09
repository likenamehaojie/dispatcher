
document.write("<script type='text/javascript' src='/dwr/engine.js'></script>"); 
document.write("<script type='text/javascript' src='/dwr/interface/JDelFile.js'></script>"); 
document.write('<script type="text/javascript" src="js/layer/jquery.js"></script>'); 
document.write('<script src="js/layer/layer.min.js"></script>'); 


var jsTableName="";	
var editDeleteFlag=false;//判断是新增加的文件对应的删除还是原来页面对应的删除，修改页面对原有的文件不进行实际删除；
var addFList="";//新加的文件列表；
var oldFList="";//新加的文件列表；
var curLoadingLayer;//上传时加载层
//	删除文件
function delFile(filename, i) {
    var msgTemp=document.getElementById("msg" + i).innerHTML;
    if(msgTemp.indexOf("smartDownloadServlet.do")>0){//修改页面的时候
	  editDeleteFlag=true;
	}
	document.getElementById("msg" + i).innerHTML = "";
	document.getElementById("del" + i).innerHTML = "";
	document.getElementsByName("realFileName" + i)[0].value = "";
	var filename1 = filename.substring(jsTableName.length + 1, filename.length);
	document.getElementsByName("realFileName")[0].value = document.getElementsByName("realFileName")[0].value.replace(filename1 + "a62b", "");
	document.getElementById("showline"+i).parentNode.removeChild(document.getElementById("showline"+i));
	if(!editDeleteFlag){
	  addFList=addFList.replace(filename1 + ",", "");
	  JDelFile.deleteFiles(filename, callbackDel());
    }
	else{
	  oldFList=oldFList+filename1+",";
      showHide();
	}
    editDeleteFlag=false;
}
function callbackDel(isDel) {
	
	showHide();
}
var tempAction="";
//	上传附限制
function getURL() {
	document.form1.encoding="multipart/form-data"; 
	tempAction=document.form1.action;
	document.form1.action="/smartUploadServlet.do?tableName="+jsTableName;
	document.form1.target="hidden_frame";
	var file1 = document.getElementsByName("file1")[0].value;
	if (file1 == null || file1 == "") {
		alert("请选择需要上传的文件");
		return;
	}

	else {
		curLoadingLayer=layer.load('\(^o^)/正在努力上传中...');
		//form1.upload.value = "正在上传文件，请稍候……";
		//form1.upload.disabled = "false";
		document.form1.submit();
	}
}
//	java类调用，上传附件失败
function callbackError(msg) {
	alert(msg);
	//form1.upload.value = "开始上传";
//	form1.upload.disabled = "";
}
//	java类调用，成功上传附件
function callback(msg, del, renameFile) {
	for (var i = 1; i <= 200; i++) {
		if (document.getElementById("msg" + i)) {
			if (document.getElementById("msg" + i).innerHTML != "") {
				continue;
			}
		} else {
			if (document.getElementById("msg" + i) && document.getElementById("msg" + i).innerHTML == "") {
				break;
			} else {
				document.getElementById("showTip").innerHTML = document.getElementById("showTip").innerHTML + "<div id=\"showline" + i + "\" class=\"attBox\" style=\"display:none\"><span id=\"msg" + i + "\"></span>&nbsp;&nbsp;&nbsp;<span id=\"del" + i + "\"></span><input name=\"realFileName" + i + "\" type=\"hidden\" /></div>";
				break;
			}
		}
	}

	for (var i = 1; i <= 200; i++) {
		if (document.getElementById("msg" + i) && document.getElementById("msg" + i).innerHTML == "") {
			document.getElementById("msg" + i).innerHTML = "<font color=red>" + msg + "</font>";
			addFList=addFList+renameFile+",";
			document.getElementsByName("realFileName" + i)[0].value = renameFile;
			document.getElementById("del" + i).innerHTML = "<a href=\"javascript:delFile('"+jsTableName+"\/" + renameFile + "'," + i + ")\"><font color=red>" + del + "</font></a>";

			document.getElementsByName("realFileName")[0].value = document.getElementsByName("realFileName")[0].value.replace(renameFile + "a62b", "");
			document.getElementsByName("realFileName")[0].value = document.getElementsByName("realFileName")[0].value.replace("无附件", "");
			document.getElementsByName("realFileName")[0].value = document.getElementsByName("realFileName")[0].value + renameFile + "a62b";

			//alert(document.getElementsByName("realFileName")[0].value);
			break;
		}
	}

	showHide();
	//alert(curLoadingLayer);
	layer.close(curLoadingLayer);
//	form1.upload.value = "开始上传";
	//form1.upload.disabled = "";
}
function showHide() {
	for (var i = 1; i <= 200; i++) {
		if (document.getElementById("msg" + i)) {
			if (document.getElementById("msg" + i).innerHTML != "") {
				document.getElementById("showline" + i).style.display = "block";
			} else {
				document.getElementById("showline" + i).style.display = "none";
			}
		} else {
			break;
		}
	}

	document.form1.encoding="application/x-www-form-urlencoded"; 
	if(tempAction!=""){
		document.form1.action=tempAction;
	}
	document.form1.target="";
	
//	alert(document.getElementsByName("realFileName")[0].value);
}


function setHTML(){
	jsTableName=document.getElementsByName("tableName")[0].value;
	var fileTdId=document.getElementById("fileTdId");
	var fileTdId_view=document.getElementById("fileTdId_view");
	if(fileTdId){
		fileTdId.innerHTML=fileTdId.innerHTML+"<br><div id='showTip'></div><div style='display:none'><iframe name='hidden_frame' id='hidden_frame' style='display:none'></iframe></div>"
	}
	else{
		fileTdId_view.innerHTML=fileTdId_view.innerHTML+"<br><div id='showTip'></div>"
	}
	var realFileName=document.getElementsByName("realFileName")[0].value;
	
	if(realFileName!="" && realFileName!="无附件"){
		var realFileNameStr=realFileName.split("a62b");
		var showDivStr="";
		for (var i = 1; i < realFileNameStr.length; i++) {
			//alert(realFileNameStr[i - 1]);
			var doStrFuhao=realFileNameStr[i - 1].replace(new RegExp("[+]","gm"),"%2B");
			if(fileTdId){
				showDivStr=showDivStr+"<div id=\"showline" + i + "\" class=\"attBox\"><span id=\"msg" + i + "\"><a href=\"smartDownloadServlet.do?tableName="+jsTableName+"&fn=" + doStrFuhao + "\"><font color=red>" + realFileNameStr[i - 1].substring(0, realFileNameStr[i - 1].lastIndexOf("_")) + realFileNameStr[i - 1].substring(realFileNameStr[i - 1].lastIndexOf("."), realFileNameStr[i - 1].length) + "</font></a></span>&nbsp;&nbsp;&nbsp;<span id=\"del" + i + "\"><a href=\"javascript:delFile('"+jsTableName+"\/" + realFileNameStr[i - 1] + "'," + i + ")\"><font color=red>删除</font></a></span><input name=\"realFileName" + i + "\" type=\"hidden\" value=\"" + realFileNameStr[i - 1] + "\" /></div>";
			}
			else{
				showDivStr=showDivStr+"<div id=\"showline" + i + "\" class=\"attBox\"><span id=\"msg" + i + "\"><a href=\"smartDownloadServlet.do?tableName="+jsTableName+"&fn=" + doStrFuhao + "\"><font color=red>" + realFileNameStr[i - 1].substring(0, realFileNameStr[i - 1].lastIndexOf("_")) + realFileNameStr[i - 1].substring(realFileNameStr[i - 1].lastIndexOf("."), realFileNameStr[i - 1].length) + "</font></a></span></div>";		
			}
		}
		document.getElementById("showTip").innerHTML=showDivStr;
		showHide();
	}
}
window.onload=setHTML;
										
										
									