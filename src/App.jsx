import "./App.css"
import Header from "./shared/Header.jsx"
import TodosPage from "./features/Todos/TodosPage.jsx"
// import { useState } from 'react'

function App() {
  // const [todoList, setTodoList] = useState([])

  // function updateTodo(editedTodo) {
  //   const updatedTodos = todoList.map((todo) =>
  //     todo.id === editedTodo.id ? ({ ...editedTodo }) : todo,
  //   )
  //   setTodoList(updatedTodos)
  // }

  // function addTodo(todoTitle) {
  //   const newTodo = {
  //     id: Date.now(),
  //     title: todoTitle,
  //     isCompleted: false,
  //   }

  //   setTodoList((previous) => [newTodo, ...previous])
  // }

  // function completeTodo(id) {
  //   setTodoList(
  //     todoList.map((todo) => {
  //       return todo.id === id ? { ...todo, isCompleted: true } : todo
  //     }),
  //   )
  // }

  return (
    <div>
      <Header />
      <TodosPage />
    </div>
  )
}

export default App
