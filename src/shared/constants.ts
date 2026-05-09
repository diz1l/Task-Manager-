import type { TaskState } from "@/store/types";

export const ACCENT: Record<TaskState, string> = {
  PLANNED: "var(--planned)",
  ONGOING: "var(--ongoing)",
  DONE: "var(--done)",
};

export const COLUMN_ORDER: TaskState[] = ["PLANNED", "ONGOING", "DONE"];
