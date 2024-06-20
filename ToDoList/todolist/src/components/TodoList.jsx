import React, { useEffect } from 'react'
import TodoCard from './TodoCard'

export default function TodoList(props) {
    const { todos } = props
    useEffect(() => {}, [todos])
    
    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodoCard { ...props } key = {todoIndex} index = {todoIndex}>
                        <p>{ todo }</p>
                    </TodoCard>
                )
            })}
        </ul>
  )
}
