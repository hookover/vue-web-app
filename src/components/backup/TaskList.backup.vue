<template>
    <group class="task-list">

        <masker style="border-radius: 2px;">
            <div class="m-img" :style="{backgroundImage: 'url(/dist/images/task_pop_fail_img.png)'}"></div>
            <div slot="content" class="m-title">
                没有更多内容呢
                <br/>
                <span class="m-time">2016-03-18</span>
            </div>
        </masker>

        
        <div>
            <img src="/dist/images/task_pop_fail_img.png" alt="">
        </div>
        
        <div class="task-item">
            <div class="task-log">
                <img src="http://xyimg.xy599.com/14956928636969.jpg" alt="">
            </div>
            <div class="task-detail">
                <div class="task-head">
                    投资1000元3月标【可使用50元体验券，到期可赚90元】
                </div>
                <div class="task-info">
                    <span>聚划算</span>
                    <span>剩余2812份</span>
                </div>
            </div>
            <div class="actions">
                <div class="price">+9999.99金</div>
            </div>
        </div>
        <div class="task-item">
            <div class="task-log">
                <img src="http://xyimg.xy599.com/14956928636969.jpg" alt="">
            </div>
            <div class="task-detail">
                <div class="task-head">
                    投资1000元3月标
                </div>
                <div class="task-info">
                    <span>聚划算</span>
                    <span>剩余2812份</span>
                </div>
            </div>
            <div class="actions">
                <div class="price">+0.20金</div>
            </div>
        </div>
    </group>
</template>
<script>
    import { Group, XButton, Masker } from 'vux'
    export default {
        components: {
            Group,
            XButton,
            Masker,
        }
    }
</script>
<style>
    .task-list .weui-cells{
        margin-top: 10px;
    }
    .task-list .task-item {
        border-bottom:1px solid #eeeeff;
        padding: 10px 5px;
        font-size: 13px;
        position: relative;
        height:70px;
    }
    .task-list .task-item:last-child {
        border-bottom: none;
    }
    .task-list .task-item .task-log, .task-list .task-item .task-detail, .task-list .task-item .actions {
        display: inline-block;
    }
    .task-list .task-item .task-log {
        width: 55px;
        float: left;
    }
    .task-list .task-item .task-log img{
        width: 55px;
        height:55px;
        -webkit-border-radius:5px;
        -moz-border-radius:5px;
        border-radius:5px;
    }
    .task-list .task-item .task-detail {
        width: 55%;
        color: #555;
        height:25px;
        line-height:25px;
        float: left;
    }
    .task-list .task-item .task-detail .task-head{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .task-list .task-item .task-detail .task-info{
        color: #999;
    }
    .task-list .task-item .actions {
        width: 20%;
    }
    .task-list .task-item .actions .price {
        position: absolute;
        top: 22px;
        right: 10px;
        text-align: center;
        display: block;
        width: 75px;
        height: 25px;
        line-height: 25px;
        color: #fc6e51;
        border: #fc6e51 solid 1px;
        border-radius: 5px;
        overflow: hidden;
    }
</style>