import axios from 'axios';
import NewTodo from './NewTodo';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import Loader from '../UI/Loader';
import '../layout/todos.css';

export default function Todos({ user }) {

    const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

    const [previewNewToDo, setPreviewNewToDo] = useState(false);
    const [todos, setTodos] = useState([]);

    const handleTogglePreview = useCallback(() => setPreviewNewToDo((prevState) => !prevState), [])

    const handleFetchTodos = useCallback(async () => {
        try 
        {
            // Fetch todos from session storage using a unique key for each user
            const todosSession = JSON.parse(sessionStorage.getItem(`todos_user_${user.id}`));

            if (todosSession !== null) return setTodos(todosSession);

            const { data } = await axios.get(`${TODOS_URL}?userId=${user.id}&_limit=3`);
            setTodos(data);

            // Store the fetched todos for the specific user in session storage
            sessionStorage.setItem(`todos_user_${user.id}`, JSON.stringify(data));
        } 
        catch (err) 
        {
            console.error("Error to fetch todos", err);
        }
    }, [user.id]);

    const handleUpdateTodo = useCallback(async (todo) => {
        try
        {
            const updateTodo = { ...todo, completed: !todo.completed };
            const { data } = await axios.put(`${TODOS_URL}/${todo.id}`, updateTodo);

            const updatedTodos = todos.map((todo) => todo.id === data.id ? data : todo);
            setTodos(updatedTodos);

            // Store the updated todos for the specific user in session storage
            sessionStorage.setItem(`todos_user_${user.id}`, JSON.stringify(updatedTodos));
        }
        catch(err)
        {
            console.error('Error to update todo');
        }
    }, [todos]);

    useEffect(() => { handleFetchTodos(); }, [handleFetchTodos]);

    if (!todos.length) return <div> <Loader /> </div>;

    return (
        <div className="todos-container">
            { !previewNewToDo ? 
                <div>
                    <div 
                        className="todos-header"
                    >
                        <h3> Todos - { user.name } </h3>
                        <button onClick={handleTogglePreview}> Add </button>
                    </div>

                    {todos.map((todo) => (
                        <div 
                            key={todo.id} 
                            className="todo-item"
                        >
                            <ul>
                                <li>Title: {todo?.title}</li>
                                <li>Completed: {todo?.completed.toString()}</li>
                            </ul>
                            <div className='todo-icons-container'>
                                { !todo.completed ? 
                                    <button 
                                    onClick={() => handleUpdateTodo(todo)} 
                                        className={`button ${todo.completed ? 'completed' : ''}`}
                                    > 
                                        <IoIosCheckmark size={25} color='52dc4b'/> 
                                    </button> 
                                : null }
                                { todo.completed ? 
                                    <button 
                                        className={`button ${todo.completed ? 'completed' : ''}`}
                                        onClick={() => handleUpdateTodo(todo)}
                                    > 
                                        <FaXmark size={15} color='red'/> 
                                    </button>
                                : null }
                            </div>

                        </div>
                    ))}
                </div> 
            : <NewTodo  handleTogglePreview={handleTogglePreview} todos={todos} setTodos={setTodos} user={user}/>}
        </div>
    );
}