<template>
  <div>
    <x-header
            :right-options="{showMore: JSON.stringify(action_sheet_menus) !== '{}'}"
            @on-click-more="clickShowMenus"
            :left-options="{preventGoBack: true}"
            @on-click-back="goBack">{{task_channel_title}}任务</x-header>
    <actionsheet v-model="showMenus" :menus="action_sheet_menus" @on-click-menu="clickMenu" show-cancel></actionsheet>
  </div>
</template>
<script>
    import { XHeader, Actionsheet } from 'vux'
    import { mapGetters, mapActions } from 'vuex'

    import * as _ from '../utils/tool'
    import grids from '../utils/grids'

    const action_sheet_menus = {
        show_worker_sub_accounts_dialog: '重新选择任务账号',
        go_help: '查看任务帮助'
    };

    export default {
        components: {
            XHeader,
            Actionsheet,
        },
        data: function () {
            return {
                index:0,
                showMenus: false,
            }
        },
        computed: {
            ...mapGetters({
                getCurrentTaskChannelInfo: 'getCurrentTaskChannelInfo',
                getCurrentTaskChannelID: 'getCurrentTaskChannelID',
                getPreTaskChannelID: 'getPreTaskChannelID',
                getPreRouterPath: 'getPreRouterPath',
            }),
            task_channel_title: function () {
                let o = this.getCurrentTaskChannelInfo;
                return o ? o.title : '';
            },
            action_sheet_menus: function () {
                if(_.isShowWorkerSubAccountsDialog(this.getCurrentTaskChannelID)) {
                    return action_sheet_menus
                }

                let tmp = {};
                for(let n in action_sheet_menus) {
                    if(n !== 'show_worker_sub_accounts_dialog') {
                        tmp[n] = action_sheet_menus[n]
                    }
                }

                return tmp;
            }
        },
        methods: {
            ...mapActions({
                updateShowSubAccountDialog: 'updateShowSubAccountDialog',
                updateCurrentTaskChannelID: 'updateCurrentTaskChannelID',
            }),
            clickMenu: function (val) {
                switch (val) {
                    //显示选择任务账号dialog
                    case 'show_worker_sub_accounts_dialog':
                        this.updateShowSubAccountDialog(true);
                        break;
                    case 'go_help':
                        _.go('/help', this.$router);
                        break;
                }
            },
            clickShowMenus: function () {
                if(this.action_sheet_menus) {
                    this.showMenus = true
                }
            },
            goBack: function () {
                _.go('/', this.$router)
//                if(this.getPreRouterPath) {
//                    this.updateCurrentTaskChannelID(this.getPreTaskChannelID);
//                    _.go(this.getPreRouterPath, this.$router)
//                }
            }
        },
        created: function () {

        },
        mounted: function () {

        },
        destroyed: function () {

        }

    }
</script>
<style>

</style>