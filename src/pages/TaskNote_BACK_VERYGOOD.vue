<template>
    <div>
        <AppHeader>我的任务记录</AppHeader>
        <!--任务按钮-->

        <scroller
                style="top: 50px;"
                :on-refresh="refreshData"
                :on-infinite="loadData">
            <group class="task-list">
                <div class="task-item" v-for="item in server_data">
                    <div class="task-log">
                        <img :src="item.product_image" v-if="item.product_image">
                        <img src="/dist/images/default.png" v-if="!item.product_image">
                    </div>
                    <div class="task-detail">
                        <div class="task-head">
                            {{item.name}}
                        </div>
                        <div class="task-info">
                           <span>领取时间：{{formatGetTime(item.seize_at)}}</span>
                        </div>
                    </div>
                    <div class="actions">
                        <!--1可抢单 2被抢单（进行中） 3提交待审核 4审核失败 5审核成功 7申诉中 8申诉失败 9申诉成功，多个状态之间用“,”分隔-->
                        <div class="button"
                             :class="{
                            primary: item.status === 2,
                            disabled: (item.status === 3 || item.status === 5 || item.status === 8 || item.status === 9 || item.status === 7),
                            blue: item === 4
                        }"

                             @click="touch(item)"
                        >
                            {{item.status_name}}
                        </div>
                    </div>
                </div>

                <div class="nothing" v-if="server_data.length === 0 && data_nothing">
                    <img src="/dist/images/task_pop_mobile_img.png">
                    <p>空空如也...,赶紧去抢领任务赚钱吧</p>
                </div>

            </group>
        </scroller>

    </div>
</template>
<script>
    import { Group } from 'vux'
    import {mapGetters, mapActions} from 'vuex'

    import * as _ from '../utils/tool'
    import api from '../utils/api'
    import AppHeader from  '../components/Header.vue'

    export default {
        components: {
            Group,
            AppHeader,
        },
        data: function () {
            return {
                server_data: [],    //任务列表
                page: 1,            //当前页码
                data_nothing: false,    //ajax是否加载中
            }
        },
        computed:   {

        },
        methods:    {
            ...mapActions({
                updateIsLoading: 'updateIsLoading'
            }),
            touch: function (task) {
                //1可抢单 2被抢单（进行中） 3提交待审核 4审核失败 5审核成功 7申诉中 8申诉失败 9申诉成功，多个状态之间用“,”分隔
                //如果是进行中，跳转到任务详情页
                if(task.status === 2 || task.status === 3 || task.status === 4 || task.status === 7) {
                    this.$router.push({name: 'task_detail', params: {id: task.id}});
                }
                //如果是审核失败，跳转到申诉页面
            },
            refreshData: function (done) {
                if (this.data_loading) {
                    return;
                }
                this.page         = 1;
                this.data_nothing = false;

                this.loadData(done, true)
            },
            loadData:    function (done, reload) {
                if (this.data_loading) {
                    return;
                }
                this.data_loading = true;

                api.getTaskList(0,this.page).then(
                    res => {
                        if (res.data.length > 0) {
                            if (reload) {
                                this.$set(this, 'server_data', res.data);
                            } else {
                                this.$set(this, 'server_data', this.server_data.concat(res.data));
                            }
                            ++this.page;
                            this.endDone(done);
                        } else {
                            this.endDone(done, true);
                        }
                    },
                    p_obj => {
                        this.endDone(done);
                    }
                )

            },
            endDone:     function (done, is_done, not_reset_loading) {
                if (!not_reset_loading) {
                    this.data_loading = false;
                }

                if (typeof done === 'function') {
                    if (is_done) {
                        done(true);
                    } else {
                        done();
                    }
                }
            },
            formatGetTime(datetime) {
                return moment(datetime).format('MM-DD HH:mm')
            }
        },
        mounted:    function () {

        },
        destroyed:  function () {

        }

    }
</script>
<style>

</style>