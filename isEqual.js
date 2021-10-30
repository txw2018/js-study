function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}

function isEqual(obj1, obj2) {
    
    //其中一个不是对象

    if(!isObject(obj1) || !isObject(obj2)){
        return obj1 === obj2
    }

    //说明都是对象,判断是否一个引用
    if(obj1 === obj2) {
        return true
    }
    
    //判断对象key数量是否相同

    if(Object.keys(obj1).length !== Object.keys(obj2).length){
        return false
    }

    //接下来都是对象，keys相同，递归判断
    for (const key in obj1) {
        const res = isEqual(obj1[key],obj2[key])

        if(!res) return false
       
    }

    return true
    
    
}