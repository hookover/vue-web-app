// JavaScript Document
/**
 *----------------------------------------------------------
 *
 *TASK HELPER By Thinkel
 *
 *----------------------------------------------------------
 */
;(function ( $ ){
	var helperConfig={
		url: "http://127.0.0.1:19311",
		dispatchRouter: "/dispatch.html",
		dispatchPaste: "/dispaste.html",
		dispatchShare: "/share.html",
		installUrl: "http://web.doudou.com/webapp/ddquwan/guide/goinstallhelper",
		jsonp: {
			timeout: 6000,
			callbackParameter: "p",
			callback:"calldata",
			error: function (xOptions, textStatus){
					 alert(textStatus);
					alert("助手未激活!");
			}
		}
	}
	
	$.taskHelper={
		// 安装助手的url
		setInstallUrl: function (installUrl){
			helperConfig.installUrl=installUrl;
		},
		// 安装助手
		installHelper: function (){
			window.location.href=helperConfig.installUrl;
		},
		// 打开助手
		openHelper: function (){
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				window.location.href="http://mapxqq.com/v1/html/go.html?go=ddqwhelper%3A%2F%2Fdoc%3F";
			}else{
				window.location.href="ddqwhelper://doc?";
			}
		},
		getDispatchUrl: function (){
			return 	helperConfig.url+helperConfig.dispatchRouter;
		},
		getPasteUrl: function (){
			return 	helperConfig.url+helperConfig.dispatchPaste;
		},
		getShareUrl: function (){
			return 	helperConfig.url+helperConfig.dispatchShare;
		},
		
		// 检查助手是否在线
		checkOnline: function (success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl(),
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		// 发送点击数据
		dispatchEventC: function (params, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl()+"?event_c="+params,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		// 是否安装
		dispatchInstalled: function (params, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl()+"?installed="+params,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		// 获取设备信息
		getDeviceData: function (success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: helperConfig.url+"/device.html",
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		// ios 7以上打开指定应用
		openPackage: function (package, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl()+"?open="+package,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		
		// ios 7以上打开指定URL
		openUrl: function (urllink, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl()+"?url="+urllink,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		
		// 打开联盟广告平台
		openAdPlatform: function (adplatform, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl()+"?adplatform="+adplatform,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		// 点击复制
		dispatchCopy: function (keyword, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getPasteUrl()+"?keyword="+keyword,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		// 微信好友分享
		dispatchWeixin: function (addr, des, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl()+"?wechat=shared_friend&wechat_share_address="+addr+"&wechat_share_des="+des,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		},
		// QQ好友分享
		dispatchQq: function (addr, des, success, error){
			
			var jsonpOptions=$.extend({}, helperConfig.jsonp, {
				url: this.getDispatchUrl()+"?qqShare=QQshared_friends&qqShare_share_address="+addr+"&qqShare_share_des="+des,
				success: success,
				error: error
			});
			
			$.jsonp(jsonpOptions);
		}
  };
	
})( jQuery );

