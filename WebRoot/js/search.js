function formFeed(nextPage)
{ 
  var url=document.getElementsByName("urlaaa")[0].value;
  url = url.replace('nextPage.value',nextPage.value);
 // alert(url);
  ajaxServlet(url); 
}
function ajaxServlet(url){
  //alert("url = "+url);
  searchInfoByUrl(url);
}
function checkValue(cdno,tableName,itNo){
  //alert("ssssss !!! ");
  var selectValue = -1 ;
  var size = 0 ;
  var sql="";
  var opt = document.getElementsByName("f_id");
        try
        {      
		        opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
                                selectValue = parseInt(opt[i].value) ;
                                //alert("selectValue = "+selectValue);
								var fieldValue=document.getElementsByName("field"+selectValue)[0].value;
								//alert("fieldValue = "+fieldValue);
								var returnvalue=sqlValue(fieldValue);
								if(returnvalue!=false){
								  if(size==1){
								    sql=sql+returnvalue;
                                  }else{
								    sql=sql+" and "+returnvalue;
								  }
								}else{
								  return false;
								}
								//alert("sql = "+sql);
                        }
                }                
                if(size <= 0 )
                {
                        alert("��ѡ����Ҫ������������");
                        selectValue = -1 ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue = parseInt(opt.value );
                }
                else
                {
                        alert("��ѡ����Ҫ������������");
						selectValue = -1 ;
                }
           }catch(err)
           {     
             alert("û������������ѡ���������Ա��ϵ��");
		     selectValue = 0 ;
           }     
        }
		if(selectValue>0){
          okey=getRadioValue("okey")
		  otype=getRadioValue("otype");
		  //alert("okey = "+okey+" otype= "+otype);
		  searchInfo(cdno,tableName,sql,okey,otype,itNo);
		}else{
		  return false;
		}

}
//��������
function checkValue_sql(){
  //alert("ssssss !!! ");
  var selectValue = -1 ;
  var size = 0 ;
  var sql="";
  var opt = document.getElementsByName("f_id");
        try
        {      
		        opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
                                selectValue = parseInt(opt[i].value) ;
                                //alert("selectValue = "+selectValue);
								var fieldValue=document.getElementsByName("field"+selectValue)[0].value;
								//alert("fieldValue = "+"field"+selectValue);
								var returnvalue=sqlValue(fieldValue);
								if(returnvalue!=false){
								  if(size==1){
								    sql=sql+returnvalue;
                                  }else{
								    sql=sql+"and "+returnvalue;
								  }
								}else{
								  return false;
								}
								//alert("sql = "+sql);
                        }
                }                
                if(size <= 0 )
                {
                        //alert("11��ѡ����Ҫ������������");
                        selectValue = -1 ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
						var fieldValue=document.getElementsByName("field1")[0].value;
                   
						var returnvalue=sqlValue(fieldValue);
						selectValue=1;
						
						sql=sql+returnvalue;
                }
                else
                {
                        //alert("22��ѡ����Ҫ������������");
						selectValue = -1 ;
                }
           }catch(err)
           {     
             alert("û������������ѡ���������Ա��ϵ��");
		     selectValue = 0 ;
           }     
        }
		if(selectValue>0){
          return sql;
		  //searchInfo(cdno,tableName,sql,okey,otype,itNo);
		}else{
		  return "1=1";
		}

}

//�������������Ҫ�õ�defaultvalue�����⴦��
function checkValue_dv(cdno,tableName,itNo){
  //alert("ssssss !!! ");
  var selectValue = -1 ;
  var size = 0 ;
  var sql="";
  var opt = document.getElementsByName("f_id");
        try
        {      
		        opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
                                selectValue = parseInt(opt[i].value) ;
                                //alert("selectValue = "+selectValue);
								var fieldValue=document.getElementsByName("field"+selectValue)[0].value;
								//alert("fieldValue = "+fieldValue);
								var returnvalue=sqlValue(fieldValue);
								if(returnvalue!=false){
								  if(size==1){
								    sql=sql+returnvalue;
                                  }else{
								    sql=sql+"and "+returnvalue;
								  }
								}else{
								  return false;
								}
								//alert("sql = "+sql);
                        }
                }                
                if(size <= 0 )
                {
                        alert("��ѡ����Ҫ������������");
                        selectValue = -1 ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue = parseInt(opt.value );
                }
                else
                {
                        alert("��ѡ����Ҫ������������");
						selectValue = -1 ;
                }
           }catch(err)
           {     
             alert("û������������ѡ���������Ա��ϵ��");
		     selectValue = 0 ;
           }     
        }
		if(selectValue>0){
          okey=getRadioValue("okey")
		  otype=getRadioValue("otype");
		  //alert("okey = "+okey+" otype= "+otype);
		  searchInfo_dv(cdno,tableName,sql,okey,otype,itNo);
		}else{
		  return false;
		}

}

