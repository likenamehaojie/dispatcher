/**
 * �Ҳ���ٲ���
 * kongge@office.weiphone.com
 * 2012.06.07
*/
jQuery(function($){
	//����DOM
	var 
	quickHTML = '<div class="quick_links_panel"><div id="quick_links" class="quick_links"><a href="#top" class="return_top"><i class="top"></i><span>���ض���</span></a><a href="'+smsUrl+'" target="_blank"><i class="message"></i><span>����Ϣ</span></a><a href="'+account_order_url+'" target="_blank"><i class="setting"></i><span>��������</span></a></div><div class="quick_toggle"><a href="javascript:;" class="toggle" title="չ��/����"></a></div></div><div id="quick_links_pop" class="quick_links_pop hide"></div>',
	quickShell = $(document.createElement('div')).html(quickHTML).addClass('quick_links_wrap'),
	quickLinks = quickShell.find('.quick_links');
	quickPanel = quickLinks.parent();
	quickShell.appendTo('body');
	
	//�������ݲ��� 
	var 
	quickPopXHR,
	loadingTmpl = '<div class="loading" style="padding:30px 80px"><i></i><span>Loading...</span></div>',
	popTmpl = '<div class="title"><h3><i></i><%=title%></h3></div><div class="pop_panel"><%=content%></div><div class="arrow"><i></i></div><div class="fix_bg"></div>',
	historyListTmpl = '<ul><%for(var i=0,len=items.length; i<5&&i<len; i++){%><li><a href="<%=items[i].productUrl%>" target="_blank" class="pic"><img alt="<%=items[i].productName%>" src="<%=items[i].productImage%>" width="60" height="60"/></a><a href="<%=items[i].productUrl%>" title="<%=items[i].productName%>" target="_blank" class="tit"><%=items[i].productName%></a><div class="price" title="����"><em>&yen;<%=items[i].productPrice%></em></div></li><%}%></ul>',
	newMsgTmpl = '<ul><li><a href="'+account_comment_url+'"><span class="tips">�»ظ�<em class="num"><b><%=items.commentNewReply%></b></em></span>��Ʒ����/ɹ��</a></li><li><a href="'+account_consult_url+'"><span class="tips">�»ظ�<em class="num"><b><%=items.consultNewReply%></b></em></span>��Ʒ��ѯ</a></li><li><a href="'+account_message_url+'"><span class="tips">�»ظ�<em class="num"><b><%=items.messageNewReply%></b></em></span>�ҵ�����</a></li><li><a href="'+account_arrival_url+'"><span class="tips">��֪ͨ<em class="num"><b><%=items.arrivalNewNotice%></b></em></span>����֪ͨ</a></li><li><a href="'+account_reduce_url+'"><span class="tips">��֪ͨ<em class="num"><b><%=items.reduceNewNotice%></b></em></span>��������</a></li></ul>',
	quickPop = quickShell.find('#quick_links_pop'),
	quickDataFns = {
		//��������
		my_qlinks: {
			title: '��������',
			content: '<div class="links"><ul><li><a href="'+account_order_url+'" target="_blank">��������</a></li><li><a href="'+smsUrl+'" target="_blank">����Ϣ</a></li></ul></div>',
			init: $.noop
		}
		
		/*
		//վ����Ϣ
		message_list: {
			title: 'վ����Ϣ',
			content: loadingTmpl,
			init: function(ops){
				
				//��ȡʵʱ������
				quickPopXHR = $.ajax({
					url: unreadNewMsgUrl,
					dataType: 'json',
					cache: false,
					success: function(data){
						//var html = '<div class="no_data"><i></i><span>������Ϣ</span></div>';
						var html = ds.tmpl(newMsgTmpl, {
							items: data
						});
						
						if(1 == data.success){
							//��д����
							var shell = $('#quick_links a.message_list'), num = data.msgtotal ;
							if(0 == num){
								shell.find('em').remove();
							}else{
								shell.append('<em class="num"><b>'+ Math.min(99, num) +'</b></em>').show();
							}
							
						}
						quickPop.html(ds.tmpl(popTmpl, {
							title: ops.title,
							content: '<div class="links">'+ html +'</div>'
						}));
					}
				});
			}
		},
		
		//������
		history_list: {
			title: '������',
			content: loadingTmpl,
			init: function(ops){
				//��ȡʵʱ������
				quickPopXHR = $.ajax({
					url: recentlyViewedUrl,
					dataType: 'json',
					cache: false,
					success: function(data){
						var html = '<div class="no_data"><i></i><span>û�������¼</span></div>';
						if(data && data.length > 0){
							html = ds.tmpl(historyListTmpl, {
								items: data
							});
						}
						quickPop.html(ds.tmpl(popTmpl, {
							title: ops.title,
							content: '<div class="slider related_slider history_slider"><div class="inner">'+ html +'</div></div>'
						}));
					}
				});
			}
		},
		//���ͷ�����
		leave_message: {
			title: '���ͷ�����',
			content: '<form action="./" method="post"><div class="types"><input type="radio" name="type" id="type_1" value="1" checked /><label for="type_1">��ϵ�ͷ�</label><input type="radio" name="type" id="type_3" value="2" /><label for="type_3">��ҪͶ��</label><input type="radio" name="type" id="type_4" value="3"/><label for="type_4">������Ϣ�ٱ�</label></div><div class="txt"><textarea name="msg" id="msg" cols="30" rows="10" placeholder="�ͷ���ã�������һ��..."></textarea></div><div class="token"><label for="token_txt">��֤�룺</label><input type="text" class="leavemsg_input" id="token_txt" autocomplete="off" name="token_txt" value="�����ȡ" style="margin-right: 8px; color: rgb(204, 204, 204);"/><span id="code_img"></span></div><div class="btns"><button type="submit" class="btn"><span>�ύ</span></button></div></form>',
			init: function(ops){
				setTimeout(function(){
					quickPop.find('textarea').focus();
				}, 100);
				//��֤��
				quickPop.find('#token_txt').bind('focus', getValidateCode);
				
				//Ч�� & �ύ����
				var form = quickPop.find('form');
				form.attr("action",saveMessageUrl);
				form.bind('submit', function(e){
					e.preventDefault();
					var data = form.serialize();
					if(!checkMessageForm()){
						return false;
					}
					var type=quickPop.find(':radio:checked').val();
					jQuery.ajax({
						type:'post',
						url: saveMessageUrl, 
						data:{"message_style":type,"message_content":$("#msg").val(),"checkcode":$("#token_txt").val()},
						dataType:"json",
						error:function(value){
							ds.dialog.alert('����ʧ��');
						},
						success: function(value){
							var success = value.success;
							var info = value.info;
							if(success==1){
								hideQuickPop();
								showInfoTip(info, 'success');
							}else{
								ds.dialog.alert(info);
							}
						}
					});
				});
			}
		}*/
	};
	
	//showQuickPop
	var 
	prevPopType,
	prevTrigger,
	doc = $(document),
	popDisplayed = false,
	hideQuickPop = function(){
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
		popDisplayed = false;
		prevPopType = '';
		quickPop.hide();
	},
	showQuickPop = function(type){
		if(quickPopXHR && quickPopXHR.abort){
			quickPopXHR.abort();
		}
		if(type !== prevPopType){
			var fn = quickDataFns[type];
			quickPop.html(ds.tmpl(popTmpl, fn));
			fn.init.call(this, fn);
		}
		doc.unbind('click.quick_links').one('click.quick_links', hideQuickPop);

		quickPop[0].className = 'quick_links_pop quick_' + type;
		popDisplayed = true;
		prevPopType = type;
		quickPop.show();
	};
	quickShell.bind('click.quick_links', function(e){
		e.stopPropagation();
	});

	//ͨ���¼�����
	var 
	view = $(window),
	quickLinkCollapsed = !!ds.getCookie('ql_collapse'),
	getHandlerType = function(className){
		return className.replace(/current/g, '').replace(/\s+/, '');
	},
	showPopFn = function(){
		var type = getHandlerType(this.className);
		if(popDisplayed && type === prevPopType){
			return hideQuickPop();
		}
		showQuickPop(this.className);
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
		prevTrigger = $(this).addClass('current');
	},
	quickHandlers = {
		//���ﳵ������������Ʒ��ѯ
		my_qlinks: showPopFn,
		message_list: showPopFn,
		history_list: showPopFn,
		leave_message: showPopFn,
		//���ض���
		return_top: function(){
			ds.scrollTo(0, 0);
			hideReturnTop();
		},
		toggle: function(){
			quickLinkCollapsed = !quickLinkCollapsed;
			
			quickShell[quickLinkCollapsed ? 'addClass' : 'removeClass']('quick_links_min');
			ds.setCookie('ql_collapse', quickLinkCollapsed ? '1' : '', 30);
		}
	};
	quickShell.delegate('a', 'click', function(e){
		var type = getHandlerType(this.className);
		if(type && quickHandlers[type]){
			quickHandlers[type].call(this);
			e.preventDefault();
		}
	});
	
	//Return top
	var scrollTimer, resizeTimer, minWidth = 1350;

	function resizeHandler(){
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(checkScroll, 160);
	}
	function checkResize(){
		quickShell[view.width() > 1340 ? 'removeClass' : 'addClass']('quick_links_dockright');
	}
	function scrollHandler(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkResize, 160);
	}
	function checkScroll(){
		view.scrollTop()>100 ? showReturnTop() : hideReturnTop();
	}
	function showReturnTop(){
		quickPanel.addClass('quick_links_allow_gotop');
	}
	function hideReturnTop(){
		quickPanel.removeClass('quick_links_allow_gotop');
	}

	view.bind('scroll.go_top', resizeHandler).bind('resize.quick_links', scrollHandler);
	quickLinkCollapsed && quickShell.addClass('quick_links_min');
	resizeHandler();
	scrollHandler();
	

	//У����Ʒ��ѯ��
	function  checkMessageForm(){
		var content = $("#msg");
		if(content.val()==""){
			ds.dialog({
				   title : '��Ϣ',
				   content : "����д��ѯ���ݣ�",
				   onyes : function(){
						this.close();
				   },
				   width : 200,
				   lock : true
			});
			return false;
		}

		var checkcode = $("#token_txt").val();
		if(checkcode=="" || checkcode=="�����ȡ"){
			ds.dialog({
				   title : '��Ϣ',
				   content : "��֤�벻��Ϊ�գ���������֤�룡",
				   onyes : function(){
						this.close();
				   },
				   width : 200,
				   lock : true
			});
			return false;
		}
		return true;
	}

	//��ȡ��֤��
	function getValidateCode(){
		this.value="";
		var validateCodeUrl = validateCode_url+'?t='+Math.random();
		$("#code_img").html('<img id="validate_code_img_id_1" src="' + validateCodeUrl + '" height="20" width="80" alt="��֤��" />');
		return;
	}
});

//�״μ���վ����Ϣ����
jQuery(function($){
	var shell = $('#quick_links a.message_list');
	if(shell.find("em").length){
		
		$.ajax({
			url: unreadNewMsgUrl,
			dataType: 'json',
			cache: false,
			success: function(data){
				if(1 == data.success){
					if(0 == data.msgtotal){
						shell.find('em').remove();
					}else{
						var num = data.msgtotal;
						//��Ϣ�������ֻ��ʾ 99
						shell.append('<em class="num"><b>'+ Math.min(99, num) +'</b></em>').show();
					}
				}
			}
		});
	}
});