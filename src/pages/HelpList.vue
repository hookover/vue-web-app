<template>
    <div>
        <AppHeader :go_back="true">帮助信息</AppHeader>

        <div class="helpcenter_details">
            <scroller
                    style="top: 55px;"
                    :on-refresh="refreshData"
                    :on-infinite="loadData">
                <div>
                    <!--每一个问题都用dl标签包含起来-->
                    <dl class="htlp_item_info" v-for="(item,index) in server_data">
                        <dt @click="$router.push('/help-detail/' + item.id)"><i>{{index + 1}}.</i><p v-html="item.title"></p></dt>
                        <!--问题的答案都在这个dd里面-->
                        <dd @click="item.url ? $router.push(item.url) : ''">
                            <p v-html="item.description" v-if="item.description" @click="$router.push('/help-detail/' + item.id)"></p>
                            <p v-html="item.content" v-if="!item.description"></p>
                        </dd>
                    </dl>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        components: {
            AppHeader,
        },
        data:       function () {
            return {
                server_data:     [],
                data_loading:    false,        //数据是否正在加载？
                page:            1,
            }
        },

        methods:    {
            refreshData: function (done) {
                if(this.data_loading) {
                    return;
                }
                this.page         = 1;
                this.data_nothing = false;

                this.loadData(done, true)
            },
            loadData:    function (done,reload) {
                if(this.data_loading) {
                    return;
                }
                this.data_loading = true;
                let category_id = this.$route.params.category_id;

                if (!(parseInt(category_id) > 0)) {
                    this.router.push('/help');
                    _.toast('分类类型错误！！！');
                    return;
                }

                api.getFaq(category_id, this.page).then(
                    res => {
                        if (res.data.length > 0) {
                            if(reload) {
                                this.$set(this, 'server_data', res.data);
                            } else {
                                this.$set(this, 'server_data', this.server_data.concat(res.data));
                            }
                            ++ this.page;
                            this.endDone(done);
                        } else {
                            this.endDone(done,true);
                        }
                    },
                    p_obj => {
                        this.endDone(done);
                    }
                );
            },
            endDone: function (done, is_done, not_reset_loading) {
                if(!not_reset_loading) {
                    this.data_loading = false;
                }

                if(typeof done === 'function') {
                    if(is_done) {
                        done(true);
                    } else {
                        done();
                    }
                }
            }
        }
    }
</script>
<style>
    /*常见问题的详细页面*/
    .helpcenterdetails_con {
    }

    h4.helpcenterdetails_title {
        height: 48px;
        line-height: 50px;
    }

    h4.helpcenterdetails_title span {
        float: left;
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url(/dist/images/help_ico_1.png) 0 0 no-repeat;
        background-size: 25px 25px;
        vertical-align: middle;
        margin: 10px 5px 0px 5px;
    }

    h4.helpcenterdetails_title b {
        display: inline-block;
        font-size: 15px;
    }

    h4.htlp_item_1 span {
        background: url(/dist/images/help_ico_1.png) 0 0 no-repeat;
        background-size: 25px 25px;
    }

    h4.htlp_item_1 b {
        color: #f7c058;
    }

    h4.htlp_item_2 span {
        background: url(/dist/images/help_ico_2.png) 0 0 no-repeat;
        background-size: 25px 25px;
    }

    h4.htlp_item_2 b {
        color: #89d1f6;
    }

    h4.htlp_item_3 span {
        background: url(/dist/images/help_ico_3.png) 0 0 no-repeat;
        background-size: 25px 25px;
    }

    h4.htlp_item_3 b {
        color: #fa8484;
    }

    h4.htlp_item_4 span {
        background: url(/dist/images/help_ico_4.png) 0 0 no-repeat;
        background-size: 25px 25px;
    }

    h4.htlp_item_4 b {
        color: #8d99fd;
    }

    h4.htlp_item_5 span {
        background: url(/dist/images/help_ico_5.png) 0 0 no-repeat;
        background-size: 25px 25px;
    }

    h4.htlp_item_5 b {
        color: #74b1ff;
    }

    .helpcenter_details {
    }

    dl.htlp_item_info {
        background-color: #fff;
        -webkit-box-shadow: 0 0 5px rgba(166, 166, 166, .1);
        -moz-box-shadow: 0 0 5px rgba(166, 166, 166, .1);
        box-shadow: 0 0 5px rgba(166, 166, 166, .1);
    }

    dl.htlp_item_info dt {
        padding: 15px 15px 0px 0px;
        font-size: 15px;
        color: #555;
        font-weight: bold;
        line-height: 25px;
        vertical-align: middle;
    }

    dl.htlp_item_info dt i {
        float: left;
        display: inline-block;
        width: 30px;
        font-style: normal;
        text-align: center;
        margin: 0px 0px 0px 5px;
    }

    dl.htlp_item_info dt p {
        margin-left: 35px;
        padding-right: 10px;
    }

    dl.htlp_item_info dd {
        margin: 15px;
        padding: 15px 15px 15px 20px;
        font-size: 12px;
        color: #666;
        line-height: 20px;
        border-top: #eee solid 1px;
    }

    dl.htlp_item_info dd p {
        margin-bottom: 10px;
    }

</style>