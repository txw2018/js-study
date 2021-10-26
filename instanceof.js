function myInstanceof(left,right) {
    let propt = Object.getPrototypeOf(left)
    while(true){
        if(propt == null) return false
        if(propt === right.prototype) return true
        propt = Object.getPrototypeOf(propt)
    }
    
}