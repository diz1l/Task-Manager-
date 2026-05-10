# Task Manager — Zustand Learning Project

Built this as a hands-on way to learn Zustand. The app is a Kanban board with drag-and-drop between columns.

---

## What's inside

Three columns: **PLANNED → ONGOING → DONE**

- Add tasks with title and description via a modal
- Edit tasks inline via modal
- Drag tasks between columns using HTML5 DnD
- Delete tasks inline
- Clear all tasks in a column

---

## Zustand store

```ts
useTasks
  ├── tasks[]                        // all tasks with id, title, state, description
  ├── draggedTask                    // currently dragged task (for DnD tracking)
  ├── addTask(title, state, description?)
  ├── deleteTask(id)
  ├── editTask(id, title, description?)
  ├── setDraggedTask(task)
  └── moveTask(id, newState)
```

Uses `devtools` (Redux DevTools support) and `persist` (saves tasks to localStorage) middleware.

---

## Stack

- React 19 + TypeScript
- Vite
- Zustand 5
- Vitest + Testing Library
- SCSS Modules
- classnames
- HTML5 Drag & Drop API

---

## Run

```bash
npm install
npm run dev
```

---

## Tests

```bash
npm run test
```

Unit tests for the Zustand store — covers `addTask`, `deleteTask`, `moveTask`, `setDraggedTask`.
