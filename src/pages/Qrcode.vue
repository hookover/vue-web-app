<template>
    <div class="invitation_card_box">
        <AppHeader :go_back="true">扫码分享</AppHeader>

        <!--“扫码分享”面板-->
        <div class="invitation_card">
            <div class="invitation_card_top">
                <span>也可以让好友填写您的邀请码</span>
                <em>{{profile.promotion_code}}</em>
            </div>
            <!--这里是缺角的效果-->
            <div class="invitation_card_con">
                <em class="invitation_card_bg_left"></em>
                <span></span>
                <em class="invitation_card_bg_right"></em>
            </div>
            <div class="invitation_card_bottom">
                <!--长按二维码可保存，看看是否有默认的底部滑出保存取消的选择-->
                <a href="javascript:void(0)" v-if="profile.id">
                    <qrcode :value="share_url" :fg-color="fgColor"></qrcode>
                </a>
                <span>扫一扫，一起加入任务宽</span>
                <em>长按二维码可保存</em>
            </div>
        </div>
    </div>
</template>
<script>
    import { Qrcode } from 'vux'
    import AppHeader from '../components/Header.vue'
    import { mapGetters } from 'vuex'

    import * as _ from '../utils/tool'
    import common from '../common/common'

    export default {
        components: {
            Qrcode,
            AppHeader,
        },
        computed:{
            ...mapGetters({
                profile: 'getProfile'
            }),
            share_url: function () {
                return _.shareUrl((this.profile.hasOwnProperty('promotion_code') ? this.profile.promotion_code : 0))
            },
        },
        data () {
            return {
                fgColor: '#000',
            }
        }
    }
</script>
<style>
    /********邀请二维码********/
    .invitation_card{ margin:15px; color:#555; text-align:center;}
    .invitation_card_top{ background:#fff; border:1px #e7e7e7 solid; border-bottom:0;  height:auto; overflow: hidden; padding:25px 0 10px 0;border-top-left-radius:8px;border-top-right-radius:8px;}
    .invitation_card_top span{ font-size:15px; display:block;}
    .invitation_card_top em{ display:block; color:#f9a71a; font-size:30px; margin-top:5px;}
    .invitation_card_bottom{ margin:0 auto; background:#fff;border:1px #e7e7e7 solid; border-top:0; padding:20px 0 25px 0;border-bottom-left-radius:8px;border-bottom-right-radius: 8px;}
    .invitation_card_con{display:block; height:10px; background:#fff; position:relative;}
    .invitation_card_con span{background:url('/dist/images/invitation_card_dashed.png') repeat-x center center; width:100%; display:block;height:10px; line-height:10px;}
    .invitation_card_con em{ background:url('/dist/images/invitation_card_bg.png') no-repeat; width:6px; height:10px; background-size:12px 10px; position:absolute; }
    .invitation_card_con em.invitation_card_bg_left{ background-position:0 0; left:0; top:0;}
    .invitation_card_con em.invitation_card_bg_right{ background-position:-6px 0; right:0; top:0;}

    .invitation_card_bottom img{ width:50%; margin:0 auto; display:block;}
    .invitation_card_bottom span{ display:block; font-size:15px; margin-top:15px; }
    .invitation_card_bottom em{ display:block; font-size:12px; margin-top:5px; color:#888;}
</style>