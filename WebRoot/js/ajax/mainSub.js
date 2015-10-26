
//����������ʹ��JavaScript��̬���HTML��Ԫ�� 
//�к����к� 

//�滻ȫ��
String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}


Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
} 

//��������� 
var sys_j = 0; 
function AddRow(map,addType){
	var i = 0; 
	if(addType=="blank" || addType=="copy_blank" ){
		i=1;
		if(document.getElementsByName("titleCount")[0]){
			i=document.getElementsByName("titleCount")[0].value;
		}
		
	}else{
		i = document.getElementById("actor_table").rows.length; 
	}
	if(sys_j==0){
		sys_j=i;
	}else{
		sys_j++;
	} 
	var objNewRow = document.getElementById("actor_table").insertRow(i); 
	objNewRow.id = sys_j;
	objNewRow.setAttribute("align","center");
	objNewRow.bgColor = "#fafbfd"; 
	
	//���������
	var objNewCell;
	for(var k=0;k<map.size();k++){	
		var curField=map.keys()[k].split(":")[0];
		objNewCell = document.getElementById("actor_table").rows[i].insertCell(k);
		objNewCell.innerHTML = map.values()[k].replaceAll("#no#",sys_j);
		if((addType=="blank" || addType=="copy_blank") && $("#"+curField+"_sysDefaultView_spanId"+sys_j).attr("defaultValue")){//������ʾĬ��ֵ
			if($("#"+curField+"_sysDefaultView_spanId"+sys_j).attr("defaultValue")!='tag'){//������ǩ��Ĭ��ֵ
				$("#"+curField+"_sysDefaultView_spanId"+sys_j).html($("#"+curField+"_sysDefaultView_spanId"+sys_j).attr("defaultValue"));
			}else{//����ǩ��Ĭ��ֵ
				$("#"+curField+"_sysDefaultView_spanId"+sys_j).html($("#"+curField+"_tag_spanId"+sys_j).html());
			}
		}
		
		objNewCell.setAttribute("id",curField+"_td"+sys_j);
		var curObj=$(objNewCell).find("input,textarea,SELECT");

		$(objNewCell).dblclick(function(){
			//�Ƿ�����˫��
			if(($("input[name='dblclick']") && $("input[name='dblclick']").val()=="true") || ($("[name='dblclick"+$(this).parent().attr("id")+"']") && $("input[name='dblclick"+$(this).parent().attr("id")+"']").val()=="true")){
				//����˫��
			}else{
				dblEdit($(this).parent().attr("id"));
			//	sys_setEditCss('tableEdit',);
			//	sys_setShowOrHide('tableEdit',$(this).parent().attr("id"));
			}
		}); 
		if(map.keys()[k].indexOf("SYS_HIDDEN")==-1){
			if(addType=="blank"){
				if($(curObj).attr("tagName")=="SELECT"){
					$(curObj).get(0).options[0].selected=true;
				}else{
					$(curObj).val("");
				}
				if(map.keys()[k].indexOf("SYS_FIELDS")>-1){
					sys_setEditCss('tableEdit',sys_j,curField,'blank');
					sys_setShowOrHide('tableEdit',sys_j,curField);
				}else if(map.keys()[k].indexOf("SYS_DATE")>-1){
					var now = new Date(); 
					var nowStr = now.format("yyyy-MM-dd hh:mm");
					$("input[name="+curField+sys_j+"]").val(nowStr);
				}
				if($("#"+curField+"_showTip_forParent"+sys_j))$("#"+curField+"_showTip_forParent"+sys_j).html("");
				//alert($(curObj).attr("defaultValue"));//Ĭ��ֵ
				$(curObj).val($(curObj).attr("defaultValue"));
				setValidate(curObj);
				$(objNewRow).attr("status","edit");//�༭״̬
			}else if(addType=="copy_blank"){//��������
			
				var nextTrId=$(objNewRow).next("tr").attr("id");//��ȡ����һ�е�id
				$(curObj).val($("[name="+curField+nextTrId+"]").val());//�Ը������ж���ֵ
				$(objNewCell).find("input[name=id]").val("");//���ID 
				$(objNewCell).find("input[name^=realFileName]").val("");//��ո���

				if(map.keys()[k].indexOf("SYS_FIELDS")>-1){
					sys_setEditCss('tableEdit',sys_j,curField,'copy_blank');
					sys_setShowOrHide('tableEdit',sys_j,curField);
				}else if(map.keys()[k].indexOf("SYS_DATE")>-1){
					var now = new Date(); 
					var nowStr = now.format("yyyy-MM-dd hh:mm");
					$("input[name="+curField+sys_j+"]").val(nowStr);
				}
				if($("#"+curField+"_showTip_forParent"+sys_j))$("#"+curField+"_showTip_forParent"+sys_j).html("");
				//alert($(curObj).attr("defaultValue"));//Ĭ��ֵ
				//$(curObj).val($(curObj).attr("defaultValue"));
				setValidate(curObj);
				$(objNewRow).attr("status","edit");//�༭״̬
			}else{
				if(map.keys()[k].indexOf("SYS_FIELDS")>-1){
					sys_setEditCss('tableView',sys_j,curField);
					sys_setShowOrHide('tableView',sys_j,curField);
				}
			}
		}

		//������Ҫ���ص���
		if(map.keys()[k].indexOf("SYS_HIDDEN")>-1)objNewCell.style.display="none";
	}
	objNewRow.onmouseout = function(){this.style.backgroundColor='#FAFBFD';};
	objNewRow.onmouseover= function(){this.style.backgroundColor='#EEF1F8';};
	//���˿ؼ�һ���ύ��ȥ����ֵ����ѭ�����ޣ�����ʱ��ѭ�����գ��ж�phone�ؼ��Ƿ���ֵ���еģ�������ȫ����������� 
	document.getElementsByName("actorCount")[0].value = sys_j; 

	paixu();
	

} 

