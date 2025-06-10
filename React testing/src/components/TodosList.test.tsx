import {fireEvent, render} from '@testing-library/react';
import {vi} from 'vitest';
import {TodosList} from './index';
import {getTodos, deleteTodo, createTodo} from '../shared/api/todosApi';
import {describe, expect, it, beforeEach} from 'vitest';

vi.mock('../shared/api/todosApi', () => ({
    getTodos: vi.fn(),
    deleteTodo: vi.fn(),
    createTodo: vi.fn(),
}));

describe('TodosList', () => {
    beforeEach(() => {
        vi.mocked(getTodos).mockResolvedValue([
            {userId: 1, id: 1, title: 'Todo 1', completed: false},
            {userId: 1, id: 2, title: 'Todo 2', completed: false},
        ]);
    });

    // @ts-ignore
    it('should display todos', async () => {
        const todos = render(<TodosList/>);

        expect(await todos.findByText('Todo 1')).toBeDefined();
        expect(await todos.findByText('Todo 2')).toBeDefined();
    });

    // @ts-ignore
    it('should delete a todo', async () => {
        vi.mocked(deleteTodo).mockResolvedValue();

        const todos = render(<TodosList/>);

        await todos.findByText('Todo 1');
        const deleteButtons = todos.getAllByText('Delete');

        fireEvent.click(deleteButtons[0]);

        expect(deleteTodo).toHaveBeenCalledWith(1);
    });

    // @ts-ignore
    it('should create a new todo', async () => {
        const newTodo = {userId: 1, id: 999, title: 'New Todo', completed: false};

        vi.mocked(createTodo).mockResolvedValue(newTodo);

        const todos = render(<TodosList/>);

        const input = todos.getByPlaceholderText('New todo title');
        const button = todos.getByRole('button', {name: /add todo/i});

        fireEvent.change(input, {target: {value: 'New Todo'}});
        fireEvent.click(button);

        expect(createTodo).toHaveBeenCalledWith({
            title: 'New Todo',
            completed: false,
        });

        expect(await todos.findByText('New Todo')).toBeDefined();
    });
});