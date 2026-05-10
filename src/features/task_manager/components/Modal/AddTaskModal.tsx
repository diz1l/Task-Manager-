import { useEffect, useState } from "react";
import styles from "./AddTaskModal.module.scss";
import { useTasks } from "../../store/store";
import { ACCENT } from "@/shared/constants";
import { createPortal } from "react-dom";
import type { AddTaskModalProps } from "./types";

export default function AddTaskModal({
  state,
  onClose,
  isOpen,
  taskId,
  initialTitle = "",
  initialDescription = "",
}: AddTaskModalProps) {
  const [text, setText] = useState<string>(initialTitle);
  const [description, setDescription] = useState<string>(initialDescription);
  const { addTask, editTask } = useTasks();

  const isEdit = !!taskId;

  const handleSubmit = () => {
    if (!text.trim()) return;
    if (isEdit) {
      editTask(taskId, text.trim(), description.trim());
    } else {
      addTask(text.trim(), state, description.trim());
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])


  return createPortal(
    <div className={styles.modal} onClick={onClose} onMouseDown={(e) => e.stopPropagation()}>

      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          placeholder="Task title..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <textarea
          className={styles.textarea}
          placeholder="Task description..."
          value={description}
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          style={{ "--accent": ACCENT[state] } as React.CSSProperties}
          onClick={handleSubmit}
        >
          {isEdit ? "Save" : "Add task"}
        </button>
      </div>
    </div>, 
    document.body
  );
}
