import { useState, useEffect } from "react";

function PomodoroTimer() {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const resetTimer = () => {
    setTime(1500);
    setIsRunning(false);
  };

  return (
    <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Pomodoro Timer
      </h2>

      <div className="text-6xl font-bold text-center mb-6">
        {formatTime()}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(true)}
          className="px-5 py-3 bg-green-500 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          Start
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="px-5 py-3 bg-yellow-500 rounded-xl font-semibold hover:bg-yellow-600 transition"
        >
          Pause
        </button>

        <button
          onClick={resetTimer}
          className="px-5 py-3 bg-red-500 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;