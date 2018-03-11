<template>
    <XHeader :left-options="{preventGoBack: true}" @on-click-back="goBack">
        <slot></slot>
    </XHeader>
</template>
<script>
    import { XHeader} from 'vux'
    import { mapGetters } from 'vuex'
    import * as _ from '../utils/tool'

    export default {
        components: {
            XHeader,
        },
        props: {
            go_back: {
                default: false
            }
        },
        computed: {
            ...mapGetters({
                pre_router_path: 'getPreRouterPath'
            })
        },
        methods: {
            goBack: function () {
                if(this.go_back) {
                    if(this.pre_router_path && this.pre_router_path !== '/' && this.pre_router_path !== '/login' && this.pre_router_path !== '/share') {
                        window.history.back();
                        return;
                    }
                }
                _.go('/', this.$router)
            }
        }
    }
</script>