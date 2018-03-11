<template>
    <div class="note">
      <span class="speaker">
        <img src="../assets/images/speaker.png" alt="">
      </span>
        <marquee>
            <marquee-item v-for="(item, index) in note_list"  @click.native="onClick(item)">
                {{item.title}}
            </marquee-item>
        </marquee>
        <span class="rightArrow">
            <img src="../assets/images/noteRightIcon.png" alt="">
        </span>
    </div>
</template>


<script>
    import { Marquee, MarqueeItem } from 'vux'
    import { mapGetters } from 'vuex'
    import * as _ from '../utils/tool'
    export default {
        name: 'AppAnnouncement',
        components: {
            Marquee,
            MarqueeItem,
        },
        data: function () {
            return {

            }
        },
        computed: {
            ...mapGetters({
                note_list: 'getRollingAnnouncement'
            })

        },
        methods: {
            onClick: function (item) {
                if(item.id > 0) {
                    _.go('/article-detail/' + item.id, this.$router)
                }
            }
        }
    }
</script>

<style>
    .note {
        /*background: #3e94c9 none repeat scroll 0 0;*/
        background: #FF8800 none repeat scroll 0 0;
        height: 1.06667rem;
        line-height: 1.06667rem;
        position: relative;
        width: 100%;
        display: block;
    }
    .note img {
        max-width: 100%;
        height: auto;
        width: auto\9;
        width: 100%;
        display: block;
        -ms-interpolation-mode: bicubic;
    }
    .note .speaker {
        float: left;
        height: 100%;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        padding-top: 0.35rem;
        position: relative;
        width: 0.45rem;
    }
    .note .rightArrow {
        float: right;
        height: 100%;
        margin-right: 4%;
        padding-top: 0.35rem;
        position: relative;
        width: 0.266667rem;
    }
    .note .vux-marquee {
        height: 100%;
        color: #fff;
        float: left;
        font-size: 0.346667rem;
        left: 0;
        margin-left: 0.85rem;
        position: absolute;
        top: 0;
        width: 80%;
    }
</style>