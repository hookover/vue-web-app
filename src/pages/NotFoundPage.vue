<template>
    <div class="not-found">
        <AppHeader :go_back="true">404 not found</AppHeader>
        <group class="task-list">
            <div class="nothing">
                <img src="/dist/images/exchange_blank_icon.png">
                <p>这个页面不存在...</p>
            </div>
        </group>
    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue'
    import { Group } from 'vux'
    export default {
        components: {
            AppHeader,
            Group,
        }
    }
</script>
<style>
    .not-found .nothing {
        text-align:center;
        color:#555;
        padding:20px;
        font-size:14px;
    }
    .not-found .nothing img{
        width: 50%;
        margin:0 auto;
    }
    .not-found .nothing p{
        margin-top: 15px;
    }
    .not-found .weui-cells{
        background-color: #f5f5f5;
    }
</style>