<template>
    <div>
        <div class="pagewidth login_box">
            <div class="login_banner" @click="$router.push('/')"><i class="login_logo"></i></div>
            <ul class="shuru">
                <li>
                    <i class="username_ico"></i>
                    <input placeholder="请填写手机号/邮箱地址" v-model="username" class="login-width">
                </li>
                <li class="noborderbottom">
                    <i class="userdxyz_ico"></i>
                    <input placeholder="请输入密码" type="password" v-model="password" class="login-width" @keyup.enter="login">
                </li>
                <!--<li class="noborderbottom">-->
                    <!--<i class='userdxyz_ico'></i>-->
                    <!--<input class="" type="number" placeholder="请输入验证码" v-model="vercode">-->
                    <!--&lt;!&ndash;-&#45;&#45;获取验证码的这个btn，等待时间再一次发送验证码的时候还额外有个class是btn_dxyz_waiting,里面文字变成"60秒后重新获取"-&ndash;&gt;-->
                    <!--<input type="button" class="btn_dxyz" value="获取验证码">-->
                <!--</li>-->
            </ul>
            <a href="javascript:void(0)" class="btn_full_login" @click="login" @keyup.32="login">登&nbsp;录</a>
            <div class="footer">
                <span class="pull-left text-primary" @click="go('/share')">注册账号</span>
                <span class="pull-right text-default" @click="go('/retrieve-password')">忘记密码？</span>
            </div>
        </div>

    </div>
</template>
<script>
    import { Group, XInput } from 'vux'
    import * as _ from '../utils/tool'
    import api from '../utils/api'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            Group,
            XInput,
        },
        data: function () {
            return {
                username:'',
                password: '',
            }
        },
        computed: {
            ...mapGetters({
                getPreRouterPath: 'getPreRouterPath'
            }),
        },
        methods: {
            go: function (url) {
                _.go(url, this.$router)
            },
            login: function () {
                if(this.username === '' && (/^1[3-9]\d{9}$/.test(this.username) === false || /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$ /.test(this.mobile) === false) )
                {
                    _.toast('请输入正确的手机号码或邮箱地址', 'text', 3000, 'middle');
                    return false;
                }
                if(this.password === '' || this.password.length < 6) {
                    _.toast('密码长度不足6位', 'text', 3000, 'middle');
                    return false;
                }

                api.login(this.username, this.password).then(
                    res=>{
                        _.toast(res.message ? res.message : '登录成功！');
                        if(this.$route.query.referer) {
                            _.go(this.$route.query.referer);
                            return false;
                        }

                        if(this.getPreRouterPath && this.getPreRouterPath !== '/login' && this.getPreRouterPath !== 'login' && this.getPreRouterPath !== '/share') {
                            _.go(this.getPreRouterPath, this.$router);
                        } else {
                            _.go('/', this.$router);
                        }
                    },
                    p_obj=>{

                    }
                )
            }
        }
    }
</script>
<style>
    .login_box {
        font-size:14px;
    }
    .login_box .footer{
        width: 90%;
        margin: 10px auto;
    }
    .login_box .footer span{
        cursor: pointer;
    }
    .login_box .login-width{
        width:80%;
    }
</style>