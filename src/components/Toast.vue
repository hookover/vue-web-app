<template>
    <div class="self-toast">
        <toast v-model="toast_show"
               :type="toast_type"
               :time="toast_time"
               :is-show-mask="toast_is_show_mask"
               :text="toast_text"
               :position="toast_position"
               :width="toast_width"
               @on-hide="onHide"
        >
        </toast>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { Toast } from 'vux'
    export default {
        components: {
            Toast
        },
        computed: {
            ...mapState({
                toast_show: state => state.com.toast.show,
                toast_type: state => state.com.toast.type,
                toast_time: state => state.com.toast.time,
                toast_is_show_mask: state => state.com.toast.is_show_mask,
                toast_text: state => state.com.toast.text,
                toast_position: state => state.com.toast.position,
            }),
            toast_width: function () {
                if(this.toast_type === 'text' && this.toast_text.length >= 15) {
                    return '80%'
                }
                if(this.toast_type === 'text' && this.toast_text.length >= 5) {
                    return '60%'
                }
                return false;
            }
        },
        methods: {
            ...mapActions({
                updateToast: 'updateToast'
            }),
            onHide: function () {
                this.updateToast({show: false})
            }
        }
    }
</script>
<style>
    .self-toast .weui-toast__content {
        font-size: 13px;
    }
    .self-toast .weui-toast {
        z-index: 10000;
    }
</style>