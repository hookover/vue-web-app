<template>

    <div v-if="show_scroller">
        <scroller
                style="top: 120px;"
                :on-refresh="refreshData"
                :on-infinite="loadData">
            <group class="task-list">
                <div class="task-item" v-for="item in server_data">
                    <div class="task-log">
                        <img :src="item.cover_image" v-if="item.cover_image">
                        <img src="/dist/images/default.png" v-if="!item.cover_image">
                    </div>
                    <div class="task-detail">
                        <div class="task-head">
                            {{item.title}}
                        </div>
                        <div class="task-info">
                            <div  class="new-media-task-info-line">
                                <p>任务ID:{{item.id}}</p>
                                <p>{{item.platform_name}}{{item.source_type_name ? ' - ' + item.source_type_name :''}}</p>
                                <p>剩余{{item.rest_count}}份</p>
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <template v-if="!item.is_seize">
                            <div class="button" @click="seizeTask(item)">+{{Number(item.price).toFixed(3)}}元</div>
                            <!--<div class="button" v-if="item.is_allow_region" @click="seizeTask(item)">+{{item.max_price}}元</div>-->
                            <!--<div class="button disabled" v-if="!item.is_allow_region">地区限制</div>-->
                        </template>
                        <div class="button disabled" v-if="item.is_seize === true">已领</div>
                    </div>
                </div>

                <div class="task-item" v-for="item in preview_server_data" style="position: relative">
                    <!--<div class="preview">{{item.start_time}}</div>-->
                    <div class="task-log">
                        <img :src="item.cover_image" v-if="item.cover_image">
                        <img src="/dist/images/default.png" v-if="!item.cover_image">
                    </div>
                    <div class="task-detail">
                        <div class="task-head">
                            {{item.title}}
                        </div>
                        <div class="task-info">
                            <div  class="new-media-task-info-line">
                                <p><span class="color-red">{{formatDataTime(item.start_at)}}</span></p>
                                <p>{{item.platform_name}}{{item.source_type_name ? ' - ' + item.source_type_name :''}}</p>
                                <p>任务ID:{{item.id}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="button primary">即将开始</div>
                    </div>
                </div>

                <!--<div class="nothing"-->
                <!--v-if="(server_data.length + preview_server_data.length) === 0 && data_loading === true">-->
                <!--<img src="/dist/images/nullShow.png">-->
                <!--</div>-->
            </group>
        </scroller>

    </div>

</template>
<script>
    import {Group, XButton, Masker} from 'vux'
    import {mapGetters, mapState, mapActions} from 'vuex'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        components: {
            Group,
            XButton,
            Masker,
        },
        data:       function () {
            return {
                server_data:         [],           //可以做的任务
                preview_server_data: [],           //预告任务
                page:                1,            //可做任务第page页
                preview_page:        1,            //预告任务第preview_page页
                data_nothing:        false,        //可以做的任务是否已经加载完成
                data_loading:        false,        //数据是否正在加载？
                show_scroller:       true,
            }
        },
        computed:   {
            ...mapGetters({
                getCurrentTaskChannelID: 'getCurrentTaskChannelID',
            }),
            server_params: function () {
                //可做任务参数
                let params         = {
                    page:        this.page,
                };
                //预告任务参数
                let preview_params = {
                    page:        this.preview_page,
                };

                if (this.data_nothing) {
                    return preview_params;
                }
                return params;
            }
        },
        mounted: function () {

        },
        watch:   {

        },
        methods: {
            ...mapActions({
                updateIsLoading: 'updateIsLoading',
                getCurrentTaskChannelID: 'getCurrentTaskChannelID',
            }),
            seizeTask:      function (item) {
                let self = this;
                _.toastDialog('抢领任务中，请稍后...', 1200);

                let params = {
                    plan_id:          item.id
                };

                api.postTaskNewMediaSeize(params).then(
                    res => {
                        setTimeout(function () {
                            _.toastDialog('抢领成功！请在1小时内按规定完成。', 3000);
                        }, 1200);
                        setTimeout(function () {
                            self.$router.push({name: 'task_detail', params: {id: res.task_id, channel_id: self.getCurrentTaskChannelID}});
                        }, 3000);
                    },
                    p_obj => {
                        _.toast(false);
                        setTimeout(function () {
                            _.toastDialog(p_obj.data.message, 5000, true);
                            if (p_obj.data.hasOwnProperty('task_id')) {
                                _.toastDialog(false);
                                self.$vux.confirm.show({
                                    content: '您已有正在进行中的任务，不能领取更多！前往进行中的任务？',
                                    onConfirm () {
                                        self.$router.push({name: 'task_detail', params: {id: p_obj.data.task_id, channel_id: self.getCurrentTaskChannelID}});
                                    }
                                })
                            }
                        }, 800)
                    }
                )
            },
            formatDataTime: function (time) {
                return moment(time).calendar();
            },
            resetData:      function () {
                this.server_data         = [];
                this.preview_server_data = [];
                this.page                = 1;
                this.preview_page        = 1;
                this.data_nothing        = false;
                this.data_loading        = false;

                this.show_scroller = false;
                let self = this;
                setTimeout(function () {
                    self.show_scroller = true;
                },50);

            },
            refreshData:    function (done) {
                if (this.data_loading) {
                    return false;
                }
                this.page         = 1;
                this.data_nothing = false;

                this.preview_page = 1;

                this.loadData(done, true);
            },
            loadData:       function (done, reload) {
                //加载中则中断
                if (this.data_loading) {
                    done();
                    return;
                }
                this.data_loading = true;
                //服务器的数据结构原因，导致哥写得很纠结！
                if (!this.data_nothing) {
                    this.loadTaskPlans(done, reload);
                } else {
                    this.loadTaskPlansPreview(done, reload)
                }

            },
            endDone:        function (done, is_done, not_reset_loading) {
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
            loadTaskPlans(done, reload) {
                api.getNewMediaTaskPlansList(this.server_params).then(
                    res => {
                        if (res.data.length > 0) {
                            if (reload) {
                                this.$set(this, 'server_data', res.data);
                            } else {
                                this.$set(this, 'server_data', this.server_data.concat(res.data));
                            }
                            ++this.page;
                            this.endDone(done);

                            if (reload) {    //若是刷新操作，则再加载一次
                                this.loadData(done, reload);
                            }
                        } else {
                            this.endDone(done);
                            this.data_nothing = true;
                            this.loadData(done, reload);
                        }
                    },
                    p_obj => {
                        this.endDone(done,true);
                        this.data_nothing = true;
                    }
                )
            },
            loadTaskPlansPreview(done, reload) {
                api.getNewMediaTaskPlansPreviewList(this.server_params).then(
                    res => {
                        if (res.data.length > 0) {
                            if (reload) {
                                this.$set(this, 'preview_server_data', res.data);
                            } else {
                                this.$set(this, 'preview_server_data', this.preview_server_data.concat(res.data))
                            }
                            ++this.preview_page;
                            this.endDone(done);
                        } else {
                            this.endDone(done, true);
                        }
                    },
                    p_obj => {
                        this.endDone(done,true);
                        this.data_nothing = true;
                    }
                );
            },
        }
    }
</script>
<style>
    .new-media-task-info-line p{
        line-height:18px;
    }
</style>