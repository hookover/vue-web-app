<template>
    <div>
        <AppHeader :go_back="true">
            <!--{{server_data.hasOwnProperty('title') ? server_data.title : '文章内容详情'}}-->
            如何绑定SMTP账户？
        </AppHeader>
        <div id="main">
            <h3 class="m10 text-danger">看图操作~</h3>
            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">1.打开PC版 <a href="mail.qq.com" style="display:inline;">mail.qq.com</a> 网站</h4>
                <p>登陆QQ邮件管理后台</p>
            </div>

            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">
                    点击"设置"->"账户"进入账户管理页面
                </h4>
                <p><img src="/dist/images/help-faq/faq_bind_smtp_1.png"></p>
            </div>

            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">
                    拉到下面:POP3/IMAP/SMTP/EXchange...处
                </h4>
                <p>点击POP3/SMTP服务后面的"开启"按钮,若已开启,则先关闭,再开启</p>
                <p><img src="/dist/images/help-faq/faq_bind_smtp_2.png"></p>
            </div>


            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">若需验证密保,请根据自身情况进行验证</h4>
                <p><img src="/dist/images/help-faq/faq_bind_smtp_3.png"></p>
            </div>

            <div class="p10 m10 pull-left">
                <h4 class="text-primary mb10">最后将弹出来的密码复制出来</h4>
                <p><img src="/dist/images/help-faq/faq_bind_smtp_4.png"></p>
            </div>

        </div>
    </div>
</template>

<script>
    import AppHeader from '../../components/Header.vue';
    export default{
        components: {
            AppHeader,
        },
    }
</script>