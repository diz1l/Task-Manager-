import "./Column.css";
import Task from "./Task.tsx";
import { useTasks } from "../store/store.ts";
import { useState } from "react";
import classNames from "classnames";

interface ColumnProps {
  state: "PLANNED" | "ONGOING" | "DONE";
}

const ACCENT: Record<ColumnProps["state"], string> = {
  PLANNED: "var(--planned)",
  ONGOING: "var(--ongoing)",
  DONE: "var(--done)",
};

export default function Column({ state }: ColumnProps) {
  const tasks = useTasks((store) => store.tasks);
  const addTask = useTasks((store) => store.addTask);
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const setDraggedTask = useTasks((store) => store.setDraggedTask);
  const draggedTask = useTasks((store) => store.draggedTask);
  const moveTask = useTasks((store) => store.moveTask);
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
        <div className="Modal" onClick={() => setOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              placeholder="Task title..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && text.trim()) {
                  addTask(text.trim(), state);
                  setOpen(false);
                  setText("");
                }
              }}
            />
            <button
              style={{ "--accent": ACCENT[state] } as React.CSSProperties}
              onClick={() => {
                if (text.trim()) {
                  addTask(text.trim(), state);
                  setOpen(false);
                  setText("");
                }
              }}
            >
              Add task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
