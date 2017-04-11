import bar from './bar';
import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  // created: function(){
  //   let i = 0;
  //   setInterval(()=>{
  //     this.newTodo = i; // this.newTodo 就是 data.newTodo，实际上 this.newTodo 是 data.newTodo 的代理
  //     i+= 1;
  //      console.log(this.newTodo);
  //   },1000);
  // }
  //初始化的时候执行
  created: function(){
    // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
      window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
    }

    let oldDataString = window.localStorage.getItem('myTodos');
    let oldData = JSON.parse(oldDataString);
    this.todoList = oldData || [];

  },
  //调用的时候执行
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date(),
        done: false // 添加一个 done 属性
      })
      console.log(this.todoList)
      this.newTodo = '';  // 变成空
    },
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index,1);
    }
  }

})   