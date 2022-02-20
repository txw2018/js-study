
function sort(arr){
    for (let i =0; i < arr.length-1;i++){
        for (let j =0; j < arr.length-1;i++){
            if(arr[j] > arr[j]){
                [arr[i],arr[j]] = [arr[j],arr[i]]
            }
        }
    }
    return arr
}
console.log(sort([3, 6, 2, 4, 1]));
