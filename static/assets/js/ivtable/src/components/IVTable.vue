<template>
  <table :class="[table_css || '']">
    <thead>
    <tr :class="[thead_tr_css || '']">
      <template v-for="(field, index) in table_columns">
        <template v-if="isSpecialField(field.name)">
          <th v-if="extractName(field.name) == '__checkbox'" :style="[ field.style || '' ]" :class="[field.title_css || '']">
            <input type="checkbox" @change="toggleAllCheckboxes(field, $event)">
          </th>
          <th v-if="extractName(field.name) == '__id'" :style="[ field.style || '' ]" :class="[field.title_css || '']">
            {{ getTitle(field) }}
          </th>
          <th v-if="extractName(field.name) == '__actions'" :style="[ field.style || '' ]" :class="[field.title_css || '']">
            {{ getTitle(field) }}
          </th>
          <th v-if="extractName(field.name) == '__component'"
              @click="orderBy(field, $event)"
              :class="[field.title_css, {'sortable': isSortable(field)}]"
              :style="[ field.style || '' ]"
              v-html="field.title || ''">
            <i v-if="isCurrentSortField(field) && field.title"
               :class="sortIcon(field)"
               :style="{opacity: sortIconOpacity(field)}"></i>
          </th>
        </template>
        <template v-if="!isSpecialField(field.name)">
          <th :id="('_' + index + '-' + field.name)" :style="[ field.style || '' ]" :class="[ field.title_css || '' ]">
            {{ getTitle(field) }}
          </th>
        </template>
      </template>
    </tr>
    </thead>
    <tbody :class="[ tbody_css || '' ]">
    <template v-if="!table_data || table_data.length < 1 || table_hint_text">
      <template v-if="table_hint_text">
        <tr :class="[ tbody_tr_css || '' ]"><td :colspan="[table_columns.length || '']">{{table_hint_text}}</td></tr>
      </template>
      <template v-if="!table_hint_text">
        <tr :class="[ tbody_tr_css || '' ]"><td :colspan="[ table_columns.length || '' ]">暂无数据</td></tr>
      </template>
    </template>
    <template v-if="!(!table_data || table_data.length < 1 || table_hint_text)">
      <template v-for="(item, item_index) in table_data">
        <tr :class="[ tbody_tr_css || '' ]">
          <template v-for="field in table_columns">
            <!--判断是否为特殊组件-->
            <template v-if="isSpecialField(field.name)">
              <td v-if="extractName(field.name) == '__checkbox'" :class="[{'ivtable-checkboxes': true}, field.data_css]">
                <input type="checkbox"
                       @change="toggleCheckbox(item, field.name, $event)"
                       v-if="hasCallback(field)"
                :disabled="callCallback(field, item)"
                :checked="rowSelected(item, field.name)">

                <input type="checkbox"
                       v-if="!hasCallback(field)"
                       @change="toggleCheckbox(item, field.name, $event)"
                       :checked="rowSelected(item, field.name)">
              </td>
              <td v-if="field.name == '__actions'" :class="[ field.data_css || '']">
                <template v-for="action in item_actions">
                  <template v-if="isDisplay(action)">
                    <template v-if="hasItem(action.tooltip)">
                      <label v-if="callActionItem(action, item)" :class="[ action.css || '']" @click="callAction(action, item, $event)" data-toggle="tooltip" data-placement="top" :title="action.tooltip">
                        <i :class="[ action.icon || '']"></i> {{ action.label }}
                      </label>&nbsp;
                    </template>
                    <template v-if="!hasItem(action.tooltip)">
                      <label v-if="callActionItem(action, item)" :class="[ action.css || '']" @click="callAction(action, item, $event)">
                        <i :class="[ action.icon || '']"></i> {{ action.label }}
                      </label>&nbsp;
                    </template>
                  </template>
                  <template v-if="!isDisplay(action)">
                    <template v-if="hasItem(action.tooltip)">
                      <label :class="[ action.css || '']" @click="callAction(action, item, $event)" data-toggle="tooltip" data-placement="top" :title="action.tooltip">
                        <i :class="[ action.icon || '']"></i> {{ action.label }}
                      </label>&nbsp;
                    </template>
                    <template v-if="!hasItem(action.tooltip)">
                      <label :class="[ action.css || '']" @click="callAction(action, item, $event)">
                        <i :class="[ action.icon || '']"></i> {{ action.label }}
                      </label>&nbsp;
                    </template>
                  </template>
                </template>
              </td>
              <td v-if="field.name == '__id'" :class="[ field.data_css || '']">
                {{ item_index + 1}}
              </td>
              <td v-if="extractName(field.name) === '__component'" :class="field.data_css">
                <component :is="extractArgs(field.name)" :row-data="item"></component>
              </td>
            </template>
            <template v-if="!isSpecialField(field.name)">
              <template v-if="!hasHtml(field)">
                <td v-if="hasCallback(field)"
                    :class="[ field.data_css || '']"
                    @click="onCellClicked(item, field, $event)"
                    @dblclick="onCellDoubleClicked(item, field, $event)"
                >
                  {{ callCallback(field, item) }}
                </td>
                <td v-else
                    :class="[ field.data_css || '']"
                    @click="onCellClicked(item, field, $event)"
                >
                  {{ getObjectValue(item, field.name, "") }}
                </td>
              </template>
              <!--渲染纯html-->
              <template v-if="hasHtml(field)">
                <td v-if="hasCallback(field)" :class="[ field.data_css || '']" @click="onCellClicked(item, field, $event)" v-html="callCallback(field, item)">
                </td>
                <td v-else :class="[ field.data_css || '']" @click="onCellClicked(item, field, $event)" v-html="getObjectValue(item, field.name, '')">
                </td>
              </template>
            </template>
          </template>
        </tr>

        <!--<template v-if="useDetailRow">-->
          <!--<tr @click="onDetailRowClick(item, $event)"-->
              <!--:class="[detail_row_class]"-->
          <!--&gt;-->
            <!--<transition :name="detail_row_transition">-->
              <!--<td :colspan="countVisibleFields">-->
                <!--<component :is="detail_row_component" :row-data="item" :row-index="item_index"></component>-->
              <!--</td>-->
            <!--</transition>-->
          <!--</tr>-->
        <!--</template>-->

        <template v-if="useDetailRow">
          <tr v-if="isVisibleDetailRow(item[track_by])"
              @click="onDetailRowClick(item, $event)"
              :class="[detail_row_class]"
          >
            <transition :name="detail_row_transition">
              <td :colspan="countVisibleFields">
                <component :is="detail_row_component" :row-data="item" :row-index="item_index"></component>
              </td>
            </transition>
          </tr>
        </template>


      </template>
    </template>
    </tbody>
  </table>
