/*
var $$ = function (id) {
	return document.getElementById(id);
}

var getByClass = function (oParent, sClass) {
	var aEle = oParent.getElementsByTagName("*");
	var re = new RegExp("\\b" + sClass + "\\b");
	var arr = [];

	for (var i = 0; i < aEle.length; i++) {
		if (re.test(aEle[i].className)) {
			arr.push(aEle[i]);
		}
	}
	return arr;
}

var setMainNav = function () {
	var oMainNav = $$("mainNav");
	var aLi = getByClass(oMainNav, "list")[0].getElementsByTagName("li");
	var aGameHover = getByClass(oMainNav, "game_hover");
	var aHoverCont = getByClass(oMainNav, "hover_cont");

	for (var i = 0; i < aGameHover.length; i++) {
		aGameHover[i].index = i;
		aGameHover[i].onmouseover = function () {
			this.className += " "+"game_hover_current";
			for (var j = 0; j < aHoverCont.length; j++) {
				aHoverCont[j].index_j = j;
				aHoverCont[j].style.display = "none";
				aHoverCont[j].onmouseover = function () {
					this.style.display = "block";
					aGameHover[this.index_j].className += " "+"game_hover_current";
				}

				aHoverCont[j].onmouseout = function () {
					this.style.display = "none";
				}
			}
			if (aHoverCont[this.index]) {
				aHoverCont[this.index].style.display = "block";
			}
		}
	}

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].onmouseout = function () {
			if (aHoverCont[this.index]) {
				aHoverCont[this.index].style.display = "none";
			}
			aGameHover[this.index].className = "game_hover";
		}
	}
}

*/

function setMainNav(){
	//nav pop
	$('.nav .ahot').hover(function() {
		$(this).addClass('cur').find('.navpop').show();
		$('.navwp').css("border-bottom","1px  solid #b8b7b7");
	}, function() {
		$(this).removeClass('cur').find('.navpop').hide();
		$('.navwp').css("border-bottom","");
	});
}


function setSinaHidden1(parentDiv,cId){
	var curIds=$(parentDiv).attr("curIds");//获取当前对象的curIds（当前层级的所有ID）
	if(curIds && curIds!=''){
		for(var i=0;i<curIds.split(',').length-1;i++){
			if(document.getElementById("subComm_"+curIds.split(',')[i])){
				if(cId!=curIds.split(',')[i])document.getElementById("subComm_"+curIds.split(',')[i]).style.display="none"; 
				setSinaHidden1(document.getElementById("subComm_"+curIds.split(',')[i]),cId);
			}

		}
	}
	
}
function setSinaHidden2(cId){
	if(document.getElementById("subComm_"+cId)){
			if(document.getElementById("subComm_"+cId).style.display=="block"){
				document.getElementById("subComm_"+cId).style.display="none"; 
			}else{
				document.getElementById("subComm_"+cId).style.display="block";
			}
	}
}