//<input type="hidden" name="field.validateValue" value="projectno|��Ŀ���|TXT|50|1|yy|">
//value��ʾ�ֶ�������ʾ�������ͣ����ȣ�1��ʱ����Ĭ��Ϊ1��yyΪ����Ψһ
var VALIDATE_OBJECT_DEF = "field.validateValue" ;
var update_ary=new Array(1);
var dat_num=0;
function validate()
{
	
        // the message_list object contain all messages

		dat_num=0;
        var message_list = "" ;
        if(document.getElementsByName("combinationUnique")[0]){
			  message_list=combinationU();
			  if(message_list!=''){
				 alert(message_list);
				 return false ;
			}
		}
        var validateObject = document.getElementsByName(VALIDATE_OBJECT_DEF);
        if(validateObject == null)
        {
                // null means there is no field setting
           if(checkIsSubmit()){
		      return true ;
		    }
               
        }
        var value = validateObject.value ;
        if(value == null)
        {
                // means the object is an array
                for(var i=0,m=validateObject.length;i<m;i++)
                {
                        message_list+=validateValue(validateObject[i].value);
                }
        }
        else
        {
                //there is only one object
                message_list+=validateValue(value);
        }
        if(message_list != null && message_list != "" )
        {
                //show the message and return not to submit
                alert(message_list);
                return false ;
        }
        if(checkIsSubmit()){
		   return true ;
		}else{
		   return false;
		}
}
function validateValue(value)
{
        var message_list = "" ;
        value +="|" ;//  to make the string fit for verify
        var name="" ;
        var showName = "" ;
        var type = "" ;
        var length = 0 ;
        var subLength= "" ;
        var prop="" ;
        var typeStyle= "" ;
        //begin go divide all datas
        var position = 0 ; // total | count
        var firstPosition = -1 ;
        var lastPosition  = -1 ;
		var objectValue="";
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
                                        case 4 : subLength = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 5 : prop = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                        case 6 : typeStyle = value.substring(firstPosition,lastPosition) ;
                                                 break ;
                                }
                                position ++ ;
                        }
                }
        }
		
			try{
            //alert("************* get name "+name+type); 
              objectValue = document.getElementsByName(name)[0].value ;
            }catch(Exception){
				alert("************* get name Exception "+name+type); 
			  return false;
			}
		
        //MODIFY SOME VALUES
        if(prop == null )
        {
                prop = "nnnnnnnnnn" ;
        }
        // begin to valify the objects
        // check prop
        if(prop.charAt(0) == 'Y' || prop.charAt(0) == 'y' )
        {
                if(objectValue == "" )
                {
                        message_list +="\n["+showName+"] ����Ϊ�� " ;
                }
        }
        if(prop.charAt(1) == 'Y' || prop.charAt(1) == 'y' )
        {
                var tableName=document.getElementsByName('tableName')[0].value;
				
				if(document.getElementsByName('tableRealName')[0]){
					tableName=document.getElementsByName('tableRealName')[0].value;
				}
				var id='';
				if(document.getElementsByName('id')[0])
				  id=document.getElementsByName('id')[0].value;
				if(id!=''){
				  checkUnique_sub(tableName,name,jsTrim(objectValue),id);
				}else{
				  checkUnique(tableName,name,jsTrim(objectValue));
                }
                if(document.getElementsByName(name)[0].value=='m@o#r$e'){//�����ظ�����û������Ĭ��ֵ
				  document.getElementsByName(name)[0].value=objectValue;
                  message_list +="\n["+showName+"] Ϊ��"+objectValue+" ���ݿ����Ѵ��ڣ���ȷ�ϣ�";
				}
                if(objectValue!=document.getElementsByName(name)[0].value){//�����ظ�����������Ĭ��ֵ
			
				  message_list +="\n["+showName+"] Ϊ��"+objectValue+"���ظ�ֵ�����Զ���ȡΪ��"+document.getElementsByName(name)[0].value;
				}
        }
        if(type == "TXT") //�ַ�����
        {
		if( getISO8859Size(objectValue) > parseInt(length))
		{
			message_list += "\n["+showName+"]�ĳ��Ȳ��ܳ��� "+length/2;
		}
        }
        else if(type == "DAT") //ʱ������(YYYY-MM-DD)
        {
				var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
				var r=objectValue.match(reg);
                if(jsTrim(objectValue)==""||jsTrim(objectValue)=="&nbsp;")
                {

                }
				else if(r==null)
				{
					//message_list += "���������д�";
					message_list +="\n["+showName+"]���������д�";
				}
				else
				{
					var y=objectValue.substring(0,4);
					var m=objectValue.substring(5,7);
					var d=objectValue.substring(8,10);
					message_list+=verifyDate(y,m,d,showName);

				}

        }
		else if(type == "RAD") //radio����
        {
			


        }
        else if(type == "NUM" ) //��������
        {
			    objectValue=jsTrim(objectValue);
				//alert("************* 3"+objectValue);
                if(objectValue==""||objectValue=="&nbsp;")
                {
                       // document.getElementsByName(name+type)[0].value=0;
                }                 
				if(!checkIsNumber(objectValue))
                {
                        message_list += "\n["+showName+"] ����һ����Ч������";
                }
                if(!checkNumberMaxSize(objectValue,parseInt(length)))
                {
                        message_list += "\n["+showName+"]�ĳ��Ȳ��ܳ��� "+length;
                }
        }
        else if(type=="TIM" ) //ʱ������(yyyy-mm-dd hh-mm)
        {
			var value=objectValue;
			if((prop.charAt(1) == 'n' || prop.charAt(1) == 'N') && value.length==0){

				}else{
					var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/;
					var r=value.match(reg);
					if(r==null)
					{
						//message_list += "ʱ�������д�";
						message_list +="\n["+showName+"]ʱ�������д�";
					}
					else
					{
						var y=value.substring(0,4);
						var m=value.substring(5,7);
						var d=value.substring(8,10);
						var h=value.substring(11,13);
						var mi=value.substring(14,16);
						message_list=verifyDate(y,m,d,showName);
						if(h<0||h>24)
							message_list+= "����["+showName+"]ʱ��Ƿ�";
						if(mi<0||mi>59)
							message_list+= "\n["+showName+"]ʱ��Ƿ�";
					}
				}
        }

        return message_list ;
}

