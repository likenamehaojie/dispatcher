function selectAllBranch(form) //全选
  {
  for (var i=0;i<form1.elements.length;i++)
    {
    var e = form1.elements[i];
    if (e.name == 'id' )
       e.checked = form.branchCheck.checked;
    }
  }
function selectAllRole(form) //全选
  {
  for (var i=0;i<form1.elements.length;i++)
    {
    var e = form1.elements[i];
    if (e.name == 'id' )
       e.checked = form.roleCheck.checked;
    }
  }
function getOneObject()
{   
        var selectValue = -1 ;
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
                                selectValue = parseInt(opt[i].value) ;
								
                        }
                }                
                if(size >1)
                {
                        alert("每次只能选择一条记录");
                        selectValue = -1 ;
                }
                else if(size <= 0 )
                {
                        alert("请先选择记录");
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
                        alert("请选择记录");
						selectValue = -1 ;
                }
           }catch(err)
           {     
         alert("当前没有可选记录！");
		 selectValue = 0 ;
           }     
        }
        return selectValue ;
}

    function getObject()
{   
        var selectValue = -1 ;
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
                                selectValue = parseInt(opt[i].value) ;
								if(document.getElementsByName("next_step"+selectValue)[0]!=null && document.getElementsByName("next_step"+selectValue)[0].value=='END'){
								  alert("该记录流程已经处理完毕，不能进行删除，请选择其它操作！"); 
								  return -1;
								}
                        }
                }                
                if(size <= 0 )
                {
                        alert("请先选择记录");
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
                        alert("请选择记录");
						selectValue = -1 ;
                }
           }catch(err)
           {     
         alert("当前没有可选记录！");
		 selectValue = 0 ;
           }     
        }
        return selectValue ;
}
//隐患排查处理用到
function getObjectIdList()
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
                                selectValue = selectValue + "," +
									parseInt(opt[i].value) ;
                        }
                }                
                if(size <= 0 )
                {
                        alert("请先选择记录");
                        selectValue = '' ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue = ','+parseInt(opt.value );
                }
                else
                {
                        alert("请选择记录");
						selectValue = '' ;
                }
           }catch(err)
           {     
         alert("当前没有可选记录！");
		 selectValue = '' ;
           }     
        }
		if(selectValue.length>0){
		  selectValue =selectValue.substring(1);
		}
        return selectValue ;
}
function getManyObject()
{   
        var selectValue = "" ;
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
								var curValue=opt[i].value;
								if(curValue!="")selectValue =selectValue+ curValue +',';
								
                        }
                }                
				selectValue=selectValue.replace(/,$/,"")
                if(size <= 0 )
                {
                        alert("请先选择记录");
                        selectValue = "" ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
					if(opt.value!="")selectValue = opt.value;
                }
                else
                {
                        alert("请选择记录");
						selectValue = "" ;
                }
           }catch(err)
           {     
				 alert("当前没有可选记录！");
				 selectValue = "" ;
           }     
        }
        return selectValue ;
}
function getManyRecordAndNums()
{ 
        var selectValue = "" ;
        var size = 0 ;
        var opt = document.getElementsByName("id");
        try
        {       opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
								var curValue=opt[i].parentNode.id.replace("recordId_td","");
								selectValue =selectValue+ curValue +',';
								
                        }
                }                
			
				selectValue=selectValue.replace(/,$/,"")
                if(size <= 0 )
                {
                        alert("请先选择记录");
                        selectValue = "" ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {	
					selectValue=opt.parentNode.id.replace("recordId_td","");
                }
                else
                {
                        alert("请选择记录");
						selectValue = "" ;
                }
           }catch(err)
           {     
				 alert("当前没有可选记录！");
				 selectValue = "" ;
           }     
        }	
        return selectValue;
}
function addRecord(){ //添加
  document.form1.action="/generictableservlet?action=addRecord";
  document.form1.submit();
}

function editRecord(){ //修改
  var cp=document.getElementsByName("curPage")[0].value;
  var recordId=getOneObject();

  if(recordId<1){
	  return false;
  }else{
    document.form1.action="/generictableservlet?action=editRecord&recordId="+recordId+"&curPage="+cp;
    document.form1.submit();
  }
}

