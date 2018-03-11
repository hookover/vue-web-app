<template>
    <div>
        <AppHeader></AppHeader>
        <!--任务按钮-->
        <TaskActionGrid></TaskActionGrid>
        <TaskList></TaskList>
    </div>
</template>
<script>
    import {XHeader, Actionsheet} from 'vux'
    import {mapGetters, mapActions} from 'vuex'

    import * as _ from '../utils/tool'
    import grids from '../utils/grids'
    import AppHeader from  '../components/GridHeader.vue'
    import TaskActionGrid from  '../components/TaskActionGrid.vue'
    import TaskList from  '../components/NothingTaskList.vue'

    export default {
        components: {
            AppHeader,
            TaskActionGrid,
            TaskList,
        },
        data:       function () {
            return {
                index: 0,
            }
        },
        computed:   {
            ...mapGetters({
                getCurrentTaskChannelInfo: 'getCurrentTaskChannelInfo',
            }),
            task_channel_title: function () {
                let o = this.getCurrentTaskChannelInfo;
                return o ? o.title : '';
            },
        },
        methods:    {

        },
        created:    function () {

        },
        mounted:    function () {

        },
        destroyed:  function () {

        }

    }
</script>
<style>

</style>