import { z } from 'zod';

export const Todo = z.object({
  completed: z.boolean().default(false),
  createdAt: z.string(),
  id: z.string(),
  text: z.string(),
  notes: z.string().optional(),
  updatedAt: z.string(),
});

export type Todo = z.infer<typeof Todo>;

export const NewTodo = z.discriminatedUnion('type', [
  Todo.omit({ id: true, createdAt: true, updatedAt: true }),
]);

export type NewTodo = z.infer<typeof NewTodo>;

export const TodoList = z.object({
  createdAt: z.string(),
  id: z.string(),
  title: z.string(),
  items: z.array(Todo).default([]),
  tripId: z.string().optional(),
  updatedAt: z.string(),
  userId: z.string(),
});

export type TodoList = z.infer<typeof TodoList>;

export const NewTodoList = z.discriminatedUnion('type', [
  TodoList.omit({ id: true, createdAt: true, updatedAt: true }),
]);

export type NewTodoList = z.infer<typeof NewTodoList>;
