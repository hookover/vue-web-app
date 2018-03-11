<template>
    <!--MOB SHARE BEGIN-->
    <!--<div class="-mob-share-open">点我弹出来</div>-->
    <div class="-mob-share-ui -mob-share-ui-theme-slide-bottom" style="display: none">
        <ul class="-mob-share-list">
            <li class="-mob-share-weibo"><p>新浪微博</p></li>
            <li class="-mob-share-qzone"><p>QQ空间</p></li>
            <li class="-mob-share-qq"><p>QQ好友</p></li>
            <li class="-mob-share-weixin"><p>微信</p></li>
            <li class="-mob-share-douban"><p>豆瓣</p></li>
            <li class="-mob-share-youdao"><p>有道云笔记</p></li>
        </ul>
        <div class="-mob-share-close">取消</div>
    </div>
    <div class="-mob-share-ui-bg"></div>
    <script id="-mob-share" src="share.js"></script>
    <!--MOB SHARE END-->
</template>
<script>
    //调用时配置
    //mobShare.config( {
    //
    //    debug: true, // 开启调试，将在浏览器的控制台输出调试信息
    //
    //    appkey: '', // appkey
    //
    //    params: {
    //        url: '', // 分享链接
    //        title: '', // 分享标题
    //        description: '', // 分享内容
    //        pic: '', // 分享图片，使用逗号,隔开
    //        reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
    //    },
    //
    //    /**
    //     * 分享时触发的回调函数
    //     * 分享是否成功，目前第三方平台并没有相关接口，因此无法知道分享结果
    //     * 所以此函数只会提供分享时的相关信息
    //     *
    //     * @param {String} plat 平台名称
    //     * @param {Object} params 实际分享的参数 { url: 链接, title: 标题, description: 内容, pic: 图片连接 }
    //     */
    //    callback: function( plat, params ) {
    //    }
    //
    //} );
    import share from '../assets/js/share/share.js'

    export default {
        mounted: function () {
            /**
             * SHARE.JS 初始化
             */
            mobShare.ui.init()
        },
    }
