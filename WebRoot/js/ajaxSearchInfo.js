var req;
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

function searchInfo(CDNO,tableName,webCondition,okey,otype,itNo) {

	req = newXMLHttpRequest();

	var url="/ajaxsearchaction?action=ajaxRecordList&tableName="+tableName+"&CDNO="+CDNO+"&webCondition="+webCondition+"&okey="+okey+"&otype="+otype+"&ITNO="+itNo+"&time="+ Math.random();

	req.onreadystatechange =  getCheckoutInfo;

	req.open("GET",url, false);

	//req.setRequestHeader("Cache-Control","no-cache");
	req.send();
}

//meili  2011/8/4  修改 
function searchInfoByUrl(url) {

	req = newXMLHttpRequest();

	//var url="/wfservlet?action=ajaxRecordList&tableName="+tableName+"&CDNO="+CDNO+"&webCondition="+webCondition;
    url=url+"&time="+ Math.random();
	req.onreadystatechange =  getCheckoutInfo;
	//alert(getCheckoutInfo);

	req.open("GET",url, true);

	//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}
/*
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function getCheckoutInfo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var recordInfo=req.responseText;
		 //alert("ssssssssssss = "+recordInfo.replace('导出EXCEL文件',''));
        // alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	     document.getElementById('aaa111').innerHTML=recordInfo;
         
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }

}


// meili 2011/8/4分页  不带导出excel报表
function searchInfo_noExcel(CDNO,tableName,webCondition,okey,otype,itNo) {

	req = newXMLHttpRequest();

	var url="/ajaxsearchaction?action=ajaxRecordList&tableName="+tableName+"&CDNO="+CDNO+"&webCondition="+webCondition+"&okey="+okey+"&otype="+otype+"&ITNO="+itNo+"&time="+ Math.random();

	req.onreadystatechange =  getCheckoutInfo_noExcel;

	req.open("GET",url, false);

	//req.setRequestHeader("Cache-Control","no-cache");
	req.send();
}
//meili  2011/8/4  评论
function getCheckoutInfo_noExcel() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var recordInfo=req.responseText;
		 //alert(recordInfo.replace('导出EXCEL文件',''));
        // alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	     document.getElementById('aaa111').innerHTML=recordInfo.replace('导出EXCEL文件','');
         
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }

}



// meili 2011/8/4分页  不带导出excel报表
var ajaxTableId;
function searchInfoForTableId_noExcel(CDNO,tableName,webCondition,okey,otype,itNo,tableId) {

	req = newXMLHttpRequest();
	ajaxTableId=tableId;
	var url="/ajaxsearchaction?action=ajaxRecordList&tableName="+tableName+"&CDNO="+CDNO+"&webCondition="+webCondition+"&okey="+okey+"&otype="+otype+"&ITNO="+itNo+"&time="+ Math.random();

	req.onreadystatechange =  getCheckoutInfo_forTableId_noExcel;

	req.open("GET",url, false);

	//req.setRequestHeader("Cache-Control","no-cache");
	req.send();
}
//meili  2011/8/4  评论
function getCheckoutInfo_forTableId_noExcel() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var recordInfo=req.responseText;
		 //alert(recordInfo.replace('导出EXCEL文件',''));
        // alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	     document.getElementById(ajaxTableId).innerHTML=recordInfo.replace('导出EXCEL文件','');
         
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }

}