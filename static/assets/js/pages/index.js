/**
 * Created by huangshuang on 17-6-1.
 */
/**
 * Created by overhook on 17-5-7.
 */
var table_columns = [
    {
        name: 'id',
        title: 'ID',
    },
    {
        name: 'platform_id',
        title: '平台',
    },
    {
        name: 'source_type',
        title: '类型',
    },
    // {
    //     name: 'start_at',
    //     title: '开始时间',
    // },
    // {
    //     name: 'end_at',
    //     title: '结束时间',
    // },
];

Vue.component('detail-row', {
    template: [
        '<div @click="onClick" v-if="rowData.end_at > date" class="background-padding">',

        '<div class="inline field">',
        '<label class="control-label">商品名称: </label>',
        '<span>飞利浦新安怡新生儿宽口径...</span>',
        '</div>',

        '<div class="inline field">',
        '<label class="control-label">操作项: </label>',
        '<span class="color-ea5514">浏览商品2分钟,上下截图(任务范围：全国)</span>',
        '</div>',

        '<div class="inline field position-relative">',
        '<label class="control-label">关键词: </label>',
        '<span>飞利浦<span class="position-left50">2017-06-03 16:00:00左右</span></span>',
        '</div>',

        '<div class="inline field">',
        '<label class="control-label">佣金: </label>',
        '<span class="color-font-size">0.2<span class="color-red">云币</span></span>',
        '</div>',

        '<div class="inline field">',
        '<label class="control-label">数量: </label>',
        '<span>剩余<span class="color-red"> 2 </span>单</span>',
        '<div class="height30px">',
        '<a class="btn btn-sm btn-warning pull-right" href="javascript:;" disabled>领取任务</a>',
        '</div>',
        '</div>',

        '</div>',



        '<div @click="onClick" v-else class="padding10px">',

        '<div class="inline field">',
        '<label class="control-label">商品名称: </label>',
        '<span>飞利浦新安怡新生儿宽口径...</span>',
        '</div>',

        '<div class="inline field">',
        '<label class="control-label">操作项: </label>',
        '<span class="color-ea5514">浏览商品2分钟,上下截图(任务范围：全国)</span>',
        '</div>',

        '<div class="inline field">',
        '<label class="control-label">关键词: </label>',
        '<span>飞利浦</span>',
        '</div>',

        '<div class="inline field">',
        '<label class="control-label">佣金: </label>',
        '<span class="color-font-size">0.2<span class="color-red">云币</span></span>',
        '</div>',

        '<div class="inline field">',
        '<label class="control-label">数量: </label>',
        '<span>剩余<span class="color-red"> 2 </span>单</span>',
        '<div class="height30px">',
        '<a class="btn btn-sm btn-warning pull-right" href="javascript:;">领取任务</a>',
        '</div>',
        '</div>',

        '</div>'
    ].join(''),
    props: {
        rowData: {
            type: Object,
            required: true
        },
    },
    data: function () {
        return {
            date : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        }
    },
    methods: {
        onClick (event) {
            console.log('my-detail-row: on-click', event.target)
        }
    }
});