</script>
<style>
    .-mob-share-ui-button {
        display: block;
        padding: .6em;
        text-align: center;
        cursor: pointer;
        background: #7DB1EA;
        color: #fff;
        font-weight: 700
    }

    .-mob-share-ui,.-mob-share-ui-bg {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%
    }

    .-mob-share-ui-bg {
        background: #000;
        opacity: .5;
        filter: alpha(opacity=50);
        z-index: 999999998;
        left: 0;
        top: 0
    }

    .-mob-share-ui {
        margin: 0;
        padding: 0;
        background-color: rgba(255,255,255,.95);
        border-bottom: 1px solid #e9e9e9;
        z-index: 999999999;
        color: #333;
        font-size: 16px
    }

    .-mob-share-ui ul.-mob-share-list {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto 1em;
        padding: 0;
        cursor: default
    }

    .-mob-share-ui ul.-mob-share-list li {
        display: inline-block;
        zoom: 1;
        list-style: none;
        margin: 0 .4em 1.5em;
        height: 60px;
        width: 60px;
        text-align: center;
        cursor: pointer;
        background-position-x: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative
    }

    .-mob-share-ui .-mob-share-close,.-mob-share-ui ul.-mob-share-list li p {
        display: block;
        position: absolute;
        width: 100%;
        font-size: .8em;
        text-align: center
    }

    .-mob-share-ui,.-mob-share-ui ul.-mob-share-list,.-mob-share-ui ul.-mob-share-list li {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-weibo {
        background-image: url(/dist/images/sns_icon_1@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-tencentweibo {
        background-image: url(/dist/images/sns_icon_2@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-qzone {
        background-image: url(/dist/images/sns_icon_6@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-qq {
        background-image: url(/dist/images/sns_icon_24@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-renren {
        background-image: url(/dist/images/sns_icon_7@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-kaixin {
        background-image: url(/dist/images/sns_icon_8@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-douban {
        background-image: url(/dist/images/sns_icon_5@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-facebook {
        background-image: url(/dist/images/sns_icon_10@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-twitter {
        background-image: url(/dist/images/sns_icon_11@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-tieba {
        background-image: url(/dist/images/sns_icon_49@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-weixin {
        background-image: url(/dist/images/sns_icon_22@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-pocket {
        background-image: url(/dist/images/sns_icon_26@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-evernote {
        background-image: url(/dist/images/sns_icon_12@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-google {
        background-image: url(/dist/images/sns_icon_14@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-youdao {
        background-image: url(/dist/images/sns_icon_27@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-mingdao {
        background-image: url(/dist/images/sns_icon_41@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-pinterest {
        background-image: url(/dist/images/sns_icon_30@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-tumblr {
        background-image: url(/dist/images/sns_icon_17@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-instapaper {
        background-image: url(/dist/images/sns_icon_25@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-linkedin {
        background-image: url(/dist/images/sns_icon_16@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li.-mob-share-pengyou {
        background-image: url(/dist/images/sns_icon_9@2x_b.png)
    }

    .-mob-share-ui ul.-mob-share-list li p {
        zoom: 1;
        left: 0;
        bottom: -1.5em;
        z-index: 999999997;
        margin: 0 auto;
        line-height: 1em;
        color: #5e5e5e
    }

    .-mob-share-ui .-mob-share-close {
        clear: both;
        bottom: 0;
        z-index: 999999999;
        height: 3em;
        line-height: 3em;
        background: #EFEFEF;
        cursor: pointer
    }

    .-mob-share-weixin-qrcode-content {
        position: fixed;
        z-index: 999999999;
        top: 10%;
        width: 250px;
        padding: 15px;
        background-color: #fff;
        border: 1px solid #333;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box
    }

    .-mob-share-weixin-qrcode-close {
        position: absolute;
        top: 5px;
        right: 5px;
        background: 0 0;
        border: none;
        cursor: pointer;
        width: 20px;
        height: 20px
    }

    .-mob-share-weixin-qrcode-header {
        font-size: 13px;
        text-indent: 0;
        text-align: center;
        padding: 0;
        margin: 10px 0
    }

    .-mob-share-weixin-qrcode {
        width: 250px;
        height: 250px
    }

    .-mob-share-weixin-qrcode-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .5;
        filter: alpha(opacity=50);
        z-index: 999999998;
        left: 0;
        top: 0
    }

    .-mob-share-weixin-tips-content {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999999;
        width: 100%
    }

    .-mob-share-weixin-tips-arrow {
        position: absolute;
        top: 1em;
        right: 2em;
        z-index: 999999998;
        width: 4em;
        height: 5em;
        background: url(/dist/images/weixin_tips.png) center no-repeat;
        background-size: cover
    }

    .-mob-share-weixin-tips {
        width: 9.5em;
        margin: 0;
        padding: 0;
        position: absolute;
        right: 3em;
        top: 5.5em;
        z-index: 999999999;
        color: #fff;
        font-size: 1.2em
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-left ul.-mob-share-list li,.-mob-share-ui.-mob-share-ui-theme-slide-right ul.-mob-share-list li {
        display: block;
        zoom: 0;
        margin: 0 .2em 2em
    }

    .-mob-share-ui.-mob-share-ui-theme {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-top {
        background-color: #fff;
        position: fixed;
        height: auto;
        text-align: center;
        left: 0;
        top: 0
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-top ul.-mob-share-list {
        position: relative;
        padding: 1em 1em 0;
        height: auto;
        width: auto;
        text-align: left
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-top .-mob-share-close {
        position: relative
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-bottom {
        background-color: #fff;
        position: fixed;
        height: auto;
        text-align: center;
        left: 0;
        bottom: 0
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-bottom ul.-mob-share-list {
        position: relative;
        padding: 1em 1em 0;
        height: auto;
        width: auto;
        text-align: left
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-bottom .-mob-share-close {
        position: relative
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-left {
        background-color: #fff;
        position: fixed;
        top: 0;
        width: 6em;
        height: 100%
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-left ul.-mob-share-list {
        position: relative;
        padding: 1em 1em 0;
        height: auto;
        width: auto;
        text-align: left
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-right {
        background-color: #fff;
        position: fixed;
        top: 0;
        width: 6em;
        height: 100%
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-right ul.-mob-share-list {
        position: relative;
        padding: 1em 1em 0;
        height: auto;
        width: auto;
        text-align: left
    }
</style>