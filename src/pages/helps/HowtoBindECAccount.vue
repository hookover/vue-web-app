<template>
    <div>
        <AppHeader :go_back="true">
            <!--{{server_data.hasOwnProperty('title') ? server_data.title : '文章内容详情'}}-->
            如何绑定电商账户？
        </AppHeader>
        <div id="main">
            <h3 class="m10 text-danger">看图操作~</h3>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">1.我的淘宝页面</h4>
                <p><img src="/dist/images/help-faq/b-1.png"></p>
            </div>

            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">2.点头像进入“个人资料”页面</h4>
                <p>“个人资料”页面中的账号名称即是绑定页面需要填写的“账号名称”</p>
                <p><img src="/dist/images/help-faq/b-2.png"></p>
            </div>


            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">3.点淘气值,进入“会员中心页面”</h4>
                <p><img src="/dist/images/help-faq/b-3.png"></p>
            </div>

            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">4.在“我的淘宝”页面点“我的评价”</h4>
                <p><img src="/dist/images/help-faq/b-4.png"></p>
            </div>

            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">5.找到能显示“我的信誉”的页面</h4>
                <p><img src="/dist/images/help-faq/b-5.png"></p>
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