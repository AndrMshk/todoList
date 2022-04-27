import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TodolistsType } from './App';
import { MapComponent } from './MapComponent';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistID: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistID: string, taskId: string) => void
  // changeFilter: (todolistID:string,value: FilterValuesType) => void
  addTask: (todolistID: string, title: string) => void
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  setTodolists: (todolists: Array<TodolistsType>) => void
  todolists: Array<TodolistsType>
}

export function Todolist(props: PropsType) {

  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  function changeFilter(todolistID: string, value: FilterValuesType) {
    props.setTodolists(props.todolists.map(el => el.id === todolistID ? { ...el, filter: value } : el));
    // setFilter(value);
  }

  let tasksForTodolist = props.tasks;

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }

  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todolistID, title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };

  const onAllClickHandler = () => changeFilter(props.todolistID, 'all');
  const onActiveClickHandler = () => changeFilter(props.todolistID, 'active');
  const onCompletedClickHandler = () => changeFilter(props.todolistID, 'completed');

  return <div>

    <h3>{props.title}</h3>
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
    <MapComponent
      tasksForTodolist={tasksForTodolist}
      removeTask={props.removeTask}
      changeTaskStatus={props.changeTaskStatus}
      todolistID={props.todolistID}
    />

    <div>
      <button className={props.filter === 'all' ? 'active-filter' : ''}
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? 'active-filter' : ''}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? 'active-filter' : ''}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>;
}
