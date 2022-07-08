import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api';
import { Dispatch } from 'redux';
import { AppRootStateType, DispatchType } from '../../app/store';
import { RequestStatusType, setAppStatusAC } from '../../app/bll/app-reducer';
import { AxiosError } from 'axios';
import { handleServerAppError, handleServerNetworkError } from '../../app/utils/error-utils';

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksListsActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) };
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [{ ...action.task, entityStatus: 'idle' }, ...state[action.task.todoListId]],
      };
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? { ...t, ...action.model } : t),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: [] };
    case 'REMOVE-TODOLIST':
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    case 'SET-TODOLISTS': {
      const copyState = { ...state };
      action.todolists.forEach(tl => {
        copyState[tl.id] = [];
      });
      return copyState;
    }
    case 'SET-TASKS':
      return { ...state, [action.todolistId]: action.tasks };
    default:
      return state;
  }
};

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({ type: 'REMOVE-TASK', taskId, todolistId } as const);
export const addTaskAC = (task: TaskType) =>
  ({ type: 'ADD-TASK', task } as const);
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
  ({ type: 'UPDATE-TASK', model, todolistId, taskId } as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({ type: 'SET-TASKS', tasks, todolistId } as const);

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<DispatchType>) => {
  dispatch(setAppStatusAC('loading'));
  todolistsAPI.getTasks(todolistId)
    .then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch);
    });
};
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<DispatchType>) => {
  dispatch(setAppStatusAC('loading'));
  dispatch(updateTaskAC(taskId, { entityStatus: 'loading' }, todolistId));
  todolistsAPI.deleteTask(todolistId, taskId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(taskId, todolistId));
        dispatch(setAppStatusAC('succeeded'));
        dispatch(updateTaskAC(taskId, { entityStatus: 'succeeded' }, todolistId));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(updateTaskAC(taskId, { entityStatus: 'failed' }, todolistId));
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch);
      dispatch(updateTaskAC(taskId, { entityStatus: 'failed' }, todolistId));
    });
};
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<DispatchType>) => {
  dispatch(setAppStatusAC('loading'));
  todolistsAPI.createTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        const task = res.data.data.item;
        const action = addTaskAC(task);
        dispatch(action);
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleServerAppError<{ item: TaskType }>(res.data, dispatch);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch);
    });
};
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: Dispatch<DispatchType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'));
    const task = getState().tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
      console.warn('task not found in the state');
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      entityStatus: task.entityStatus,
      ...domainModel,
    };
    dispatch(updateTaskAC(taskId, { entityStatus: 'loading' }, todolistId));
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(taskId, domainModel, todolistId));
          dispatch(setAppStatusAC('succeeded'));
          dispatch(updateTaskAC(taskId, { entityStatus: 'succeeded' }, todolistId));
        } else {
          handleServerAppError(res.data, dispatch);
          dispatch(updateTaskAC(taskId, { entityStatus: 'failed' }, todolistId));
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err.message, dispatch);
        dispatch(updateTaskAC(taskId, { entityStatus: 'failed' }, todolistId));
      });
  };

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
  entityStatus?: RequestStatusType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type TasksListsActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>
