import React from 'react';
import {TasksType} from './TodoList';

type TaskItemPropsType = {
    task: TasksType
    tasks: TasksType[]
    setTasks: (tasks: TasksType[]) => void
}

export const TaskItem = (props: TaskItemPropsType) => {

    const checkChange = (isChecked: boolean, id: string) => {
        props.setTasks(props.tasks.map((task) => task.id === id
            ? {...task, isDone: isChecked}
            : task))
    }

    const removeTask = (id: string) => {
        let filteredTasks: TasksType[] = props.tasks.filter(t => t.id !== id)
        props.setTasks(filteredTasks)
    }

    const changeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        checkChange(event.target.checked, props.task.id)
    }

    return (
        <li>
            <input
                className={'checkbox'}
                type="checkbox"
                checked={props.task.isDone}
                onChange={changeCheckbox}
            />
            <span>{props.task.title}</span>
            <button className={'removeButton'} onClick={() => removeTask(props.task.id)}>x</button>
        </li>
    )
}
