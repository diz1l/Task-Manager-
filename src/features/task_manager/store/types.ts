export type TaskState = "PLANNED" | "ONGOING" | "DONE";

export type Task = {
  id: string;
  title: string;
  state: TaskState;
  description?: string;
};
