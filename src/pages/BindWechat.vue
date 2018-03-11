<template>
    <div>
        <AppHeader :go_back="true">
            绑定公众号
        </AppHeader>

        <!--头部图片-->
        <div class="user_Bind_number_top"></div>

        <!--步骤描述：快速关注和快速绑定-->
        <div class="exchange_list">
            <div class="user_Bind_number_list">
                <dl>
                    <dt>快速关注</dt>
                    <dd>
                        <span>1</span>
                        <p>打开微信，点击【通讯录】-【添加朋友】-【公众号】- 查找 "任务宽" 并关注。
                            <!--点击查看图解，跳出弹出框-->
                            <a @click="show_info = true">查看图解</a>
                        </p>
                    </dd>
                </dl>
                <a class="btn-yellow m15 copy-data" data-clipboard-target="#copy-data">点击复制：<span id="copy-data">任务宽</span></a>

                <div class="clear text-center" style="color: #555">若点击复制失败，请长按手动复制</div>
            </div>
            <div class="user_Bind_number_list border_top">
                <dl>
                    <dt>快速绑定</dt>
                    <dd>
                        <span>2</span>
                        <p>
                            点击公众号底部【绑定账号】点击相应连接即可绑定。
                            <!--点击公众号底部【绑定账号】获取验证码，并把验证码输入下面输入框，点击绑定即可。-->
                        </p>
                    </dd>
                </dl>
                <!--<div class="input_common_box">-->
                    <!--<input name="请输入验证码" id="vercode" placeholder="请输入验证码" type="text" class="input_common">-->
                <!--</div>-->
                <!--<a class="btn-yellow m15" >绑定</a>-->
            </div>
        </div>

        <div class="remind_total remind_know remind_know_picture_two" v-if="show_info">
            <div class="remind_text">
                <ul>
                    <li><em class="user_bind_process01"></em><span>点击通讯录</span></li>
                    <li><em class="user_bind_process02"></em><span>点击右上角“添加朋友”</span></li>
                    <li><em class="user_bind_process03"></em><span>搜索”任务宽”并关注</span></li>
                </ul>
            </div>
            <div class="remind_foot">
                <!---我知道了按钮---->
                <input class="remind_btn" value="我知道了" @click="show_info = false">
            </div>
        </div>
        <div class="remind_total remind_bind_success" v-if="show_success">
            <!---关闭按钮---->
            <a class="pop_close" @click="show_success = false"></a>
            <img src="/dist/images/remind_bind_success.png" style="width: 80%;max-width: 300px;">
        </div>

        <div class="z_box" v-if="show_success || show_info"></div>
    </div>
</template>
<script>
    import { TransferDomDirective as TransferDom } from  'vux'
    import AppHeader from '../components/Header.vue'
    import * as _ from '../utils/tool'

    export default {
        directives: {
            TransferDom
        },
        components: {
            AppHeader,
        },
        data: function () {
            return {
                show_success: false,
                show_info: false,
            }
        },
        mounted: function () {
            if(this.$route.query.status === 'success') {
                this.show_success = true;
            }

            self.clipboard = new Clipboard('.copy-data');
            self.clipboard.on('success', function (e) {
                _.toast('内容已经拷贝');
                e.clearSelection();
            });
            self.clipboard.on('error', function (e) {
                let str = $('#copy-data').text();
                self.$vux.alert.show({
                    title: '请手动拷贝以下内容',
                    content: str,
                });
                e.clearSelection();
            });
        },
    }
</script>
<style>

    /*关注公众账号*/
    .user_Bind_number_top{height:100px;  background:url(/dist/images/user_Bind_number_top.png) no-repeat #faa71b  center; background-size:375px 100px; width:100%; }
    .user_Bind_number_list{ width:100%; border-bottom:#e2e2e2 solid 1px; margin-bottom:15px; background:#FFF; padding:20px 0;}
    .border_top{ border-top:#e2e2e2 solid 1px;}
    .user_Bind_number_list dl{ padding:0 15px;}
    .user_Bind_number_list dt{ font-size:17px; color:#faa71b; text-align:center; line-height:15px; margin-top:10px; background:url(/dist/images/user_title_style.png) no-repeat center; background-size:348px 15px;}
    .user_Bind_number_list dd{ margin:10px 0;}
    .user_Bind_number_list dd span{ float:left; height:18px; width:18px; background:#cbcbcb; border-radius:18px; color:#fff; text-align:center; line-height:18px; font-size:13px; display:block; margin-top:3px;}
    .user_Bind_number_list dd p{ margin-left:24px; line-height:24px; color:#666666; font-size:13px;}
    .user_Bind_number_list dd a{ margin-left:10px; font-size:10px; padding:1px 5px; border:#faa71b solid 1px; border-radius:5px; color:#faa71b; display:inline-block;}
    .input_common_box{ margin:20px 15px 0px 15px; border:#e2e2e2 solid 1px; border-radius:5px; height:40px}
    .input_common{ border:none; background:none; height:40px; line-height:40px; padding-left:10px; display:block; color:#aaaaaa; font-size:15px; outline:medium }

</style>