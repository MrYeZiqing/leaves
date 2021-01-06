import {getArrayValue} from '../index';

const arr = [1,2,3];

test('测试数组获取',() => {
    expect(getArrayValue(arr)).toEqual([1,2,3]);
    expect(getArrayValue(null)).toEqual(undefined);
    expect(getArrayValue({})).toEqual(undefined);
    expect(getArrayValue({},null)).toEqual(null);
    expect(getArrayValue('1',null)).toEqual(null);
});
