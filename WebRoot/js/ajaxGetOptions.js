/*自动获取页面搜索OPT选项*/
var req;

function changeSearchHtml(tableName,value){
  //alert(value);
  if(value.indexOf('$DAT')>0){
    var t ="<TD align=left id=\"searchHtml1\"> 开始时间:<input type=\"text\" size=\"10\" name=\"beginTime\" onclick=\"setday(this)\"> 结束时间：<input type=\"text\" size=\"10\" name=\"endTime\" onclick=\"setday(this)\"></td>";
    document.getElementById("searchHtml1").innerHTML=t;
    document.getElementById("searchHtml2").innerHTML='<TD align=right id="searchHtml2"><input type="hidden" name=\"soperate\" value="="></td>';  
  }
  else if(value.indexOf('$OPT')>0){
    var t="<TD align=right id=\"searchHtml1\"><SELECT size=\"1\" name=\"soperate\"><OPTION value=\"=\" selected>等于</OPTION></SELECT></td>"
	var v="<TD class=\"STYLE1\" align=right id=\"searchHtml2\">&nbsp;<INPUT type=\"text\" size=\"10\" name=\"searchValue\"></td>";
    document.getElementById("searchHtml1").innerHTML=t;
    getOPtionList(tableName,value.substring(0,value.length-4));
    //document.getElementById("searchHtml2").innerHTML=v;
  }else{
    var t="<SELECT size=\"1\" name=\"soperate\"><OPTION value=\"like\" selected>包含</OPTION><OPTION value=\"=\">等于</OPTION><OPTION value=\"<>\">不等于</OPTION><OPTION value=\">\">大于</OPTION> <OPTION value=\"<\">小于</OPTION> </SELECT>"  
	var v="<TD align=right id=\"searchHtml2\">&nbsp;<INPUT type=\"text\" size=\"10\" name=\"searchValue\"></td>";
    document.getElementById("searchHtml1").innerHTML=t;
    document.getElementById("searchHtml2").innerHTML=v;
  }
}

function getObjectValues(name)
{   
        var selectValue = "" ;
        var opt = document.form1.elements(name) ;
    //alert(document.tableForm.elements("remark").value);
        try
        {       opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                
                                selectValue =selectValue+"A"+ opt[i].value ;
								
                        }
                }                

        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue = opt.value;
                }
           }catch(err)
           {     
           }     
        }
        return selectValue ;
}

function getObjectValuesCondition(name)
{   
        var selectValue = "('" ;
		var t=0;
        var opt = document.form1.elements(name) ;
    //alert(document.tableForm.elements("remark").value);
        try
        {       opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                if(t==0){
								  selectValue =selectValue+ opt[i].value ;
								}else{
                                  selectValue =selectValue+"','"+ opt[i].value ;
                                }
								t++;
                        }
                }  
				selectValue=selectValue+"')";
				if(selectValue=="('')"){
				   selectValue="1=1";
				}else{
				  selectValue=name+" in "+selectValue;
				}

        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue = name+"='"+opt.value+"'";
                }
           }catch(err)
           {     
           }     
        }
        return selectValue ;
}

/*
 * Returns an new XMLHttpRequest object, or false if the browser
 * doesn't support it
 */
function newXMLHttpRequest() {

  var xmlreq = false;

  // Create XMLHttpRequest object in non-Microsoft browsers
  if (window.XMLHttpRequest) {
    xmlreq = new XMLHttpRequest();

  } else if (window.ActiveXObject) {

    try {
      // Try to create XMLHttpRequest in later versions
      // of Internet Explorer

      xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
      
    } catch (e1) {

      // Failed to create required ActiveXObject
      
      try {
        // Try version supported by older versions
        // of Internet Explorer
      
        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");

      } catch (e2) {

        // Unable to create an XMLHttpRequest by any means
        xmlreq = false;
      }
    }
  }

return xmlreq;
}


function getOPtionList(tableName,fieldName) {

	req = newXMLHttpRequest();

	var url="/ajaxgetoptionlist?tableName="+tableName+"&fieldName="+fieldName+"&time="+ Math.random();

	req.onreadystatechange = getOptionInfo;

	req.open("GET",url, true);

	req.send();
}


