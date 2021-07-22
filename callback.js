function say(who) {
  console.log(who + 'say')
}

Function.prototype.before = function (beforeFunc) {
  return (...args) => {
    beforeFunc()
    this(...args)
  }
}

let newFn = say.before(function () {
  console.log('说话之前')
})

newFn('我')