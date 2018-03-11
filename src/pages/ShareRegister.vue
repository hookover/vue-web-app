<template>
    <div class="pagewidth regist_box">
        <span class="regist_logo"></span>
        <router-link class="regist_tip_what" :to="{ path: '/login' }">
            老用户登录
        </router-link>
        <img class="regist_banner_pic" src="/dist/images/regist_banner.png">
        <div class="regist_inputarea">
            <ul class="shuru_regist">
                <span class="regist_flag_ico"></span>
                <li>
                    <input class="shuru_rigist_name" v-model="mobile" placeholder="请输入您的手机号">
                </li>
                <li>
                    <input class="shuru_rigist_yzm" v-model="verifycode" placeholder="请输图片验证码">
                    <!-----获取验证码的这个btn，等待时间再一次发送验证码的时候还额外有个class是btn_dxyz_waiting,里面文字变成"60秒后重新获取"--->
                    <img class="verifycode pull-right" :src="src" @click="src = '/verifycode/captcha?t=' + Math.random()">
                </li>
                <li>
                    <input class="shuru_rigist_yzm" v-model="mobile_code" placeholder="请输手机收验证码">
                    <!-----获取验证码的这个btn，等待时间再一次发送验证码的时候还额外有个class是btn_dxyz_waiting,里面文字变成"60秒后重新获取"--->
                    <input type="button" class="shuru_rigist_yzm_btn" value="获取手机验证码" @click="getMobileCode">
                </li>
                <li>
                    <input class="shuru_rigist_name" v-model="password" type="text" placeholder="请设置一个登录密码">
                </li>
                <li v-if="show_invitation_code">
                    <input class="shuru_rigist_name" v-model="invitation_code" type="text" placeholder="若有邀请码，请填写">
                </li>
                <input type="button" value="马上领取1元" class="btn_full_regist" @click="register">
            </ul>
        </div>
        <p class="regist_reward_title"><span>看看大家的成绩</span></p>
        <div class="regist_user_reward">
            <!----这里会上下滚动--->
            <div class="marquee">
                <ul class="regist_user_list">
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/0.jpg">
                        <dl class="regist_user_info">
                            <dt><span>MM207</span><span>18秒前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>20.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/1.jpg">
                        <dl class="regist_user_info">
                            <dt><span>幸福在身边</span><span>50秒前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>10.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/2.jpg">
                        <dl class="regist_user_info">
                            <dt><span>A~唐僧洗头爱飘柔</span><span>1分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>200.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/3.jpg">
                        <dl class="regist_user_info">
                            <dt><span>悟道</span><span>1分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>20.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/4.jpg">
                        <dl class="regist_user_info">
                            <dt><span>小可爱</span><span>1分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>1000.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/5.jpg">
                        <dl class="regist_user_info">
                            <dt><span>随风</span><span>2分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>50.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/6.jpg">
                        <dl class="regist_user_info">
                            <dt><span>天微凉。。。。。</span><span>2分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>50.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/7.jpg">
                        <dl class="regist_user_info">
                            <dt><span>sweetaste</span><span>2分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>100.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/8.jpg">
                        <dl class="regist_user_info">
                            <dt><span>风铃</span><span>2分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>50.00</span>元</p>
                        <div class="clear"></div>
                    </li>
                    <li class="regist_user_item">
                        <img class="regist_user_photo" src="/dist/images/avatar/9.jpg">
                        <dl class="regist_user_info">
                            <dt><span>雾（大时代防臭袜，抗菌毛巾直销）</span><span>2分钟前</span></dt>
                            <dd>通过微信提现了</dd>
                        </dl>
                        <p class="regist_user_getmoney"><span>500.00</span>元</p>
                        <div class="clear"></div>
                    </li>

                </ul>
            </div>
        </div>
        <div class="regist_copyright">
            <p>本活动最终解释权归任务宽所有</p>
        </div>
    </div>
</template>
<script>
    import * as _ from '../utils/tool'
    import api from '../utils/api'
    export default {
        data: function () {
            return {
                src: '/verifycode/captcha?t=' + Math.random(),
                mobile: '',
                verifycode: '',
                mobile_code:'',
                password: '',
                invitation_code: '',
                show_invitation_code: true,
            }
        },

        mounted: function () {
            _.textScroll('.marquee','-50px', 1300,1500);

            let invitation_code = this.$route.query.code;
            if(invitation_code) {
                this.invitation_code = invitation_code;
                this.show_invitation_code = false;
            }
        },
        methods: {
            getMobileCode: function () {
                if(this.mobile ==='' || /^1[3-9]\d{9}$/.test(this.mobile) === false)
                {
                    _.toast("请输入正确手机号码!", 'text', 2000);
                    return false;
                }

                if(!this.verifycode) {
                    _.toast("请输入图形验证码", 'text', 2000);
                    return false;
                }

                api.getMobileCode({code: this.verifycode, phone: this.mobile}).then(
                    res=>{
                        _.toastDialog(res.message ? res.message : '手机验证码已发送，请查看您的手机',2000, true)
                    },
                    p_obj=>{
                        this.src = '/verifycode/captcha?t=' + Math.random()
                    }
                )
            },
            register: function () {
                if(this.mobile ==='' || /^1[3-9]\d{9}$/.test(this.mobile)===false)
                {
                    _.toast("请输入正确手机号码!", 'text', 2000);
                    return false;
                }
                if(!this.verifycode) {
                    _.toast("请输入图形验证码", 'text', 2000);
                    return false;
                }
                if(!this.mobile_code) {
                    _.toast("请输入手机收到的验证码", 'text', 2000);
                    return false;
                }
                if(!this.password) {
                    _.toast("请为您的账号设置一个密码", 'text', 2000);
                    return false;
                }

                let params = {
                    phone:this.mobile,
                    captcha_verifycode:this.verifycode,
                    cellphone_verifycode:this.mobile_code,
                    password:this.password,
                    promotion_code: this.invitation_code,
                };

                api.postRegister(params).then(
                    res => {
                        _.toastDialog(res.message ? res.message : '恭喜，注册成功！',2000, true)
                        _.go('/', this.$router)
                    },
                    p_obj => {

                    }
                );
            }
        }
    }