function sys_setShowOrHide(cssType,rowNo,curField){
	if(curField && curField!=""){
		if(cssType=="tableEdit"){
			$("#"+curField+"_sysEdit_spanId"+rowNo).show();
			$("#"+curField+"_sysView_spanId"+rowNo).hide();
		}else{
			$("#"+curField+"_sysEdit_spanId"+rowNo).hide();
			$("#"+curField+"_sysView_spanId"+rowNo).show();
		}
	}else{
		if(cssType=="tableEdit"){
			$("span[id$='_sysEdit_spanId"+rowNo+"']").show();
			$("span[id$='_sysView_spanId"+rowNo+"']").hide();
		}else{
			$("span[id$='_sysEdit_spanId"+rowNo+"']").hide();
			$("span[id$='_sysView_spanId"+rowNo+"']").show();
		}
	}
	
}
function sys_setEditCss(cssType,rowNo,field,isSave){
	if(document.getElementsByName(field+rowNo)[0]){
		var curFieldObj=document.getElementsByName(field+rowNo)[0];
		if(cssType=="tableEdit"){
			if(curFieldObj.tagName=="SELECT" && isSave!="blank" && isSave!="copy_blank"){
				$("select[name="+field+rowNo+"] option[text='"+$("#"+field+"_sysView_spanId"+rowNo).html()+"']").attr("selected", true);
			}
		}else{
			if(isSave=="����"){
				//var curValue=$("[name='"+field+rowNo+"']").val();
				if(curFieldObj.tagName=="SELECT"){
					$("#"+field+"_sysView_spanId"+rowNo).html($("select[name="+field+rowNo+"]").find("option:selected").text());
				}else{
					$("#"+field+"_sysView_spanId"+rowNo).html(cutString(curFieldObj.value, 30));
				}
			}else{
				if(curFieldObj.tagName=="SELECT"){
					var curValue=$("select[name="+field+rowNo+"]").attr("realValue");
					//$("select[name="+field+rowNo+"] option[value='"+curValue+"']").attr("selected", true);
					$("select[name="+field+rowNo+"]").find("option[value='"+curValue+"']").attr("selected",true); 

					if(!$("input[name='dblclick']") || $("input[name='dblclick']").val()!="false"){//����viewҳ�� ����֮����ʾ�����б��ֵ��bug
					
						//���������ݵ�ʱ��  ����ʾselect��һ��ѡ��text��bug��
						if(curValue!=""){
							if(curValue!=$("select[name="+field+rowNo+"]").find("option:selected").val()){
								$("#"+field+"_sysView_spanId"+rowNo).html(curValue);
							}else{
								$("#"+field+"_sysView_spanId"+rowNo).html($("select[name="+field+rowNo+"]").find("option:selected").text());
							}
						}
					}
					
				}
			}
		}
	}else{
		for(var i=0;i<map.size();i++){
			var field=map.keys()[i].split(":")[0];
			var curFieldObj=document.getElementsByName(field+rowNo)[0];
			if(map.keys()[i].indexOf('SYS_FIELDS')>-1 && curFieldObj){
				if(cssType=="tableEdit"){
					if(curFieldObj.tagName=="SELECT" && isSave!="blank" && isSave!="copy_blank"){
						$("select[name="+field+rowNo+"] option[text='"+$("#"+field+"_sysView_spanId"+rowNo).html()+"']").attr("selected", true);
					}
				}else{
					if(isSave=="����"){
						//var curValue=$("[name='"+field+rowNo+"']").val();
						if(curFieldObj.tagName=="SELECT"){
							$("#"+field+"_sysView_spanId"+rowNo).html($("select[name="+field+rowNo+"]").find("option:selected").text());
						}else{
							$("#"+field+"_sysView_spanId"+rowNo).html(cutString(curFieldObj.value, 30));
						}
					}else{
						if(curFieldObj.tagName=="SELECT"){
							var curValue=$("select[name="+field+rowNo+"]").attr("realValue");
							$("select[name="+field+rowNo+"] option[value='"+curValue+"']").attr("selected", true);

							if(curValue!=$("select[name="+field+rowNo+"]").find("option:selected").val()){
								$("#"+field+"_sysView_spanId"+rowNo).html(curValue);
							}else{
								$("#"+field+"_sysView_spanId"+rowNo).html($("select[name="+field+rowNo+"]").find("option:selected").text());
							}
						}
					}
				}
			}
		}
	}
	

}
//ɾ���� 
function DelCurrentRow(k,tableType,delType,isMany) 
{ 
 var delStr="";
 var recordObj=document.getElementById("recordId_td"+k).getElementsByTagName("INPUT")[0];
 if(document.getElementsByName("tableName")[0] && document.getElementsByName("tableName")[0].value=='business'){
	var isExistsUser=getInfoBySqlNo_noHidden(348,$(recordObj).val());
	if(isExistsUser!=0){
		alert("����ɾ����ְ���µ������û�������ɾ����ְ��");
		return;
	}
 }
 if(document.getElementsByName("tableName")[0] && document.getElementsByName("tableName")[0].value=='DTSJ_examName_type'){
	var isExistsUser=getInfoBySqlNo_noHidden(361,$(recordObj).val());
	if(isExistsUser=='true'){
		alert("�ÿ���ϵͳ�б�������λ���ã�����ɾ��");
		return;
	}
 }
 if(!isMany && recordObj && $(recordObj).val()!=""){
	 if(!confirm("ȷ��Ҫɾ����")){
		return;
	 }
 }
 var rowCount=1;
 if(document.getElementsByName("rowCount")[0])rowCount=document.getElementsByName("rowCount")[0].value;
 var rowLength=document.getElementById("actor_table").rows.length;
 if(rowLength-rowCount==1){
	 for(var i=0;i<map.size();i++){
		if(map.keys()[i].indexOf('SYS_FIELDS')>-1 && map.keys()[i].indexOf('SYS_HIDDEN')==-1){
			var field=map.keys()[i].split(":")[0];
			if(document.getElementsByName(field+k)[0]){
				document.getElementsByName(field+k)[0].value="";
				//�����Ĭ��ֵ������Ĭ��ֵ
				if($("[name="+field+k+"]").attr("defaultValue"))
					document.getElementsByName(field+k)[0].value=$("[name="+field+k+"]").attr("defaultValue");

				//alert(field+":"document.getElementsByName(field+k)[0].defaultValue);
				$("#"+field+"_sysView_spanId"+k).html("");
				if(document.getElementById(field+"_showTip_forParent"+k)){
					$("#"+field+"_showTip_forParent"+k).html("");
				}
			}
		}
	}

	
	if(!isMany && recordObj && $(recordObj).val()!='' && document.getElementsByName("tableName")[0]){
		if(tableType=="")tableType="��";
		if(delType=="")tableType="��";
		ajaxPost_pro_bat(96,document.getElementsByName("tableName")[0].value+"|"+$(recordObj).val()+":del;|"+tableType+"|"+delType+"|ɾ��");
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+document.getElementsByName("tableName")[0].value+"','del','"+$(recordObj).val()+"','"+k+"')");
		$(recordObj).val("");
	}
	sys_setEditCss("tableEdit",k);
	sys_setShowOrHide('tableEdit',k);
 }
	//alert("���ٱ���һ�ʼ�¼�������޷����棡");}
 else{
 //sys_j=document.getElementById("actor_table").rows.length;
   with(document.getElementById("actor_table")) 
   { 
    for (var i=0;i<rows.length;i++) 
    { 
     if (rows[i].id == k) 
     { 
		var recordObj=document.getElementById("recordId_td"+k).getElementsByTagName("INPUT")[0];
		if(!isMany && $(recordObj).val()!='' && document.getElementsByName("tableName")[0]){
			if(tableType=="")tableType="��";
			if(delType=="")tableType="��";
			ajaxPost_pro_bat(96,document.getElementsByName("tableName")[0].value+"|"+ $(recordObj).val()+":del;|"+tableType+"|"+delType+"|ɾ��");
			if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+document.getElementsByName("tableName")[0].value+"','del','"+$(recordObj).val()+"','"+k+"')");
		
			$(recordObj).val("");
			//window.location.reload();
		}

      deleteRow(i); 
	  paixu();
//	sys_j--;
	//document.getElementById("actorCount").value=sys_j;
     } 
    } 
   } 
  } 
}
function DelManyCurrentRows(tableType,delType){
	var recordId=getManyRecordAndNums();
	if(recordId.length>0){
		if(confirm("ȷ��Ҫɾ����")){
			var recordRealId=getManyObject();
			if(recordId.indexOf("��")>-1){
				alert("����ѡ����м�¼��������ѡ��");
				return;
			}
			var delStr="";
			for(var i=0;i<recordId.split(",").length;i++){
				DelCurrentRow(recordId.split(",")[i],tableType,delType,true);
				
			}
			for(var i=0;i<recordRealId.split(",").length;i++){
				var curRecordId=recordRealId.split(",")[i];
				if(curRecordId!=""){
					delStr=delStr+recordRealId.split(",")[i]+":del;";
					$('#actor_table').find("input[type='checkbox'][value='"+recordRealId.split(",")[i]+"']").val("");
				}
				
			}
			if(delStr!=""){
				ajaxPost_pro_bat(96,document.getElementsByName("tableName")[0].value+"|"+delStr+"|"+tableType+"|"+delType+"|ɾ��");
				if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+document.getElementsByName("tableName")[0].value+"','del','"+delStr+"','0')");
		
			}
		}
	}
	
}

