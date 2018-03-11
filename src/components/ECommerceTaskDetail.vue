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
                    <dd>{{server_data.platform_name}} {{server_data.source_type_name}}</dd>
                    <dd class="orange">
                        <template v-if="server_data.status === 2">
                            <i></i>剩余时间<em class="countdown">--</em>分
                            <!--<countdown slot="value" v-model="last_submit_time" @on-finish="countdownFinish" v-show="show"></countdown>-->
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

            <div @click="$router.push('/helps/distinguish-zhitongcar')" class="task_info_introduce"
                 v-if="parseInt(server_data.source_type) === 107 || parseInt(server_data.source_type) === 207">
                <div class="banner-detail">
                    如何区别常规任务 & 直通车任务？
                </div>
            </div>


            <div class="task_info_introduce" v-if="checkNotEmptyObj(server_data.operations)">
                <h5>任务操作项<a href="javascript:void(0)" @click="howToFilter" style="color: #57a7f3"><i></i>操作说明</a></h5>
                <div class="task_info_introduce_con">
                    <p>
                        <template>
                            <div class="weui-form-preview__bd">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">1、基本操作</label>
                                    <span class="weui-form-preview__value">根据<span class="text-danger">查找条件</span>找到目标产品并浏览3分钟+</span>
                                </div>
                            </div>
                            <div class="weui-form-preview__bd"
                                 v-for="(operation, index, iteration) in server_data.operations">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">{{iteration + 2}}、{{operation.name}}</label>
                                    <span class="weui-form-preview__value">{{operation.description}}</span>
                                </div>
                            </div>
                        </template>
                    </p>
                </div>
            </div>

            <div class="task_info_introduce" v-if="checkNotEmptyObj(server_data.content)">
                <h5>查找条件<a href="javascript:void(0)" @click="$router.push('/helps/screenshot-demo')" style="color: #57a7f3"><i></i>淘宝任务全部截图示例</a></h5>
                <div class="task_info_introduce_con">
                    <p>
                        <!--关键词-->
                        <template
                                v-if="server_data.hasOwnProperty('content') && server_data.content.hasOwnProperty('keyword')">
                            <div class="weui-form-preview__bd">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">搜索关键词</label>
                                    <span class="weui-form-preview__value text-danger copy-data"
                                          data-clipboard-target="#copy-data">
                                    <span id="copy-data">{{server_data.content.keyword}}</span>
                                </span>
                                </div>
                            </div>
                            <template v-if="server_data.content.hasOwnProperty('keyword_extend')">
                                <div class="weui-form-preview__bd">
                                    <div class="weui-form-preview__item">
                                        <label class="weui-form-preview__label">关键词辅助筛选条件（更容易找到宝贝）:</label>
                                    </div>
                                </div>
                                <div class="weui-form-preview__bd"
                                     v-if="server_data.content.keyword_extend.distribution_zone">
                                    <div class="weui-form-preview__item">
                                        <label class="weui-form-preview__label">发货地</label>
                                        <span class="weui-form-preview__value">{{server_data.content.keyword_extend.distribution_zone}}</span>
                                    </div>
                                </div>
                                <div class="weui-form-preview__bd"
                                     v-if="server_data.content.keyword_extend.filters && server_data.content.keyword_extend.filters.length > 0">
                                    <div class="weui-form-preview__item">
                                        <label class="weui-form-preview__label">筛选</label>
                                        <span class="weui-form-preview__value">{{server_data.content.keyword_extend.filters.join("|")}}</span>
                                    </div>
                                </div>
                                <div class="weui-form-preview__bd" v-if="server_data.content.keyword_extend.position">
                                    <div class="weui-form-preview__item">
                                        <label class="weui-form-preview__label">宝贝大概位置</label>
                                        <span class="weui-form-preview__value">{{server_data.content.keyword_extend.position}}</span>
                                    </div>
                                </div>
                                <div class="weui-form-preview__bd"
                                     v-if="server_data.content.keyword_extend.price_range && (server_data.content.keyword_extend.price_range.max || server_data.content.keyword_extend.price_range.min)">
                                    <div class="weui-form-preview__item">
                                        <label class="weui-form-preview__label">价格区间</label>
                                        <span class="weui-form-preview__value">{{server_data.content.keyword_extend.price_range.min}} - {{server_data.content.keyword_extend.price_range.max}}</span>
                                    </div>
                                </div>
                                <div class="weui-form-preview__bd"
                                     v-if="server_data.content.keyword_extend.product_class">
                                    <div class="weui-form-preview__item">
                                        <label class="weui-form-preview__label">宝贝所属分类</label>
                                        <span class="weui-form-preview__value">{{server_data.content.keyword_extend.product_class}}</span>
                                    </div>
                                </div>
                                <div class="weui-form-preview__bd" v-if="server_data.content.keyword_extend.sort_by">
                                    <div class="weui-form-preview__item">
                                        <label class="weui-form-preview__label">排序方式</label>
                                        <span class="weui-form-preview__value">{{server_data.content.keyword_extend.sort_by}}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <template
                                v-if="server_data.hasOwnProperty('content') && server_data.content.hasOwnProperty('token')">
                            <div class="weui-form-preview__bd">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">使用淘口令</label>
                                    <span class="weui-form-preview__value text-danger copy-data"
                                          data-clipboard-target="#copy-data">
                                    <span id="copy-data">{{server_data.content.token}}</span>
                                </span>
                                </div>
                            </div>
                        </template>
                    </p>
                </div>
            </div>

            <div class="task_info_introduce">
                <h5>商品信息</h5>
                <div class="task_info_introduce_con">
                    <p>
                        <template>
                            <scroller lock-y :scrollbar-x=false v-if="cover_images.length > 0">
                                <div class="product-images" :style="product_width">
                                    <img class="previewer-demo-img" :src="img.src" v-for="(img, index) in cover_images">
                                </div>
                            </scroller>
                            <div class="weui-form-preview__bd" v-if="server_data.product.name">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">商品名称</label>
                                    <span class="weui-form-preview__value">{{server_data.product.name}}</span>
                                </div>
                            </div>
                            <div class="weui-form-preview__bd" v-if="server_data.product.price.pc">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">电脑端价格</label>
                                    <span class="weui-form-preview__value">{{formatYen(server_data.product.price.pc) + '元'}}</span>
                                </div>
                            </div>
                            <div class="weui-form-preview__bd" v-if="server_data.product.price.mobile">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">手机APP价格</label>
                                    <span class="weui-form-preview__value">{{formatYen(server_data.product.price.mobile) + '元'}}</span>
                                </div>
                            </div>
                            <div class="weui-form-preview__bd" v-if="server_data.product.store_name">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">店铺名称</label>
                                    <span class="weui-form-preview__value color-blue">{{server_data.product.store_name}}</span>
                                </div>
                            </div>
                            <div class="weui-form-preview__bd" v-if="server_data.product.dispenser_name">
                                <div class="weui-form-preview__item">
                                    <label class="weui-form-preview__label">掌柜名称</label>
                                    <span class="weui-form-preview__value color-blue">{{server_data.product.dispenser_name}}</span>
                                </div>
                            </div>
                        </template>
                    </p>
                </div>
            </div>

            <div class="task_info_introduce">
                <h5>注意事项</h5>
                <div class="task_info_introduce_con">
                    <p>
                        <template>
                            1、请使用{{server_data.platform_name ? server_data.platform_name : '操作'}}帐号 <span
                                class="text-blue s18">{{server_data.account_name}}</span> 完成任务
                            <br>
                            2、请认真完成每一个操作项并按需截图
                            <br>
                            3、不按要求完成任务将导致无法得到对应的奖励
                            <br>
                            4、超时或 <span class="text-danger">恶意乱做</span>将被罚金
                            <br>
                            <span class="text-info">
                            5、若点击复制关键词失败，请长按手动复制
                            </span>
                            <br/>
                            6、由于卖同款商品的卖家可能不止一家，请核实店铺名称:<span class="text-danger">{{server_data.product.store_name}}</span>
                        </template>
                    </p>
                </div>
            </div>

            <div class="task_info_btn">
                <a class="btn_orange copy-data" data-clipboard-target="#copy-data" v-if="server_data.status === 2">
                    <template v-if="server_data.content.keyword">
                        复制关键词：{{trim(server_data.content.keyword)}}
                    </template>
                    <template v-if="server_data.content.token">
                        复制淘口令：{{trim(server_data.content.token)}}
                    </template>
                </a>


                <template v-if="server_data.status === 2">
                    <a class="btn_gary" v-if="can_submit_time_seconds > 0">
                        <span class="countdown-submit"></span> 后可提交审核
                    </a>
                    <a class="btn_green" v-if="!(can_submit_time_seconds > 0)" @click="submit">
                        <span>提交审核</span>
                    </a>
                </template>

                <template v-if="server_data.status === 4">
                    <a class="btn_orange" @click="appeals">
                        <i class="fa fa-shield"></i>
                        <span>我是正确完成的，提起申诉</span>
                    </a>
                    <a class="btn_green" @click="submit">
                        <i class="fa fa-edit"></i>
                        <span>修改并重新提交（仅一次机会）</span>
                    </a>
                </template>


                <template v-if="server_data.status === 2">
                    <a class="btn_danger" @click="cancel">
                        <span>放弃任务</span>
                    </a>
                </template>
            </div>

            <CancelTaskDialog ref="cancel_task_dialog" submit_function="cancel_function"></CancelTaskDialog>
            <AppealsTaskDialog ref="appeals_dialog"  submit_function="appeals_function"></AppealsTaskDialog>
        </div>
    </div>

