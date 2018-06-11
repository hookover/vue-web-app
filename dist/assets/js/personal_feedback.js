/**
 * Created by huangshuang on 17-5-13.
 */
var wordCount = $("#wordCount"),
    textArea = wordCount.find("textarea"),
    word = wordCount.find(".word");
statInputNum(textArea,word);


$(".opinion_yj_y li").click(function(){
    /*
     $(".opinion_yj li").removeClass("opinion_yj_a");
     $(this).addClass("opinion_yj_a");
     */

    if($(this).hasClass('opinion_yj_a')){
        $(this).removeClass("opinion_yj_a");
    }else{
        $(this).addClass("opinion_yj_a");
    }
});

$(".opinion_tx li").click(function(){
    $(".opinion_tx li").removeClass("opinion_tx_a");
    $(this).addClass("opinion_tx_a");
});

function statInputNum(textArea,numItem) {
    var max = numItem.text(),
        curLength;
    textArea[0].setAttribute("maxlength", max);
    curLength = textArea.val().length;
    numItem.text(max - curLength);
    textArea.on('input propertychange', function () {
        numItem.text(max - $(this).val().length);
    });
}