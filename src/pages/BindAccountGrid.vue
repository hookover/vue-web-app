<template>
    <div class="profile">
        <AppHeader :go_back="true">绑定电商任务账号</AppHeader>

        <group title="任务账号绑定">
            <cell title="淘宝任务账号" is-link :link="{ path:'/bind-account-list', query: {type: 'taobao'}}">
                <img class="icon" slot="icon" src="/dist/images/icon-taobao.png"/>
                <span>{{accounts_number.tb}}个</span>
            </cell>
            <cell title="京东任务账号" is-link :link="{ path:'/bind-account-list', query: {type: 'jd'} }">
                <img class="icon" slot="icon" src="/dist/images/icon-jd.png"/>
                <span>{{accounts_number.jd}}个</span>
            </cell>
        </group>

        <div class="mt30"></div>
    </div>
</template>
<script>
    import { Group,Cell } from 'vux'
    import { mapGetters, mapActions } from 'vuex'
    import AppHeader from '../components/Header.vue'
    import api from '../utils/api'
    import * as _ from '../utils/tool'

    export default {
        components: {
            Group,
            Cell,
            AppHeader,
        },
        data: function () {
            return {

            }
        },
        computed: {
            ...mapGetters({
                worker_accounts: 'getWorkerSubAccounts',
            }),
            accounts_number: function () {
                return {
                    tb: this.worker_accounts.hasOwnProperty('1') ? this.worker_accounts['1'].length : 0,
                    jd: this.worker_accounts.hasOwnProperty('3') ? this.worker_accounts['3'].length : 0,
                }
            }
        },
        mounted: function () {
            this.tryGetWorkerAccounts();
        },
        methods: {
            ...mapActions({
                updateWorkerSubAccounts: 'updateWorkerSubAccounts',
            }),
            tryGetWorkerAccounts: function () {
                if($.isEmptyObject(this.worker_accounts)) {
                    api.getWorkerSubAccounts().then(
                        res=>{
                            if(!$.isEmptyObject(res.data)) {
                                this.updateWorkerSubAccounts(res.data);
                            }
                        },
                        p_obj=>{

                        }
                    );
                }
            },
        }
    }

</script>
<style>

</style>