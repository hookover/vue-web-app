<template>
    <div>
        <AppHeader :go_back="true">提现明细表</AppHeader>
        <div v-if="server_data.length !== 0 || data_noting !== true">

            <scroller
                    style="top: 50px;"
                    :on-refresh="refreshData"
                    :on-infinite="loadData">

                <div class="income-list mt10">
                    <ul class="task_list_common" v-if="server_data.length > 0">
                        <li class="task_item_common" v-for="item in server_data">
                            <dl class="task_item_brief" @click="touch(item)">
                                <!--这里有两种文字描述情况“体验任务”和“活动任务”-->
                                <dt>提现状态：{{item.status_name}}</dt>
                                <dd>
                                    <!--<p class="exchange_list_date">-->
                                        <!--{{item.description}}-->
                                    <!--</p>-->
                                    <p class="exchange_list_date mt5">
                                        {{item.created_at}}
                                    </p>
                                    <div class="clear"></div>
                                </dd>
                            </dl>
                            <p class="task_state_normal"><span class="s19">{{formatYen(item.amount)}}</span><span
                                    class="s13">元</span></p>
                            <div class="clear"></div>
                        </li>
                    </ul>
                </div>

            </scroller>
        </div>

        <div class="income_list exchange_blank" v-if="server_data.length === 0 && data_noting === true">
            <i class="shr_back"></i>
            <p>您还没有任务收入，先去赚钱吧！</p>
            <router-link to="/">去赚钱</router-link>
        </div>
    </div>
</template>
<script>
    import {Group, XButton, Masker} from 'vux'
    import {mapActions} from 'vuex'
    import AppHeader from '../components/Header.vue'
    import api from '../utils/api'
    import * as _ from '../utils/tool'


    export default {
        components: {
            AppHeader,
            XButton,
            Group,
            Masker,
        },
        data:       function () {
            return {
                server_data:  [],            //可以做的任务
                data_loading: false,        //数据是否正在加载？
                page:         1,
            }
        },
        methods:    {
            ...mapActions({
                updateIsLoading: 'updateIsLoading'
            }),
            formatYen: function (yen) {
                return _.formatYen(yen);
            },
            touch:     function (item) {
                /**
                 * item.type
                 *
                 * 1: 任务佣金
                 * 2: 充值
                 * 3: 收徒佣金
                 * 4: 提现扣款
                 * 5: 任务超时扣款
                 * 6: 冻结
                 * 7: 解除冻结
                 */

                // todo 后期可以完善各种详情跳转连接
                if (item && item.hasOwnProperty('type')) {

                }

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
                    this.endDone(done, reload);

                    return;
                }
                this.data_loading = true;

                api.getWithdrawal({page: this.page}).then(
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
        }
    }
</script>
<style>
    /*全部任务面板*/
    p.task_control_panel {
        margin: 15px auto 15px auto;
        border: #f9a71a solid 2px;
        width: 70%;
        border-radius: 5px;
        overflow: hidden;
    }

    p.task_control_panel a {
        float: left;
        width: 50%;
        color: #f9a71a;
        height: 26px;
        line-height: 26px;
        text-align: center;
    }

    p.task_control_panel a.current {
        background-color: #f9a71a;
        color: #fff;
    }

    ul.task_list_common {
        background-color: #fff;
        border-top: #e2e2e2 solid 1px;
        border-bottom: #e2e2e2 solid 1px;
        margin: 0px 0px 15px 0px;
        padding: 0px 15px;
    }

    li.task_item_common {
        border-bottom: #eaeaea solid 1px;
        padding: 20px 0px;
        position: relative;
    }

    li.task_item_common:last-child {
        border-bottom: none;
    }

    li.task_item_common a {
        float: left;
        width: 100%;
        display: block;
        clear: both;
    }

    li.task_item_common img.task_item_logo {
        float: left;
        width: 36px;
        height: 36px;
        border-radius: 5px;
        margin-right: 15px;
    }

    li.task_item_common dl.task_item_brief {
        float: left;
        width: 65%;
    }

    dl.task_item_brief dt {
        margin-bottom: 4px;
        color: #383838;
        font-size: 15px;
    }

    dl.task_item_brief dd {
    }

    dl.task_item_brief dd p {
        float: left;
        line-height: 12px;
        color: #ababab;
        margin-right: 10px;
    }

    dl.task_item_brief dd p i {
        float: left;
        display: inline-block;
        margin-right: 3px;
        margin-bottom: 5px;
        background: url(/dist/images/game_image/xbox_sprit.png) 0 0 no-repeat;
        background-size: 100px 200px;
        background-position: 0px -15px;
        width: 63px;
        height: 15px;
    }

    dl.task_item_brief dd p i.ico_list_check_speed {
        background: url(/dist/images/game_image/xbox_sprit.png) 0 0 no-repeat;
        background-size: 100px 200px;
        background-position: 0px -15px;
        width: 63px;
        height: 15px;
    }

    dl.task_item_brief dd p i.ico_list_recharge {
        background: url(/dist/images/game_image/xbox_sprit.png) 0 0 no-repeat;
        background-size: 100px 200px;
        background-position: 0px -35px;
        width: 60px;
        height: 15px;
    }

    dl.task_item_brief dd p span {
    }

    dl.task_item_brief dd p b {
        color: #f9a61a;
    }

    p.task_state_normal {
        position: absolute;
        top: 25px;
        right: 0px;
        text-align: center;
        display: block;
        width: 75px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: #fc6e51;
        border: #fc6e51 solid 1px;
        border-radius: 5px;
    }

    p.task_state_sellout {
        position: absolute;
        top: 8px;
        right: 50px;
        width: 60px;
        height: 60px;
        background: url(/dist/images/ico_sell_out.png) 0 0 no-repeat;
        background-size: 60px 60px;
    }

    .income-list p.task_state_normal {
        border: none;
    }

    .income-list .exchange_list_date {
        font-size: 13px;
    }

    .enchashment-list-scroller .xs-plugin-pullup-container {
        line-height: 40px;
    }
</style>