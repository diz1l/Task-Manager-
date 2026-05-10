import type { TaskState } from "./store/types";

export interface TaskProps {
  id: string;
  title: string;
  state: TaskState;
  description?: string;
}

export interface ColumnProps {
  state: TaskState;
  id: TaskProps["id"];
}

