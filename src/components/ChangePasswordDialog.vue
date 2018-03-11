<template>
    <div v-transfer-dom>
        <x-dialog v-model="show" class="remind remind_total remind_know">
            <a class="pop_close" @click="show = false"></a>
            <div class="remind_head">
                <span>修改当前账户密码</span>
            </div>
            <div class="remind_text">
                <div>
                    <input type="text" class="form-control pull-left mb10" v-model="password_old" placeholder="请输入当前账户密码">
                    <input type="text" class="form-control pull-left mb20" v-model="password" placeholder="请输入新密码">
                </div>
            </div>
            <div class="remind_foot">
                <span class="remind_btn" @click="send">提交修改</span>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import {XDialog, TransferDomDirective as TransferDom} from 'vux'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        directives: {
            TransferDom
        },
        components: {
            XDialog,
        },
        data:       function () {
            return {
                show:      false,
                password: '',
                password_old: '',
            }
        },
        methods:    {
            send: function () {
                if(!this.password_old) {
                    _.toast('原密码不能为空！');
                    return false;
                }

                if(!this.password || this.password.length < 6) {
                    _.toast('新密码长度不能小于6位！');
                    return false;
                }

                if(this.password === this.password_old) {
                    _.toast('新密码不能与旧密码相同！');
                    return false;
                }

                let params = {
                    password: this.password,
                    password_old: this.password_old
                };
                api.changePassword(params).then(
                    res => {
                        _.toast('恭喜，修改成功！', 'text', 2000, 'middle');
                        this.show = false;
                    },
                    p => {

                    }
                )
            }
        },
        destroyed:  function () {

        }
    }
</script>

<style>

</style>