//***********************************************************
//����ԭ����֤��ܽ��иĽ�
//ʹ��ʱ����Ҫ��Ҫ������֤�ı�ǩ����check����
//��check="1"��ʱ��,����¼��Ϊ��,����������ݾͰ�reg���԰󶨵������������֤.
//��check="2"��ʱ��,��ֱ�Ӱ���reg�󶨵�������ʽ������֤.
//������ϣ�����ҽ�����,лл֧�� QQ6997467
//***********************************************************
//���������Ҫ��֤�ı�ǩ
var combineStr="";
(function($){
	$(document).ready(function(){
		
		$('select[check],input[check],textarea[check]').tooltip();
	});
})(jQuery);

(function($) {

    $.fn.tooltip = function(options){

		var getthis = this;
        var opts = $.extend({}, $.fn.tooltip.defaults, options);
		
		//������ʾ��
        $('body').append('<table id="tipTable" class="tableTip"><tr><td  class="leftImage"></td> <td class="contenImage" align="left"></td> <td class="rightImage"></td></tr></table>');
		//�ƶ�������ظմ�������ʾ��
        $(document).mouseout(function(){$('#tipTable').hide()});
		
        this.each(function(){
						
            if($(this).attr('tip') != '')
            {
                $(this).mouseover(function(){
                    $('#tipTable').css({left:$.getLeft(this)+'px',top:$.getTop(this)+'px'});
                    $('.contenImage').html($(this).attr('tip'));
                    $('#tipTable').fadeIn("fast");
                },
                function(){
                    $('#tipTable').hide();
                });
            }
            if($(this).attr('check') != '')
            {
//alert("222222="+this.name);
                $(this).focus(function()
				{//alert("222222");
                    $(this).removeClass('tooltipinputerr');
                }).blur(function(){
					var onclickName=this.onclick+""

				if(onclickName!=null && onclickName.indexOf("setday")!=-1)return;
					var tableName;
					if(document.getElementsByName("tableName")[0]){
						tableName=document.getElementsByName("tableName")[0].value;
					}
					var id=document.getElementsByName("id")[0];
					var returnUniqueValue="";
                    if($(this).attr('toupper') == 'true')
                    {
                        this.value = this.value.toUpperCase();
                    }
					if($(this).attr('check') != '')
					{
						
						if($(this).attr('check')=="1")
						{
							
							
							if($(this).attr('value')==null)
							{
								
								$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
							}else
							{
								
								var thisReg = new RegExp($(this).attr('reg'));
								if(thisReg.test(this.value))
								{
									$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
								}
								else
								{
									$(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
								}
								
							}
						}
						if($(this).attr('check')=="2")
						{
							var thisReg = new RegExp($(this).attr('reg'));
							
								if($(this).attr('reg')=="yy"){
									var returnUniqueValue="";
									if(id){
										returnUniqueValue=checkUnique_sub(tableName,this.name,this.value,id.value);
									}else{
										returnUniqueValue=checkUnique(tableName,this.name,this.value);
									}
									
							
									if(returnUniqueValue!='m@o#r$e' && this.value!=""){
										
										$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
									}else{
									
										$(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
										
									}
									
								}else if($(this).attr('reg')=="cy"){
									
									if(combineStr!=""){
										
										combineStr=combineStr.replaceAll(":",",");
										var combineStrArray=combineStr.split(",");
										var combineStrValues="";
										for(i=0;i<combineStrArray.length;i++)
										{
											if($("[name="+combineStrArray[i]+"]").val()==""){
												$("[name="+combineStrArray[i]+"]").removeClass('tooltipinputok').addClass('tooltipinputerr');
												return;
											}
											combineStrValues=combineStrValues+","+$("[name="+combineStrArray[i]+"]").val();
										
										}
										combineStrValues=combineStrValues.substring(1)
					
									}
								
									var returnUniqueValue="";
									if(id){
										returnUniqueValue=checkUnique_sub(tableName,combineStr,combineStrValues,id.value);
									}else{
										returnUniqueValue=checkUnique(tableName,combineStr,combineStrValues);
									}

	
								
									if(returnUniqueValue!='m@o#r$e'){
								
										for(i=0;i<combineStrArray.length;i++)
										{
											$("[name="+combineStrArray[i]+"]").removeClass('tooltipinputerr').addClass('tooltipinputok');					
										}
									}else{
										//alert("22");
										for(i=0;i<combineStrArray.length;i++)
										{
											$("[name="+combineStrArray[i]+"]").removeClass('tooltipinputok').addClass('tooltipinputerr');
										
										}
										
									}
									
								
								
								}else{
									if(thisReg.test(this.value))
									{
										$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
									}
									else
									{
										$(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
									}
								}
						}			
					}
                    
                });
            }
        });
        if(opts.onsubmit)
        {
            $('form').submit( function () {
                var isSubmit = true;
				var tableName;
				if(document.getElementsByName("tableName")[0]){
					tableName=document.getElementsByName("tableName")[0].value;
				}
				var id=document.getElementsByName("id")[0];
                getthis.each(function(){
					if($(this).attr('check')=="1")
						{
							
							
							if($(this).attr('value')==null)
							{
								$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
							}else
							{
								var thisReg = new RegExp($(this).attr('reg'));
								if(thisReg.test(this.value))
								{
									$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
								}
								else
								{
									$(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
									isSubmit = false;
								}
								
							}
							
						}
                    if($(this).attr('check')=="2")
						{
							var thisReg = new RegExp($(this).attr('reg'));
							
								if($(this).attr('reg')=="yy"){
									// alert(this.name);
								
									if(id){
										
										returnUniqueValue=checkUnique_sub(tableName,this.name,this.value,id.value);
									}else{
										returnUniqueValue=checkUnique(tableName,this.name,this.value);
									}
								
									if(returnUniqueValue!='m@o#r$e' && this.value!=""){
										
										$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
									}else{
										
										$(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
										isSubmit = false;
									}
								
								}else if($(this).attr('reg')=="cy"){
									
									if(combineStr!=""){
										
										combineStr=combineStr.replaceAll(":",",");
										var combineStrArray=combineStr.split(",");
										var combineStrValues="";
										for(i=0;i<combineStrArray.length;i++)
										{	
											if($("[name="+combineStrArray[i]+"]").val()==""){
												$("[name="+combineStrArray[i]+"]").removeClass('tooltipinputok').addClass('tooltipinputerr');
												isSubmit = false;
												return;
											}
											combineStrValues=combineStrValues+","+$("[name="+combineStrArray[i]+"]").val();
										
										}
										combineStrValues=combineStrValues.substring(1)
					
									}
								
									var returnUniqueValue="";
									if(id){
										//alert("id="+tableName);
										returnUniqueValue=checkUnique_sub(tableName,combineStr,combineStrValues,id.value);
									}else{
										returnUniqueValue=checkUnique(tableName,combineStr,combineStrValues);
									}

									if(returnUniqueValue!='m@o#r$e'){
										for(i=0;i<combineStrArray.length;i++)
										{
											$("[name="+combineStrArray[i]+"]").removeClass('tooltipinputerr').addClass('tooltipinputok')
										}
										
									}else{
										
										for(i=0;i<combineStrArray.length;i++)
										{
											$("[name="+combineStrArray[i]+"]").removeClass('tooltipinputok').addClass('tooltipinputerr');
						
											isSubmit = false;
										}
								
										
									}
									
								
								}else{
									if(thisReg.test(this.value))
									{
										$(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
									}
									else
									{
										$(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
										isSubmit = false;
									}
								}

								
						}			
                });
                return isSubmit;
            } );
        }
    };

    $.extend({
        getWidth : function(object) {
            return object.offsetWidth;
        },

        getLeft : function(object) {
            var go = object;
            var oParent,oLeft = go.offsetLeft;
            while(go.offsetParent!=null) {
                oParent = go.offsetParent;
                oLeft += oParent.offsetLeft;
                go = oParent;
            }
            return oLeft;
        },

        getTop : function(object) {
            var go = object;
            var oParent,oTop = go.offsetTop;
            while(go.offsetParent!=null) {
                oParent = go.offsetParent;
                oTop += oParent.offsetTop;
                go = oParent;
            }
            return oTop + $(object).height()+ 5;
        },

        onsubmit : true
    });
    $.fn.tooltip.defaults = { onsubmit: true };
})(jQuery);

//***************************************************************************************************************************************************
//����JQuery���ܶԱ�ǩ�������ñ��ʽ
//����ı�ǩID�����Ϊ"name1:name2:name3"�м���':'�ָ�.

//��������Ҫ������֤�ı�ǩ��������������ʽ
function setNumCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^[0-9]+(.[0-9]{1,3})?$");
		}
	}
}
//��������Ҫ������֤�ı�ǩ��������������ʽ
function setIntegeCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^[1-9]\\d*$");
		}
	}
}
//��������Ҫ1��10��֤�ı�ǩ��������������ʽ
function setIntege1Check(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^(?:10|[1-9])$");
		}
	}
}

