import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFoundPage from '../pages/NotFoundPage.vue'

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

import TaskECommerce from '../pages/TaskECommerce.vue'
import TaskDetail from '../pages/TaskDetail.vue'
import TaskSubmitReview from '../pages/TaskSubmitReview.vue'
import TaskNote from '../pages/TaskNote.vue'

import TaskApp from '../pages/TaskApp.vue'

import TaskMedia from '../pages/TaskMedia.vue'


import Help from '../pages/Help.vue'
import HelpList from '../pages/HelpList.vue'
import HelpDetail from '../pages/HelpDetail.vue'
import RecommendFriend from '../pages/RecommendFriend.vue'
import Qrcode from '../pages/Qrcode.vue'
import ShareRegister from '../pages/ShareRegister.vue'

import User from '../pages/User.vue'
import UserProfile from '../pages/Profile.vue'

import BindAccountList from '../pages/BindAccountList.vue'
import BindAccount from '../pages/BindAccount.vue'
import BindAccountGrid from '../pages/BindAccountGrid.vue'

import IncomeList from '../pages/IncomeList.vue'
import Enchashment from '../pages/Enchashment.vue'
import EnchashmentList from '../pages/EnchashmentList.vue'
import BindWechat from '../pages/BindWechat.vue'

import BusinessCooperation from '../pages/BusinessCooperation.vue'
import Situation from '../pages/Situation.vue'

import ArticleDetail from '../pages/ArticleDetail.vue'
import RetrievePassword from '../pages/RetrievePassword.vue'

import AutoMoneyEmail from '../pages/AutoMoneyEmail.vue'


//帮助
import HowToFilterByKeyword from '../pages/helps/HowToFilterByKeyword.vue'
import HowToFilterByToken from '../pages/helps/HowToFilterByToken.vue'
import ScreenshotDemo from '../pages/helps/ScreenshotDemo.vue'
import HowToGetProductURL from '../pages/helps/HowToGetProductURL.vue'
import DistinguishZhiTongCar from '../pages/helps/DistinguishZhiTongCar.vue'
import HowtoBindECAccount from '../pages/helps/HowtoBindECAccount.vue'
import HowtoBindSMTPAccount from '../pages/helps/HowtoBindSMTPAccount.vue'

Vue.use(VueRouter);

const routes = [
    //帮助开始
    {
        path: '/helps/how-to-bind-ec-account',
        name: 'how-to-bind-ec-account',
        component: HowtoBindECAccount,
    },
    {
        path: '/helps/how-to-filter-product-by-keyword',
        name: 'how-to-filter-product-by-keyword',
        component: HowToFilterByKeyword,
    },
    {
        path: '/helps/how-to-filter-product-by-token',
        name: 'how-to-filter-product-by-token',
        component: HowToFilterByToken,
    },
    {
        path: '/helps/screenshot-demo',
        name: 'screenshot-demo',
        component: ScreenshotDemo,
    },
    {
        path: '/helps/how-to-get-product-url',
        name: 'how-to-get-product-url',
        component: HowToGetProductURL,
    },
    {
        path: '/helps/distinguish-zhitongcar',
        name: 'distinguish-zhitongcar',
        component: DistinguishZhiTongCar,
    },
    {
        path: '/helps/how-to-bind-smtp-account',
        name: 'how-to-bind-smtp-account',
        component:HowtoBindSMTPAccount,
    },
    //帮助结束
    {
        path: '*',
        name: 'not_found',
        component: NotFoundPage
    },
    {
        path: '/',
        name: 'index',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/e-commerce',
        name: 'e_commerce',
        component: TaskECommerce
    },
    {
        path: '/app',
        name: 'app_task',
        component: TaskApp
    },
    {
        path: '/media',
        name: 'media_task',
        component: TaskMedia
    },
    {
        path: '/recommend-friend',
        name: 'recommend-friend',
        component: RecommendFriend
    },
    {
        path: '/recommend-friend/qrcode',
        name: 'recommend-friend-qrcode',
        component: Qrcode
    },
    {
        //:channel_id 任务渠道ID,对应grids.js的ID，id:任务ID
        path: '/task-detail/:channel_id/:id',
        name: 'task_detail',
        component: TaskDetail
    },
    {
        path: '/submit-review/:channel_id/:id',
        name: 'submit_review',
        component: TaskSubmitReview
    },
    {
        path: '/task-note',
        name: 'task_note',
        component: TaskNote
    },
    {
        path: '/help',
        name: 'help',
        component: Help
    },
    {
        path: '/help-list/:category_id',
        name: 'help_list',
        component: HelpList
    },
    {
        path: '/help-detail/:id',
        name: 'help-detail',
        component: HelpDetail
    },
    {
        path: '/help-detail/:id',
        name: 'help-detail',
        component: HelpDetail,
    },
    {
        path: '/share',
        name: 'share',
        component: ShareRegister,
    },
    {
        path: '/bind-account',
        name: 'bind_account',
        component: BindAccount,
    },
    {
        path: '/bind-account-list',
        name: 'bind_account_list',
        component: BindAccountList,
    },
    {
        path: '/bind-account-grid',
        name: 'bind_account_grid',
        component: BindAccountGrid,
    },
    {
        path: '/user',
        name: 'user',
        component: User,
    },
    {
        path: '/user/profile',
        name: 'user_profile',
        component: UserProfile
    },
    {
        path: '/user/business-cooperation',
        name: 'business_cooperation',
        component: BusinessCooperation,
    },
    {
        path: '/user/income-list',
        name: 'user_income_list',
        component: IncomeList,
    },
    {
        path: '/enchashment',
        name: 'enchashment',
        component: Enchashment,
    },
    {
        path: '/user/enchashment-list',
        name: 'user_enchashment_list',
        component: EnchashmentList,
    },
    {
        path: '/bind-wechat',
        name: 'bind_wechat',
        component: BindWechat,
    },
    {
        path: '/situation',
        name: 'situation',
        component: Situation,
    },
    {
        path: '/article-detail/:id',
        name: 'article-detail',
        component: ArticleDetail,
    },
    {
        path: '/retrieve-password',
        name: 'retrieve-password',
        component: RetrievePassword,
    },
    {
        path: '/auto-money',
        name: 'auto-money',
        component: AutoMoneyEmail,
    }
];

const router = new VueRouter({
    routes
});

export default router