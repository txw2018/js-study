const Promise = require('./promise')


const promise = new Promise((resolve,reject) => {
     setTimeout(()=> {
         resolve('成功了')
     },1000)
})


promise.then((res)=>{
    console.log(res)
},(err)=>{
    console.log(err)
})
