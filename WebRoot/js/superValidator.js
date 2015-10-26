//***********************************************************
//根据原有验证框架进行改进
//使用时候需要给要增加验证的标签增加check属性
//当check="1"的时候,允许录入为空,如果输入数据就按reg属性绑定的正则表达进行验证.
//当check="2"的时候,就直接按照reg绑定的正则表达式进行验证.
//有问题希望跟我交流下,谢谢支持 QQ6997467
//***********************************************************
//获得所有需要验证的标签
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
		
		//创建提示框
        $('body').append('<table id="tipTable" class="tableTip"><tr><td  class="leftImage"></td> <td class="contenImage" align="left"></td> <td class="rightImage"></td></tr></table>');
		//移动鼠标隐藏刚创建的提示框
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
//利用JQuery功能对标签属性设置表达式
//传入的标签ID组必须为"name1:name2:name3"中间用':'分隔.

//对所有需要数字验证的标签进行设置正则表达式
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
//对所有需要整数验证的标签进行设置正则表达式
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
//对所有需要1到10验证的标签进行设置正则表达式
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

//对所有需要金额验证的标签进行设置正则表达式
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

//对所有需要正浮点验证的标签进行设置正则表达式
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

//对所有需要电子邮件验证的标签进行设置正则表达式
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

//对所有需要邮编验证的标签进行设置正则表达式
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

//对所有需要手机验证的标签进行设置正则表达式
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

//对所有需要身份证验证的标签进行设置正则表达式
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

//对所有需要登录帐号验证的标签进行设置正则表达式
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

//对所有需要非空验证的标签进行设置正则表达式
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

//对所有需要中文验证的标签进行设置正则表达式
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

//对所有需要URL验证的标签进行设置正则表达式
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
//匹配国内电话号码(0511-4405222 或 021-87888822) 
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



//对培训班名称的标签进行设置正则表达式
function setClassName(validatorString)
{
	var validatorStrings="";
	if(validatorString!="")
	{
		validatorStrings=validatorString.split(":");
		for(i=0;i<validatorStrings.length;i++)
		{
			$("[name="+validatorStrings[i]+"]").attr("reg","\\d{4}年(培|复)训第[0-9]{1,2}班");
		}
	}
}


//数据库校验唯一 
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


//数据库 联合校验唯一 

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
         alert("服务器监听中断");
       }
     }
}


String.prototype.replaceAll = function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);    
}