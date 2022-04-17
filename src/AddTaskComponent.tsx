import React, {ChangeEvent, KeyboardEvent} from 'react';

type AddTaskComponentPropsType = {
    value: string
    error: string | null
    addTask: () => void
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AddTaskComponent: React.FC<AddTaskComponentPropsType> = (props) => {
    return (
        <div>
            <input value={props.value}
                   onChange={props.onChange}
                   onKeyPress={props.onKeyPress}
                   className={props.error ? 'error' : ' '}/>
            <button onClick={props.addTask}>+</button>
            <div className='error-message'>{props.error}</div>
        </div>
    )
}