function editRecordAQ(){ //修改(安全隐患自查，如果复查人或督查结果有值，就不能修改。)
  var cp=document.getElementById("url").value;
  var recordId=getOneObject();
  if(recordId<1){
	  return false;
  }else if(document.getElementById("SUPERVISER"+recordId).innerHTML!=''){
	alert('已督查，不能修改！');
	return false;
  }else if(document.getElementById("SUPERVISER"+recordId).innerHTML==''){
    document.form1.action="/generictableservlet?action=editRecord&recordId="+recordId+"&curPage="+cp;
    document.form1.submit();
  }else{
	  return false;
  }
}

function listedit(listId){ //修改
    document.form1.action="/generictableservlet?action=editRecord&recordId="+listId;
    document.form1.submit();
}
function delRecord(type){  //删除
var cp=document.getElementById("url").value;
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('确认删除吗？')){
      document.form1.action="/generictableservlet?action=deleteRecord&delType="+type+"&curPage="+cp;
      document.form1.submit();
	}else{
	  return false;
	}
  }
}
function batUpdateRecord(des,sqlNo){  //删除
var cp=document.getElementById("url").value;
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('确认'+des+'吗？')){
	  if(sqlNo>0){
		ajax_pro_noInfo(sqlNo,getManyObject());
	  }
      document.form1.action="/generictableservlet?action=batUpdateRecord&curPage="+cp;
      document.form1.submit();
	}else{
	  return false;
	}
  }
}

function singleBatUpdateRecord(des,recordId,sqlNo){
	
	uncheckAll('id');
	var roomids = document.getElementsByName('id');
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).value == recordId) {
			roomids.item(j).checked = true;
		}
	}
	batUpdateRecord(des,sqlNo)
}
//批量更新 不需要提交
function batUpdateRecordNoPost(des,sqlNo){  //删除
var cp=document.getElementById("url").value;
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('确认'+des+'吗？')){
	  if(sqlNo>0){
		ajax_pro_updateRecords(sqlNo,getManyObject());
	  }
    //  document.form1.action="/generictableservlet?action=batUpdateRecord&curPage="+cp;
     //  document.form1.submit();
	}else{
	  return false;
	}
  }
}
function singleBatUpdateRecordNoPost(des,recordId,sqlNo){
	
	uncheckAll('id');
	var roomids = document.getElementsByName('id');
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).value == recordId) {
			roomids.item(j).checked = true;
		}
	}
	batUpdateRecordNoPost(des,sqlNo)
}
function listdel(type,listid){  //删除
    if(confirm('确认删除吗？')){
      document.form1.action="/generictableservlet?action=deleteRecord&delType="+type+"&id="+listid;
      document.form1.submit();
	}else{
	  return false;
	}
}
function rpdelRecord(){  //报表删除
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('确认删除吗？')){
      document.form1.action="/reportinfoservlet?action=delReportRecord";
      document.form1.submit();
	}else{
	  return false;
	}
  }
}
function searchInfo(){ //搜索

  document.form1.action="/generictableservlet?action=searchRecord";
  document.form1.submit();
}
function wfsearchInfo(){ //有流程list搜索

  document.form1.action="/wfservlet?action=searchRecord";
  document.form1.submit();
}

function CloseWin() //不会提示是否关闭浏览器    
{    
window.opener=null;    
//window.opener=top;    
window.open("","_self");    
window.close();    
} 

function wfRecord(tid,tableName,ITNO){ //流程处理
  var recordId=getOneObject();
  if(recordId<1){
	  return false;
  }else{
	var step=document.getElementsByName("step"+recordId)[0].value;
    var url ="/wfservlet?action=processInfo&recordId="+recordId+"&templateId="+tid+"&step="+step+"&tableName="+tableName+"&ITNO="+ITNO;
	//alert(url);
	window.open(url);
  }
}

