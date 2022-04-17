import React from 'react';
import {TasksType} from './TodoList';

type TaskItemPropsType = {
    task: TasksType
    tasks: TasksType[]
    setTasks: (tasks: TasksType[]) => void
    removeTask: (id: string) => void
    checkChange: (id: string, isChecked: boolean) => void
}

export const TaskItem: React.FC<TaskItemPropsType> = (props) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.checkChange(props.task.id, event.currentTarget.checked)

    }
    return (
        <li className={props.task.isDone? 'is-done' : ''}>
            <input
                className={'checkbox'}
                type="checkbox"
                checked={props.task.isDone}
                onChange={onChangeHandler}
            />
            <span>{props.task.title}</span>
            <button className={'removeButton'} onClick={() => props.removeTask(props.task.id)}>x</button>
        </li>
    )
}