function paixu(){
  var num=document.getElementsByName("actorCount")[0].value;
  var xh=0;
  for(var h=1;h<=num;h++){
    if(document.getElementById("xuhao_td"+h)){
	  xh++;
      document.getElementById("xuhao_td"+h).innerHTML=xh;
	}
  }
}

function iniFocus(){
	var baseIndex = 100;
        $("#actor_table")
        .find("tr").each(function(r) {
            $(this).find("td").find("input,textarea,select").each(function(c) {
				$(this).attr("tabindex", r * 100 + c + baseIndex);
            });
        });
        $("#actor_table").find("input,textarea,select").bind("keyup", function(evt) {
            var tabIndex = parseInt(this.tabindex);
            switch (evt.which) {
                case 38: //��
                    tabIndex -= 100;
                    break;
                case 40: //��
                    tabIndex += 100;
                    break;
                case 37: //��(������ݔ��r�o��ʹ��������)
                    tabIndex--;
                    break;
                case 39: //��(������ݔ��r�o��ʹ��������)
                    tabIndex++;
                    break;
                default:
                    return;
            }
            if (tabIndex > 0) {
               $("#actor_table").find("[tabindex=" + tabIndex + "]").focus();
                return false;
            }
            return true;
        });
}



function AddRows(){
	
	AddRow(map,'copy_blank');
}

