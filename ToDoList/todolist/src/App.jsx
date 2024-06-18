import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])

  function handleTodos(newTodo){
    setTodos([...todos, newTodo])
  }

  return (
    <>
      <TodoInput handleTodos = {handleTodos} />
      <TodoList todos = {todos}/>
    </>
  )
}

export default App
