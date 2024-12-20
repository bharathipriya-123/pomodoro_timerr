import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import '../style/PomodoroTimer.css';

const PomodoroTimer = () => {
  
  const [duration, setDuration] = useState(25 * 60); 
  const [breakDuration, setBreakDuration] = useState(5 * 60); 
  const [remainingTime, setRemainingTime] = useState(duration); 
  const [isRunning, setIsRunning] = useState(false); 
  const [isBreak, setIsBreak] = useState(false); 

  
  const intervalRef = useRef(null);


  const Timer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 0) {
            clearInterval(intervalRef.current);
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setIsBreak(false);
    setRemainingTime(duration);
  };

 
  const handleTimerEnd = () => {
    if (isBreak) {
      setIsBreak(false);
      setRemainingTime(duration);
    } else {
      setIsBreak(true);
      setRemainingTime(breakDuration);
    }
    setIsRunning(false);
  };

  
  // useEffect(() => {
  //   if (!isRunning && !isBreak) {
  //     setRemainingTime(duration);
  //   }
  // }, [duration]);


  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>{isBreak ? "Break Time" : "Time"}</h1>
      <h2>{formatTime(remainingTime)}</h2>
      <button onClick={Timer}> Start</button>
      <button onClick={Timer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <label>
           Duration :
          <input
            type="number"
            value={duration / 60}
            onChange={(e) => setDuration(e.target.value * 60)}
            disabled={isRunning}
          />
        </label>
        <label>
          Break Duration:
          <input
            type="number"
            value={breakDuration / 60}
            onChange={(e) => setBreakDuration(e.target.value * 60)}
            disabled={isRunning}
          />
        </label>
      </div>
    </div>
  );
};

export default PomodoroTimer;
