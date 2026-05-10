import { create } from "zustand/react";
import { devtools, persist } from "zustand/middleware";
import type { Task, TaskState } from "./types";

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, state: TaskState, description?: string) => void;
  deleteTask: (id: string) => void;
  draggedTask: Task | null;
  setDraggedTask: (task: Task | null) => void;
  moveTask: (id: string, state: TaskState) => void;
  editTask: (id: string, title: string, description?: string) => void;
  deleteAllTasksInColumn: (state: TaskState) => void;
}

export const useTasks = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (title, taskState, description) =>
          set(
            (store) => ({
              tasks: [
                ...store.tasks,
                { id: crypto.randomUUID(), title, state: taskState, description},
              ],
            }),
            false,
            "addTask",
          ),
        deleteTask: (id) =>
          set(
            (store) => ({
              tasks: store.tasks.filter((task) => task.id !== id),
            }),
            false,
            "deleteTask",
          ),
        deleteAllTasksInColumn: (state) =>
          set(
            (store) => ({
              tasks: store.tasks.filter((task) => task.state !== state),
            }),
            false,
            "deleteAllTasksInColumn",
          ),
        setDraggedTask: (task) =>
          set({ draggedTask: task }, false, "draggedTask"),
        moveTask: (id, newState) =>
          set(
            (store) => ({
              tasks: store.tasks.map((t) =>
                t.id === id ? { ...t, state: newState } : t,
              ),
            }),
            false,
            "moveTask",
          ),
          editTask: (id, title, description) =>
          set(
            (store) => ({
              tasks: store.tasks.map((t) =>
                t.id === id ? { ...t, title, description } : t,
              ),
            }),
            false,
            "editTask",
          ),
      }),
      {
        name: "task-storage",
        partialize: (state) => ({ tasks: state.tasks }),
      },
    ),
  ),
);
