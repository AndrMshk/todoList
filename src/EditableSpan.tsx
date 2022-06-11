import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
      setEditMode(true);
      setTitle(props.value);
    };
    const activateViewMode = () => {
      setEditMode(false);
      props.onChange(title);
    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        console.log(e.key);
      }
    };

    return editMode
      ? <TextField
        value={title}
        onChange={changeTitle}
        autoFocus onBlur={activateViewMode}
        onKeyPress={onKeyPressHandler}
      />
      : <span onDoubleClick={activateEditMode}>{props.value}</span>;
  },
);