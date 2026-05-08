import "./App.css";
import Column from "./components/Column.tsx";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Board</h1>
        <span>drag to move between columns</span>
      </header>
      <div className="App-board">
        <Column state="PLANNED" />
        <Column state="ONGOING" />
        <Column state="DONE" />
      </div>
    </div>
  );
};
