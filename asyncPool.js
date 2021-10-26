//并发控制
//https://github.com/rxaviers/async-pool

// // es6

// function asyncPool (poolLimit, array, iteratorFn) {
//     let i = 0;
//     const ret = [] //储存所有的异步任务
//     const executing = [] //储存正在执行的异步任务
//     const enqueue = function () {
//         if(i === array.length){
//             return Promise.resolve()
//         }
//         const item = array[i++]
//          // 调用iteratorFn函数创建异步任务
//         const p = Promise.resolve().then(() => iteratorFn(item, array))
//         ret.push(p)

//         let r = Promise.resolve()

//         //当poolLimit值小于或等于总任务个数，进行并发控制
//         if(poolLimit <= array.length){
//             //当任务完成后，从正在执行的任务数组中移除已完成的任务
//             const e = p.then(() => executing.splice(executing.indexOf(e),1))
//             executing.push(e)

//             if(executing.length >= poolLimit){
//                 r = Promise.race(executing)
//             }

//         }

//         //正在执行任务列表中较快的任务执行完成之后，才会从array数组中获取新的代办任务
//         return r.then(() => enqueue())
//     }
//     return enqueue().then(() => Promise.all(ret))
// }


// async function test() {
//     const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
// await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
// }

// test()



//es7
async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务
    for (const item of array) {
      // 调用iteratorFn函数创建异步任务
      const p = Promise.resolve().then(() => iteratorFn(item, array));
      ret.push(p); // 保存新的异步任务
  
      // 当poolLimit值小于或等于总任务个数时，进行并发控制
      if (poolLimit <= array.length) {
        // 当任务完成后，从正在执行的任务数组中移除已完成的任务
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e); // 保存正在执行的异步任务
        if (executing.length >= poolLimit) {
          await Promise.race(executing); // 等待较快的任务执行完成
        }
      }
    }
    return Promise.all(ret);
  }


   const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));

   const result =  asyncPool(2, [1000, 5000, 3000, 2000], timeout);

   async function asyncPool2(limit,arr,fn) {
    const res = []
    const pending =[]
    for (const item of arr) {
      const p = Promise.resolve().then(() => fn(item,arr))
      res.push(p)

      if(limit <= arr.length){
        const e = p.then(() => pending.splice(pending.indexOf(e),1))
        pending.push(e)
        if(pending.length >= limit){
          await Promise.race(pending)
        }
      }
      
    }
    return res
   }
