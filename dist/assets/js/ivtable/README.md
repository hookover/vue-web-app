# ivtable

基于VUE的表格渲染和分页插件

# 编译方式

npm install
npm run build

生成文件到dist/ivtable.js




# ivtable

### 调用方式
    <script src="dist/ivtable.js"></script>

     <IVTable
         :item_actions="table_item_actions"
         :table_data="table_data.rows"
         :table_columns="table_columns"
         :table_hint_text="table_hint_text"
         table_css="table table-striped table-advance table-hover"
     ></IVTable>


### 数据格式

    table_hint_text: '数据加载中... | 暂无数据'  //此数据属性有数据时，不显示数据表的数据
    table_columns 数据结构如下
    tableColumns: [
      {
              name: 'activity_id',
              title: '活动ID',      //列头
              title_css: '',     //table>thead>tr>th class
              data_css: '',      //table>tbody>tr>td class
              style: 'width: 80px;',
              callback: ''    //对该列值进行处理的回调函数
      },
      {
              name: 'activity_type',
              title: '活动类型',
              title_css: '',
              data_css: '',
              style: 'width: 80px;'
      },
      {
               name: '__actions',  //操作选项
               title_css: '',
               data_css: '',
               title: '操作',
      }
    ]
     
    table_data 数据结构如下：
    table_data: [
       {
               'activity_id': '1',
               'activity_type': '全国活动'
        },
       {
               'activity_id': '2',
               'activity_type': '安徽省内活动'
       }
      ]
  
    item_actions: [
       { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button', displayed: 'action_allow_info' }, //action_allow_info返回 true或false，返回true时显示此控件，返回false时不显示
       { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button', displayed: 'action_allow_edit' },
      ]



# ivpaaination

### 调用方式
         <IVPagination
             :page_data="table_data"
             :pagination_button_length="4"
         ></IVPagination>
        
        
        
# 示例

### HTML

    <section class="panel">
        <div class="panel-body">
         <div class="adv-table editable-table">
             <div class="dataTables_wrapper">
                 <s-table
                         :item_actions="table_item_actions"
                         :table_data="table_data.rows"
                         :table_columns="table_columns"
                         :table_hint_text="table_hint_text"
                         table_css="table table-striped table-advance table-hover"
                 ></s-table>
            
                 <s-pagination
                         :page_data="table_data"
                         :pagination_button_length="4"
                 ></s-pagination>
             </div>
         </div>
        </div>
    </section>
    
#### JS

    //渲染的表格头
    var table_columns = [
        {
            name: 'id',
            title: 'ID',
        },
        {
            name: 'channel',
            title: '渠道',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'category',
            title: '分类',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'name',
            title: '任务名称',
            callback: 'format_task_name',
            html: true,
        },
        {
            name: 'body',
            title: '主体名称',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'budget',
            title: '预算云豆',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'actually_paid',
            title: '实付云豆',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'rebate',
            title: '返还云豆',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'start_time',
            title: '开始时间',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'end_time',
            title: '结束时间',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'status',
            title: '任务状态',
            html: true,
            callback: 'format_status'
        },
        {
            name: '__actions',
            title: ''
        }
    ];
    var vueBox = new Vue({
        el: '#vueBox',
        data: {
            table_item_actions: [ //操作控件
                {
                    name: 'delete-item',
                    label: '删除',
                    icon: 'icon icon-remove',
                    css: 'btn btn-xs btn-danger tooltips',
                    displayed: 'show_close_btn',
                    callback: 'delete_item',
                    tooltip: '删除任务'
                },
                {
                    name: 'edit-item',
                    label: '',
                    icon: 'icon icon-pencil',
                    css: 'btn btn-xs btn-primary tooltips',
                    displayed: '',
                    callback: 'edit_item',
                    tooltip: '编辑任务',
                },
            ],
            table_columns: table_columns,
            table_hint_text: '',
            action_data: {
                key_word: '',
                date_range: {
                    from: '',
                    to: ''
                },
                select_channel: {
                    selected: 1,
                    options: [
                        { text: '全部渠道', value: '1'},
                        { text: '电商', value: '2'},
                        { text: 'APP', value: '3'},
                        { text: '腾讯类', value: '4'},
                        { text: '自定义任务', value: '5'},
                    ]
                },
                select_status: {
                    selected: 1,
                    options: [
                        { text: '审核中', value: '1'},
                        { text: '已开始', value: '2'},
                        { text: '已完成', value: '3'},
                        { text: '刷钻', value: '4'},
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
                        channel: '电商',
                        category: '淘宝',
                        name: '2017款美裙',
                        body: 'XX旗舰店',
                        budget: 200,
                        actually_paid: 200,
                        rebate: 0,
                        start_time: '2017-1-1',
                        end_time: '2017-2-2',
                        status: '进行中'
                    },
                    {
                        id:'2',
                        channel: 'APP',
                        category: '天猫',
                        name: '美团外卖',
                        body: '美团',
                        budget: 200,
                        actually_paid: 200,
                        rebate: 0,
                        start_time: '2017-1-1',
                        end_time: '2017-2-2',
                        status: '审核失败'
                    }
                ]
            }
        },
        allotStatusOptions: [],
        components:{
            's-table': IVTable,
            's-pagination': IVPagination,
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
            computed_select_category: function () {
                var channel_id = this.action_data.select_channel.selected;
                /**
                 * 全部
                 **/
                if(channel_id == 1) {
                    return {
                        selected: 1,
                        options: [
                            { text: '全部分类', value: '1'},
                            { text: 'APP下载', value: '2'},
                            { text: 'APP评论', value: '3'},
                        ]
    
                    }
                }
                /**
                 * 电商
                 **/
                if(channel_id == 2) {
                    return {
                        selected: 1,
                        options: [
                            { text: '全部分类', value: '1'},
                            { text: '宝贝', value: '1'},
                        ]
    
                    }
                }
    
                /**
                 * app
                 **/
                if(channel_id == 3) {
                    return {
                        selected: 1,
                        options: [
                            { text: '全部分类', value: '1'},
                            { text: 'APP', value: '1'},
                        ]
    
                    }
                }
    
                /**
                 * 其它...
                 **/
    
                return {
                    selected: '',
                    options: [
                        { text: '未定义', value: ''},
                    ]
    
                }
    
            }
        },
        mounted: function () {
    //            this.$nextTick(function(){
    //                (function(obj){
    //
    //                })(this);
    //            });
        },
        methods:{
            loadServerData: function (post_data) {
    
                console.log(post_data)
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
                var str = '<a href="task_detail.html?"'+row.id+'>'+task_name+'</a>';
                return str;
            },
            format_status: function (status) {
                if (status === '进行中') {
                    return '<span class="label label-success label-xs">'+status+'</span>';
                }
                if (status === '审核失败') {
                    return '<span class="label label-danger label-xs">'+status+'</span>';
                }
                return status;
            },
            debug: function () {
                console.log(this.$data)
            },
            edit_item: function (btn, row) {
                console.log('你点了我：', btn, row)
                //row 就是一行的数据
                alert('你点击了edit_item函数，详细数据请看console.log')
            },
            delete_item: function (btn, row) {
                console.log('你点了我：', btn, row)
                alert('你点击了delte_item函数，详细数据请看console.log')
            }
        }
    });