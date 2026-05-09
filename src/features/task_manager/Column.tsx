import "./styles.css";
import { useState } from "react";
import classNames from "classnames";
import { useTasks } from "@/store/store.ts";
import type ColumnProps from "@/store/types.ts";
import { ACCENT } from "@/shared/constants";
import Task from "@/features/task_manager/Task/Task";
import AddTaskModal from "@/features/task_manager/components/Modal/AddTaskModal";

export default function Column({ state }: ColumnProps) {
  const { tasks, setDraggedTask, draggedTask, moveTask } = useTasks();
  // throw new Error("test error");


  const [open, setOpen] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);

  const count = tasks.filter((t) => t.state === state).length;


  return (
    <div
      className={classNames("column", { drop })}
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
      <div className="titleWrapper">
        <p>
          {state} {count > 0 && <span style={{ opacity: 0.5 }}>{count}</span>}
        </p>
        <button onClick={() => setOpen(!open)} title="Add task">
          +
        </button>
      </div>

      {tasks
        .filter((t) => t.state === state)
        .map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            state={task.state}
          />
        ))}

      {open && (
        <AddTaskModal state={state} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
