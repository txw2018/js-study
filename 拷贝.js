var arr = [{name:1},1]
//1.数组的浅拷贝

var new_arr = arr.slice()

//实现浅拷贝
var shallowCopy = function(obj){
    if(typeof obj !== 'object') return
    var newObj = obj instanceof Array ? [] : {}

    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key]= obj[key]
        }
    }
    return newObj
}


//2.深拷贝
//JSON.parse(JSON.stringify()) 缺点：无法拷贝函数
var new_arr = JSON.parse(JSON.stringify(arr))

//实现深拷贝

var deepCopy = function(obj){
    if(typeof obj !== 'object') return
    var newObj = obj instanceof Array ? [] : {}

    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj,key)) {
           newObj[key] = obj[key] && typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]            
        }
    }
    return newObj
}

const getType = Object.prototype.toString.call(obj);

const canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
};

const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const isObject = (target) => (typeof target === 'object' || typeof target=== 'function') && target !== null

const handleRegExp = (target) => {
    const {source,flags} = target
    return new target.constructor(source,flags)
}

const handleFunc = (func) => {
    // 箭头函数直接返回自身
    if(!func.prototype) return func;
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if(!body) return null;
    if (param) {
      const paramArr = param[0].split(',');
      return new Function(...paramArr, body[0]);
    } else {
      return new Function(body[0]);
    }
}

const handleNotTraverse = (target,tag) => {
    const Ctor = target.constructor;
    switch(tag){
        case boolTag:
            return new Object(Boolean.prototype.valueOf.call(target));
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target));
        case stringTag:
            return new Object(String.prototype.valueOf.call(target));
        case errorTag:
        case dateTag:
            return new Ctor(target)
        case regexpTag:
            return handleRegExp(target)
        case funcTag:
            return handleFunc(target)
        default:
            return new Ctor(target)
    }
}

const deepClone = (target, map = new WeakMap()) => {

    if(!isObject(target)) return target;

    const type = getType(target)
    let cloneTarget;
    if(!canTraverse[type]){
      return handleNotTraverse(target, type);
    }else{
        let ctor = target.constructor
        cloneTarget = new ctor()
    }
    if(map.get(target)){
        return target
    }
    map.set(target,true)

    if(type === mapTag){
        target.forEach((item,key) => {
            cloneTarget.set(deepClone(key,deepClone(item)))
        })
    }

    if(type === setTag){
        target.forEach(item => {
            target.add(deepClone(item))
        })
    }
    
    for(let prop in target){
        if(target.hasOwnProperty(prop)){
            cloneTarget[prop] = deepClone(target[prop])
        }
    }
    return cloneTarget
}
let obj = {val : 100};
obj.target = obj;
deepClone(obj);