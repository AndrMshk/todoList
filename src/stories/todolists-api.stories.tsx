import React, { useEffect, useState } from 'react';
import { todolistAPI } from '../api/ todolist-api';

export default {
  title: 'API',
};

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '45fe12af-5e56-44d3-88b2-da820e41e4f3',
  },
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data);
      });
  }, []);
  return (
    <ol> {state && state.map((el: any) => (
      <li key={el.id}>
        <div>ID = {el.id}</div>
        <div>TITLE = {el.title}</div>
      </li>
    ))}</ol>
  );
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const title = prompt('title');
    if (title) {
      todolistAPI.createTodolist(title).then((res) => {
          setState(res.data);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);
  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = prompt('todolistId');
    if (todolistId) {
      todolistAPI.deleteTodolist(todolistId)
        .then((res) => {setState(res.data);})
        .catch((err) => console.log(err.message));
    }
  }, []);
  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = prompt('todolistId');
    const title = prompt('title');
    if (todolistId && title) {
      todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
          setState(res.data);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);
  return <div> {JSON.stringify(state)}</div>;
};
