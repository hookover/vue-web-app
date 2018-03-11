<template>
    <div class="bind-account bind-account-o">
        <AppHeader :go_back="true">
            绑定{{type_name}}任务账号
        </AppHeader>

        <div class="task-submit-review">
            <div class="list-item mt10">
                <h3 class="task-submit-review-header">
                    填写账号基本信息
                </h3>
                <div class="comment_upload_btn_box">
                    <x-input title="账号名称" v-model="account" :placeholder="'请输入' +type_name+ '登录用户名'"></x-input>

                    <cell title="性别">
                        <div slot="value">
                            <checker v-model="account_sex" default-item-class="checker-item"
                                     selected-item-class="checker-item-selected">
                                <checker-item value="1">男</checker-item>
                                <checker-item value="2">女</checker-item>
                            </checker>
                        </div>
                    </cell>

                    <x-input title="年龄" v-model="age" :placeholder="'请输入年龄'"></x-input>
                    <cell title="信用等级" @click.native="show_level = true" is-link>
                        <div v-html="account_level_desc ? account_level_desc : '请选择账号等级'"></div>
                    </cell>

                    <cell title="购物标签">
                        <div slot="value">
                            <div class="inline-block tag-item" :class="{'bg-green color-white': tag[0]}"
                                 @click="addTag(0)">{{ tag[0] ? tag[0] : '添加标签' }}
                            </div>
                            <div class="inline-block tag-item" :class="{'bg-green color-white': tag[1]}"
                                 @click="addTag(1)">{{ tag[1] ? tag[1] : '添加标签' }}
                            </div>
                            <div class="inline-block tag-item" :class="{'bg-green color-white': tag[2]}"
                                 @click="addTag(2)">{{ tag[2] ? tag[2] : '添加标签' }}
                            </div>
                        </div>
                    </cell>

                    <x-input v-if="account_type == 'tb'" title="淘气值" v-model="taoqi" :placeholder="'请输入淘气值'"></x-input>
                    <x-input v-if="account_type == 'tb'" title="订单后四位" v-model="order_last" :placeholder="'请输入任意订单后四位'">
                        <a slot="right" style="display:inline-block;font-size:12px;" class="color-blue"
                           @click="$router.push('/help-detail/how-to-find-taobao-order-number-last-4')">
                            <i class="fa fa-info-circle"></i> 示例图
                        </a>
                    </x-input>

                    <x-input title="收货人姓名" v-model="receiver" :placeholder="'请输入收货人真实姓名'"></x-input>
                    <x-input title="收货人电话" v-model="telphone" :placeholder="'请输入收货人电话号码'"></x-input>
                    <x-address title="省市区" v-model="region" :list="addressData" placeholder="请选择收货地区"
                               :popup-style="{zIndex: 502}"></x-address>
                    <x-input title="街道地址" v-model="street_address" :placeholder="'请匆重复输入省市区，精确到门牌号'"></x-input>

                </div>
            </div>

            <div class="list-item mt10">
                <h3 class="task-submit-review-header">
                    请按要求上传以下图片
                    <a style="display:inline-block;float:right;padding-right:10px;font-size:12px;" class="color-blue"
                       @click="account_type == 'tb' ? $router.push('/help-detail/bind-account-example-taobao') : $router.push('/help-detail/bind-account-example-jd')">
                        <i class="fa fa-info-circle"></i> 截图示例
                    </a>
                </h3>
                <div class="comment_upload_btn_box">
                    <div class="img-item" v-for="image in current_need_images">
                        <div class="comment_upload_img">
                        <span class="have_bgimg" style="display:block;">
                                <vue-core-image-upload
                                        class="vue-core-image-upload"
                                        :crop="false"
                                        :headers="headers"
                                        @imageuploaded="uploaded"
                                        @errorhandle="errorHandle"
                                        :data="{space:'worker',is_temporary: 2, img_type: image.type, img_key: image.key, need_ext: 1}"
                                        :max-file-size="max_file_size"
                                        inputOfFile="image"
                                        text=""
                                        extensions="png,gif,jpeg,jpg,bmp"
                                        compress="50"
                                        :url="upload_url">
                                </vue-core-image-upload>
                                <img :src="(image.path ? convertPathToImageUrl(image.path) : null)" v-if="image.path">
                                <a class="comment_upload_iadd"></a>
                                <em style="color: #666">{{image.name}}</em>
                            </span>
                            <span><a class="comment_upload_del" @click="deleteImage( image.type, image.key)"></a></span>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>


        <group>
            <div class="text-center mt20 mb20">
                <span class="btn btn-warning" @click="add">确认提交</span>
            </div>
        </group>


        <actionsheet v-model="show_level" :menus="menus_level" @on-click-menu="chooseLevel" show-cancel></actionsheet>
        <popup v-model="show_tag"
                class="vux-popup-picker">
            <div class="vux-popup-picker-container">
                <div class="vux-popup-picker-header">
                    <flexbox>
                        <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-cancel"
                                      @click.native="show_tag = false">取消
                        </flexbox-item>
                        <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-header-menu-right"
                                      @click.native="chooseTag">完成
                        </flexbox-item>
                    </flexbox>
                </div>

                <picker
                        :data="tag_list"
                        v-model='current_tag_v'
                >
                </picker>
            </div>
        </popup>
    </div>
