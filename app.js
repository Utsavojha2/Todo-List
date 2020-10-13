//Selector
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const submitBtn = document.querySelector('.todo-btn');
const filter = document.querySelector('.filter-todo');


// Event Listener
submitBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filter.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


// Functions
function addTodo(e){
   // Prevent fromsubmitting form
    e.preventDefault();
    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';
   
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText =  todoInput.value;


    newTodo.className = 'todo-item';
    todoDiv.appendChild(newTodo);

    // Save to local storage
    saveLocalTodos(todoInput.value);
   
    // Create check mark button
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
        checkBtn.className = 'check-btn';
        todoDiv.appendChild(checkBtn);
        
    // Create check mark button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="far fa-times-circle"></i>';
      deleteBtn.className = 'delete-btn';
      todoDiv.appendChild(deleteBtn);
    
    // Append new div in <ul>
    todoList.appendChild(todoDiv);
    
    // Clear input field
    todoInput.value='';

}

function deleteCheck(e){
   const item = e.target;
   // Delete li
   if (item.classList.contains('delete-btn')){
    removeLocalTodos(e.target.parentElement);
    item.parentElement.remove();
   }

   //Add check mark
   if(item.classList.contains('check-btn')){
       item.parentElement.classList.toggle('completed');
   }
}

function filterTodo(event){
    const todos = todoList.childNodes; 
    todos.forEach(todo => {
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none'
                }
                break;
            case "incomplete":
             if (!todo.classList.contains('completed')){
                 todo.style.display = 'flex';
             } else {
                 todo.style.display = 'none';
             }
             break;
        }
     
  });

 }





function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    // check if you already have a thing there
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';
   
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText =  todo;


    newTodo.className = 'todo-item';
    todoDiv.appendChild(newTodo);
   
    // Create check mark button
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
        checkBtn.className = 'check-btn';
        todoDiv.appendChild(checkBtn);
        
    // Create check mark button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="far fa-times-circle"></i>';
      deleteBtn.className = 'delete-btn';
      todoDiv.appendChild(deleteBtn);
    
    // Append new div in <ul>
    todoList.appendChild(todoDiv);
    
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}