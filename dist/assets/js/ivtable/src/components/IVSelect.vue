<template>

    <select v-on:change="data.selected = $event.target.value" v-bind:class="css" v-bind:style="style" v-bind:name="name" v-model="data.selected">
    <template v-for="option in data.options">
        <option v-bind:value="option.value">{{ option.text }}</option>
        </template>
    </select>

</template>


<script>

    export default {
        props: {
            css: {
                default: ''
            },
            style: {
                default: ''
            },
            name: {
                default: 'SelectComponent' + Math.ceil(Math.random() * 10000000)
            },
            data: {
                required: true,
                default: {
                    selected: '',
                    options: [
                        {value:'', text:'未传选项值'}
                    ]
                }
            }
        },
    }

    /**
     * 参数
     * name html的name标签
     * style style代码
     * css class标签
     * data.selected 选中项的值
     * data.options 选项数组
     * [{ text: '审核通过', value: '1'},{ text: '审核通过', value: '2'}]
     **/
</script>