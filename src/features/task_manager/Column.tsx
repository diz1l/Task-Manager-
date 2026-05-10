import { useState } from "react";
import classNames from "classnames";
import styles from "./Column.module.scss";
import { useTasks } from "./store/store";
import type { ColumnProps } from "./types";
import { ACCENT } from "@/shared/constants";
import Task from "./Task/Task";
import AddTaskModal from "./components/Modal/AddTaskModal";
import trash from "@/shared/assets/trash-2.svg";

export default function Column({ id, state }: ColumnProps) {
  const { tasks, setDraggedTask, draggedTask, moveTask, deleteAllTasksInColumn } = useTasks();

  const [open, setOpen] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);

  const count = tasks.filter((t) => t.state === state).length;

  return (
    <div
      className={classNames(styles.column, { [styles.drop]: drop })}
      style={{ "--accent": ACCENT[state] } as React.CSSProperties}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setDrop(false);
      }}
      onDrop={() => {
        if (draggedTask) moveTask(draggedTask.id, state);
        setDraggedTask(null);
        setDrop(false);
      }}
    >
      <div className={styles.titleWrapper}>
        <p>
          {state} {count > 0 && <span style={{ opacity: 0.5 }}>{count}</span>}
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.addBtn}
            onClick={() => setOpen(!open)}
            title="Add task"
          >
            +
          </button>
          <button 
            className={styles.clearBtn} 
            title="Delete all tasks" 
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => deleteAllTasksInColumn(state)}>
            <img src={trash} alt="delete all tasks" />
          </button>
        </div>
      </div>
      {tasks
        .filter((t) => t.state === state)
        .map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            state={task.state}
            description={task.description}
          />
        ))}
      {open && (
        <AddTaskModal
          key={id}
          isOpen={open}
          state={state}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
