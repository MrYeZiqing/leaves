import {sum} from '../index';

test('测试sum函数',() => {
    expect(sum(1,2)).toBe(3);
});
test('测试字符串相加',() => {
    expect(sum(1,'2')).toBe(3);
});
