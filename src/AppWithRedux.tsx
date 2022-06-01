import React from 'react';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AddTodolistAC } from './state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodolistWithTasks } from './TodolistWithTasks';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function AppWithRedux() {

  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
  const dispatch = useDispatch();

  function addTodolist(title: string) {
    dispatch(AddTodolistAC(title));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              return <Grid key={tl.id} item>
                <Paper style={{ padding: '10px' }}>
                  <TodolistWithTasks
                    todolist={tl}
                  />
                </Paper>
              </Grid>;
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
