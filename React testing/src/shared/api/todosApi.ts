import {Todo, CreateTodo} from '../../types/Todo';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// @ts-ignore
export async function getTodos(): Promise<Todo[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

// @ts-ignore
export async function deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}

// @ts-ignore
export async function createTodo(todoData: CreateTodo): Promise<Todo> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return response.json();
}