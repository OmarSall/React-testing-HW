export interface CreateTodo {
    title: string;
    completed: boolean;
}

export interface Todo extends CreateTodo {
    id: number;
    userId: number;
}