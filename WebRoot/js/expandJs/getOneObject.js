function selectAllBranch(form) //ȫѡ
  {
  for (var i=0;i<form1.elements.length;i++)
    {
    var e = form1.elements[i];
    if (e.name == 'id' )
       e.checked = form.branchCheck.checked;
    }
  }
function selectAllRole(form) //ȫѡ
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
                        alert("ÿ��ֻ��ѡ��һ����¼");
                        selectValue = -1 ;
                }
                else if(size <= 0 )
                {
                        alert("����ѡ���¼");
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
                        alert("��ѡ���¼");
						selectValue = -1 ;
                }
           }catch(err)
           {     
         alert("��ǰû�п�ѡ��¼��");
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
								  alert("�ü�¼�����Ѿ�������ϣ����ܽ���ɾ������ѡ������������"); 
								  return -1;
								}
                        }
                }                
                if(size <= 0 )
                {
                        alert("����ѡ���¼");
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
                        alert("��ѡ���¼");
						selectValue = -1 ;
                }
           }catch(err)
           {     
         alert("��ǰû�п�ѡ��¼��");
		 selectValue = 0 ;
           }     
        }
        return selectValue ;
}
//�����Ų鴦���õ�
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
                        alert("����ѡ���¼");
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
                        alert("��ѡ���¼");
						selectValue = '' ;
                }
           }catch(err)
           {     
         alert("��ǰû�п�ѡ��¼��");
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
                        alert("����ѡ���¼");
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
                        alert("��ѡ���¼");
						selectValue = "" ;
                }
           }catch(err)
           {     
				 alert("��ǰû�п�ѡ��¼��");
				 selectValue = "" ;
           }     
        }
        return selectValue ;
}

function addRecord(){ //���
  document.form1.action="/generictableservlet?action=addRecord";
  document.form1.submit();
}

function editRecord(){ //�޸�
  var cp=document.getElementsByName("curPage")[0].value;
  var recordId=getOneObject();
  if(recordId<1){
	  return false;
  }else{
    document.form1.action="/generictableservlet?action=editRecord&recordId="+recordId+"&curPage="+cp;
    document.form1.submit();
  }
}

function editRecordAQ(){ //�޸�(��ȫ�����Բ飬��������˻򶽲�����ֵ���Ͳ����޸ġ�)
  var cp=document.getElementsByName("curPage")[0].value;
  var recordId=getOneObject();
  if(recordId<1){
	  return false;
  }else if(document.getElementById("SUPERVISER"+recordId).innerHTML!=''){
	alert('�Ѷ��飬�����޸ģ�');
	return false;
  }else if(document.getElementById("SUPERVISER"+recordId).innerHTML==''){
    document.form1.action="/generictableservlet?action=editRecord&recordId="+recordId+"&curPage="+cp;
    document.form1.submit();
  }else{
	  return false;
  }
}

function listedit(listId){ //�޸�
    document.form1.action="/generictableservlet?action=editRecord&recordId="+listId;
    document.form1.submit();
}
function delRecord(type){  //ɾ��
var cp=document.getElementsByName("curPage")[0].value;
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('ȷ��ɾ����')){
      document.form1.action="/generictableservlet?action=deleteRecord&delType="+type+"&curPage="+cp;
      document.form1.submit();
	}else{
	  return false;
	}
  }
}
function listdel(type,listid){  //ɾ��
    if(confirm('ȷ��ɾ����')){
      document.form1.action="/generictableservlet?action=deleteRecord&delType="+type+"&id="+listid;
      document.form1.submit();
	}else{
	  return false;
	}
}
function rpdelRecord(){  //����ɾ��
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('ȷ��ɾ����')){
      document.form1.action="/reportinfoservlet?action=delReportRecord";
      document.form1.submit();
	}else{
	  return false;
	}
  }
}
function wfsearchInfo(){ //������list����

  document.form1.action="/wfservlet?action=searchRecord";
  document.form1.submit();
}

function CloseWin() //������ʾ�Ƿ�ر������    
{    
window.opener=null;    
//window.opener=top;    
window.open("","_self");    
window.close();    
} 

function wfRecord(tid,tableName,ITNO){ //���̴���
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
                        alert("����ѡ���¼");
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
                        alert("��ѡ���¼");
						selectValue = '' ;
                }
           }catch(err)
           {     
         alert("��ǰû�п�ѡ��¼��");
		 selectValue = '' ;
           }     
        }
		if(selectValue.length>0){
		  selectValue =selectValue.substring(1);
		}
        return selectValue ;
}



function Subadd(mulId){ //�ӱ����
  document.form1.action="/genericmultableservlet?action=addRecord&mulId="+mulId;
  document.form1.submit();
}

function Subadd_def(mulId){ //�ӱ���ӣ���Ĭ��ֵ
  document.form1.action="/genericmultableservlet?action=editRecord&subIsDef=1&returnCurPage=def&mulId="+mulId;
  document.form1.submit();
}
function SubEdit(mulId){ //�ӱ��޸�
  var recordId=getOneObject(); 
  if(recordId<1){
	  return false;
  }else{
    document.form1.action="/genericmultableservlet?action=editRecord&mulId="+mulId;
    document.form1.submit();
  }
}
function Subdel(mulId){ //�ӱ�ɾ��
  var recordId=getObject();
  if(recordId<1){
    return false;
  }
  else{
    if(confirm('ȷ��ɾ����')){   
      document.form1.action="/genericmultableservlet?action=del&mulId="+mulId;
      document.form1.submit();
	}else{
	  return false;
	}
  }
}


//��ѡ��ȫ��ѡ
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