function ajax_save(sNo){

	var fieldStr="";
	var valueStr="";
	var curSubmit=true;
	for(var i=0;i<map.size();i++){
		if(map.keys()[i].indexOf('SYS_FIELDS')>-1){
			var field=map.keys()[i].split(":")[0];
			var curObj=document.getElementsByName(field+sNo)[0];
			setValidate(curObj);
			if($(curObj).attr("valFun") && $(curObj).attr("valFun")!=""){
				if(!superValidate_checkValue(curObj,sNo))curSubmit=false;
			}
			//var value=$("[name='"+field+sNo+"']").val();
			
			var value=document.getElementsByName(field+sNo)[0].value;
			
			fieldStr=fieldStr+field+',';
			valueStr=valueStr+value+'b62a';
		}
	}
	if(!curSubmit)return;
		//	$(curObj).removeClass("tableEdit").addClass("tableView");
	valueStr=valueStr+'c62b';

	var recordObj=document.getElementById("recordId_td"+sNo).getElementsByTagName("INPUT")[0];
	var tableName;
	if(document.getElementsByName("tableName")[0]){
		tableName=document.getElementsByName("tableName")[0].value;
	}
	for(var i=0;i<map.size();i++){
		if(map.keys()[i].indexOf('SYS_FIELDS')>-1){
			var field=map.keys()[i].split(":")[0];
			var curObj=document.getElementsByName(field+sNo)[0];
			sys_setEditCss("tableView",sNo,field,"����");
			sys_setShowOrHide('tableView',sNo,field);

		}
	}
	if(recordObj && $(recordObj).val()==''){
		valueStr=valueStr.replaceAll('\'','��');
		valueStr=valueStr.replaceAll('"','��');
		var newId=ajaxPost_getInfo_noHidden(96,tableName+'|add;|'+fieldStr+'|'+valueStr+'|����');

	
	//	alert(newId);
	//	alert(newId.indexOf("���µ�½"));
		if(newId.indexOf("ʧ��")>-1 || newId.indexOf("���µ�½")>-1 ){
			alert("����ʧ��");
			window.location.reload();
		}
		$(recordObj).val(newId);
		//���ҳ�����saveFun����������ִ�к������add
		
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+tableName+"','add','"+newId+"','"+sNo+"')");
		//window.location.reload();
	}else{
		//alert();
		//���ҳ�����saveFun����������ִ�к������edit
		valueStr=valueStr.replaceAll('\'','��');
		valueStr=valueStr.replaceAll('"','��');
		ajaxPost_pro_noInfo(96,tableName+'|'+$(recordObj).val()+':edit;|'+fieldStr+'|'+valueStr+'|����');
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+tableName+"','edit','"+$(recordObj).val()+"','"+sNo+"')");
	}
	$("tr[id="+sNo+"]").attr('status','');//������״̬
}

