<template>
    <group class="task-list" v-if="server_data.length > 0">
        <div class="task-item" v-for="item in server_data">
            <div class="task-log">
                <img :src="item.cover_image" v-if="item.cover_image">
                <img src="/dist/images/default.png" v-if="!item.cover_image">
            </div>
            <div class="task-detail">
                <div class="task-head">
                    {{item.name}}
                </div>
                <div class="task-info">
                    <span>{{item.platform_name + '-'}}{{item.source_type_name}}</span>
                    <span>剩余{{item.count}}份</span>
                </div>
            </div>
            <div class="actions">
                <div class="price text-success">进行中...</div>
            </div>
        </div>
    </group>
</template>
<script>
    import { Group } from 'vux'
    import api from '../utils/api'

    export default {
        components: {
            Group,
        },
        data: function () {
            return {
                server_data: []
            }
        },
        mounted: function () {
            this.loadData();
        },
        methods: {
            loadData: function () {
                api.getTaskList(2, 1, 1).then(
                    res=>{
                        if(res.data && res.data.length > 0) {
                            this.$set(this, 'server_data', res.data)
                        }
                    },
                    p_obj=>{

                    }
                )
            }
        }
    }

</script>