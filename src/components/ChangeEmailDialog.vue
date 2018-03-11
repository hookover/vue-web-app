<template>
    <div v-transfer-dom>
        <x-dialog v-model="show" class="remind remind_total remind_know">
            <a class="pop_close" @click="show = false"></a>
            <div class="remind_head">
                <span>{{ !checked ? '发送手机验证码' : '修改新的邮件地址'}}</span>
            </div>
            <div class="remind_text">
                <div v-if="checked === false">
                    <input type="text" class="per60 form-control pull-left" placeholder="验证手机号码" v-model="vcode">
                    <a href="javascript:void(0)" class="btn btn-warning pull-right" :class="{disabled: sending}" v-if="!send"
                       @click="sendSMS">{{sending ? '发送中…': '发送短信'}}</a>
                    <a href="javascript:void(0)" class="btn btn-danger pull-right" v-if="send"><span class="countdown">60</span>秒</a>
                    <div class="clear"></div>
                </div>
                <div v-if="checked === true">
                    <div>
                        <input type="text" class="form-control" placeholder="填写新的邮件地址" v-model="email">
                    </div>
                    <div class="mt5">
                        <input type="text" class="form-control per50 pull-left" placeholder="图片验证码"
                               v-model="captcha_code">
                        <img :src="captcha" class="verifycode pull-right"
                             @click="captcha = '/verifycode/captcha?t=' + Math.random()"/>
                        <div class="clearfix"></div>
                    </div>
                    <div class="mt5">
                        <input type="text" class="form-control per40 pull-left" placeholder="邮箱验证码"
                               v-model="vcode_email">
                        <a href="javascript:void(0)" class="btn btn-warning pull-right" :class="{disabled: sending}"
                           @click="sendEmail">{{sending ? '发送中…': '发送邮件验证码'}}</a>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="remind_foot">
                <span class="remind_btn" @click="checkSMS" v-if="checked === false">验证手机验证码</span>
                <span class="remind_btn" @click="changeEmail" v-if="checked === true">提交修改</span>
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
                captcha:     '/verifycode/captcha?t=' + Math.random(),
                show:        false,
                send:        false,
                checked:     false,
                email:       '',     //新邮件地址
                vcode:       '',     //手机验证码
                vcode_email: '',     //邮件验证码
                sending:     false,  //发送中
            }
        },
        watch:      {
            vcode: function (val, old) {
                this.clearCountdown();
            },
            show:  function (val, old) {
                if (val === false) {
                    this.reset();
                }
            }
        },
        methods:    {
            reset:          function () {
                //初始化
                this.send        = false;
                this.checked     = false;
                this.email       = '';
                this.vcode       = '';
                this.vcode_email = '';
            },
            changeEmail:    function () {
                if (!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.email)) {
                    _.toast('邮件地址不合法！', 'text', 1000, 'bottom');
                    return false;
                }
                if (!this.vcode_email) {
                    _.toast('验证码不能为空！', 'text', 1000, 'bottom');
                    return false;
                }

                let post = {
                    email:        this.email,
                    email_vcode:  this.vcode_email,
                    mobile_vcode: this.vcode,
                };

                api.postProfile(post).then(
                    res => {
                        _.toast(res.message, 'text', 1000, 'bottom');
                        this.show = false;
                        this.$emit('on-success', this.email)
                    },
                    p_obj => {

                    }
                )
            },
            checkSMS:       function () {
                let code = this.vcode;
                if (!code) {
                    _.toast('验证码不能为空！', 'text', 1000, 'bottom');
                    return false;
                }

                this.sending = true;
                api.postMobileCodeCheck(code).then(
                    res => {
                        this.checked = true;
                        this.sending = false;
                    },
                    p_obj => {
                        this.sending = false;
                    }
                );

                this.send = false;
            },
            sendSMS:        function () {
                api.getMobileCode().then(
                    res => {
                        _.toast(res.message, 'text', 1000, 'bottom');
                        this.send = true;
                        this.countDown();
                    },
                    p_obj => {

                    }
                )
            },
            sendEmail:      function () {
                if (!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.email))) {
                    _.toast('您输入的邮件地址不合法', 'text', 1000, 'bottom')
                    return false;
                }

                if (!this.captcha_code) {
                    _.toast("请输入图形验证码", 'text', 2000);
                    return false;
                }

                let params = {
                    email: this.email,
                    code:  this.captcha_code
                };
                this.sending = true;
                api.getEmailCode(params).then(
                    res => {
                        _.toast(res.message, 'text', 1000, 'bottom');
                        this.sending = false;
                    },
                    p_obj => {
                        this.captcha = '/verifycode/captcha?t=' + Math.random();
                        this.sending = false;
                    }
                )


            },
            countDown:      function () {
                let self = this;
                setTimeout(function () {
                    let end            = moment().add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                    self.countdown_tag = $('.countdown').countdown({
                        date:   end,
                        render: function (data) {
                            let sec = this.leadingZeros(data.sec, 2);
                            $(this.el).text((isNaN(sec) ? '00' : sec ));
                        },
                        onEnd:  function () {
                            self.send = false;
                        }
                    });
                }, 500)
            },
            clearCountdown: function () {
                if (this.countdown_tag) {
                    if ($(this.countdown_tag).data('countdown') && $(this.countdown_tag).data('countdown').hasOwnProperty('stop')) {
                        $(this.countdown_tag).data('countdown').stop()
                    }
                }
            }
        },
        destroyed:  function () {
            this.clearCountdown();
        }
    }
</script>

<style>

</style>