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
            <template v-for="item in server_data.content">
                <template v-if="item.input_type === 'image'">
                    <div class="list-item mt10" v-if="(parseInt(item.user_data.max_img_num) > parseInt(item.user_data.min_img_num) ? parseInt(item.user_data.max_img_num) : parseInt(item.user_data.min_img_num)) > 0">
                        <h3 class="task-submit-review-header">
                            {{item.name}}
                            <a class="color-blue normal" style="padding: 0 5px;float: right;font-size: 13px;"
                               @click="$router.push('/help-detail/wechat-toupiao-screenshot-example')">
                                <i class="fa fa-info-circle text-default"></i> 截图示例
                            </a>
                        </h3>
                        <div class="comment_upload_btn_box">
                            <template v-for="(n, index) in (parseInt(item.user_data.max_img_num) > parseInt(item.user_data.min_img_num) ? parseInt(item.user_data.max_img_num) : parseInt(item.user_data.min_img_num))">
                                <div class="img-item">
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
                                        :data="{space:'worker',is_temporary: 2, index: index, key: item.key, need_ext: 1}"
                                        :max-file-size="max_file_size"
                                        inputOfFile="image"
                                        text=""
                                        compress="50"
                                        extensions="png,gif,jpeg,jpg"
                                        :url="upload_url">
                                </vue-core-image-upload>
                                <img :src="convertPathToUrl(checkSubmitImgByIndexAndKey(item.key,index))"
                                     :id="'upload_' + item.key + index"
                                     v-if="checkSubmitImgByIndexAndKey(item.key,index)">
                                <img src="" style="display:none;"
                                     :id="'upload_' + item.key + index"
                                     v-if="!(checkSubmitImgByIndexAndKey(item.key,index))">

                                <a class="comment_upload_iadd"></a>
                                任务截图{{n}}
                            </span>
                                        <span><a class="comment_upload_del"
                                                 @click="deleteImage(item.key, index)"></a></span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
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
                server_data:      {},
                upload_url:       '/upload',
                max_file_size:    10485760,
                headers:          {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                images_container: {},
                product_url:      '',
                check_status:     false,
                error_message:    '任务加载中，请稍后……',
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
                deep:    true,
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
            loadData:      function () {
                if (!(Number(this.task_id) > 0)) {
                    _.toastDialog('任务id异常，请重试...', 2000);
                    _.go('/', this.$router);
                    return false;
                }
                api.getTaskNewMediaDetail(this.task_id).then(
                    res => {
                        let tmp     = res.data.source_type_input;
                        let content = res.data.content;
                        for (let n in tmp) {
                            for (let k in content) {
                                if (k === tmp[n].key) {
                                    tmp[n]['user_data'] = content[k]
                                }
                            }
                        }

                        res.data['content'] = tmp;
                        this.$set(this, 'server_data', res.data);
                    },
                    p_obj => {
                        this.$set(this, 'error_message', p_obj.data.message ? p_obj.data.message : '数据异常')
                    }
                );

            },
            loadDataAfter: function () {
                //初始化image_container
                for(let key in this.server_data.content) {
                    if(this.server_data.content[key].input_type === 'image') {
                        this.images_container[this.server_data.content[key].key] = [];
                    }
                }

                //如果用户上传的submit_content有值的话，把它对应到images_container
                if (this.server_data.submit_content && this.server_data.submit_content.hasOwnProperty('images')) {
                    for(let key in this.server_data.submit_content.images) {
                        this.images_container[key] = this.server_data.submit_content.images[key]
                    }
                }
            },
            isNotEmptyObj: function (obj) {
                return !$.isEmptyObject(obj)
            },
            checkSubmitImgByIndexAndKey(key,index) {
                if(this.server_data.submit_content && this.server_data.submit_content.hasOwnProperty('images'))
                {
                    if(typeof this.server_data.submit_content.images === 'object') {
                        if(this.server_data.submit_content.images.hasOwnProperty(key) && this.server_data.submit_content.images[key][parseInt(index)]) {
                            return this.server_data.submit_content.images[key][parseInt(index)];
                        }
                    }
                }
                return false;
            },
            imageuploaded(res) {
                if (res.result === true) {
                    if (this.isNotEmptyObj(res.input)) {
                        let index                         = parseInt(res.input['index']);
                        let key                           = res.input['key'];
                        this.images_container[key][index] = res.path;

                        $('#upload_' + key + index).attr('src', this.convertPathToUrl(res.path)).show();
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
            deleteImage(key, index) {
                $('#upload_' + key + index).attr('src', null).hide();
                if (this.images_container[key][index]) {
                    this.images_container[key][index] = '';
                }
            },
            submit() {
                for(let item in this.server_data.content) {
                    if(item.input_type === 'image') {
                        if(this.images_container[item.key].length < parseInt(item.user_data.min_img_num)) {
                            _.toast('请最少上传' + item.user_data.min_img_num + '张图片')
                            return false;
                        }
                    }
                }

                let params = {
                    id:             this.server_data.id,
                    platform_id:    this.server_data.platform_id,
                    submit_content: {
                        images: this.images_container,
                    }
                };
                api.postTaskNewMediaSubmit(params).then(
                    res => {
                        if (res.result === true) {
                            _.toastDialog(res.message, 2000, true);
                            this.server_data.status = 3;
                            _.go('/task-note?channel_id=5', this.$router);
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