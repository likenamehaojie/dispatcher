//<input type="hidden" name="field.validateValue" value="projectno|��Ŀ���|TXT|50|1|yy|">
//value��ʾ�ֶ�������ʾ�������ͣ����ȣ�1��ʱ����Ĭ��Ϊ1��yyΪ����Ψһ
var VALIDATE_OBJECT_DEF_sub = "field.validateValue_sub" ;
var row_num=0;
var r_flag;
function check_subTable(){
  if(!validate()){
    return false;
  } 
  r_flag=1;
  row_num=document.getElementById("actorCount").value;
  var validateObject = document.getElementsByName(VALIDATE_OBJECT_DEF_sub);
  if(validateObject){
    if(!check_sub_unique(validateObject)){
      return false;
    }
  //alert("row_num ="+row_num);
    for(var i=1;i<=row_num;i++){
      if(!validate_sub(i,validateObject)){
	    return false;
	  }
    }
  }
  if(subCheckIsSubmit()){
    return true ;
  }else{
    return false;
  }				
}
function validate_sub(rowN,validateObject)
{
        // the message_list object contain all messages

        var message_list = "" ;

        if(validateObject == null)
        {
                // null means there is no field setting
                return true ;
        }
        var value = validateObject.value ;
		var flag=true;
        if(value == null)
        {
                // means the object is an array
                for(var i=0,m=validateObject.length;i<m;i++)
                {
					    var m_temp=validateValue_sub(validateObject[i].value,rowN);
						if(i==0&&m_temp=='break'){
						  flag=false;
						  m_temp="";
						  break;
						}
                        message_list+=m_temp;
                }
        }
        else
        {
                //there is only one object
				var m_temp=validateValue_sub(value,rowN);
				if(m_temp=='break'){
					flag=false;
					m_temp="";
				}
                message_list+=m_temp;
        }
		if(flag)r_flag++; 
        if(message_list != null && message_list != "" )
        {
                //show the message and return not to submit
                alert(message_list);
                return false ;
        }
		return true;
}
function validateValue_sub(value,rowN)
{
        var message_list = "" ;
        value +="|" ;//  to make the string fit for verify
        var name="" ;
		var oldName="";
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
		oldName=name;
		name=oldName+rowN;
		//alert("rowN ="+rowN+" name ="+name+"document.getElementsByName(name)[0] ="+document.getElementsByName(name)[0]);
		if(!document.getElementsByName(name)[0]){
		  return 'break';
		}
			try{
            //alert("************* get name "+name+type); 
              var objectValue = document.getElementsByName(name)[0].value ;
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
                        message_list +="\n�ӱ��"+r_flag+"��["+showName+"] ����Ϊ�� " ;
                }
        }
        if(prop.charAt(1) == 'Y' || prop.charAt(1) == 'y' )
        {

				if(document.getElementsByName("main_id")[0]){
                  var tableName=document.getElementsByName('subTableName')[0].value;
				  var id=document.getElementsByName('sub_id'+rowN)[0].value;
				  if(id!=''&&id!=0){
				    checkUnique_sub(tableName,oldName,objectValue,id);
				  }else{
				    checkUnique(tableName,oldName+',main_id',objectValue+','+document.getElementsByName("main_id")[0].value);
                  }
				  //alert("document.getElementsByName(name)[0].value="+document.getElementsByName(name)[0].value);
                  if(document.getElementsByName(name)[0].value=='m@o#r$e'){//�����ظ�����û������Ĭ��ֵ
				    document.getElementsByName(name)[0].value=objectValue;
                    message_list +="\n�ӱ��"+r_flag+"��["+showName+"] Ϊ��"+objectValue+" ���ݿ����Ѵ��ڣ���ȷ�ϣ�";
				  }
                  if(objectValue!=document.getElementsByName(name)[0].value){//�����ظ�����������Ĭ��ֵ
				    message_list +="\n�ӱ��"+r_flag+"��["+showName+"] Ϊ��"+objectValue+"���ظ�ֵ�����Զ���ȡΪ��"+document.getElementsByName(name)[0].value;
				  }
				}
        }
        if(type == "TXT") //�ַ�����
        {
		if( getISO8859Size(objectValue) > parseInt(length))
		{
			message_list += "\n�ӱ��"+r_flag+"��["+showName+"]�ĳ��Ȳ��ܳ��� "+length/2;
		}
        }
        else if(type == "DAT") //ʱ������(YYYY-MM-DD)
        {
				var value=objectValue;
				var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
				var r=value.match(reg);
                if(jsTrim(value)==""||jsTrim(value)=="&nbsp;")
                {

                }
				else if(r==null)
				{
					//message_list += "���������д�";
					message_list +="\n�ӱ��"+r_flag+"��["+showName+"]���������д�";
				}
				else
				{
					var y=value.substring(0,4);
					var m=value.substring(5,7);
					var d=value.substring(8,10);
					message_list+=verifyDate_sub(y,m,d,showName);

				}

        }
		else if(type == "RAD") //radio����
        {
			


        }
        else if(type == "NUM" ) //��������
        {  
			    objectValue=jsTrim(objectValue);

                if(objectValue==""||objectValue=="&nbsp;")
                {
                       // document.getElementsByName(name+type)[0].value=0;
                }                 
				if(!checkIsNumber(objectValue))
                {
                        message_list += "\n�ӱ��"+r_flag+"��["+showName+"] ����һ����Ч������";
                }
                if(!checkNumberMaxSize(objectValue,parseInt(length)))
                {
                        message_list += "\n�ӱ��"+r_flag+"��["+showName+"]�ĳ��Ȳ��ܳ��� "+length;
                }
        }
        else if(type=="TIM" ) //ʱ������(yyyy-mm-dd hh-mm)
        {
				var value=objectValue;
				var reg=/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/;
				var r=value.match(reg);
				if(r==null)
				{
					//message_list += "ʱ�������д�";
					message_list +="\n�ӱ��"+r_flag+"��["+showName+"]ʱ�������д�";
				}
				else
				{
					var y=value.substring(0,4);
					var m=value.substring(5,7);
					var d=value.substring(8,10);
					var h=value.substring(11,13);
					var mi=value.substring(14,16);
					message_list=verifyDate_sub(y,m,d,showName);
					if(h<0||h>24)
						message_list+= "�ӱ��"+r_flag+"�ж���["+showName+"]ʱ��Ƿ�";
					if(mi<0||mi>59)
						message_list+= "\n�ӱ��"+r_flag+"��["+showName+"]ʱ��Ƿ�";
				}
        }

        return message_list ;
}

