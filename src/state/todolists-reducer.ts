import { todolistsAPI, TodolistType } from '../api/todolists-api';
import { Dispatch } from 'redux';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
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

type ActionsType = RemoveTodolistActionType | AddTodolistACType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetToDosACType

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id);
    }
    case 'ADD-TODOLIST': {
      return [
        { ...action.todolist, filter: 'all'}, ...state];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state];
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state];
    }
    case 'SET-TODOLISTS': {
      return action.todos.map(el => ({ ...el, filter: 'all' }));
    }
    default:
      return state;
  }
};

export type AddTodolistACType = ReturnType<typeof addTodolistAC>


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};
export const addTodolistAC = (todolist: TodolistType) => {
  return { type: 'ADD-TODOLIST', todolist } as const;
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};

export type SetToDosACType = ReturnType<typeof setToDosAC>

export const setToDosAC = (todos: TodolistType[]) => ({ type: 'SET-TODOLISTS', todos } as const);

export const setToDosTC = () => (
  (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
      .then(res => dispatch(setToDosAC(res.data)));
  });

export const removeTodolistTC = (todolistId: string) => ((dispatch: Dispatch) => {
  todolistsAPI.deleteTodolist(todolistId)
    .then(() => dispatch(removeTodolistAC(todolistId)));
});

export const addTodolistTC = (title: string) => ((dispatch: Dispatch) => {
  todolistsAPI.createTodolist(title)
    .then((res) => dispatch(addTodolistAC(res.data.data.item)));
});