//��������Ҫ�����֤�ı�ǩ��������������ʽ
function setMoneyCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^(-)?(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){1,2})?$");
		}
	}
}

//��������Ҫ��������֤�ı�ǩ��������������ʽ
function setFloatCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^[0-9]+\\.[0-9]+$");
		}
	}
}

//��������Ҫ�����ʼ���֤�ı�ǩ��������������ʽ
function setMailCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
		}
	}
}

//��������Ҫ�ʱ���֤�ı�ǩ��������������ʽ
function setZipcodeCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^\\d{6}$");
		}
	}
}

//��������Ҫ�ֻ���֤�ı�ǩ��������������ʽ
function setMobileCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^(13|15)[0-9]{9}$");
		}
	}
}

//��������Ҫ���֤��֤�ı�ǩ��������������ʽ
function setIDCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^[1-9]([0-9]{14}|[0-9]{17})$");
		}
	}
}

//��������Ҫ��¼�ʺ���֤�ı�ǩ��������������ʽ
function setUserIDCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^\\w+$");
		}
	}
}

//��������Ҫ�ǿ���֤�ı�ǩ��������������ʽ
function setEmptyCheck(validatorString)
{
	
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg",'.*\\S.*');
		}
	}
}

//��������Ҫ������֤�ı�ǩ��������������ʽ
function setChineseCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$");
		}
	}
}

