class Node {
    constructor(value, next, prev){
        this.value = value;
        this.next = next || null;
        this.prev = prev || null;
    }
}

class LinkedList {
    constructor(){
       this.head = null;
       this.tail = null;
    }

    insert(value, after){
        const insertNode = new Node(value);
        if (!this.head){
            this.head = insertNode;
            this.tail = insertNode;
            return;
        }
        const findNode = this._findNode(after);
        if (!findNode) {
            new Error('没找到节点')
        }
        const originNext = findNode.next;
        findNode.next = insertNode;
        if (originNext) {
            insertNode.next = originNext;
            originNext.prev = insertNode;
        } else {
            this.tail = insertNode
        }
        insertNode.prev = findNode;
    }

    _findNode(value) {
        if (!this.head) {
            return null;
        }
        let cur = this.head;
        while (cur.next) {
            if (cur.value === value){
                return cur;
            }
            cur = cur.next;
        }
        return null;
    }

    push(value) {
        const node = new Node(value);
        if (!this.head){
            this.head = node;
            this.tail = node;
            return;
        }
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    pop() {
        if (!this.tail) return;
        const originTail = this.tail;
        this.tail = originTail.prev;
        if (originTail.prev) {
            originTail.prev.next = null;
            originTail.prev = null;
        } else {
            this.head = null;
        }
        return originTail;
    }

    shift() {
        if (!this.head) return;
        const originHead = this.head;
        if (originHead.next){
            this.head = originHead.next;
            originHead.next = null;
        } else {
            this.head = null;
            this.tail = null;
        }
        return originHead;
    }

    unshift(value) {
        const node = new Node(value);
        if (!this.head){
            this.head = node;
            this.tail = node;
            return;
        }
        node.next = this.head;
        const originHead = this.head;
        originHead.prev = node;
        this.head = node;
    }

    remove(value) {
        const removeNode = this._findNode(value);
        if (removeNode) {
            if (!removeNode.prev) {
                this.shift();
            }

            if (!removeNode.next) {
                this.pop();
            }
            if (removeNode.prev && removeNode.next) {
                removeNode.prev.next = removeNode.next;
            }
            removeNode.prev = null;
            removeNode.next = null;
        }
    }

    removeAfter(after) {
        const afterNode = this._findNode(after);
        if (afterNode && afterNode.next) {
            const removeNode = afterNode.next;
            if (removeNode.next) {
                afterNode.next = removeNode.next;
                removeNode.next.prev = afterNode;
            } else {
                this.tail = afterNode;
            }
            removeNode.prev = null;
            removeNode.next = null;
        }
    }

    toString() {
        if (!this.head) return '';
        let cur = this.head;
        let str = cur.value.toString();
        while(cur.next) {
            str += cur.next.value.toString();
            cur = cur.next;
        }
        return str;
    }

}

module.exports = LinkedList;

// function test() {
//     const linkedlist = new LinkedList();
//     for(let i = 0; i < 1000 * 1000; i++){
//         linkedlist.push(i);
//     }
//     console.timeEnd('create array with new LinkedList()')
// }