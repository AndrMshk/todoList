import { setAppStatusAC, setErrorAC } from '../bll/app-reducer';
import { Dispatch } from 'redux';
import { DispatchType } from '../store';
import { ResponseType } from '../../api/todolists-api';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<DispatchType>) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC('Some error occurred'));
  }
  dispatch(setAppStatusAC('failed'));
};

export const handleServerNetworkError = (message: string, dispatch: Dispatch<DispatchType>) => {
  dispatch(setAppStatusAC('failed'));
  dispatch(setErrorAC(message));
};