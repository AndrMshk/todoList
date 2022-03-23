import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Component} from './Component';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: TasksType[],
    remove: (id: string) => void
    change: (a: boolean, id: string) => void
    checkAll: () => void
    reverseCheckAll: () => void
    unCheckAll: () => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const handleAddTask = () => {
        if (newTaskTitle != '' && newTaskTitle[0] != ' ') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const handleChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    const handlePressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    return (
        <>
            <h3>{props.title}</h3>
            <div>

                <input value={newTaskTitle}
                       onChange={handleChangeTitleTask}
                       onKeyPress={handlePressKey}/>
                <button onClick={handleAddTask}>+</button>

            <Component
                tasks={props.tasks}
                change={props.change}
                remove={props.remove}
            />

                <button onClick={props.checkAll}>CheckALL</button>
                <button onClick={props.reverseCheckAll}>reverseCheckAll</button>
                <button onClick={props.unCheckAll}>unCheckAll</button>
                <button onClick={() => {props.changeFilter('All')}}>ALL</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('done')}}>Completed
                </button>
            </div>
        </>
    )
}