<template>
    <group class="task-list">
        <div class="nothing">
            <img src="/dist/images/task_pop_up_img.png">
            <p>开发中，敬请期待...</p>
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
    .task-list .nothing {
        text-align:center;
        color:#555;
        padding:20px;
        font-size:14px;
    }
    .task-list .nothing img{
        width: 50%;
        margin:0 auto;
    }
    .task-list .nothing p{
        margin-top: 15px;
    }
</style>