import { useState } from "react";
import "./App.css";
import ChildComponent from "./ChildComponent.tsx";

function App() {
  const [globalCount, setGlobalCount] = useState(1);
  const [parentCount, setParentCount] = useState(0);

  console.log("Parent rerender!");

  const incrementGlobalCount = () =>
    setGlobalCount((prevCount) => prevCount + 1);

  const incrementParentCount = () =>
    setParentCount((prevCount) => prevCount + 1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid red",
        width: "80vw",
        padding: "2rem 5rem",
        gap: "1rem",
      }}
    >
      <h1>Parent</h1>

      <h2 style={{ color: "aqua" }}>{`Global count: ${globalCount}`}</h2>
      <h2 style={{ color: "orange" }}>{`Parent count: ${parentCount}`}</h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          style={{ flex: 1, backgroundColor: "aqua", color: "black" }}
          onClick={incrementGlobalCount}
        >
          Increment global count
        </button>

        <button
          style={{ flex: 1, backgroundColor: "orange", color: "black" }}
          onClick={incrementParentCount}
        >
          Increment parent count
        </button>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <ChildComponent
          globalCount={globalCount}
          incrementCount={incrementGlobalCount}
        />

        <ChildComponent
          globalCount={globalCount}
          incrementCount={incrementGlobalCount}
        />
      </div>
    </div>
  );
}

export default App;
