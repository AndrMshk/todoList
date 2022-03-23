import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './TodoList';
import {v1} from 'uuid';
import set = Reflect.set;


// export const Counter = () => {
//     console.log('render')
//     let arr = useState(5)
//     let data = arr[0]
//     let setData = arr[1]
//     return (
//         <div onClick={() => {
//             setData(data+1)
//         }}>{data}</div>
//     )
// }


// @ts-ignore

// console.log({...'abcd'})


export type FilterValuesType = 'All' | 'done' | 'active'

function App() {
    const tasks1: TasksType[] = [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQl', isDone: false}
    ]

    let [tasks, setTasks] = useState(tasks1)
    let [filter, setFilter] = useState<FilterValuesType>('All')

    // console.log(tasks)
    // let tasks = arr[0]
    // let setTasks = arr[1]

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }

        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const checkChange = (isChecked: boolean, id: string) => {
        setTasks(tasks.map((task) => task.id === id
            ? {...task, isDone: isChecked}
            : task))
    }
    // {...task} === {id: task.id, title: task.title, isDone: isChecked}

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
                      tasks={tasksForTodolist}
                      remove={removeTask}
                      change={checkChange}
                      checkAll={checkAll}
                      reverseCheckAll={reverseCheckAll}
                      unCheckAll={unCheckAll}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </>
    );
}

export default App;
