export function sum (a,b) {
    return Number(a) + Number(b);
}

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

export function getArrayValue (arr,defalutVal = undefined) {
    if (!arr || !Array.isArray(arr)) { return defalutVal; }
    return arr;
}