//��������ҪURL��֤�ı�ǩ��������������ʽ
function setURLCheck(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$");
		}
	}
}
//ƥ����ڵ绰����(0511-4405222 �� 021-87888822) 
function setTell(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","\\d{3}-\\d{8}|\\d{4}-\\d{7}");
		}
	}
}  



//����ѵ�����Ƶı�ǩ��������������ʽ
function setClassName(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","\\d{4}��(��|��)ѵ��[0-9]{1,2}��");
		}
	}
}


//���ݿ�У��Ψһ 
function setUnique(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","yy");
		}
	}
}  


//���ݿ� ����У��Ψһ 

function setCombineUnique(validatorString)
{
	combineStr=validatorString;

	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","cy");
		}
	}
	
} 
//***************************************************************************************************************************************************



var req;
var returnUniqueStr="";
function checkUnique(tableName,fieldName,fieldValue) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	req = newXMLHttpRequest();

	var url="/ajaxcheckunique?tableName="+tableName+"&fieldName="+fieldName+"&fieldValue="+fieldValue+"&time="+ Math.random();

	req.onreadystatechange = getUniqueInfo;

	req.open("GET",url, false);

	req.send();
	return returnUniqueStr;
}

function checkUnique_sub(tableName,fieldName,fieldValue,id) {
    //alert("tableName = "+tableName+" fieldName = "+fieldName+" fieldValue = "+fieldValue);
	req = newXMLHttpRequest();

	var url="/ajaxcheckunique?tableName="+tableName+"&fieldName="+fieldName+"&fieldValue="+fieldValue+"&id="+id+"&time="+ Math.random();

	req.onreadystatechange = getUniqueInfo;

	req.open("GET",url, false);

	req.send();
	return returnUniqueStr;
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

		 //var name=recordInfo.substring(0,recordInfo.indexOf('|'));
		 returnUniqueStr=recordInfo.substring(recordInfo.indexOf('|')+1);
		// alert(returnUniqueStr);
//returnUniqueStr=recordInfo;
		 //alert("ssssssssssss = |"+recordInfo+"|");
        // alert("name = "+name+" value = "+value);
		
         //alert("ssssssssssss = "+document.getElementById('aaa111').innerHTML)
	    //document.getElementById('searchHtml2').innerHTML=recordInfo;
          //return recordInfo;
       } else {

         // An HTTP problem has occurred
         alert("�����������ж�");
       }
     }
}


String.prototype.replaceAll = function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);    
}