function getRadioValue(obj){
  //alert("ssssss !!! ");
  var selectValue = 'n' ;
  var size = 0 ;
  var sql="";
  var opt = document.getElementsByName(obj);
        try
        {      
		        opt[0].checked
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                              size++;  
							  selectValue = opt[i].value;
                              //alert("radio value = "+selectValue);
							  break;
                        }
                }                

        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue =opt.value;
                }

           }catch(err)
           {     
              alert("���󲻴��� �� "+obj);
           }     
        }
		return selectValue;
}

function sqlValue(value)
{
        var message_list = "" ;
        value +="|" ;//  to make the string fit for verify
        var name="" ;
        var showName = "" ;
        var type = "" ;
        var length = 0 ;
        //begin go divide all datas
        var position = 0 ; // total | count
        var firstPosition = -1 ;
        var lastPosition  = -1 ;
        for(var i=0,m=value.length;i<m;i++)
        {
                if( value.charAt(i) == '|' )
                {
                        firstPosition = lastPosition+1 ;
                        lastPosition = i ;
                        if(firstPosition != -1 )
                        {
                                switch(position)
                                {
                                        case 0 : name = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 1 : showName = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 2 : type = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 3 : length = value.substring(firstPosition,lastPosition) ;
                                                 break ;

                                }
                                position ++ ;
                        }
                }
        }

			try{
             //alert("************* get name "+name+type); 
			 if(type != "NUM"&&type != "DAT")
              objectValue = document.getElementsByName(name)[0].value ;
			  //alert("objectValue = "+objectValue);
            }catch(Exception){
				alert("************* get name Exception "+name+type); 
			  return false;
			}
		
        if(type == "TXT") //�ַ�����
        {  // alert("txt = ");
		  if(jsTrim(objectValue)==''){
			alert("["+showName+"]����Ϊ�գ����� ");
			return false; 
		  }
		  if( getISO8859Size(objectValue) > parseInt(length))
		  {
			//alert("no!!!!!!!!!!!!!!!!! = ");
			alert("["+showName+"]�ĳ��Ȳ��ܳ��� "+length);
			return false;
		  }else{
		 // alert("ok!!!!!!!!!!!!!!!!= ");
		    message_list=message_list+name+" like '@mohu"+jsTrim(objectValue)+"@mohu'  ";
		  }
        }
        else  if(type == "OPT") //�ַ�����
        {  // alert("txt = ");
		  if(jsTrim(objectValue)==''){
			alert("["+showName+"]����Ϊ�գ����� ");
			return false; 
		  }
		  if( getISO8859Size(objectValue) > parseInt(length))
		  {
			//alert("no!!!!!!!!!!!!!!!!! = ");
			alert("["+showName+"]�ĳ��Ȳ��ܳ��� "+length);
			return false;
		  }else{
		 // alert("ok!!!!!!!!!!!!!!!!= ");
		    message_list=message_list+name+" = '"+jsTrim(objectValue)+"'  ";
		  }
        }
        else if(type == "NUM" ) //��������
        {
			    objectValue = document.getElementsByName(name+"_T1")[0].value ;
				//alert("************* T1="+objectValue);
				if(checkNum(objectValue,showName,length)){
				  message_list=message_list+name+document.getElementsByName(name+"_D1")[0].value+objectValue+"  ";
				  if(document.getElementsByName(name+"_D2")[0].value!='no'){
				    var objectValue2 = document.getElementsByName(name+"_T2")[0].value ;
					if(checkNum(objectValue2,showName,length)){
					  message_list=message_list+document.getElementsByName(name+"_D2")[0].value+' '+name+document.getElementsByName(name+"_D3")[0].value+objectValue2+"  ";
					}
				  }
				  message_list="("+message_list+")"
				}else{
				  return false;
				}

        }
		else if(type == "DAT" ) //��������
        {
			    var datValue1 = document.getElementsByName(name+"_start")[0].value ;
				var datValue2 = document.getElementsByName(name+"_end")[0].value ;
				//alert("************* T1="+datValue1+"   T2 = "+datValue2);
				if(checkDat(datValue1,datValue2,showName)){
				  message_list=message_list+"("+name+" >= '"+datValue1+"' and "+name+" <= '"+datValue2+" 23:59:59.998') ";
				}else{
				  return false;
				}

        }
      //alert("message_list = "+message_list);
        return message_list ;
}

