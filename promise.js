
//1,promise是一个类
//2，promise有三个状态  成功态 resolve  失败态 reject  等待态 pending
//3，用户自己决定失败的原因和成功的原因   成功和失败也是用户定义
//4。promise默认执行器时立即执行
//5，promise实例都用一个then方法，一个参数时成功的回调 一个参数时失败的回调
//6。如果执行函数时发生了异常也会执行失败的逻辑
//7，如果promise一旦成功就不能失败反过来也是一样

const  PENDING = 'PENDING'
const  RESOLVED = 'RESOLVED'
const  REJECTED = 'REJECTED'
const resolvePromise = (promise2,x,resolve,reject) => {
    //1.循环引用  自己等待自己完成  错误的实现
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise $<Promise>'))
    }
    //后续的条件要严格判断  保证代码能和别的库一起使用
    let called;
    if((typeof x === 'object' && x != null) || typeof x === 'function'){
        try{
            let then = x.then
            if(typeof then === 'function'){ //认为是一个promise
                then.call(x,y => {//根据promise的状态决定是成功还是失败
                    if(called) return
                    called = true
                    resolvePromise(promise2,y,resolve,reject)  //递归解析的过程
                },e => {
                    if(called) return
                    called = true
                    reject(e)
                })
            }else{
                resolve(x)
            }

        }catch(err){
            if(called) return
            called = true
            reject(err)
        }

    }else{
        resolve(x)

    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRjectedCallbacks = []
        const resolve = (value) => {
          if(this.status === PENDING){
              this.value = value
              this.status = RESOLVED
              this.onResolvedCallbacks.forEach(fn => fn())
          }
        }

        const reject = (reason) => {
            this.reason = reason
            this.status = RESOLVED
            this.onRjectedCallbacks.forEach(fn => fn())

        }
        try{
            executor(resolve,reject)

        }catch (e) {
            reject(e)
        }
    }
    //1，promise 成功和失败的回调的返回值  可以传递到外层的下一个then
    //2，如果返回的值是普通值的话（传递到下一次的成功中）,出错的情况（一定会走到下一次的失败）可能还有promise的情况（会采用promise的状态，决定走下一次的成功还是失败）
    //3,错误处理，如果离自己最近的then，没有错误处理，会向下找
    //4,每次指向完promise.then方法后返回的都是一个‘新的promise’（promise一旦成功或者失败就不能修改状态）
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
        let promise2 = new Promise((resolve,reject) => { //为了链式调用
            if(this.status === RESOLVED){
                setTimeout(()=>{ //加定时器为了resolvePromise能拿到promise2
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
            
                },0)
            }
            if(this.status === REJECTED){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)

                    }
        
                },0)
            }
            if(this.status === PENDING){
               
                this.onResolvedCallbacks.push(()=> {
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                
                    },0)
                })
                this.onRjectedCallbacks.push(()=> {
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                      
                    },0)
                })
    
            }
        })
        return promise2
     
    }
}

Promise.defer = Promise.deferred = function() {
    let dfd = {}
    dfd.promise = new Promise((resolve,reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise
