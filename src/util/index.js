import {validatenull} from "./validate";
import request from "@/router/axios";
import * as CryptoJS from "crypto-js";

// 表单序列化
export const serialize = data => {
    const list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join("&");
};
export const getObjType = obj => {
    var toString = Object.prototype.toString;
    var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
    };
    if (obj instanceof Element) {
        return "element";
    }
    return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data);
    var obj;
    if (type === "array") {
        obj = [];
    } else if (type === "object") {
        obj = {};
    } else {
        // 不再具有下一层次
        return data;
    }
    if (type === "array") {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === "object") {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
    delete obj1.close;
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    if (!o1 || !o2) {
        /*  判断不是对象  */
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }

    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }
    return true;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = status => {
    if (status) {
        document.body.className = document.body.className + " grayMode";
    } else {
        document.body.className = document.body.className.replace(" grayMode", "");
    }
};
/**
 * 设置主题
 */
export const setTheme = name => {
    document.body.className = name;
};

/**
 *加密处理
 */
export const encryption = params => {
    let {data, type, param, key} = params;
    const result = JSON.parse(JSON.stringify(data));
    if (type === "Base64") {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        });
    } else {
        param.forEach(ele => {
            var data = result[ele];
            key = CryptoJS.enc.Latin1.parse(key);
            var iv = key;
            // 加密
            var encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            });
            result[ele] = encrypted.toString();
        });
    }
    return result;
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
    function listen() {
        callback();
    }

    document.addEventListener("fullscreenchange", function () {
        listen();
    });
    document.addEventListener("mozfullscreenchange", function () {
        listen();
    });
    document.addEventListener("webkitfullscreenchange", function () {
        listen();
    });
    document.addEventListener("msfullscreenchange", function () {
        listen();
    });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    return (
        document.isFullScreen ||
        document.mozIsFullScreen ||
        document.webkitIsFullScreen
    );
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children.length !== 0) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (menu[i].children[j].id === id) {
                    return menu[i];
                } else {
                    if (menu[i].children[j].children.length !== 0) {
                        return findParent(menu[i].children[j].children, id);
                    }
                }
            }
        }
    }
};

/**
 * 动态插入css
 */

export const loadStyle = url => {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
    let result = true;
    Object.keys(a).forEach(ele => {
        const type = typeof a[ele];
        if (type === "string" && a[ele] !== b[ele]) result = false;
        else if (
            type === "object" &&
            JSON.stringify(a[ele]) !== JSON.stringify(b[ele])
        )
            result = false;
    });
    return result;
};
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
    let result = "";
    if (validatenull(dic)) return value;
    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        let index = 0;
        index = findArray(dic, value);
        if (index !== -1) {
            result = dic[index].label;
        } else {
            result = value;
        }
    } else if (value instanceof Array) {
        result = [];
        let index = 0;
        value.forEach(ele => {
            index = findArray(dic, ele);
            if (index !== -1) {
                result.push(dic[index].label);
            } else {
                result.push(value);
            }
        });
        result = result.toString();
    }
    return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
    for (let i = 0; i < dic.length; i++) {
        if (dic[i].value === value) {
            return i;
        }
    }
    return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = "";
    random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, len || 4);
    if (date) random = random + Date.now();
    return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : screen.top;

    const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
    const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;

    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;
    const newWindow = window.open(
        url,
        title,
        "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        top +
        ", left=" +
        left
    );

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
};

/**
 *  <img> <a> src 处理
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */
export function handleImg(url, id) {
    return validatenull(url)
        ? null
        : request({
            url: url,
            method: "get",
            responseType: "blob"
        }).then(response => {
            // 处理返回的文件流
            const blob = response.data;
            const img = document.getElementById(id);
            img.src = URL.createObjectURL(blob);
            window.setTimeout(function () {
                window.URL.revokeObjectURL(blob);
            }, 0);
        });
}

/**
 *
 * @param url 目标下载接口
 * @param query 查询参数
 * @param fileName 文件名称
 * @returns {*}
 */
