import type { TaskState } from "../../store/types";

export interface AddTaskModalProps {
  state: TaskState;
  onClose: () => void;
  isOpen: boolean;
  taskId?: string;
  initialTitle?: string;
  initialDescription?: string;
}