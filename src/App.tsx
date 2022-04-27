import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = { id: string, title: string, filter: FilterValuesType }

export type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },//0
    { id: todolistID2, title: 'What to buy', filter: 'all' },//1
  ]);

  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'HTML&CSS2', isDone: true },
      { id: v1(), title: 'JS2', isDone: true },
      { id: v1(), title: 'ReactJS2', isDone: false },
      { id: v1(), title: 'Rest API2', isDone: false },
      { id: v1(), title: 'GraphQL2', isDone: false },
    ],
  });

  function removeTask(todolistID: string, taskID: string) {
    setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID) });
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }

  function addTask(todolistID: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
    setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] });
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    // let task = tasks.find(t => t.id === taskId);
    // if (task) {
    //     task.isDone = isDone;
    // }
    //
    // setTasks([...tasks]);

    setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone: isDone } : el) });
  }

  //
  // function changeFilter(todolistID: string, value: FilterValuesType) {
  //     setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
  //     // setFilter(value);
  // }

  return (
    <div className="App">
      {todolists.map((el, index) => {
        // let tasksForTodolist = tasks[el.id];
        //
        // if (el.filter === "active") {
        //     tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
        // }
        // if (el.filter === "completed") {
        //     tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
        // }
        return (
          <Todolist
            key={el.id}
            todolistID={el.id}
            title={el.title}
            tasks={tasks[el.id]}
            removeTask={removeTask}
            // changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={el.filter}
            setTodolists={setTodolists}
            todolists={todolists}
          />
        );
      })}


    </div>
  );
}

export default App;
