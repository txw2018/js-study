function objectFactory(){
    var obj = new Object()
    var Constructor = [].shift.call(arguments)
    obj.__proto__  = Constructor.prototype
    var ret = Constructor.apply(obj,arguments)
    return typeof ret === 'object' ? ret : obj
}

function Person (){
   this.name ='蜡笔小新'
}

var person = objectFactory(Person)
console.log(person);