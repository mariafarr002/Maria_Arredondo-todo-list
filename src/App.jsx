import "./App.css"
import TodoList from "./TodoList.jsx"
import TodoForm from "./TodoForm.jsx"
import { useState } from "react"

const todos = [
    { id: 1, title: "feed my sister's cat" },
    { id: 2, title: "go on a run" },
    { id: 3, title: "run to pharmacy" },
  ]

function App() {
  const [todoList, setTodoList] = useState(todos)
  return (
    <div>
      <h1>My Daily Do's</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
