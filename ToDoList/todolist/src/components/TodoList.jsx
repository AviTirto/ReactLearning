import React, { useEffect } from 'react'
import TodoCard from './TodoCard'

export default function TodoList({todos}) {
    useEffect(() => {}, [todos])
    
    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodoCard key = {todoIndex}>
                        <p>{ todo }</p>
                    </TodoCard>
                )
            })}
        </ul>
  )
}
