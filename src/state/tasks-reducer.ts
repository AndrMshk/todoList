import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

type ActionsType =
  RemoveTasksACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodolistActionType
  | RemoveTodolistActionType

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return { ...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId) };
    case 'ADD-NEW-TASK':
      return {
        ...state,
        [action.todolistId]: [{ id: v1(), title: action.newTaskTitle, isDone: false }, ...state[action.todolistId]],
      };
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(
          el => el.id === action.taskId ? { ...el, isDone: action.isDone } : el),
      };
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(
          el => el.id === action.taskId ? { ...el, title: action.newTaskTitle } : el),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todolistId]: [] };
    case 'REMOVE-TODOLIST':
      const { [action.id]: [], ...rest } = state;
      // Object.keys(state).filter(a => a !== action.id)
      return rest;
    default:
      return state;
  }
};

type RemoveTasksACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (todolistId: string, taskId: string) => (
  { type: 'REMOVE-TASK', todolistId, taskId } as const);
export const addTaskAC = (todolistId: string, newTaskTitle: string) => (
  { type: 'ADD-NEW-TASK', todolistId, newTaskTitle } as const);
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => (
  { type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone } as const);
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => (
  { type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTaskTitle } as const);
