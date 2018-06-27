/**
 * Created by huangshuang on 17-5-11.
 */
//home 上下句子轮播
$(function () {
    var myIndex = 0,isScrolling=true, lis = $(".myscroll ul li"),wh=$(window).width(),mySetIn;
    lis.parent().append(lis.eq(0).clone());
    lis = $(".myscroll ul li");
    var mySetInFun = function () {
        mySetIn = setInterval(function () {
            var li = lis.eq(myIndex);
            var w = li.find("a").width();
            //console.log(w);
            if(w>wh&&li.find("a").css("margin-left")=='0px'){
                animatRight(li.find("a"),wh-w-70,(w-wh)*110);
                //console.log("dlsfjl");
                return;
            }
            myIndex++;
            lis.parent().animate({"margin-top":-40*myIndex+"px"},300,function () {

                if(myIndex>=1){
                    lis.eq(myIndex-1).find("a").css("margin-left","0px");
                }
                if(myIndex>=lis.length-1){

                    myIndex=0;
                    lis.parent().css({"margin-top":"0px"})
                }
            });
        },3000);
    }
    mySetInFun();
    function animatRight (obj,left,time) {
        clearInterval(mySetIn);
        obj.animate({"margin-left":left+"px"},time,function(){
            mySetInFun();
        });
    }
});

//home 左右图片轮播
var sliderIdName = 'slider',pois;
$(function(){
    var ff_slide = function () {
        var slider = $("#"+sliderIdName);
        var w = $(window).width()>750?750:$(window).width();
        var lis = w*slider.find("ul li");
        var blie = 170/750.0;
        slider.css({"height":w*blie+"px"});
        slider.find("ul").css({"width":lis.lenght*w+"px","height":w*blie+"px"});
        slider.find("ul li").css({"width":w+"px","height":w*blie+"px"});
    }
    ff_slide();
});
var mySwiper2 = new Swiper('#'+sliderIdName,{
    loop : true,
    autoplay: 5000,//可选选项，自动滑动
    pagination : '.swiper-pagination',
    effect : 'slide'
});

//register 开始
var validCode = true;
$(function(){
    $("#imgCode").click(function(){
        $(this).attr("src", "http://m.51jurenqi.com/web/common/renderCaptcha?" + new Date().getTime());
    });

    //检查手机号是否已注册
    $("#phone").blur(function(){
        var phone = $(this).val();
        if(phone==""){
            $.Prompt("请输入手机号", 2);
            return false;
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
            $.Prompt("请输入有效手机号", 2);
            return false;
        }else{
            if(phone.length==11){
                AjaxJson('http://m.51jurenqi.com/web/reg/checkRegister', {phone : phone}, function(data) {
                    if(data.success=="success"){
                        if(data.status==1){
                            $.Prompt(data.message, 2);
                            return false;
                        }else{
                            return true;
                        }
                    } else {
                        $.Prompt(data.message, 3);
                    }
                });
            }
        }
    });
    //提交
    $("#save").click(function(){
        var txtphone = $("#phone").val();
        var txtpassword = $("#password").val();
        var txtsmscaptcha = $("#captcha").val();
        var txtinvitecode = $("#invitecode").val();

        if (txtphone=="") {
            $.Prompt("请输入手机号", 2);
            return false;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(txtphone))) {
            $.Prompt("请输入有效手机号", 2);
            return false;
        } else if (txtpassword=="") {
            $.Prompt("请输入登录密码", 2);
            return false;
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(txtpassword))){
            $.Prompt("登录密码为6-16位数字，字母组合", 2);
            return false;
        } else if (txtsmscaptcha=="") {
            $.Prompt("请输入手机验证码", 2);
            return false;
        } else {
            $.Prompt('提交数据中。。。', 5);
            window.setTimeout(function() {
                var _this = $(this);
                _this.attr("disabled", true);
                _this.addClass("gray-btn");
                var postData = {
                    phone : txtphone,
                    password : txtpassword,
                    captcha : txtsmscaptcha,
                    spreadCode : txtinvitecode
                }
                AjaxJson('http://m.51jurenqi.com/web/reg/registerSubmit', postData, function(data) {
                    if(data.success=="success"){
                        $.Prompt(data.message, 2);
                        window.setTimeout(function() {

                            Urlhref("http://m.51jurenqi.com/web/personal/addTaobao");

                            /*
                             var postData1 = {
                             account : txtphone,
                             password : txtpassword
                             }
                             AjaxJson('http://m.51jurenqi.com/web/login/Login', postData1, function(data) {
                             if(data.success=="success"){
                             $.Prompt(data.message, 2);
                             Urlhref("http://m.51jurenqi.com/web/personal/index");
                             }else{
                             $.Prompt(data.message, 3);
                             _this.attr("disabled", false);
                             _this.removeClass("gray-btn");
                             }
                             });
                             */
                        }, 1000);
                    }else{
                        $.Prompt(data.message, 2);
                        _this.attr("disabled", false);
                        _this.removeClass("gray-btn");
                    }
                });
            }, 500);
        }
    });

    //获取短信验证码
    $("#btnSendCode").click(function(){
        var captcha = $("#imgcaptcha").val();
        var phone = $("#phone").val();
        if (phone=="") {
            $.Prompt("请输入手机号", 2);
            return false;
        }else if (captcha==""){
            $.Prompt("请输入图形验证码", 2);
            return false;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            $.Prompt("请输入有效手机号", 2);
            return false;
        } else {
            $("#imgCode").click();
            //向后台发送处理数据
            if(validCode){
                var postData = {
                    phone : phone,
                    captcha : captcha
                }
                AjaxJson('http://m.51jurenqi.com/web/common/sendSmsNo', postData, function(data) {
                    if(data.success=="success"){
                        $.Prompt(data.message, 1);
                        //倒计时效果
                        var time=60;
                        var code = $("#btnSendCode");
                        if (validCode) {
                            validCode = false;
                            var t = setInterval(function() {
                                time--;
                                code.html(time+"秒");
                                if (time==0) {
                                    clearInterval(t);
                                    code.html("重新获取");
                                    validCode = true;
                                }
                            },1000)
                        }
                    }else{
                        $.Prompt(data.message, 2);
                    }
                });
            }
        }
    });
});
//register 结束

