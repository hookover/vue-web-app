<template>
    <div>
        <AppHeader :go_back="true">任务详情</AppHeader>
        <!--任务按钮-->

        <!--淘宝天猫京东-->
        <template v-if="channel_id === 1 || channel_id === 2 || channel_id === 3">
            <ECommerceTaskDetail :task_id="task_id"></ECommerceTaskDetail>
        </template>

        <!--新媒体任务-->
        <template v-if="channel_id === 4">
            该功能尚未启用,请<a @click="$router.push('/')">返回首页</a>
        </template>

        <!--新媒体任务-->
        <template v-if="channel_id === 5">
            <NewMediaTaskDetail :task_id="task_id"></NewMediaTaskDetail>
        </template>



        <!--channel_id错误或没有任务时显示-->
        <group class="task-list" v-if="channel_id < 1 || channel_id > 5">
            <div class="nothing">
                <img src="/dist/images/nullShow.png">
                <p>任务分类ID错误，请从正常的入口进入 <a @click="$router.push('/')">点击返回首页</a></p>
            </div>
        </group>

    </div>
</template>
<script>
    import { Scroller, Group, Countdown } from 'vux'
    import * as _ from '../utils/tool'
    import api from '../utils/api'
    import AppHeader from '../components/Header.vue'
    import ECommerceTaskDetail from '../components/ECommerceTaskDetail.vue'
    import NewMediaTaskDetail from '../components/NewMediaTaskDetail.vue'

    export default {
        components: {
            Scroller,
            Group,
            Countdown,
            AppHeader,
            ECommerceTaskDetail,
            NewMediaTaskDetail,
        },
        data: function () {
            return {}
        },
        computed:   {
            channel_id: function () {
                return parseInt(this.$route.params.channel_id);
            },
            task_id: function () {
                return parseInt(this.$route.params.id);
            }
        },
        created:    function () {

        },
        mounted:    function () {

        },
        destroyed:  function () {

        },
        watch: {

        },

    }
</script>
<style>

</style>