import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {TaskItem} from './TaskItem';
import {AddTaskComponent} from "./AddTaskComponent";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasksForTodolist: TasksType[],
    checkAll: () => void
    reverseCheckAll: () => void
    unCheckAll: () => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    tasks: TasksType[]
    setTasks: (tasks: TasksType[]) => void
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const handleAddTask = () => {
        if (!!newTaskTitle && newTaskTitle[0] != ' ') {
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
                <AddTaskComponent value={newTaskTitle}
                                  onChange={handleChangeTitleTask}
                                  onKeyPress={handlePressKey}
                                  addTask={handleAddTask}
                />
                <div>
                    <ul>
                        {props.tasksForTodolist.map((task) =>
                            <TaskItem
                                key={task.id}
                                task={task}
                                tasks={props.tasks}
                                setTasks={props.setTasks}
                            />
                        )}
                    </ul>
                </div>
                <div>
                    <h5>ChangeCheckbox</h5>
                    <button onClick={props.checkAll}>CheckALL</button>
                    <button onClick={props.reverseCheckAll}>reverseCheckAll</button>
                    <button onClick={props.unCheckAll}>unCheckAll</button>
                </div>
                <div>
                    <h5>Filter</h5>
                    <button onClick={() => {
                        props.changeFilter('All')
                    }}>ALL
                    </button>
                    <button onClick={() => {
                        props.changeFilter('active')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        props.changeFilter('done')
                    }}>Completed
                    </button>
                </div>
            </div>
        </>
    )
}