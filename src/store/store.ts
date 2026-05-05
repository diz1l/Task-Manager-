import {create} from "zustand/react";

type Task = {
    id: string;
    title: string;
    state: "PLANNED" | "ONGOING" | "DONE";
}

interface StateProps {
    tasks: Task[];
    addTask: (title: string, state: Task["state"]) => void;
    deleteTask: (id: string) => void;
    draggedTask: Task | null;
    setDraggedTask: (task: Task | null) => void;
    moveTask: (id: string, state: Task["state"]) => void;
}

export const useTasks = create<StateProps>()((set) => ({
    tasks: [{id: crypto.randomUUID(), title: "testTask", state: "PLANNED"}],
    draggedTask: null,
    addTask: (title, taskState) =>
        set((store) =>
            ({tasks: [...store.tasks, {id: crypto.randomUUID(), title, state: taskState}]})),
    deleteTask: (id) =>
        set((store) =>
            ({tasks: store.tasks.filter((task) => task.id !== id)})),
    setDraggedTask: (task) => set({draggedTask: task}),
    moveTask: (id, newState) =>
        set(store => ({tasks: store.tasks.map(t =>
                t.id === id ? {...t, state: newState} : t)})),
}))
