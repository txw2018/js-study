const Promise = require('./promise')

//test 1  异步resolve
// const promise = new Promise((resolve,reject) => {
//      setTimeout(()=> {
//          resolve('成功了')
//      },1000)
// })


// promise.then((res)=>{
//     console.log(res)
// },(err)=>{
//     console.log(err)
// })

//test2  连续then
// const p1 = new Promise((resolve,reject) => {
//     setTimeout(()=> {
//         resolve('成功了')
//     },1000)
// })


// let p2 = p1.then((res)=>{
//    console.log(res)
//    return 111
// },(err)=>{
//    console.log(err)
// })
// p2.then(data => {
//    console.log(data,'***');
// },err => {
//    console.log();
// })


//test3  连续then
const p1 = new Promise((resolve,reject) => {
    resolve('1')
})


let p2 = p1.then((res)=>{
   return new Promise((resolve,reject) => {
       setTimeout(()=>{
           reject('错误')
       },1000)
   })
},(err)=>{
   console.log(err)
})
p2.then(data => {
   console.log(data,'***');
},err => {
   console.log(err);
})
