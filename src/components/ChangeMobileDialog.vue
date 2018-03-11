<template>
    <div v-transfer-dom>
        <x-dialog v-model="show" class="remind remind_total remind_know">
            <a class="pop_close" @click="show = false"></a>
            <div class="remind_head">
                <span>{{ !checked ? '向原手机号发送验证码' : '修改新手机号'}}</span>
            </div>
            <div class="remind_text">
                <div v-if="checked === false">
                    <input type="text" class="per60 form-control pull-left" placeholder="原手机验证码" v-model="vcode_old">
                    <a href="javascript:void(0)" class="btn btn-warning pull-right"  :class="{disabled: sending}" v-if="!send"
                       @click="sendSMS()">{{sending ? '发送中…': '发送短信'}}</a>
                    <a href="javascript:void(0)" class="btn btn-danger pull-right" v-if="send"><span class="countdown">60</span>秒</a>
                    <div class="clear"></div>
                </div>
                <div v-if="checked === true">
                    <div>
                        <input type="text" class="form-control" placeholder="请填写新的手机号码" v-model="mobile">
                    </div>
                    <div class="mt5">
                        <input type="text" class="form-control per50 pull-left" placeholder="图片验证码" v-model="captcha_code">
                        <img :src="captcha" class="verifycode pull-right" @click="captcha = '/verifycode/captcha?t=' + Math.random()"/>
                        <div class="clearfix"></div>
                    </div>
                    <div class="mt5">
                        <input type="text" class="form-control per60 pull-left" placeholder="验证码" v-model="vcode">
                        <a href="javascript:void(0)" class="btn btn-warning pull-right" :class="{disabled: sending}" v-if="!send"
                           @click="sendSMS(true)">{{sending ? '发送中…': '发送短信'}}</a>
                        <a href="javascript:void(0)" class="btn btn-danger pull-right" v-if="send"><span
                                class="countdown">60</span>秒</a>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="remind_foot">
                <span class="remind_btn" @click="checkSMS" v-if="checked === false">验证原手机验证码</span>
                <span class="remind_btn" @click="changeMobile" v-if="checked === true">提交修改</span>
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
                captcha: '/verifycode/captcha?t=' + Math.random(),
                show:         false,
                send:         false,
                checked:      false,
                mobile:       '',     //新手机号码
                vcode:        '',     //新手机验证码
                vcode_old:    '',     //旧手机验证码
                captcha_code: '',     //图片验证码
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
                this.send      = false;
                this.checked   = false;
                this.mobile    = '';
                this.vcode     = '';
                this.vcode_old = '';
            },
            changeMobile:   function () {
                if (!this.mobile || /^1[3-9]\d{9}$/.test(this.mobile) === false) {
                    _.toast("请输入正确手机号码!", 'text', 2000, 'bottom');
                    return false;
                }

                if (!this.vcode) {
                    _.toast('手机验证码不能为空！', 'text', 2000, 'bottom');
                    return false;
                }

                let post = {
                    phone:                this.mobile,
                    mobile_vcode_current: this.vcode_old,
                    mobile_vcode:         this.vcode,
                };
                this.sending = true;
                api.postProfile(post).then(
                    res => {
                        _.toast(res.message, 'text', 1000, 'bottom');
                        this.show = false;
                        this.$emit('on-success', this.mobile);
                        this.sending = false;
                    },
                    p_obj => {
                        this.sending = false;
                    }
                )

            },
            checkSMS:       function () {
                let code = this.vcode_old;
                if (!code) {
                    _.toast('验证码不能为空！', 'text', 2000, 'bottom');
                    return false;
                }
                api.postMobileCodeCheck(code).then(
                    res => {
                        this.checked = true;
                    },
                    p_obj => {
                        _.toast(p_obj.data.hasOwnProperty('message') ? p_obj.data.message : '网络错误，请稍后再试或联系客服')
                    }
                );

                this.send = false;
            },
            sendSMS:        function (is_mobile) {
                let params = {};
                if (is_mobile) {
                    if (!this.mobile || /^1[3-9]\d{9}$/.test(this.mobile) === false) {
                        _.toast("请输入正确手机号码!", 'text', 2000, 'bottom');
                        return false;
                    }

                    if (!this.captcha_code) {
                        _.toast("请输入图形验证码", 'text', 2000);
                        return false;
                    }
                    params = {
                        code:  this.captcha_code,
                        phone: this.mobile
                    };
                }
                this.sending = true;
                api.getMobileCode(params).then(
                    res => {
                        _.toast(res.message, 'text', 1000, 'bottom');
                        this.send = true;
                        this.countDown();
                        this.sending = false;
                    },
                    p_obj => {
                        this.captcha =  '/verifycode/captcha?t=' + Math.random();
                        this.sending = false;
                    }
                )
            },
            countDown:      function () {
                let self = this;
                setTimeout(function () {
                    let end            = moment().add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss');
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
    .remind .verifycode {
        width: 40%;
        height:40px;
        border-radius: 5px;
        display: inline-block;
    }
</style>