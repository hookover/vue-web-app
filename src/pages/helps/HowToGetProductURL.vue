<template>
    <div>
        <AppHeader :go_back="true">
            <!--{{server_data.hasOwnProperty('title') ? server_data.title : '文章内容详情'}}-->
            如何获取商品连接
        </AppHeader>
        <div id="main">
            <div class="p10 pull-left inline-block per100">
                <h4 class="text-primary mb10">1.找到任务商品后，点开宝贝页面，点击分享</h4>
                <img src="/dist/images/help-faq/lj_01.png">
            </div>
            <div class="p10 pull-left inline-block per100">
                <h4 class="text-primary mb10">2.点击复制链接，然后就可以上传了</h4>
                <img src="/dist/images/help-faq/lj_02.png">
            </div>

        </div>
    </div>
</template>

<script>
    import AppHeader from '../../components/Header.vue';
    export default{
        components: {
            AppHeader,
        },
    }
</script>