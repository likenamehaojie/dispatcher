function showMessage(){	 
	var message="<div id='bg' style='position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index:1001;  -moz-opacity: 0.7;  opacity:.70;filter: alpha(opacity=30);'></div><div align='center' style='z-index=1000;position:absolute;top:30%;'><table border=\"0\" width=\"100%\" height=\"100%\"><tr><td align=\"center\"><img src=\"/images/loading2.gif\"><font size=\"6\" color=\"#0000CC\"><B>���ڼ���,���Ե�...</B></font></td></tr></table></div>";
	var obj=document.body;
	var excelImportInfomessage=document.createElement("div");
	excelImportInfomessage.id="parentBg";
	excelImportInfomessage.innerHTML=message;
	var first=obj.firstChild;//�õ�ҳ��ĵ�һ��Ԫ��
	obj.appendChild(excelImportInfomessage,first);//�ڵõ��ĵ�һ��Ԫ��֮ǰ����
}


function showRightMessage(){	 
	var message="<div id='bg' style='position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index:1001;  -moz-opacity: 0.7;  opacity:.70;filter: alpha(opacity=30);'></div><div align='center' style='z-index=1000;position:absolute;top:30%;'><table border=\"0\" width=\"100%\" height=\"100%\"><tr><td align=\"center\"><img src=\"/images/loading2.gif\"><font size=\"6\" color=\"#0000CC\"><B>���ڼ���,���Ե�...</B></font></td></tr></table></div>";
	try{
		var obj=window.parent.I2.document.body;
	
		var excelImportInfomessage=document.createElement("div");

		excelImportInfomessage.innerHTML=message;
			
		var first=obj.firstChild;//�õ�ҳ��ĵ�һ��Ԫ��

		obj.insertBefore(excelImportInfomessage,first);//�ڵõ��ĵ�һ��Ԫ��֮ǰ����	
	}catch(error){
	}
	

}