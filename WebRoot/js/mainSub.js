
var sys_j = 0; 
//��������� 
function AddRow_sys(map) 
{ 
	var i = 0; 
	i = document.getElementById("actor_table").rows.length; 
	if(sys_j==0){
		sys_j=i;
	}else{
		sys_j++;
	} 

	var objNewRow = document.getElementById("actor_table").insertRow(i); 
	objNewRow.id = sys_j;
	objNewRow.setAttribute("align","center");
	objNewRow.bgColor = "#fafbfd"; 

	//��ӵ�1�� 
	var objNewCell = document.getElementById("actor_table").rows[i].insertCell(0) 
	objNewCell.innerHTML = sys_j; 
	objNewCell.setAttribute("id","xuhao"+sys_j);

	for(var k=0;k<map.size();k++){	
		var curField=map.keys()[k].split(":")[0];
		objNewCell = document.getElementById("actor_table").rows[i].insertCell(k+1);
		objNewCell.innerHTML = map.values()[k].replaceAll("#no#",sys_j);
		objNewCell.setAttribute("id",curField+"_td"+sys_j);
		if(map.keys()[k].indexOf("SYS_HIDDEN")>-1){
			objNewCell.style.display="none";
		}
	}
	// }
	objNewRow.onmouseout = function(){this.style.backgroundColor='#FAFBFD';};
	objNewRow.onmouseover= function(){this.style.backgroundColor='#EEF1F8';};
  //���˿ؼ�һ���ύ��ȥ����ֵ����ѭ�����ޣ�����ʱ��ѭ�����գ��ж�phone�ؼ��Ƿ���ֵ���еģ�������ȫ����������� 
	document.getElementsByName("actorCount")[0].value = sys_j; 
	paixu();
} 

//ɾ���� 
function DelCurrentRow(k) 
{ 
 if(document.getElementById("actor_table").rows.length==2){alert("���ٱ���һ�ʼ�¼�������޷����棡");}
 else{
 //j=document.getElementById("actor_table").rows.length;
   with(document.getElementById("actor_table")) 
   { 
    for (var i=0;i<rows.length;i++) 
    { 
     if (rows[i].id == k) 
     { 
      deleteRow(i); 
	  paixu();
//	j--;
	//document.getElementsByName("actorCount")[0].value=j;
     } 
    } 
   } 
  } 
}
function paixu(){
  var num=document.getElementsByName("actorCount")[0].value;
  var xh=0;
  for(var h=1;h<=num;h++){
    if(document.getElementById("xuhao"+h)){
	  xh++;
      document.getElementById("xuhao"+h).innerHTML=xh;
	}
  }
}
//��ʽ��ʱ��
Date.prototype.format = function(format){ 
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