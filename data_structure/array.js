const LinkedList = require('./Link_list');
const length = 10000000;

function array_test(){
    console.time('create array with []');
    const array1 = [];
    for(let i = 0; i < length; i++){
        array1.push(i);
    }
    console.timeEnd('create array with []');

    console.time('create array with new Array()');
    const array2 = new Array(length);
    for(let i = 0; i < length; i++){
        array2[i] = i;
    }
    console.timeEnd('create array with new Array()');

    console.time('create array with new LinedList()');
    const linkedList = new LinkedList();
    for(let i = 0; i < length; i++){
        linkedList.push(i);
    }
    console.timeEnd('create array with new LinedList()');




    console.time('shift array with []');
    array1.shift();
    console.timeEnd('shift array with []');

    console.time('shift array with new Array()');
    array2.shift()
    console.timeEnd('shift array with new Array()');

    console.time('shift array with new LinedList()');
    linkedList.shift();
    console.timeEnd('shift array with new LinedList()');
}

array_test();