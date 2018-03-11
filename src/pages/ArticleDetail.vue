<template>
    <div>
        <AppHeader :go_back="true">
           <!--{{server_data.hasOwnProperty('title') ? server_data.title : '文章内容详情'}}-->
            内容详情
        </AppHeader>

        <div class="article-detail" v-if="server_data.hasOwnProperty('title')">
            <div class="title">
                {{server_data.title}}
            </div>
            <div class="body" v-html="server_data.content"></div>
        </div>
    </div>
</template>
<style>
    .article-detail .title {
        padding: 15px 15px 0 15px;
        font-size: 16px;
        color: #555;
        font-weight: 700;
        line-height: 25px;
        vertical-align: middle;
    }
    .article-detail .body {
        padding: 15px;
        font-size: 14px;
        color: #666;
        line-height: 20px;
        border-top: 1px solid #eee;
    }
</style>
<script>
    import AppHeader from '../components/Header.vue';
    import * as _ from '../utils/tool'
    import api from '../utils/api'

    export default{
        components: {
            AppHeader,
        },
        data () {
            return {
                server_data: {}
            }
        },
        created: function () {
            this.getArticleDetail();
        },
        methods:    {
            getArticleDetail: function () {
                let article_id = this.$route.params.id;
                if(!article_id || isNaN(article_id)) {
                    _.toast('文章ID错误！', 'text', 3000);
                    _.go('/', this.$router);
                    return;
                }
                api.getArticleDetail(article_id).then(
                    res => {
                        if(res.data) {
                            this.server_data = res.data;
                        }
                    },
                    p_obj => {
                        window.history.go(-1);
                    }
                )
            }
        }
    }
</script>