</template>

<script>

    export default {
        props: {
            table_hint_text: {
                default: '',
            },
            table_data: {
                default: [],
                required: true,
            },
            table_columns: {
                default: [],
                required: true,
            },
            table_result: {
                default: function(){return {selected: []}}
            },
            item_actions: {
                default: function() {
                    return [];
                }
            },
            table_css: {
                default: '',
            },
            thead_css: {
                default: ''
            },
            thead_tr_css: {
                default: ''
            },
            tbody_css: {
                default: ''
            },
            tbody_tr_css: {
                default: ''
            },
            detail_row_class: {
                default: ''
            },
            css: {
                type: Object,
                default () {
                    return {
                        table_css: '',
                        thead_css: '',
                        thead_tr_css: '',
                        tbody_css: '',
                        tbody_tr_css: '',
                        detail_row_class: '',
                    }
                }
            },
            sortOrder: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            track_by: {
                type: String,
                default: ""
            },
            detail_row_component: {
                type: String,
                default: ""
            },
            detail_row_transition: {
                type: String,
                default: ''
            },
        },
        data: function() {
            return {
                eventPrefix: 'ivtable:',
                visible_detail_rows: [1],
            }
        },
        created () {

        },
        watch: {

        },
        computed: {
            countVisibleFields () {
                return this.table_columns.length
            },
            useDetailRow () {
                if (this.table_data && this.table_data[0] && this.detail_row_component !== '' && typeof this.table_data[0][this.track_by] === 'undefined') {
                    this.warn('You need to define unique row identifier in order for detail-row feature to work. Use `track-by` prop to define one!')
                    return false
                }
                return this.detail_row_component !== ''
            },
        },
        methods: {

            isVisibleDetailRow (rowId) {
                return this.visible_detail_rows.indexOf( rowId ) >= 0
            },
            showDetailRow (rowId) {
                if (!this.isVisibleDetailRow(rowId)) {
                    this.visible_detail_rows.push(rowId)
                }
            },
            hideDetailRow (rowId) {
                if (this.isVisibleDetailRow(rowId)) {
                    this.visible_detail_rows.splice( this.visible_detail_rows.indexOf(rowId), 1 )
                }
            },
            toggleDetailRow (rowId) {
                if (this.isVisibleDetailRow(rowId)) {
                    this.hideDetailRow(rowId)
                } else {
                    this.showDetailRow(rowId)
                }
            },
            onDetailRowClick (dataItem, event) {
                this.$emit(this.eventPrefix + 'detail-row-clicked', dataItem, event)
            },
            isSpecialField: function(fieldName) {
                // return fieldName.startsWith('__')
                return fieldName.slice(0, 2) === '__'
            },
            callAction: function(action, data, event) {
                if ( ! this.hasCallback(action))
                    return;
                if(typeof this.$parent[action.callback] == 'function') {
                    return this.$parent[action.callback].apply(action.callback, [action].concat(data));
                }
                this.$emit(this.eventPrefix + 'action', action, data, event)
            },
            callActionItem: function (action, item) {
                if ( ! this.isDisplay(action))
                    return true;
                if ( typeof this.$parent[action.displayed] == 'function' ) {
                    return this.$parent[action.displayed].apply(action, [item].concat(action));
                }
                return false;
            },
            getTitle: function(field) {
                if (typeof field.title === 'undefined') {
                    return field.name.replace('.', ' ')
                }
                return field.title
            },
            isSortable: function(field) {
                return !(typeof field.sortField === 'undefined')
            },
            isCurrentSortField: function(field) {
                return this.currentSortOrder(field) !== false;
            },
            currentSortOrder: function(field) {
                if ( ! this.isSortable(field)) {
                    return false
                }
                for (var i = 0; i < this.sortOrder.length; i++) {
                    if (this.sortOrder[i].field === field.name) {
                        return i;
                    }
                }
                return false;
            },
            hasItem: function(item) {
                if (item) {
                    return true;
                }
                return false;
            },
            hasCallback: function(item) {
                return item.callback ? true : false
            },
            hasHtml: function(item) {
                return item.html ? true : false
            },
            isDisplay: function(item) {
                if(!item) return false;
                return item.displayed ? true: false
            },
            extractName: function(string) {
                return string.split(':')[0].trim()
            },
            extractArgs: function(string) {
                return string.split(':')[1]
            },
            toggleCheckbox: function(dataItem, fieldName, event) {
                var isChecked = event.target.checked;
                var idColumn = this.extractArgs(fieldName);
                if (idColumn === undefined) {
                    this.warn('You did not provide reference id column with "__checkbox:<column_name>" field!')
                    return
                }
                var key = dataItem[idColumn]
                if (isChecked) {
                    this.selectId(key)
                } else {
                    this.unselectId(key)
                }
            },
            selectId: function(key) {
                if ( ! this.isSelectedRow(key)) {
                    this.table_result.selected.push(key)
                }
            },
            unselectId: function(key) {
                this.table_result.selected = this.table_result.selected.filter(function(item) {
                    return item !== key;
                });
            },
            isSelectedRow: function(key) {
                return this.table_result.selected.indexOf(key) >= 0
            },
            rowSelected: function(dataItem, fieldName){
                var idColumn = this.extractArgs(fieldName)
                var key = dataItem[idColumn];
                return this.isSelectedRow(key);
            },
            toggleAllCheckboxes: function(field, event) {
                var self = this;
                var fieldName = field.name;
                var isChecked = event.target.checked;
                var idColumn = this.extractArgs(fieldName);
                if (isChecked) {
                    this.table_data.forEach(function(dataItem) {
                        if(! self.callCallback(field, dataItem)) {   //以后可能会有问题
                            self.selectId(dataItem[idColumn]);
                        }
                    })
                } else {
                    this.table_data.forEach(function(dataItem) {
                        if(! self.callCallback(field, dataItem)) {   //以后可能会有问题
                            self.unselectId(dataItem[idColumn]);
                        }

                    })
                }
            },
            callCallback: function(field, item) {
                if ( ! this.hasCallback(field))
                    return;
                var args = field.callback.split('|');
                var func = args.shift();
                if (typeof this.$parent[func] == 'function') {
                    return (args.length > 0)
                        ? this.$parent[func].apply(this.$parent, [this.getObjectValue(item, field.name)].concat(args))
                        : this.$parent[func].call(this.$parent, this.getObjectValue(item, field.name), item)
                }
                return null;
            },
            onCellClicked: function(data_item, field, event) {
                this.$emit(this.eventPrefix + 'cell-clicked', data_item, field, event)
            },
            onCellDoubleClicked (dataItem, field, event) {
                this.$emit(this.eventPrefix + 'cell-dblclicked', dataItem, field, event)
            },
            getObjectValue: function(object, path, defaultValue) {
                defaultValue = (typeof defaultValue == 'undefined') ? null : defaultValue;
                var obj = object;
                if (path.trim() != '') {
                    var keys = path.split('.')
                    keys.forEach(function(key) {
                        if (obj !== null && typeof obj[key] != 'undefined' && obj[key] !== null) {
                            obj = obj[key]
                        } else {
                            obj = defaultValue
                            return
                        }
                    })
                }
                return obj
            },
        }, // end: methods

    }



    /**
     * table_hint_text: '数据加载中... | 暂无数据'  //此数据属性有数据时，不显示数据表的数据
     * table_columns 数据结构如下
     * tableColumns: [
     * {
         *     name: 'activity_id',
         *     title: '活动ID',      //列头
         *     title_css: '',     //table>thead>tr>th class
         *     data_css: '',      //table>tbody>tr>td class
         *     style: 'width: 80px;',
         *     callback: ''    //对该列值进行处理的回调函数
         * },
     * {
         *     name: 'activity_type',
         *     title: '活动类型',
         *     title_css: '',
         *     data_css: '',
         *     style: 'width: 80px;'
         * },
     * {
         *      name: '__actions',  //操作选项
         *      title_css: '',
         *      data_css: '',
         *      title: '操作',
         * }
     * ]
     *
     * table_data 数据结构如下：
     * table_data: [
     *  {
         *      'activity_id': '1',
         *      'activity_type': '全国活动'
         *  },
     *  {
         *      'activity_id': '2',
         *      'activity_type': '安徽省内活动'
         *  }
     * ]
     *
     * item_actions: [
     *  { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button', displayed: 'action_allow_info' }, //action_allow_info返回 true或false，返回true时显示此控件，返回false时不显示
     *  { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button', displayed: 'action_allow_edit' },
     * ]
     * */
</script>