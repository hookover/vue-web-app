<template>
    <div>
        <AppHeader :go_back="true">新闻公告列表</AppHeader>

         <!--显示子任务类型，如淘宝下面的聚划算、淘抢购...-->
        <vux-scroller lock-y :scrollbar-x=false class="situation-list">
            <div :style="width">
                <tab v-model="index">
                    <tab-item :selected="selected === index" v-for="(item,index) in article_categorys" @click.native="onItemClick(index,item)">
                        {{item.name}}
                    </tab-item>
                </tab>
            </div>
        </vux-scroller>

        <div v-if="article_categorys.length > 0 && show_scroller">
            <scroller
                    ref="situation_scroller"
                    style="top: 90px;"
                    :on-refresh="refreshData"
                    :on-infinite="loadData">
                <panel :list="server_data" type="2"></panel>
            </scroller>
        </div>
    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue';
    import { Cell, Tab, TabItem, Panel, Scroller as VuxScroller } from 'vux'
    import { mapGetters } from 'vuex'
    import api from '../utils/api'

    export default {
        components: {
            AppHeader,
            Cell,
            Tab,
            TabItem,
            Panel,
            'vux-scroller': VuxScroller,
        },
        data :function () {
            return {
                selected: 0,
                server_data: [],
                data_loading: false,
                page: 1,
                show_scroller: true,
            }
        },
        computed: {
            ...mapGetters({
                'article_category_list': 'getArticleCategoryList'
            }),
            article_categorys: function() {
//                return [{id:999, name: '站内信'}].concat(this.article_category_list)
                return [].concat(this.article_category_list)
            },
            width: function () {
                let items = this.article_categorys.length;

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
                let category_id = this.article_categorys[this.selected].id;

                api.getArticleList(category_id,this.page).then(
                    res => {
                        if (res.data.length > 0) {
                            //格式化数据
                            let tmp = [];
                            for(let n in res.data) {
                                tmp.push({
                                    title: (res.data[n].title).replace(/<\/?[^>]*>/g,''),
                                    desc: (res.data[n].content.length < 40 ? res.data[n].content : res.data[n].content.substr(0, 40) + '...').replace(/<\/?[^>]*>/g,''),
                                    url: '/article-detail/' + res.data[n].id
                                })
                            }

                            if (reload) {
                                this.$set(this, 'server_data', tmp);
                            } else {
                                this.$set(this, 'server_data', this.server_data.concat(tmp));
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