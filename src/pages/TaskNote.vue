<template>
    <div>
        <AppHeader>我的任务记录</AppHeader>
        <!--任务按钮-->

        <tab>
            <tab-item :selected="choose_id === item.id" v-for="(item,index) in task_types" @click.native="onItemClick(index,item)">
                {{item.name}}
            </tab-item>
        </tab>

        <template v-if="choose_id === 1">
            <TaskECommerceNote></TaskECommerceNote>
        </template>

        <template v-if="choose_id === 2">
            <TaskNewMediaNote></TaskNewMediaNote>
        </template>
    </div>
</template>
<script>
    import { Tab, TabItem } from 'vux'
    import AppHeader from  '../components/Header.vue'
    import TaskECommerceNote from  '../components/TaskECommerceNote.vue'
    import TaskNewMediaNote from  '../components/TaskNewMediaNote.vue'

    export default {
        components: {
            AppHeader,
            Tab, TabItem,
            TaskECommerceNote,
            TaskNewMediaNote,
        },
        data: function () {
           return {
               choose_id: 1,
               task_types: [
                   {
                       id: 1,
                       name: '电商任务'
                   },
                   {
                       id: 2,
                       name: '新媒体任务'
                   },
               ]
           }
        },
        computed:   {
            channel_id: function () {
                let channel_id = this.$route.query.channel_id
                if(parseInt(channel_id) === 5) {
                    return 2;
                }
                return 1;
            }
        },
        methods:    {
            onItemClick: function (index, item) {
                this.$set(this, 'choose_id', parseInt(item.id))
            },
        },
        mounted:    function () {
            this.$set(this, 'choose_id', this.channel_id)
        },
        destroyed:  function () {

        }

    }
</script>
<style>

</style>