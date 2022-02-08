
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
    //2，如果返回的值是普通值的话
    then(onFulfilled,onRejected){
        if(this.status === RESOLVED){
            onFulfilled(this.value)
        }
        if(this.status === REJECTED){
            onRejected(this.reason)
        }
        if(this.status === PENDING){
            this.onResolvedCallbacks.push(()=> {
                onFulfilled(this.value)
            })
            this.onRjectedCallbacks.push(()=> {
                onRejected(this.reason)
            })

        }
    }
}

module.exports = Promise
