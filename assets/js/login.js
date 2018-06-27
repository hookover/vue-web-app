/**
 * Created by huangshuang on 17-5-12.
 */
$(function (){
    var msg = "";
    if(IsNullOrEmpty(msg)){
        $.Prompt(msg, 1);
    }
    $("#login").click(function (){
        if($("#login").html()!="登录"){
            return;
        }
        var txtaccount = $("#txtaccount").val();
        var txtpassword = $("#txtpassword").val();
        var rembpwd=$('#rembpwd').prop('checked');
        if(!rembpwd){
            rembpwd=0;
        }else{
            rembpwd=1;
        }

        if (txtaccount=="") {
            $.Prompt("请输入手机号", 2);
            return false;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(txtaccount))){
            $.Prompt("请输入有效手机号", 2);
            return false;
        } else if (txtpassword=="") {
            $.Prompt("请输入密码", 2);
            return false;
        } else {
            $("#login").html("登录中，请稍后。。。");
            var postData = {
				"login_name":txtaccount,
				"login_password":txtpassword,
				//"captcha_verifycode":$('#captcha_verifycode').val(),
				"_token":$('meta[name="csrf-token"]').attr('content'),
                remenberpwd:rembpwd
            }
            AjaxJson('/login', postData, function(data) {
                if(data.result===true){
                    $.Prompt(data.message, 2);
                    Urlhref("/worker");
                }else{
                    $.Prompt(data.message, 3);
                    $("#login").html("登录");
                }
            });
        }
    });
});