/**
 *  对象安全取值
 * @param {Object} obj
 * @param {String} key
 * @param {any} defalutVal
 * @return {any}
 */
export function getObjectValue (obj,key,defalutVal = undefined) {
    if (!obj || !key) { return defalutVal; }
    const namespace = key.toString().split('.');
    let value,i = 0;
    const len = namespace.length;
    for (;i < len;i++) {
        value = obj[namespace[i]];
        if (value === undefined || value === null) { return defalutVal; }
        obj = value;
    }
    return value;
}

/**
 * 获取url参数
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getUrlParam (name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    } else {
        return null;
    }
}
