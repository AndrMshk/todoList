import React, { ChangeEvent } from 'react';
import { TaskType } from './Todolist';

type PropsType = {
  todolistID: string
  tasksForTodolist: Array<TaskType>
  removeTask: (todolistID: string, taskId: string) => void
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}

export const MapComponent = ({ todolistID, tasksForTodolist, removeTask, ...props }: PropsType) => {
  return (
    <ul>

      {tasksForTodolist.map(t => {
        const onClickHandler = () => removeTask(todolistID, t.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          props.changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
        };

        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
          <input type="checkbox"
                 onChange={onChangeHandler}
                 checked={t.isDone} />
          <span>{t.title}</span>
          <button onClick={onClickHandler}>x</button>
        </li>;
      })
      }
    </ul>
  );
};

