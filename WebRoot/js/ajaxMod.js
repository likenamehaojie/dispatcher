/*AJAX处理模板*/
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

//异步处理
function ajax_pro(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro;

	req.open("GET",url, false);

	req.send();
}


/*ddddd 异步处理
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		if(noteInfo!="")alert(noteInfo);
		if(window.opener){
				
			 window.opener.location.reload();
			 window.close();
		} //window.dialogArguments.location.reload();
		if(window.dialogArguments){
			 window.dialogArguments.location=window.dialogArguments.location;
			 window.close();
		}

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}



//  同步处理
function ajax_pro_wait(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro_wait;

	req.open("GET",url, false);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_wait() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		if(noteInfo!="")alert(noteInfo);
		/* if(window.opener){
			 window.opener.location.reload();
		 }
		 window.location.reload();*/
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
//
function ajax_pro_bat(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro_bat;

	req.open("GET",url, false);

	req.send();
}
function ajaxPost_pro_bat(sqlNo,keyWords) {
	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&time="+ Math.random();
//alert(url);
	req.onreadystatechange = run_pro_bat;

	req.open("POST",url, false);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//	req.send("$KEYWORD="+keyWords);
	req.send("parSendPost=y&$KEYWORD="+encodeURIComponent(keyWords));
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_bat() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		if(noteInfo.length!=0){
			//var noteInfo=req.responseText;
			if(noteInfo.indexOf("重新登陆")>-1 ){
				alert("操作失败");
				window.location.reload();
			}else{
				alert(noteInfo);
			}
		}
		

		 //window.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }

}
//劳保系统-个人发放台帐-更新身高字段
var tz_id,val,field_n;
function ajax_pro_tz(sqlNo,keyWords,rid,field) {
    tz_id=rid;
	val=keyWords;
	field_n=field;
	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"|"+rid+"&time="+ Math.random();

	req.onreadystatechange = run_pro_tz;

	req.open("GET",url, true);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_tz() {
    
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		 if(noteInfo!=''){	//alert(u1+"         "+u2);
           alert(req.responseText);
		   document.getElementById(field_n+tz_id).innerHTML=val;
		   upVal=val;
	     }else{
		   alert("修改失败！");
		   document.window.reload();
		 }

		 //window.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

//20100825 胡赫 隐患排查管理模块，对DT表进行delete的时候，其实是update，把del的值改为1.
function ajax_pro_updateRecords(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro_updateRecords;

	req.open("GET",url, true);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_updateRecords() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		 if(noteInfo!='')alert(noteInfo);
		 window.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


//执行不提示
function ajax_pro_noInfo(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro_noInfo;

	req.open("GET",url, false);

	req.send();
}
function ajaxPost_pro_noInfo(sqlNo,keyWords) {
	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&time="+ Math.random();
//alert(url);
	req.onreadystatechange = run_pro_noInfo;

	req.open("POST",url, false);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//	req.send("$KEYWORD="+keyWords);
	req.send("parSendPost=y&$KEYWORD="+encodeURIComponent(keyWords));
}

function ajaxPost_pro(sqlNo,keyWords) {
	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&time="+ Math.random();
//alert(url);
	//req.onreadystatechange = run_pro_noInfo;

	req.open("POST",url, false);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//	req.send("$KEYWORD="+keyWords);
	req.send("parSendPost=y&$KEYWORD="+encodeURIComponent(keyWords));
}


/* 执行不提示
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_noInfo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {
			var noteInfo=req.responseText;
			if(noteInfo.indexOf("重新登陆")>-1 ){
				alert("操作失败");
				window.location.reload();
			}
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

function app_windows_close(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	//req.onreadystatechange = run_pro_windows_close;

	req.open("GET",url, false);

	req.send();
}


function ajax_pro_alert(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro_alert;

	req.open("GET",url, true);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_alert() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		if(noteInfo.length>0)
			alert(noteInfo);
		 // window.close();
		 // window.location.reload();
		 window.opener.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

//20101119 胡赫 
function ajax_pro_updateShares(sqlNo) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&time="+ Math.random();

	req.onreadystatechange = run_pro_updateRecords;

	req.open("GET",url, true);

	req.send();
}



//meili  2011/8/4  发表评论 

//
function ajax_pro_discuss(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();
	//alert(url);

	req.onreadystatechange = run_pro1;

	req.open("GET",url, true);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro1() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		// alert(noteInfo);
		 window.close();
		// window.opener.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}



//meili  2011/8/24  创建文件夹之后的iframe刷新

//
function ajax_pro_refresh(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro_refresh;

	req.open("GET",url, true);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_refresh() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		 alert(noteInfo);
		// window.close();
		 //window.parent.location.reload();
         window.returnValue='refresh';
		 window.close();
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}



//meili  2011/10/8 修改客户状态
function ajax_pro_noAlert(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro_noAlert;

	req.open("GET",url, true);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_noAlert() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// if(document.getElementById('Infomessage'))
		//   document.getElementById('Infomessage').style.display='none';//关闭提示信息
		// alert(noteInfo);
		 window.location.reload();
		// window.close();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

var gotoNewUrl;
function ajax_proGoUrl(sqlNo,keyWords,newUrl) {
	gotoNewUrl=newUrl;
	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_proGoUrl;

	req.open("GET",url, true);

	req.send();
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_proGoUrl() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		 alert(noteInfo);
		 window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}



var convertTip="";
function ajax_convert(DocName,conName) {

	req = newXMLHttpRequest();

	var url="/docConverterServlet.do?ajaxAction=convert&DocName="+DocName+"&conName="+conName+"&time="+ Math.random();
   // alert(url);
    req.onreadystatechange = return_convert;
	req.open("GET",url, false);

	req.send();
	return convertTip;
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_convert() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var noteInfo=req.responseText;
		  //alert("1111111111:"+noteInfo);
		// document.getElementById('Infomessage').style.display='none';//关闭提示信息
		// alert(noteInfo);
		 convertTip=noteInfo;
		// window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


function ajax_UpdateXML(xmlRadio,xmlID) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction="+xmlRadio+"&reloadName="+xmlID+"&time="+ Math.random();

   // alert(url);
    req.onreadystatechange = return_updateXML;
	req.open("post",url, true);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_updateXML() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

		// alert("更新成功");
		// window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
function ajax_deleteCache() {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=deleteCache&time="+ Math.random();

   // alert(url);
    req.onreadystatechange = return_deleteCache;
	req.open("post",url, true);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_deleteCache() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

		 alert("删除成功");
		// window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}
//更新角色权限，保证添加完单位后可以即时登录
function ajax_updateRoleByCommId(commId,cType) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=addCommunityRoleInfo&cId="+commId+"&CommunityType="+cType+"&time="+ Math.random();

  // alert(url);
    req.onreadystatechange = return_ajax_updateRoleByCommId;
	req.open("get",url, false);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_updateRoleByCommId() {

	var array=['成功','单位添加失败，请联系管理员，谢谢！','获取单位角色列表失败，请联系管理员，谢谢！','获取单位角色列表失败，请联系管理员，谢谢！','参数获取失败'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;
		 if(noteInfo!=0){
			alert(array[noteInfo]);
		 }
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

//删除单位时，删除角色session
function ajax_deleteRoleByCommId(commId) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=deleteCommunityRoleInfo&cId="+commId+"&time="+ Math.random();

   //alert(url);
    req.onreadystatechange = return_ajax_deleteRoleByCommId;
	req.open("get",url, false);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_deleteRoleByCommId() {

	var array=['成功','删除失败，请联系管理员，谢谢！','参数获取失败'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;//alert("noteInfo:"+noteInfo);
		 if(noteInfo!=0){
		//	alert(array[noteInfo]);
		 }
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_updateRoleByCommId() {

	var array=['成功','单位添加失败，请联系管理员，谢谢！','获取单位角色列表失败，请联系管理员，谢谢！','获取单位角色列表失败，请联系管理员，谢谢！','参数获取失败'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;
		 if(noteInfo!=0){
			alert(array[noteInfo]);
		 }
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}

//根据节点更新角色内存   ajaxAction=reloadRoleItno；reloadName=roleId-ITNO|roleId-ITNO|roleId-ITNO
function ajax_updateIdentify(reloadName) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=reloadRoleItno&reloadName="+reloadName+"&time="+ Math.random();

   //alert(url);
    req.onreadystatechange = return_ajax_updateIdentify;
	req.open("get",url, false);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_updateIdentify() {

	var array=['保存成功！','更新失败！','reloadName格式错误！正确格式如：【a-b|a-b|...】'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;
		 if(noteInfo!=0){
			alert(array[noteInfo]);
		 }
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}


//根据节点更新角色内存   ajaxAction=reloadRoleItno；reloadName=roleId-ITNO|roleId-ITNO|roleId-ITNO
function ajax_deleteIdentify(ITNO) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=deleteReloadRoleItno&reloadName="+ITNO+"&time="+ Math.random();

   //alert(url);
    req.onreadystatechange = return_ajax_deleteIdentify;
	req.open("get",url, true);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_deleteIdentify() {

	var array=['删除成功','删除失败','参数为空'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;
		 if(noteInfo!=0){
			alert(array[noteInfo]);
		 }
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}



//根据节点更新角色内存   ajaxAction=reloadRoleItno；reloadName=roleId-ITNO|roleId-ITNO|roleId-ITNO
function ajax_deleteIdentifyByRoleId(reloadName) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=deleteReloadRoleItnoByRoleId&reloadName="+reloadName+"&time="+ Math.random();

   //alert(url);
    req.onreadystatechange = return_ajax_deleteIdentifyByRoleId;
	req.open("get",url, true);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_deleteIdentifyByRoleId() {

	var array=['更新成功','reloadName格式错误！正确格式如：【a-b|a-b|...】'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;
		 if(noteInfo!=0){
			alert(array[noteInfo]);
		 }
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}



//更新按钮列表
function ajax_reloadBtnCombInfo() {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=reloadBtnCombInfo&time="+ Math.random();

   //alert(url);
    req.onreadystatechange = return_ajax_reloadBtnCombInfo;
	req.open("get",url, true);

	req.send();
}
/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_reloadBtnCombInfo() {

	var array=['更新成功','更新失败'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;
		
			alert(array[0]);
		
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("服务器监听中断");
       }
     }
}