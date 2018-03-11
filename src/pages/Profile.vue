<template>
    <div class="profile">
        <AppHeader :go_back="true">个人信息</AppHeader>
        <group title="基本信息">
            <cell is-link>
                <span slot="title">头像</span>
                <img :src="avatar" class="avatar">
                <vue-core-image-upload
                        class="vue-core-image-upload"
                        crop="local"
                        crop-ratio="1:1"
                        :headers="headers"
                        extensions="png,gif,jpeg,jpg"
                        @imageuploaded="imageuploaded"
                        @errorhandle="errorHandle"
                        :data="{space:'worker',is_temporary: 2}"
                        :max-file-size="max_file_size"
                        inputOfFile="image"
                        text=""
                        compress="60"
                        :url="upload_url" >
                </vue-core-image-upload>
            </cell>
            <cell is-link title="用户名" v-if="!profile.username || profile.username === 'u' + profile.phone" @click.native="change('username')">{{profile.username ? profile.username : '未填写'}}</cell>
            <cell title="用户名" v-if="profile.username && profile.username !== 'u' + profile.phone" >{{profile.username ? profile.username : '未填写'}}</cell>
            <cell is-link title="性别" :value="gender" @click.native="(show_gender = true)"></cell>
        </group>

        <group title="安全关联信息">
            <cell title="手机号" is-link :is-loading="!profile.phone" @click.native="changeMobileNumber">
                <i slot="icon" class="fa fa-mobile s40 text-danger"></i>
                <span>{{profile.phone}}</span>
            </cell>
            <cell title="邮件地址" is-link @click.native="changeEmailAddress">
                <i slot="icon" class="fa fa-envelope s22 text-warning"></i>
                <span>{{profile.email ? profile.email : '未填写'}}</span>
            </cell>
            <cell title="微信" is-link @click.native="change('wechat')">
                <i slot="icon" class="fa fa-wechat s22 text-primary"></i>
                <span>{{profile.wechat ? profile.wechat : '未填写'}}</span>
            </cell>
            <cell title="QQ" is-link @click.native="change('qq')">
                <i slot="icon" class="fa fa-qq s22 text-blue"></i>
                <span>{{profile.qq ? profile.qq : '未填写'}}</span>
            </cell>
            <cell title="微博" is-link @click.native="change('weibo')">
                <i slot="icon" class="fa fa-weibo s22 color-red"></i>
                <span>{{profile.weibo ? profile.weibo : '未填写'}}</span>
            </cell>
        </group>

        <group title="提现信息仅可以修改一次<br/>您可以绑定微信账号并通过微信进行提现">
            <cell title="收款人姓名" is-link  v-if="!profile.real_name" @click.native="change('real_name')">
                <i slot="icon" class="fa fa-user s22 color-blue"></i>
                <span>未填写</span>
            </cell>
            <cell title="收款人姓名" v-if="profile.real_name">
                <i slot="icon" class="fa fa-user s22 color-blue"></i>
                <span>{{profile.real_name}}</span>
            </cell>

            <cell title="支付宝账号" is-link v-if="!profile.alipay" @click.native="change('alipay')">
                <img class="icon" style="width: 22px;height: 22px;" slot="icon" src="/dist/images/icon-alipay.png"/>
                <span>未填写</span>
            </cell>
            <cell title="支付宝账号" v-if="profile.alipay">
                <img class="icon" style="width: 22px;height: 22px;" slot="icon" src="/dist/images/icon-alipay.png"/>
                <span>{{profile.alipay ? profile.alipay : '未填写'}}</span>
            </cell>

            <cell title="微信提现绑定" is-link @click.native="goWechatPay">
                <i slot="icon" class="fa fa-wechat s22 text-primary"></i>
                <span v-if="profile.has_bind_wechat === 1">您已绑定微信支付，去提现</span>
                <span v-if="profile.has_bind_wechat !== 1">去绑定微信支付</span>
            </cell>
        </group>

        <group title="任务账号绑定">
            <cell title="淘宝任务账号" is-link :link="{ path:'/bind-account-list', query: {type: 'taobao'}}">
                <img class="icon" slot="icon" src="/dist/images/icon-taobao.png"/>
                <span>{{accounts_number.tb}}个</span>
            </cell>
            <cell title="京东任务账号" is-link :link="{ path:'/bind-account-list', query: {type: 'jd'} }">
                <img class="icon" slot="icon" src="/dist/images/icon-jd.png"/>
                <span>{{accounts_number.jd}}个</span>
            </cell>
        </group>

        <group title="修改密码">
            <cell title="修改账户密码" is-link @click.native="changePassword">
                点击修改
            </cell>
        </group>

        <div style="margin: 15px 5px;">
            <a class="btn btn-warning per100" @click="logout">退出当前账号</a>
        </div>


        <actionsheet v-model="show_gender" :menus="menus_gender" @on-click-menu="chooseGender" show-cancel></actionsheet>
        <ChangeMobileDialog ref="change_mobile_dialog" @on-success="changeMobileSuccess"></ChangeMobileDialog>
        <ChangeEmailDialog ref="change_email_dialog" @on-success="changeEmailSuccess"></ChangeEmailDialog>
        <ChangePasswordDialog  ref="change_password_dialog" @on-success="changePasswordSuccess"></ChangePasswordDialog>
        <div class="mt30"></div>
    </div>
