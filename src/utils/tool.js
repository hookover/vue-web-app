import store from '../vuex/store'
import grids from '../utils/grids'
import common from '../common/common'
/**
 *   Toast公共方法
 */

export function toast(message, type, time, position, is_show_mask) {
    if (!message) {
        store.dispatch('updateToast', {show: false});
    } else {
        let params = {
            time:         (!isNaN(time) && time > 100) ? time : 2000,
            type:         type ? type : 'text',//类型，可选值 success, warn, cancel, text
            is_show_mask: is_show_mask ? Boolean(is_show_mask) : false,
            text:         message ? message : '成功啦~',
            position:     position ? position : 'bottom',
            show:         true
        };
        store.dispatch('updateToast', params);
    }
}
/**
 *
 * @param content       当content为false或不传时 隐藏dialog
 * @param time
 * @param blur_hide
 */
export function toastDialog(content, time, blur_hide) {
    if (!content) {
        store.dispatch('updateToastDialog', {show: false});
    } else {
        let params = {
            time:      (!isNaN(time) && time > 0) ? time : 0,
            content:   content,
            blur_hide: Boolean(blur_hide),
            show:      true
        };
        store.dispatch('updateToastDialog', params);
    }
}

export function go(url, $router) {
    if (/^javas/.test(url) || !url) return
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
    if (useRouter) {
        url === 'BACK' ? $router.go(-1) : $router.push(url)
    } else {
        window.location.href = url
    }
}

export function getUrl(url, $router) {
    // Make sure the href is right in hash mode
    if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
        return `#!${url}`
    }
    return url && typeof url !== 'object' ? url : 'javascript:void(0);'
}

export function isShowWorkerSubAccountsDialog(channel_id) {
    switch (channel_id) {
        case grids.all.taobao.id:        //淘宝
        case grids.all.tmall.id:
        case grids.all.jd.id:
            return true;
        default:
            return false;
    }
}

export function countDown(selecter, datetime) {
    $(selecter).countdown({
        date:   datetime,
        render: function (data) {
            $(this.el).html(this.leadingZeros(data.min, 2) + ':' + this.leadingZeros(data.sec, 2));
        }
    });

}

export function checkUrl(url) {
    let re = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
    let reb= /http(s)?:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;

    if(re.test(url) || reb.test(url)){
        return true;
    } else {
        return false;
    }
}

export function textScroll(selecter, mt_px, animate_time, intervals_time) {
    animate_time   = animate_time ? animate_time : 1000;
    intervals_time = intervals_time ? intervals_time : 1000;
    mt_px = mt_px ? mt_px : '-50px';

    let obj = $(selecter).find("ul");
    return setInterval(function () {
        obj.animate({
            marginTop: mt_px
        }, Number(animate_time), function () {
            $(this).css({
                marginTop: "0"
            }).find("li:first").appendTo(this);
        })
    }, Number(intervals_time));
}
export function convertPathToImageUrl(path) {
    return path
}

export function objToHttpParams(params) {
    if(params && !$.isEmptyObject(params)) {
        let str = '';
        for(let n in params) {
            str += n +'=' + params[n] +'&'
        }

        return '?' + str.substring(0, str.lastIndexOf('&'));
    }
    return '';
}

export function formatYen(yen) {
    if(yen) {
        return format('###,###0.00', yen);
    }
    return '0.00';
}

export function arrItemRemove (arr, item) {
    if (arr.length) {
        let index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
    return arr;
}

export function shareUrl(promotion_code) {
    return common.SHARE_DOMAIN_URL + '#/share?code=' + (promotion_code ? promotion_code : 0)
}