function TodoList() {
  const todoList = [
    { id: 1, title: "feed my sister's cat" },
    { id: 2, title: "go on a run" },
    { id: 3, title: "run to pharmacy" },
  ]

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}

export default TodoList
