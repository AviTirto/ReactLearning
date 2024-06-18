import { useState } from 'react'

export default function TodoInput({ handleTodos }) {
    const [todoValue, setTodoValue] = useState('')

    return (
        <header>
            <input value = {todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }} placeholder="Enter todo..."/> 
            <button onClick={() => {
                handleTodos(todoValue)
            }}>Add</button>
        </header>
    )
}