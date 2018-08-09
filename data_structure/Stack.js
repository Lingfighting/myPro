const LinkedList = require('./Link_list');
class Stack extends LinkedList{
    constructor() {
        super();
       return new LinkedList();
    }
}

function stackTest(){
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());
}

function stackTest2() {
    const str = '{{{}}}'
    const stack = new Stack();
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c === '{') stack.push(i);
        if (c === '}') stack.pop();
    }
    console.log(stack.toString());
}

function stackTest3() {
    const str = '{{{}}}';
    const stack = new Stack();
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c === '{' || c === '}') stack.push(c);
    }

    while (stack.pop() || stack.shift)
    console.log(stack.toString());
}

stackTest2();
