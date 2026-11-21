import TodoList from "./TodoList/TodoList.jsx"
import TodoForm from "./TodoForm.jsx"
import { useState, useEffect } from "react"
import SortBy from "../../shared/SortBy.jsx"
import useDebounce from "../../utils/useDebounce.js"
import FilterInput from "../../shared/FilterInput.jsx"
import { useCallback } from "react"

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([])
  const [error, setError] = useState("")
  const [isTodoListLoading, setIsTodoListLoading] = useState(false)

  const [sortBy, setSortBy] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")

  const [filterTerm, setFilterTerm] = useState("")
  const debouncedFilterTerm = useDebounce(filterTerm, 300)

  const handleFilterChange = (newTerm) => {
    setFilterTerm(newTerm)
  }

  const [dataVersion, setDataVersion] = useState(0)

  const invalidateCache = useCallback(() => {
    console.log("Invalidating memo cache after todo mutation")
    setDataVersion((prev) => prev + 1)
  }, [])

  const [filterError, setFilterError] = useState("")

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true)

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
        }
        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm
        }
        const params = new URLSearchParams(paramsObject)

        const resp = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        })
        if (resp.status === 401) {
          throw new Error("unauthorized")
        }
        if (!resp.ok) {
          throw new Error(`Could not load todos (${resp.status})`)
        }
        const data = await resp.json()
        setTodoList(data.tasks)
        setFilterError("")
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`)
        } else {
          setError(`Error fetching todos: ${error.message}`)
        }
      } finally {
        setIsTodoListLoading(false)
      }
    }
    if (token) {
      fetchTodos()
    }
  }, [token, sortBy, sortDirection, debouncedFilterTerm])

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id)
    setTodoList((previous) =>
      previous.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)),
    )

    invalidateCache()

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      })
      if (!response.ok) {
        throw new Error(`Could not update todo (${response.status})`)
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo,
        ),
      )
      setError(error.message)
    }
  }

  async function addTodo(title) {
    const newTodo = { id: Date.now(), title, isCompleted: false }
    setTodoList((previous) => [newTodo, ...previous])
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
        body: JSON.stringify({ title, isCompleted: false }),
      })
      if (!response.ok) {
        throw new Error(`Could not add todo (${response.status})`)
      }
      const savedTodo = await response.json()
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === newTodo.id ? savedTodo : todo)),
      )

      invalidateCache()
    } catch (error) {
      setTodoList((previous) =>
        previous.filter((todo) => todo.id !== newTodo.id),
      )
      setError(error.message)
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id)
    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo,
      ),
    )

    invalidateCache()

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
        body: JSON.stringify({ isCompleted: true }),
      })
      if (!response.ok) {
        throw new Error(`Could not complete todo (${response.status})`)
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? originalTodo : todo)),
      )
      setError(error.message)
    }
  }

  return (
    <div>
      {error && (
        <div className="error-alert">
          <p>{error}</p>

          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}

      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={() => setFilterError("")}>Clear Filter Error</button>

          <button
            onClick={() => {
              setFilterTerm("")
              setSortBy("createdAt")
              setSortDirection("desc")
              setFilterError("")
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos…</p>}

      <SortBy
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  )
}

export default TodosPage
