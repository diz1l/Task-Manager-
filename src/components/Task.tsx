import classNames from 'classnames';
import "./Task.css"
import trash from "../assets/trash-2.svg"
import {useTasks} from "../store/store.ts";

interface TaskProps {
    id: string;
    title: string;
    state: 'PLANNED' | 'ONGOING' | 'DONE';
}

const Task = ({id, title, state}:TaskProps) => {
    const deleteTask = useTasks(store => store.deleteTask);
    const setDraggedTask = useTasks(store => store.setDraggedTask);

    return (
        <div className="task"
             draggable
             onDragStart={() => setDraggedTask({id, title, state})}
        >
            <div>{title}</div>
            <div className="bottomWrapper">
                <div>
                    <img
                        src={trash}
                        onClick={() => {deleteTask(id)}}
                    />
                </div>
                <div className={classNames("status", state)}>{state}</div>
            </div>
        </div>
    );
};

export default Task;