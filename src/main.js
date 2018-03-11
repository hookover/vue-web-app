//import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './vuex/store'
import  { ToastPlugin } from 'vux'
import router from './router/router'
import * as _ from './utils/tool'
//import $ from 'jquery'
//import './assets/js/jquery.blockUI.js'

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import  { AlertPlugin, ConfirmPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

//import './assets/js/share/share.js'

// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
});

Vue.use(ToastPlugin);
FastClick.attach(document.body)


router.beforeEach(function (to, from, next) {
    store.commit('updateIsLoading', { is_loading: true });
    if (/\/http/.test(to.path)) {
        _.go(to.path, router)
    } else {
        next()
    }
});

router.afterEach(function (to,from) {
    store.commit('updateIsLoading', { is_loading: false });
    //将上一个路由地址更新到Store
    store.commit('updatePreRouterPath', { pre_router_path: from.path });
    //将当前路由更新到Store
    store.commit('updateCurrentRouterPath', { current_router_path: to.path })
    //重置要跳转的地址
    store.commit('updateNextRouterPath', { next_router_path: false })

    //重置滚动条位置
    window.scrollTo(0,0)
});


/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box');