function checkDat(eventStar,eventEnd,showName){
	if(eventStar!=""){	  				
	  var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
	  var r=eventStar.match(reg);
	  if(r==null){
		alert("["+showName+"]��ʼʱ������������д� !");
		return false;
	  }
	}else{
		alert("["+showName+"]�����뿪ʼʱ�� !");
		return false;
	}
	if(eventEnd!=""){
	  var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
	  var r=eventEnd.match(reg);
	  if(r==null){
		alert("["+showName+"]����ʱ������������д� !");
		submit = false;
	  }	
	}else{
		alert("["+showName+"]���������ʱ�� !");
		return false;
	}
    if(eventStar!=""&&eventEnd!=""){
	  if(eventEnd<eventStar){
	    alert("["+showName+"]����ʱ��Ӧ�ô��ڿ�ʼʱ�� !");
		return false;
	  }
	}
	return true;
}

function checkNum(ov,showName,length){
			    var objectValue=jsTrim(ov);
				//alert("************* 3"+objectValue);
                if(objectValue==""||objectValue=="&nbsp;")
                {
				       alert("["+showName+"]������һ����Ч�����֣����߲�ѡ�У�"); 
					   return false;
                       // document.getElementsByName(name+type)[0].value=0;
                }                 
				if(!checkIsNumber(objectValue))
                {
                        alert("["+showName+"] ����һ����Ч������");
						return false;
                }
                if(!checkNumberMaxSize(objectValue,parseInt(length)))
                {
                        alert("["+showName+"]�ĳ��Ȳ��ܳ��� "+length);
						return false;
                }
				return true;

}

//ȥ�ո�
function jsTrim(str){
  str = str.replace(/(^\s*|\s*$)/g,"");
  return str;
}

function addNumCondition(s){
//alert("    dddddddddddd "+s.value);
  var select=s.value;
  if(select != 'no'){
  //alert(" wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
   document.getElementById('num2').style.display='';
  }else{
    document.getElementById('num2').style.display='none';
  }
}

function checkNumberMaxSize(value,max)
{
        value = ""+value ;
        var temp = "0123456789" ;
        var count = 0 ;
        for(var i=0,m=value.length;i<m;i++)
        {
                if(temp.indexOf(value.charAt(i))>=0)
                {
                        count++ ;
                }        
        }
        if(count>max)
        {
                return false ;
        }
        return true ;
}
function checkIsNumber(value)
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
function getCharType(aChar)
{
    try
    {
	if(aChar==null||aChar.length==0||aChar.length>1)
	{
		return 0 ;

	}
	var escapeChar = escape(aChar);
	if     (aChar=='\r') 		return 4;
	else if(aChar=='\n') 		return 3;
	else if(aChar=='\t') 		return 5;
	else if(escapeChar.length==4 ) 	return 2;
	else if(escapeChar.length==6 ) 	return 6;
	else if(escapeChar.length==1 )  return 1;
	else 				return 7;
    }catch(Exception)
    {
    		return 0 ;
    }
}
function getISO8859Size(aStr)
{
	var str = ""+aStr;
	if( str == null || str.length==0 )
	{
		return 0 ;
	}
	var totalLen = 0 ;
	var strLen = str.length;
	for(var i=0;i<strLen;i++)
	{
		if(getCharType(str.charAt(i))==6)
		{
			totalLen+=2;
		}
		else
		{
			totalLen ++ ;
		}
	}
	return totalLen;
}
function verifyCheckAsciiValueLengthString(value,name,maxLen)
{
	try
	{
		var val = ""+value ;
		if( getISO8859Size(val) > maxLen )
		{
			setDonaldErrorMessage("["+name+"]�ĳ��Ȳ����Դ���_"+maxLen+"_���ֽ�(������Ϊ�����ֽ�)��");
		}
	}
	catch(err)
	{
		setDonaldErrorMessage("������["+name+"]��������ֵ");
	}
}

