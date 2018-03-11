<template>
    <!--:hide-on-blur="current_task_accounts.length === 0" -->
    <x-dialog v-model="show_accounts_dialog" class="remind" :class="{remind_total_tune: current_task_accounts.length === 0,remind_special: current_task_accounts.length > 0}">
        <a class="pop_close" @click="closeThis(false)" v-if="current_task_accounts.length === 0"></a>
        <div class="remind_head">
            <span>请选择{{current_action_grid_info.title}}操作账号</span>
        </div>
        <div class="account-box" :style="{'max-height': `${height}px`}">
            <radio :options="current_task_accounts" @on-change="change" @click="click"></radio>
            <!--<checklist-->
            <!--:label-position="label_position"-->
            <!--:required="true"-->
            <!--:options="options_data"-->
            <!--v-model="checked"-->
            <!--:max=1-->
            <!--@on-change="change"></checklist>-->
        </div>
        <div class="remind_foot" v-if="current_task_accounts.length > 0">
            <span class="remind_btn" @click="closeThis(false)">取消</span>
            <span class="remind_btn btn_one" @click="goToAdd">添加账号</span>
        </div>

        <div class="remind_foot" v-if="current_task_accounts.length === 0">
            <div style="height: 20px;"></div>
            <span class="remind_btn btn_one" @click="goToAdd">立即去添加账号</span>
            <span>您还没有可用的买手账号，请先<a href="javascript:void(0);" class="goInstallHelper" @click="goToAdd">添加账号</a></span>
        </div>
    </x-dialog>
</template>
<script>
    import { XDialog, Checklist, Radio, Group,XButton, TransferDomDirective as TransferDom } from 'vux'
    import { mapState, mapGetters, mapActions } from 'vuex'
    import api from '../utils/api'
    import grids from '../utils/grids'
    import * as _ from '../utils/tool'

    import store from '../vuex/store'

    export default {
        components: {
            XDialog,
            Checklist,
            Radio,
            Group,
            XButton,
        },
        data: function () {
            return {
                height: window.innerHeight * 0.6,
                base_data: [],
                label_position: '',
                checked: '',
                loadding: false,
                datanothing: false,
            }
        },
        computed: {
            ...mapGetters({
                showScrollBox: 'getShowSubAccountDialog',
                subAccounts: 'getWorkerSubAccounts',
                ChooseTaskChannelID: 'getChooseTaskChannelID',
                CurrentTaskChannelID: 'getCurrentTaskChannelID',
                nextRouterPath: 'getNextRouterPath',
                CurrentRouterPath: 'getCurrentRouterPath',
                currentSubAccountID: 'getCurrentSubAccountID'
            }),
            show_accounts_dialog:{
                get () {
                   return this.showScrollBox
                },
                set(val) {
                    this.updateShowSubAccountDialog(val)
                }
            },
            current_task_accounts: function () {
                let accounts = [];
                let channel_id = this.ChooseTaskChannelID > 0 ? this.ChooseTaskChannelID : this.CurrentTaskChannelID;
                if(!isNaN(channel_id) && channel_id > 0) {
                    if(this.subAccounts[channel_id]) {
                        let tmp = this.subAccounts[channel_id];
                        //格式化服务器原始数据
                        for(let n in tmp) {
                            //可用状态为2
                            if(tmp[n].status === 2) {
                                accounts.push({
                                    key: tmp[n].id,
                                    name: tmp[n].name,
                                    value: tmp[n].name + ' (' + tmp[n].surplus + ')',
                                    surplus: + tmp[n].surplus,
                                })
                            }
                        }
                    }
                }
                return accounts;
            },
            current_action_grid_info: function () {
                let channel_id = this.ChooseTaskChannelID > 0 ? this.ChooseTaskChannelID : this.CurrentTaskChannelID;
                for(let item in grids.all) {
                    if(grids.all[item].id === channel_id) {
                        return grids.all[item];
                    }
                }
                return {title: ''}
            },
        },
        mounted: function () {
            this.loadAccounts();
        },
        watch: {
            showScrollBox: function (val, old) {
                this.updateShowSubAccountDialog(Boolean(val));
            },
            show_accounts_dialog: function (val, old) {
                if(val === true) {
                    this.loadAccounts();
                }
            }
        },
        methods: {
            ...mapActions({
                updateShowSubAccountDialog: 'updateShowSubAccountDialog',
                updateWorkerSubAccounts: 'updateWorkerSubAccounts',
                updateCurrentSubAccountID: 'updateCurrentSubAccountID',
                updateCurrentTaskChannelID: 'updateCurrentTaskChannelID'
            }),
            change (val) {
                this.updateCurrentSubAccountID(val);                        //设置当前选择的ID到Store
                this.updateShowSubAccountDialog(false);                     //隐藏选择账户
                this.updateCurrentTaskChannelID(this.ChooseTaskChannelID);  //将选择的任务渠道设置为当前渠道
                this.goNextRouterPath();
            },
            click() {
                this.goNextRouterPath();
            },
            goNextRouterPath() {
                if(this.nextRouterPath) {
                    _.go(this.nextRouterPath, this.$router)                 //如果有地址的话就跳转
                }
            },
            closeThis: function (val) {
                this.updateShowSubAccountDialog(val);
                if(this.CurrentRouterPath !== '/' && this.CurrentRouterPath !== '/login') {
                    //如果是必须要选择账号，而且没有选择账号，则跳转到首页
                    let channel_id = this.ChooseTaskChannelID > 0 ? this.ChooseTaskChannelID : this.CurrentTaskChannelID;
                    if(_.isShowWorkerSubAccountsDialog(channel_id) && !this.currentSubAccountID) {
                        _.go('/', this.$router)
                    }
                }
            },
            goToAdd: function () {
                let channel_id = this.ChooseTaskChannelID > 0 ? this.ChooseTaskChannelID : this.CurrentTaskChannelID;

                switch (parseInt(channel_id)) {
                    case 1:
                    case 2:
                        _.go('/bind-account?type=taobao', this.$router)
                        break;
                    case 3:
                        _.go('/bind-account?type=jd', this.$router)
                        break;
                    default:
                        _.go('/bind-account?type=taobao', this.$router)
                }
            },
            loadAccounts: function () {
                if(this.subAccounts.length === 0 && !this.loadding) {
                    this.loadding = true;
                    api.getWorkerSubAccounts().then(
                        res=>{
                            if(!$.isEmptyObject(res.data)) {
                                this.updateWorkerSubAccounts(res.data);
                            }
                            this.loadding = false;
                        },
                        p_obj=>{
                            //错误处理
//                            if(p_obj.data.hasOwnProperty('code') && p_obj.data.code === 403) {
//                                _.go('/login', this.$router)
//                            }
                            this.loadding = false;
                        }
                    );
                }
            }
        }
    }
</script>
<style>
    .remind .weui-dialog {
        overflow:visible!important;
    }
    .remind .account-box {
        overflow:scroll;
        -webkit-overflow-scrolling:touch;
        text-align: left;
        font-size: 17px;
    }
    .remind .account-box .weui-cell:before {
        left: 15px;
        right: 15px;
    }
    .remind .account-box .vux-radio-label {
        color: #555;
        font-size: 14px;
    }
</style>