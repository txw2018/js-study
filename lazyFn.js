let lazyFn = function () {
  let t = new Date();
  lazyFn = function () {
    return t;
  };
  return lazyFn();
};

console.log(lazyFn());
console.log(lazyFn());
console.log(lazyFn());