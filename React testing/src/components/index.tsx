import {useTodos} from './useTodos';
import {useState} from 'react';

export const TodosList = () => {
    const {todos, error, handleDelete, handleCreate} = useTodos();
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (newTodoTitle.trim()) {
            handleCreate(newTodoTitle);
            setNewTodoTitle('');
        }
    };

    return (
        <div>
            <h1>Todos</h1>
            {error && <p data-testid="error">{error}</p>}

            <form onSubmit={onSubmit}>
                <input
                    placeholder="New todo title"
                    value={newTodoTitle}
                    onChange={(event) =>
                        setNewTodoTitle(event.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}{' '}
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};