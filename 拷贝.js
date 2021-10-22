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

