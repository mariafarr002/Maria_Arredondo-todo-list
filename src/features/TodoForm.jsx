import { useRef } from "react"
import { useState } from "react"
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx"

function TodoForm({ onAddTodo }) {
  const inputRef = useRef()

  const [workingTodoTitle, setWorkingTodoTitle] = useState("")

  const handleAddTodo = (event) => {
    event.preventDefault()

    if (workingTodoTitle.trim()) {
      onAddTodo(workingTodoTitle.trim())
      setWorkingTodoTitle("")
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="todoTitle"
        labelText="Todo"
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm
