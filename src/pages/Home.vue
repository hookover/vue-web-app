<template>
    <div>
        <!--公告-->
        <AppAnnouncement></AppAnnouncement>

        <!--账户余额信息-->
        <div class="index-top">
            <div class="index-topmain-tip">
                <p>当前余额(元)</p>
                <p class="index-topmain-money" @click="$router.push('/user/income-list')">{{formatYen(profile.money)}}</p>
                <a class="index-auto-money" @click="$router.push('/auto-money')"><img src="/dist/images/auto-money.gif" alt=""></a>
            </div>
            <ul class="index-topbar">
                <li class="index-topbar-left" @click="$router.push('/user/income-list')">
                    <span>今日收入(元)</span>
                    <p>{{formatYen(profile.today_amount)}}</p>
                </li>
                <li class="index-topbar-right" @click="$router.push('/user/income-list')">
                    <span>总收益(元)</span>
                    <p>{{formatYen(profile.money_amount)}}</p>
                </li>
                <div class="clearfix"></div>
            </ul>
        </div>

        <!--操作项-->
        <AppHomeActionGrid></AppHomeActionGrid>

        <!--<tab :line-width="2"  v-model="index">-->
        <!--<tab-item :selected="tag === item.title" v-for="item in taglist" @click="tag = item.title">-->
        <!--<i :class="item.icon" v-if="item.icon"></i>-->
        <!--{{item.title}}-->
        <!--</tab-item>-->
        <!--</tab>-->
        <!--<div v-if="index === 0"><news-list></news-list></div>-->

        <!--页脚-->
        <!--<AppFooter></AppFooter>-->
    </div>
</template>

<script>
    import {Tab, TabItem, Cell, Marquee, MarqueeItem} from 'vux'
    import AppHeader from '../components/GridHeader'
    import AppAnnouncement from '../components/Announcement.vue'
    import AppHomeActionGrid from '../components/HomeActionGrid.vue'
    import AppFooter from '../components/Footer.vue'
    import api from '../utils/api'
    import * as _ from '../utils/tool'
    import { mapActions, mapGetters } from 'vuex'


    export default {
        components: {
            Tab,
            TabItem,
            Cell,
            Marquee,
            MarqueeItem,
            AppAnnouncement,
            AppHeader,
            AppHomeActionGrid,
            AppFooter,
        },
        data () {
            return {
                tag:     '电商',
                index:   0,
            }
        },
        ready () {
        },
        mounted(){
            this.getProfileInfo();
        },
        computed: {
            ...mapGetters({
                profile: 'getProfile'
            })
        },
        methods:    {
            ...mapActions({
                updateProfile: 'updateProfile'
            }),
            getProfileInfo: function () {
                api.getProfile().then(
                    res => {
                        if (!$.isEmptyObject(res.data)) {
                            this.updateProfile(this.profile)
                        }
                    },
                    p_obj => {

                    }
                );
            },
            formatYen:      function (yen) {
                return _.formatYen(yen)
            }
        }
    }
</script>

<style>
    body {
        line-height: 1.2; /* 设置行间距为1.2 ,默认是1.6的太大*/
        font-size: 12px;
    }
    .index-auto-money{
        position: absolute;
        right: 5px;
        top: 20px;
    }
    .index-auto-money img{
        max-width:60px;
    }

    /*页头部分 开始*/
    .index-top {
        background-color: #f9a71a;
        position: relative;
    }

    .index-topmain-tip {
        color: #fff;
        width: 100%;
        text-align: center;
        padding-top: 15px;
        margin-bottom: 15px;
    }

    .index-topmain-tip p {
        font-size: 14px;
        color: #fcdbb3;
        margin-bottom: 5px;
    }

    .index-topmain-tip p.index-topmain-money {
        font-size: 45px;
        color: #fff;
    }

    ul.index-topbar {
        color: #fff;
        padding-bottom: 15px;
        border-top: 1px solid #fab948;
        padding-top: 15px;
    }

    ul.index-topbar li.index-topbar-left {
        float: left;
        text-align: left;
        margin-left: 15px;
    }

    ul.index-topbar li.index-topbar-right {
        float: right;
        text-align: right;
        margin-right: 15px;
    }

    ul.index-topbar li span {
        color: #fcdbb3;
    }

    ul.index-topbar li p {
        font-size: 24px;
    }
</style>