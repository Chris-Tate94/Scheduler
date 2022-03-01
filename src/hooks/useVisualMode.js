import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      history.pop();
    }

    history.push(newMode);
  }

  function back() {
    let historyCopy = history.slice(0);

    let prevMode;

    if (historyCopy.length > 1) {
      historyCopy.pop();

      prevMode = historyCopy[historyCopy.length - 1];

      setHistory(historyCopy);
    } else {
      prevMode = historyCopy[0];
    }

    return setMode((prev) => prevMode);
  }

  return { mode, transition, back };
}
