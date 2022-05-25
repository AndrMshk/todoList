import { FilterValuesType, TodolistType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST',
  todolistId: string
  title: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

type ActionsType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id != action.id);
    case 'ADD-TODOLIST':
      return [...state, { id: action.todolistId, title: action.title, filter: 'all' }];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(el => el.id === action.id ? { ...el, title: action.title } : el);
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(el => el.id === action.id ? { ...el, filter: action.filter } : el);
    default:
      throw new Error('I don\'t understand this type');
  }
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todolistId: v1(), title: title };
};
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId };
};
export const ChangeTodolistFilterAC = (
  todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId };
};
