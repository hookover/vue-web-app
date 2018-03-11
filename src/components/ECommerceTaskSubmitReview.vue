<template>
    <!--<div class="comment_upload_btn_box">-->
    <!--<div class="comment_upload_img">-->
    <!--&lt;!&ndash;图片上传有两种状态：第一种是还没上传，显示的是上面一个<span>;第二种是已上传，显示的是下面一个<span>。用style="display:none"来判断是否显示&ndash;&gt;-->
    <!--&lt;!&ndash;            <a class="comment_upload_del" style="position:relative;left:38px; bottom:10px">11</a>&ndash;&gt;-->
    <!--<span class="have_bgimg" style="display:block;" >-->
    <!--<img src="" style="display:none;"><a class="comment_upload_iadd"></a>上传截图-->
    <!--</span>-->
    <!--<input type="file" style="display:none;" name="img">-->
    <!--<span ><a></a><a class="comment_upload_del"></a></span>-->
    <!--</div>-->
    <!---->
    <!--<ul class="comment_upload_note">-->
    <!--<li><em></em>请按给出的评论文案进行五星好评</li>-->
    <!--<li><em></em>上传后不可更改，请上传有效截图</li>-->
    <!--</ul>-->
    <!--</div>-->
    <div>
        <!--channel_id错误或没有任务时显示-->
        <group class="task-list" v-if="!isNotEmptyObj(server_data)">
            <div class="nothing">
                <img src="/dist/images/task_pop_index_img.png">
                <p>{{error_message}}</p>
            </div>
        </group>
        <div class="task-submit-review" v-if="isNotEmptyObj(server_data) && server_data.hasOwnProperty('id')">

            <div class="list-item mt10">
                <h3 class="task-submit-review-header">请确定已完成该任务的以下操作项</h3>
                <div class="comment_upload_btn_box">
                    <ul class="comment_upload_note">
                        <li><em></em>根据<span class="text-danger">查找条件</span>找到目标产品并浏览3分钟+</li>
                        <li v-for="operation in server_data.operations">
                            <em></em>
                            {{operation.name}} {{operation.description}}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="list-item mt10">
                <h3 class="task-submit-review-header">
                    <a class="pull-right text-blue s13" @click="howToFilter"><i class="fa fa-info-circle"></i> 如何获取商品连接？</a>
                    验证商品连接
                </h3>
                <div class="comment_upload_btn_box">
                    <div class="p10" :class="{'has-success': check_status}">
                        <a class="btn btn-warning pull-right" @click="verifyProductUrl">验证连接</a>
                        <input v-model="product_url" type="text" placeholder="请输入商品的连接" class="form-control per60">
                    </div>
                </div>
            </div>

            <!--基础操作项-->
            <div class="list-item mt10" v-if="isNotEmptyObj(server_data.items)">
                <h3 class="task-submit-review-header">基础操作截图</h3>
                <div class="comment_upload_btn_box">
                    <template v-for="(item, img_type) in server_data.items">
                        <div class="img-item" v-for="image in item.need_images">
                            <div class="comment_upload_img">
                                <!--图片上传有两种状态：第一种是还没上传，显示的是上面一个<span>;第二种是已上传，显示的是下面一个<span>。用style="display:none"来判断是否显示-->
                                <!--<a class="comment_upload_del" style="position:relative;left:38px; bottom:10px">11</a>-->
                                <span class="have_bgimg" style="display:block;">
                                <vue-core-image-upload
                                        class="vue-core-image-upload"
                                        :crop="false"
                                        @imageuploaded="imageuploaded"
                                        @errorhandle="errorHandle"
                                        :headers="headers"
                                        :data="{space:'worker',is_temporary: 2, action: 'items', img_type: img_type, img_key: image.key, need_ext: 1}"
                                        :max-file-size="max_file_size"
                                        inputOfFile="image"
                                        text=""
                                        compress="50"
                                        extensions="png,gif,jpeg,jpg"
                                        :url="upload_url">
                                </vue-core-image-upload>
                                <img :src="convertPathToUrl(server_data.submit_content.images.items[img_type][image.key])"
                                     :id="'items' + img_type + image.key"
                                     v-if="server_data.submit_content && server_data.submit_content.images.items[img_type][image.key]">
                                <img src="" style="display:none;"
                                     :id="'items' + img_type + image.key"
                                     v-if="!(server_data.submit_content && server_data.submit_content.images.items[img_type][image.key])">

                                <a class="comment_upload_iadd"></a>
                                {{image.name}}
                            </span>
                                <span><a class="comment_upload_del" @click="deleteImage('items', img_type, image.key)"></a></span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!--增值操作项-->
            <template v-if="isNotEmptyObj(operation.need_images)" v-for="operation in server_data.operations">
                <div class="list-item mt10">
                    <h3 class="task-submit-review-header">{{operation.name}}截图</h3>
                    <div class="comment_upload_btn_box">
                        <div class="img-item" v-for="image in operation.need_images">
                            <div class="comment_upload_img">
                                <!--图片上传有两种状态：第一种是还没上传，显示的是上面一个<span>;第二种是已上传，显示的是下面一个<span>。用style="display:none"来判断是否显示-->
                                <!--<a class="comment_upload_del" style="position:relative;left:38px; bottom:10px">11</a>-->
                                <span class="have_bgimg" style="display:block;">
                                <vue-core-image-upload
                                        class="vue-core-image-upload"
                                        :crop="false"
                                        :headers="headers"
                                        @imageuploaded="imageuploaded"
                                        @errorhandle="errorHandle"
                                        :data="{space:'worker',is_temporary: 2, action: 'operations', img_type: operation.id, img_key: image.key, need_ext: 1}"
                                        :max-file-size="max_file_size"
                                        inputOfFile="image"
                                        text=""
                                        extensions="png,gif,jpeg,jpg"
                                        compress="60"
                                        :url="upload_url">
                                </vue-core-image-upload>
                                <img :src="convertPathToUrl(server_data.submit_content.images.operations[operation.id][image.key])"
                                     :id="'operations' + operation.id + image.key"
                                     v-if="server_data.submit_content && server_data.submit_content.images.operations[operation.id][image.key]">
                                <img src="" style="display:none;"
                                     :id="'operations' + operation.id + image.key"
                                     v-if="!(server_data.submit_content && server_data.submit_content.images.operations[operation.id][image.key])">

                                <a class="comment_upload_iadd"></a>
                                {{image.name}}
                            </span>
                                <span><a class="comment_upload_del"
                                         @click="deleteImage('operations', operation.id, image.key)"></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-if="this.server_data.status === 2 || this.server_data.status === 4">
                <div class="task_info_btn comment_info_bot">
                    <a class="btn_orange" @click="submit">
                        {{server_data.status === 2 ? '提交审核' : '重新提交审核'}}
                    </a>
                </div>
            </template>

            <div class="pb30"></div>
        </div>
    </div>

