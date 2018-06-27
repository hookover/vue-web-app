<template>

    <div class="inline-block">
    <div class="input-group" style="max-width: 500px;padding-top: 5px;">
        <span class="input-group-addon">从</span>
        <input v-bind:name="name_from" class="form-control date data-filter" placeholder="开始日期" data-date-format="YYYY-MM-DD" type="text">
        <span class="input-group-addon middle-addon">到</span>
        <input v-bind:name="name_to" class="form-control date data-filter" placeholder="结束日期"  data-date-format="YYYY-MM-DD" type="text">
        </div>
    </div>

</template>


<script>

    export default {
        props: {
            date_range: {
                required: true
            },
            name_from: {
                default: 'from' + Math.ceil(Math.random() * 999999)
            },
            name_to: {
                default: 'to' + Math.ceil(Math.random() * 999999)
            }
        },
        watch: {
            'date_range.from':  function (val, old) {
                if(val === '') {
                    $('[name='+this.name_from+']').datepicker('setDate', null)
                }
            },
            'date_range.to':  function (val, old) {
                if(val === '') {
                    $('[name='+this.name_to+']').datepicker('setDate', null)
                }
            },
        },
        mounted: function () {
            let _self = this;
            this.$parent.$nextTick(function () {
                let form_obj = $('[name='+_self.name_from+']');
                let to_obj = $('[name='+_self.name_to+']');

                form_obj.on('change', function () {
                    // _self.date_range.from = $(this).val();
                    _self.$set(_self.date_range, 'from', $(this).val())
                });
                to_obj.on('change', function () {
                    // _self.date_range.to = $(this).val();
                    _self.$set(_self.date_range, 'to', $(this).val())
                });

                let nowTemp = new Date();
                let now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

                let checkin = form_obj.datepicker({
                    format: "yyyy-mm-dd",
                    language: "zh-CN",
                    autoclose: true,
                }).on('changeDate', function(ev) {
                    checkin.hide();
                    $('[name='+_self.name_to+']')[0].focus();
                }).data('datepicker');
                let checkout = to_obj.datepicker({
                    format: "yyyy-mm-dd",
                    language: "zh-CN",
                    autoclose: true,
                }).on('changeDate', function(ev) {
                    checkout.hide();
                }).data('datepicker');

            });
        }
    }
</script>