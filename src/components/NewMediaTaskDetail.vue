<template>

    <div>
        <!--channel_id错误或没有任务时显示-->
        <group class="task-list" v-if="!checkNotEmptyObj(server_data)">
            <div class="nothing">
                <img src="/dist/images/task_pop_index_img.png">
                <p>{{error_message}}</p>
            </div>
        </group>

        <div class="task_info e-commerce-task-detail"
             v-if="checkNotEmptyObj(server_data) && server_data.hasOwnProperty('id')">
            <div class="task_info_top">
                <!--<div class="img-container">-->
                <!--<scroller lock-y :scrollbar-x=false>-->
                <!--<div class="image-box" :style="width">-->
                <!--<img :src="img" v-for="img in cover_images">-->
                <!--<img src="/dist/images/logo.png" v-if="cover_images.length === 0">-->
                <!--</div>-->
                <!--</scroller>-->
                <!--</div>-->
                <dl>
                    <dt>ID:{{server_data.id}}</dt>
                    <dd>{{server_data.platform_name}}{{server_data.source_type_name ? ' - ' + server_data.source_type_name : ''}}</dd>
                    <dd class="orange">
                        <template v-if="server_data.status === 2">
                            <i></i>剩余时间<em class="countdown">--</em>分
                        </template>
                        <template v-if="server_data.status !== 2">
                        <span class="badge"
                              :class="{'bg-important': server_data.status === 4, 'bg-info': server_data.status !== 4}">
                            {{server_data.status_name}}
                        </span>
                            <span v-if="server_data.status === 4" @click="goBottom">
                            去提交申诉
                        </span>
                        </template>
                    </dd>
                </dl>
                <label><em>+</em>{{Number(server_data.total_price).toFixed(3)}}元</label>
            </div>
            <div class="clear"></div>


            <div class="task_info_introduce" v-if="checkNotEmptyObj(server_data.content)">
                <h5>
                    任务介绍
                    <a class="color-blue normal"
                       @click="$router.push('/help-detail/wechat-toupiao-help')">
                        <i></i> 帮助介绍
                    </a>
                </h5>
                <!--<h5>任务操作项<a href="javascript:void(0)" @click="howToFilter" style="color: #57a7f3"><i></i>操作说明</a></h5>-->
                <div>
                    <template v-for="item in server_data.content">

                        <div class="weui-form-preview__bd" v-if="item.input_type === 'text' || item.input_type === 'textarea'">
                            <div class="weui-form-preview__item" v-if="item.user_data">
                                <label class="weui-form-preview__label">
                                    {{item.name}}
                                </label>
                                <span class="weui-form-preview__value text-left">
                                        {{item.user_data}}
                                    </span>
                            </div>
                        </div>

                        <div class="weui-form-preview__bd" v-if="item.input_type === 'url'">
                            <div class="weui-form-preview__item" v-if="item.user_data">
                                <label class="weui-form-preview__label">
                                    {{item.name}}
                                </label>
                                <span class="weui-form-preview__value text-left">
                                    <a class="color-blue" :href="item.user_data" target="_blank">{{item.user_data}}</a>
                                </span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <template v-for="item in server_data.content">
                <div class="task_info_introduce" v-if="item.input_type === 'image' && item.user_data && item.user_data.images && item.user_data.images.length > 0">
                    <h5>{{item.name}}共{{item.user_data.images.length}}张
                        <a class="color-blue normal"
                           @click="$router.push('/help-detail/wechat-toupiao-screenshot-example')">
                            <i></i> 截图示例
                        </a>
                    </h5>
                    <template>
                        <swiper :options="swiperOption">
                            <swiper-slide v-for="(item, index) in (item.user_data.images)">
                                <img :src="item">
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </template>
                </div>
            </template>


            <template v-if="this.server_data.status === 4 || this.server_data.status === 2">
                <div style="height: 10px;"></div>
                <div class="footer-btns">
                    <template v-if="this.server_data.status === 4">
                        <a class="btn btn-warning" @click="appeals">
                            <i class="fa fa-shield"></i>
                            <span>我是正确完成的，提起申诉</span>
                        </a>
                    </template>

                    <template v-if="this.server_data.status === 2">
                        <a class="btn btn-danger" @click="cancel">
                            <span>放弃任务</span>
                        </a>
                    </template>

                    <template v-if="this.server_data.status === 2">
                        <a class="btn btn-info" @click="submit">
                            <span>提交审核</span>
                        </a>
                    </template>
                </div>
            </template>


            <CancelTaskDialog ref="cancel_task_dialog" :options="options" submit_function="cancel_function"></CancelTaskDialog>
            <AppealsTaskDialog ref="appeals_dialog"  submit_function="appeals_function"></AppealsTaskDialog>
        </div>
    </div>

