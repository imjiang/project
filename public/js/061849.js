$(function(){
	imgLazyloadLib();
	//代码创建一个遮罩层，用于做加载动画
	//setScroll();
	setEventListen();
})
$(window).load(function(){
	diyAutoHeight();
	imgLazyloadLib();
});
$(window).resize(function(){
	if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
	window.resizeTimeout=setTimeout(function(){
		diyAutoHeight();
	},350);
});
function imgLazyloadLib(obj){
	if(obj){
		obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}else{
		$("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}
}
var scrollTime=300;
function setEventListen(){
	$(".ev_c_scrollTop").click(function(){
		//滚动到顶部
		//$("html").getNiceScroll().resize();
		//$("html").getNiceScroll(0).doScrollTop(0);
		$("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
	});
	$(".ev_c_scrollView").click(function(){
		//鼠标点击：滚动到模块位置
		var settings=settingsLib($(this));
		var viewid=settings.getSetting('eventSet.scrollView');
		if($("#"+viewid).length>0){
			//$("html").getNiceScroll().resize();
			//$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
			$("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
		}
	});
	$(".ev_c_showView").click(function(){
		//鼠标点击：显示模块
		showEventView($(this));
	});
	$(".ev_c_hidView").click(function(){
		//鼠标点击：隐藏模块
		hidEventView($(this));
	});
	$(".ev_c_tabView").click(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".ev_m_tabView").hover(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".view").click(function(){
		$(this).children(".view_contents").addClass("diyCurTab");
		var settings=settingsLib($(this));
		var unitViewSet=settings.getSetting('unitViewSet');
		if(unitViewSet&&unitViewSet.length>0){
			for(key in unitViewSet){
				$("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
			}
		}
	});
}
function showHidEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!showViews)showViews=new Array();
	if(!hidViews)hidViews=new Array();
	var doubleKey=new Array();
	//获取重复值
	if(showViews.length>0){
		for(s_key in showViews){
			if(hidViews.length>0){
				for(h_key in hidViews){
					if(showViews[s_key]==hidViews[h_key]){
						doubleKey.push(showViews[s_key]);
					}
				}
			}
		}
	}
	//隐藏
	if(hidViews.length>0){
		for(key in hidViews){
			if($.inArray(hidViews[key],doubleKey)<0){
				$("#"+hidViews[key]).css({"display":"none"});
				diyAutoHeight($("#"+hidViews[key]));
			}
		}
	}
	//显示
	if(showViews.length>0){
		for(key in showViews){
			if($.inArray(showViews[key],doubleKey)<0){
				$("#"+showViews[key]).css({"display":"block"});
				diyAutoHeight($("#"+showViews[key]));
			}
		}
	}
	//双向显示
	if(doubleKey.length>0){
		for(key in doubleKey){
			if($("#"+doubleKey[key]).length>0){
				if($("#"+doubleKey[key]).is(":hidden")){
					$("#"+doubleKey[key]).css({"display":"block"});
					diyAutoHeight($("#"+doubleKey[key]));
				}else{
					$("#"+doubleKey[key]).css({"display":"none"});
					diyAutoHeight($("#"+doubleKey[key]));
				}
			}
		}
	}
}
function showEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	if(!showViews)showViews=new Array();
	if(showViews.length>0){
		for(key in showViews){
			$("#"+showViews[key]).css({"display":"block"});
			diyAutoHeight($("#"+showViews[key]));
		}
	}
}
function hidEventView(obj){
	var settings=settingsLib(obj);
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!hidViews)hidViews=new Array();
	if(hidViews.length>0){
		for(key in hidViews){
			$("#"+hidViews[key]).css({"display":"none"});
			diyAutoHeight($("#"+hidViews[key]));
		}
	}
}
function getPageScrollTop(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
function getNowPage(){
	var width=$(window).width();
	var max_width=window.DIY_PAGE_SIZE;
	max_width=parseFloat(max_width);
	if(isNaN(max_width))max_width=1200;
	if(width>=max_width){
		return 'pc';
	}else if(width>=640){
		return 'pad';
	}else{
		return 'mobile';
	}
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
    	$(".scrollToTop_"+nowPage).each(function(){
    		var old_top=$(this).attr("old_top_"+nowPage);
    		var old_left=$(this).attr("old_left_"+nowPage);
    		var old_width=$(this).attr("old_width_"+nowPage);
    		if(!old_top||old_top==""){
    			old_top=$(this).offset().top;
    			$(this).attr("old_top_"+nowPage,old_top);
    		}
    		if(!old_left||old_left==""){
    			old_left=$(this).offset().left;
    			$(this).attr("old_left_"+nowPage,old_left);
    		}
    		if(!old_width||old_width==""){
    			old_width=$(this).width();
    			$(this).attr("old_width_"+nowPage,old_width);
    		}
    		old_top=parseFloat(old_top);
    		old_left=parseFloat(old_left);
    		old_width=parseFloat(old_width);
    		if(scrollTop>=old_top){
    			$(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
    			$(this).parents(".view").css({"z-index":9999999});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
    			$(this).parents(".layout").css({"z-index":9999999});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
    		}else{
    			$(this).css({"position":"","z-index":"","top":"","width":"","left":""});
    			$(this).parents(".view").css({"z-index":""});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":""});
    			$(this).parents(".layout").css({"z-index":""});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":""});
    			$(this).attr("old_top_"+nowPage,null);
    			$(this).attr("old_left_"+nowPage,null);
    			$(this).attr("old_width_"+nowPage,null);
    		}
    	});
    }
});
function diyAutoHeight(obj){
	if(obj&&obj.length>0){
		//针对选项卡做特殊处理
		if(obj.children(".view_contents").children("form").length>0){
			if(obj.children(".view_contents").children("form").children(".view").length>0){
				obj.children(".view_contents").children("form").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
			if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
				obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else{
			diyAutoHeightDo(obj);
		}
	}else{
		setTimeout(function(){
			$(".view").each(function(){
				if(!$(this).hasClass("includeBlock")){
					diyAutoHeightDo($(this));
				}
			});
		},500);
	}
}
function diyAutoHeightFatherDo(father,obj){
	var settings=settingsLib(father);
	var autoHeight=settings.getSetting('autoHeight');
	if(autoHeight&&autoHeight=="true"){
		//开启了允许自动高度
		var minHeight=obj.offset().top+obj.height()-father.offset().top;
		if(obj.siblings(".view").length>0){
			obj.siblings(".view").each(function(){
				if($(this).is(":visible")){
					var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
					if(tempHeight>minHeight){
						minHeight=tempHeight;
					}
				}
			});
		}
		father.css({"height":minHeight+"px"});
		diyAutoHeightDo(father);
	}
}
function diyAutoHeightDo(obj){
	if(obj.is(":visible")){
		var father=obj.parents(".view").first();
		if(father.length<=0)father=obj.parents(".layout").first();
		if(father.length>0){
			var settings=settingsLib(father);
			var autoHeight=settings.getSetting('autoHeight');
			if(autoHeight&&autoHeight=="true"){
				if(father.offset().top+father.height()<obj.offset().top+obj.height()){
					father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
					diyAutoHeightDo(father);
				}else{
					diyAutoHeightFatherDo(father,obj);
				}
			}
		}
	}
}
function setScroll(){
	if(typeof($("html").niceScroll)=="function"){
		$("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});	
	}else{
		setTimeout(setScroll,500);
	}
}
var settingsLib=function(view){
	var main={
		view:null,
		setup:function(obj){
			if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
				this.init(window.viewsSettings[obj.attr("id")]);
				this.view=obj;
			}else{
				this.init({});
			}
		},
		init:function(obj){
			if(typeof(obj)=='object'){
				this.settings=obj;
			}else if(obj!=""){
				eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
			}else{
				this.settings={};
			}
		},
		setSetting:function(k,v){
			if(!this.settings){
				this.settings={};	
			}
			var keyArray=k.split(".");
      		var val='this.settings';
			for (key in keyArray){
				if(keyArray[key]&&keyArray[key]!=''){
					if(eval(val+'["'+keyArray[key]+'"]')){
						val=val+'["'+keyArray[key]+'"]';
					}else{
						eval(val+'["'+keyArray[key]+'"]={}');
						val=val+'["'+keyArray[key]+'"]';
					}
				}
			}
			if(v==null){
				eval("delete "+val);		
			}else{
				eval(val+"=v");
			}
		},
		getSetting:function(key){
			if(!this.settings){
				this.settings={};	
			}
			if(key){
				var keyArray=key.split(".");
				var val='this.settings';
				for (key in keyArray){
					if(keyArray[key]&&keyArray[key]!=''){
						if(eval(val+'["'+keyArray[key]+'"]')){
							val=val+'["'+keyArray[key]+'"]';
							continue;
						}else{
							val=null;
							break;
						}
					}
				}
				return eval(val);
			}else{
				return this.settings;	
			}
		},
		saveSettings:function(obj){
			if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
				window.viewsSettings[obj.attr("id")]=this.settings;
			}else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
				window.viewsSettings[this.view.attr("id")]=this.settings;
			}
		}
	};
	if(view){
		main.view=view;
		main.setup(view);	
	}
	return main;
}

function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
}