function checkChange(o,val){
  if(o.change==""&&o.value.length>0||(o.change!=""&&o.value!=""&&o.change!=o.value)){
    isCheck(val);
  }
  o.change=o.value;
}
function isCheck(val){
  var opt = document.getElementsByName("f_id");
        try
        {      
		        opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {    
                        if(opt[i].value == val )
                        {  
                           opt[i].checked=true;
                        }
                }                
        }
        catch(error)
        {
		     if(opt.value != val )
               alert("ҳ���������ò��ԣ�����ϵͳ����Ա��ϵ��");
             else
			   opt.checked = true;
     
        }
}

function getObjectsByChecked()
{   
        var selectValue ='' ;
        var size = 0 ;
        var opt = document.getElementsByName("id") ;
    //alert(document.tableForm.elements("remark").value);
        try
        {       opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
                                selectValue =selectValue+','+parseInt(opt[i].value);
								//break;
								
                        }
                }                
                if(size <= 0 )
                {
                        alert("����ѡ���¼");

                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue = parseInt(opt.value);
                }
                else
                {
                        alert("��ѡ���¼");

                }
           }catch(err)
           {     
         alert("��ǰû�п�ѡ��¼��");
           }     
        }
		if(selectValue!=''&&selectValue.length>0){
		  selectValue=selectValue.substring(1);
		}
        return selectValue ;
}
function sqlValue_cookie(value)
{
        var message_list = "" ;
        value +="|" ;//  to make the string fit for verify
        var name="" ;
        var showName = "" ;
        var type = "" ;
        var length = 0 ;
        //begin go divide all datas
        var position = 0 ; // total | count
        var firstPosition = -1 ;
        var lastPosition  = -1 ;
        for(var i=0,m=value.length;i<m;i++)
        {
                if( value.charAt(i) == '|' )
                {
                        firstPosition = lastPosition+1 ;
                        lastPosition = i ;
                        if(firstPosition != -1 )
                        {
                                switch(position)
                                {
                                        case 0 : name = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 1 : showName = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 2 : type = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 3 : length = value.substring(firstPosition,lastPosition) ;
                                                 break ;

                                }
                                position ++ ;
                        }
                }
        }

       
		if(type == "DAT" ) //��������
        {
			    var datValue1 = document.getElementsByName(name+"_start")[0].value ;
				var datValue2 = document.getElementsByName(name+"_end")[0].value ;
				//alert("************* T1="+datValue1+"   T2 = "+datValue2);
				if(checkDat(datValue1,datValue2,showName)){
					message_list=message_list+name+"b62a"+datValue1+'DAT'+datValue2;
				}else{
				  return false;
				}

        }else{
			objectValue = document.getElementsByName(name)[0].value ;
			message_list=message_list+name+"b62a"+jsTrim(objectValue);
			//alert(message_list);
		}
      //alert("message_list = "+message_list);
        return message_list ;
}