</template>
<script>
    import { Group,Cell,Actionsheet,Confirm,TransferDomDirective as TransferDom } from 'vux'
    import { MessageBox } from 'mint-ui';
    import { mapGetters, mapActions } from 'vuex'
    import AppHeader from '../components/Header.vue'
    import ChangeMobileDialog from '../components/ChangeMobileDialog.vue'
    import ChangeEmailDialog from '../components/ChangeEmailDialog.vue'
    import ChangePasswordDialog from '../components/ChangePasswordDialog.vue'
    import VueCoreImageUpload from 'vue-core-image-upload'
    import api from '../utils/api'
    import * as _ from '../utils/tool'
    import common from '../common/common'

    export default {
        directives: {
            TransferDom
        },
        components: {
            Group,
            Cell,
            Actionsheet,
            AppHeader,
            Confirm,
            VueCoreImageUpload,
            ChangeMobileDialog,
            ChangeEmailDialog,
            ChangePasswordDialog,
        },
        data: function () {
            return {
                profile: {},
                show_change_mobile: false,  //显示修改手机
                show_gender: false,     //显示选择男女
                menus_gender: [
                    {
                        label: '男',
                        value: '1'
                    },
                    {
                        label: '女',
                        value: '2'
                    }
                ],
                //上传图片相关
                upload_url: '/upload',
                max_file_size: 10485760,
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            }
        },
        computed: {
            avatar: function () {
                if(this.profile.avatar) {
                    return this.profile.avatar
                }
                return '/dist/images/avatar/default.white.png'
            },
            gender: function () {
                if(this.profile.gender) {
                    switch (parseInt(this.profile.gender)) {
                        case 1:
                            return '男';
                            break;
                        case 2:
                            return '女';
                            break;
                        default:
                            return '其它'
                    }
                }

                return '未选择'
            },
            ...mapGetters({
                worker_accounts: 'getWorkerSubAccounts',
            }),
            accounts_number: function () {
                return {
                    tb: this.worker_accounts.hasOwnProperty('1') ? this.worker_accounts['1'].length : 0,
                    jd: this.worker_accounts.hasOwnProperty('3') ? this.worker_accounts['3'].length : 0,
                }
            }
        },
        mounted: function () {
            this.getProfileInfo();
            this.tryGetWorkerAccounts();
        },
        methods: {
            ...mapActions({
                updateWorkerSubAccounts: 'updateWorkerSubAccounts',
            }),
            getProfileInfo: function () {
                api.getProfile().then(
                    res=>{
                        if(!$.isEmptyObject(res.data)) {
                            this.profile = res.data;
                        }
                    },
                    p_obj=>{
                       _.toast(p_obj.data.hasOwnProperty('message') ? p_obj.data.message : '网络错误，请稍后再试或联系客服')
                    }
                );
            },
            tryGetWorkerAccounts: function () {
                if($.isEmptyObject(this.worker_accounts)) {
                    api.getWorkerSubAccounts().then(
                        res=>{
                            if(!$.isEmptyObject(res.data)) {
                                this.updateWorkerSubAccounts(res.data);
                            }
                            this.loadding = false;
                        },
                        p_obj=>{

                        }
                    );
                }
            },
            imageuploaded(res) {
                if (res && typeof(res) === 'object' && res.result === true) {
                    api.postProfile({avatar: res.path}).then(
                        server => {
                            _.toast('头像上传更新成功');
                            this.$set(this.profile, 'avatar', res.path)
                        },
                        p_obj => {
                            _.toast(p_obj.data.hasOwnProperty('message') ? p_obj.data.message : '网络错误，请稍后再试或联系客服')
                        }
                    )
                } else {
                    _.toast('图片上传失败，请稍后再试或联系客服','text', 2500)
                }
            },
            errorHandle:           function (error_message) {
                if(error_message.indexOf('FILE IS TOO LARGER MAX FILE IS') >= 0) {
                    _.toast('上传失败：您的图片超过' + this.max_file_size /  1048576 + 'M','text', 3000);
                    return false;
                }

                if(error_message.indexOf('TYPE ERROR') >= 0) {
                    _.toast('文件类型错误，必须是图片格式','text', 3000);
                    return false;
                }

                _.toast(error_message);
            },
            chooseGender(val) {
                if(val === 'cancel') return false;

                if(isNaN(val) || val > 3) {
                    _.toast('参数错误，您已经被系统记录')
                    return false;
                }
                let params = {};
                params['gender'] = val;
                api.postProfile(params).then(
                    res => {
                        _.toast(res.message ? res.message : '您的性别已更新');
                        this.profile['gender'] = val;
                    },
                    p_obj => {
                        _.toast(p_obj.hasOwnProperty('data') && p_obj.data.hasOwnProperty('message') && p_obj.data.message ? p_obj.data.message : '网络错误，请稍后再试')
                    }
                )
            },
            changeMobileNumber: function () {
                this.$refs.change_mobile_dialog.show = true

            },
            changeEmailAddress: function () {
                this.$refs.change_email_dialog.show = true

            },
            changePassword: function () {
                this.$refs.change_password_dialog.show = true;
            },
            change(key) {
                let title = '';
                let only_one = false;
                switch (key) {
                    case 'qq':
                        title = 'QQ';
                        break;
                    case 'alipay':
                        title = '支付宝';
                        only_one = true;
                        break;
                    case 'weibo':
                        title = '微博账号';
                        break;
                    case 'phone':
                        title = '手机号';
                        break;
                    case 'username':
                        title = '用户名';
                        only_one = true;
                        break;
                    case 'wechat':
                        title = '微信号';
                        break;
                    case 'email':
                        title = '邮件地址';
                        break;
                    case 'real_name':
                        title = '提款人真实姓名';
                        only_one = true;
                        break;
                    default:
                        title = '内容';
                }

                MessageBox.prompt('请输入新的 <span class="text-danger">' + title + '</span>' + (only_one ? "<br/>仅可以修改一次" : ''), '').then(
                    ({ value, action }) => {
                        if(value && action === 'confirm') {
                            if(key === 'qq') {
                                if(!/^[1-9][0-9]+$/.test(value)) {
                                    _.toast('您输入的QQ号格式不正确！');
                                    return false;
                                }
                            }

                            let params = {};
                            params[key] = value;
                            api.postProfile(params).then(
                                res => {
                                    _.toast(res.message ? res.message : title + '已更新');
                                    this.$set(this.profile, key, value)
                                },
                                p_obj => {
                                    _.toast(p_obj.hasOwnProperty('data') && p_obj.data.hasOwnProperty('message') && p_obj.data.message ? p_obj.data.message : '网络错误，请稍后再试')
                                }
                            )
                        }
                    },
                    p_obj=>{
                       //取消

                    }
                );
            },
            changeMobileSuccess: function (mobile) {
                this.profile.phone = mobile;
            },
            changeEmailSuccess: function (email) {
                this.profile.email = email;
            },
            changePasswordSuccess: function (param) {

            },
            goWechatPay: function () {
                if(this.profile.has_bind_wechat !== 1) {
                    _.go('/bind-wechat', this.$router);
                } else {
                    _.go('/enchashment', this.$router);
                }
            },
            logout: function () {
                api.loginOut().then(
                    res => {
                        _.toast('您已成功退出！');
                        _.go('/login', this.$router)
                    },
                    p => {

                    }
                )
            }
        }
    }

