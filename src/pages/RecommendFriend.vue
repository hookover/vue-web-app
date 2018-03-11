<template>
    <div>
        <AppHeader>邀请好友</AppHeader>

        <div class="recommend-friend-container">
            <section id="shouyi">
                <!--<div class="title">-->
                    <!--<img src="/dist/images/icon1.png" alt="">今日收徒<b>0</b>人,所有徒弟贡献 <b>0</b>元-->
                <!--</div>-->
                <div class="shouyi-num">
                    <div class="num-left item"><p class="i">累计收益</p><p><b>{{formatYen(share_info.promotion_count)}}</b>元</p></div>
                    <div class="num-right item"><p class="i">徒弟人数</p><p><b>{{share_info.total_promotion_amount ? share_info.total_promotion_amount : 0}}</b>人</p></div>
                </div>
                <div class="rule">收徒奖励规则:徒弟完成"新手任务"后,每完成一个任务你就可获得 <span>任务款x10%分红</span>，单个徒弟可贡献分红上限为20元</div>
            </section>
            <!-- 大使活动入口 -->
            <div class="inlinkArea" style="margin-top: 0.1rem;">
                <a class="inlinkLi copy-data" data-clipboard-target="#copy-data">
                    <div class="inlinkIcon">
                        <img src="/dist/images/taskIcon.png" alt="">
                    </div>
                    <div class="inlinkliText">
                        使用邀请码收徒
                    </div>
                    <div class="linkliSub" id="copy-data">{{profile.promotion_code}}</div>
                </a>
                <a class="inlinkLi -mob-share-open">
                    <div class="inlinkIcon">
                        <img src="/dist/images/inshare.png" alt="">
                    </div>
                    <div class="inlinkliText">
                        分享收徒
                    </div>
                    <div class="linkliSub">一键分享方便快捷</div>
                    <div class="ingotoLink">
                        <img src="/dist/images/arrow.png" alt="">
                    </div>
                </a>

                <router-link class="inlinkLi" :to="{ path: '/recommend-friend/qrcode' }">
                    <div class="inlinkIcon">
                        <img src="/dist/images/incode.png" alt="">
                    </div>
                    <div class="inlinkliText">
                        扫码收徒
                    </div>
                    <div class="linkliSub">面对面收徒</div>
                    <div class="ingotoLink">
                        <img src="/dist/images/arrow.png" alt="">
                    </div>
                </router-link>
            </div>

            <section id="dailog">
                <img src="/dist/images/dailog.png" alt="">
            </section>
            <section id="money">
                <div class="m-top">
                    <span>收徒数</span>
                    <ul>
                        <li><img src="/dist/images/icon2.png" alt="">X10</li>
                        <li><img src="/dist/images/icon2.png" alt="">X110</li>
                        <li><img src="/dist/images/icon2.png" alt="">X300</li>
                        <li><img src="/dist/images/icon2.png" alt="">X548</li>
                    </ul>
                </div>
                <div class="processs">
                    <img src="/dist/images/process.png" alt="">
                    <div class="mask"><div class="runman"><img src="/dist/images/runman.png" alt=""></div></div>
                </div>
                <div class="m-middle">
                    <span>年收益</span>
                    <ul>
                        <li><img src="/dist/images/money1.png" alt=""></li>
                        <li><img src="/dist/images/money2.png" alt=""></li>
                        <li><img src="/dist/images/money3.png" alt=""></li>
                        <li><img src="/dist/images/money4.png" alt=""></li>
                    </ul>
                </div>
                <div class="m-bottom">
                    <ul>
                        <li><span class="lagerTx">1825</span>元</li>
                        <li><span class="lagerTx">20075</span>元</li>
                        <li><span class="lagerTx">54750</span>元</li>
                        <li><span class="lagerTx">100010</span>元</li>
                    </ul>
                </div>
            </section>


            <!--<footer>-->
                <!--<a href="/invite/inviterank/"><div class="btnn">看看别人收入有多少吧~ </div></a>-->
            <!--</footer>-->
        </div>
        <Share></Share>
    </div>
</template>

