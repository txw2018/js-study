const currying = (fn,arr = []) => {
    let len = fn.length

    return function(...args){
        let concatValue = [...arr,...args]
       if(arr.length < len){
           return currying(fn,arr)
       }else{
           return fn(...concatValue)
       }
    }
}

function isType(type,value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}


let isArray = currying(isType)('Array')

console.log(isArray([]));

function sum(a,b,c,d,e,f){
    return a+ b+c+d+e+f
}

let r = currying(sum)(1,2)(3,4)(5)(6)
console.log(r);