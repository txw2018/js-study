//防抖
function debounce(fn, delay) {
    var timer;
     return function () {
        var context = this, args = arguments;
        
        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            fn.apply(context,args)
        })
     }
}

// 用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)