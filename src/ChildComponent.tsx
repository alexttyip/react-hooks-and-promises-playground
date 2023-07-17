import { useCallback, useEffect, useMemo, useState } from "react";
import { slowClient } from "./clients/slowClient.ts";

type ChildComponentProps = {
  globalCount: number;
  incrementCount: () => void;
};

const ChildComponent = ({
  globalCount,
  incrementCount,
}: ChildComponentProps) => {
  const [childCount, setChildCount] = useState(0);

  const expensiveComputationResult = useMemo(() => {
    let result = 0;

    for (let i = 0; i < childCount * 1000000000; i++) {
      result *= i;
    }

    return result;
  }, [childCount]);

  console.log("Child rerender!");

  const doSomething = useCallback(() => {
    console.log("Child not useless!");
    console.log(childCount);
  }, [childCount]);

  useEffect(() => {
    doSomething();
  }, [doSomething]);

  const incrementGlobalCountSlowly = async () => {
    await slowClient().then(() => {
      incrementCount();
    });
  };

  const incrementChildCount = () => setChildCount((prevCount) => prevCount + 1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid orange",
        flex: 1,
        padding: "1rem",
      }}
    >
      <h1>Child</h1>

      <h2 style={{ color: "aqua" }}>{`Global count: ${globalCount}`}</h2>
      <h2 style={{ color: "magenta" }}>{`Child count: ${childCount}`}</h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          style={{ flex: 1, backgroundColor: "aqua", color: "black" }}
          onClick={incrementGlobalCountSlowly}
        >
          Increment global count slowly
        </button>

        <button
          style={{ flex: 1, backgroundColor: "magenta", color: "black" }}
          onClick={incrementChildCount}
        >
          Increment child count
        </button>
      </div>
    </div>
  );
};

export default ChildComponent;
