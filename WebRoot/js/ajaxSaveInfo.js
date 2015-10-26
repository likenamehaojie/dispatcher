function saveInfo(type,tableName,recordId,fieldName,key,fType) {

	var fieldValue="";
	if(type=='main'){
	  fieldValue=document.getElementsByName(fieldName)[0].value;
	}else{
	  fieldValue=document.getElementsByName(fieldName+recordId)[0].value;
	}
    if(fType=='DAT'){
      var ms=saveCheckDAT(fieldValue);
	  if(ms!=''){
	    alert(ms);
		return false;
	  }
	}else if(fType=='NUM'){
      if(!saveCheckIsNumber(fieldValue)){
	    alert(fieldValue+" 非数字类型，不能输入！");
	    return false;
	  }
	}
	var req = newXMLHttpRequest();

	var url="/ajaxsaveinfoaction?tableName="+tableName+"&recordId="+recordId+"&fieldName="+fieldName+"&fieldValue="+fieldValue+"&tableKey="+key+"&type="+type;

	req.onreadystatechange = getReadyStateHandler(req, getCheckoutInfo);

	req.open("GET",url, true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}

function saveSubInfo(fieldValue,tableName,recordId,fieldName,key,fType) {

	//var fieldValue=document.getElementsByName(fieldName)[0].value;
    alert("fieldValue = "+fieldValue);
    return false;
	var req = newXMLHttpRequest();

	var url="/ajaxsaveinfoaction?tableName="+tableName+"&recordId="+recordId+"&fieldName="+fieldName+"&fieldValue="+fieldValue+"&tableKey="+key;

	req.onreadystatechange = getReadyStateHandler(req, getCheckoutInfo);

	req.open("GET",url, true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}

function saveCheckDAT(value) //时间类型(YYYY-MM-DD)
{
				var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
				var r=value.match(reg);
                if(jsTrim(value)==""||jsTrim(value)=="&nbsp;")
                {
                   return "日期不能为空!(YYYY-MM-DD)";
                }
				else if(r==null)
				{
					//message_list += "日期类型有错";
					return "日期类型有错!(YYYY-MM-DD)";
				}
				else
				{
					var y=value.substring(0,4);
					var m=value.substring(5,7);
					var d=value.substring(8,10);
					return saveVerifyDate(y,m,d);

				}
				return "";

}

function saveVerifyDate(year,month,day)
{
	//判断日期是否合理
	var message_list="";
	if(month<1 | month>12 )
	{
	        return "输入日期非法!(YYYY-MM-DD)" ;
	}
    	if(month==1 | month==3 |month==5 |month==7 | month==8 |month==10 |month==12)
    	{
	        if(day > 31 | day<1)
	        {
		        return "输入日期非法!(YYYY-MM-DD)" ;
	        }
	}else if( month==4 |month==6 |month==9 | month==11)
	{
	        if(day > 30 | day<1)
	        {
		        return "输入日期非法!(YYYY-MM-DD)" ;
	        }
	}else if (month==2)
	{
	        //若为闰年，则日期不能大于29
	        if((year%400 == 0)|(year%100 !=0 && year%4 == 0))
	        {
	            	if(day > 29 | day<1)
	            	{
			        	return "输入日期非法!(YYYY-MM-DD)" ;
	            	}
	        }
	        else
	        {//一般月份不可大于28日
	            	if(day > 28 | day<1)
	            	{
						return "输入日期非法!(YYYY-MM-DD)" ;
	            	}
	        }
	}
	return "";
}

function saveCheckIsNumber(value)
{
        var temp = "0123456789" ;
        var dotCount = 0 ;
        value = ""+value ;
        for(var i=0,m=value.length;i<m;i++)
        {
                if(value.charAt(i) == '.')
                {
                        dotCount++ ;
                        continue ;
                }
                if(temp.indexOf(value.charAt(i))<0)
                {
                        return false ;
                }
        }
        if(dotCount>1)
        {
                return false ;
        }
        return true ;
}
/*
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function getCheckoutInfo(ajaxSafeInfo) {
	  var cInfo = ajaxSafeInfo.getElementsByTagName("ajaxSafeInfo")[0];
	  var fieldName=cInfo.getAttribute("fieldName");
	  var returnInfo=cInfo.getAttribute("returnInfo");
	  if(returnInfo=="true"){
          alert("修改成功！");
		  objectTxt(fieldName);
	  }else{
	      alert("修改失败！");
	  }
}
/*
             流程过程中修改记录
*/

function objectTxt(field){
    var value=document.getElementsByName(field)[0].value;
	var info = document.getElementById(field+'id');
    info.innerHTML=value;
	var recordId=document.getElementsByName("recordId")[0].value;
	if(window.opener.document.getElementById(field+recordId)!=null){
      window.opener.document.getElementById(field+recordId).innerHTML=value;
	}
	return false;
  }



 function   updateField(obj,field,tableKey,fType)   
  {   
  
  var tableName=document.getElementsByName("tableName")[0].value;
  var recordId=document.getElementsByName("recordId")[0].value;
  obj.bgColor="";   
  obj.innerHTML="<input size=\"20\" type=\"text\"   name=\""+field+"\"   value=\""   +   obj.innerText   +   "\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"保存\" onClick=\"saveInfo('main','"+tableName+"','"+recordId+"','"+field+"','"+tableKey+"','"+fType+"')\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"取消\" onClick=\"window.location.reload()\">"   
  document.getElementsByName(field)[0].focus();
  } 
  function   updateSubField(obj,field,tableKey,tableName,rId,fType)   
  {   
  //alert(field);
  obj.bgColor="";   
  obj.innerHTML="<input  size=\"10\" type=\"text\"   name=\""+field+rId+"\"   value=\""   +   obj.innerText   +   "\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"保存\" onClick=\"saveInfo('sub','"+tableName+"','"+rId+"','"+field+"','"+tableKey+"','"+fType+"')\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"取消\" onClick=\"window.location.reload()\">"   
  }

 function   updateFieldTXTA(obj,field,tableKey,fType,rows,cols,rRows,rCols)   
  {   
  
  var tableName=document.getElementsByName("tableName")[0].value;
  var recordId=document.getElementsByName("recordId")[0].value;
  obj.bgColor="";   
  obj.innerHTML="<textarea rows=\""+rows+"\" name=\""+field+"\" class=\"box0\" cols=\""+cols+"\" onkeydown=\"javascript:font(this,"+rRows+","+rCols+")\" onkeyup=\"javascript:font(this,"+rRows+","+rCols+")\" >"+obj.innerText+"</textarea><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"保存\" onClick=\"saveInfo('main','"+tableName+"','"+recordId+"','"+field+"','"+tableKey+"','"+fType+"')\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"取消\" onClick=\"window.location.reload()\">" 
  document.getElementsByName(field)[0].focus();
  // alert(obj.innerHTML);alert(obj.innerText);
  } 
  function   updateSubFieldTXTA(obj,field,tableKey,tableName,rId,fType,rows,clos,rRows,rCols)   
  {   
  //alert(field);
  obj.bgColor="";   
  obj.innerHTML="<textarea rows=\""+rows+"\" name=\""+field+rId+"\" class=\"box0\" cols=\""+cols+"\" onkeydown=\"javascript:font(this,"+rRows+","+rCols+")\" onkeyup=\"javascript:font(this,"+rRows+","+rCols+")\" >"+obj.innerText+"</textarea><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"保存\" onClick=\"saveInfo('sub','"+tableName+"','"+rId+"','"+field+"','"+tableKey+"','"+fType+"')\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"取消\" onClick=\"window.location.reload()\">"  
  }
 function   updateFieldOPT(obj,field,tableKey,sqlNo)   
  {  
  
  var tableName=document.getElementsByName("tableName")[0].value;
  var recordId=document.getElementsByName("recordId")[0].value;
  obj.bgColor="";   
  obj.innerHTML=getOPtionListBySqlNoHaveDefValue(sqlNo,'k',field,jsTrim(obj.innerText))+"<input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"保存\" onClick=\"saveInfo('main','"+tableName+"','"+recordId+"','"+field+"','"+tableKey+"','OPT')\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"取消\" onClick=\"window.location.reload()\">"  
  } 
  function   updateSubFieldOPT(obj,field,tableKey,tableName,rId,sqlNo)   
  {   
  //alert(field);
  obj.bgColor="";   
  obj.innerHTML=getOPtionListBySqlNoHaveDefValue(sqlNo,'k',field+rId,jsTrim(obj.innerText))+"<input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"保存\" onClick=\"saveInfo('sub','"+tableName+"','"+rId+"','"+field+"','"+tableKey+"','OPT')\"><input name=\"Submit\" type=\"button\" class=\"submit_select\" value=\"取消\" onClick=\"window.location.reload()\">"  
  }