//ȥ�ո�
function jsTrim(str){
  //str = str.replace(/(^\s*|\s*$)/g,"");
  str=str.replace(/[ ]/g,"");
  return str;
}

function verifyDate(year,month,day,name)
{
	//�ж������Ƿ����
	var message_list="";
	if(month<1 | month>12 )
	{
	        return "����["+name+"]���ڷǷ�" ;
	}
    	if(month==1 | month==3 |month==5 |month==7 | month==8 |month==10 |month==12)
    	{
	        if(day > 31 | day<1)
	        {
		        return "����["+name+"]���ڷǷ�" ;
	        }
	}else if( month==4 |month==6 |month==9 | month==11)
	{
	        if(day > 30 | day<1)
	        {
		        return "����["+name+"]���ڷǷ�" ;
	        }
	}else if (month==2)
	{
	        //��Ϊ���꣬�����ڲ��ܴ���29
	        if((year%400 == 0)|(year%100 !=0 && year%4 == 0))
	        {
	            	if(day > 29 | day<1)
	            	{
			        	return "����["+name+"]���ڷǷ�" ;
	            	}
	        }
	        else
	        {//һ���·ݲ��ɴ���28��
	            	if(day > 28 | day<1)
	            	{
						return "����["+name+"]���ڷǷ�" ;
	            	}
	        }
	}
	return "";
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

//�¼���textarea����������
var textareatemp="";
function font(obj,maxRow,one_size)
{
 var taflag=true;
 var fontlength=reallength(trim(obj.value));
 templ=fontlength/(one_size*2);
 if(document.getElementById(obj.name+"_fontcount")!=null)
 document.getElementById(obj.name+"_fontcount").innerHTML='�������Ϊ��<FONT COLOR="#FF0000">'+maxRow*one_size+'</FONT> ��ǰ�Ѿ����룺<FONT COLOR="#FF0000">'+fontlength/2+'</FONT>';
 if(fontlength/2>maxRow*one_size){
   alert("������������"+maxRow*one_size);
   taflag=false;
 }
 var s = obj.value.split("\r\n");
  var l=0;
  for(var i = 0 ; i < s.length ; i ++){
    var rowV=s[i];
	//document.getElementById("fonte").innerHTML=reallength(trim(rowV));
	if(s[s.length-1]!=''&&reallength(trim(s[s.length-1]))%(one_size*2)==0){
	  //alert("66666666666666666666666666666666");
      obj.value=obj.value+"\r\n";
	  break;
	}
	l=l+(Math.ceil(reallength(trim(rowV))/(one_size*2))-1);
  }
  if(l<0)
	  l=0;
  //document.getElementById("_fontl").innerHTML=l+" ddddd "+s.length;
  l=l+s.length;
  if(document.getElementById(obj.name+"_fontl")!=null)
  document.getElementById(obj.name+"_fontl").innerHTML='�������Ϊ��<FONT COLOR="#FF0000">'+maxRow+'</FONT> ��ǰ����:<FONT COLOR="#FF0000">'+l+'</FONT>';
 if(l>maxRow){
   alert("����"+maxRow+"�У�����������������"+maxRow+"�У�ÿ��"+one_size+"�����֣�����");
   taflag=false;
 }
 if(taflag)
   textareatemp=obj.value;   
 else
   obj.value=textareatemp;
}
function reallength(s){
return s.replace(/[^\x00-\xff]/gi,'xu').length;
}
function trim(inputString){
 return inputString.replace(/(^\s*)|(\s*$)/g, "");
}

function combinationU(){
  var cu=document.getElementsByName("combinationUnique")[0].value;
  var cuL=cu.split(";");
  var vL=cuL[0].split(",");
  var objectValue="";
  for(var i=0;i<vL.length;i++){
    objectValue=objectValue+","+document.getElementsByName(vL[i])[0].value;
  }
  if(objectValue!=''&&objectValue!=','){
    objectValue=objectValue.substring(1);
  }
  var tableName=document.getElementsByName('tableName')[0].value;
  var id='';
  if(document.getElementsByName('id')[0])
	id=document.getElementsByName('id')[0].value;
				//alert("id="+id);
  if(id!=''){
	checkUnique_sub(tableName,cuL[0],jsTrim(objectValue),id);
  }else{
	checkUnique(tableName,cuL[0],jsTrim(objectValue));
  }
  if(document.getElementsByName(cuL[0])[0].value=='m@o#r$e'){//�����ظ�����û������Ĭ��ֵ
	 //document.getElementsByName(name)[0].value=objectValue;
	 document.getElementsByName(cuL[0])[0].value="";
      return "\nͬʱ����["+cuL[1]+"]��ֵΪ��"+objectValue+" ���ݿ����Ѵ��ڣ���ȷ�ϣ�";
  }
  return '';
}

var checkSubmitFlg = false;       
function checkIsSubmit() { 
	if(document.getElementsByName("field.validateValue_sub")[0])return true;
	if (!checkSubmitFlg) {     
	checkSubmitFlg = true;         
	return true;      
	}else{    
	 alert("���Ѿ��ύ���ˣ������ظ��ύ��");    
	 return false;    
	}    
}