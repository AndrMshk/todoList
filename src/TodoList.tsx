import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {TaskItem} from './TaskItem';
import {AddTaskComponent} from "./AddTaskComponent";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    filter: FilterValuesType
    tasks: TasksType[]
    tasksForTodolist: TasksType[]
    setTasks: (tasks: TasksType[]) => void
    addTask: (title: string) => void
    removeTask: (id: string) => void
    checkChange: (id: string, isChecked: boolean) => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleAddTask = () => {
        if (!!newTaskTitle && newTaskTitle.trim()) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
            setNewTaskTitle('')
        }
    }

    const handlePressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    const handleChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    return (
        <>
            <h3>{props.title}</h3>
            <div>
                <AddTaskComponent value={newTaskTitle}
                                  error={error}
                                  addTask={handleAddTask}
                                  onKeyPress={handlePressKey}
                                  onChange={handleChangeTitleTask}
                />
                <div>
                    <ul>
                        {props.tasksForTodolist.map((task) =>
                            <TaskItem
                                key={task.id}
                                task={task}
                                tasks={props.tasks}
                                setTasks={props.setTasks}
                                removeTask={props.removeTask}
                                checkChange={props.checkChange}
                            />
                        )}
                    </ul>
                </div>
                <div>
                    <button
                        className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('All')
                        }}>ALL
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('active')
                        }}>Active
                    </button>
                    <button
                        className={props.filter === 'done' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('done')
                        }}>Completed
                    </button>
                </div>
            </div>
        </>
    )
}