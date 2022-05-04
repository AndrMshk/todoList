import React, { KeyboardEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string
  callBack: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(props.title);

  const onDoubleClickHandler = () => {
    if (newTitle === '') {
      setNewTitle(props.title);
    } else {
      props.callBack(newTitle);
    }
    setEdit(!edit);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      onDoubleClickHandler();
    }
  };

  return (
    edit
      ? <input
        value={newTitle}
        autoFocus
        onBlur={onDoubleClickHandler}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      : <span
        onDoubleClick={onDoubleClickHandler}
      >
        {props.title}
    </span>
  );
};
