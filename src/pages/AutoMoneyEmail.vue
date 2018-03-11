<template>
    <div>
        <AppHeader :go_back="true">躺着赚任务管理</AppHeader>

         <!--显示子任务类型，如淘宝下面的聚划算、淘抢购...-->
        <vux-scroller lock-y :scrollbar-x=false class="situation-list">
            <div :style="width">
                <tab v-model="index">
                    <tab-item :selected="selected === index" v-for="(item,index) in article_category_list" @click.native="onItemClick(index,item)">
                        {{item.name}}
                    </tab-item>
                </tab>
            </div>
        </vux-scroller>

        <div v-if="selected == 0">
            <div class="task-submit-review">
                <div class="list-item mt10">
                    <h3 class="task-submit-review-header">
                        添加躺着赚SMTP账号
                        <a style="display:inline-block;float:right;padding-right:10px;font-size:12px;" @click="$router.push('/helps/how-to-bind-smtp-account')">
                            <i class="fa fa-info-circle"></i> 帮助教程
                        </a>
                    </h3>
                    <div class="comment_upload_btn_box">
                        <x-input title="SMTP邮箱" v-model="account" placeholder="仅支持QQ邮箱,请输入邮件地址"></x-input>
                        <x-input title="SMTP密码" v-model="password" placeholder="非QQ密码或QQ邮箱密码,请看教程"></x-input>
                    </div>
                </div>
            </div>


            <group>
                <div class="text-center mt20 mb20">
                    <span class="btn btn-warning" @click="add">确认提交</span>
                </div>
            </group>

            <div class="mt15">
                <div class="help_answers_box">
                    <h3>SMTP账号租用(躺着赚钱)说明</h3>
                    <div class="step_mark_box">
                        <div class="step_mark">
                            <p><i>1</i>
                                用途: 您的SMPT账号将用于我们或我们的客户向我或我们客户的准客户发送营销或通知信件
                            </p>
                            <div class="clear"></div>
                        </div>
                        <div class="step_mark">
                            <p><i>2</i>
                                费用: 每成功发送一封邮件,我们将向您支付2到5厘钱,您每天大约会得到0.5~3元RMB,我们将根据实际使用条数向您支付相应费用
                            </p>
                            <div class="clear"></div>
                        </div>
                        <div class="step_mark">
                            <p><i>3</i>
                                安全: 账号数据全程采用非对称加密存储传输
                            </p>
                            <div class="clear"></div>
                        </div>
                        <div class="step_mark">
                            <p><i>4</i>
                                合规: 我们发送的信件内容是合法合规的营销广告或网站通知
                            </p>
                            <div class="clear"></div>
                        </div>
                        <div class="step_mark">
                            <p><i>5</i>
                                添加账号后我还需要做其它工作吗?<br/>
                                完全不用,添加SMTP信箱账号后,您只要等收益到账就行了~
                            </p>
                            <div class="clear"></div>
                        </div>
                        <div class="step_mark">
                            <p><i>6</i>
                                收益到账时间: 每发送一封信件,您在SMTP账号列表将可以实时查看赚取的佣金(有时会延迟3~5分钟)
                            </p>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div v-if="article_category_list.length > 0 && show_scroller && selected == 1">
            <scroller
                    ref="situation_scroller"
                    style="top: 90px;"
                    :on-refresh="refreshData"
                    :on-infinite="loadData">
                <!--<panel :list="server_data" type="2"></panel>-->
                <group>
                    <swipeout v-for="item in server_data">
                        <swipeout-item transition-mode="follow">
                            <div slot="right-menu">
                                <swipeout-button @click.native="deleteConfirm(item)" type="warn">删除账号</swipeout-button>
                            </div>
                            <div slot="content" class="vux-1px-t">
                                <cell :title="item.smtp_username" :inline-desc="'累计收益: ¥' + parseFloat(item.money_count).toFixed(3)">
                                    <span slot="value" :class="{'text-success':item.status === 1, 'text-danger': item.status !== 1}">{{item.status_name}}</span>
                                </cell>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </group>

            </scroller>
        </div>

    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue';
    import { Cell, Tab, TabItem, Group, Panel, XInput, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import { mapGetters } from 'vuex'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        components: {
            AppHeader,
            Cell,
            Tab,
            TabItem,
            Panel,
            Group,
            XInput,
            Swipeout, SwipeoutItem, SwipeoutButton,
        },
        data :function () {
            return {
                selected: 0,
                server_data: [],
                data_loading: false,
                page: 1,
                show_scroller: true,
                article_category_list: [
                    {
                        id: 2,
                        name: '添加躺赚账号'
                    },
                    {
                        id: 1,
                        name: '收入及账号列表'
                    },
                ],
                account: '',
                password: '',
            }
        },
        computed: {
            width: function () {
                let items = this.article_category_list.length;

                switch (items) {
                    case 0:
                    case 1:
                    case 2:
                        return 'width:100%;';
                        break;
                    default:
                        return 'width:' + items * 33.3 + '%'
                }
            }
        },
        watch: {
            'selected': function (val, old) {
                this.server_data = [];
                this.page = 1;

                this.show_scroller = false;
                let self = this;
                this.data_nothing = false;
                setTimeout(function () {
                    self.show_scroller = true;
                },50);
            }
        },
        methods: {
            onItemClick: function (index, item) {
                this.selected = parseInt(index);
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

                api.getAutoMailList({page: this.page}).then(
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
                        this.endDone(done,true);
                        this.data_loading = false;
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
            deleteConfirm (row_data) {
                let self = this;
                this.$vux.confirm.show({
                    title: '您确定要删除吗？',
                    content: '删除后无法获得还未计算的收益',
                    onConfirm () {
                        self.deleteAccount(row_data)
                    }
                })
            },
            deleteAccount: function (row_data) {
                api.postDeleteAutoMailSmtpAccount({id: row_data.id}).then(
                    res=>{
                       if(res.result === true) {
                        _.toast(res.hasOwnProperty('message') ? res.message : '操作成功!!', 'text', 2000);
                        this.refreshData();
                    } else {
                        _.toast(res.hasOwnProperty('message') ? res.message : '操作失败,服务器未返回有效的message信息!!', 'text', 2000);
                        }
                    },
                    p=>{

                    }
                );
            },
            add: function () {
                if(!this.account || !/([\w\-]+\@[\w\-]+\.[\w\-]+)/.test(this.account)) {
                    _.toast('请填写正确的邮件账号,如username@example.com!', 'text', 2000);

                    return false;
                }

                if(this.account.length > 64) {
                    _.toast('您填写的邮箱地址过长!');
                    return false;
                }

                if(!this.password) {
                    _.toast('SMTP账号密码不能为空');
                    return false;
                }
                let params = {
                    smtp_username: this.account,
                    smtp_password: this.password,
                };
                api.postAutoMailSmtpAccount(params).then(
                    res => {
                        if(res.result === true) {
                             _.toast(res.message ? res.message : '添加SMTP账号成功,开启躺赚模式!', 'text', 2000);
                            this.selected = 1;
                        } else {
                            _.toast(res.message ? res.message : '添加SMTP账号失败,请稍后再试或联系客服!', 'text', 2000);
                        }
                    },
                    p => {

                    }
                )
            }
        }
    }
</script>
<style>
    .news-wrap-list .vux-label{
        font-size: 16px;
        margin-bottom: 5px;
        color: #555;
    }
    .news-wrap-list .weui_cell_bd>p{
        font-size:15px;
    }
    .news-wrap-list .vux-label-desc{
        padding-right:13px;
    }
    .news-wrap-list .weui_cell_bd.weui_cell_primary{
        padding-left:5px;
    }
    .news-wrap-list .pubdate{
        font-size:5px;
    }

    .situation-list .vux-tab-item {
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
    }
    .situation-list .vux-tab-item .vux-badge {
        background-color: inherit;
        color: inherit;
    }
</style>