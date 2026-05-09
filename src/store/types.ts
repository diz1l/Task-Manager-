export type TaskState = "PLANNED" | "ONGOING" | "DONE";

export default interface ColumnProps {
  state: TaskState;
}
