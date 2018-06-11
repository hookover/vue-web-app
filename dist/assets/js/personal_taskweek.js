/**
 * Created by huangshuang on 17-5-13.
 */
$(function () {
    $(".self_lq_nav span").click(function(){
        $(".self_lq_nav span").removeClass("self_lq_nav_a");
        $(this).addClass("self_lq_nav_a");
        $(this).parent().next(".self_content").find(".scale_min").hide();
        $(this).parent().next(".self_content").find(".scale_min").eq($(this).index()).show();

//            if($(this).index()==0){
//                getlistlast();
//            }else{
//                getlistnow();
//            }
    });

    $(".self_lq_nav span").eq(0).click();
});