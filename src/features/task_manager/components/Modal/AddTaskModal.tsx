import { useTasks } from "@/store/store";
import type { TaskState } from "@/store/types";
import React, { useState } from "react";
import { ACCENT } from "@/shared/constants";

interface AddTaskModalProps {
  state: TaskState;
  onClose: () => void;
}

export default function AddTaskModal({ state, onClose }: AddTaskModalProps) {
  const [text, setText] = useState<string>("");
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (text.trim()) {
      addTask(text.trim(), state);
      onClose();
      setText("");
    }
  };

  return (
    <div className="Modal" onClick={() => onClose()}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          placeholder="Task title..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim()) {
              handleAddTask();
            }
          }}
        />
        <button
          style={{ "--accent": ACCENT[state] } as React.CSSProperties}
          onClick={handleAddTask}
        >
          Add task
        </button>
      </div>
    </div>
  );
}
