<template>
    <div>
        <AppHeader>帮助中心</AppHeader>

        <ul class="helpcenter_list">
            <!--<li class="helpcenter_oneitem htlp_item_1">-->
                <!--<router-link :to="{ name: 'help_list', params: { category_id: 0} }">-->
                    <!--<h4 class="hcoi_left">-->
                        <!--<span></span>-->
                        <!--<b>电商类任务</b>-->
                    <!--</h4>-->
                    <!--<p class="hcoi_right">-->
                        <!--<span>浏览淘宝商品？</span>-->
                        <!--<span>京东商品如何收藏？</span>-->
                    <!--</p>-->
                    <!--<i>查看更多&gt;</i>-->
                <!--</router-link>-->
            <!--</li>-->
            <!--<li class="helpcenter_oneitem htlp_item_2">-->
                <!--<router-link :to="{ name: 'help_list', params: { category_id: 0} }">-->
                    <!--<h4 class="hcoi_left">-->
                        <!--<span></span>-->
                        <!--<b>APP试玩任务</b>-->
                    <!--</h4>-->
                    <!--<p class="hcoi_right">-->
                        <!--<span>可否同时进行多个任务？</span>-->
                        <!--<span>应用什么时候更新？</span>-->
                    <!--</p>-->
                    <!--<i>查看更多&gt;</i>-->
                <!--</router-link>-->
            <!--</li>-->
            <!--<li class="helpcenter_oneitem htlp_item_3">-->
                <!--<router-link :to="{ name: 'help_list', params: { category_id: 0} }">-->
                    <!--<h4 class="hcoi_left">-->
                        <!--<span></span>-->
                        <!--<b>新媒体任务</b>-->
                    <!--</h4>-->
                    <!--<p class="hcoi_right">-->
                        <!--<span>如何关注指定微信公众号？</span>-->
                        <!--<span>如何发贴？</span>-->
                    <!--</p>-->
                    <!--<i>查看更多&gt;</i>-->
                <!--</router-link>-->
            <!--</li>-->
            <!--<li class="helpcenter_oneitem htlp_item_4">-->
                <!--<router-link :to="{ name: 'help_list', params: { category_id: 0} }">-->
                    <!--<h4 class="hcoi_left">-->
                        <!--<span></span>-->
                        <!--<b>邀请收益</b>-->
                    <!--</h4>-->
                    <!--<p class="hcoi_right">-->
                        <!--<span>怎样邀请好友？</span>-->
                        <!--<span>查看邀请收益？</span>-->
                    <!--</p>-->
                    <!--<i>查看更多&gt;</i>-->
                <!--</router-link>-->
            <!--</li>-->
            <!--<li class="helpcenter_oneitem htlp_item_5">-->
                <!--<router-link :to="{ name: 'help_list', params: { category_id: 0} }">-->
                    <!--<h4 class="hcoi_left">-->
                        <!--<span></span>-->
                        <!--<b>提现到账</b>-->
                    <!--</h4>-->
                    <!--<p class="hcoi_right">-->
                        <!--<span>兑现规则？</span>-->
                        <!--<span>兑现打款时间？</span>-->
                    <!--</p>-->
                    <!--<i>查看更多&gt;</i>-->
                <!--</router-link>-->
            <!--</li>-->

            <li class="helpcenter_oneitem htlp_item" v-for="item in faq_category">
                <router-link :to="{ name: 'help_list', params: { category_id: item.id} }">
                    <h4 class="hcoi_left">
                        <img :src="item.cover_image_url">
                        <b>{{item.name}}</b>
                    </h4>
                    <p class="hcoi_right" v-html="item.description">
                        <!--<span>浏览淘宝商品？</span>-->
                        <!--<span>京东商品如何收藏？</span>-->
                    </p>
                    <i>查看更多&gt;</i>
                </router-link>
            </li>

        </ul>

        <!--悬浮在最上边的联系方式-->
        <ul class="footerchat">
            <li class="footerlink_qq">
                <a @click="show_qq = true"><i></i>QQ客服</a><span></span>
            </li>
            <li class="footerlink_wechat ">
                <a @click="show_wechat = true"><i></i>微信客服</a>
            </li>
        </ul>
        <!--弹出联系方式-->

        <!--弹出QQ聊天面板-->
        <div class="tan_chatonline_qq" v-if="show_qq">
            <div class="tan_chatonline_title">
                <a @click="show_qq = false"><i></i></a>
                联系QQ客服
            </div>
            <div class="tan_chatonline_con">
                <template v-for="(qq, index) in service_qqs" >
                    <a class="tan_chatonline_con_qq"
                       :href="'mqqwpa://im/chat?chat_type=wpa&uin='+qq+'&version=1&src_type=web&web_src=' + rollback_url">
                        <i></i>QQ客服{{index + 1}}
                    </a>
                </template>
                <p>工作时间（周一至周五9：00-18：00）</p>
            </div>
        </div>
        <!--弹出微信聊天面板-->
        <div class="tan_chatonline_wechat" v-if="show_wechat">
            <div class="tan_chatonline_title">
                <a @click="show_wechat = false"><i></i></a>
                联系微信客服
            </div>
            <div class="tan_chatonline_con">
                <img class="tan_chatonline_erweima" src="/dist/images/service/wechat_258.jpg">
                <p>将二维码截图保存到手机，使用微信扫一扫功能添加
                    或微信搜索公众号“<span>renwukuan</span>” </p>
                <a class="tan_chatonline_con_wechat" href="" style="display: none"><i></i>打开微信</a>
                <p>工作时间（周一至周五9：00-18：00）</p>
            </div>
        </div>
        <!--遮罩蒙版-->
        <div class="bgmask" v-if="show_qq || show_wechat"></div>

    </div>
