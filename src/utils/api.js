import axios from 'axios'
import qs from 'qs'
import * as _ from '../utils/tool'
import router from '../router/router'

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.baseURL = '/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers['X-Requested-With'] = "XMLHttpRequest"; //这是一个ajax请求
axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');


//传参序列化
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);
    //if(config.method  === 'post'){
    //    config.data = qs.stringify(config.data);
    //}
    return config;
},(error) =>{
    _.toast("错误的传参", 'warn', 1500, 'bottom');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.data.hasOwnProperty('result')) {
        if(!res.data.result){
            if(res.data.hasOwnProperty('code') && res.data.code === 200002) {
                _.toast(res.data.message);
                _.go('/login', router);
                return;
            }
            _.toast(res.data.hasOwnProperty('message') ? res.data.message : '-101 网络错误，请稍后再试或联系客服', 'text', 1500, 'bottom');
            return Promise.reject(res);
        }
        return res;
    } else {
        _.toast(res.data.hasOwnProperty('message') ? res.data.message : '数据返回异常，请稍后再试或联系客服', 'text', 1500, 'middle');
    }
}, (error) => {
    _.toast("网络异常", 'warn', 1500, 'middle');
    return Promise.reject(error);
});

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
              .then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
              .catch((error) => {
            reject(error)
        })
    })
}
export function get(url, params) {
  //参数处理
    if(!params.hasOwnProperty('params')) {
        params = {params: params}
    }
    return new Promise((resolve, reject) => {
        axios.get(url, params)
              .then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
              .catch((error) => {
            reject(error)
        })
    })
}

export function stringify(params) {
    if(params && typeof params === 'object' && JSON.stringify(params) !== "{}") {
        let str = '';
        for(let n in params) {
            str += n +'=' + params[n] +'&'
        }

        return '?' + str.substring(0, str.lastIndexOf('&'));
    }
    return '';
}