</script>
<style>
    .profile .avatar{
        height: 40px;
        width:40px;
        border-radius: 50%;
        border: 2px solid #fcca76;
        background: #fcce76;
    }
    .profile .icon {
        height:30px;
        width:30px;
        margin-right: 10px;
    }
    .profile .weui-cells{
        font-size: 13px;
    }


    .mint-msgbox {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        background-color: #fff;
        width: 85%;
        border-radius: 3px;
        font-size: 16px;
        -webkit-user-select: none;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: .2s;
        transition: .2s;
    }
    .mint-msgbox-header {
        padding: 15px 0 0;
    }
    .mint-msgbox-content {
        padding: 10px 20px 15px;
        border-bottom: 1px solid #ddd;
        min-height: 36px;
        position: relative;
    }
    .mint-msgbox-input {
        padding-top: 15px;
    }
    .mint-msgbox-input input {
        border: 1px solid #dedede;
        border-radius: 5px;
        padding: 4px 5px;
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        height:30px;
    }
    .mint-msgbox-input input.invalid {
        border-color: #ff4949;
    }
    .mint-msgbox-input input.invalid:focus {
        border-color: #ff4949;
    }
    .mint-msgbox-errormsg {
        color: red;
        font-size: 12px;
        min-height: 18px;
        margin-top: 2px;
    }
    .mint-msgbox-title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: 700;
        color: #333;
    }
    .mint-msgbox-message {
        color: #999;
        margin: 0;
        text-align: center;
        line-height: 36px;
    }
    .mint-msgbox-btns {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        line-height: 40px;
    }
    .mint-msgbox-btn {
        line-height: 35px;
        display: block;
        background-color: #fff;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin: 0;
        border: 0;
    }
    .mint-msgbox-btn:focus {
        outline: none;
    }
    .mint-msgbox-btn:active {
        background-color: #fff;
    }
    .mint-msgbox-cancel {
        width: 50%;
        border-right: 1px solid #ddd;
    }
    .mint-msgbox-cancel:active {
        color: #000;
    }
    .mint-msgbox-confirm {
        color: #26a2ff;
        width: 50%;
    }
    .mint-msgbox-confirm:active {
        color: #26a2ff;
    }
    .msgbox-bounce-enter {
        opacity: 0;
        -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
        transform: translate3d(-50%, -50%, 0) scale(0.7);
    }
    .msgbox-bounce-leave-active {
        opacity: 0;
        -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);
        transform: translate3d(-50%, -50%, 0) scale(0.9);
    }
    .v-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
    }
</style>