/*
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function getOptionInfo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var recordInfo=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
var updateName;
function getCheckBoxListBySqlNo(sqlNo,value,fieldName,un) {
    
	updateName=un;
	req = newXMLHttpRequest();
	//alert("sqlNo= "+sqlNo+" ; "+fieldName+" value = "+value);
	var url="/ajaxgetoptionlist?sqlNo="+sqlNo+"&checkboxNum="+value+"&fieldName="+fieldName+"&time="+ Math.random();

	req.onreadystatechange = getCheckBoxInfoBySqlNo;

	req.open("GET",url, false);

	req.send();
}
function getCheckBoxInfoBySqlNo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var selectInfo=req.responseText;
		 //alert("ssssssssssss = "+selectInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	     document.getElementById(updateName).innerHTML=selectInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
function getRadioListBySqlNo(sqlNo,value,fieldName,un) {
    
	updateName=un;
	req = newXMLHttpRequest();
	//alert("sqlNo= "+sqlNo+" ; "+fieldName+" value = "+value);
	var url="/ajaxgetoptionlist?sqlNo="+sqlNo+"&radioNum="+value+"&fieldName="+fieldName+"&time="+ Math.random();

	req.onreadystatechange = getRadioInfoBySqlNo;

	req.open("GET",url, false);

	req.send();
}
function getRadioInfoBySqlNo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var selectInfo=req.responseText;
		 //alert("ssssssssssss = "+selectInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	     document.getElementById(updateName).innerHTML=selectInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

function getOPtionListBySqlNo(sqlNo,value,fieldName) {
	
	req = newXMLHttpRequest();
	//alert("sqlNo= "+sqlNo+" ; "+fieldName+" value = "+value);
	var url="/ajaxgetoptionlist?sqlNo="+sqlNo+"&$KEYWORD="+value+"&fieldName="+fieldName+"&time="+ Math.random();
	req.onreadystatechange = getOptionInfoBySqlNo1;
	
	req.open("GET",url, false);

	req.send();
}

function getOptionInfoBySqlNo1() {


     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var selectInfo=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	 
	   document.getElementById('selectInfo').innerHTML=selectInfo;
		

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

var returnVal="";
function getOPtionListBySqlNoHaveDefValue(sqlNo,value,fieldName,selectedValue) {

	req = newXMLHttpRequest();
	//alert("sqlNo= "+sqlNo+" ; "+fieldName+" value = "+value);
	var url="/ajaxgetoptionlist?sqlNo="+sqlNo+"&$KEYWORD="+value+"&selectedValue="+selectedValue+"&fieldName="+fieldName+"&time="+ Math.random();
//alert(url);
	req.onreadystatechange = getOptionInfoBySqlNoHaveDefValue;

	req.open("GET",url, false);

	req.send();
	return returnVal;
}
function getOptionInfoBySqlNoHaveDefValue() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         returnVal=req.responseText;
		 //alert("ssssssssssss = "+selectInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

var upObj;
function getOPtionListBySqlNo_upId(sqlNo,value,fieldName,u) {
    upObj=u;
	req = newXMLHttpRequest();
	//alert("sqlNo= "+sqlNo+" ; "+fieldName+" value = "+value);
	var url="/ajaxgetoptionlist?sqlNo="+sqlNo+"&$KEYWORD="+value+"&fieldName="+fieldName+"&time="+ Math.random();

	req.onreadystatechange = getOptionInfoBySqlNo;

	req.open("GET",url, false);

	req.send();
}
function getOptionInfoBySqlNo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var selectInfo=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    document.getElementById(upObj).innerHTML=selectInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
//仅仅获取option，通用
var Obj_return;
function getOnlyOPtionListBySqlNo_upId(sqlNo,value) {
	req = newXMLHttpRequest();
	//alert("sqlNo= "+sqlNo+" ; "+fieldName+" value = "+value);
	var url="/ajaxgetoptionlist?sqlNo="+sqlNo+"&$KEYWORD="+value+"&time="+ Math.random();

	req.onreadystatechange = getOnlyOptionInfoBySqlNo;

	req.open("GET",url, false);

	req.send();
	return Obj_return;
}
function getOnlyOptionInfoBySqlNo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       if (req.status == 200) {
         Obj_return=req.responseText;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
///
var keyName;
function getInfoBySqlNo(sqlNo,keyWords,key) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	keyName=key;
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_One;

	req.open("GET",url, false);

	req.send();
}

function getInfoBySqlNo_One() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    document.getElementsByName(keyName)[0].value=info;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}




function getInfoBySqlNo_innerHTML(sqlNo,keyWords,key) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	keyName=key;
	req = newXMLHttpRequest();
	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_One_innerHTML;

	req.open("GET",url, false);

	req.send();
}

function getInfoBySqlNo_One_innerHTML() {

     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    document.getElementsByName(keyName)[0].innerHTML=info;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


function getMoreInfoBySqlNo(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_more;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_more() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 alert("ssssssssssss = "+info);return;
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%4==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		   if(tempList[0]=='合计'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=checknnuit&soperate=like&searchValue=");
		   }
		   else{
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=checknnuit&soperate==&searchValue="+tempList[0]);
		   }
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
///////////   自查专用  ////////

function getMoreInfoBySqlNoZc(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_moreZc;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_moreZc() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%6==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		   if(tempList[0]=='合计'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=Unit&soperate=like&searchValue=");
		   }
		   else{
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=Unit&soperate==&searchValue="+tempList[0]);
		   }
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 //alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

///////////   自查专用 区队快到期 ////////

function getMoreInfoBySqlNoZcqd(sqlNo,keyWords,cdno) {
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();
	

	req.onreadystatechange = getInfoBySqlNo_moreZcqd;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_moreZcqd() {
	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split("*");
		   var tl=t;
		   if(i!=0&&i%4==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		   tl=Replacestr(tl,"$VALUE3","&searchFieldName=id&soperate=in&searchValue="+tempList[2]);
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 //alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


///////////   三违专用  ////////

function getMoreInfoBySqlNoSw(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_moreSw;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_moreSw() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%6==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		   if(tempList[0]=='区队正在处理'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=next_step&soperate==&searchValue=2");
		   }
		   else if(tempList[0]=='科室录入三违'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=workgroupname&soperate==&searchValue=安检科");
		   }
		   else if(tempList[0]=='区队自查三违'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=workgroupname&soperate=<>&searchValue=安检科");
		   }
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 //alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

function getMoreInfoBySqlNoSwlb(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_moreSwlb;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_moreSwlb() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%6==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		   if(tempList[0]=='合计'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=branch&soperate=like&searchValue=");
		   }
		   else{
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=branch&soperate==&searchValue="+tempList[0]);
		   }
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 //alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

function Replacestr(str, pstr, pstr1)
{
while (str.indexOf(pstr) >= 0)
{
   str = str.replace(pstr,pstr1);
}
return str;
}


/*
自查隐患
*/
function getMoreInfoBySqlNo1(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_more1;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_more1() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%4==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		    if(tempList[0]=='区队正在处理'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=next_step&soperate==&searchValue=2");
		   }
		   else if(tempList[0]=='科室录入三违'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=workgroupname&soperate==&searchValue=安检科");
		   }
		   else if(tempList[0]=='区队自查三违'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=workgroupname&soperate=<>&searchValue=安检科");
		   }
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 //alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

function getMoreInfoBySqlNo_aqgp(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_more_aqgp;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_more_aqgp() {
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {

	
         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%3==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);	
		   tl=Replacestr(tl,"$VALUE5",tempList[2].split(","));
		   tl=Replacestr(tl,"$VALUE4",tempList[2].split(",")*document.getElementsByName("mvalue")[0].value);
		  
		   if(tempList[0]=='合计'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=shares_unit&soperate=like&searchValue=");

		   }
		   else{
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=shares_unit&soperate==&searchValue="+tempList[0]);
		   }
		   
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 
		 //alert("str="+str);
		 document.getElementById("branchCount").innerHTML=str;

		  //alert();


       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

function getMoreInfoBySqlNo_aqhb(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_more_aqhb;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_more_aqhb() {
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {

	
         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%5==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		   if(tempList[0]=='合计'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=unit&soperate=like&searchValue=");
		   }
		   else{
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=unit&soperate==&searchValue="+tempList[0]);
		   }
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 //alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

function getMoreInfoBySqlNo_aqzyz(sqlNo,keyWords,cdno) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&CDNO="+cdno+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_more_aqzyz;

	req.open("GET",url, true);

	req.send();
}
function getInfoBySqlNo_more_aqzyz() {
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {

	
         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
		 var infoList=info.split("|");
         var str="<table width=\"99%\" align=\"center\"  style=\"margin-top:1px;font-size:13px;\" ><tr height=\"20\">";
		 for(var i=0;i<infoList.length;i++){
           if(infoList[i]=='')continue;
	       var tempList=infoList[i].split(",");
		   var tl=t;
		   if(i!=0&&i%6==0){
		     str=str+"</tr><tr height=\"20\">";
		   }
           tl=Replacestr(tl,"$VALUE1",tempList[0]);
		   tl=Replacestr(tl,"$VALUE2",tempList[1]);
		   if(tempList[0]=='合计'){
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=navicert_unit&soperate=like&searchValue=");
		   }
		   else{
		     tl=Replacestr(tl,"$VALUE3","&searchFieldName=navicert_unit&soperate==&searchValue="+tempList[0]);
		   }
           str=str+tl;
		 }
		 str=str+"</tr></table>";
		 //alert(str);
		 document.getElementById("branchCount").innerHTML=str;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


//直接返回值，不带隐藏域
var returnKeyName;
function getInfoBySqlNo_noHidden(sqlNo,keyWords) {

    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);

	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = getInfoBySqlNo_One_noHidden;

	req.open("GET",url, false);

	req.send();
	return returnKeyName;
}
function ajaxPost_getInfo_noHidden(sqlNo,keyWords) {
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?sqlNo="+sqlNo+"&time="+ Math.random();
//alert(url);
	req.onreadystatechange = getInfoBySqlNo_One_noHidden;

	req.open("POST",url, false);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//	req.send("$KEYWORD="+keyWords);
	req.send("parSendPost=y&$KEYWORD="+encodeURIComponent(keyWords));
	return returnKeyName;
}



function getInfoBySqlNo_One_noHidden() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var info=req.responseText;
		 //alert("ssssssssssss = "+recordInfo);
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    returnKeyName=info;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


var sysCurId;
//获取通用标签页
function getJsonNavBySqlNo(jsonId,keyWords,curId) {
	sysCurId=curId;
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);

	req = newXMLHttpRequest();

	var url="/autogetinfoaction?jsonId="+jsonId+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = getJsonNavBySqlNo_callBack;

	req.open("GET",url, false);

	req.send();
	return returnKeyName;
}

function getJsonNavBySqlNo_callBack() {
// If the request's status is "complete"
	if (req.readyState == 4) {

		// Check that we received a successful response from the server
		if (req.status == 200) {

			// Pass the XML payload of the response to the handler function.
			var json=req.responseText;
			json=eval(json);
			var htmlStr="";
			for(var i=1; i<=json.length; i++){
				var realValue="";
				if(json[i-1].value)realValue=json[i-1].value;
				else realValue=json[i-1].name;

				if('sys_a_id'+i==sysCurId){
					htmlStr=htmlStr+'<a id="sys_a_id'+i+'" realNo="'+i+'" realName="'+json[i-1].name+'" realValue="'+realValue+'" href="javascript:setSysNav(\'sys_a_id'+i+'\')" class="active"><span>'+json[i-1].name+'</span></a>';
				}else{
					htmlStr=htmlStr+'<a id="sys_a_id'+i+'" realNo="'+i+'" realName="'+json[i-1].name+'" realValue="'+realValue+'" href="javascript:setSysNav(\'sys_a_id'+i+'\')" class=""><span>'+json[i-1].name+'</span></a>';
				}
			}  
			//alert("ssssssssssss = "+htmlStr);
			//alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
			returnKeyName=htmlStr;
		} else {
			// An HTTP problem has occurred
			alert("服务器监听中断");
		}
	}
}


//获取通用标签页
function getJsonNavBySqlNo_two(jsonId,keyWords,curId) {
	sysCurId=curId;
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);

	req = newXMLHttpRequest();

	var url="/autogetinfoaction?jsonId="+jsonId+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = getJsonNavBySqlNo_two_callBack;

	req.open("GET",url, false);

	req.send();
	return returnKeyName;
}

function getJsonNavBySqlNo_two_callBack() {
// If the request's status is "complete"
	if (req.readyState == 4) {

		// Check that we received a successful response from the server
		if (req.status == 200) {

			// Pass the XML payload of the response to the handler function.
			var json=req.responseText;
			json=eval(json);
			var htmlStr="";
			for(var i=1; i<=json.length; i++){
				var realValue="";
				if(json[i-1].value)realValue=json[i-1].value;
				else realValue=json[i-1].name;

				if('sys_a2_id'+i==sysCurId){
					htmlStr=htmlStr+'<a id="sys_a2_id'+i+'" realNo="'+i+'" realName="'+json[i-1].name+'" realValue="'+realValue+'" href="javascript:setSysNav2(\'sys_a2_id'+i+'\')" class="active"><span>'+json[i-1].name+'</span></a>';
				}else{
					htmlStr=htmlStr+'<a id="sys_a2_id'+i+'" realNo="'+i+'" realName="'+json[i-1].name+'" realValue="'+realValue+'" href="javascript:setSysNav2(\'sys_a2_id'+i+'\')" class=""><span>'+json[i-1].name+'</span></a>';
				}
			}  
			//alert("ssssssssssss = "+htmlStr);
			//alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
			returnKeyName=htmlStr;
		} else {
			// An HTTP problem has occurred
			alert("服务器监听中断");
		}
	}
}

//获取radio
var sysFormName;
var sysFormType;
var sysMaxLength;
var sysClickName="";
function getJsonRadioBySqlNo(jsonId,keyWords,formName,formType,maxLength,clickName) {
   // alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	sysFormName=formName;
	sysFormType=formType;
	sysMaxLength=maxLength;
	if(clickName && clickName!=""){
		sysClickName='onclick="'+clickName+'(this)"';
	}
	req = newXMLHttpRequest();

	var url="/autogetinfoaction?jsonId="+jsonId+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = getJsonRadioBySqlNo_callBack;

	req.open("GET",url, false);

	req.send();
	return returnKeyName;
}

function getJsonRadioBySqlNo_callBack() {
// If the request's status is "complete"
	if (req.readyState == 4) {

		// Check that we received a successful response from the server
		if (req.status == 200) {

			// Pass the XML payload of the response to the handler function.
			var json=req.responseText;
			json=eval(json);
			var htmlStr="";
			
			for(var i=0; i<json.length; i++){
				//alert(sysMaxLength);
				if((i+1)%sysMaxLength==0){
					htmlStr=htmlStr+'<input type="'+sysFormType+'" name="'+sysFormName+'" value="'+json[i].value+'" realText="'+json[i].name+'" '+sysClickName+'>'+json[i].name+'<br>';
				}else{
					htmlStr=htmlStr+'<input type="'+sysFormType+'" name="'+sysFormName+'" value="'+json[i].value+'" realText="'+json[i].name+'" '+sysClickName+'>'+json[i].name+'&nbsp;';
				}
				
			}  
			//alert("ssssssssssss = "+htmlStr);
			//alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
			returnKeyName=htmlStr;
		} else {
			// An HTTP problem has occurred
			alert("服务器监听中断");
		}
	}
}

//获取json
function getJsonBySqlNo(jsonId,keyWords) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);

	req = newXMLHttpRequest();

	var url="/autogetinfoaction?jsonId="+jsonId+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = getJsonBySqlNo_callBack;

	req.open("GET",url, false);

	req.send();
	return returnKeyName;
}

function getJsonBySqlNo_callBack() {
// If the request's status is "complete"
	if (req.readyState == 4) {

		// Check that we received a successful response from the server
		if (req.status == 200) {

			// Pass the XML payload of the response to the handler function.
			var json=req.responseText;
			
			//alert("ssssssssssss = "+htmlStr);
			//alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
			returnKeyName=json;
		} else {
			// An HTTP problem has occurred
			alert("服务器监听中断");
		}
	}
}
		