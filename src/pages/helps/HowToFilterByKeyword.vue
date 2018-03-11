<template>
    <div>
        <AppHeader :go_back="true">
            <!--{{server_data.hasOwnProperty('title') ? server_data.title : '文章内容详情'}}-->
            如何根据条件筛选商品？
        </AppHeader>
        <div id="main">
            <h3 class="m10 text-danger">买手请根据任务实际需求筛选，这里提供全部的筛选方法。</h3>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">1.如何找到商品<br/>打开手机淘宝APP，在页面顶部搜索任务提供的关键词。</h4>
                <p><img src="/dist/images/help-faq/j-01.png"></p>
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">2.如何筛选<br/>根据任务提示，搜索关键词后在打开的页面中点击<筛选>，在下拉选项中根据任务提示，进行筛选。</h4>
                <p><img src="/dist/images/help-faq/j-02-1.png"></p>
                <p><img src="/dist/images/help-faq/j-02-2.png"></p>
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">3.如何收藏加购<br/>找到和任务相符合的商品，打开详情页后，浏览商品两分钟，并收藏商品或店铺、加购物车，然后回到首页，收藏物品点击我的淘宝，点击进入收藏的宝贝/店铺截图即可，加购物品在首页下方点击购物车进入截图即可。</h4>
                <p><img src="/dist/images/help-faq/j-03.png"></p>
                <p><img src="/dist/images/help-faq/j-04-1.png"></p>
                <p><img src="/dist/images/help-faq/j-04-2.png"></p>
                <p><img src="/dist/images/help-faq/j-04-3.png"></p>
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">4.如何领取优惠劵<br/>根据提示找到商品后，进入店铺，在首页中点击任意金额的优惠券领取，再返回 <个人中心>，点击<我的卡卷包>进入页面后选择<网店优惠券>，截图即可。</h4>
                <p><img src="/dist/images/help-faq/j-05-1.png"></p>
                <p><img src="/dist/images/help-faq/j-05-2.png"></p>
                <p><img src="/dist/images/help-faq/j-05-3.png"></p>
            </div>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">5.如何进入评价页<br/>打开商品详情页，页面向下拉一点，点击页面中<评价>，进入商品评价页，浏览到评价中部截图即可。</h4>
                <p><img src="/dist/images/help-faq/j-06.png"></p>
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