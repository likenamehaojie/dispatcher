var req;
function checkUnique(tableName,fieldName,fieldValue) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	req = newXMLHttpRequest();

	var url="/ajaxcheckunique?tableName="+tableName+"&fieldName="+fieldName+"&fieldValue="+fieldValue+"&time="+ Math.random();

	req.onreadystatechange = getUniqueInfo;

	req.open("GET",url, false);

	req.send();
}

function checkUnique_sub(tableName,fieldName,fieldValue,id) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	req = newXMLHttpRequest();

	var url="/ajaxcheckunique?tableName="+tableName+"&fieldName="+fieldName+"&fieldValue="+fieldValue+"&id="+id+"&time="+ Math.random();

	req.onreadystatechange = getUniqueInfo;

	req.open("GET",url, false);

	req.send();
}

/*
 * Update changeInfo area of page to reflect contents of page
 * described in XML document.
 */
function getUniqueInfo() {

	
     // If the request's status is "complete"
     if (req.readyState == 4) {
       
       // Check that we received a successful response from the server
       if (req.status == 200) {

         // Pass the XML payload of the response to the handler function.
         var recordInfo=req.responseText;
		 var name=recordInfo.substring(0,recordInfo.indexOf('|'));
		 var value=recordInfo.substring(recordInfo.indexOf('|')+1);
		 //alert("ssssssssssss = |"+recordInfo+"|");
         //alert("name = "+name+" value = "+value);
		 if(value!=''){
           document.getElementsByName(name)[0].value=value;
		 }
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;
          //return recordInfo;
       } else {

         // An HTTP problem has occurred
         alert("·þÎñÆ÷¼àÌýÖÐ¶Ï");
       }
     }


}