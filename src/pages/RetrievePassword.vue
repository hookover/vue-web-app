<template>
    <div class="retrieve-password">
        <AppHeader :go_back="true">
            找回密码
        </AppHeader>

        <group title="请选择密码找回方式">
            <radio :selected-label-style="{color: '#FF9900'}" :options="options" v-model="type" @on-change="change"></radio>
        </group>
        <group>
            <x-input :title="verify_type + '账号'" :placeholder="'请填写'+ verify_type + '账号'" v-model="account"></x-input>
            <x-input title="验证码" class="weui-cell_vcode" v-model="verify_code">
                <img slot="right" class="weui-vcode-img" :src="verify_code_src" @click="verify_code_src = '/verifycode/captcha?t=' + Math.random()">
            </x-input>
            <x-input :title="verify_code_title" class="weui-vcode" v-model="verify_server_code">
                <!--<x-button slot="right" type="primary" mini @click="sendPhoneCode">立即发送</x-button>-->
                <a slot="right" class="btn btn-danger btn-xs" @click="sendPhoneCode">立即发送</a>
            </x-input>
        </group>


        <group>
            <x-input title="新密码" v-model="password"></x-input>
        </group>

        <div class="p10 mt30">
            <a href="javascript:void(0)" class="btn btn-warning per100" @click="forgetPassword">确认修改</a>
        </div>
    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue'
    import { Group, XInput, XButton, Radio } from 'vux'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        components: {
            AppHeader,
            Group,
            XInput,
            XButton,
            Radio,
        },
        data: function () {
            return {
                verify_code_src: '/verifycode/captcha',
                options: [
                    {
                        key: 1,
                        value: '通过手机验证码找回密码'
                    },
                    {
                        key: 2,
                        value: '通过邮箱验证码找回密码'
                    },
                ],
                type: 1,                //找回密码类型 1手机 2邮箱
                account: '',            //用户账号
                verify_code:'',         //图片验证码
                verify_server_code: '', //手机或邮件验证码
                password: '',           //新密码
            }
        },
        computed: {
            verify_code_title: function () {
                if(this.type === 1) {
                    return '手机验证码'
                }
                return '邮箱验证码'
            },
            verify_type: function () {
                if(this.type === 1) {
                    return '手机'
                }
                return '邮箱'
            }
        },
        watch: {
            type: function (val, old) {
                this.account = '';
                this.verify_code = '';
                this.verify_code_src = '/verifycode/captcha?t=' + Math.random()
            }
        },
        methods: {
            sendPhoneCode: function () {
                let params = {
                    username: this.account,
                    phone: this.account,
                    email: this.account,
                    type: this.type,
                    code: this.verify_code,
                };

                if(!params.type) {
                    _.toast('找回密码的类型不能为空！');
                    return false;
                }
                if(!params.username) {
                    _.toast('找回密码的账号不能为空，可以是手机号/邮箱/用户名！');
                    return false;
                }
                if(!params.code) {
                    _.toast('图片验证码不能为空！');
                    return false;
                }


                if(this.type === 1) {
                    //手机
                    api.getMobileCode(params).then(
                        res => {
                            _.toast(this.verify_code_title + '已经发送！')
                        },
                        p => {
                            this.verify_code_src = '/verifycode/captcha?t=' + Math.random()
                        }
                    )
                }

                if(this.type === 2) {
                    //邮件
                    api.getEmailCode(params).then(
                        res => {
                            _.toast(this.verify_code_title + '已经发送！')
                        },
                        p => {
                            this.verify_code_src = '/verifycode/captcha?t=' + Math.random()
                        }
                    )
                }
            },
            forgetPassword: function () {
                let params = {
                    username: this.account,
                    phone: this.account,
                    email: this.account,
                    type: this.type,
                    code: this.verify_code,
                    phone_vcode: this.verify_server_code,
                    email_vcode: this.verify_server_code,
                    password: this.password
                };

                if(params.password.length < 6) {
                    _.toast('新密码长度不能小于6！');
                    return false;
                }
                if(!params.type) {
                    _.toast('找回密码的类型不能为空！');
                    return false;
                }
                if(!params.username) {
                    _.toast('找回密码的账号不能为空，可以是手机号/邮箱/用户名！');
                    return false;
                }
                if(!params.code) {
                    _.toast('图片验证码不能为空！');
                    return false;
                }
                if(!this.verify_server_code) {
                    _.toast(this.verify_code_title + '不能为空！');
                    return false;
                }

                api.postForgetPassword(params).then(
                    res => {
                        _.toast(res.message ? res.message : '密码修改成功！');
                        _.go('/', this.$router)
                    },
                    p => {

                    }
                )
            },
            change: function (type) {

            }
        }
    }
</script>
<style>
    .retrieve-password .weui-vcode-img{
        display: inline-block;
        width: auto;
    }
    .retrieve-password .weui-cell{
        font-size: 14px;
    }
</style>