<script>
    import AppHeader from '../components/Header.vue'
    import Share from '../components/Share.vue'
    import * as _ from '../utils/tool'
    import common from '../common/common'
    import api from '../utils/api'
    import { mapGetters } from 'vuex'

    export default{
        components: {
            Share,
            AppHeader,
        },
        data: function () {
            return {
                share_info: {},
            }
        },
        computed: {
            ...mapGetters({
                profile: 'getProfile'
            })
        },
        watch: {
          profile: function (val, old) {
              this.initShare();
          }
        },
        mounted: function () {
            this.initShare();

            let self = this;
            setTimeout(function () {
                //copy
                self.clipboard = new Clipboard('.copy-data');
                self.clipboard.on('success', function (e) {
                    _.toast('内容已经拷贝', 'text',1000);
                    e.clearSelection();
                });
                self.clipboard.on('error', function (e) {
                    let str = $('#copy-data').text();
                    self.$vux.alert.show({
                        title: '请手动拷贝以下内容',
                        content: str,
                    });
                    e.clearSelection();
                });
            },1000);

            this.getRecommendFriendInfo();
        },
        methods: {
            formatYen: function (yen) {
                return _.formatYen(yen)
            },
            getRecommendFriendInfo: function () {
                api.getRecommendFriendInfo().then(
                    res => {
                        this.share_info = res.data;
                    },
                    p_obj => {

                    }
                )
            },
            initShare: function () {
                if($.isEmptyObject(this.profile)) {
                    return false;
                }
                mobShare.config( {
                    params: {
                        debug: false,
                        url: _.shareUrl((this.profile.hasOwnProperty('promotion_code') ? this.profile.promotion_code : 0)), // 分享链接
                        title: '任务宽试玩试用平台，工资隔日结，安全无押金，轻松月赚3000元', // 分享标题
                        description: '我在任务宽送你1元！任务宽平台首次赚满10元提现，以后随时随意额度提现，赶紧来赚零花钱吧！', // 分享内容
                        pic: 'http://renwukuan.com/dist/images/share.png', // 分享图片，使用逗号,隔开
                        reason:'自从用了任务宽，舞也不跳了，游戏也不玩了，麻麻再也不用担心我的零花钱不够用了，任务款拿到手软，数钱数到手抽筋，最棒的兼职平台，我在任务宽赚零花钱，我为任务宽带盐^_^',//自定义评论内容，只应用与QQ,QZone与朋友网
                    },

                    /**
                     * 分享时触发的回调函数
                     * 分享是否成功，目前第三方平台并没有相关接口，因此无法知道分享结果
                     * 所以此函数只会提供分享时的相关信息
                     *
                     * @param {String} plat 平台名称
                     * @param {Object} params 实际分享的参数 { url: 链接, title: 标题, description: 内容, pic: 图片连接 }
                     */
                    callback: function( plat, params ) {

                    }
                } );
            }
        }
    }
</script>

