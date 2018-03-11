<template>
    <div class="toast-dialog">
        <x-dialog v-model="show" :hide-on-blur="blur_hide">
            <div class="content">
                {{content}}
            </div>
        </x-dialog>
    </div>
</template>
<script>
    import {XDialog} from 'vux'
    import {mapActions, mapGetters, mapState} from 'vuex'
    import store from '../vuex/store'
    export default {
        components: {
            XDialog,
        },
        data:       function () {
            return {
                timeout: false
            }
        },
        watch:      {
            show: function (val, old) {
                if (val === true && this.time > 0) {
                    this.closeSelf();
                }
            },
            time: function (val, old) {
                if(val > 0) {
                    this.closeSelf();
                }
            },
            content: function (val, old) {
                if(this.time > 0) {
                    this.closeSelf();
                }
            }
        },
        computed:   {
            ...mapState({
                blur_hide:  state => state.com.toast_dialog.blur_hide,
                time:       state => state.com.toast_dialog.time,
                content:    state => state.com.toast_dialog.content,
                toast_show: state => state.com.toast_dialog.show,
            }),
            show: {
                get: function () {
                    return this.toast_show
                },
                set: function (val) {
                    this.updateToastDialog({show: Boolean(val)})
                }
            },
        },
        methods:    {
            ...mapActions({
                updateToastDialog: 'updateToastDialog'
            }),
            closeSelf: function () {
                let self = this;
                clearTimeout(self.timeout);
                this.timeout = setTimeout(function () {
                    self.updateToastDialog({show: false});
                }, Number(self.time));
            }
        }
    }
</script>
<style>
    .toast-dialog .content {
        text-align: center;
        padding: 10px 5px;
        color: #555;

    }
</style>