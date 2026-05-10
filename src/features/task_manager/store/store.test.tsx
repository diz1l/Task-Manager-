import { useTasks } from "./store";
import { renderHook, act } from "@testing-library/react";

describe("TaskStore", () => {
  beforeEach(() => {
    useTasks.setState({ tasks: [] });
  });

  it("should add a task", () => {
    const { result } = renderHook(() => useTasks((state) => state));
    act(() => {
      result.current.addTask("New Task", "PLANNED");
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe("New Task");
  });

  it("should delete a task", () => {
    const { result } = renderHook(() => useTasks((state) => state));
    act(() => {
      result.current.addTask("To Delete", "PLANNED");
    });
    const taskId = result.current.tasks[0].id;
    act(() => {
      result.current.deleteTask(taskId);
    });
    expect(result.current.tasks).toHaveLength(0);
  });

  test("get state", () => {
    useTasks.getState().addTask("Test Task", "PLANNED");
    const tasks = useTasks.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Test Task");
  });

  test("moveTask", () => {
    const { result } = renderHook(() => useTasks((state) => state));
    act(() => {
      result.current.addTask("Move Task", "PLANNED");
    });
    const taskId = result.current.tasks[0].id;
    act(() => {
      result.current.moveTask(taskId, "ONGOING");
    });
    expect(result.current.tasks[0].state).toBe("ONGOING");
  });

  test("setDraggedTask", () => {
    const { result } = renderHook(() => useTasks((state) => state));
    act(() => {
      result.current.addTask("Drag Task", "PLANNED");
    });
    const task = result.current.tasks[0];
    act(() => {
      result.current.setDraggedTask(task);
    });
    expect(result.current.draggedTask).toEqual(task);
  });
});
