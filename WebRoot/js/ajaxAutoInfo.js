/*自动获取页面信息使用：支持多参数，页面只需要在对象元素上增加一个onchange事件getAutoInfoByField*/
function getValue(p){
  var list=p.split('|');
  var v='';
  for(var i=0;i<list.length ;i++){
	  //alert("list[i] = "+list[i]);
	if(document.getElementsByName(list[i])[0]==null){
	  alert("页面没有名字为："+list[i]+"的对象！");
      return '';
	}
	var t=document.getElementsByName(list[i])[0].value;
	if(jsTrim(t)==''){
	  return '';
	}
    v=v+t+'|';
  }
  v=v.substring(0,v.length-1);
  return v;

}



<!-- 培训班档案号验证 -->
function getAutoInfoByField1(type,tableName,fields,subId) {
    var keyWord=getValue(fields);
	if(keyWord==''){
	  return false;
	}
	if(type=='sub'){
	  type="&type="+subId;
	}else{
	  type="";
	}
	var req = newXMLHttpRequest();

	var url="/autogetinfoaction?tableName="+tableName+"&keyWord="+keyWord+type+"&time="+ Math.random();

	req.onreadystatechange = getReadyStateHandler(req, getAutoInfo1);

	req.open("GET",url, true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}


function getAutoInfo1(autoInfoXML) {
      //alert("!!!!!!!!!!!!!!!22222222222222");
	  var root = autoInfoXML.getElementsByTagName("ajaxFieldInfoList")[0];
	  //alert("!!!!!!!!!!!!!!!233333333333333333333333"+root);
	  var cInfo = root.getElementsByTagName("ajaxFieldInfo");
      //alert("!!!!!!!!!!!!!!!"+cInfo);
	  //alert("!!!!!!!!!!!!!!!"+cInfo.length);
	  if(cInfo.length==0){
	    alert("您输入的培训班档案号不存在，请确认后再输入！");
		document.getElementsByName('ARCHIVEID')[0].value='';
	  }
      for(var i=0;i<cInfo.length;i++){
        var cInfoObj=cInfo[i];
	    var fieldType=cInfoObj.getAttribute("fieldType");
		//alert("!!!!!!!!!!!!!!! fieldType = "+fieldType);
		var fieldName=cInfoObj.getAttribute("fieldName");
		//alert("!!!!!!!!!!!!!!! fieldName = "+fieldName);
	    var value=cInfoObj.getAttribute("value");
		//alert("!!!!!!!!!!!!!!! value = "+value);
		if(fieldType=='0'){
		  document.getElementsByName(fieldName)[0].value=value;
		}else{
		     switch(fieldType)
             {
                    case '1' : selectField(fieldName,value);
                                                 break ;
                    case '2' : mulSelectField(fieldName,value);
                                                 break ;
                    case '3' : checkBoxField(fieldName,value);
                                                 break ;
                    case '4' : radioField(fieldName,value);
                                                 break ;

            }
		}

      }
}


/*
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */


/* 员工档案号验证 */
function getAutoInfoByField(type,tableName,fields,subId) {
    var keyWord=getValue(fields);
	if(keyWord==''){
	  return false;
	}
	if(type=='sub'){
	  type="&type="+subId;
	}else{
	  type="";
	}
	var req = newXMLHttpRequest();

	var url="/autogetinfoaction?tableName="+tableName+"&keyWord="+keyWord+type+"&time="+ Math.random();

	req.onreadystatechange = getReadyStateHandler(req, getAutoInfo);

	req.open("GET",url, false);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}

/*
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function getAutoInfo(autoInfoXML) {
      //alert("!!!!!!!!!!!!!!!22222222222222");
	  var root = autoInfoXML.getElementsByTagName("ajaxFieldInfoList")[0];
	  //alert("!!!!!!!!!!!!!!!233333333333333333333333"+root);
	  var cInfo = root.getElementsByTagName("ajaxFieldInfo");
      //alert("!!!!!!!!!!!!!!!"+cInfo);
	  //alert("!!!!!!!!!!!!!!!"+cInfo.length);
	  if(cInfo.length==0){
	   // alert("系统没有找到与您输入相匹配的信息，请确认后再输入！");
	  }
      for(var i=0;i<cInfo.length;i++){
        var cInfoObj=cInfo[i];
	    var fieldType=cInfoObj.getAttribute("fieldType");
		//alert("!!!!!!!!!!!!!!! fieldType = "+fieldType);
		var fieldName=cInfoObj.getAttribute("fieldName");
		//alert("!!!!!!!!!!!!!!! fieldName = "+fieldName);
	    var value=cInfoObj.getAttribute("value");
		//alert("!!!!!!!!!!!!!!! value = "+value);
		if(fieldType=='0'){
		  document.getElementsByName(fieldName)[0].value=value;
		}else{
		     switch(fieldType)
             {
                    case '1' : selectField(fieldName,value);
                                                 break ;
                    case '2' : mulSelectField(fieldName,value);
                                                 break ;
                    case '3' : checkBoxField(fieldName,value);
                                                 break ;
                    case '4' : radioField(fieldName,value);
                                                 break ;

            }
		}

      }
}
/*证书发放员工成绩验证 */
function getAutoInfoByField2(type,tableName,fields,subId) {
    var keyWord=getValue(fields);
	if(keyWord==''){
	  return false;
	}
	if(type=='sub'){
	  type="&type="+subId;
	}else{
	  type="";
	}
	var req = newXMLHttpRequest();

	var url="/autogetinfoaction?tableName="+tableName+"&keyWord="+keyWord+type+"&time="+ Math.random();

	req.onreadystatechange = getReadyStateHandler(req, getAutoInfo2);

	req.open("GET",url, true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}


function getAutoInfo2(autoInfoXML) {
      //alert("!!!!!!!!!!!!!!!22222222222222");
	  var root = autoInfoXML.getElementsByTagName("ajaxFieldInfoList")[0];
	  //alert("!!!!!!!!!!!!!!!233333333333333333333333"+root);
	  var cInfo = root.getElementsByTagName("ajaxFieldInfo");
      //alert("!!!!!!!!!!!!!!!"+cInfo);
	  //alert("!!!!!!!!!!!!!!!"+cInfo.length);
	  if(cInfo.length==0){
	    alert("该员工没有进行过操行评定或成绩不合格，请确认后再输入！");
		document.getElementsByName('ARCHIVEID')[0].value='';
	  }
      for(var i=0;i<cInfo.length;i++){
        var cInfoObj=cInfo[i];
	    var fieldType=cInfoObj.getAttribute("fieldType");
		//alert("!!!!!!!!!!!!!!! fieldType = "+fieldType);
		var fieldName=cInfoObj.getAttribute("fieldName");
		//alert("!!!!!!!!!!!!!!! fieldName = "+fieldName);
	    var value=cInfoObj.getAttribute("value");
		//alert("!!!!!!!!!!!!!!! value = "+value);
		if(fieldType=='0'){
		  document.getElementsByName(fieldName)[0].value=value;
		}else{
		     switch(fieldType)
             {
                    case '1' : selectField(fieldName,value);
                                                 break ;
                    case '2' : mulSelectField(fieldName,value);
                                                 break ;
                    case '3' : checkBoxField(fieldName,value);
                                                 break ;
                    case '4' : radioField(fieldName,value);
                                                 break ;

            }
		}

      }
}

/* 优秀学员验证 */
function getAutoInfoByField3(type,tableName,fields,subId) {
    var keyWord=getValue(fields);
	if(keyWord==''){
	  return false;
	}
	if(type=='sub'){
	  type="&type="+subId;
	}else{
	  type="";
	}
	var req = newXMLHttpRequest();

	var url="/autogetinfoaction?tableName="+tableName+"&keyWord="+keyWord+type+"&time="+ Math.random();

	req.onreadystatechange = getReadyStateHandler(req, getAutoInfo3);

	req.open("GET",url, true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}


function getAutoInfo3(autoInfoXML) {
      //alert("!!!!!!!!!!!!!!!22222222222222");
	  var root = autoInfoXML.getElementsByTagName("ajaxFieldInfoList")[0];
	  //alert("!!!!!!!!!!!!!!!233333333333333333333333"+root);
	  var cInfo = root.getElementsByTagName("ajaxFieldInfo");
      //alert("!!!!!!!!!!!!!!!"+cInfo);
	  //alert("!!!!!!!!!!!!!!!"+cInfo.length);
	  if(cInfo.length==0){
	    alert("该员工没有进行过操行评定，请确认后再输入！");
		document.getElementsByName('ARCHIVESID')[0].value='';
	  }
      for(var i=0;i<cInfo.length;i++){
        var cInfoObj=cInfo[i];
	    var fieldType=cInfoObj.getAttribute("fieldType");
		//alert("!!!!!!!!!!!!!!! fieldType = "+fieldType);
		var fieldName=cInfoObj.getAttribute("fieldName");
		//alert("!!!!!!!!!!!!!!! fieldName = "+fieldName);
	    var value=cInfoObj.getAttribute("value");
		//alert("!!!!!!!!!!!!!!! value = "+value);
		if(fieldType=='0'){
		  document.getElementsByName(fieldName)[0].value=value;
		}else{
		     switch(fieldType)
             {
                    case '1' : selectField(fieldName,value);
                                                 break ;
                    case '2' : mulSelectField(fieldName,value);
                                                 break ;
                    case '3' : checkBoxField(fieldName,value);
                                                 break ;
                    case '4' : radioField(fieldName,value);
                                                 break ;

            }
		}

      }
}




function  selectField(fieldName,value){

  document.getElementsByName(fieldName)[0].value=value;
}
function mulSelectField(fieldName,value){
  var objselect=document.getElementsByName(fieldName)[0];
  for(var i=0;i<objselect.options.length;i++){
    if(value.indexOf(objselect.options[i].value)>=0)
    {
       objselect.options[i].selected = true;
    }
  } 
}
function checkBoxField(fieldName,value){
  var select=document.form1.elements(fieldName);
  try{        
	    select[0].checked;
  }catch(err){
		  try{
            select.checked=true;
          }catch(err){
		    alert("checkBoxField 当前没有记录！");
		  }
  }
  var size=select.length;
  for(var i=0;i<size;i++){
	if(value.indexOf(select[i].value)>=0){
        select[i].checked=true;
	}
  }
}
function radioField(fieldName,value){
  var select=document.form1.elements(fieldName);
  try{        
	    select[0].checked;
  }catch(err){
		  try{
            select.checked=true;
          }catch(err){
		    alert("radioField 当前没有记录！");
		  }
  }
  var size=select.length;
  for(var i=0;i<size;i++){
	if(value==select[i].value){
        select[i].checked=true;
		break;
	}
  }
}

//去空格
function jsTrim(str){
  str = str.replace(/(^\s*|\s*$)/g,"");
  return str;
}



function getAutoInfoByFieldxxy_zy(type,tableName,fields,subId) {
    var keyWord=fields;
	if(keyWord==''){
	  return false;
	}
	if(type=='sub'){
	  type="&type="+subId;
	}else{
	  type="";
	}
	var req = newXMLHttpRequest();

	var url="/autogetinfoaction?tableName="+tableName+"&keyWord="+keyWord+type+"&time="+ Math.random();

	req.onreadystatechange = getReadyStateHandler(req, getAutoInfoxxy_zy);

	req.open("GET",url, false);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}

/*
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function getAutoInfoxxy_zy(autoInfoXML) {
      //alert("!!!!!!!!!!!!!!!22222222222222");
	  var root = autoInfoXML.getElementsByTagName("ajaxFieldInfoList")[0];
	  //alert("!!!!!!!!!!!!!!!233333333333333333333333"+root);
	  var cInfo = root.getElementsByTagName("ajaxFieldInfo");
      //alert("!!!!!!!!!!!!!!!"+cInfo);
	  //alert("!!!!!!!!!!!!!!!"+cInfo.length);
	  if(cInfo.length==0){
	    alert("请刷新页面！");
		//document.getElementsByName('ARCHIVESID')[0].value='';
	  }
      for(var i=0;i<cInfo.length;i++){
        var cInfoObj=cInfo[i];
	    var fieldType=cInfoObj.getAttribute("fieldType");
		//alert("!!!!!!!!!!!!!!! fieldType = "+fieldType);
		var fieldName=cInfoObj.getAttribute("fieldName");
		//alert("!!!!!!!!!!!!!!! fieldName = "+fieldName);
	    var value=cInfoObj.getAttribute("value");
		//alert("!!!!!!!!!!!!!!! value = "+value);
		if(fieldType=='0'){
		  document.getElementsByName(fieldName)[0].value=value;
		
		 
		}else{
		     switch(fieldType)
             {
                    case '1' : selectField(fieldName,value);
                                                 break ;
                    case '2' : mulSelectField(fieldName,value);
                                                 break ;
                    case '3' : checkBoxField(fieldName,value);
                                                 break ;
                    case '4' : radioField(fieldName,value);
                                                 break ;

            }
		}

      }
	  
}
