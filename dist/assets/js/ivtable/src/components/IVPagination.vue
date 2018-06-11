<template>

    <div class="row" v-if="this.page_data.data_total > 0">
        <div class="col-lg-6 hidden-phone hidden-xs hidden-sm">
            <div class="dataTables_info">第 {{ page_data.data_from }} 到 {{ page_data.data_to }} 条 共计 {{ page_data.data_total }} 条</div>
        </div>
        <div class="col-lg-6">
            <div class="dataTables_paginate paging_bootstrap pagination">
                <ul>
                    <li class="first" v-bind:class="{ disabled: page_data.page_cur <= 1 }"><a href="javascript:void(0)" v-on:click="pagination_first">首页</a></li>
                    <li class="prev" v-bind:class="{ disabled: page_data.page_cur <= 1 }"><a href="javascript:void(0)" v-on:click="pagination_previous">← 上一页</a></li>
                    <span>
              <li v-for="button_num in pagination_buttons" v-bind:class="{active: page_data.page_cur == button_num}" v-on:click="pagination_button_click($event)" :data-value="button_num"><a href="javascript:void(0)">{{ button_num }}</a></li>
              </span>
                    <li class="next" v-bind:class="{ disabled: page_data.page_cur >= page_data.page_total }"><a href="javascript:void(0)" v-on:click="pagination_next">下一页 → </a></li>
                    <li class="last" v-bind:class="{ disabled: page_data.page_cur >= page_data.page_total }"><a href="javascript:void(0)" v-on:click="pagination_last">末页</a></li>

                    <!--<span class="paginate_skip_text">&nbsp;&nbsp;转到&nbsp;</span>-->
                    <!--<input class="input-inline" v-model="pagination_goto_num" style="width: 40px; height: 18px;" type="text" v-on:change="pagination_goto($event)">-->
                    <!--<span class="paginate_skip_text">&nbsp;&nbsp;/&nbsp;&nbsp;{{ page_data.page_total }}页</span>-->
                </ul>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        props: {
            pagination_button_length: {
                default: 7
            },
            page_data: {
                required: true,
            }
        },
        data: function () {
            return {
                pagination_goto_num: ''
            }
        },
        watch: {
            page_data: {
                handler: function (val, old) {
                    this.$set(this, 'pagination_button_length',parseInt(this.pagination_button_length ? this.pagination_button_length : 7));
                    this.$set(this.page_data, 'page_total',parseInt(this.page_data.page_total ? this.page_data.page_total : 0));
                    this.$set(this.page_data, 'data_total', parseInt(this.page_data.data_total ? this.page_data.data_total : 1));
                    this.$set(this.page_data, 'page_size',parseInt(this.page_data.page_size ? this.page_data.page_size : 1));
                    this.$set(this.page_data, 'page_cur',parseInt(this.page_data.page_cur ? this.page_data.page_cur : 1));
                    this.$set(this.page_data, 'data_from', parseInt(this.page_data.page_size * (this.page_data.page_cur - 1) + 1));
                    this.$set(this.page_data, 'data_to', parseInt(this.page_data.page_size * (this.page_data.page_cur - 1) + this.page_data.rows.length));
                }
            },
            deep: true,
        },
        computed: {
            page_total: function () {
                if(this.page_data.page_size <= 0) {
                    this.page_data.page_size = 10;
                }
                if(this.page_data.data_total <= 0) {
                    return 0;
                }

                let data_page_total = Math.ceil( parseInt(this.page_data.data_total) / parseInt(this.page_data.page_size) );

                if(this.page_data.page_total !== data_page_total) {
                    this.page_data.page_total = data_page_total;
                }

                return this.page_data.page_total;
            },
            pagination_buttons: function() {
                let arr = [],left=-1,right= 1;

                if(this.page_data.page_cur > this.page_total) {
                    this.page_data.page_cur = this.page_total;
                }
                if(this.page_data.page_cur < 1) {
                    this.page_data.page_cur = 1;
                }
                if(this.page_data.data_total <= 0) {
                    console.log('总数据条数若小于等于0，拒绝渲染');
                    return;
                }

                //进自己
                arr.push(this.page_data.page_cur);
                for(let i=0; i < this.pagination_button_length; ++i) {
                    //右进页码
                    if(this.page_data.page_cur + right <= this.page_total  && arr.length <= this.pagination_button_length) {
                        arr.push(this.page_data.page_cur + right);
                        ++right;
                    }
                    //左进页码
                    if(this.page_data.page_cur + left >= 1 && arr.length <= this.pagination_button_length) {
                        arr.unshift(this.page_data.page_cur + left);
                        --left;
                    }
                }

                if(!isNaN(parseInt(arr[arr.length - 1])) && arr[arr.length - 1] < this.page_total) {
                    arr.push('...');
                }
                if(!isNaN(parseInt(arr[0])) && arr[0] > 1) {
                    arr.unshift('...');
                }
                return arr;
            }
        },
        methods: {
            pagination_first: function () {
                this.page_data.page_cur = 1;
            },
            pagination_last: function () {
                this.page_data.page_cur = this.page_total;
            },
            pagination_previous: function () {
                if(this.page_data.page_cur - 1 >= 1) {
                    parseInt(-- this.page_data.page_cur);
                }
            },
            pagination_next: function () {
                if(this.page_data.page_cur + 1 <= this.page_total) {
                    parseInt(++ this.page_data.page_cur);
                }
            },
            pagination_button_click: function (event) {
                if(event.currentTarget.getAttribute('data-value') != '...') {
                    this.page_data.page_cur = parseInt(event.currentTarget.getAttribute('data-value'));
                } else {
                    if(!event.currentTarget['nextSibling']) {
                        let target = this.page_data.page_cur + this.pagination_button_length;
                        this.page_data.page_cur = target <= this.page_total ? target : this.page_total;

                    } else {
                        let target = parseInt(this.page_data.page_cur) - this.pagination_button_length;
                        this.page_data.page_cur = target >=1 ? target : 1;
                    }
                }
            },
            pagination_goto: function (event) {
                this.page_data.page_cur = event.currentTarget.value ? parseInt(event.currentTarget.value) : 1;
            }
        }
    }

    /**
     * 分页组件
     * <ivpagination :page_data="you.data"></ivpagination>
     * 传入page_data对象中的数据名称如下
     * page_data.data_total: 999  数据总数
     * page_data.page_total: 10   页码总数，可不传
     * page_data.page_size: 10,   页码大小,默认为10
     * page_data.page_cur: 8,     当前页码
     * page_data.data_from: 1,    第N条数据gi
     * page_data.data_end: 999,   到M条数据，可不传
     * */
</script>