</template>

<script>
    require('swiper/dist/css/swiper.css');

    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {Scroller, FormPreview, Badge} from 'vux'
    import * as _ from '../utils/tool'
    import api from '../utils/api'
    import CancelTaskDialog from '../components/CancelTaskDialog.vue'
    import AppealsTaskDialog from '../components/AppealsTaskDialog.vue'

    export default {
        components: {
            Scroller,
//            Swiper,
//            SwiperItem,
            CancelTaskDialog,
            Badge,
            AppealsTaskDialog,
            swiper,
            swiperSlide,
        },
        data:       function () {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    spaceBetween: 30,
                    autoHeight: true, //高度随内容变化
                },
                server_data:          {},
                countdown_tag:        false,
                countdown_submit_tag: false,
                can_submit:           false,
                can_submit_minute:    3,   //接任务后几分钟可提交任务
                error_message:        '任务加载中，请稍后……',
                last_send_time_out_seconds: 0,
                can_submit_time_seconds: 0,
                options: [
                    '找到任务入口',
                    '上传图片失败 ',
                    '不想做了 ',
                ],
                imgList: [
                    {
                        url: 'javascript:',
                        img: 'https://static.vux.li/demo/1.jpg',
                        title: '送你一朵fua'
                    },
                    {
                        url: 'javascript:',
                        img: 'https://static.vux.li/demo/2.jpg',
                        title: '送你一辆车'
                    },
                    {
                        url: 'javascript:',
                        img: 'https://static.vux.li/demo/3.jpg',
                        title: '送你一次旅行'
                    }
                ],


            }
        },
        props:      {
            task_id: {
                type:     Number,
                required: true,
            },
        },
        computed:   {
            cover_images:  function () {
                let tmp = [];
                if (this.server_data.hasOwnProperty('product') && this.server_data.product.hasOwnProperty('cover_images') && this.server_data.product.cover_images.length > 0) {
                    for (let n in this.server_data.product.cover_images) {
                        tmp.push({
                            src: this.server_data.product.cover_images[n]
                        })
                    }
                }
                return tmp
            },
            width:         function () {
                let w = 60;
                if (this.cover_images.length > 0) {
                    w = this.cover_images.length * 60;
                }
                return 'width:' + w + 'px';
            },
            product_width: function () {
                let n = this.cover_images.length;
                return 'width:' + n * 55 + '%';
            },
        },
        created:    function () {
            this.loadData();
        },
        watch:      {

        },
        destroyed:  function () {
            if (this.countdown_tag) {
                clearInterval(this.countdown_tag);
                this.countdown_tag = false;
            }
            if (this.countdown_submit_tag) {
                clearInterval(this.countdown_submit_tag);
                this.countdown_submit_tag = false;
            }

            if (this.clipboard) {
                this.clipboard.destroy();
            }
        },
        methods:    {
            convertSecoundToMinuteSeconds: function(seconds){
                let minute = Math.floor(seconds / 60)
                let second = seconds % 60;

                if(minute < 10 && minute > 0) {
                    minute = '0' + minute
                }
                if(second < 10 && second > 0) {
                    second = '0' + second
                }

                if(minute === 0) {
                    minute = '00'
                }
                if(second === 0) {
                    second = '00'
                }
                return minute + ':' + second
            },
            listToSwiperList: function (data) {
                return data.map((one, index) => ({
                    url: 'javascript:',
                    img: one
                }))
            },
            checkContentHasImageElement: function () {
                if(this.server_data.hasOwnProperty('content')) {
                    for(let n in this.server_data.content) {
                        if(this.server_data.content[n].input_type === 'image' && this.checkNotEmptyObj(this.server_data.content[n].user_data)) {
                            return true;
                        }
                    }
                }
                return false;
            },
            loadData:         function () {
                api.getTaskNewMediaDetail(this.task_id).then(
                    res => {
                        let tmp = res.data.source_type_input;
                        let content = res.data.content;
                        for(let n in tmp) {
                            for(let k in content) {
                                if(k === tmp[n].key) {
                                    tmp[n]['user_data'] = content[k]
                                }
                            }
                        }
                        res.data['content'] = tmp;
                        this.$set(this, 'server_data', res.data);
                        this.initBase()

                    },
                    p_obj => {
                        this.error_message = p_obj.hasOwnProperty('data') && p_obj.data.hasOwnProperty('message') ? p_obj.data.message : '哦嚯~网络错误'
                    }
                );
            },
            initBase:         function () {
                let self = this;
                //超时倒计时
                self.countdown_tag = setInterval(function () {
                    let begin = moment(self.server_data.timeout_at);
                    let end = moment();
                    let diff_seconds = begin.diff(end, 'seconds');

                    self.last_send_time_out_seconds = diff_seconds;
                    if(diff_seconds == 0) {
                        clearInterval(self.countdown_tag)
                        self.countdown_tag = false;
                    }
                    let txt = self.convertSecoundToMinuteSeconds(diff_seconds);
                    $('.countdown').html(txt);
                }, 1000);

                //提交倒按钮计时
                self.countdown_submit_tag = setInterval(function () {
                    let begin = moment(self.server_data.seize_at).add(self.can_submit_minute, 'minutes');
                    let end = moment();
                    let diff_seconds = begin.diff(end, 'seconds');

                    self.can_submit_time_seconds = diff_seconds;
                    if(diff_seconds == 0) {
                        clearInterval(self.countdown_submit_tag)
                        self.countdown_submit_tag = false;
                    }
                    let txt = self.convertSecoundToMinuteSeconds(diff_seconds);
                    $('.countdown-submit').html(txt);
                }, 1000);
            },
            checkNotEmptyObj: function (obj) {
                return !$.isEmptyObject(obj)
            },
            trim:             function (val) {
                return $.trim(val);
            },
            submit:           function () {
                if (this.server_data.id) {
                    this.$router.push({name: 'submit_review', params: {id: this.server_data.id, channel_id: 5}});
                } else {
                    _.toast('任务编号不存在', 'text', 1000000);
                    _.go('/', this.$router);
                }
            },
            cancel:           function () {
                this.$refs.cancel_task_dialog.show = true;
            },
            cancel_function: function (cancel_reason) {
                api.postTaskNewMediaCancel(this.server_data.id, cancel_reason).then(
                    res=>{
                        _.toastDialog(res.message, 2000,true);
                        this.show = false;
                        _.go('/', this.$router)
                    },
                    p_obj=>{
                        _.toast(p_obj.data.hasOwnProperty('message') ? p_obj.data.message : '网络错误，请稍后再试或联系客服')
                        this.show = false;
                    }
                )
            },
            appeals:          function () {
                this.$refs.appeals_dialog.show = true;
            },
            appeals_function: function (cancel_reason) {
                api.postNewMediaTaskApply(this.server_data.id, cancel_reason).then(
                    res=>{
                        _.toast(res.message, 2000,true)
                        this.show = false;
                        _.go('/', this.$router)
                    },
                    p_obj=>{
                        this.show = false;
                    }
                )
            },
            goBottom:         function () {
                window.scrollTo(0, document.body.scrollHeight)
            }
        },

    }
</script>
<style>
    .product-images img {
        max-width: 49%;
        width: auto;
        max-height: 100px;
        float: left;
        display: inline-block;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        margin-right: 2%;
    }

    .product-images img:last-child {
        margin-right: 0;
    }

    .e-commerce-task-detail .weui-form-preview__bd {
        padding: 3px;
    }

    .e-commerce-task-detail .task_info_top dl {
        width: 60%;
    }

    .task_info_btn a {
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 10px;
    }

    .banner-detail {
        height: 80px;
        line-height: 80px;
        font-size: 15px;
        text-align: center;
        background: #ea6969;
        color: #fff;
        margin-top: 10px;
    }

    .footer-btns {
        background-color: #fff;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e5e5e5;
        text-align: center;
        padding: 5px;
    }
</style>