export function downBlobFile(url, query, fileName) {
    return request({
        url: url,
        method: "get",
        responseType: "blob",
        params: query
    }).then(response => {
        // 处理返回的文件流
        const blob = response.data;
        if (blob && blob.size === 0) {
            this.$notify.error("内容为空，无法下载");
            return;
        }
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        window.setTimeout(function () {
            window.URL.revokeObjectURL(blob);
            document.body.removeChild(link);
        }, 0);
    });
}

export function getQueryString(url, paraName) {
    const arrObj = url.split("?");
    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split("&");
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            // eslint-disable-next-line eqeqeq
            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    } else {
        return "";
    }
}

/**
 * 计算屏幕大小
 * @returns {number}
 */
export function calcScreen() {
    let width = document.body.clientWidth;
    if (width >= 1200) {
        return 3; // 大屏幕
    } else if (width >= 992) {
        return 2; // 中屏幕
    } else if (width >= 768) {
        return 1; // 小屏幕
    } else {
        return 0; // 超小屏幕
    }
}

export const getScreen = (isCollapse) => {
    if (document.body.clientWidth <= 768) {
        return !isCollapse
    } else {
        return isCollapse
    }
}
/*
 * formatMoney(s,type)
 * 功能：金额按千位逗号分割
 * 参数：s，需要格式化的金额数值.
 * 参数：type,判断格式化后的金额是否需要小数位.
 * 返回：返回格式化后的数值字符串.
 */
export function formatMoney(s, type) {
    if (/[^0-9\.]/.test(s)) { return '--' }
    if (s == null || s === '') { return '--' }
    s = s.toString().replace(/^(\d*)$/, '$1.')
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
    s = s.replace('.', ',')
    var re = /(\d)(\d{3},)/
    while (re.test(s)) { s = s.replace(re, '$1,$2') }
    s = s.replace(/,(\d\d)$/, '.$1')
    if (type === 0) { // 不带小数位(默认是有小数位)
        var a = s.split('.')
        if (a[1] === '00') {
            s = a[0]
        }
    }
    return s
}

/**
 * 判断文件类型
 * @param url
 * @returns {*}
 */
export function isImage(url) {
    if (!url || url === '') {
        return false
    }
    const fileIndex = url.lastIndexOf('.')
    const substrName = url.substr(fileIndex) // 截取.之后的文件格式
    const formatImg = /.(jpg|gif|png|jpeg)$/i
    if (formatImg.test(substrName)) {
        return true
    } else {
        return false
    }
}

/**
 * 判断文件类型
 * @param text
 * @returns {*}
 */
export function isPDF(url) {
    if (!url || url === '') {
        return false
    }
    const fileIndex = url.lastIndexOf('.')
    const substrName = url.substr(fileIndex) // 截取.之后的文件格式
    const formatImg = /.pdf$/i
    if (formatImg.test(substrName)) {
        return true
    } else {
        return false
    }
}
// 替换手机字符
export function regMobile(mobile) {
    if (mobile.length > 7) {
        var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
    }
    return new_mobile
}
/**
 *
 * @param url 目标下载接口
 * @param query 查询参数
 * @param fileName 文件名称
 * @returns {*}
 */
export function downFileBlob(url, query, fileName) {
    return request({
        url: url,
        method: "POST",
        responseType: "blob",
        data: query
    }).then(response => {
        // 处理返回的文件流
        const blob = response.data;
        if (blob && blob.size === 0) {
            this.$notify.error("内容为空，无法下载");
            return;
        }
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        window.setTimeout(function () {
            window.URL.revokeObjectURL(blob);
            document.body.removeChild(link);
        }, 0);
    });
}

export function toSplitNum(amount) { // 以分为单位
    // 最大处理的数字
    const maxNum = 999999999999
    if (!amount || amount === '' || !Number(amount)) {
        return []
    }
    amount = parseFloat(amount)
    if (amount >= maxNum) {
        // 超出最大处理数字
        return []
    }
    // 转换为字符串
    const curAry = amount.toString().split('').reverse()
    return curAry
}
