$(function() {
	enableTooltips()
});

function enableTooltips(e) {
	var b, a, c, d;
	if (!document.getElementById || !document.getElementsByTagName) {
		return
	}
	AddCss();
	d = document.createElement("span");
	d.id = "btc";
	d.setAttribute("id", "btc");
	d.style.position = "absolute";
	d.style.zIndex = 9999;
	$("body").append($(d));
	$("a[title],span[title],input[title],textarea[title],img[title],div[title],td[title]").each(function() {
		if ($(this).attr("defaultTip") != "false") {
			Prepare($(this)[0])
		}
	})
}
function _getStrLength(c) {
	var b;
	var a;
	for (b = 0, a = 0; b < c.length; b++) {
		if (c.charCodeAt(b) < 128) {
			a++
		} else {
			a = a + 2
		}
	}
	return a
}
function Prepare(f) {
	var g, d, a, e, c;
	d = f.getAttribute("title");
	if (d != null && d.length != 0) {
		f.removeAttribute("title");
		if (_getStrLength(d) > 37 || _getStrLength(d) == 37) {
			g = CreateEl("span", "tooltip")
		} else {
			if (_getStrLength(d) > 10 && _getStrLength(d) < 37) {
				g = CreateEl("span", "tooltip_mid")
			} else {
				g = CreateEl("span", "tooltip_min")
			}
		}
		e = CreateEl("span", "top");
		$(e).html(d);
		g.appendChild(e);
		a = CreateEl("b", "bottom");
		g.appendChild(a);
		setOpacity(g);
		f.tooltip = g;
		f.onmouseover = showTooltip;
		f.onmouseout = hideTooltip;
		f.onmousemove = Locate
	}
}
function showTooltip(a) {
	document.getElementById("btc").appendChild(this.tooltip);
	Locate(a)
}
function hideTooltip(a) {
	var b = document.getElementById("btc");
	if (b.childNodes.length > 0) {
		b.removeChild(b.firstChild)
	}
}
function setOpacity(a) {
	a.style.filter = "alpha(opacity:95)";
	a.style.KHTMLOpacity = "0.95";
	a.style.MozOpacity = "0.95";
	a.style.opacity = "0.95"
}
function CreateEl(b, d) {
	var a = document.createElement(b);
	a.className = d;
	a.style.display = "block";
	return (a)
}
function AddCss() {}
function Locate(c) {
	var a = 0,
		f = 0;
	if (c == null) {
		c = window.event
	}
	if (c.pageX || c.pageY) {
		a = c.pageX;
		f = c.pageY
	} else {
		if (c.clientX || c.clientY) {
			if (document.documentElement.scrollTop) {
				a = c.clientX + document.documentElement.scrollLeft;
				f = c.clientY + document.documentElement.scrollTop
			} else {
				a = c.clientX + document.body.scrollLeft;
				f = c.clientY + document.body.scrollTop
			}
		}
	}
	document.getElementById("btc").style.top = (f + 10) + "px";
	var d = window.document.documentElement.clientWidth;
	var b = $("#btc").width();
	if (d - b < a - 20) {
		document.getElementById("btc").style.left = (d - b) + "px"
	} else {
		document.getElementById("btc").style.left = (a - 20) + "px"
	}
}
if (jQuery) {
	(function(a) {
		a.cursorMessageData = {};
		a(window).ready(function(b) {
			if (a("#cursorMessageDiv").length == 0) {
				a("body").append('<div id="cursorMessageDiv">&nbsp;</div>');
				a("#cursorMessageDiv").hide()
			}
			a("body").mousemove(function(c) {
				a.cursorMessageData.mouseX = c.pageX;
				a.cursorMessageData.mouseY = c.pageY;
				if (a.cursorMessageData.options != undefined) {
					a._showCursorMessage()
				}
			})
		});
		a.extend({
			cursorMessage: function(c, b) {
				if (b == undefined) {
					b = {}
				}
				if (b.offsetX == undefined) {
					b.offsetX = 5
				}
				if (b.offsetY == undefined) {
					b.offsetY = 5
				}
				if (b.hideTimeout == undefined) {
					b.hideTimeout = 1000
				}
				a("#cursorMessageDiv").html(c).fadeIn("slow");
				if (jQuery.cursorMessageData.hideTimeoutId != undefined) {
					clearTimeout(jQuery.cursorMessageData.hideTimeoutId)
				}
				if (b.hideTimeout > 0) {
					jQuery.cursorMessageData.hideTimeoutId = setTimeout(a.hideCursorMessage, b.hideTimeout)
				}
				jQuery.cursorMessageData.options = b;
				a._showCursorMessage()
			},
			hideCursorMessage: function() {
				a("#cursorMessageDiv").fadeOut("slow")
			},
			_showCursorMessage: function() {
				a("#cursorMessageDiv").css({
					top: (a.cursorMessageData.mouseY + a.cursorMessageData.options.offsetY) + "px",
					left: (a.cursorMessageData.mouseX + a.cursorMessageData.options.offsetX)
				})
			}
		})
	})(jQuery)
};