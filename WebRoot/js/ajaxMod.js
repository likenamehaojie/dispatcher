/*AJAX����ģ��*/
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

//�첽����
function ajax_pro(sqlNo,keyWords) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&$KEYWORD="+keyWords+"&time="+ Math.random();

	req.onreadystatechange = run_pro;

	req.open("GET",url, false);

	req.send();
}


/*ddddd �첽����
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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
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
         alert("�����������ж�");
       }
     }
}



//  ͬ������
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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		if(noteInfo!="")alert(noteInfo);
		/* if(window.opener){
			 window.opener.location.reload();
		 }
		 window.location.reload();*/
       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		if(noteInfo.length!=0){
			//var noteInfo=req.responseText;
			if(noteInfo.indexOf("���µ�½")>-1 ){
				alert("����ʧ��");
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
         alert("�����������ж�");
       }
     }

}
//�ͱ�ϵͳ-���˷���̨��-��������ֶ�
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
		   alert("�޸�ʧ�ܣ�");
		   document.window.reload();
		 }

		 //window.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
       }
     }
}

//20100825 ���� �����Ų����ģ�飬��DT�����delete��ʱ����ʵ��update����del��ֵ��Ϊ1.
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
         alert("�����������ж�");
       }
     }
}


//ִ�в���ʾ
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


/* ִ�в���ʾ
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function run_pro_noInfo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {
			var noteInfo=req.responseText;
			if(noteInfo.indexOf("���µ�½")>-1 ){
				alert("����ʧ��");
				window.location.reload();
			}
       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		if(noteInfo.length>0)
			alert(noteInfo);
		 // window.close();
		 // window.location.reload();
		 window.opener.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
       }
     }
}

//20101119 ���� 
function ajax_pro_updateShares(sqlNo) {

	req = newXMLHttpRequest();

	var url="/ajaxupdateinfoaction?ajaxAction=AjaxDeal&sqlNo="+sqlNo+"&time="+ Math.random();

	req.onreadystatechange = run_pro_updateRecords;

	req.open("GET",url, true);

	req.send();
}



//meili  2011/8/4  �������� 

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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		// alert(noteInfo);
		 window.close();
		// window.opener.location.reload();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
       }
     }
}



//meili  2011/8/24  �����ļ���֮���iframeˢ��

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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		 alert(noteInfo);
		// window.close();
		 //window.parent.location.reload();
         window.returnValue='refresh';
		 window.close();
       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
       }
     }
}



//meili  2011/10/8 �޸Ŀͻ�״̬
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
		//   document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		// alert(noteInfo);
		 window.location.reload();
		// window.close();
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		 alert(noteInfo);
		 window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
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
		// document.getElementById('Infomessage').style.display='none';//�ر���ʾ��Ϣ
		// alert(noteInfo);
		 convertTip=noteInfo;
		// window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
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

		// alert("���³ɹ�");
		// window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
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

		 alert("ɾ���ɹ�");
		// window.location=gotoNewUrl;

       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
       }
     }
}
//���½�ɫȨ�ޣ���֤����굥λ����Լ�ʱ��¼
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

	var array=['�ɹ�','��λ���ʧ�ܣ�����ϵ����Ա��лл��','��ȡ��λ��ɫ�б�ʧ�ܣ�����ϵ����Ա��лл��','��ȡ��λ��ɫ�б�ʧ�ܣ�����ϵ����Ա��лл��','������ȡʧ��'];
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
         alert("�����������ж�");
       }
     }
}

//ɾ����λʱ��ɾ����ɫsession
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

	var array=['�ɹ�','ɾ��ʧ�ܣ�����ϵ����Ա��лл��','������ȡʧ��'];
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
         alert("�����������ж�");
       }
     }
}


/*ddddd
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function return_ajax_updateRoleByCommId() {

	var array=['�ɹ�','��λ���ʧ�ܣ�����ϵ����Ա��лл��','��ȡ��λ��ɫ�б�ʧ�ܣ�����ϵ����Ա��лл��','��ȡ��λ��ɫ�б�ʧ�ܣ�����ϵ����Ա��лл��','������ȡʧ��'];
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
         alert("�����������ж�");
       }
     }
}

//���ݽڵ���½�ɫ�ڴ�   ajaxAction=reloadRoleItno��reloadName=roleId-ITNO|roleId-ITNO|roleId-ITNO
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

	var array=['����ɹ���','����ʧ�ܣ�','reloadName��ʽ������ȷ��ʽ�磺��a-b|a-b|...��'];
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
         alert("�����������ж�");
       }
     }
}


//���ݽڵ���½�ɫ�ڴ�   ajaxAction=reloadRoleItno��reloadName=roleId-ITNO|roleId-ITNO|roleId-ITNO
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

	var array=['ɾ���ɹ�','ɾ��ʧ��','����Ϊ��'];
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
         alert("�����������ж�");
       }
     }
}



//���ݽڵ���½�ɫ�ڴ�   ajaxAction=reloadRoleItno��reloadName=roleId-ITNO|roleId-ITNO|roleId-ITNO
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

	var array=['���³ɹ�','reloadName��ʽ������ȷ��ʽ�磺��a-b|a-b|...��'];
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
         alert("�����������ж�");
       }
     }
}



//���°�ť�б�
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

	var array=['���³ɹ�','����ʧ��'];
     // If the request's status is "complete"
     if (req.readyState == 4) {
       // Check that we received a successful response from the server
       if (req.status == 200) {
		 var noteInfo=req.responseText;
		
			alert(array[0]);
		
		// window.location=gotoNewUrl;
       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
       }
     }
}