//��������
function ajax_batchSave(){
	//alert($("tr[status='edit']").length);return;
//alert($("input[name=id][value='']").length);return;
	var sNo;
	var fieldStr="";
	var valueStr="";
	var curSubmit=true;
	for(var i=0;i<map.size();i++){
		if(map.keys()[i].indexOf('SYS_FIELDS')>-1){
			var field=map.keys()[i].split(":")[0];
			var curObj=document.getElementsByName(field+sNo)[0];
			setValidate(curObj);
			if($(curObj).attr("valFun") && $(curObj).attr("valFun")!=""){
				if(!superValidate_checkValue(curObj,sNo))curSubmit=false;
			}
			//var value=$("[name='"+field+sNo+"']").val();
			
			var value=document.getElementsByName(field+sNo)[0].value;
			
			fieldStr=fieldStr+field+',';
			valueStr=valueStr+value+'b62a';
		}
	}
	if(!curSubmit)return;
		//	$(curObj).removeClass("tableEdit").addClass("tableView");
	valueStr=valueStr+'c62b';

	var recordObj=document.getElementById("recordId_td"+sNo).getElementsByTagName("INPUT")[0];
	var tableName;
	if(document.getElementsByName("tableName")[0]){
		tableName=document.getElementsByName("tableName")[0].value;
	}
	for(var i=0;i<map.size();i++){
		if(map.keys()[i].indexOf('SYS_FIELDS')>-1){
			var field=map.keys()[i].split(":")[0];
			var curObj=document.getElementsByName(field+sNo)[0];
			sys_setEditCss("tableView",sNo,field,"����");
			sys_setShowOrHide('tableView',sNo,field);

		}
	}
	if(recordObj && $(recordObj).val()==''){
		valueStr=valueStr.replaceAll('\'','��');
		valueStr=valueStr.replaceAll('"','��');
		var newId=ajaxPost_getInfo_noHidden(96,tableName+'|add;|'+fieldStr+'|'+valueStr+'|����');
	//	alert(newId);
	//	alert(newId.indexOf("���µ�½"));
		if(newId.indexOf("ʧ��")>-1 || newId.indexOf("���µ�½")>-1 ){
			alert("����ʧ��");
			window.location.reload();
		}
		$(recordObj).val(newId);
		//���ҳ�����saveFun����������ִ�к������add
		
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+tableName+"','add','"+newId+"','"+sNo+"')");
		//window.location.reload();
	}else{
		//alert();
		//���ҳ�����saveFun����������ִ�к������edit
		valueStr=valueStr.replaceAll('\'','��');
		valueStr=valueStr.replaceAll('"','��');
		ajaxPost_pro_noInfo(96,tableName+'|'+$(recordObj).val()+':edit;|'+fieldStr+'|'+valueStr+'|����');
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+tableName+"','edit','"+$(recordObj).val()+"','"+sNo+"')");
	}
}
var validateMap=new Map();

