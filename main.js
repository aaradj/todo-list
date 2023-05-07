const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterItem = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", delteCompleteTodo);
filterItem.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();
  if (todoInput.value === "") {
    todoInput.placeholder = "please add task";
    todoInput.classList.add("error");
  } else {
    todoInput.classList = "";
    todoInput.placeholder = "add task";
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    saveLocalTodo(todoInput.value);
    todoInput.value = "";
    todoDiv.appendChild(newTodo);

    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  }
}

function delteCompleteTodo(event) {
  let item = event.target;
  if (item.classList[0] === "trash-btn") {
    let todo = item.parentElement;
    todo.remove();
  }
  if (item.classList[0] === "complete-btn") {
    let todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  let item = event.target.value;
  todoList.childNodes.forEach((event) => {
    switch (item) {
      case "all":
        event.style.display = "flex";
        break;
      case "completed":
        if (event.classList[1]) {
          event.style.display = "flex";
        } else {
          event.style.display = "none";
        }
        break;
      case "uncompleted":
        if (event.classList[1]) {
          event.style.display = "none";
        } else {
          event.style.display = "flex";
        }
    }
  });
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
