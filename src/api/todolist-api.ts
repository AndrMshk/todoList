import axios from 'axios';

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
export type ResponseType<DataType={}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: DataType
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '45fe12af-5e56-44d3-88b2-da820e41e4f3',
  },
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
};
