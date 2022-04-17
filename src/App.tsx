import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './TodoList';
import {v1} from 'uuid';

const tasks1: TasksType[] = [
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'Rest API', isDone: false},
    {id: v1(), title: 'GraphQl', isDone: false}
]

export type FilterValuesType = 'All' | 'done' | 'active'

function App() {

    let [tasks, setTasks] = useState<TasksType[] | []>(tasks1)
    let [filter, setFilter] = useState<FilterValuesType>('All')

    const addTask = (title: string) => {
        let newTasks = [{id: v1(), title, isDone: false}, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (id: string) => {
        let filteredTasks: TasksType[] = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const checkChange = (taskId: string, isDone: boolean) => {
        let finedTask = tasks.find( t => t.id === taskId)
        if (finedTask) {
            finedTask.isDone = isDone
        }
        setTasks([...tasks])
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'done') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(({isDone}) => !isDone)
    }

    return (
        <>
            <Todolist title='what to learn?'
                      tasks={tasks}
                      filter={filter}
                      tasksForTodolist={tasksForTodolist}
                      setTasks={setTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      checkChange={checkChange}
                      changeFilter={changeFilter}
            />
        </>
    );
}

export default App;
