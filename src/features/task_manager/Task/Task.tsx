import classNames from "classnames";
import styles from "./Task.module.scss";
import trash from "@/shared/assets/trash-2.svg";
import editBtn from "@/shared/assets/edit-btn.svg";
import { useTasks } from "../store/store";
import { useState } from "react";
import AddTaskModal from "../components/Modal/AddTaskModal";
import type { TaskProps } from "../types";

const Task = ({ id, title, state, description }: TaskProps) => {
  const { setDraggedTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.task}
      draggable={!open}
      onDragStart={() => setDraggedTask({ id, title, state, description })}
    >
      <div className={styles.titleHeader}>
        <div className={styles.taskTitle}>{title}</div>
        <button
          className={styles.edit}
          title="Edit"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setOpen(!open)}
        >
          <img src={editBtn} alt="edit" />
        </button>
      </div>
      <div className={styles.description}>
        {description && (
          <p className={styles.descriptionText}>{description}</p>
        )}
        <div className={styles.bottomWrapper}>
          <button
            className={styles.deleteBtn}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => deleteTask(id)}
            title="Delete"
          >
            <img src={trash} alt="delete" />
          </button>
          <div className={classNames(styles.status, styles[state])}>
            {state}
          </div>
        </div>
      </div>
      {open && (
        <AddTaskModal
          key={id}
          isOpen={open}
          state={state}
          onClose={() => setOpen(false)}
          taskId={id}
          initialTitle={title}
          initialDescription={description}
        />
      )}
    </div>
  );
};

export default Task;
