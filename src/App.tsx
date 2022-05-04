import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { FullInput } from './components/FullInput';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'React Book', isDone: true },
    ],
  });

  const editTodoList = (todolistId: string, title: string) => {
    setTodolists(todolists.map(el => el.id === todolistId
      ? { ...el, title: title }
      : el));
  };

  const editTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId
        ? { ...el, title: title }
        : el),
    });
  };

  const addTodolist = (newTitle: string) => {
    let newID = v1();
    let newTodolist: TodolistType = { id: newID, title: newTitle, filter: 'all' };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [newID]: [] });
  };

  const removeTask = (id: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
    setTasks({ ...tasks });
  };

  const addTask = (title: string, todolistId: string) => {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    setTasks({ ...tasks });
  };

  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  };

  const removeTodolist = (id: string) => {
    setTodolists(todolists.filter(tl => tl.id !== id));
    delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    setTasks({ ...tasks });
  };

  return (
    <div>
      <div className="App">
        <FullInput callBack={addTodolist} />
        {
          todolists.map(tl => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
            }
            return <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
              removeTodolist={removeTodolist}
              editTodoList={editTodoList}
              editTask={editTask}
            />;
          })
        }
      </div>
    </div>
  );
};

export default App;
