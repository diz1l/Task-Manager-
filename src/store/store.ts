import { create } from "zustand/react";
import { devtools, persist } from "zustand/middleware";
import type { TaskState } from "./types";

type Task = {
  id: string;
  title: string;
  state: TaskState;
};

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, state: Task["state"]) => void;
  deleteTask: (id: string) => void;
  draggedTask: Task | null;
  setDraggedTask: (task: Task | null) => void;
  moveTask: (id: string, state: Task["state"]) => void;
}

export const useTasks = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (title, taskState) =>
          set((store) => ({
            tasks: [
              ...store.tasks,
              { id: crypto.randomUUID(), title, state: taskState },
            ],
          }), false, "addTask"),
        deleteTask: (id) =>
          set((store) => ({ tasks: store.tasks.filter((task) => task.id !== id) }), false, "deleteTask"),
        setDraggedTask: (task) => set({ draggedTask: task }, false, "draggedTask"),
        moveTask: (id, newState) =>
          set((store) => ({
            tasks: store.tasks.map((t) =>
              t.id === id ? { ...t, state: newState } : t,
            ),
          }), false, "moveTask"),
      }),
      {
        name: "task-storage",
        partialize: (state) => ({ tasks: state.tasks }),
      }
    )
  )
);
