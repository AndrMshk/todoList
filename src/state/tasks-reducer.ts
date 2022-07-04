import { TasksStateType } from '../App';
import { AddTodolistACType, RemoveTodolistActionType, SetToDosACType } from './todolists-reducer';
import { TaskStatuses, TaskType, todolistsAPI } from '../api/todolists-api';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

type TaskModuleType = {
  title?: string
  status?: TaskStatuses
}

type ActionsType = RemoveTaskActionType
  | RemoveTodolistActionType
  | SetToDosACType
  | SetTasksACType
  | AddTaskACType
  | updateTaskACType
  | AddTodolistACType

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId),
      };
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: [],
      };
    }
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case 'SET-TODOLISTS': {
      const stateCopy = { ...state };
      action.todos.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case 'SET-TASKS': {
      return { ...state, [action.todolistId]: action.tasks };
    }
    case 'UPDATE-TASK':
      return {
        ...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.id
          ? { ...el, ...action.taskModel }
          : el),
      };
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId };
};

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: TaskType) => {
  return { type: 'ADD-TASK', task } as const;
};

type SetTasksACType = ReturnType<typeof setTasksAC>

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => (
  { type: 'SET-TASKS', todolistId, tasks } as const);

type updateTaskACType = ReturnType<typeof updateTaskAC>

export const setTaskTC = (todolistId: string) => (
  (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then((res) => {dispatch(setTasksAC(todolistId, res.data.items));});
  }
);

export const removeTaskTC = (taskId: string, todolistId: string) => ((dispatch: Dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
    if (res.data.resultCode === 0)
    dispatch(removeTaskAC(taskId, todolistId));
  });
});

export const addTaskTC = (title: string, todolistId: string) => ((dispatch: Dispatch) => {
  todolistsAPI.createTask(todolistId, title)
    .then((res) => dispatch(addTaskAC(res.data.data.item)));
});

export const updateTaskAC = (id: string, todolistId: string, taskModel: TaskModuleType) => (
  { type: 'UPDATE-TASK', id, todolistId, taskModel } as const
);

export const updateTaskTC = (id: string, taskModel: TaskModuleType, todolistId: string) => (
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const currentTask = getState().tasks[todolistId].find(el => el.id === id);
    if (currentTask) {
      todolistsAPI.updateTask(todolistId, id, { ...currentTask, ...taskModel })
        .then(() => dispatch(updateTaskAC(id, todolistId, taskModel)));
    }
  });




