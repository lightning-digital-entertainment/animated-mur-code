import { useState, useRef } from "react";
import { AnimatedMUR } from "../lib/AnimatedMUR";

function App() {
  const [data, setData] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  function clickHanlder() {
    if (inputRef.current?.value) {
      setData(inputRef.current.value);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        inset: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input ref={inputRef} />
        <button onClick={clickHanlder}>Generate QR</button>
        {data ? (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "white",
              borderRadius: "1rem",
            }}
          >
            <AnimatedMUR value={data} interval={100} chunkLength={10} />
          </div>
        ) : undefined}
      </div>
    </div>
  );
}

export default App;
