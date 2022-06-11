import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@material-ui/icons';
import { TaskType } from './Todolist';

type TaskPropsType = {
  task: TaskType
  todolistId: string
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  console.log('Task');

  const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId]);
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
  }, [props.task.id, props.todolistId]);
  const onTitleChangeHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId);
  }, [props.task.id, props.todolistId]);

  return (
    <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
      <Checkbox
        checked={props.task.isDone}
        color="primary"
        onChange={onChangeHandler}
      />
      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});