</template>

<script>
    import AppHeader from '../components/Header.vue'
    import common from '../common/common'
    import api from '../utils/api'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            AppHeader,
        },
        data:       function () {
            return {
                server_data:   {},
                show_qq: false,
                show_wechat: false,
                service_qqs: common.SERVICE_INFO.qq,
                rollback_url: common.SERVICE_INFO.rollback_url,
            }
        },
        computed: {
            ...mapGetters({
                faq_category: 'getFaqCategory',
            })
        },
        mounted: function () {
            this.getSiteConfigQqInfo();
        },
        methods: {
            getSiteConfigQqInfo: function () {
                api.getSiteConfigQq().then(
                    res=>{
                        if(res.result) {
                            this.service_qqs = res.message.qq;
                        }
                    },
                    p_obj=>{

                    }
                )
            }
        }
    }
</script>
<style>
    /*2.0版本客服中心页面*/
    .helpcenter_con{}
    ul.helpcenter_list{ padding-bottom:40px;}
    ul.helpcenter_list li.helpcenter_oneitem{ margin:15px 15px; padding:15px 10px; background-color:#fff; border-radius:5px;
        -webkit-box-shadow:0 0 5px rgba(166, 166, 166, .1);
        -moz-box-shadow:0 0 5px rgba(166, 166, 166, .1);
        box-shadow:0 0 5px rgba(166, 166, 166, .1); }
    li.helpcenter_oneitem a{ clear:both; display:inline-block; width:100%;}
    li.helpcenter_oneitem a h4.hcoi_left{ float:left;   width:60px; text-align:center;border-right:#eee solid 1px; padding:5px 10px 5px 0px;}
    li.helpcenter_oneitem a h4.hcoi_left b{ display:block; text-align:center; width:60px; font-style:normal; font-weight:bold; color:#777;}
    li.helpcenter_oneitem a h4.hcoi_left span { background-size:30px 30px; height:30px; width:30px; display:inline-block; }

    li.helpcenter_oneitem.htlp_item a h4.hcoi_left img{
        width: 30px;
        height:30px;
        margin: 0 auto;
    }
    li.helpcenter_oneitem.htlp_item_1 a h4.hcoi_left b{ color:#f7c058;}
    li.helpcenter_oneitem.htlp_item_2 a h4.hcoi_left b{ color:#89d1f6;}
    li.helpcenter_oneitem.htlp_item_3 a h4.hcoi_left b{ color:#fa8484;}
    li.helpcenter_oneitem.htlp_item_4 a h4.hcoi_left b{ color:#8d99fd;}
    li.helpcenter_oneitem.htlp_item_5 a h4.hcoi_left b{ color:#74b1ff;}

    li.helpcenter_oneitem.htlp_item_1 a h4.hcoi_left span{ background:url(/dist/images/help_ico_1.png) 0 0 no-repeat;background-size:30px 30px;}
    li.helpcenter_oneitem.htlp_item_2 a h4.hcoi_left span{ background:url(/dist/images/help_ico_2.png) 0 0 no-repeat;background-size:30px 30px;}
    li.helpcenter_oneitem.htlp_item_3 a h4.hcoi_left span{ background:url(/dist/images/help_ico_3.png) 0 0 no-repeat;background-size:30px 30px;}
    li.helpcenter_oneitem.htlp_item_4 a h4.hcoi_left span{ background:url(/dist/images/help_ico_4.png) 0 0 no-repeat;background-size:30px 30px;}
    li.helpcenter_oneitem.htlp_item_5 a h4.hcoi_left span{ background:url(/dist/images/help_ico_5.png) 0 0 no-repeat;background-size:30px 30px;}

    li.helpcenter_oneitem a p.hcoi_right{  margin-left:85px; line-height:20px; }
    li.helpcenter_oneitem a p.hcoi_right span{ display:block; font-size:13px; color:#999;}
    li.helpcenter_oneitem a i{ display:block; text-align:right; font-style:normal; font-size:12px; color:#f9a61a; margin:5px 5px 0px 0px;}

    /*悬浮在底部的联系方式*/
    ul.footerchat{ background-color:#fff; height:50px; width:100%; position:fixed; bottom:0px; left:0px; border-top:#e5e5e5 solid 1px;}
    ul.footerchat li{ display:inline-block; width:49%; text-align:center;}
    ul.footerchat li span{ display:inline-block; vertical-align:middle; width:1px; height:20px; background-color:#e5e5e5;}
    ul.footerchat li a{ display:inline-block; width:95%; color:#555; font-size:13px; line-height:50px; }
    ul.footerchat li i{display:inline-block; width:25px; height:25px;vertical-align:middle;margin-right:7px;}
    ul.footerchat li.footerlink_qq a i{  background:url(/dist/images/ico_contact_qq.png) 0 0 no-repeat; background-size:25px 25px;}
    ul.footerchat li.footerlink_wechat a i{background:url(/dist/images/ico_contact_wechat.png) 0 0 no-repeat; background-size:25px 25px;}

    /*弹出QQ和微信框*/
    .tan_chatonline{}
    .tan_chatonline_qq,.tan_chatonline_wechat{ position:fixed; bottom:0px; left:0px; width:100%; background-color:#fff; z-index:1005; }
    .tan_chatonline_title{ font-size:16px; color:#383838; text-align:center; height:50px; border-bottom:#e8e8e8 solid 1px; line-height:50px; position:relative;}
    .tan_chatonline_title a{ display:block; position:absolute; top:0px; left:0px; z-index:1006; width:80px; height:50px; text-align:left;}
    .tan_chatonline_title a i{ display:inline-block;width:20px; height:20px; background:url(/dist/images/btn_tan_bottom_close.png) 0 0 no-repeat; background-size:20px 20px; margin:15px 0px 0px 20px;}
    .tan_chatonline_con { text-align:center; padding:15px 15px 10px 15px;}
    .tan_chatonline_con a.tan_chatonline_con_qq { display:inline-block; background-color:#5d91f4; width:206px; height:33px; margin:15px 0px 0px 0px; line-height:33px; color:#fff; border-radius:5px;}
    .tan_chatonline_con a.tan_chatonline_con_qq i{ display:inline-block; vertical-align:middle; width:25px; height:25px; background:url(/dist/images/ico_contact_qq.png) 0 0 no-repeat; background-size:25px 25px; margin-right:5px;}
    .tan_chatonline_con p{ margin:15px 0px 15px 0px; color:#454545; line-height:20px;}

    .tan_chatonline_wechat{}
    img.tan_chatonline_erweima{ display:inline-block; width:150px; height:150px;}
    .tan_chatonline_con p span{color:#f9a61a;}
    .tan_chatonline_con a.tan_chatonline_con_wechat { display:inline-block; background-color:#48d75f; width:206px; height:33px; margin:0px 0px 0px 0px; line-height:33px; color:#fff; border-radius:5px;}
    .tan_chatonline_con a.tan_chatonline_con_wechat i{ display:inline-block; vertical-align:middle; width:25px; height:25px; background:url(/dist/images/ico_contact_wechat.png) 0 0 no-repeat; background-size:25px 25px; margin-right:5px;}

</style>