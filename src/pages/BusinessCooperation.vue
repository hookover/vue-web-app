<template>
    <div>
        <AppHeader :go_back="true">商务合作</AppHeader>

        <!--联系方式-->
        <div class="businness_email">
            <dl class="businness_email_con">
                <dt>联系邮箱</dt>
                <dd>
                    <!--此处长按弹出复制提示弹出框-->
                    <span class="but_yellow_2"><a class="btn-yellow copy-data" data-clipboard-target="#copy-data">复制: <span id="copy-data">{{contact_info.business_email}}</span></a></span>
                </dd>
            </dl>
            <dl class="businness_email_qq" >
                <dt>联系QQ</dt>
                <dd>
                    <!--点击直接到QQ-->
                    <a class="but_yellow_2" :href="'mqqwpa://im/chat?chat_type=wpa&uin=' + site_config_qq + '&version=1&src_type=web&web_src=' + contact_info.rollback_url"><i></i>合作QQ:{{site_config_qq}}</a>
                </dd>
            </dl>
            <P>此邮箱、QQ仅处理商务合作，其他问题请前往帮助中心或关注微信公众号"任务宽"</P>
        </div>

    </div>
</template>
<script>
    import AppHeader from '../components/Header.vue'
    import common from '../common/common'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        components: {
            AppHeader,
        },
        data: function () {
            return {
                contact_info: common.SERVICE_INFO,
                site_config_qq: '',
            }
        },
        mounted: function () {
            self.clipboard = new Clipboard('.copy-data');
            self.clipboard.on('success', function (e) {
                _.toast('内容已经拷贝', 'text',1000);
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
            this.getSiteConfigQqInfo();
        },
        methods: {
            getSiteConfigQqInfo: function () {
                api.getSiteConfigQq().then(
                    res=>{
                        if(res.result) {
                            this.site_config_qq = res.message.qq[0];
                        }else{
                            this.site_config_qq = this.contact_info.business_qq;
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
    /*商务合作*/
    .user_business_logo{ background:url(/dist/images/user_business_1.png) no-repeat; background-size:34px 34px; height:34px; width:34px; margin:0 auto; margin-top:80px; margin-bottom:60px; display:none;}
    .businness_email{  margin-top:20px; padding:15px; }
    .businness_email dl{ padding:20px 0; background:#fff; margin-bottom:30px;box-shadow: 0px 5px 0px #ececec;border-radius:5px;}
    .businness_email dt{ text-align:center; color:#aaaaaa; font-size:14px; line-height:30px; background:url(/dist/images/user_business_1.png) no-repeat center top; background-size:50px 50px; padding-top:60px;}
    .businness_email dd{}
    .businness_email dd a.but_yellow_2{ margin:10px 0px; height:40px; color:#ababab; background:#fff; text-align:center; line-height:40px; border-radius:5px; border:#dedede solid 1px;}
    .businness_email p{ font-size:10px; line-height:20px; color:#c4c4c4; margin-top:35px; text-align:center; padding-top:15px; border-top:#eaeaea solid 1px;}
    a.but_yellow_2{ margin:10px 0px; height:40px; color:#fff; font-size:15px; background:#faa71b; display:block; text-align:center; line-height:40px; border-radius:5px;}
    .businness_email_con { background:#FFF;}
    .businness_email .businness_email_con dd a.but_yellow_2{ margin:10px auto; height:40px; color:#fff; background:#f9a528; text-align:center; line-height:40px; border-radius:5px; border:0; width:80%}
    .businness_email .businness_email_qq dd a.but_yellow_2{ margin:10px auto; height:40px; color:#fff; background:#469bff; text-align:center; line-height:40px; border-radius:5px; border:0; width:80%;}
    .businness_email_qq dt{background:url(/dist/images/ico_contact_qq.png) no-repeat center top; background-size:50px 50px;}
    .businness_email_qq dd span{ text-align:center; display:block; font-size:16px; color:#383838;}
</style>