</template>
<script>
    import {Group} from 'vux'
    import VueCoreImageUpload from 'vue-core-image-upload'
    import * as _ from '../utils/tool'
    import api from '../utils/api'
    import common from '../common/common'

    export default {
        components: {
            Group,
            VueCoreImageUpload,
        },
        data:       function () {
            return {
                server_data: {},
                upload_url:       '/upload',
                max_file_size:    10485760,
                headers:          {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                images_container: {},
                product_url:      '',
                check_status:     false,
                error_message:        '任务加载中，请稍后……',
            }
        },
        watch:      {
            product_url: function (val, old) {
                this.check_status = false;
            },
            server_data: {
                handler: function (val, old) {
                    this.loadDataAfter();
                },
                deep: true,
            }
        },
        props:      {
            task_id: {
                type:     Number,
                required: true,
            },
        },
        created:    function () {
            this.loadData();
        },
        mounted:    function () {


        },
        methods:    {
            loadData: function () {
                if(!(Number(this.task_id) > 0)) {
                    _.toastDialog('任务id异常，请重试...', 2000);
                    _.go('/', this.$router);
                    return false;
                }
                api.getTaskDetail(this.task_id).then(
                    res=>{
                        this.$set(this, 'server_data', res.data);
                    },
                    p_obj=>{
                        this.$set(this, 'error_message', p_obj.data.message ? p_obj.data.message : '数据异常')
                    }
                );

            },
            loadDataAfter: function () {
                //初始化基础操作项
                if (this.isNotEmptyObj(this.server_data.items)) {
                    let s_items                    = this.server_data.items;
                    this.images_container['items'] = {};
                    for (let n in s_items) {
                        if (this.isNotEmptyObj(s_items[n].need_images)) {
                            this.images_container['items'][n] = {}
                            for (let m in s_items[n].need_images) {
                                this.images_container['items'][n][s_items[n].need_images[m].key] = ""
                            }
                        }
                    }
                }

                //初始化操作项
                if (this.isNotEmptyObj(this.server_data.operations)) {
                    let s_operations                    = this.server_data.operations;
                    this.images_container['operations'] = {};
                    for (let n in s_operations) {
                        if (this.isNotEmptyObj(s_operations[n].need_images)) {
                            this.images_container['operations'][n] = {}
                            for (let m in s_operations[n].need_images) {
                                this.images_container['operations'][n][s_operations[n].need_images[m].key] = ""
                            }
                        }
                    }
                }


                //如果用户上传的submit_content有值的话，把它对应到images_container

                if (this.server_data.submit_content && this.server_data.submit_content.hasOwnProperty('images')) {
                    if (this.server_data.submit_content.images.hasOwnProperty('items')) {
                        for (let n in this.server_data.submit_content.images.items) {
                            for (let m in this.server_data.submit_content.images.items[n]) {
                                this.images_container['items'][n][m] = this.server_data.submit_content.images.items[n][m]
                            }
                        }
                    }
                }

                if (this.server_data.submit_content  && this.server_data.submit_content.hasOwnProperty('images')) {
                    if (this.server_data.submit_content.images.hasOwnProperty('operations')) {
                        for (let n in this.server_data.submit_content.images.operations) {
                            for (let m in this.server_data.submit_content.images.operations[n]) {
                                this.images_container['operations'][n][m] = this.server_data.submit_content.images.operations[n][m]
                            }
                        }
                    }
                }

                if (this.server_data.submit_content && this.server_data.submit_content.hasOwnProperty('url')) {
                    this.product_url = this.server_data.submit_content.url
                }
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
            isNotEmptyObj:    function (obj) {
                return !$.isEmptyObject(obj)
            },
            imageuploaded(res) {
                if (res.result === true) {
                    if (this.isNotEmptyObj(res.input)) {
                        let action                                       = res.input['action'];
                        let img_type                                     = res.input['img_type'];
                        let img_key                                      = res.input['img_key'];
                        this.images_container[action][img_type][img_key] = res.path;

                        //:id="'operations' + operation.id + image.key"
                        $('#' + action + img_type + img_key).attr('src', this.convertPathToUrl(res.path)).show();
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
            convertPathToUrl(path) {
                return path
            },
            deleteImage(type, img_type, img_key) {
                $('#' + type + img_type + img_key).attr('src', null).hide();
                if (this.images_container[type][img_type][img_key]) {
                    this.images_container[type][img_type][img_key] = '';
                }
            },
            verifyProductUrl: function () {
                if (this.product_url) {
                    let params = {
                        url:         this.product_url,
                        task_id:     this.server_data.id,
                        platform_id: this.server_data.platform_id
                    };
                    api.postCheckProductLink(params).then(
                        res => {
                            this.check_status = true;
                            _.toast(res.hasOwnProperty('message') ? res.message : '连接校验成功！');
                        },
                        p_obj => {

                        }
                    );
                } else {
                    _.toast('商品连接或商品的淘口令未填写，请重新填写！', 'text', 2000)
                }
            },
            submit() {
                if (!this.check_status) {
                    _.toast('请先验证商品连接！');
                    return false;
                }
                for (let n in this.images_container) {
                    for (let m in this.images_container[n]) {
                        for (let k in this.images_container[n][m]) {
                            if (!this.images_container[n][m][k]) {
                                _.toast('请按要求上传全部图片', 'text', 2500);
                                return;
                            }
                        }
                    }
                }
                let params = {
                    id:             this.server_data.id,
                    platform_id:    this.server_data.platform_id,
                    submit_content: {
                        images: this.images_container,
                        url:    this.product_url,
                    }
                };
                api.postTaskSubmit(params).then(
                    res => {
                        if (res.result === true) {
                            _.toastDialog(res.message, 2000, true);
                            this.server_data.status = 3;
                            _.go('/task-note', this.$router);
                        }
                    },
                    p_obj => {

                    }
                );
            }
        }
    }
</script>
<style>
    .vue-core-image-upload {
        overflow: hidden !important;
        position: absolute !important;
        height: 100%;
        width: 100%;
        top: 0;
    }

    .vue-core-image-upload form {
        width: 100% !important;
        height: 100% !important;
    }

    .task-submit-review .img-item {
        width: 30%;
        margin-right: 5%;
        display: inline-block;
    }

    .task-submit-review .img-item:nth-child(3n) {
        margin-right: 0;
        float: right;
    }

    .task-submit-review .list-item {
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
    }

    .task-submit-review h3.task-submit-review-header {
        background-color: #fff;
        border-bottom: 1px dashed #e2e2e2;
        font-size: 15px;
        color: #2bc7b5;
        font-weight: 400;
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        margin: 0;
    }

    .comment_upload_btn_box {
        background: #FFF;
        width: 100%;
        padding: 10px 0;
    }

    .comment_upload_img {
        position: relative;
        display: inline-block;
        height: 69px;
        width: 69px;
        text-align: center;
        margin: 10px;
        float: left;
        word-break: break-all;
    }

    .comment_upload_img a {
    }

    .comment_upload_img span {
        border-radius: 5px;
        height: 69px;
        width: 69px;
        display: block;
        text-align: center;
    }

    .comment_upload_img span.have_bgimg {
        background: url(/dist/images/comment_upload_img1.png) no-repeat;
        background-size: 69px 69px;
        padding: 12px 0px;
        font-size: 13px;
        color: #d7d7d7;
    }

    .comment_upload_img span a.comment_upload_iadd {
        background: url(/dist/images/comment_upload_iadd.png) no-repeat;
        height: 15px;
        width: 15px;
        background-size: 15px 15px;
        display: block;
        margin: 0 auto;
        padding-top: 6px;
    }

    .comment_upload_img span img {
        height: 65px;
        width: 65px;
        border-radius: 5px;
        z-index: 5px;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .comment_upload_img span a.comment_upload_del {
        position: absolute;
        display: block;
        height: 19px;
        width: 19px;
        background: url(/dist/images/comment_upload_del.png) no-repeat center;
        background-size: 19px 19px;
        top: -5px;
        right: -5px;
        z-index: 200;
        padding: 5px;
    }

    .comment_upload_note {
        padding: 0 20px;
    }

    .comment_upload_note li {
        font-size: 12px;
        color: #999999;
        line-height: 26px;
    }

    .comment_upload_note li em {
        background: #f9a71a;
        border-radius: 5px;
        height: 5px;
        width: 5px;
        display: inline-block;
        text-align: center;
        margin-right: 5px;
        line-height: 26px;
    }

    .comment_info_bot {
        padding: 20px;
    }

    .task-submit-review .comment_upload_img span img {
        height: 100%;
        width: 100%;
        padding: 1px;
    }

    .comment_upload_img span:last-child {
        width: 0;
        height: 0;
    }

</style>