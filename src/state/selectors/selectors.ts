import { useSelector } from 'react-redux';
import { AppRootStateType } from '../store';
import { TodolistType } from '../../AppWithRedux';
import { TasksStateType } from '../../App';

export let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
export let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