</template>

<script>
    import {Scroller, FormPreview, Badge} from 'vux'
    import * as _ from '../utils/tool'
    import api from '../utils/api'
    import CancelTaskDialog from '../components/CancelTaskDialog.vue'
    import AppealsTaskDialog from '../components/AppealsTaskDialog.vue'

    export default {
        components: {
            Scroller,
            CancelTaskDialog,
            Badge,
            AppealsTaskDialog,
        },
        data:       function () {
            return {
                server_data:          {},
                countdown_tag:        false,
                countdown_submit_tag: false,
                can_submit:           false,
                can_submit_minute:    3,   //接任务后几分钟可提交任务
                error_message:        '任务加载中，请稍后……',
                last_send_time_out_seconds: 0,
                can_submit_time_seconds: 0,
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
        mounted:    function () {

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
            loadData:         function () {
                api.getTaskECommerceDetail(this.task_id).then(
                    res => {
                        this.$set(this, 'server_data', res.data);
                        this.initBase();
                    },
                    p_obj => {
                        this.error_message = p_obj.data.hasOwnProperty('message') ? p_obj.data.message : '哦嚯~网络错误'
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


                //拷贝插件
                this.clipboard = new Clipboard('.copy-data');
                this.clipboard.on('success', function (e) {
                    _.toast('内容已经拷贝', 'text', 1000);
                    e.clearSelection();
                });
                this.clipboard.on('error', function (e) {
                    let str = $('#copy-data').text();
                    this.$vux.alert.show({
                        title:   '请手动拷贝以下内容',
                        content: str,
                    });
                    e.clearSelection();
                });

            },
            howToFilter:      function () {
                if (parseInt(this.server_data.platform_id) === 1 || parseInt(this.server_data.platform_id) === 2) {
                    if (this.server_data.hasOwnProperty('items') && this.server_data.items.hasOwnProperty('keyword')) {
                        _.go('/helps/how-to-filter-product-by-keyword', this.$router);
                    }

                    if (this.server_data.hasOwnProperty('items') && this.server_data.items.hasOwnProperty('token')) {
                        _.go('/helps/how-to-filter-product-by-token', this.$router);
                    }
                }
            },
            formatYen:        function (yen) {
                let s = format('###,####.00', yen);
                s = s.replace(/\d{1}\.\d{1}/, "*.*");
                return s;
            },
            checkNotEmptyObj: function (obj) {
                return !$.isEmptyObject(obj)
            },
            trim:             function (val) {
                return $.trim(val);
            },
            submit:           function () {
                if (this.server_data.id) {
                    this.$router.push({name: 'submit_review', params: {id: this.server_data.id, channel_id: (this.server_data.platform_id < 1 || this.server_data.platform_id > 3) ? 1 : this.server_data.platform_id}});
                } else {
                    _.toast('任务编号不存在', 'text', 1000000);
                    _.go('/', this.$router);
                }
            },
            cancel:           function () {
                this.$refs.cancel_task_dialog.show = true;
            },
            cancel_function: function (cancel_reason) {
                api.postTaskCancel(this.server_data.id, cancel_reason).then(
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
                api.postTaskApply(this.server_data.id, cancel_reason).then(
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
            },
            countdownFinish: function (a,b,c) {
                console.log(a,b,c,'countdownFinish')
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
</style>