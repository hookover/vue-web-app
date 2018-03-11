<template>
    <div>
        <x-dialog v-model="show">
            <div class="box_loading" style="display:block">
                <div class="box_loading_text">
                    <i></i>
                    <span>正在抢任务...</span>
                </div>
                <div class="box_loading_bd"></div>
            </div>
        </x-dialog>
    </div>
</template>
<script>
    import {XDialog} from 'vux'

    export default {
        components: {
            XDialog,
        },
        data:       function () {
            return {
                show: false,
            }
        },
        props: {
            time: {
                default: 1000,
                required: true,
                type: Number
            }
        }
    }
</script>
<style>
    /*抢任务*/
    .box_loading {
        position: fixed;
        z-index: 1000;
        width: 100px;
        height: 80px;
        left: 50%;
        top: 200px;
        margin-left: -50px;
    }
    .box_loading i {
        position: absolute;
        top: 15px;
        left: 50%;
        margin-left: -15px;
        background: url(/dist/images/loading.gif) no-repeat center center;
        background-size: 30px 30px;
        display: block;
        width: 30px;
        height: 30px;
        text-align: center;
        vertical-align: middle;
        margin-bottom: 15px;
    }
    .box_loading span {
        position: absolute;
        top: 52px;
        width: 100px;
        left: 50%;
        margin-left: -50px;
        color: #fff;
        text-align: center;
        font-size: 12px;
        display: block;
    }
    .box_loading_text {
        z-index: 500;
        position: absolute;
        width: 100px;
        height: 80px;
    }
    .box_loading_bd {
        background-color: rgba(0, 0, 0, 0.8);
        width: 100px;
        height: 80px;
        border-radius: 8px;
        z-index: 300;
    }
</style>