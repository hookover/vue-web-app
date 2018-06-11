/**
 * Created by huangshuang on 17-5-13.
 */
$(function () {
    $("#invite-btn").click(function () {
        $("#share-div").show();
        $("#share-div").find(".alert").addClass("bounceInUp animated").show();
    });
    $("#share-div").click(function () {
        $("#share-div").find(".alert").removeClass("bounceInUp");
        $("#share-div").hide();
    });
});
