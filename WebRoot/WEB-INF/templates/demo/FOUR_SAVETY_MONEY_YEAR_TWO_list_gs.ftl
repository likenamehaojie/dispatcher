<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

<title>[{$TABLEKEYWORD1}]-[{$TABLEKEYWORD2}]-修改页面</title>
<LINK href="/css/Tooltip.css" type="text/css" rel="stylesheet">
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/changeto.js"></script>

<!--新浪导航 -->
<script src="/js/ajaxGetOptions.js"></script>
<script type="text/javascript" src="js/multiSelect/jquery.js"></script>
<script src="/js/mainSub.js"></script>
<script src="/js/ajaxMod.js"></script>
<link rel="stylesheet" type="text/css" href="css/sinaNav/sinaNav.css" />
<script src="/js/sinaNav/sinaNav.js"></script>
<link rel="stylesheet" type="text/css" href="css/index_htrecordAdd.css" />

</head>
<style>
.left_td{text-align:left}
.center_td{text-align:center}
html { overflow-x: hidden; overflow-y: auto; }

</style>


<script>

$(document).ready(function(){
	
	//新浪导航
	setMainNav();

})
function getJYFSTotalByDate(){

	var year=document.getElementsByName("year")[0].value;
	if(year=="")return
	showMessage();
    window.location="/report?flag=FOUR_SAVETY_MONEY_YEAR_TWO_gs&ITNO=1&action=getReport&title1=${title1}&title2=${title2}&cName=${cname}&year="+year+"&commId=${commid}";
   //window.close();
}
function showMessage(){	 
	var state='block';
	var message="<img src=\"/images/loading2.gif\"><font size=\"6\" color=\"#0000CC\"><B>正在加载,请稍等...</B></font>";
	document.getElementById("bg").style.display = "block";
	var info = document.getElementById('excelImportInfomessage');
	info.innerHTML = message;  
	info.style.display=state; 
}

function  getExcel(){
		
	window.open("/report.mv?action=viewDocInfo&templateId=FOUR_SAVETY_MONEY_YEAR_TWO_gs&ITNO=1_excel&xiazaiwenjian=y&$TABLEKEYWORD={$TABLEKEYWORD}");
}

//设置子公司的切换
var curId=0;
function setComm(aObj,cId,cShortName,cType,isViewData){
 if(isViewData=="yes" || cType==4){
		showMessage();
		window.location="/report?flag=FOUR_SAVETY_MONEY_YEAR_TWO_gs&ITNO=1&action=getReport&title1=${title1}&title2=${title2}&cName="+cShortName+"&year=${year}&commId="+cId;				
	}else{	
		
		setSinaHidden1($(aObj).parent().parent(),cId);	
		setSinaHidden2(cId);
	}
}

function getExcel(){
	
	window.location="/report.mv?ITNO=1&action=exportAllReport&exportName=${exportName}&uuids=${uuids}&exportModel=allInOne";
}
</script>


<body>

<div id='bg' style='position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index:1001;  -moz-opacity: 0.7;  opacity:.70;filter: alpha(opacity=30);display:none'></div>
<div id="excelImportInfomessage"  align="center"  style="z-index=1000;position:absolute;top:30%;display:none;">
</div>
<form name="form1" action="" method="post">


 <div class="path"> <img src="images/index/path_ico.gif" />${title1} &gt; ${title2}</div>	

 	<script>
		document.write(getInfoBySqlNo_noHidden(372,'$COMMUNITYID|own'));	
	</script>

		<div class="line_list" >
			<li class="pian">
                 &nbsp;&nbsp;&nbsp;&nbsp;已选：<font color="red"><script>
				 document.write('${cname}')</script></font>
				
           </li>
		   
		  
		  
     </div>
   <table border="0" cellspacing="0" cellpadding="0"  width="100%">
    <tr>
      <td><div class="line_list_center">
          <li><b>年份：<input name="year" type="text" value="${year}" class="input_txt" style="width:50px"  onClick="WdatePicker({dateFmt:'yyyy年'})" onchange="getJYFSTotalByDate()" />&nbsp;&nbsp;&nbsp;&nbsp;${cname}-${title2}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button"  value="导出excel" class="btn" onClick="getExcel()"/></li>
        </div></td>
    </tr>
  </table>
       

	${uuids}
		
${allinone}
	<table>
	<tr>
		  <td id="wxts_tdId" align="left" colspan="7">
			  <span class="font3" >&nbsp 温馨提示：</span>
			  <br>
			  &nbsp 1.“提取标准（元/吨）”和“核定生产能力（万吨）”由矿层级设定。
			  <br>
			  &nbsp 2.“提取额(万元)”=“提取标准（元/吨）”×“核定生产能力（万吨）。
			  
		  </td>
		</tr>
	</table>
  </div>
</form>
</body>
</html>