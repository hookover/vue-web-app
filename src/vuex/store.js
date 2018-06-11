import Vuex from 'vuex'
import api from '../utils/api'
import grids from '../utils/grids'


let store = new Vuex.Store({
    modules: {}
});

store.registerModule('com', {
    state:     {
        is_loading:              false,                 //显示加载中
        show_sub_account_dialog: false,                 //是否显示码农子账号选择dialog
        current_router_path:     '',                    //当前路由地址
        next_router_path:        '',                    //处理完操作要跳转的地址
        pre_router_path:         '',                    //上一个路由地址
        profile:                 {},                    //个人信息
        profile_is_loading:      false,                 //个人信息加载中？
        faq_category:            {},                    //帮助分类信息
        rolling_announcement:    [],                    //首页滚动公告
        article_category_list:   [],                    //新闻公告分类列表
        task_pending_count:      {},                    //首页任务的小红点标记有多少个待做任务数
        task_pending_count_is_loading: false,           //加载中？
        toast:                   {
            show:         false,
            time:         1500,
            type:         'success',
            is_show_mask: false,
            text:         '成功啦~',
            position:     'middle'
        },                                              //toast相关
        toast_dialog:            {
            show:      false,
            time:      0,
            content:   '',
            blur_hide: true,
        },
    },
    mutations: {
        updateIsLoading (state, payload) {
            state.is_loading = payload.is_loading
        },
        updateShowSubAccountDialog (state, payload) {
            state.show_sub_account_dialog = payload.show_sub_account_dialog
        },
        updateCurrentRouterPath (state, payload) {
            state.current_router_path = payload.current_router_path
        },
        updateNextRouterPath (state, payload) {
            state.next_router_path = payload.next_router_path
        },
        updatePreRouterPath (state, payload) {
            state.pre_router_path = payload.pre_router_path
        },
        updateToast (state, payload) {
            for (let n in payload) {
                state.toast[n] = payload[n]
            }
        },
        updateToastDialog (state, payload) {
            for (let n in payload) {
                state.toast_dialog[n] = payload[n]
            }
        },
        updateProfile(state, payload) {
            for (let n in payload) {
                state.profile[n] = payload[n]
            }
        },
        updateTaskPendingCount(state, payload) {
            for (let n in payload) {
                state.task_pending_count[n] = payload[n]
            }
        },
        updateFaqCategory(state, payload) {
            for (let n in payload) {
                state.faq_category[n] = payload[n]
            }
        },
        updateRollingAnnouncement(state, payload) {
            state.rolling_announcement = payload
        },
        updateArticleCategoryList(state, payload) {
            state.article_category_list = payload
        }
    },
    actions:   {
        updateIsLoading ({commit}, status) {
            commit('updateIsLoading', {is_loading: status})
        },
        updateShowSubAccountDialog ({commit}, status) {
            commit('updateShowSubAccountDialog', {show_sub_account_dialog: status})
        },
        updateCurrentRouterPath ({commit}, state) {
            commit('updateCurrentRouterPath', {current_router_path: state})
        },
        updateNextRouterPath ({commit}, state) {
            commit('updateNextRouterPath', {next_router_path: state})
        },
        updatePreRouterPath ({commit}, state) {
            commit('updatePreRouterPath', {pre_router_path: state})
        },
        updateToast ({commit}, state) {
            commit('updateToast', state)
        },
        updateToastDialog({commit}, state) {
            commit('updateToastDialog', state)
        },
        updateProfile({commit}, state) {
            commit('updateProfile', state)
        },
        updateFaqCategory({commit}, state) {
            commit('updateFaqCategory', state)
        },
        updateRollingAnnouncement({commit}, state) {
            commit('updateRollingAnnouncement', state)
        },
        updateArticleCategoryList({commit}, state) {
            commit('updateArticleCategoryList', state)
        },
        updateTaskPendingCount({commit}, state) {
            commit('updateTaskPendingCount', state)
        },
    },
    getters:   {
        getIsLoading:            state => state.is_loading,
        getShowSubAccountDialog: state => state.show_sub_account_dialog,
        getCurrentRouterPath:    state => state.current_router_path,
        getNextRouterPath:       state => state.next_router_path,
        getToast:                state => state.toast,
        getToastDialog:          state => state.toast_dialog,
        getPreRouterPath:        state => state.pre_router_path,
        getTaskPendingCount:     function (state) {
            if ($.isEmptyObject(state.task_pending_count) && !state.task_pending_count_is_loading) {
                state.task_pending_count_is_loading = true; //只加载一次
                api.getTaskPendingCount().then(
                    res => {
                        if (res.hasOwnProperty('data')) {
                            state.task_pending_count = res.data;
                            state.task_pending_count_is_loading = false;
                        }
                    },
                    p_obj => {

                    }
                );
            }
            return state.task_pending_count;
        },

        getProfile:             function (state) {
            if ($.isEmptyObject(state.profile) && !state.profile_is_loading) {
                state.profile_is_loading = true;
                api.getProfile().then(
                    res => {
                        state.profile            = res.data;
                        state.profile_is_loading = false;
                    },
                    p_obj => {
                        state.profile_is_loading = true;
                    }
                )
            }
            return state.profile;
        },
        getFaqCategory:         function (state) {
            if ($.isEmptyObject(state.faq_category)) {
                api.getFaqCategory().then(
                    res => {
                        if (res.data && res.data.length > 0) {
                            state.faq_category = res.data;
                        }
                    },
                    p_obj => {

                    }
                )
            }
            return state.faq_category
        },
        getRollingAnnouncement: function (state) {
            if (state.rolling_announcement.length === 0) {
                api.getAnnouncement().then(
                    res => {
                        if (res.data && res.data.length > 0) {
                            state.rolling_announcement = res.data;
                        }
                    },
                    p_obj => {

                    }
                )
            }
            return state.rolling_announcement
        },
        getArticleCategoryList: function (state) {
            if (state.article_category_list.length === 0) {
                api.getArticleCategoryList().then(
                    res => {
                        if (res.data && res.data.length > 0) {
                            state.article_category_list = res.data;
                        }
                    },
                    p_obj => {

                    }
                )
            }
            return state.article_category_list
        },
    }
});

