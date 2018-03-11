<template>
    <div>
        <!--<AppHeader :go_back="true">-->
            <!--申请提现-->
            <!--<a slot="right">-->
                <!--<i class="info_renwu_ico"></i>-->
                <!--<span>兑换记录</span>-->
            <!--</a>-->
        <!--</AppHeader>-->
        <XHeader>
            申请提现
            <a slot="right" @click="goList">
                <span>
                    <i class="fa fa-clock-o"></i>
                    兑换记录
                </span>
            </a>
        </XHeader>
        <div v-if="profile.money">
            <!--头部提示说明-->
            <div class="exchange_prompt">
                <i></i><span>兑换金额需大于10.00元，每天可兑现一次</span>
            </div>

            <!--兑换金额及确认按钮-->
            <div class="exchange_box">
                <i></i>
                <p>我的零钱</p>
                <b>¥{{formatYen(profile.money)}}</b>
                <a class="btn-yellow" @click="show_dialog = true" v-if="profile.money && profile.has_bind_wechat === 1"><em></em>微信钱包提现</a>

                <div class="text-center" v-if="profile.has_bind_wechat !== 1">
                    <div>
                        <router-link to="/bind-wechat" class="btn-yellow"><em></em>绑定微信账号</router-link>
                    </div>
                    <div class="mt10">
                        <span class="color-gray s12">绑定微信账号后才可以申请提现哦</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="exchange_list condition_remind balance_short"  v-if="!profile.money">
            <i class="remind_1"></i>
            <p>您可提现余额不足哦！<br>~继续加油做任务赚钱吧！~</p>
            <div class="condition_remind_but">
                <router-link to="/" class="btn-yellow">
                    去首页做任务
                    <i class="to_verification"></i>
                </router-link>
            </div>
        </div>

        <x-dialog v-model="show_dialog" hide-on-blur class="remind remind_total remind_special cash-money-dialog">
            <div class="remind_head">
                <span>当前可提现余额{{formatYen(profile.money)}}元</span>
            </div>
            <group>
                <radio fill-mode fill-label="其它金额" fill-placeholder="请输入其它金额" :options="options" :value="cash_money" @on-change="change"></radio>
            </group>
            <div class="remind_foot">
                <span class="remind_btn" @click="show_dialog = false">取消</span>
                <span class="remind_btn btn_one" @click="submit">确认提交</span>
            </div>
        </x-dialog>
    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue'
    import { XHeader, XDialog, Radio, Group,  TransferDomDirective as TransferDom } from  'vux'
    import * as _ from '../utils/tool'
    import api from '../utils/api'

    export default {
        directives: {
            TransferDom
        },
        components: {
            AppHeader,
            XHeader,
            XDialog,
            Radio,
        },
        data: function () {
            return {
                show_dialog: false,
                cash_money: 10,
                profile: {},
                options: [
                    {
                        key: 10,
                        value: '10元'
                    },
                    {
                        key: 20,
                        value: '20元'
                    },
                    {
                        key: 50,
                        value: '50元'
                    },
                    {
                        key: 100,
                        value: '100元'
                    },
                    {
                        key: 1000,
                        value: '1000元'
                    },
                ]
            }
        },
        mounted: function () {
            this.getProfileInfo();
        },
        methods: {
            goList: function () {
                _.go('/user/enchashment-list', this.$router)
            },
            submit: function () {
                if(!this.cash_money || isNaN(this.cash_money)) {
                    _.toast('提现金额不正确,请重新选择');
                    return false;
                }
                if(parseFloat(this.cash_money) > parseFloat(this.profile.money)) {
                    _.toast('可提现金额不足，请重新选择');
                    return false;
                }
                api.postWorkerWithdrawal(this.cash_money).then(
                    res => {
                        this.show_dialog = false;
                        this.profile.money = this.profile.money - this.cash_money
                        // 显示
                        this.$vux.alert.show({
                            content: '提现申请成功，请查看您的收款账户以确认是否到帐',
                        })
                    },
                    p_obj => {
                        _.toast(p_obj.data.hasOwnProperty('message') ? p_obj.data.message : '数据返回异常，请稍后再试或联系客服', 'text', 3000, 'middle');
                    }
                )

            },
            change: function (val) {
                this.cash_money = val;
            },
            getProfileInfo: function () {
                api.getProfile().then(
                    res => {
                        if(!$.isEmptyObject(res.data)) {
                            this.profile = res.data;
                        }
                    },
                    p_obj => {

                    }
                );
            },
            formatYen: function (yen) {
                return _.formatYen(yen)
            }
        }
    }
</script>
<style>
    .cash-money-dialog .weui-cell__bd,.cash-money-dialog .weui-label{
        text-align: left;
        font-size: 14px;
    }

    .condition_remind{ background:#ffffff; border-bottom:1px solid #f1f1f1; border-top:1px solid #f1f1f1; text-align:center;}
    .condition_remind i{ height:75px; width:75px;  display:block; margin:0 auto;}
    .condition_remind i.remind_1{ background:url(/dist/images/exchange_prompt_lacking.jpg) no-repeat; background-size:75px 75px;  margin-top:12px;}
    .condition_remind i.remind_2{ background:url(/dist/images/exchange_prompt_activation.jpg) no-repeat; background-size:75px 75px;  margin-top:12px;}
    .condition_remind i.remind_3{ background:url(/dist/images/exchange_prompt_up.jpg) no-repeat; background-size:130px 118px;  margin-top:12px; height:118px; width:130px;}
    .condition_remind p{ color:#999999; font-size:13px; margin-left:25px; margin-right:25px;}
    .condition_remind_but{ padding:20px 0px;}
    .condition_remind_but a{ width:190px; margin:0 auto;}
    .condition_remind p.condition_remind_bottom{ margin:15px 0px 20px 0px;}
    i.to_verification{ display:inline-block; width:8px; height:12px; background:url(/dist/images/exchange_to_verification.png) no-repeat; background-size:8px 12px; margin-left:2px;}

    /*兑换界面*/
    .exchange_prompt{ background:url(/dist/images/exchange_promp_bg.png) repeat-x bottom  #fff1da; background-size:7px 43px; height:40px;  margin-bottom:35px; padding:10px;}
    .exchange_prompt i{ float:left; background:url(/dist/images/exchange_home.png) 0px 0px no-repeat; background-size:114px 90px; height:15px; width:15px; margin-right:5px; margin-top:2px; position:absolute; }
    .exchange_prompt span{ float:left; color:#888; font-size:12px; line-height:20px; display:block; margin-left:20px;}
    .exchange_box{ margin:0 15px;}
    .exchange_box i{ background:url(/dist/images/exchange_home.png) -45px 0px no-repeat; background-size:114px 90px; height:90px; width:69px; margin:0 auto; display:block; margin-bottom:15px;}
    .exchange_box p{ font-size:15px; color:#888888; line-height:30px; text-align:center;}
    .exchange_box b{ font-size:35px; color:#faa71b; line-height:40px; text-align:center; display:block; margin-bottom:35px; }
    .btn-yellow em{ background:url(/dist/images/exchange_home.png) -15px 0px no-repeat; background-size:114px 90px; height:18px; width:23px;display:inline-block; margin-right:5px; vertical-align:middle; text-align:center; }
</style>