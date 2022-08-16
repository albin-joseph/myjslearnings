const readline = require('readline-sync');
console.log('Enter the elements of the array : ');
let arr = readline.question().split(" ").map(x => parseInt(x));
let count = 0;
const arr2 = arr.sort();


let i = 0 ;
while( i < arr2.length){
    if ( arr2[i] == arr2[i + 1]){
        count++ ;
        i = i + 2 ;
        
    }else {
        i = i + 1 ;
        
    }
}


console.log(count);


