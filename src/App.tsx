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
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }

        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const checkAll = () => setTasks(tasks.map((task) => (
        {...task, isDone: true}
    )));

    const reverseCheckAll = () => setTasks(tasks.map((task) => (
        {...task, isDone: !task.isDone}
    )));

    const unCheckAll = () => setTasks(tasks.map((task) => (
        {...task, isDone: false}
    )));

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
                      tasksForTodolist={tasksForTodolist}
                      checkAll={checkAll}
                      reverseCheckAll={reverseCheckAll}
                      unCheckAll={unCheckAll}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      tasks={tasks}
                      setTasks={setTasks}
            />
        </>
    );
}

export default App;
