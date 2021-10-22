// [1, [2, [3, [4, 5]]], 6]  -> [1, 2, 3, 4, 5, 6]
let ary = [1, [2, [3, [4, 5]]], 6]
let str = JSON.stringify(ary);
//1.调用es6的flat方法
ary = ary.flat(Infinity)
//2.replace + split
ary = str.replace(/(\[|\])/g,'').split(',')

//3.递归
function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}