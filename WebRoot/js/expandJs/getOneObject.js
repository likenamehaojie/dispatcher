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
        var opt = document.form1.elements("id") ;
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
        var opt = document.form1.elements("id") ;
    //alert(document.tableForm.elements("remark").value);
        try
        {       opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
                                selectValue = parseInt(opt[i].value) ;
								if(document.getElementsByName("next_step"+selectValue)[0]!=null&&document.getElementsByName("next_step"+selectValue)[0].value=='END'){
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
        var opt = document.form1.elements("id") ;
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
        var opt = document.form1.elements("id") ;
    //alert(document.tableForm.elements("remark").value);
        try
        {       opt[0].checked;
                for(var i=0,m=opt.length;i<m;i++)
                {
                        if(opt[i].checked == true )
                        {
                                size ++ ;
								
								selectValue =selectValue+ opt[i].value +',';
								
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
                        selectValue = opt.value;
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
  var cp=document.getElementsByName("curPage")[0].value;
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
var cp=document.getElementsByName("curPage")[0].value;
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
        var opt = document.form1.elements("id") ;
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


//复选框全不选
function uncheckAll(formvalue) {
	var roomids = document.getElementsByName(formvalue);
	for ( var j = 0; j < roomids.length; j++) {
		if (roomids.item(j).checked == true) {
			roomids.item(j).checked = false;
		}
	}
}

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
