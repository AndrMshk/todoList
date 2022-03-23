import React from 'react';
import {TasksType} from './TodoList';

type ComponentPropsType = {
    tasks: TasksType[]
    change: (a: boolean, id: string) => void
    remove: (id: string) => void
}

export const Component = (props: ComponentPropsType) => {
    return (
        <div>
            <ul>
                {props.tasks.map((t) =>
                    (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(event) => props.change(event.target.checked, t.id)}
                            />
                            <span>{t.title}  </span>
                            <button onClick={() => {
                                props.remove(t.id)
                            }}>x
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
