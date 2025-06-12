import {useEffect, useState} from 'react';
import {Todo} from '../types/Todo';
import {getTodos, deleteTodo, createTodo} from '../shared/api/todosApi';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState('');

    // @ts-ignore
    const loadTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch {
            setError('Failed to load todos');
        }
    };

    // @ts-ignore
    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch {
            setError('Failed to delete todo');
        }
    };

    // @ts-ignore
    const handleCreate = async (title: string) => {
        try {
            const newTodo = await createTodo({title, completed: false});
            setTodos((prev) => [...prev, newTodo]);
        } catch {
            setError('Failed to create todo');
        }
    };

    useEffect(() => {
        // @ts-ignore
        (async () => {
            await loadTodos();
        })();
    }, []);

    return {
        todos,
        error,
        handleDelete,
        handleCreate,
    };
}