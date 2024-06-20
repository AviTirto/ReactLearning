import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({ todos:
    newList }))
  }

  function handleTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    setTodos(newTodoList)
    persistData(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    setTodos(newTodoList)
    persistData(newTodoList)
  }

  function editTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index);
  }

  useEffect(() => {
    if(!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, 
  [])

  return (
    <>
      <TodoInput handleTodos = {handleTodos} todoValue = { todoValue } setTodoValue = { setTodoValue }/>
      <TodoList handleDeleteTodo = { handleDeleteTodo } editTodo = { editTodo } todos = {todos} />
    </>
  )
}

export default App
