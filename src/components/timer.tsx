"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Timer: React.FC = () => {
  const [duration, setDuration] = useState(60); // Default duration: 60 seconds
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
      alert("Timer finished!"); // Basic alarm
    }

    return () => clearInterval(intervalId);
  }, [isRunning, remainingTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(duration);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Timer</h2>
      <div className="mb-4">
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-24 px-3 py-2 border rounded shadow-sm"
        />
        <span className="ml-2">Seconds</span>
      </div>
      <div className="text-4xl font-bold mb-4">
        {Math.floor(remainingTime / 60)}:
        {(remainingTime % 60).toString().padStart(2, "0")}
      </div>
      <div className="flex gap-2">
        {!isRunning ? (
          <Button variant="accent" onClick={startTimer}>Start</Button>
        ) : (
          <Button variant="accent" onClick={pauseTimer}>Pause</Button>
        )}
        <Button onClick={resetTimer}>Reset</Button>
      </div>
    </div>
  );
};
