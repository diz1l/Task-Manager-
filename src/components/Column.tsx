import "./Column.css"
import Task from "./Task.tsx";
import {useTasks} from "../store/store.ts";
import {useState} from "react";
import classNames from "classnames";

interface ColumnProps {
    state: 'PLANNED' | 'ONGOING' | 'DONE';
}

export default function Column({state}:ColumnProps){
    const tasks = useTasks(store => store.tasks);
    const addTask = useTasks(store => store.addTask);
    const [text, setText] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const setDraggedTask = useTasks(store => store.setDraggedTask);
    const draggedTask = useTasks(store => store.draggedTask);
    const moveTask = useTasks(store => store.moveTask);
    const [drop , setDrop] = useState<boolean>(false);

    return (
        <div className={classNames("column", {drop: drop})}
             onDragOver={e => {
                  setDrop(true);
                 e.preventDefault();
             }}
             onDragLeave={e => {
                 setDrop(false );
                 e.preventDefault();
             }}
             onDrop={() => {
                 if (draggedTask) moveTask(draggedTask.id, state);
                 setDraggedTask(null);
             }}
        >
            <div className="titleWrapper">
                <p>{state}</p>
                <button onClick={()=> {setOpen(!open)}}>Add</button>
            </div>
            {tasks.filter((task) => task.state === state).map((task) => (
                <Task key={task.id} id={task.id} title={task.title} state={task.state}/>
            ))}
            {open && (
                <div className="Modal">
                    <div className="modalContent">
                        <input onChange={e => setText(e.target.value)} value={text}/>
                        <button onClick={() => { addTask(text, state); setOpen(false); setText(""); }}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}