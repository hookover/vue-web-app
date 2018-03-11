<template>
    <div class="task-action-grid">
        <grid :rows="tag_actions.length" class="tasks-navbar">
            <grid-item :label="item.title" v-for="item in tag_actions" @click.native="toTasks(item)" :class="{active: item.id === getCurrentTaskChannelID}">
                <i v-if="item.icon" :class="item.icon" class="s27" slot="icon"></i>
                <img v-if="item.img" :src="item.img" slot="icon">
                <!-- 显示三角 -->
                <!--<i class="up-square" v-if="item.id === getCurrentTaskChannelID"></i>-->
            </grid-item>
        </grid>

        <!--<button-tab>-->
            <!--<button-tab-item selected>正在进行</button-tab-item>-->
            <!--<button-tab-item>即将开始</button-tab-item>-->
        <!--</button-tab>-->

        <!--显示子任务类型，如淘宝下面的聚划算、淘抢购...-->
        <!--<scroller lock-y :scrollbar-x=false class="task-sub-navbar">-->
            <!--<div :style="width">-->
                <!--<tab :line-width="2"  v-model="index" style="height: 60px;">-->
                    <!--<tab-item :selected="tag === item" v-for="item in taglist" @click="tag = item">-->
                        <!--{{item}}-->
                        <!--<div style="margin-top: -10px;">-->
                            <!--<badge text="888"></badge>-->
                        <!--</div>-->
                    <!--</tab-item>-->
                <!--</tab>-->
            <!--</div>-->
        <!--</scroller>-->

        <!--选择操作子账号-->
        <WorkerSubAccountsDialog></WorkerSubAccountsDialog>
    </div>
</template>

<script>
    import { Grid, GridItem,Tab,TabItem,Scroller,Badge, ButtonTab, ButtonTabItem } from 'vux'
    import { mapGetters, mapActions } from 'vuex'
    import grids from '../utils/grids'
    import * as _ from '../utils/tool'
    import WorkerSubAccountsDialog from '../components/WorkerSubAccountsDialog.vue'

    const list = () => ['聚划算任务', '哈哈任务', '马达加斯加任务', '活动', '活动', '活动', '张三', '李四']
    const task_list = () => [
        grids.all.new_media,
        grids.all.taobao,
        grids.all.tmall,
        grids.all.jd,
        grids.all.app,
    ];
    export default {
        components: {
            Grid,
            GridItem,
            Tab,
            TabItem,
            Scroller,
            Badge,
            ButtonTab,
            ButtonTabItem,
            WorkerSubAccountsDialog,
        },
        data: function () {
            return {
                tag_actions:task_list(),
                taglist: list(),
                index:0,
                timer: false,
            }
        },
        computed: {
            ...mapGetters({
                getCurrentTaskChannelInfo: 'getCurrentTaskChannelInfo',
                getCurrentTaskChannelID: 'getCurrentTaskChannelID',
                getCurrentSubAccountID: 'getCurrentSubAccountID',
                getWorkerSubAccounts: 'getWorkerSubAccounts',
            }),
            getCurrentSubAccountInfo: function () {
                let currentAccounts = this.getWorkerSubAccounts[this.getCurrentTaskChannelID]
                for (let n in currentAccounts) {
                    if (currentAccounts[n].id === this.getCurrentSubAccountID) {
                        return currentAccounts[n]
                    }
                }
                return false;
            },
            task_channel_title: function () {
                let o = this.getCurrentTaskChannelInfo;
                return o ? o.title : '';
            },
            width: function () {
                let n = this.taglist.length;
                let w = n / 4 * 100;
                return 'width: ' + w + '%'
            }
        },
        methods: {
            ...mapActions({
                updateShowSubAccountDialog: 'updateShowSubAccountDialog',
                updateCurrentTaskChannelID: 'updateCurrentTaskChannelID',
                updateNextRouterPath: 'updateNextRouterPath',
                updateCurrentSubAccountID: 'updateCurrentSubAccountID',
                updateChooseTaskChannelID: 'updateChooseTaskChannelID',
            }),
            getCurrentSubAccountInfoByChannelID: function (choose_channel_id) {
                let currentAccounts = this.getWorkerSubAccounts[choose_channel_id]
                for (let n in currentAccounts) {
                    if (currentAccounts[n].id === this.getCurrentSubAccountID) {
                        return currentAccounts[n]
                    }
                }
                return false;
            },
            toTasks (item) {
                this.updateChooseTaskChannelID(item.id);   //设置选择的任务渠道ID到store

                //需要显示选择子账号 且 当前没有选择对应的账号
                if(_.isShowWorkerSubAccountsDialog(item.id) && !this.getCurrentSubAccountInfoByChannelID(item.id)) {
                    this.updateShowSubAccountDialog(true);      //显示dialog
                    this.updateNextRouterPath(item.url);        //将即将跳转的路由存到Store，当用户选择账号后，根据路由跳转
                } else {
                    this.updateCurrentTaskChannelID(item.id);   //如果不需要额外处理的任务，直接将选择的渠道ID置为当前渠道ID
                    this.toRouter(item.url);               //并跳转到目标地址
                }
            },
            toRouter (url) {
                _.go(url, this.$router)
            }
        },
        created: function () {
            if(!this.getCurrentTaskChannelID) {
                _.go('/', this.$router);
            }
        },
        mounted: function () {
            let self = this;
            if(_.isShowWorkerSubAccountsDialog(self.getCurrentTaskChannelID)) {
                //检查是否已选择账号,弹出选择账号
                this.timer = setInterval(function () {
                    if(!self.getCurrentSubAccountID || !self.getCurrentSubAccountInfo || parseInt(self.getCurrentTaskChannelID) !== parseInt(self.getCurrentSubAccountInfo.platform_id)) {
                        self.updateShowSubAccountDialog(true);
                    } else {
                        clearInterval(self.timer);
                    }
                },500);
            }
        },
        destroyed: function () {
            if(this.timer) {
                clearInterval(this.timer);
            }
        }
    }
