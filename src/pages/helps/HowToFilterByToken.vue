<template>
    <div>
        <AppHeader :go_back="true">
            <!--{{server_data.hasOwnProperty('title') ? server_data.title : '文章内容详情'}}-->
            如何根据条件筛选商品？
        </AppHeader>

        <div id="main">
            <div class="p10 m10 pull-left">
                <h1>一、淘口令任务流程</h1>
                <h4 class="text-primary mb10">1.选择任务类型接取任务。</h4>
                <img src="/dist/images/help-faq/c-26.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">2.接取任务进入任务详情页，复制淘口令。</h4>
                <img src="/dist/images/help-faq/c-27.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">3.打开手机淘宝APP</h4>
                <img src="/dist/images/help-faq/c-28.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">4.商品顶部截图并注意截屏时间，因为浏览时间必须大于2分钟。</h4>
                <img src="/dist/images/help-faq/c-29.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">5.浏览到‘看了又看’，在注意时间，浏览时间必须超过2分钟。</h4>
                <img src="/dist/images/help-faq/c-30.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">6.点击领取优惠卷</h4>
                <img src="/dist/images/help-faq/c-31.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">7.点击店铺进去关注店铺，点击收藏便能收藏商品，再点击加入购物车</h4>
                <img src="/dist/images/help-faq/c-32.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">8.点击进入宝贝评价页并浏览到中部以上</h4>
                <img src="/dist/images/help-faq/c-33.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">9.返回首页，点击‘我的淘宝’和‘购物车’进行收藏加购的截图</h4>
                <img src="/dist/images/help-faq/c-34.png">
                <img src="/dist/images/help-faq/c-35.png">
            </div>
            <div class="p10 m10 pull-left">
                <h1>二、任务截图展示</h1>
                <h4 class="text-primary mb10">1.商品顶部截图：</h4>
                <em>注意顶部时间即可，流量时间和底部截图相差必须超过2分钟！</em>
                <img src="/dist/images/help-faq/c-19.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">2.商品底部截图：</h4>
                <em>浏览到‘看了又看’注意顶部时间即可，流量时间和底部截图相差必须超过2分钟！</em>
                <img src="/dist/images/help-faq/c-20.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">3.收藏商品截图</h4>
                <img src="/dist/images/help-faq/c-21.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">4.关注店铺截图</h4>
                <img src="/dist/images/help-faq/c-22.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">5.进入宝贝评价页截图</h4>
                <em>注意浏览宝贝评价必须浏览到中间以上！</em>
                <img src="/dist/images/help-faq/c-23.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">6.领取优惠卷截图</h4>
                <img src="/dist/images/help-faq/c-24.png">
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">7.加入购物车截图</h4>
                <img src="/dist/images/help-faq/c-25.png">
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