function verifyDate_sub(year,month,day,name)
{
	//�ж������Ƿ����
	var message_list="";
	if(month<1 | month>12 )
	{
	        return "�ӱ��"+r_flag+"�ж���["+name+"]���ڷǷ�" ;
	}
    	if(month==1 | month==3 |month==5 |month==7 | month==8 |month==10 |month==12)
    	{
	        if(day > 31 | day<1)
	        {
		        return "�ӱ��"+r_flag+"�ж���["+name+"]���ڷǷ�" ;
	        }
	}else if( month==4 |month==6 |month==9 | month==11)
	{
	        if(day > 30 | day<1)
	        {
		        return "�ӱ��"+r_flag+"�ж���["+name+"]���ڷǷ�" ;
	        }
	}else if (month==2)
	{
	        //��Ϊ���꣬�����ڲ��ܴ���29
	        if((year%400 == 0)|(year%100 !=0 && year%4 == 0))
	        {
	            	if(day > 29 | day<1)
	            	{
			        	return "�ӱ��"+r_flag+"�ж���["+name+"]���ڷǷ�" ;
	            	}
	        }
	        else
	        {//һ���·ݲ��ɴ���28��
	            	if(day > 28 | day<1)
	            	{
						return "�ӱ��"+r_flag+"�ж���["+name+"]���ڷǷ�" ;
	            	}
	        }
	}
	return "";
}

function check_sub_unique(validateObject){
	var fieldKey;
	var value = validateObject.value ;
	//alert("value="+value);
	if(value == null)
	{
			// means the object is an array
			for(var i=0,m=validateObject.length;i<m;i++)
			{
				if(validateObject[i].value.indexOf("|yy|")>0){
				   fieldKey=validateObject[i].value.split("|")[0];
                   if(!check_sub_unique_deal(fieldKey))
					   return false;
                }
			}
	}
	else
	{
				if(value.indexOf("|yy|")>0){
				   fieldKey=value.split("|")[0];
				   if(!check_sub_unique_deal(fieldKey))
					   return false;
				}

	}
	return true;
}
function check_sub_unique_deal(fieldKey){
	var num_Arry=new Array();
	var tL=new Array();
	for(var t=1;t<=row_num;t++){
	  if(document.getElementsByName(fieldKey+t)[0]){
	    num_Arry[num_Arry.length]=document.getElementsByName(fieldKey+t)[0].value;
		tL[tL.length]=num_Arry[num_Arry.length-1];
	  }
	}
	var nary=num_Arry.sort(); 
	var temp='';
	for(var i=0;i<nary.length-1;i++){
	  if (nary[i]==nary[i+1]) 
	  {
		 temp=nary[i];
		 break;
	  } 
	}
	var info='';
	for(var i=0;i<tL.length;i++){
	  if(temp==tL[i]){
		info=info+"��"+(i+1)+"��,";
	  }
	}
	if(temp!=''){ 
	  alert(info+"�ظ����ݣ�"+temp);
	  return false;
	}
	return true;
}

var subCheckSubmitFlg = false;       
function subCheckIsSubmit() {         
	if (!subCheckSubmitFlg) {     
	subCheckSubmitFlg = true;         
	return true;      
	}else{    
	 alert("���Ѿ��ύ���ˣ������ظ��ύ��");    
	 return false;    
	}    
}