</script>

<style>
    .tasks-navbar {
        background-color: #fff;
        border-bottom: 1px solid #eeeeff;
    }
    .tasks-navbar:before,.tasks-navbar:after {
        border: none;
    }
    .tasks-navbar .weui-grid:before, .tasks-navbar .weui-grid:after{
        border: none!important;
    }
    .tasks-navbar .weui-grid {
        /*padding: 20px 10px 8px;*/
        padding: 10px;
        opacity: 0.5;
    }
    .tasks-navbar .weui-grid.active{
        opacity: 1;
    }
    .tasks-navbar .weui-grid .weui-grid__icon{
        width: 30px;
        height: 30px;
    }
    .tasks-navbar .weui-grid .weui-grid__label{
        color: #555;
        font-size: 12px;
    }
    .tasks-navbar .up-square {
        bottom: 0;
        margin-left: 25%;
        border-width: 0 .2rem .2rem;
        border-color: transparent transparent #f0f0f0;
        border-style: dashed dashed solid;
    }
    .task-sub-navbar .vux-tab-item {
        background-color: #f5f5f5;
        font-size: 12px;
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
    }
    .task-sub-navbar .vux-tab-item .vux-badge {
        background-color: inherit;
        color: inherit;
    }
    .task-action-grid {

    }
    .task-action-grid .vux-button-group {
        margin: 10px auto 10px;
        text-align: center;
        width: 80%;
    }
    .task-action-grid .vux-button-group>a{
        font-size: 13px;
    }
    .task-action-grid .vux-button-group>a.vux-button-group-current {
        color: #fff;
        background: #f9a71a;
    }
    .task-action-grid .vux-button-group>a.vux-button-tab-item-first, .task-action-grid .vux-button-group>a.vux-button-tab-item-first:after {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .task-action-grid .vux-button-group>a.vux-button-tab-item-first:after {
        border: 2px solid #f9a71a;
    }
    .task-action-grid .vux-button-group>a.vux-button-tab-item-last, .task-action-grid .vux-button-group>a.vux-button-tab-item-last:after {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .task-action-grid .vux-button-group>a.vux-button-tab-item-last:after {
        border-right: 2px solid #f9a71a;
        border-top: 2px solid #f9a71a;
        border-bottom: 2px solid #f9a71a;
    }
</style>