</template>
<script>
    import {
        Flexbox,
        FlexboxItem,
        Group,
        XInput,
        XAddress,
        Actionsheet,
        Cell,
        Selector,
        Checker,
        CheckerItem,
        PopupPicker,
        Popup,
        Picker,
        ChinaAddressV4Data as ChinaAddressData,
        TransferDomDirective as TransferDom
    } from 'vux'
    import AppHeader from '../components/Header.vue';
    import VueCoreImageUpload from 'vue-core-image-upload'
    import * as _ from '../utils/tool'
    import api from '../utils/api'
    import common from '../common/common'

    export default {
        components: {
            AppHeader,
            Group,
            Cell,
            Checker,
            CheckerItem,
            XInput,
            XAddress,
            Actionsheet,
            PopupPicker,
            Selector,
            Popup,
            Picker,
            Flexbox,
            FlexboxItem,
            VueCoreImageUpload
        },
        data:       function () {
            return {
                upload_url:    '/upload',
                max_file_size: 10485760,
                headers:       {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                addressData:   ChinaAddressData,

                account_level_desc: '',
                show_level:         false,
                show_tag:           false,
                current_tag:        1,
                current_tag_v:      [],
                current_tag_value:  '',
                menus_data:         {
                    tb: [
                        {
                            key:  1,
                            img:  '/dist/images/account_level/b_red_1.gif',
                            name: '1心',
                        },
                        {
                            key:  2,
                            img:  '/dist/images/account_level/b_red_2.gif',
                            name: '2心',
                        },
                        {
                            key:  3,
                            img:  '/dist/images/account_level/b_red_3.gif',
                            name: '3心',
                        },
                        {
                            key:  4,
                            img:  '/dist/images/account_level/b_red_4.gif',
                            name: '4心',
                        },
                        {
                            key:  5,
                            img:  '/dist/images/account_level/b_red_5.gif',
                            name: '5心',
                        },
                        {
                            key:  6,
                            img:  '/dist/images/account_level/b_blue_1.gif',
                            name: '1钻',
                        },
                        {
                            key:  7,
                            img:  '/dist/images/account_level/b_blue_2.gif',
                            name: '2钻',
                        },
                        {
                            key:  8,
                            img:  '/dist/images/account_level/b_blue_3.gif',
                            name: '3钻',
                        },
                        {
                            key:  9,
                            img:  '/dist/images/account_level/b_blue_4.gif',
                            name: '4钻',
                        },
                        {
                            key:  10,
                            img:  '/dist/images/account_level/b_blue_5.gif',
                            name: '5钻',
                        },
                        {
                            key:  11,
                            img:  '/dist/images/account_level/crown.gif',
                            name: '皇冠以上',
                        },
                    ],
                    jd: [
                        {
                            key:  1,
                            img:  '/dist/images/account_level/jd-1.png',
                            name: '铜牌会员',
                        },
                        {
                            key:  2,
                            img:  '/dist/images/account_level/jd-2.png',
                            name: '银牌会员',
                        },
                        {
                            key:  3,
                            img:  '/dist/images/account_level/jd-3.png',
                            name: '金牌会员',
                        },
                        {
                            key:  4,
                            img:  '/dist/images/account_level/jd-4.png',
                            name: '钻石会员',
                        },
                    ],
                },
                need_images:        {
                    tb: [
                        {
                            key:  'my_taobao',
                            name: '我的淘宝截图',
                            type: 'tb',
                            path: '',
                        },
                        {
                            key:  'evaluate',
                            name: '评价管理',
                            type: 'tb',
                            path: '',

                        },
                        {
                            key:  'alipay',
                            name: '支付宝认证',
                            type: 'tb',
                            path: '',
                        },
                    ],
//                    tb: [
//                        {
//                            key:  'my_center',
//                            name: '我的淘宝截图',
//                            type: 'tb',
//                            path: '',
//                        },
//                        {
//                            key:  'profile',
//                            name: '个人资料截图',
//                            type: 'tb',
//                            path: '',
//
//                        },
//                        {
//                            key:  'member_center',
//                            name: '会员中心截图',
//                            type: 'tb',
//                            path: '',
//
//                        },
//                        {
//                            key:  'level_center',
//                            name: '信誉评级截图',
//                            type: 'tb',
//                            path: '',
//                        },
//                    ],
                    jd: [
                        {
                            key:  'my_center',
                            name: '我的京东截图',
                            type: 'jd',
                            path: '',
                        },
                        {
                            key:  'account_manager',
                            name: '账户管理截图',
                            type: 'jd',
                            path: '',
                        },
                    ],
                },
                tag_list:           [
                    ['女装男装',
                     '鞋类箱包',
                     '母婴用品',
                     '护肤彩妆',
                     '汇吃美食',
                     '珠宝配饰',
                     '家装建材',
                     '家居家纺',
                     '百货市场',
                     '汽车用品',
                     '手机数码',
                     '家电办公',
                     '生活服务',
                     '运动户外',
                     '花鸟文娱',
                     '农资采购',
                     '游戏点卷',
                     '其它'
                    ]
                ],

                age:            '', //年龄
                taoqi:          '',  //淘气值
                order_last:     '', //订单后四位
                receiver:       '', //收货人
                telphone:       '', //收货人手机号码
                region:         [], //收货地区
                tag:            [], //用户标签
                street_address: '', //街道地址
                account:        '', //账号
                account_sex:    '', //性别
                account_level:  '', //账号等级
                is_loading:     false,
            }
        },
        mounted:    function () {

        },
        computed:   {
            menus_level:         function () {
                let data       = [];
                let menus_data = this.menus_data[this.account_type];
                for (let n in menus_data) {
                    data.push({
                        label: '<img src="' + menus_data[n].img + '" class="ml50 pull-left ' + (this.account_type === 'jd' ? ' imgmh-25 ' : '') + '"><span class="pull-right mr50">' + menus_data[n].name + '</span><div class="clear"></div>',
                        value: menus_data[n].key
                    })

                }
                return data;
            },
            account_type:        function () {
                switch (this.$route.query.type) {
                    case 'jd':
                        return 'jd';
                        break;
                    case 'taobao':
                        return 'tb';
                        break;
                    default:
                        return 'tb'
                }
            },
            type_name:           function () {
                return this.$route.query.type === 'jd' ? '京东' : '淘宝'
            },
            current_need_images: function () {
                if (this.$route.query.type === 'jd') {
                    return this.need_images.jd;
                }
                return this.need_images.tb;
            }
        },
        methods:    {
            add:                   function () {
                //检查数据
                if (!this.account) {
                    _.toast('账号名称不能为空');
                    return false;
                }

                if (!this.account_sex) {
                    _.toast('请选择账号性别');
                    return false;
                }
                if (!this.age) {
                    _.toast('请填写年龄');
                    return false;
                }
                if (!/^\d{1,3}$/.test(this.age)) {
                    _.toast('年龄只能是1~3位长度的数字');
                    return false;
                }

                if (!this.account_level) {
                    _.toast('请选择账号信用等级');
                    return false;
                }

                if (this.tag.length < 1) {
                    _.toast('请选择您购买过的商品的分类标签');
                    return false;
                }

                //淘宝专用
                if (this.account_type === 'tb') {
                    if (!this.taoqi) {
                        _.toast('请填淘气值');
                        return false;
                    }
                    if (!/^\d+$/.test(this.taoqi)) {
                        _.toast('淘气值只能是数字');
                        return false;
                    }
                    if (!this.order_last) {
                        _.toast('请填写淘宝订单号后四位');
                        return false;
                    }
                    if (!/^\d{4}$/.test(this.order_last)) {
                        _.toast('订单号后四位填写错误');
                        return false;
                    }
                }

                if (!this.receiver) {
                    _.toast('请输入收货人姓名');
                    return false;
                }

                if (!this.telphone) {
                    _.toast('请输入收货人电话号码');
                    return false;
                }

                if (!this.street_address) {
                    _.toast('请填写收货街道地址，精确到门牌号');
                    return false;
                }

                if (this.region.length < 3) {
                    _.toast('请选择收货地区');
                    return false;
                }



                let need_images = this.need_images[this.account_type];
                for (let n in need_images) {
                    if (!need_images[n].path) {
                        _.toast('请上传完整账号截图，' + need_images[n].name + '未上传');
                        return false;
                    }
                }

                let params = {
                    account_type:   this.account_type,  //账户类型
                    account:        this.account,       //账号名称
                    account_sex:    this.account_sex,   //性别
                    age:            this.age,           //年龄
                    account_level:  this.account_level, //账户信用等级
                    tag:            this.tag,           //购物标签
                    taoqi:          this.taoqi,         //淘气值
                    order_last:     this.order_last,    //任意订单后四位
                    receiver:       this.receiver,      //收货人
                    region:         this.region,        //收货地区编码
                    telphone:       this.telphone,      //收货电话
                    street_address: this.street_address,//收货街道地址
                    need_images:    need_images,        //上传图片
                };

                if (!this.is_loading) {
                    this.is_loading = true;
                    api.postBindAccount(params).then(
                        res => {
                            _.toast('已成功提交,极速审核中,请稍后查看审核结果！', 'text', 2000);
                            this.is_loading = false;
                            if (this.$route.query.type === 'jd') {
                                _.go('/bind-account-list?type=jd', this.$router)
                            } else {
                                _.go('/bind-account-list?type=taobao', this.$router)
                            }
                        },
                        p_obj => {
                            this.is_loading = false;
                        }
                    )
                }
            },
            chooseLevel:           function (val) {
                if (val === 'cancel') {
                    return false;
                }
                let menus_data = this.menus_data[this.account_type];
                for (let n in menus_data) {
                    if (menus_data[n].key === val) {
                        this.account_level      = val;
                        this.account_level_desc = '<img class="' + (this.account_type === 'jd' ? 'imgmh-25 imgmw-25' : 'img-auto') + '" src="' + menus_data[n].img + '">';
                    }
                }
            },
            chooseTag:             function () {
                this.current_tag_value = this.current_tag_v[0];
                for (let key in this.tag) {
                    if (this.tag[key] === this.current_tag_value) {
                        _.toast('不能重复选择标签！');
                        return false;
                    }
                }
                this.tag[this.current_tag] = this.current_tag_value;
                this.show_tag              = false;
            },
            addTag:                function (tag_id) {
                this.show_tag    = true;
                this.current_tag = parseInt(tag_id);
            },
            deleteImage:           function (type, key) {
                for (let n in this.need_images[type]) {
                    if (this.need_images[type][n]['key'] === key) {
                        this.need_images[type][n]['path'] = '';
                    }
                }
                $('#bind_account' + type + key).attr('src', null).hide();
            },
            uploaded:              function (res) {
                if (res.result === true) {
                    if (!$.isEmptyObject(res.input)) {

                        let img_type = res.input['img_type'];
                        let img_key  = res.input['img_key'];

                        for (let n in this.need_images[img_type]) {
                            if (this.need_images[img_type][n]['key'] === img_key) {
                                this.need_images[img_type][n]['path'] = res.path;
                            }
                        }
                    }
                } else {
                    _.toast('图片上传失败，请稍后再试或联系客服', 'text', 2500)
                }
            },
            errorHandle:           function (error_message) {
                if(error_message.indexOf('FILE IS TOO LARGER MAX FILE IS') >= 0) {
                    _.toast('上传失败：您的图片超过' + this.max_file_size /  1048576 + 'M','text', 3000);
                    return false;
                }

                if(error_message.indexOf('TYPE ERROR') >= 0) {
                    _.toast('文件类型错误，必须是图片格式','text', 3000);
                    return false;
                }

                _.toast(error_message);
            },
            convertPathToImageUrl: function (path) {
                return _.convertPathToImageUrl(path)
            }
        }
    }

</script>
<style>
    .bind-account {
        overflow: hidden;
    }

    .bind-account .vux-actionsheet .weui-actionsheet__cell img {
        width: auto !important;
    }

    .imgmw-25 {
        max-width: 25px;
    }

    .imgmh-25 {
        max-height: 25px;
    }

    .bind-account-o .checker-item {
        border: 1px solid #ececec;
        padding: 5px 20px;
        margin-right: 5px;
        border-radius: 5px;
    }

    .bind-account-o .checker-item:last-child {
        margin-right: 0;
    }

    .bind-account-o .checker-item-selected {
        background: #288af0;
        color: #fff;
    }

    .bind-account-o .tag-item {
        width: 70px;
        border: 1px solid #ececec;
        padding: 5px 3px;
        margin-right: 5px;
        border-radius: 5px;
        overflow: hidden;
        text-align: center;

    }

    .bind-account-o .tag-item:last-child {
        margin-right: 0;
    }
</style>