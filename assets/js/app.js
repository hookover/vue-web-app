$(function () {
	alert_select();
	back();
	
	$('.help-man-strong').click(function(){
		var p = $(this),i = p.parent().index();
		if($(this).next().is(":hidden")){
			p.addClass("active");
			p.next().show();
		}else{
			p.next().hide();
			p.removeClass("active");
		}
	});
	function testDisplay(){
	    var div = document.addClass("help-man-p");
	    if(div.style.display=="block")
	    {
	       div.style.display = "none";
	    }
	    else
	    {
	       div.style.display = "block";
	    }
	}
	$('.ui-alert-close').on('click', function (env) {
        $('.ui-alert').hide();
    })
});
function back(){
	$(".back").click(function () {
		window.history.back();
	})
}
function alert_select(){
	$(".ui-alert .select ul li").click(function () {
		$(this).addClass("active").siblings("li").removeClass("active");
	})
}

var snhMsg = new Object();
snhMsg.show=function (str,time,distance) {//str 消息内容,time 消失时间(默认值5000,distance 距离下边的距离)
	var f = this;
	if(f.parent){
		f.parent.remove();
		clearInterval(f.timer);
	}
	f.parent = $("<div></div>");
	f.parent.addClass("ui-alert-small");
	f.msg = $("<div></div>");
	f.msg.addClass("msg-content");
	f.parent.html(this.msg);
	time=!time?5000:time;
	distance=!distance?"50%":distance;
	if(str){
		f.msg.html(str);
		$('body').append(f.parent);
		f.parent.show().animate({"bottom":distance},300);
		f.timer = setInterval(function () {
			f.parent.css({"bottom":"-"+distance});
			f.parent.remove();
			clearInterval(f.timer);
		},time)
	}
}