<style>
    html{
        font-size:  28px;
    }
    .recommend-friend-container{
        background: #F3F3F3;
        color: #fff;
        font-size: 12px;
    }
    #shouyi{
        font-size: 0.373333rem;
        background:#f9a71a;
    }
    #shouyi .title{
        height: 1rem;
        line-height: 1rem;
        position: relative;
        padding-left:1.0rem;
    }
    #shouyi .title img{
        position: absolute;
        width: 0.466667rem;
        height: 0.466667rem;
        left:0.466667rem;
        top:50%;
        transform: translatey(-50%);-ms-transform: translateY(-50%);-moz-transform: translateY(-50%);-webkit-transform: translateY(-50%);
    }
    #shouyi .title b{
        color:#FFE372;
    }
    #shouyi .shouyi-num{
        border-top: 1px solid #ffae6a;
        border-bottom: 1px solid #ffae6a;
        padding: 0.6rem 0;
        overflow: hidden;
        font-size: 0.43rem;
    }
    #shouyi .item{
        float: left;
        width: 50%;
        text-align: center;
    }
    #shouyi .item p.i{
        margin-bottom: 0.32rem;
    }
    #shouyi .item b{
        font-size: 0.62rem;
        font-weight: 500;
    }
    #shouyi .rule{
        padding: 0.4rem 0.533333rem;
        padding-bottom: 0.426667rem;
        line-height: 1.8;
    }
    #shouyi .rule span{
        color:#FFE372;
        font-size: 13px;
    }
    .inlinkArea{
        background: #fff;
        margin: 0.333333rem 0;
    }
    .inlinkLi{
        margin-left: 0.533333rem;
        height: 1.4rem;
        border-bottom: 0.026667rem solid #F1F1F1;
        line-height: 1.4rem;
        font-size: 0.373333rem;
        padding-right: 0.48rem;
        position: relative;
        display: block;
    }
    .inlinkIcon{
        position: absolute;
        width: 0.666667rem;
        height: 0.666667rem;
        top:50%;
        transform: translatey(-50%);-ms-transform: translateY(-50%);-moz-transform: translateY(-50%);-webkit-transform: translateY(-50%);
    }
    .inlinkliText{
        display: inline-block;
        vertical-align: top;
        color: #434343;
        font-size: 0.4rem;
        margin-left: 1.013333rem;
    }
    .ingotoLink{
        width: 0.23rem;
        position: absolute;
        top: 50%;
        right: 0.453333rem;
        -ms-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
    }
    .linkliSub{
        display: inline-block;
        vertical-align: top;
        color: #aaa;
        font-size: 0.373333rem;
        float: right;
        margin-right: 0.693333rem;
    }
    #dailog{
        background: #fff;
        padding: 0.666667rem 0;
    }
    #money{
        padding: 0.533333rem 0.346667rem 0.933333rem;
        background: #fff;
        color:#17B0F6;
        font-size: 0.293333rem;
        overflow: hidden;
    }
    #money .m-top,#money .m-middle,#money .m-bottom{
        overflow: hidden;
        width: 100%;
        position: relative;
    }
    #money .m-top span,#money .m-middle span{
        float: left;
        width: 12%;
        font-size: 0.32rem;
        color: #333;
        left: 0;
    }
    #money .m-top ul,#money .m-middle ul{
        float: right;
        overflow: hidden;
        width: 92%;
    }
    #money .m-top ul li,#money .m-bottom ul li{
        float: left;
        width: 25%;
        text-align: center;
        letter-spacing: 3px;
    }
    #money .m-top ul li img{
        display: inline-block;
        width:0.346667rem;
        height:0.346667rem;
    }
    .processs{
        margin-top: 0.56rem;
        width: 100%;
        padding-left: 8%;
        position: relative;
    }
    .processs .mask{
        position: absolute;
        width: 94%;
        height: 100%;
        top:0;
        left:8%;
        background: rgba(255, 255, 255, 0.6);
    }
    .processs .mask .runman{
        width: 0.8rem;
        position: absolute;
        top:-0.64rem;
        left:-0.3rem;
    }
    #money .m-middle span,#money .m-top span{
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        -moz-transform:  translateY(-50%);
        -o-transform:  translateY(-50%);
        transform:  translateY(-50%);
        -webkit-transform: translateY(-50%);

    }
    #money .m-middle ul li{
        float: left;
        width: 25%;
        position: relative;
        height: 0.96rem;
    }
    #money .m-middle ul li img{
        position: absolute;
        width: 1.493333rem;
        height: 0.96rem;
        left: 50%;
        -ms-transform: translateX(-50%);
        -moz-transform:  translateX(-50%);
        -o-transform:  translateX(-50%);
        transform:  translateX(-50%);
        -webkit-transform: translateX(-50%);
    }
    #money .m-bottom{
        padding-left: 8%;
    }
    #money .m-bottom ul{
        overflow: hidden;
        width: 100%;
        font-size: 0.3rem;
        color: #ED6666;
        margin-top: 0.2rem;
        font-weight: 700;
    }
    #money .m-bottom ul span{
        font-size: 0.32rem;
    }
    footer{
        padding: 1.76rem 0.8rem 0.906667rem;
        background: #F3F3F3;
    }
    footer .btnn{
        width: 100%;
        padding: 0.4rem 1rem;
        background: #2DBCFE;
        color: #fff;
        font-size: 0.426667rem;
        text-align: center;
        border-radius: 0.133333rem;
        position: relative;
    }
    footer .btnn .person{
        width: 0.72rem;
        height: 1.52rem;
        position: absolute;
        top:-1.2rem;
        left:0.826667rem;
    }
    @-webkit-keyframes pulse{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes pulse{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.pulse{-webkit-animation-name:pulse;animation-name:pulse}
</style>