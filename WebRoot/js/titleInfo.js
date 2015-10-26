
var pltsPop=null;
var pltsoffsetX = 10;　 // 弹出窗口位于鼠标左侧或者右侧的距离；3-12 合适
var pltsoffsetY = 15;　// 弹出窗口位于鼠标下方的距离；3-12 合适
var pltsPopbg="#FFFFEE"; //背景色
var pltsPopfg="#111111"; //前景色
var pltsTitle="";
document.write('<div id="pltsTipLayer" style="display: none;position: absolute; z-index:10001"></div>');
function pltsinits()
{　　
　　 document.onmouseover　 = plts;
　　 document.onmousemove = moveToMouseLoc;
}
function plts()
{　  
  if(document.getElementById("pltsTipLayer")){  
     var o=event.srcElement;
　　 if(o.alt!=null && o.alt!=""){o.dypop=o.alt;o.alt=""};
　　 if(o.title!=null && o.title!=""){o.dypop=o.title;o.title=""};
　　 pltsPop=o.dypop;
　　 if(pltsPop!=null&&pltsPop!=""&&typeof(pltsPop)!="undefined")
　　 {
　　　 document.getElementById("pltsTipLayer").style.left=-1000;
　　　 document.getElementById("pltsTipLayer").style.display='';
	   pltsPop=pltsPop.replace(/<[^>].*?>/g,'');

　　　 var Msg=pltsPop.replace(/ /g,"<br>");
　　　 Msg=Msg.replace(/ x13/g,"<br>");
　　　 var re=/{(.[^{]*)}/ig;
　　　 if(!re.test(Msg))pltsTitle="<font color='#ffffff' style='color:#ffffff'>说明</font>";
　　　 else{
　　　　 re=/{(.[^{]*)}(.*)/ig;
　　　　　 pltsTitle=Msg.replace(re,"$1")+" ";
　　　　 re=/{(.[^{]*)}/ig;
　　　　 Msg=Msg.replace(re,"");
　　　　 Msg=Msg.replace("<br>","");}
　　　　 //var attr=(document.location.toString().toLowerCase().indexOf("list.asp")>0?"nowrap":"");
　　　　　　　 var content =
　　　　　　 '<table style="FILTER:alpha(opacity=90) shadow(color=#bbbbbb,direction=135);" id=toolTipTalbe border=0><tr><td width="100%"><table cellspacing="1" cellpadding="0" style="width:100%;solid; background-color: #000000;">'+
　　　　　　 '<tr id=pltsPoptop style="background-color: #333333;"><th height=18 valign=bottom style="background-color: #333333;" ><b><p id=topleft align=left><font color=#ffffff>↖</font>'+pltsTitle+'</p><p id=topright align=right style="display:none">'+pltsTitle+'<font color=#ffffff>↗</font></b></th></tr>'+
　　　　　　 '<tr><td "+attr+" style="padding-left:14px;padding-right:14px;padding-top: 6px;padding-bottom:6px;background-color: #B1EA45;line-height:300%"><font size="4" color="black">'+Msg+'</font></td></tr>'+
　　　　　　 '<tr id=pltsPopbot style="display:none"><th height=18 valign=bottom style="background-color: #333333;"><b><p id=botleft align=left><font color=#ffffff>↙</font>'+pltsTitle+'</p><p id=botright align=right style="display:none">'+pltsTitle+'<font color=#ffffff>↘</font></b></th></tr>'+
　　　　　　 '</table></td></tr></table>';
　　　　　　　 document.getElementById("pltsTipLayer").innerHTML=content;
　　　　　　　 document.getElementById("toolTipTalbe").style.width=Math.min(document.getElementById("pltsTipLayer").clientWidth,document.body.clientWidth/2.2)+"px";
　　　　//　　alert(document.getElementById("toolTipTalbe").style.width);

	　 moveToMouseLoc();
　　　　　　　 return true;
　　　 }
　　 else
　　 {
　　　　　 document.getElementById("pltsTipLayer").innerHTML='';
　　　　　　 document.getElementById("pltsTipLayer").style.display='none';
　　　　　　　 return true;
　　 }
  }
}
function moveToMouseLoc()
{
  if(document.getElementById("pltsTipLayer")){
　　　 if(document.getElementById("pltsTipLayer").innerHTML=='')return true;
　　　 var MouseX=event.x;
　　　 var MouseY=event.y;
　　　 //window.status=event.y;
　　　 var popHeight=document.getElementById("pltsTipLayer").clientHeight;
　　　 var popWidth=document.getElementById("pltsTipLayer").clientWidth;
	//alert("MouseY:"+MouseY+"\n pltsoffsetY:"+pltsoffsetY+"\n popHeight:"+popHeight+"\n document.body.clientHeight:"+document.documentElement.clientHeight);
　　　 if(MouseY+pltsoffsetY+popHeight>document.documentElement.clientHeight)
　　　 {
　　　　　　　　 popTopAdjust=-popHeight-pltsoffsetY*1.5;
　　　　　　　　 pltsPoptop.style.display="none";
　　　　　　　　 pltsPopbot.style.display="";
　　　 }
　　　　 else
　　　 {
　　　　　　　　 popTopAdjust=0;
　　　　　　　　 pltsPoptop.style.display="";
　　　　　　　　 pltsPopbot.style.display="none";
　　　 }
　　　 if(MouseX+pltsoffsetX+popWidth>document.documentElement.clientWidth)
　　　 {
　　　　　　　 popLeftAdjust=-popWidth-pltsoffsetX*2;
　　　　　　　 document.getElementById("topleft").style.display="none";
　　　　　　　 document.getElementById("botleft").style.display="none";
　　　　　　　 document.getElementById("topright").style.display="";
　　　　　　　 document.getElementById("botright").style.display="";
　　　 }
　　　 else
　　　 {
　　　　　　　 popLeftAdjust=0;
　　　　　　　 document.getElementById("topleft").style.display="";
　　　　　　　 document.getElementById("botleft").style.display="";
　　　　　　　 document.getElementById("topright").style.display="none";
　　　　　　　 document.getElementById("botright").style.display="none";
　　　 }
	//	scrolltop = (((document.documentElement) || (document.body.parentNode)) && typeof scrollTop == ‘number’ ? t : document.body).scrollTop
//alert(document.documentElement.scrollTop);
		//scrolltop=(((document.documentElement) || (document.body.parentNode) || (document.body.parentNode))).scrollTop;
	
　　　 document.getElementById("pltsTipLayer").style.left=MouseX+pltsoffsetX+(document.body.scrollLeft || document.documentElement.scrollLeft)+popLeftAdjust+"px";
　　　 document.getElementById("pltsTipLayer").style.top=MouseY+pltsoffsetY+(document.body.scrollTop || document.documentElement.scrollTop)+popTopAdjust+"px";
  }
　　　　 return true;
}
pltsinits();

String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

/*
function pltsinits()
{
　　 document.onmouseover　 = plts;
　　 document.onmousemove = moveToMouseLoc;
}
var curLayer;
function plts()
{　var o=event.srcElement;
　　 if(o.alt!=null && o.alt!=""){o.dypop=o.alt;o.alt=""};
　　 if(o.title!=null && o.title!=""){o.dypop=o.title;o.title=""};
　　 pltsPop=o.dypop;
　　 if(pltsPop!=null&&pltsPop!=""&&typeof(pltsPop)!="undefined")
　　 {
　　　	curLayer=layer.tips(pltsPop, $(o), {
			tips: [1, '#3595CC'],
			time: 0,
			shift:5
		});
　　 }
}
function moveToMouseLoc()
{
　　layer.close(curLayer);
}
pltsinits();
*/