//��������
function checkValue_sql_cookie(){
  //alert("ssssss !!! ");
  var selectValue = -1 ;
  var size = 0 ;
  var sql="";
  var opt = document.getElementsByName("f_id");
        try
        {      
		        opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
                                selectValue = parseInt(opt[i].value) ;
                                //alert("selectValue = "+selectValue);
								var fieldValue=document.getElementsByName("field"+selectValue)[0].value;
								//alert("fieldValue = "+fieldValue);
								var returnvalue=sqlValue_cookie(fieldValue);
								if(returnvalue!=false){
								  if(size==1){
								    sql=sql+returnvalue+"b62a"+selectValue;
                                  }else{
								    sql=sql+"a62b"+returnvalue+"b62a"+selectValue;
								  }
								}else{
								  return false;
								}
								//alert("sql = "+sql);
                        }
                }                
                if(size <= 0 )
                {
                        //alert("11��ѡ����Ҫ������������");
                        selectValue = -1 ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
						var fieldValue=document.getElementsByName("field1")[0].value;
                   
						var returnvalue=sqlValue(fieldValue);
						selectValue=1;
						
						sql=sql+returnvalue;
                }
                else
                {
                        //alert("22��ѡ����Ҫ������������");
						selectValue = -1 ;
                }
           }catch(err)
           {     
             alert("û������������ѡ���������Ա��ϵ��");
		     selectValue = 0 ;
           }     
        }
		if(selectValue>0){
          return sql;
		  //searchInfo(cdno,tableName,sql,okey,otype,itNo);
		}else{
		  return "1=1";
		}

}
function unCheckValue_cookie(str){
	var opt = document.getElementsByName("f_id");
	if(str!="" && str!="1=1"){
		str=str.split("a62b");
		for(var i=0;i<str.length;i++){
			var everyField=str[i].split("b62a");
			if(everyField[1].indexOf("DAT")>-1){
				var everyFieldDAT=everyField[1].split("DAT");
				document.getElementsByName(everyField[0]+"_start")[0].value=everyFieldDAT[0];
				document.getElementsByName(everyField[0]+"_end")[0].value=everyFieldDAT[1];
			}else{
				document.getElementsByName(everyField[0])[0].value=everyField[1];
				if(everyField[0]=="check_main_branch"){
					try{
						getcheck_bm(everyField[1]);
					}catch(e){
					}
				}
				
			}
	
			for(var k=0;k<opt.length;k++){
				if(everyField[2]==opt[k].value){
					opt[k].checked=true;
					break;
				}
			}
		}
		
	}
}
function iniCookie(tableName,ITNO,USERID){
	//tableName���ϵ�ITNO��table�������û������
	var conCookie=getCookieValue("searchValue_"+ITNO+'_'+USERID+'_end');
	unCheckValue_cookie(conCookie);
	var searchConCookie=getCookieValue("searchField_"+ITNO+'_'+USERID+'_end');
	if(searchConCookie!=null && searchConCookie!=""){
		var searchConCookieArray=searchConCookie.split(",");
		for(var i=0;i<searchConCookieArray.length;i++){
			if(searchConCookieArray[i]=="��ʾ"){
				$("#li_search"+(i+1)).show();
			}
			if(searchConCookieArray[i]=="����"){
				$("#li_search"+(i+1)).hide();
			}
		}
	}	
}


function iniCookie_table(tableName,ITNO,USERID){
	//tableName���ϵ�ITNO��table�������û������
	var conCookie=getCookieValue("searchValue_"+ITNO+'_'+USERID+'_end');
	unCheckValue_cookie(conCookie);
	var searchConCookie=getCookieValue("searchField_"+ITNO+'_'+USERID+'_end');
	if(searchConCookie!=null && searchConCookie!=""){
		var searchConCookieArray=searchConCookie.split(",");
		for(var i=0;i<searchConCookieArray.length;i++){
			if(searchConCookieArray[i]=="��ʾ"){
				$("#tr_search"+(i+1)).show();
			}
			if(searchConCookieArray[i]=="����"){
				$("#tr_search"+(i+1)).hide();
			}
		}
	}	
}


//������������  ���Ĳ�������CDNO listUrl
function setCondition(searchType,tableName,ITNO,USERID) { //����߼�����
	//tableName���ϵ�ITNO��table�������û������
	var htmlITNO=document.getElementsByName("ITNO")[0].value;
	var cV='1=1 ';
	if(htmlITNO==ITNO){//������ITNO��hidden ��ITNO��ȵ�ʱ��Ĭ��Ϊ���� ����cookie ���� �����䣻
		cV = checkValue_sql();
		setCookie("searchValue_"+ITNO+'_'+USERID+'_end',checkValue_sql_cookie(),1,"/");
	}
	//������������  ���岽������cookie
	
	if (cV != '') {
	
		//alert('ddddd');
		document.getElementsByName("searchByMoreFieldName")[0].value = " and " + cV;
		eval(searchType+"();");
	}
}

//������������  ���Ĳ�������CDNO listUrl ��չ����
function setConditionAddCon(searchType,tableName,ITNO,USERID,conStr) { //����߼�����
	//alert(conStr);
	var htmlITNO=document.getElementsByName("ITNO")[0].value;
	//alert(htmlITNO+":"+ITNO+":"+(htmlITNO==ITNO)+":"+checkValue_sql_cookie());
	var cV='1=1 '+conStr;
	if(htmlITNO==ITNO){
		cV = checkValue_sql()+' '+conStr;
		//������������  ���岽������cookie
		setCookie("searchValue_"+ITNO+'_'+USERID+'_end',checkValue_sql_cookie(),1,"/");
	}
	if (cV != '') {
		//alert('ddddd');
		document.getElementsByName("searchByMoreFieldName")[0].value = " and " + cV;
		eval(searchType+"();");
	}
}