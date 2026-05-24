import Sidebar from "./components/Sidebar";
import PomodoroTimer from "./components/PomodoroTimer";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex-1 text-white p-10">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mt-3">
          Track your productivity and study smarter.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-lg hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold">
              Tasks Completed
            </h2>

            <p className="text-4xl mt-4 font-bold">
              12
            </p>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-lg hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold">
              Study Hours
            </h2>

            <p className="text-4xl mt-4 font-bold">
              5.2h
            </p>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-lg hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold">
              Productivity
            </h2>

            <p className="text-4xl mt-4 font-bold">
              87%
            </p>
          </div>
        </div>

        {/* Task Manager */}
        <TaskManager />
        <PomodoroTimer />
      </div>
    </div>
  );
}

export default App;