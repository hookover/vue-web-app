/**
 * Created by huangshuang on 17-5-13.
 */
$(function () {
    $("#save").click(function (){
        var account = $("#account").val();
        var gender = $("#gender").val();
        var aclevel=$('#aclevel').val();
        var str = "";
        var flag = 1;
        $("input[name='img']").each(function(){
            if($(this).val()!=""){
                str += $(this).val() + ",";
            }else{
                flag = 0;
                return false;
            }
        });
        if(str.length>0){
            str = str.substr(0, str.length - 1);
        }
        if(account==""){
            $.Prompt("请输入淘宝账号", 2);
            return false;
        }else if(gender==""){
            $.Prompt("请选择性别", 2);
            return false;
        }else if(aclevel=="0"){
            $.Prompt("请选择信誉等级", 2);
            return false;
        }else if(str==""){
            $.Prompt("请上传淘宝截图", 2);
            return false;
        }else if(flag==0){
            $.Prompt("请上传规定截图", 2);
            return false;
        }else{
            $.Prompt('提交数据中。。。', 5);
        }
    });


    $('#djlist ul>li').click(function(){
        $('#aclevel').val($(this).attr('ta'));
        $('#aclevel').prev().html($(this).attr('tb'));
        $(this).parent().parent().parent().hide();
    });

});