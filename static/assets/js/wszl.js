/**
 * Created by huangshuang on 17-5-14.
 */
$(function(){
    //自定义select 添加选中值
    $(".form-select-wszl select").change(function () {
        var s = $(this).siblings("span");
        if(!s.attr("v")){
            s.attr("v",s.html());
        }
        s.html($(this).val()?($(this).val()+($(this).attr("w")?$(this).attr("w"):"")):s.attr("v"));
        s.attr("tid",$(this).find("option[value="+$(this).val()+"]").attr("tid"));
    })
});