function setValidate(curObj){
	var funName=$(curObj).attr("valFun");
	if(funName!=null && funName!=""){
		if(!validateMap.containsValue($(curObj).attr("name"))){
			if($(curObj).attr("combineFields") && $(curObj).attr("combineFields")!="")
				eval(funName+"('"+$(curObj).attr("combineFields")+"')");
			else
				eval(funName+"('"+$(curObj).attr("name")+"')");
			validateMap.put("validated",$(curObj).attr("name"));
		}
	}
	
}



function setHTML_forParent(realFileName){
	var showDivStr="";
	var tableName=document.getElementsByName("tableName")[0].value;
	if(realFileName!="" && realFileName!="�޸���"){
		var realFileNameStr=realFileName.split("a62b");
		
		for (var i = 1; i < realFileNameStr.length; i++) {
			//alert(realFileNameStr[i - 1]);
				showDivStr=showDivStr+"<div class=\"attBox\"><span><a href=\"smartDownloadServlet.do?tableName="+tableName+"&fn=" + realFileNameStr[i - 1] + "\"><font color=red>" + realFileNameStr[i - 1].substring(0, realFileNameStr[i - 1].lastIndexOf("_")) + realFileNameStr[i - 1].substring(realFileNameStr[i - 1].lastIndexOf("."), realFileNameStr[i - 1].length) + "</font></a></span></div>";	
			
		}
	}
	return showDivStr;
}
function openToUpload(fieldName,recordId,sNo){
	var realFileName=document.getElementsByName(fieldName+sNo)[0].value;
	var tableName=document.getElementsByName("tableName")[0].value;
	var ITNO=document.getElementsByName("ITNO")[0].value;
	if(realFileName=="")realFileName="�޸���";
	window.open("gettablerecordinfoservlet?action=viewDocInfo&templateId=upload&recordId="+recordId+"&$KEYWORD="+tableName+"|"+fieldName+"|"+sNo+"|"+realFileName+"&ITNO=1");
}

