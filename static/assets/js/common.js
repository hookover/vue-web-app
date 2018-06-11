moment.locale('zh-cn');


//接收地址栏参数
function GetQuery(key) {
    var search = location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == key) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
/*
 请求Ajax 带返回值
 */
function getAjax(url, callBack) {
    $.ajax({
        type: 'get',
        dataType: "json",
        url: url,
        async: false,
        success: function (data) {
            callBack(data);
        },
        error: function (data) {
            alert("网络延时，请稍后再试");
        }
    });
}
function AjaxJson(url, postData, callBack) {
    $.ajax({
        url: url,
        type: "post",
        data: postData,
        dataType: "json",
        async: false,
        success: function (data) {
            callBack(data);
        },
        error: function (data) {
            alert("网络延时，请稍后再试");
        }
    });
}
//返回上一页
function Back() {
    window.setTimeout(function() {
        window.history.back();
    }, 500);
}
//刷新当前页面
function Replace() {
    window.setTimeout(function() {
        location.reload();
    }, 500);
}
//href跳转页面
function Urlhref(url) {
    window.setTimeout(function() {
        location.href = url;
    }, 500);
}
//跳转到登录页面
function JumpLogin(path){
    window.setTimeout(function() {
        Urlhref(path + '/web/login/login');
    }, 1000);
}
//获取选中复选框值
//值：1,2,3,4
function CheckboxValue() {
    var reVal = '';
    $('[type = checkbox]').each(function () {
        if ($(this).attr("checked")) {
            reVal += $(this).val() + ",";
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    return reVal;
}
$(function(){
    //文本框只允许输入数字
    $.fn.numeral = function() {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function(e) {
            var e = e || event;
            var currKey = e.keyCode || e.which || e.charCode;
            if (currKey == 46) {
                if (this.value.indexOf(".") == -1) {
                    return false;
                }
            } else {
                return currKey >= 46 && currKey <= 57 || currKey == 8;
            }
        });
        this.bind("blur", function() {
            $(this).val($(this).val().replace(/D|^0/g,''));
        });
        this.bind("paste", function() {
            $(this).val($(this).val().replace(/D|^0/g,''));
        });
        this.bind("dragenter", function() {
            $(this).val($(this).val().replace(/D|^0/g,''));
        });
        this.bind("keyup", function() {
            $(this).val($(this).val().replace(/\D|^0/g,''));
        });
    };
    //只能输入数字和小数点
    $.fn.money = function() {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function(e) {
            var e = e || event;
            var currKey = e.keyCode || e.which || e.charCode;
            if (this.value.indexOf(".") == -1) {
                return (currKey >= 48 && currKey <= 57) || (currKey == 46);
            } else {
                return currKey >= 48 && currKey <= 57
            }
        });
        this.bind("paste", function() {
            $(this).val($(this).val().replace(/[^0-9.]/g,''));
        });
        this.bind("keyup", function() {
            $(this).val($(this).val().replace(/[^0-9.]/g,''));
        });
        this.bind("blur", function() {
            $(this).val($(this).val().replace(/[^0-9.]/g,''));
        });
    };
});
// 金额格式(保留2位小数)后格式化成金额形式
function FormatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
/*
 * formatMoney(v)
 * 功能：金额按千位逗号分割
 * 参数：v，需要格式化的金额数值.
 * 返回：返回格式化后的数值字符串.
 */
function formatMoney(v) {
    if (isNaN(v)) {
        return v;
    }
    v = (Math.round((v - 0) * 100)) / 100;
    v = (v == Math.floor(v)) ? v + ".00": ((v * 10 == Math.floor(v * 10)) ? v + "0": v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.' + ps[1] : '.00';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;

    return v;
}
//保留两位小数
//功能：将浮点数四舍五入，取小数点后2位
function ToDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return 0;
    }
    f = Math.round(x * 100) / 100;
    return f;
}
/**
 查找数组中是否存在某个值
 arr:数组
 val:对象值
 **/
function ArrayExists(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val)
            return true;
    }
    return false;
}
/*
 验证是否为空
 */
function IsNullOrEmpty(str) {
    var isOK = true;
    if (str == undefined || str == "" || str == 'null' || str == null) {
        isOK = false;
    }
    return isOK;
}
/*
 * 检测密码强度
 */
function CheckIntensity(password){
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");

    if (false == enoughRegex.test(password)) {
        return 0;
        // 密码小于六位的时候，密码强度图片都为灰色
    } else if (strongRegex.test(password)) {
        return 3;
        // 密码为八位及以上并且字母数字特殊字符三项都包括,强度最强
    } else if (mediumRegex.test(password)) {
        return 2;
        // 密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
    } else {
        return 1;
        // 如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
    }
}