function getObjectIdList()
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
                                selectValue = selectValue + "," +
									parseInt(opt[i].value) ;
                        }
                }                
                if(size <= 0 )
                {
                        alert("请先选择记录");
                        selectValue = '' ;
                }
        }
        catch(error)
        {
           try
           {
                if(opt.checked == true )
                {
                        selectValue = ','+parseInt(opt.value );
                }
                else
                {
                        alert("请选择记录");
						selectValue = '' ;
                }
           }catch(err)
           {     
         alert("当前没有可选记录！");
		 selectValue = '' ;
           }     
        }
		if(selectValue.length>0){
		  selectValue =selectValue.substring(1);
		}
        return selectValue ;
}


//通用方法
function Subadd(mulId){ //从表添加
  document.form1.action="/genericmultableservlet?action=addRecord&mulId="+mulId;
  document.form1.submit();
}

function Subadd_def(mulId){ //从表添加，有默认值
  document.form1.action="/genericmultableservlet?action=editRecord&subIsDef=1&returnCurPage=def&mulId="+mulId;
  document.form1.submit();
}
function SubEdit(mulId){ //从表修改
  var recordId=getOneObject(); 
  if(recordId<1){
	  return false;
  }else{
    document.form1.action="/genericmultableservlet?action=editRecord&mulId="+mulId;
    document.form1.submit();
  }
}
function Subdel(mulId){ //从表删除
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('确认删除吗？')){
      document.form1.action="/genericmultableservlet?action=del&mulId="+mulId;
      document.form1.submit();
	}else{
	  return false;
	}
  }
}


//通用方法(内部调用)	复选框全不选	singleDelRecord,singleDelRecord,singleEditRecord,multiEditRecord内部调用
function uncheckAll(formvalue) {
	var roomids = document.getElementsByName(formvalue);
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).checked == true) {
			roomids.item(j).checked = false;
		}
	}
}
//通用方法	list列表中的单表删除
function singleDelRecord(type,recordId){
	uncheckAll('id');
	var roomids = document.getElementsByName('id');
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).value == recordId) {
			roomids.item(j).checked = true;
		}
	}
	delRecord(type);
}
//通用方法	list列表中的单表修改
function singleEditRecord(recordId){
	uncheckAll('id');
	var roomids = document.getElementsByName('id');
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).value == recordId) {
			roomids.item(j).checked = true;
		}
	}
	editRecord();
}


//通用方法	list列表中的主从表修改
function multiEditRecord(mulId,recordId){
	uncheckAll('id');
	var roomids = document.getElementsByName('id');
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).value == recordId) {
			roomids.item(j).checked = true;
		}
	}
	SubEdit(mulId);
}
//通用方法	list列表中的主从表删除
function multiDelRecord(mulId,recordId){
	uncheckAll('id');
	var roomids = document.getElementsByName('id');
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).value == recordId) {
			roomids.item(j).checked = true;
		}
	}
	Subdel(mulId);
}


String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

var checkSubmitFlg = false;       
function saveProcess() {
	if (!checkSubmitFlg) {     
		checkSubmitFlg = true;         
		return true;      
	}else{    
		 alert("您已经提交过了，不能重复提交！");    
		 return false;    
	}    
}

function exportExcel(tableName,CDNO,ITNO,des) {
	//alert('fdfdf');
	
	var url = '/generictableservlet?action=excelExport&listUrl=excel&excelDes='+des+'&ITNO='+ITNO+'&time='+ Math.random();
	window.open(url);
}


Date.prototype.myFormat = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
} 



function iniUploadDate(){
	//添加默认时间
	var today = new Date();  
	var time_start=new Date(today.getTime()-30 * 24 * 3600 * 1000);  
	time_start=time_start.myFormat("yyyy-MM-dd");
	var time_end = new Date().myFormat("yyyy-MM-dd");
	if(document.getElementById('time_start')){
		document.getElementById('time_start').value=time_start;
		document.getElementById('time_end').value=time_end;
	}
}

//上报撤销方法
function GoBack(tableName){
	var recordRealId=getManyObject();
	if(recordRealId.length>0){
		if(confirm("确定要撤销吗？")){
			app_windows_close(258,tableName+"| charindex('',''a62bcast(id as nvarchar(200))a62b'','' , '',"+recordRealId+",'')>0|isUpload=0");
			window.location.reload();
		}
	}
	
}

