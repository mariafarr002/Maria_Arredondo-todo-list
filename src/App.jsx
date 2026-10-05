import "./App.css"

const todoList = [
    {id: 1, title: "feed my sister's cat"},
    {id: 2, title: "go on a run"},
    {id: 3, title: "run to pharmacy"},
];

function App() {
  return (
    <div>
      <h1>Maria's Todo List</h1>
      <ul>
            {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    </div>
  )
}

export default App