</script>
<style>
    .regist_box .verifycode {
        width: 40%;
        height:40px;
        border-radius: 5px;
    }
    .regist_box .marquee {
        overflow:hidden;
        height:350px;
    }
    /*注册页面*/
    .regist_box{ position:relative; background-color:#fb5847;padding-top:1px;}
    .regist_logo{ position:absolute; top:15px; left:15px; display:block; width:120px; height:35px; background:url(/dist/images/logo/logo-register.png) 0 0 no-repeat; background-size:120px 35px;}
    .regist_box a.regist_tip_what{ display:block;  padding:8px 15px 8px 15px; position:absolute; top:17px; right:0px; background-color:#e14f40; border-top-left-radius:8px; border-bottom-left-radius:8px; color:#fff;}
    .regist_box img.regist_banner_pic{ width:90%; margin:70px 5% 30px 5%;}

    .regist_box span.regist_flag_ico{ position:absolute; top:-39px; left:18px; display:block; width:70px; height:54px; background:url(/dist/images/register_flag.png) 0 0 no-repeat; background-size:70px 54px;}
    .regist_box .regist_inputarea{ background-color:#f04d3d; border-radius:8px; margin:0px 15px;}
    .regist_box ul.shuru_regist{ position:relative; padding:15px 20px;}
    .regist_box ul.shuru_regist li{ margin-bottom:10px;}
    .regist_box input.shuru_rigist_name,input.shuru_rigist_yzm{ background-color:#fff; border:none; width:100%; height:40px; line-height:40px; padding:0px 3%;outline:none; font-size:15px; color:#666; border-radius:5px;}
    .regist_box input.shuru_rigist_yzm{ width:50%;}

    .regist_box .shuru_rigist_yzm_btn{ border:#f98217 solid 2px; float:right; height:40px; border-radius:5px; background-color:#f98217; line-height:37px; padding:0px 3%;outline:none; width:40%; color:#fff;}
    .regist_box .shuru_rigist_yzm_btn.btn_dxyz_waiting{border:#f9a9a1 solid 2px; background-color:#f04d3d; color:#f9a9a1;}

    .regist_box .btn_full_regist{ width:100%; border:none; background-color:#ffe114; height:43px; line-height:39px; color:#f35343; border-bottom:#ffc22c solid 2px; border-radius:5px; font-size:18px; font-weight:bold;}

    .regist_box p.regist_reward_title{ position:relative; border-bottom:#fc796c solid 1px; margin:15px 15px; height:20px; line-height:20px;}
    .regist_box p.regist_reward_title span{ position:absolute; bottom:-10px; left:50%; color:#fff; font-size:15px; font-weight:bold; display:block; background-color:#fb5847; width:150px; text-align:center; margin-left:-75px;}

    .regist_box .regist_user_reward{ margin:15px;}
    .regist_box ul.regist_user_list{ height:400px; overflow:hidden;clear:both;}
    .regist_box li.regist_user_item{ padding:8px 0px;clear:both}
    .regist_box img.regist_user_photo{ float:left; width:38px; height:38px; border-radius:50%; border:#ea4534 solid 2px; margin-right:10px;}
    .regist_box dl.regist_user_info{ float:left; position:relative; color:#fff; margin-top:5px;}
    .regist_box dl.regist_user_info dt{ margin-bottom:3px; font-size:13px;}
    .regist_box dl.regist_user_info dt span{ margin-right:10px; max-width:90px; overflow:hidden; display:inline-block;white-space: nowrap}
    .regist_box dl.regist_user_info dd{ color:#fdb8b3;max-width:180px; overflow:hidden; display:inline-block;white-space: nowrap}
    .regist_box p.regist_user_getmoney{ float:right; color:#ffe114; height:42px; line-height:42px;}
    .regist_box p.regist_user_getmoney span{ font-size:18px; padding-right:4px;}

    .regist_box .regist_copyright{ background-color:#e94838; height:35px; line-height:35px; width:100%; text-align:center;}
    .regist_box .regist_copyright p{ color:#f8d2cf; }
</style>