//forget_pass 开始
$(function(){
    //下一步
    $("#next1").click(function() {
        var phone = $("#phone").val();
        if (phone=="") {
            $.Prompt('请输入手机号', 2);
            return false;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            $.Prompt("请输入正确的手机号码", 2);
            return false;
        } else {
            Urlhref("http://m.51jurenqi.com/web/login/forgetPass/1?phone=" + phone);
        }
    });
});
//forget_pass 结束

//forget_pass_phone 开始
var validCode = true;
$(function(){
    var phone = GetQuery('phone');
    $(".mobile").html(phone);

    $("#imgCode").click(function(){
        $(this).attr("src", "http://m.51jurenqi.com/web/common/renderCaptcha?" + new Date().getTime());
    });
    //获取短信验证码
    $("#btnSendCode").click(function(){
        var captcha = $("#imgcaptcha").val();
        if (phone=="") {
            $.Prompt("请输入手机号", 2);
            return false;
        }else if (captcha==""){
            $.Prompt("请输入图形验证码", 2);
            return false;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            $.Prompt("请输入有效手机号", 2);
            return false;
        } else {
            $("#imgCode").click();
            //向后台发送处理数据
            if(validCode){
                var postData = {
                    phone : phone,
                    captcha : captcha
                }
                AjaxJson('http://m.51jurenqi.com/web/common/sendSmsYes', postData, function(data) {
                    if(data.success=="success"){
                        $.Prompt(data.message, 1);
                        //倒计时效果
                        var time=60;
                        var code = $("#btnSendCode");
                        if (validCode) {
                            validCode = false;
                            var t = setInterval(function() {
                                time--;
                                code.html(time+"秒");
                                if (time==0) {
                                    clearInterval(t);
                                    code.html("重新获取");
                                    validCode = true;
                                }
                            },1000)
                        }
                    }else{
                        $.Prompt(data.message, 2);
                    }
                });
            }
        }
    });

    //下一步
    $("#next2").click(function () {
        var code = $("#captcha").val();//短信验证码
        if(code==""){
            $.Prompt('请输入短信验证码', 3);
            return false;
        }else{
            window.setTimeout(function() {
                var postData = {
                    phone : phone,
                    captcha : code
                }
                AjaxJson('http://m.51jurenqi.com/web/common/checkCaptcha', postData, function(data) {
                    if(data.success=="success"){
                        Urlhref("http://m.51jurenqi.com/web/login/forgetPass/2?phone=" + phone);
                    }else{
                        $.Prompt(data.message, 3);
                        return false;
                    }
                });
            }, 500);
        }
    });
});
//forget_pass_phone 结束