// function RequestURL(viewid, sys_url, moreParams){
// 	var serverUrl = 'http://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
// 	var settings = settingsLib($("#"+viewid));
// 	var params = "";
// 	if(settings && settings.getSetting("data")){
// 		$.each(settings.getSetting("data"), function(key, val){
// 			if($.isArray(val)){
// 				$.each(val, function(key2, val2){
// 					params += "&"+key+"[]="+val2;
// 				});
// 			}else{
// 				params += "&"+key+"="+val;
// 			}
// 		});
// 		if(params) serverUrl += params;
// 	}
// 	var params2 = GetUrlPara();
// 	if(params2) serverUrl += "&" + params2;
// 	if(moreParams) serverUrl += "&" + moreParams;
// 	var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
// 	//$.ajaxSettings.async = false;
// 	$.ajax({
// 	  dataType: 'json',
// 	  url: serverUrl,
// 	  xhrFields:{withCredentials:true},
// 	  success: function(result){
// 		if(result.error) alert(result.error);
// 		else{
// 			if(typeof(history.replaceState) != 'undefined'){
// 				var obj={};
// 				var hstate=JSON.stringify(history.state);
// 				if(hstate!='null'&& hstate!=null){
// 					eval('var hjson = ' + hstate);
// 					obj=hjson;
// 				}
// 				var key="moreParams"+viewid;
// 				obj[key]=moreParams;
// 				//var strparam=viewid+":"+moreParams;
// 				//history.replaceState({("moreParams"+viewid):moreParams},"","");
// 				history.replaceState(obj,"","");
// 			}
// 			$("#"+viewid).children(".view_contents").html(result.html);
// 			$("#"+viewid).children(".view_contents").show();
// 			setTimeout(function(){
// 				diyAutoHeight($("#"+viewid));
// 			},500);
// 		}
// 	}});
// 	setTimeout(function(){commDefault_isFT();},500);
// 	function commDefault_isFT(){
// 		var based_Obj= document.getElementById("based");
// 		var currentlang_Obj= document.getElementById("currentlang");//当前语言
// 		console.log(Request('chlang'))
// 		$(function(){
// 			if (based_Obj){
// 				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
// 				switch( Request('chlang') ){
// 					case "cn-tw":
// 						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
// 						delCookie(JF_cn);
// 						SetCookie(JF_cn, BodyIsFt, 7);
// 						break;
// 					case "cn":
// 					case "en":
// 						BodyIsFt= 0;
// 						delCookie(JF_cn);
// 						SetCookie(JF_cn, 0, 7);
// 						currentlang_Obj.innerHTML = "简体中文";
// 						break;
// 					case "tw":
// 						BodyIsFt= 1;
// 						delCookie(JF_cn);
// 						SetCookie(JF_cn, 1, 7);
// 						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
// 						break;
// 					default:
// 						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
// 							if(getCookie(JF_cn)==null){
// 								BodyIsFt= 1;
// 								SetCookie(JF_cn, 1, 7);
// 								break;
// 							}
// 						}
// 						BodyIsFt= parseInt(getCookie(JF_cn));
// 				}
// 				if(BodyIsFt===1){
// 					StranBody();
// 					document.title = StranText(document.title);
// 				}else{
// 					StranBodyce();
// 					document.title = StranTextce(document.title);
// 				}
// 			}else{
// 				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
// 				if(Default_isFT){
// 					BodyIsFt= 1;
// 					delCookie(JF_cn);
// 					SetCookie(JF_cn, 1, 7);
// 					StranBody();
// 					document.title = StranText(document.title);
// 				}else{
// 					BodyIsFt= 0;
// 					delCookie(JF_cn);
// 					SetCookie(JF_cn, 0, 7);
// 					/*StranBodyce();
// 					document.title = StranTextce(document.title);*/
// 				}
// 			}
//
// 		});
// 	}
// 	/*
// 	$.getJSON(serverUrl, function(result){
// 		if(result.error) alert(result.error);
// 		else{
// 			$("#"+viewid).children(".view_contents").html(result.html);
// 			$("#"+viewid).show();
// 			setTimeout(function(){
// 				diyAutoHeight($("#"+viewid));
// 			},500);
// 		}
// 	});*/
// 	//$("#"+viewid).append(scriptString);
// // }
// //导航公共监听函数
// function setDhListen(style,obj,params){
// 	var father=$(obj).parents(".dh").first();
// 	if(father.length>0){
// 		switch(style){
// 			case 'style_01':
// 				father.find(".miniMenu").toggleClass("Mslide");
// 	            if($("body").css("position")=="relative"){
// 	                $("body").css({"position":"fixed","width":"100%"});
// 	            }else{
// 	                $("body").css({"position":"relative","width":"100%"});
// 	            }
// 				break;
// 			case 'style_02':
// 				if(params=="open"){
// 					father.find(".Style_02_miniMenu .menuMain").css("display","block");
// 				}else{
// 					father.find(".Style_02_miniMenu .menuMain").css("display","none");
// 				}
// 				break;
// 			case 'style_03':
// 				if(params=="mobi_more"){
// 					$(obj).parent().siblings(".mobi_menuUl02").toggle();
// 				}else if(params=="m_icoFont"){
// 					$(obj).parents(".mobi_main").hide();
// 				}else if(params=="mobi_top"){
// 					$(obj).siblings(".mobi_main").show();
// 				}
// 				break;
// 			case 'style_04':
// 				var width = $(window).width();
//                 var newW = width+18;
//                 father.find(".newWidth").css("width",newW);
//                 father.find(".miniMenu").toggleClass("Mslide");
//                 if($("body").css("position")=="relative"){
//                     $("body").css({"position":"fixed","width":"100%"});
//                 }else{
//                     $("body").css({"position":"relative","width":"100%"});
//                 }
// 				break;
// 		}
// 	}
// }
// //-------------选项卡-----------------------------------------------
// //鼠标左右拖拽事件
// function setScroll_Choice(tabId){
// 	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
// 	if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
// 		$(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
// 	}else{
// 		setTimeout(setScroll_Choice,500);
// 	}
// }
//
// /*鼠标悬浮效果*/
// function setHover_Choice(tabId){
// 	$(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
// 	$(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
// 		var index = $(this).index();
// 		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
// 		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
// 		diyAutoHeight($("#"+tabId.substr(4)));
// 	});
// }
// /*鼠标点击效果*/
// function setClick_Choice(tabId){
// 	$(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
// 	$(".tab_nav .tab_li", $("#"+tabId)).click(function(){
// 		var index = $(this).index();
// 		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
// 		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
// 		diyAutoHeight($("#"+tabId.substr(4)));
// 	});
// }
// /*自动播放*/
// function setAnimat_int(tabId,time){
// 	if(!time)time=5;
// 	time=time*1000;
// 	var viewid=tabId.substr(4);
//
// 	if(!window.tabConfigAnimat)window.tabConfigAnimat={};
// 	//初始化
// 	window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
//
// 	$("#"+viewid).mousemove(function(){
// 		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
// 	});
// 	$("#"+viewid).mouseover(function(){
// 		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
// 	});
// 	$("#"+viewid).mouseout(function(){
// 		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
// 	});
//
// 	function doAnimat(){
// 		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
// 		var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
// 		index=index+1;
// 		if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
// 			index=0;
// 		}
// 		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
// 		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
// 		diyAutoHeight($("#"+tabId.substr(4)));
// 		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
// 	}
// }
// //获取鼠标拖拽区域的总宽度
// function tab_style03_init(tabId){
// 	var total=0;
// 	var obj=$(".tab_li", $("#"+tabId));
// 	$(".tab_li", $("#"+tabId)).each(function(){
// 		total+=$(this).width();
// 	});
// 	$(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
// 	$(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");
//
// 	//向左滚动图标事件
// 	$(".tab_left_arrow", $("#"+tabId)).unbind('click');
// 	$(".tab_left_arrow", $("#"+tabId)).click(function(){
// 		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
// 		index = index-1;
// 		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
// 		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
// 	});
//
// 	//向右滚动图标事件
// 	$(".tab_right_arrow", $("#"+tabId)).unbind('click');
// 	$(".tab_right_arrow", $("#"+tabId)).click(function(){
// 		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
// 		var len = $(".tab_nav .tab_li").length;
// 		index = index+1;
// 		if(index >= len){
// 			index = 0;
// 		}
// 		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
// 		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
// 	});
// 	setScroll_Choice(tabId);
// }
// function StranBody(fobj){
// 	var obj= fobj ? fobj.childNodes : document.body.childNodes;
// 	for(var i=0;i<obj.length;i++){
// 		var OO=obj.item(i);
// 		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
// 		if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
// 		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
// 		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
// 		if(OO.nodeType==3){OO.data=StranText(OO.data)}
// 		else StranBody(OO)
// 	}
//
// 	try{
// 		var based_Obj2= document.getElementById("based2");
// 		if(!based_Obj2) { //简繁
// 			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
// 		}else{ //简繁英
// 			based_Obj.innerHTML = "繁体中文";
// 			based_Obj2.innerHTML = "简体中文";
// 		}
// 	}catch(e){}
// }
// function StranBodyce(fobj){
// 	var obj= fobj ? fobj.childNodes : document.body.childNodes;
// 	for(var i=0;i<obj.length;i++){
// 		var OO=obj.item(i);
// 		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
// 		if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
// 		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
// 		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
// 		if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
// 		else StranBodyce(OO)
// 	}
// 	try{
// 		var based_Obj2= document.getElementById("based2");
// 		if(!based_Obj2) { //简繁
// 			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
// 		}else{ //简繁英
// 			based_Obj.innerHTML = "繁体中文";
// 			based_Obj2.innerHTML = "简体中文";
// 		}
// 	}catch(e){}
// }
// function StranText(txt){
// 	if(txt==""||txt==null)return "";
// 	return Traditionalized(txt);
// }
// function StranTextce(txt){
// 	if(txt==""||txt==null)return "";
// 	return Traditionalizedce(txt);
// }
// function JTPYStr(){
// 	return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
// }
// function FTPYStr(){
// 	return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
// }
// function Traditionalized(cc){
// 	var str='',ss=JTPYStr(),tt=FTPYStr();
// 	for(var i=0;i<cc.length;i++){
// 		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
//   		else str+=cc.charAt(i);
// 	}
// 	return str;
// }
//
// function Traditionalizedce(cc){
// 	var str='',tt=JTPYStr(),ss=FTPYStr();
// 	for(var i=0;i<cc.length;i++){
// 		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
//   		else str+=cc.charAt(i);
// 	}
// 	return str;
// }
//
// function _RequestParamsStr(){
// 	var strHref = window.document.location.href;
// 	var intPos = strHref.indexOf('?');
// 	var strRight = strHref.substr(intPos+1);
// 	return strRight;
// }
//
// function Request(strName){
// 	var arrTmp = _RequestParamsStr().split("&");
// 	for(var i=0,len=arrTmp.length; i<len; i++){
// 		var arrTemp = arrTmp[i].split("=");
// 		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
// 		if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
// 			return arrTemp[1];
// 		}
// 	}
// 	return "";
// }
//
// function SetCookie(name,value,hours){
// 	var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
// 	if(checkNum(hours)){
// 		hourstay = hours;
// 	}
//     var exp  = new Date();
//     exp.setTime(exp.getTime() + hourstay*60*60*1000);
//     document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
// }
// function getCookie(name){
//     var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
//     if(arr != null) return unescape(arr[2]); return null;
// }
// function delCookie(name){
//     var exp = new Date();
//     exp.setTime(exp.getTime() - 1);
//     var cval=getCookie(name);
//     if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
// }
// function checkNum(nubmer){
//     var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
//     if (re.test(nubmer))return true;
// 	return false;
// }
//
// DIY_PAGE_SIZE='1200';
// var viewsSettings={"comm_layout_header":{"diyShowName":"\u5171\u4eab\u5934\u90e8","css":{"pc":{"height":"82px","z-index":"2"},"pad":{"height":"85px"},"mobile":{"height":"44px"},"content":{"max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"linear-gradient(180deg,#0c2a35,#0a1c40)"}}}},"settingsBox":{"showTitle":"\u5171\u4eab\u5934\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false","setFixedScroll":{"pc":"2"}},"dh_style_01_1494040258544":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"48.083333333333336%","z-index":"999","position":"absolute","top":"18.5px","left":"51.916666666666664%"},"pad":{"z-index":"999","top":"18.5px","left":"40.99284199363733%","width":"551px"},"mobile":{"width":"42.89473684210526%","z-index":"999","top":"0px","left":"57.10526315789474%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"color":"#ffffff","font-size":"15px","margin-left":"8px"},"%hot>a":{"color":"#ffffff","background":"#f29600","border-top-left-radius":"5px","border-top-right-radius":"5px","border-bottom-left-radius":"5px","border-bottom-right-radius":"5px"},"@mainMenuSet:hover":{"background":"#f29600","border-top-left-radius":"5px","border-top-right-radius":"5px","border-bottom-left-radius":"5px","border-bottom-right-radius":"5px"}},"mobile":{"@icoMenuSet":{"color":"#ffffff"},"%hot>a":{"background":"transparent","color":"#f29600"},"@mainMenuSet:hover":{"background":"transparent","color":"#f29600"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"image_logo_1494040027010":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageLogoConfig","setupFunc":"logoSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"LOGO\u5c5e\u6027\u8bbe\u7f6e"},"style":"logo","styleKind":"LOGO","styleHelpId":1252,"viewCtrl":"logo","css":{"pc":{"width":"19.583333333333332%","height":"45px","position":"absolute","top":"18px","left":"0%"},"pad":{"left":"0.3181336161187699%","top":"25.5px"},"mobile":{"width":"46.8421052631579%","height":"31px","top":"6.5px","left":"0.2631578947368421%"}},"data":{"logoType":1,"logoStyle":1,"logoBlank":"_self"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"LOGO","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"layout_1481159436328":{"css":{"pc":{"height":"831px"},"content":{"max-width":"1200px"},"mobile":{"height":"391px"},"pad":{"height":"738px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"prodPic_style_02_1482461252881":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodPicConfig","setupFunc":"prodPicSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u4ea7\u54c1\u56fe\u7247-\u98ce\u683c1","styleShowName":"\u98ce\u683c\u4e00","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/prodPic_style_1.png","styleShowClass":"two","styleKind":"AAA","viewCtrl":"default","css":{"pc":{"width":"100%","height":"800px","left":"0%","top":"31px","position":"absolute"},"pad":{"width":"400px","height":"300px","left":"31.874999999999996%","top":"30px"},"mobile":{"width":"100%","height":"300px","left":"0%","top":"30px"}},"prodPicArr":["v9Res\/1.jpg","v9Res\/2.jpg","v9Res\/3.jpg","v9Res\/4.jpg","v9Res\/5.jpg"],"name":"prodPic","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u56fe\u7247","eventSet":{"scrollView":"none","type":"none"}},"layout_1496215053528":{"css":{"pc":{"height":"72px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"67px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"280px","display":"block"},"pad":{"height":"267px","display":"block"},"mobile":{"height":"59px","display":"block"},"customCss":{"mobile":{"modelArea":{"border-top-color":"#032e58","border-top-style":"none","border-top-width":"2px"}},"pc":{"@view_contents":{"background":"#ffffff"},"modelArea":{"background":"#0b243a"}}},"content":{"max-width":"1200px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1494210733307":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"280px","position":"absolute","top":"0px","left":"calc(50% - 600px)","z-index":"1"},"pad":{"width":"100%","height":"267px","left":"0%"},"mobile":{"width":"100%","height":"59px","top":"0px","left":"0%","display":"block"},"customCss":{"pc":{"modelArea":{"background":"#0b243a"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494210733495":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"9.29839391377853%","height":"110px","position":"absolute","top":"68px","left":"83.17836010143702%","z-index":"2"},"pad":{"width":"110px","left":"86.03245856353591%","top":"68px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_11\/v9Res\/a1ffc05a8ee0bd7d1d3247d6dc679f88.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494210733500":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"8.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"185px","left":"83.59375%","z-index":"2"},"pad":{"left":"86.66436464088397%","top":"192px","width":"99px"},"mobile":{"width":"26.31578947368421%","top":"200px","left":"36.8421052631579%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","color":"#ffffff","height":"20px","line-height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494210733503":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"9.166666666666666%","height":"110px","position":"absolute","top":"68px","left":"72.61197916666666%","z-index":"2"},"pad":{"width":"110px","left":"71.355317679558%","top":"69px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"800px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_11\/v9Res\/a1ffc05a8ee0bd7d1d3247d6dc679f88.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494210733508":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"8.583333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"185px","left":"72.90364583333333%","z-index":"2"},"pad":{"width":"102px","left":"72.08218232044199%","top":"192px"},"mobile":{"width":"28.421052631578945%","top":"500px","left":"35.78947368421053%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","color":"#ffffff","height":"20px","line-height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494210733519":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"14.539306846999157%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"174px","left":"27.3021449704142%","z-index":"2"},"pad":{"width":"187px","left":"25.321132596685082%","top":"173px"},"mobile":{"width":"96.00000000000001%","top":"1935px","left":"1.999999999999993%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#ffffff","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494210733522":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"2.4513947590870666%","height":"25px","position":"absolute","top":"174px","left":"23.964497041420117%","z-index":"2"},"mobile":{"width":"52.892561983471076%","height":"200px","top":"2235px","left":"23.553719008264462%","display":"none"},"content":{"overflow":"visible"},"pad":{"left":"21.98204419889503%","top":"173px"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_09\/v9Res\/8b8d0c78bde65e37200ccc6b66c4c9de.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1494210733528":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"2.197802197802198%","height":"25px","position":"absolute","top":"142px","left":"24.218089602704985%","z-index":"2"},"mobile":{"width":"52.892561983471076%","height":"200px","top":"0px","left":"23.553719008264462%","display":"none"},"content":{"overflow":"visible"},"pad":{"left":"22.235842541436465%","top":"141px"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_09\/v9Res\/7c3681ea1c7654a673d25055d5e7bfa2.png","imgStyle":{"pc":"3","pad":"null","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494210733531":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"16.14539306846999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"142px","left":"27.303465765004226%","z-index":"2"},"pad":{"width":"183px","left":"25.321132596685082%","top":"141px"},"mobile":{"width":"96.00000000000001%","top":"2435px","left":"1.999999999999993%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#ffffff","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494210733534":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"22.31614539306847%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"69px","left":"24.218089602704985%","z-index":"2"},"pad":{"width":"245px","left":"22.235842541436465%","top":"68px"},"mobile":{"width":"55.00000000000001%","top":"0px","left":"22.499999999999996%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","height":"60px","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"dh_style_03_1494210733548":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c3","styleShowName":"\u98ce\u683c3","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/dh_style_3.png","styleShowClass":"one","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","z-index":"999","left":"54.85416666666667%","top":"61px","position":"absolute"},"pad":{"z-index":"999","width":"72px","top":"64px","left":"53.44440607734806%"},"mobile":{"width":"13.774104683195592%","z-index":"999","left":"43.112947658402206%","top":"59px","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@columnSet":{"background":"transparent","font-size":"12px","height":"178px","line-height":"14px"},"%hot>a":{"background":"transparent"},"@mainMenuSet":{"border-right-style":"none","border-bottom-style":"none","height":"28px","line-height":"28px"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_11_1494210733537":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_11","diyShowName":"\u6587\u5b57\u6a21\u5757-Tahoma","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"16.083333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Tahoma","position":"absolute","top":"27px","left":"24.385416666666668%","z-index":"2"},"pad":{"top":"23.5px","left":"22.234557264050903%","width":"173px"},"mobile":{"width":"9.473684210526317%","top":"0px","left":"45.26315789473684%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"24px","height":"24px","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_11_1494210733552":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_11","diyShowName":"\u6587\u5b57\u6a21\u5757-Tahoma","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"11.416666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Tahoma","position":"absolute","top":"27px","left":"55.93749999999999%","z-index":"2"},"pad":{"width":"86px","top":"23.5px","left":"55.04208642629904%"},"mobile":{"width":"9.210526315789473%","top":"0px","left":"45.39473684210526%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"24px","height":"24px","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_11_1494210733488":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_11","diyShowName":"\u6587\u5b57\u6a21\u5757-Tahoma","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"11.583333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Tahoma","position":"absolute","top":"29px","left":"72.61197916666666%","z-index":"2"},"pad":{"top":"23.5px","left":"71.35471898197243%","width":"17.073170731707318%"},"mobile":{"width":"8.421052631578947%","top":"1600px","left":"45.78947368421053%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"24px","height":"24px","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_logo_1494210733516":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageLogoConfig","setupFunc":"logoSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"LOGO\u5c5e\u6027\u8bbe\u7f6e"},"style":"logo","styleKind":"LOGO","styleHelpId":"1118","viewCtrl":"logo","css":{"pc":{"width":"16.5%","height":"43px","position":"absolute","top":"77.5px","left":"2.40625%","display":"block","z-index":"2"},"pad":{"left":"0%","top":"14px"},"mobile":{"width":"28.947368421052637%","height":"96px","top":"0px","left":"35.526315789473685%","display":"none"}},"data":{"logoType":"1","logoStyle":"1","logoBlank":"_self"},"name":"image","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u56fe\u7247\u6a21\u5757","diyShowName":"LOGO","params":{"filelist":"","urllist":""},"eventSet":{"scrollView":"none","type":"none"}},"qqol_style_01_1496216235557":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"qqOnLineConfig","setupFunc":"qqOnLineSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"QQ\u5728\u7ebf\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"QQ\u5728\u7ebf","styleKind":"AAA","styleHelpId":1284,"viewCtrl":"default","css":{"pc":{"width":"17.497348886532343%","position":"absolute","top":"57px","left":"41.25132555673383%"},"pad":{"top":"57px","left":"0%","width":"17.497348886532343%"},"mobile":{"width":"57.85123966942148%","top":"0px","left":"21.07438016528926%","display":"none"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"name":"qqol","kind":"\u5176\u5b83\u5de5\u5177","showname":"QQ\u5728\u7ebf","data":{"qqolList":["{\"item-type\":\"qq\",\"item-name\":\"QQ\",\"qq\":\"123\",\"qq-icon\":\"3\",\"qq-text\":\"\u5ba2\u670d\u4e00\"}","{\"item-type\":\"qq\",\"item-name\":\"QQ\",\"qq\":\"123456\",\"qq-icon\":\"3\",\"qq-text\":\"\u5ba2\u670d\u4e8c\"}","{\"item-type\":\"separator\",\"item-name\":\"\u5206\u9694\u7ebf\",\"separator-height\":\"2\",\"separator-color\":\"#a0a0a0\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u5de5\u4f5c\u65f6\u95f4\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u5468\u4e00\u81f3\u5468\u65e5 \uff1a8:00-18:00\"}","{\"item-type\":\"separator\",\"item-name\":\"\u5206\u9694\u7ebf\",\"separator-height\":\"2\",\"separator-color\":\"#a0a0a0\"}","{\"item-type\":\"image\",\"item-name\":\"\\u56fe\\u7247\",\"image-url\":\"\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u8054\u7cfb\u65b9\u5f0f\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u7535\u8bdd1\uff1a 186 4561 7962\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u7535\u8bdd2\uff1a 151 2361 7962\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u5fae\u4fe1\uff1a zxczxc\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"QQ\uff1a123456 \"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"QQ\uff1a222222\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u90ae\u7bb1\uff1a32102468@qq.com\"}"],"width":"200","hide":"on"},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1505368577600":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"43.166666666666664%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"227px","left":"28.416666666666668%"},"pad":{"width":"488px","left":"calc(50% - 244px)"},"mobile":{"width":"93.38842975206612%","top":"9.5px","left":"3.305785123966942%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","color":"#ffffff","line-height":"20px","text-align":"center","font-family":"Verdana"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":[],"pad":[],"pc":[]},"moveEdit":[]}}