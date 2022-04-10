import React, {ChangeEvent, KeyboardEvent} from 'react';

type AddTaskComponentPropsType = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    addTask: () => void
}

export const AddTaskComponent: React.FC<AddTaskComponentPropsType> = (props) => {
    return (
        <div>
            <input value={props.value}
                   onChange={props.onChange}
                   onKeyPress={props.onKeyPress}/>
            <button onClick={props.addTask}>+</button>
        </div>
    )
}