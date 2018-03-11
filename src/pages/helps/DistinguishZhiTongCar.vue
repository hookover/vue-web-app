<template>
    <div class="distinguish-zhitongcar">
        <AppHeader :go_back="true">
            如何获取商品连接
        </AppHeader>
        <div class="main-body" style="background: #f9a71a;">
            <div class="mains-img">
                <img src="/dist/images/help-faq/zt2-02.png">
            </div>
            <div class="mains-p" style="margin-top: 15px;">淘宝直通车是为专职淘宝卖家量身定制的，按点击付费的效果营销工具，为卖家实现宝贝的精准推广。
                相信童鞋们在做任务的时候会看到两种类型的任务，一个是常规任务，一个是直通车任务。
                那么问题来了：做任务截图的时候，到底自己截的图是直通车任务呢，还是常规任务呢。</div>
            <div class="mains-imgs">
                <img src="/dist/images/help-faq/zt2-03.png">
            </div>
            <span class="mains-span"><img src="/dist/images/help-faq/zt2-04.png"></span>
            <div class="mains-p">
                以上两张图，第1张商品的左上角有个<span class="color-red">[红色HOT]</span>标志，这就是<span class="color-red">[直通车]</span>的商品哦，第2张左上角是空白，这就是常规任务的商品哦。
                看了之后相信大家都会区分直通车和常规任务了吧。 大家截图的时候要都要注意一下哦！
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

<style type="text/css">
    .distinguish-zhitongcar .ui-list{padding:0 15px;}
    .distinguish-zhitongcar .ui-list li{padding:0;}
    .distinguish-zhitongcar .zt-top-ig{width:100%;}
    .distinguish-zhitongcar .zt-top-ig img{width:100%;}
    .distinguish-zhitongcar .main-body{width:100%;float:left;}
    .distinguish-zhitongcar .mains-img{width:100%;}
    .distinguish-zhitongcar .mains-img img{width:50%;}
    .distinguish-zhitongcar .mains-imgs{width:100%;}
    .distinguish-zhitongcar .mains-imgs img{width:70%;}
    .distinguish-zhitongcar .mains-span{width:80%;margin-left:10%;text-align:center;float:left;margin-top:15px;margin-bottom:15px;}
    .distinguish-zhitongcar .mains-span img{width:100%;}
    .distinguish-zhitongcar .mains-p{width:90%;margin-left:5%;font-size:14px;color:#FFFFFF;line-height:22px;margin-bottom:15px;display:inline-block}
    .distinguish-zhitongcar .mains-p font{color:#FFF100;font-size:14px;font-weight:bold;}
</style>