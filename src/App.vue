<template>
  <div id="app">
    <router-view></router-view>
    <!--提示-->
    <AppToast></AppToast>
    <!--dialog提示-->
    <AppToastDialog></AppToastDialog>
    <!--加载-->
    <loading v-model="is_loading"></loading>
  </div>
</template>


<script>
    import { Loading } from 'vux'
    import { mapGetters, mapActions } from 'vuex'
    import AppToast from './components/Toast.vue'
    import AppToastDialog from './components/ToastDialog'
    import api from './utils/api';

    export default{
        data: function () {
            return {
                test: true
            }
        },
        components: {
            Loading,
            AppToast,
            AppToastDialog,
        },
        computed: {
            ...mapGetters({
                isLoading:  'getIsLoading',
            }),
            is_loading: {
                get() {
                    return this.isLoading
                },
                set(val) {
                    this.updateIsLoading(Boolean(val))
                }
            }
        },
        watch: {

        },
        methods: {
            ...mapActions({
                updateIsLoading: 'updateIsLoading'
            }),
        }
    }

</script>

<style lang="less">
  @import '~vux/src/styles/reset';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';
  @import '/dist/css/style.css';

  body {
    background-color: #fbf9fe;
    line-height: 1.2;
  }

  /*weui字体设置*/
  .weui-dialog__title {
    font-size: 15px!important;
  }
  .weui-dialog__ft {
    font-size: 15px !important;
  }
  .weui-actionsheet__cell {
    font-size: 15px !important;
  }
  .vux-actionsheet-menu-default{
    color: #333!important;
  }
</style>