import {getObjectValue} from '../index';
const obj = {
    a:{
        a1:1
    }
};
test('测试对象取值',() => { 
    expect(getObjectValue(obj,'a.a1')).toBe(1);
});
test('测试不是对象情况',() => {
    expect(getObjectValue([],'a.a1')).toBe(undefined);
    expect(getObjectValue(null,'a.a1')).toBe(undefined);
    expect(getObjectValue(undefined,'a.a1')).toBe(undefined);
});

test('测试key不存在或者不是字符串',() => {
    expect(getObjectValue(obj)).toBe(undefined);
    expect(getObjectValue(null,1)).toBe(undefined);
    expect(getObjectValue(obj,1)).toBe(undefined);
});

test('测试defalutVal是否按预期输出',() => {
    expect(getObjectValue(obj,'a.b',null)).toBe(null);
});
