<template>
    <div class="bind-account-list">
        <AppHeader :go_back="true">
            {{type_name}}任务账号列表
        </AppHeader>

        <group>
            <div class="text-center add-button">
                <span class="btn btn-warning" @click="add">添加新的任务账号</span>
            </div>
        </group>

        <group title="已绑定账号列表" v-if="current_accounts">
            <cell :title="account.name" v-for="account in current_accounts">
                <span class="text-info" v-if="account.status === 1">审核中</span>
                <span @click="editAccount(account)" class="text-primary" v-if="account.status === 2">今日可做任务：{{account.surplus}}&nbsp; <i class="fa fa-edit"></i></span>
                <span class="text-danger" v-if="account.status === 3">审核失败 &nbsp;<i class="fa fa-trash"  @click="deleteAccount(account)"></i></span>
            </cell>
        </group>

        <actionsheet v-model="show_level" :menus="menus_level" @on-click-menu="chooseLevel" show-cancel></actionsheet>
    </div>
</template>
<script>
    import { Group, Cell, Actionsheet } from 'vux'
    import AppHeader from '../components/Header.vue'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        components: {
            Group,
            Cell,
            AppHeader,
            Actionsheet,
        },
        data: function () {
            return {
                show_level: false,
                worker_sub_accounts: {},
                menus_data:         {
                    tb: [
                        {
                            key:  1,
                            img:  '/dist/images/account_level/b_red_1.gif',
                            name: '1心',
                        },
                        {
                            key:  2,
                            img:  '/dist/images/account_level/b_red_2.gif',
                            name: '2心',
                        },
                        {
                            key:  3,
                            img:  '/dist/images/account_level/b_red_3.gif',
                            name: '3心',
                        },
                        {
                            key:  4,
                            img:  '/dist/images/account_level/b_red_4.gif',
                            name: '4心',
                        },
                        {
                            key:  5,
                            img:  '/dist/images/account_level/b_red_5.gif',
                            name: '5心',
                        },
                        {
                            key:  6,
                            img:  '/dist/images/account_level/b_blue_1.gif',
                            name: '1钻',
                        },
                        {
                            key:  7,
                            img:  '/dist/images/account_level/b_blue_2.gif',
                            name: '2钻',
                        },
                        {
                            key:  8,
                            img:  '/dist/images/account_level/b_blue_3.gif',
                            name: '3钻',
                        },
                        {
                            key:  9,
                            img:  '/dist/images/account_level/b_blue_4.gif',
                            name: '4钻',
                        },
                        {
                            key:  10,
                            img:  '/dist/images/account_level/b_blue_5.gif',
                            name: '5钻',
                        },
                        {
                            key:  11,
                            img:  '/dist/images/account_level/crown.gif',
                            name: '皇冠以上',
                        },
                    ],
                    jd: [
                        {
                            key:  1,
                            img:  '/dist/images/account_level/jd-1.png',
                            name: '铜牌会员',
                        },
                        {
                            key:  2,
                            img:  '/dist/images/account_level/jd-2.png',
                            name: '银牌会员',
                        },
                        {
                            key:  3,
                            img:  '/dist/images/account_level/jd-3.png',
                            name: '金牌会员',
                        },
                        {
                            key:  4,
                            img:  '/dist/images/account_level/jd-4.png',
                            name: '钻石会员',
                        },
                    ],
                },
                change_account: {}
            }
        },
        mounted: function () {
            api.getWorkerSubAccounts().then(
                res => {
                    if(!$.isEmptyObject(res.data)) {
                        this.worker_sub_accounts = res.data;
                    }
                },
                p_obj => {

                }
            )
        },
        watch: {

        },
        computed: {
            current_accounts: function () {
                let type = this.$route.query.type;
                switch (type) {
                    case 'jd':
                        type = 3;
                        break;
                    default:
                        type = 1;
                }

                return this.worker_sub_accounts[type];
            },
            type_name: function () {
                return this.$route.query.type === 'jd' ? '京东' : '淘宝'
            },
            account_type:        function () {
                switch (this.$route.query.type) {
                    case 'jd':
                        return 'jd';
                        break;
                    case 'taobao':
                        return 'tb';
                        break;
                    default:
                        return 'tb'
                }
            },
            menus_level:function () {
                let data       = [];
                let menus_data = this.menus_data[this.account_type];
                for (let n in menus_data) {
                    data.push({
                        label: '<img src="' + menus_data[n].img + '" class="ml50 img-auto pull-left ' + (this.account_type === 'jd' ? ' imgmh-25 ' : '') + '"><span class="pull-right mr50">' + menus_data[n].name + '</span><div class="clear"></div>',
                        value: menus_data[n].key
                    })

                }
                return data;
            },
        },
        methods: {
            arrRemove (arr, item) {
                if (arr.length) {
                    let index = -1;
                    for(let n in arr) {
                        if(arr[n].id === item.id) {
                            index = n;
                        }
                    }
                    if (index > -1) {
                        return arr.splice(index, 1)
                    }
                }
                return arr;
            },
            add: function () {
                this.$router.push({path: '/bind-account', query: {type: this.$route.query.type}});
            },
            deleteAccount: function (account) {
                let self = this;
                this.$vux.confirm.show({
                    content: '确定要删除？',
                    onConfirm () {
                        api.getDeleteWorkerSubAccounts(account.id).then(
                            res => {
                                _.toast('您已成功删除该子账号');
                                self.arrRemove(self.current_accounts, account)
                            },
                            p_obj => {

                            }
                        )
                    }
                })
            },
            editAccount: function (account) {
                this.change_account = account;
                let self = this;
                let current_level = this.currentLevel(account);

                this.$vux.confirm.show({
                    title: '更新该任务账号的等级？',
                    content: current_level ? '当前账号等级<img class="img-auto" style="margin: 5px auto" src="'+current_level.img+'">' : '当前未知账号等级...',
                    onConfirm () {
                        self.show_level = true;
                    }
                });
            },
            chooseLevel: function (val) {
                let params = {
                    level: val,
                    id: this.change_account.id
                };

                api.postEditWorkerSubAccount(params).then(
                    res => {
                        _.toast('账号等级更新成功！')

                        for(let n in this.current_accounts) {
                            if(this.current_accounts[n].id === params.id) {
                                this.current_accounts[n].level = val;
                            }
                        }
                    },
                    p_obj => {

                    }
                )
            },
            currentLevel: function (account) {
                let tmp = {};
                if(parseInt(account.type) === 2) {  //type是2则为京东
                    tmp = this.menus_data.jd
                } else {
                    tmp = this.menus_data.tb;
                }
                for(let n in tmp) {
                    if(tmp[n].key === account.level) {
                        return tmp[n]
                    }
                }
            }
        }
    }
</script>
<style>
    .bind-account-list .weui-cells{
        font-size: 14px;
    }
    .bind-account-list .add-button{
        padding: 15px 0;
    }
    .bind-account-list .add-button span{
        cursor: pointer;
    }
</style>