function dblEdit(rowId){
	//alert(aObj);
	$("tr[id="+rowId+"]").attr('status','edit');
	sys_setEditCss('tableEdit',rowId);
	sys_setShowOrHide('tableEdit',rowId);

	//˫���ص�����
	if($("input[name='dblclick_callback']")){
		var funName=$("input[name='dblclick_callback']").val();
		if(funName && funName.length>0)
			eval(funName+"("+rowId+")");
	}
}
function OperateForCdno(addshow,editshow,delshow){
	var operateStr="";
	var add='<a href=\"javascript:dblEdit(#no#)\">�༭</a>&nbsp;';
	var add_edit='<a href=\"javascript:AddRows()\">���</a>&nbsp;<a href=\"javascript:ajax_save(#no#);\">����</a>&nbsp;';
	var edit='<a href=\"javascript:ajax_save(#no#);\">����</a>&nbsp;';
	var del='<a href=\"javascript:DelCurrentRow(#no#,1,1);\">ɾ��</a>&nbsp;';
	
	if(editshow=="none")
		document.getElementsByName("dblclick")[0].value="true";

	if(addshow=="block"&&editshow=="none")operateStr=operateStr+add_edit;
	else if(addshow=="block"&&editshow=="block")operateStr=operateStr+add;
	if(editshow=="block")operateStr=operateStr+edit;
	if(delshow=="block")operateStr=operateStr+del;
	return operateStr;
}

function OperateForRealValue(btnArray,dblShow){
	
	
	var operateStr="";
	var blankFlag="";
	for (var i=0;i<btnArray.length ;i++ )
	{
		blankFlag+=btnArray[i];
		operateStr+=btnArray[i]+'&nbsp;';
	}
	if(dblShow=="none" && document.getElementsByName("dblclick")[0])
	
		document.getElementsByName("dblclick")[0].value="true";

	if(blankFlag=='')operateStr=''; 
	return operateStr;
}

//�������һ��
function hideLastCol(tableId){
	var lastVal=$("#"+tableId+" tr:eq(1)").find("td:last").html();

	if(lastVal==''){
		$("#"+tableId+" thead tr").find('th:last').hide();
		$("#"+tableId+" tr").find('td:last').hide();
	}
}






/**����˵����
 * ���ݳ��Ƚ�ȡ��ʹ���ַ�������������׷�ӡ�
 * str �����ַ���
 * len Ŀ���ֽڳ���
 * ����ֵ�� �������ַ���
 */
function cutString(str, len) {
	//length���Զ������ĺ��ֳ���Ϊ1
	if(str.length*2 <= len) {
		return str;
	}
	var strlen = 0;
	var s = "";
	for(var i = 0;i < str.length; i++) {
		s = s + str.charAt(i);
		if (str.charCodeAt(i) > 128) {
			strlen = strlen + 2;
			if(strlen >= len){
				return s.substring(0,s.length-1) + "...";
			}
		} else {
			strlen = strlen + 1;
			if(strlen >= len){
				return s.substring(0,s.length-2) + "...";
			}
		}
	}
	return s;
}