var vueBox = new Vue({
    el: '#vueBox',
    data: {

        table_item_actions: [ //操作控件
            {
                name: 'edit-item',
                label: '详情',
                icon: 'icon icon-ok',
                css: 'btn btn-xs btn-primary tooltips',
                displayed: '',
                callback: 'show_details_btn',
                tooltip: '任务详情',
            },
            // {
            //     name: 'edit-item',
            //     label: '通过',
            //     icon: 'icon icon-ok',
            //     css: 'btn btn-xs btn-success tooltips',
            //     displayed: 'task_ok',
            //     callback: 'task_ok_btn',
            //     tooltip: '任务通过',
            // },
            // {
            //     name: 'edit-item',
            //     label: '不通过',
            //     icon: 'icon icon-ok',
            //     css: 'btn btn-xs btn-danger tooltips',
            //     displayed: 'task_no',
            //     callback: 'task_no_btn',
            //     tooltip: '任务不通过',
            // },
        ],
        table_columns: table_columns,
        table_hint_text: '',
        action_data: {
            key_word: '',
            date_range: {
                from: '',
                to: ''
            },
            select_status: {
                selected: 0,
                options: [
                    { text: '全部操作', value: '0'},
                    { text: '正常登录', value: '1'},
                    { text: '找回密码', value: '2'},
                    { text: '修改密码', value: '3'},
                ]
            }
        },
        table_data: {
            data_total: 100,
            page_total: 10,
            page_size: 10,
            page_cur: 3,
            data_from: 21,
            data_end: 30,

//                rows: default_table_data
            rows: [
                {
                    id:'1',
                    platform_id:'淘宝',
                    source_type: '常规任务',
                    start_at: '2015-05-05 12:12:12',
                    end_at: '2017-06-03 12:12:12',
                },
                {
                    id:'1',
                    platform_id:'淘宝',
                    source_type: '常规任务',
                    start_at: '2015-05-05 12:12:12',
                    end_at: '2017-06-03 18:18:12',
                },
                {
                    id:'1',
                    platform_id:'淘宝',
                    source_type: '常规任务',
                    start_at: '2015-05-05 12:12:12',
                    end_at: '2017-06-03 12:12:12',
                },
                {
                    id:'1',
                    platform_id:'淘宝',
                    source_type: '常规任务',
                    start_at: '2015-05-05 12:12:12',
                    end_at: '2017-06-04 18:18:12',
                },
                {
                    id:'1',
                    platform_id:'淘宝',
                    source_type: '常规任务',
                    start_at: '2015-05-05 12:12:12',
                    end_at: '2017-06-04 12:12:12',
                },
                {
                    id:'1',
                    platform_id:'淘宝',
                    source_type: '常规任务',
                    start_at: '2015-05-05 12:12:12',
                    end_at: '2017-06-04 18:18:12',
                },
            ]
        }
    },
    allotStatusOptions: [],
    components:{
        's-table': IVTable,
        's-pagination': IVPagination,
        's-date': IVDateinput,
        's-select': IVSelect,
    },
    watch: {
        /**
         * 监听值发生变化，触发函数执行
         * */
    },
    computed:{
        /**
         * 计算属性
         **/

    },
    mounted: function (row,btn) {
        this.loadServerData();
    },
    methods:{
        onCellClicked (data, field, event) {
            if (field.name == '__actions') {
                this.$refs.ivtable.toggleDetailRow(data.id);
            }
        },
        loadServerData: function () {

            $('.index-td tbody tr td').attr('class','index-td2');
            this.$refs.ivtable.toggleDetailRow(this.table_data.rows[0].id);
        },
        submit: function () {
            var post_data = {
                channel_id: this.action_data.select_channel.selected,
                category_id: this.computed_select_category.selected,
                status_id: this.action_data.select_status.selected,
                key_word: this.action_data.key_word,
                date_from: this.action_data.date_range.from,
                date_to: this.action_data.date_range.to,
            };

            /**
             * 检查数据并ajax提交到服务器
             * todo
             */


            alert('你点击了筛选提交按钮，数据看console.log')

            this.loadServerData(post_data);
        },
        show_close_btn: function (row, btn) {
            /**
             * 控制action显示
             * */
            if(row.id == 1) {
                return false;
            }
            return true;
        },
        format_task_name: function (task_name,row) {
            var str = '<a href=#'+row.id+'>'+task_name+'</a>';
            return str;
        },
        format_status: function (status) {
            if (status === '正常登录') {
                return '<span class="label-xs">'+status+'</span>';
            }
            if (status === '找回密码') {
                return '<span class="label-xs">'+status+'</span>';
            }
            if (status === '修改密码') {
                return '<span class="label-xs">'+status+'</span>';
            }
            return status;
        },
        show_details_btn: function (row,btn) {
            console.log(btn,row);
        }
    }
});