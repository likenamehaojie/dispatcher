function checkValue(size){
  //alert("ssssss !!! "+size);
  var par="";
  var t=0;
                for(var i=0;i<size;i++)
                {
				    
                                
                                t++;
								var fieldValue=document.getElementsByName("field"+t)[0].value;
								//alert("fieldValue = "+fieldValue);
								var returnvalue=sqlValue(fieldValue);
								//alert("returnvalue = "+returnvalue);
								if(returnvalue=='-1'){
								  return false;
								}else
								if(returnvalue!=''){
								  par=par+returnvalue;
                                }
                }                


       return par; 

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
		
        if(type == "TXT") //字符类型
        {  // alert("txt = ");
		  if(jsTrim(objectValue)==''){
			return message_list="&$"+name+"=(1=1)"; 
		  }
		  if( getISO8859Size(objectValue) > parseInt(length))
		  {
			//alert("no!!!!!!!!!!!!!!!!! = ");
			alert("["+showName+"]的长度不能超过 "+length);
			return '-1';
		  }else{
		 // alert("ok!!!!!!!!!!!!!!!!= ");
		    message_list="&$"+name+"=("+name+" like '@mohu"+jsTrim(objectValue)+"@mohu')";
		  }
        }
        else  if(type == "OPT") //单选类型
        {  // alert("txt = ");
		  if(jsTrim(objectValue)==''){
			return message_list="&$"+name+"=(1=1)"; 
		  }
		  if( getISO8859Size(objectValue) > parseInt(length))
		  {
			//alert("no!!!!!!!!!!!!!!!!! = ");
			alert("["+showName+"]的长度不能超过 "+length);
			return '-1';
		  }else{
		 // alert("ok!!!!!!!!!!!!!!!!= ");
		    message_list="&$"+name+"=("+name+" = '"+jsTrim(objectValue)+"')";
		  }
        }
        else  if(type == "MULOPT") //多选类型
        {  // alert("txt = ");
          var o = document.getElementsByName("check_result")[0]; 
		  var intvalue="";   
          for(i=0;i<o.length;i++){
			if(o.options[i].selected){   
		      intvalue+="'"+o.options[i].value+"',";
            }
          }
		  if(intvalue!="")intvalue=intvalue.substr(0,intvalue.length-1);
		  else return message_list="&$"+name+"=(1=1)";
		  message_list="&$"+name+"="+name+" in ("+jsTrim(intvalue)+")";
        }
        else if(type == "NUM" ) //数据类型
        {
			    objectValue = document.getElementsByName(name+"_T1")[0].value ;
                var t=checkNum(objectValue,showName,length);
				if(t>0){
				  message_list=name+document.getElementsByName(name+"_D1")[0].value+objectValue;
				  if(document.getElementsByName(name+"_D2")[0].value!='no'){
				    var objectValue2 = document.getElementsByName(name+"_T2")[0].value ;
					var t2=checkNum(objectValue2,showName,length);
					if(t2>0){
					  message_list=message_list+" "+document.getElementsByName(name+"_D2")[0].value+' '+name+document.getElementsByName(name+"_D3")[0].value+objectValue2;
					}else{
				      if(t2=='0'){
				       return "&$"+name+"=("+message_list+")";
				      }
				       return '-1';
					}
				  }
				  message_list="&$"+name+"=("+message_list+")";
				}else{
				  if(t=='0'){
				    return message_list="&$"+name+"=(1=1)"; 
				  }
				  return '-1';
				}

        }
		else if(type == "DAT" ) //日期类型
        {
			    var datValue1 = document.getElementsByName(name+"_start")[0].value ;
				var datValue2 = document.getElementsByName(name+"_end")[0].value ;
				//alert("************* T1="+datValue1+"   T2 = "+datValue2);
				var i=checkDat(datValue1,datValue2,showName);
                switch(i)
                {
                     case -1 : return '-1';

					 case 0 :  return message_list="&$"+name+"=(1=1)"; ;
                                                
                     case 1 : message_list="&$"+name+"=("+name+" >= '"+datValue1+"')";
                                                 break ;
                     case 2 : message_list="&$"+name+"=("+name+" <= '"+datValue2+" 23:59:59.998')";
                                                 break ;
                     case 3 : message_list="&$"+name+"=("+name+" >= '"+datValue1+"' and "+name+" <= '"+datValue2+" 23:59:59.998')";
                                                 break ;

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
		alert("["+showName+"]开始时间的日期类型有错!,格式为:YYYY-MM-DD");
		return -1;
	  }
	}
	if(eventEnd!=""){
	  var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
	  var r=eventEnd.match(reg);
	  if(r==null){
		alert("["+showName+"]结束时间的日期类型有错!,格式为:YYYY-MM-DD");
		return -1;
	  }	
	}
	if(eventStar==''&&eventEnd!=""){
	  return 2;
	}
	if(eventStar!=''&&eventEnd==""){
	  return 1;
	}
    if(eventStar!=""&&eventEnd!=""){
	  if(eventEnd<eventStar){
	    alert("["+showName+"]结束时间应该大于开始时间!");
		return -1;
	  }
	}else{
	  return 0;
	}
	return 3;
}

function checkNum(ov,showName,length){
			    var objectValue=jsTrim(ov);
				//alert("************* 3"+objectValue);
                if(objectValue==""||objectValue=="&nbsp;")
                {
				       //alert("["+showName+"]请输入一个有效的数字，或者不选中！"); 
					   return '0';
                       // document.getElementsByName(name+type)[0].value=0;
                }                 
				if(!checkIsNumber(objectValue))
                {
                        alert("["+showName+"] 不是一个有效的数字");
						return '-1';
                }
                if(!checkNumberMaxSize(objectValue,parseInt(length)))
                {
                        alert("["+showName+"]的长度不能超过 "+length);
						return '-1';
                }
				return '1';

}

//去空格
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
			setDonaldErrorMessage("["+name+"]的长度不可以大于_"+maxLen+"_个字节(中文作为两个字节)。");
		}
	}
	catch(err)
	{
		setDonaldErrorMessage("可能是["+name+"]不包含数值");
	}
}

