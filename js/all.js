let app = new Vue({
  el:'#app',
  data:{
    newTodo:'',
    todos:[{
      id:'123',
      title:'你好',
      compelted:false 
      }
    ],
    visibility:'all',
    cacheTodo:{},
    cacheTitle:''
  },
  methods:{
    addTodo:function(){
      // 存放newTodo的值跟建立id
      let value = this.newTodo.trim();
      let timestamp = Math.floor(Date.now());
      if(value){
        this.todos.push({
          id: timestamp,
          title:value,
          compelted:false
        });
      }
      this.newTodo='';
    },
    deleteTodo:function(item){
      // item = 點選刪除鈕傳進來的item
      // originitem = 整個todos陣列的item
      // originindex = 整個todos陣列的index 
      // 依照原陣列的index刪除，避免因選擇在不同頁籤會刪除錯誤
      let newIndex = '';
      this.todos.forEach(function(originitem,orginindex){
        if(item.id == originitem.id){
          newIndex = orginindex ;
        } 
      })
      this.todos.splice(newIndex , 1);
    },
    editTodo:function(item){
      this.cacheTodo = item;
      this.cacheTitle = item.title;      
    },
    exitEdit:function(){
      this.cacheTodo = {};
    },
    finishEdit:function(item){
      item.title = this.cacheTitle;
      this.cacheTodo = {};
    },
    deleteAll:function(){
      this.todos = [];
    }    
  },
  computed:{
    filteredTodo : function(){
      if(this.visibility == 'all'){        
        return this.todos;
      }
      else if (this.visibility == 'active'){        
        // 篩選進行中任務
        let newTodos = [];
        this.todos.forEach(function(item){          
          if(!item.compelted)
          newTodos.push(item);
        })
        return newTodos;
      }
      else if (this.visibility == 'compelted'){
        let newTodos = [];
        this.todos.forEach(function(item){          
          if(item.compelted)
          newTodos.push(item);
        })
        return newTodos;
      }
    },
    // 抓取剩餘的任務
    checkRemaining:function(){        
    let len = 0;
    this.todos.forEach(function(item){
      if(!item.compelted){
        len +=1 ; 
      }
    })    
    return len ;
    }
  }
}) 