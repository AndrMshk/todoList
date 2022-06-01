import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { TodolistType } from './AppWithRedux';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from './state/todolists-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolist: TodolistType
}

export function TodolistWithTasks({ todolist }: PropsType) {

  let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id]);

  if (todolist.filter === 'active') {
    tasks = tasks.filter(t => !t.isDone);
  }
  if (todolist.filter === 'completed') {
    tasks = tasks.filter(t => t.isDone);
  }

  const dispatch = useDispatch();
  const addTask = (title: string) => {
    dispatch(addTaskAC(todolist.id, title));
  };
  const removeTodolist = () => {
    let action = (RemoveTodolistAC(todolist.id));
    dispatch(action);
  };
  const changeTodolistTitle = (title: string) => {
    dispatch(ChangeTodolistTitleAC(todolist.id, title));
  };
  const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC(todolist.id, 'all'));
  const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(todolist.id, 'active'));
  const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(todolist.id, 'completed'));

  return <div>
    <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodolist}>
        <Delete />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask} />
    <div>
      {
        tasks.map(t => {
          const onClickHandler = () => dispatch(removeTaskAC(todolist.id, t.id));
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(todolist.id, t.id, newIsDoneValue));
          };
          const onTitleChangeHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(todolist.id, t.id, newValue));
          };

          return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
            <Checkbox
              checked={t.isDone}
              color="primary"
              onChange={onChangeHandler}
            />
            <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
              <Delete />
            </IconButton>
          </div>;
        })
      }
    </div>
    <div>
      <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'default'}
      >All
      </Button>
      <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>;
}


