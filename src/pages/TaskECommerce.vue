<template>
    <div>
        <AppHeader></AppHeader>
        <!--任务按钮-->
        <TaskActionGrid></TaskActionGrid>
        <!--当前任务-->
        <!--<ProcessTask></ProcessTask>-->
        <!--任务列表-->
        <TaskList></TaskList>
        <!--页脚-->
        <!--<AppFooter></AppFooter>-->
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    import * as _ from '../utils/tool'
    import grids from '../utils/grids'
    import TaskActionGrid from  '../components/TaskActionGrid.vue'
    import TaskList from  '../components/TaskECommerceList.vue'
    import AppHeader from  '../components/GridHeader.vue'
    import ProcessTask from  '../components/ProcessTask.vue'
    import AppFooter from '../components/Footer.vue'


    export default {
        components: {
            TaskActionGrid,
            TaskList,
            AppHeader,
            ProcessTask,
            AppFooter,
        },
        data: function () {
            return {
                index:0,
            }
        },
        computed: {
            ...mapGetters({
                getCurrentTaskChannelInfo: 'getCurrentTaskChannelInfo',
            }),
            task_channel_title: function () {
                let o = this.getCurrentTaskChannelInfo;
                return o ? o.title : '';
            },
        },
        methods: {
            ...mapActions({
                updateShowSubAccountDialog: 'updateShowSubAccountDialog'
            }),
        },
        created: function () {

        },
        mounted: function () {

        },
        destroyed: function () {

        }

    }
</script>
<style>

</style>