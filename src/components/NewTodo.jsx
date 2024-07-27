import React, { useState } from 'react';
import '../layout/new-todo.css';

export default function NewTodo({ handleTogglePreview = () => {}, todos = [], setTodos = () => {}, user = {} }) {

    const [title, setTitle] = useState('');
    const handleTitle = ({ target: { value } }) => setTitle(value);

    const handleNewTodo = () => {
        const newTodo = {
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            userId: user.id,
            title,
            completed: false
        };

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);

        sessionStorage.setItem(`todos_user_${user.id}`, JSON.stringify(updatedTodos));
        handleTogglePreview();
    };

    return (
        <div className='new-todo-form'>

            <h1> New Todo {user.name} </h1>

            Title: <textarea  
                        type="text"  
                        placeholder='Enter new title'  
                        onChange={handleTitle} 
                   />
                   
                    <div 
                        className='btns-form'
                    >
                        <button onClick={handleNewTodo}> Add  </button>
                        <button onClick={() => handleTogglePreview()}> Cancel </button>
                    </div>
        </div>
    );
}