store.registerModule('data', {
    state:     {
        worker_sub_accounts:     [],    //全部子账号信息
        current_sub_account_id:  0,     //当前子账号ID
        choose_task_channel_id:  0,     //选择的任务渠道ID，当用户点击任务时，触发它，经过操作后，再将它更新到current...
        current_task_channel_id: 0,     //当前任务渠道ID 1淘宝、2天猫、3京东 utils/router.js文件定义
        pre_task_channel_id:     0,     //上一个任务渠道ID
        next_task_channel_id:    0,     //下一个，即将要去的任务渠道ID
    },
    mutations: {
        updateWorkerSubAccounts (state, data) {
            //这里可以考虑使用jquery 深拷贝
            state.worker_sub_accounts = data
        },
        updateCurrentSubAccountID (state, status) {
            state.current_sub_account_id = status
        },
        updateCurrentTaskChannelID (state, payload) {
            state.pre_task_channel_id     = state.current_task_channel_id;
            state.current_task_channel_id = payload.current_task_channel_id;
        },
        updateChooseTaskChannelID (state, status) {
            state.choose_task_channel_id = status;
        },
    },
    actions:   {
        updateWorkerSubAccounts ({commit}, data) {
            commit('updateWorkerSubAccounts', data)
        },
        updateCurrentSubAccountID ({commit}, status) {
            commit('updateCurrentSubAccountID', status)
        },
        updateCurrentTaskChannelID ({commit}, state) {
            commit('updateCurrentTaskChannelID', {current_task_channel_id: state})
        },
        updateChooseTaskChannelID ({commit}, state) {
            commit('updateChooseTaskChannelID', state)
        },
    },
    getters:   {
        getWorkerSubAccounts:      state => state.worker_sub_accounts,
        getCurrentSubAccountID:    state => state.current_sub_account_id,
        getCurrentTaskChannelID:   function (state, store) {
            let channel_id = state.current_task_channel_id;
            if (!(channel_id > 0)) {
                for (let n in grids.all) {
                    if (store.getCurrentRouterPath === grids.all[n].url) {
                        return grids.all[n].id;
                    }
                }
            }
            return channel_id;
        },
        getPreTaskChannelID:       state => state.pre_task_channel_id,
        getChooseTaskChannelID:    state => state.choose_task_channel_id,
        getCurrentTaskChannelInfo: function (state, store) {
            let channel_id = store.getCurrentTaskChannelID;
            for (let n in grids.all) {
                //如果当前渠道ID与grids的渠道ID相同 || 当前路由与grids中的路由相同
                if (grids.all[n].id === channel_id) {
                    return grids.all[n]
                }
            }

            return false;
        },
        getCurrentSubAccountInfo:  function (state) {
            let currentAccounts = state.worker_sub_accounts[state.current_task_channel_id]
            for (let n in currentAccounts) {
                if (currentAccounts[n].id === state.current_sub_account_id) {
                    return currentAccounts[n]
                }
            }
            return false;
        },
    }
});

export default store
