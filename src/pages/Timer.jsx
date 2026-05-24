import PomodoroTimer from "../components/PomodoroTimer";

function Timer() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-6">
        Pomodoro Timer
      </h1>

      <PomodoroTimer />
    </div>
  );
}

export default Timer;