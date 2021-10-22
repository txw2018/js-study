//程序调用自身的编程技巧称为递归(recursion)。

//1.阶乘
function factorial(n){
    if(n === 1) return n
    return n * factorial(n-1)
}
console.log(factorial(5)) // 5 * 4 * 3 * 2 * 1 = 120

//2.斐波那契数列

function fibonacci(n){
    if(n < 2 ) return n
    return fibonacci(n -1) + fibonacci(n-2)
}