import React from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: TasksType[],
    remove: (id: number) => void
    change: (a: boolean, id: number) => void
    checkAll: () => void
    reverseCheckAll: () => void
    unCheckAll: () => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {

    return (
        <>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) =>
                    (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(event) => props.change(event.target.checked,t.id )}
                            />
                            <span>{t.title}  </span>
                            <button onClick={() => {
                                props.remove(t.id)
                            }}>x
                            </button>
                        </li>
                    ))}
            </ul>
            <div>
                <button onClick={props.checkAll}>CheckALL</button>
                <button onClick={props.reverseCheckAll}>reverseCheckAll</button>
                <button onClick={props.unCheckAll}>unCheckAll</button>
                <button onClick={() => {props.changeFilter('All')}}>ALL</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('done')}}>Completed</button>
            </div>
        </>
    )
}