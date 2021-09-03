Promise.all = function (iterators) {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      resolve([]);
    } else {
      let count = 0;
      let result = [];
      for(let i = 0; i< iterators.length ;i++){
        Promise.resolve(iterators[i]).then(
          data => {
            result.push(data)
            if(++count === iterators.length){
              resolve(result)
            }

          },error => {
            reject(error)
            return
        });
      }
    }
  });
};




Promise.all([1,2,3]).then(res => {
  console.log(res);
})