export default {
    /**
     * register
     */
    postRegister(params) {
        return post('/register', params)
    },
    /**
     * login
     */
    login(username, password) {
        return post('/login', {login_name: username, login_password: password})
    },
    /**
     * 获取个人信息
     */
    getProfile() {
        return get('/worker/profile')
    },
    postProfile(parmas) {
        return post('/worker/profile', parmas)
    },
    /**
     * 获取码农子账号
     */
    getWorkerSubAccounts (params) {
        return get('/worker-account-ecommerce/all' + _.stringify(params))
    },
    /**
     * 删除子账号
     */
    getDeleteWorkerSubAccounts(id) {
        return get('/worker-account-ecommerce/delete/' + id);
    },
    /**
     * 更新子帐号级别
     */
    postEditWorkerSubAccount(params) {
        return post('/worker-account-ecommerce/update', params)
    },
    /**
     * 获取电商类任务列表
     */
    getECommerceTaskPlansList (parmas) {
        let page = isNaN(parmas.page) ? 1 : parmas.page;
        return post('/task-plan-ecommerce/list?page=' + page, parmas)
    },
    /**
     * 获取电商类预告任务
     */
    getECommerceTaskPlansPreviewList(parmas) {
        let page = isNaN(parmas.page) ? 1 : parmas.page;
        return post('/task-plan-ecommerce/preview-list?page=' + page, parmas)
    },
    /**
     * 领取电商任务
     */
    postECommerceTaskSeize(parmas) {
        return post('/task-plan-ecommerce/seize', parmas)
    },
    /**
     * 获取电商任务详情
     */
    getTaskECommerceDetail(id) {
        return get("/task/detail/" + id)
    },
    /**
     * 任务申诉
     */
    postTaskApply(id,reason) {
        return post('/task/appeal',{id: id, reason: reason})
    },

    /**
     * 获取新媒体类任务列表
     */
    getNewMediaTaskPlansList (parmas) {
        let page = isNaN(parmas.page) ? 1 : parmas.page;
        return post('/new-media-plan/list?page=' + page, parmas)
    },
    /**
     * 获取新媒体类预告任务
     */
    getNewMediaTaskPlansPreviewList(parmas) {
        let page = isNaN(parmas.page) ? 1 : parmas.page;
        return post('/new-media-plan/preview-list?page=' + page, parmas)
    },
    /**
     * 领取新媒体任务
     */
    postTaskNewMediaSeize(parmas) {
        return post('/new-media-plan/seize', parmas)
    },
    /**
     * 获取新媒体任务详情
     */
    getTaskNewMediaDetail(id) {
        return get("/new-media-task/detail/" + id)
    },
    /**
     * 取消新媒体任务
     * @param task_id
     * @param cancel_reason
     * @returns {*}
     */
    postTaskNewMediaCancel(task_id, cancel_reason) {
        let params = {
            id: task_id,
            reason: cancel_reason,
        };
        return post('/new-media-task/cancel', params)
    },

    postNewMediaTaskApply(task_id, reason) {
        return post('/new-media-task/appeal',{id: task_id, reason: reason})
    },
    /**
     * 提交审核新媒体任务
     * @param params
     * @returns {*}
     */
    postTaskNewMediaSubmit(params) {
        return post('/new-media-task/submit', params)
    },
    /**
     * 获取新媒体我的任务列表
     * status可选值，暂定：任务状态 0表示所有任务  1可抢单 2被抢单（进行中） 3提交待审核 4审核失败 5审核成功 7申诉中 8申诉失败 9申诉成功，多个状态之间用“,”分隔
     */
    getTaskNewMediaList(status,page,page_size) {
        let params = {
            status: status ? status : 0,
            page: !isNaN(page) ? page : 1,
            size: !isNaN(page_size) ? page_size : 10,
        };
        return get("/new-media-task/list?page=" + params.page, params)
    },
    /**
     * 获取各任务类型可做任务数量
     * @returns {*}
     */
    getTaskNewMediaPendingCount() {
        return get('/new-media-plan/count-by-platform')
    },

    /**
     * 获取收支明细
     * @param params
     * @returns {*}
     *
     * page 第page页
     * type
     * 1: 任务佣金
     * 2: 充值
     * 3: 收徒佣金
     * 4: 提现扣款
     * 5: 任务超时扣款
     * 6: 冻结
     * 7: 解除冻结
     */
    getWorkerBill(params) {
        return get('/worker-bill/all' + _.stringify(params))
    },
    /**
     * 获取用户提现记录
     * @param params
     * @returns {*}
     */
    getWithdrawal(params) {
        return get('/worker-withdrawal/all' + _.stringify(params))
    },
    /**
     * 提现接口，传入参数提现金额
     * @param amount
     * @returns {*}
     */
    postWorkerWithdrawal(amount) {
        return post('/worker-withdrawal/submit', {amount: parseFloat(amount)})
    },
    /**
     * 获取任务详情
     */
    getTaskDetail(id) {
        return get("/task/detail/" + id)
    },
    /**
     * 获取任务列表
     * status可选值，暂定：任务状态 0表示所有任务  1可抢单 2被抢单（进行中） 3提交待审核 4审核失败 5审核成功 7申诉中 8申诉失败 9申诉成功，多个状态之间用“,”分隔
     */
    getTaskList(status,page,page_size) {
        let params = {
            status: status ? status : 0,
            page: !isNaN(page) ? page : 1,
            size: !isNaN(page_size) ? page_size : 10,
        };
        return get("/task/list?page=" + params.page, params)
    },
    /**
     * 取消任务
     * @param task_id
     * @param cancel_reason
     * @returns {*}
     */
    postTaskCancel(task_id, cancel_reason) {
        let params = {
            id: task_id,
            reason: cancel_reason,
        }
        return post('/task/cancel', params)
    },
    /**
     * 提交任务
     * @param params
     * @returns {*}
     */
    postTaskSubmit(params) {
        return post('/task/submit', params)
    },
    /**
     * 获取手机验证码
     * parasm{
     *
     * }
     */
    getMobileCode(params) {
        return post('/verifycode/cellphone',params);
    },
    /**
     * 获取邮件验证码
     * @param params
     * @returns {*}
     */
    getEmailCode(params) {
        return post('/verifycode/email', params)
    },
    /**
     * 检查手机验证码是否正确
     * @param code
     * @returns {*}
     */
    postMobileCodeCheck(code) {
        return post('/verifycode/verify-cellphone-code', {'code': code})
    },
    /**
     * 提交任务子账号绑定信息
     * @param params
     * @returns {*}
     */
    postBindAccount(params) {
        return post('/worker-account-ecommerce/add', params)
    },
    /**
     * 获取各任务类型可做任务数量
     * @returns {*}
     */
    getTaskPendingCount() {
        return get('/task-plan-ecommerce/count-by-platform')
    },
    /**
     * 获取信息分类列表
     */
    getArticleCategoryList() {
        return get('/news-category/all')
    },
    /**
     * 获取新闻类型
     */
    getArticleList(category_id, page) {
        return get('/news/all/' + category_id + '?page=' + page)
    },
    /**
     * 站内通知
     */
    getStationLetter(page){
        return get('/site-mail/list?page=' + page)
    },
    /**
     * 滚动公告
     */
    getAnnouncement() {
        return get('/news/important')
    },
    /**
     * 获取新闻详情
     */
    getArticleDetail(id) {
        return get('/news/detail/' + id)
    },
    /**
     * 获取邀请好友数据
     * @returns {*}
     */
    getRecommendFriendInfo() {
        return get('/promotion/profile')
    },
    /**
     * 获取FAQ分类信息表
     */
    getFaqCategory() {
        return get('/faq-category/all')
    },
    /**
     * 获取FAQ详细信息
     */
    getFaq(category_id, page) {
        return get('/faq/all/' + category_id + '?page=' + parseInt(page))
    },
    /**
     * 获取帮助详情
     */
    getFaqDetail(id_or_slug) {
        return get('/faq-detail/' + id_or_slug)
    },
    /**
     * 检查商品连接
     */
    postCheckProductLink(params) {
        return post('/task/check-submit-link', params)
    },
    /**
     * 获取配置文件里的QQ
     */
    getSiteConfigQq() {
        return get('/help/site-config-qq')
    },
    /**
     * 退出登录
     */
    loginOut() {
        return get('/logout')
    },
    /**
     * 忘记密码找回
     */
    postForgetPassword(params) {
        return post('/forgot-password', params)
    },
    changePassword(params) {
        return post('/profile/change-password', params)
    },
    getAutoMailList(params) {
        return get('/auto-mail-smtp-account/list' + _.stringify(params))
    },
    postAutoMailSmtpAccount(params) {
        return post('/auto-mail-smtp-account/add', params);
    },
    postDeleteAutoMailSmtpAccount(params) {
        return post('/auto-mail-smtp-account/delete', params);
    }

}
