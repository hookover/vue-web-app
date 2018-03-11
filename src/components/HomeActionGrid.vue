<template>
    <div>
        <div class="home-grid">
            <!--<template v-for="row in Math.ceil(task_list.length / row_length)">        &lt;!&ndash; 行 &ndash;&gt;-->
            <!--<grid v-for="(item, col) in task_list"> &lt;!&ndash; 行列 &ndash;&gt;-->
            <!--<grid-item :label="item.title" v-if="Math.ceil((col+1) / row_length) === row" @click.native="toTasks(item)">-->
            <!--<i v-if="item.icon" :class="item.icon" class="s27" slot="icon"></i>-->
            <!--<img v-if="item.img" :src="item.img" slot="icon">-->
            <!--<badge v-if="parseInt(item.surplus) > 0" :text="item.surplus" class="processing-task-num"></badge>-->
            <!--<span v-if="item.surplus" class="processing-task-num">{{item.surplus}}</span>-->
            <!--</grid-item>-->
            <!--</grid>-->
            <!--</template>-->

            <grid>
                <!--任务-->
                <grid-item :label="item.title" v-for="item in tasks" @click.native="toTasks(item)">
                    <i v-if="item.icon" :class="item.icon" class="s27" slot="icon"></i>
                    <img v-if="item.img" :src="item.img" slot="icon">
                    <badge v-if="parseInt(item.surplus) > 0" :text="item.surplus" class="processing-task-num"></badge>
                    <!--<span v-if="item.surplus" class="processing-task-num">{{item.surplus}}</span>-->
                </grid-item>
            </grid>
            <grid>
                <!--跳转项-->
                <grid-item :label="item.title" v-for="item in action_list" @click.native="toRouter(item.url)">
                    <i v-if="item.icon" :class="item.icon" class="s27" slot="icon"></i>
                    <img v-if="item.img" :src="item.img" slot="icon">
                </grid-item>
            </grid>
        </div>
        <!--选择操作子账号-->
        <WorkerSubAccountsDialog></WorkerSubAccountsDialog>
    </div>
</template>

<script>
    import {Grid, GridItem, Badge, XDialog} from 'vux'
    import {mapActions, mapGetters} from 'vuex'
    import grids from '../utils/grids'
    import * as _ from '../utils/tool'
    import WorkerSubAccountsDialog from '../components/WorkerSubAccountsDialog.vue'
    import api from '../utils/api'

    export default {
        components: {
            Grid,
            GridItem,
            Badge,
            WorkerSubAccountsDialog,
        },
        data () {
            return {
                row_length:  3,
                action_list: [
                    grids.all.task_note,
                    grids.all.help,
                    grids.all.user,
                    grids.all.enchashment,
                    grids.all.bind_sub_account,
                    grids.all.situation,
                    //        grids.all.contact_us,
                ],
                task_list:   [
                    grids.all.new_media,
                    grids.all.taobao,
                    grids.all.tmall,
                    grids.all.jd,
                    grids.all.app,
                    grids.all.recommend_friend,
                ],
//                task_pending_count: false
            }
        },
        ready () {
//            this.task_pending_count = this.getTaskPendingCount
        },
        computed:   {
            tasks: function () {
                if (this.getTaskPendingCount) {
                    for (let n in this.getTaskPendingCount) {
                        if (parseInt(this.getTaskPendingCount[n]) > 0) {
                            for (let k in this.task_list) {
                                if (parseInt(n) === parseInt(this.task_list[k].id)) {
                                    this.task_list[k]['surplus'] = this.getTaskPendingCount[n];
                                    break;
                                }
                            }
                        }
                    }
                }
                return this.task_list
            },
            ...mapGetters({
                getCurrentTaskChannelID: 'getCurrentTaskChannelID',
                getCurrentSubAccountID:  'getCurrentSubAccountID',
                getWorkerSubAccounts:    'getWorkerSubAccounts',
                getTaskPendingCount:     'getTaskPendingCount',
            }),
        },
        mounted:    function () {
            this.getTaskPendingCountData();
        },
        methods:    {
            ...mapActions({
                updateShowSubAccountDialog: 'updateShowSubAccountDialog',
                updateCurrentTaskChannelID: 'updateCurrentTaskChannelID',
                updateChooseTaskChannelID:  'updateChooseTaskChannelID',
                updateNextRouterPath:       'updateNextRouterPath',
                updateTaskPendingCount:     'updateTaskPendingCount'
            }),
            getCurrentSubAccountInfo: function (choose_channel_id) {
                let currentAccounts = this.getWorkerSubAccounts[choose_channel_id]
                for (let n in currentAccounts) {
                    if (currentAccounts[n].id === this.getCurrentSubAccountID) {
                        return currentAccounts[n]
                    }
                }
                return false;
            },
            getTaskPendingCountData:  function () {
                api.getTaskPendingCount().then(
                    res => {
                        if (res.hasOwnProperty('data')) {
                            this.updateTaskPendingCount(res.data);

                            for (let n in this.getTaskPendingCount) {
                                if (parseInt(this.getTaskPendingCount[n]) > 0) {
                                    for (let k in this.task_list) {
                                        if (parseInt(n) === parseInt(this.task_list[k].id)) {
                                            this.task_list[k]['surplus'] = this.getTaskPendingCount[n];
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    },
                    p => {

                    }
                )
            },
            toTasks (item) {
                this.updateChooseTaskChannelID(item.id);   //设置选择的任务渠道ID到store

                //需要显示选择子账号 且 当前没有选择对应的账号
                if (_.isShowWorkerSubAccountsDialog(item.id) && !this.getCurrentSubAccountInfo(item.id)) {
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
        }
    }
</script>
<style>
    .processing-task-num {
        position: absolute;
        top: 10%;
        right: 10%;
    }

    .home-grid .weui-grids {
        margin-top: 15px;
        text-align: center;
    }

    .home-grid .weui-grids a.weui-grid {
        width: 33.3% !important;
    }

    .home-grid .weui-grids .weui-grid .weui-grid__label span {
        color: #555;
        display: block;
        margin-top: 5px;
        font-size: 12px;
    }

    .home-grid .weui-grids .weui-grid .weui-grid__icon {
        width: 30px;
        height: 30px;
    }
</style>

