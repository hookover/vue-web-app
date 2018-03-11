<template>
    <div class="user">
        <AppHeader :go_back="true">个人中心</AppHeader>

        <!--头部头像和二维码-->
        <div class="user_home_top">
            <dl>
                <router-link :to="{ path: '/user/profile' }">
                    <dt><img :src="avatar" height="80" width="80"/></dt>
                    <dd>
                        <p class="user_headname">{{profile.username}}</p>
                        <p class="user_id">ID：{{profile.id}}</p>
                    </dd>
                </router-link>
            </dl>
            <router-link class="QR_code" :to="{ path: '/recommend-friend/qrcode', query: { id: profile.id } }">
                我的推广二维码
            </router-link>
        </div>

        <!--收入明细和兑换明细-->
        <div class="user_home_list">
            <ul class="task_list_common">
                <li class="task_item_common">
                    <router-link :to="{ path: '/user/income-list' }">
                        <i class="user_home_icon1"></i>
                        <h4>收入明细</h4>
                        <p><span>财源来路  一目了然</span><i></i></p>
                    </router-link>
                    <div class="clear"></div>
                </li>
                <li class="task_item_common noborderbottom">
                    <router-link :to="{ path: '/user/enchashment-list' }">
                        <i class="user_home_icon2"></i>
                        <h4>提现明细</h4>
                        <p><span>多重兑现  方便快捷</span><i></i></p>
                        <div class="clear"></div>
                    </router-link>
                </li>
            </ul>

            <ul class="task_list_common">
                <li class="task_item_common">
                    <router-link :to="{ path: '/user/profile' }">
                        <i class="user_home_icon3"></i>
                        <h4>个人信息</h4>
                        <p><span>个人信息操作号等的修改查看</span><i></i></p>
                        <div class="clear"></div>
                    </router-link>
                </li>
                <li class="task_item_common noborderbottom">
                    <router-link :to="{ path: '/user/business-cooperation' }">
                        <i class="user_home_icon4"></i>
                        <h4>商务合作</h4>
                        <p><span>仅限商务合作联系</span><i></i></p>
                        <div class="clear"></div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue'
    import * as _ from '../utils/tool'
    import common from '../common/common'
    import { mapGetters } from 'vuex'


    export default {
        components: {
            AppHeader,
        },

        data () {
            return {

            }
        },
        computed: {
            ...mapGetters({
                profile: 'getProfile'
            }),
            avatar: function () {
                if(this.profile.avatar) {
                    return this.profile.avatar
                }
                return '/dist/images/avatar/default.white.png'
            },
        },
        methods: {

        }
    }
</script>
<style>
    .user ul.task_list_common{ background-color:#fff; border-top:#e2e2e2 solid 1px;border-bottom:#e2e2e2 solid 1px; margin:0px 0px 15px 0px; padding:0px 15px;}
    .user li.task_item_common{ border-bottom:#eaeaea solid 1px; padding:20px 0px;position:relative; }
    .user li.task_item_common.noborderbottom{ border-bottom:none;}
    .user li.task_item_common a{ float:left; width:100%; display:block; clear:both;}
    .user li.task_item_common img.task_item_logo{float:left; width:36px; height:36px; border-radius:5px; margin-right:15px;}
    .user li.task_item_common dl.task_item_brief{ float:left; width:55%;}
    /*个人中心*/
    .user .user_home_top{ height:213px; width:100%; background:url(/dist/images/user_home_top.jpg); background-size:100% 213px; position:relative;}
    .user .user_home_top dl{ height:auto; margin:0 auto;}
    .user .user_home_top dl a{ display:block;}
    .user .user_home_top dl dt{ margin:0 auto;  height:92px; width:80px;}
    .user .user_home_top dl dt img{ float:left;  margin-top:10px; border-radius:75px; border:#fcca76 solid 3px; height:75px; width:75px;}
    .user .user_home_top dl dd{  text-align:center; color:#FFF;}
    .user .user_home_top dl dd p.user_headname{ padding-top:10px; font-size:15px; height:30px; overflow:hidden;}
    .user .user_home_top dl dd p.user_id{ font-size:13px; line-height:20px;}
    .user .user_home_top a.QR_code{ width:120px; height:40px; line-height:40px; margin:0 auto; font-size:15px; text-align:center; color:#fff; display:block; margin-top:30px;}

    .user .user_home_list ul{ margin-top:16px; }
    .user .user_home_list li.task_item_common a{ display:block; float:none;}
    .user .user_home_list i{ float:left; height:30px; width:30px; display:block;}
    .user .user_home_list i.user_home_icon1{ background:url(/dist/images/user_home_icon.png) 0px 0px no-repeat; background-size:140px 30px;}
    .user .user_home_list i.user_home_icon2{ background:url(/dist/images/user_home_icon.png) -30px 0px no-repeat; background-size:140px 30px;}
    .user .user_home_list i.user_home_icon3{ background:url(/dist/images/user_home_icon.png) -60px 0px no-repeat; background-size:140px 30px;}
    .user .user_home_list i.user_home_icon4{ background:url(/dist/images/user_home_icon.png) -90px 0px no-repeat; background-size:140px 30px;}
    .user .user_home_list h4{ float:left; line-height:30px; margin-left:8px; font-size:15px; color:#555555; background-size:140px 30px;}
    .user .user_home_list p{ float:right; line-height:30px; color:#aaaaaa;}
    .user .user_home_list p span{ font-size:12px; ; float:left; line-height:30px;}
    .user .user_home_list p i{ float:left; margin-left:8px; margin-top:8px; width:12px; height:16px; background:url(/dist/images/user_home_icon.png) -120px 0px no-repeat; background-size:140px 30px; display:block;}
</style>