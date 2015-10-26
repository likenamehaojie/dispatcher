
//功能描述：使用JavaScript动态添加HTML的元素 
//行号与列号 

//替换全部
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

//添加条件行 
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
	
	//处理序号列
	var objNewCell;
	for(var k=0;k<map.size();k++){	
		var curField=map.keys()[k].split(":")[0];
		objNewCell = document.getElementById("actor_table").rows[i].insertCell(k);
		objNewCell.innerHTML = map.values()[k].replaceAll("#no#",sys_j);
		if((addType=="blank" || addType=="copy_blank") && $("#"+curField+"_sysDefaultView_spanId"+sys_j).attr("defaultValue")){//处理显示默认值
			if($("#"+curField+"_sysDefaultView_spanId"+sys_j).attr("defaultValue")!='tag'){//不带标签的默认值
				$("#"+curField+"_sysDefaultView_spanId"+sys_j).html($("#"+curField+"_sysDefaultView_spanId"+sys_j).attr("defaultValue"));
			}else{//带标签的默认值
				$("#"+curField+"_sysDefaultView_spanId"+sys_j).html($("#"+curField+"_tag_spanId"+sys_j).html());
			}
		}
		
		objNewCell.setAttribute("id",curField+"_td"+sys_j);
		var curObj=$(objNewCell).find("input,textarea,SELECT");

		$(objNewCell).dblclick(function(){
			//是否屏蔽双击
			if(($("input[name='dblclick']") && $("input[name='dblclick']").val()=="true") || ($("[name='dblclick"+$(this).parent().attr("id")+"']") && $("input[name='dblclick"+$(this).parent().attr("id")+"']").val()=="true")){
				//屏蔽双击
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
				//alert($(curObj).attr("defaultValue"));//默认值
				$(curObj).val($(curObj).attr("defaultValue"));
				setValidate(curObj);
				$(objNewRow).attr("status","edit");//编辑状态
			}else if(addType=="copy_blank"){//复制新增
			
				var nextTrId=$(objNewRow).next("tr").attr("id");//获取紧接一行的id
				$(curObj).val($("[name="+curField+nextTrId+"]").val());//对该行所有对象赋值
				$(objNewCell).find("input[name=id]").val("");//清空ID 
				$(objNewCell).find("input[name^=realFileName]").val("");//清空附件

				if(map.keys()[k].indexOf("SYS_FIELDS")>-1){
					sys_setEditCss('tableEdit',sys_j,curField,'copy_blank');
					sys_setShowOrHide('tableEdit',sys_j,curField);
				}else if(map.keys()[k].indexOf("SYS_DATE")>-1){
					var now = new Date(); 
					var nowStr = now.format("yyyy-MM-dd hh:mm");
					$("input[name="+curField+sys_j+"]").val(nowStr);
				}
				if($("#"+curField+"_showTip_forParent"+sys_j))$("#"+curField+"_showTip_forParent"+sys_j).html("");
				//alert($(curObj).attr("defaultValue"));//默认值
				//$(curObj).val($(curObj).attr("defaultValue"));
				setValidate(curObj);
				$(objNewRow).attr("status","edit");//编辑状态
			}else{
				if(map.keys()[k].indexOf("SYS_FIELDS")>-1){
					sys_setEditCss('tableView',sys_j,curField);
					sys_setShowOrHide('tableView',sys_j,curField);
				}
			}
		}

		//处理需要隐藏的列
		if(map.keys()[k].indexOf("SYS_HIDDEN")>-1)objNewCell.style.display="none";
	}
	objNewRow.onmouseout = function(){this.style.backgroundColor='#FAFBFD';};
	objNewRow.onmouseover= function(){this.style.backgroundColor='#EEF1F8';};
	//将此控件一起提交上去，其值接收循环上限，接收时，循环接收，判断phone控件是否有值，有的，接收其全部，否则忽略 
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
			if(isSave=="保存"){
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

					if(!$("input[name='dblclick']") || $("input[name='dblclick']").val()!="false"){//处理view页面 搜索之后显示下拉列表的值的bug
					
						//处理无数据的时候  会显示select第一个选项text的bug。
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
					if(isSave=="保存"){
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
//删除行 
function DelCurrentRow(k,tableType,delType,isMany) 
{ 
 var delStr="";
 var recordObj=document.getElementById("recordId_td"+k).getElementsByTagName("INPUT")[0];
 if(document.getElementsByName("tableName")[0] && document.getElementsByName("tableName")[0].value=='business'){
	var isExistsUser=getInfoBySqlNo_noHidden(348,$(recordObj).val());
	if(isExistsUser!=0){
		alert("请先删除该职务下的所有用户，才能删除该职务");
		return;
	}
 }
 if(document.getElementsByName("tableName")[0] && document.getElementsByName("tableName")[0].value=='DTSJ_examName_type'){
	var isExistsUser=getInfoBySqlNo_noHidden(361,$(recordObj).val());
	if(isExistsUser=='true'){
		alert("该考核系统有被其他单位引用，不能删除");
		return;
	}
 }
 if(!isMany && recordObj && $(recordObj).val()!=""){
	 if(!confirm("确定要删除吗")){
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
				//如果有默认值，则赋予默认值
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
		if(tableType=="")tableType="空";
		if(delType=="")tableType="空";
		ajaxPost_pro_bat(96,document.getElementsByName("tableName")[0].value+"|"+$(recordObj).val()+":del;|"+tableType+"|"+delType+"|删除");
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+document.getElementsByName("tableName")[0].value+"','del','"+$(recordObj).val()+"','"+k+"')");
		$(recordObj).val("");
	}
	sys_setEditCss("tableEdit",k);
	sys_setShowOrHide('tableEdit',k);
 }
	//alert("至少保留一笔记录，否则无法保存！");}
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
			if(tableType=="")tableType="空";
			if(delType=="")tableType="空";
			ajaxPost_pro_bat(96,document.getElementsByName("tableName")[0].value+"|"+ $(recordObj).val()+":del;|"+tableType+"|"+delType+"|删除");
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
		if(confirm("确定要删除吗")){
			var recordRealId=getManyObject();
			if(recordId.indexOf("空")>-1){
				alert("不能选择空行记录，请重新选择");
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
				ajaxPost_pro_bat(96,document.getElementsByName("tableName")[0].value+"|"+delStr+"|"+tableType+"|"+delType+"|删除");
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
                case 38: //上
                    tabIndex -= 100;
                    break;
                case 40: //下
                    tabIndex += 100;
                    break;
                case 37: //左(會導致輸入時無法使用左右移)
                    tabIndex--;
                    break;
                case 39: //右(會導致輸入時無法使用左右移)
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
			sys_setEditCss("tableView",sNo,field,"保存");
			sys_setShowOrHide('tableView',sNo,field);

		}
	}
	if(recordObj && $(recordObj).val()==''){
		valueStr=valueStr.replaceAll('\'','‘');
		valueStr=valueStr.replaceAll('"','“');
		var newId=ajaxPost_getInfo_noHidden(96,tableName+'|add;|'+fieldStr+'|'+valueStr+'|保存');

	
	//	alert(newId);
	//	alert(newId.indexOf("重新登陆"));
		if(newId.indexOf("失败")>-1 || newId.indexOf("重新登陆")>-1 ){
			alert("保存失败");
			window.location.reload();
		}
		$(recordObj).val(newId);
		//如果页面存在saveFun的隐藏域，则执行后调方法add
		
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+tableName+"','add','"+newId+"','"+sNo+"')");
		//window.location.reload();
	}else{
		//alert();
		//如果页面存在saveFun的隐藏域，则执行后调方法edit
		valueStr=valueStr.replaceAll('\'','‘');
		valueStr=valueStr.replaceAll('"','“');
		ajaxPost_pro_noInfo(96,tableName+'|'+$(recordObj).val()+':edit;|'+fieldStr+'|'+valueStr+'|保存');
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+tableName+"','edit','"+$(recordObj).val()+"','"+sNo+"')");
	}
	$("tr[id="+sNo+"]").attr('status','');//设置行状态
}

//批量保存
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
			sys_setEditCss("tableView",sNo,field,"保存");
			sys_setShowOrHide('tableView',sNo,field);

		}
	}
	if(recordObj && $(recordObj).val()==''){
		valueStr=valueStr.replaceAll('\'','‘');
		valueStr=valueStr.replaceAll('"','“');
		var newId=ajaxPost_getInfo_noHidden(96,tableName+'|add;|'+fieldStr+'|'+valueStr+'|保存');
	//	alert(newId);
	//	alert(newId.indexOf("重新登陆"));
		if(newId.indexOf("失败")>-1 || newId.indexOf("重新登陆")>-1 ){
			alert("保存失败");
			window.location.reload();
		}
		$(recordObj).val(newId);
		//如果页面存在saveFun的隐藏域，则执行后调方法add
		
		if(document.getElementsByName("saveFun")[0])eval(document.getElementsByName("saveFun")[0].value+"('"+tableName+"','add','"+newId+"','"+sNo+"')");
		//window.location.reload();
	}else{
		//alert();
		//如果页面存在saveFun的隐藏域，则执行后调方法edit
		valueStr=valueStr.replaceAll('\'','‘');
		valueStr=valueStr.replaceAll('"','“');
		ajaxPost_pro_noInfo(96,tableName+'|'+$(recordObj).val()+':edit;|'+fieldStr+'|'+valueStr+'|保存');
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
	if(realFileName!="" && realFileName!="无附件"){
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
	if(realFileName=="")realFileName="无附件";
	window.open("gettablerecordinfoservlet?action=viewDocInfo&templateId=upload&recordId="+recordId+"&$KEYWORD="+tableName+"|"+fieldName+"|"+sNo+"|"+realFileName+"&ITNO=1");
}

function dblEdit(rowId){
	//alert(aObj);
	$("tr[id="+rowId+"]").attr('status','edit');
	sys_setEditCss('tableEdit',rowId);
	sys_setShowOrHide('tableEdit',rowId);

	//双击回调方法
	if($("input[name='dblclick_callback']")){
		var funName=$("input[name='dblclick_callback']").val();
		if(funName && funName.length>0)
			eval(funName+"("+rowId+")");
	}
}
function OperateForCdno(addshow,editshow,delshow){
	var operateStr="";
	var add='<a href=\"javascript:dblEdit(#no#)\">编辑</a>&nbsp;';
	var add_edit='<a href=\"javascript:AddRows()\">添加</a>&nbsp;<a href=\"javascript:ajax_save(#no#);\">保存</a>&nbsp;';
	var edit='<a href=\"javascript:ajax_save(#no#);\">保存</a>&nbsp;';
	var del='<a href=\"javascript:DelCurrentRow(#no#,1,1);\">删除</a>&nbsp;';
	
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

//隐藏最后一列
function hideLastCol(tableId){
	var lastVal=$("#"+tableId+" tr:eq(1)").find("td:last").html();

	if(lastVal==''){
		$("#"+tableId+" thead tr").find('th:last').hide();
		$("#"+tableId+" tr").find('td:last').hide();
	}
}






/**参数说明：
 * 根据长度截取先使用字符串，超长部分追加…
 * str 对象字符串
 * len 目标字节长度
 * 返回值： 处理结果字符串
 */
function cutString(str, len) {
	//length属性读出来的汉字长度为1
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
