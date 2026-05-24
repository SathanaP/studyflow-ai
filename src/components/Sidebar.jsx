import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        StudyFlow AI
      </h1>

      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="hover:text-blue-400 hover:translate-x-2 transition duration-300 block"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/tasks"
            className="hover:text-blue-400 hover:translate-x-2 transition duration-300 block"
          >
            Tasks
          </Link>
        </li>

        <li>
          <Link
            to="/timer"
            className="hover:text-blue-400 hover:translate-x-2 transition duration-300 block"
          >
            Pomodoro Timer
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className="hover:text-blue-400 hover:translate-x-2 transition duration-300 block"
          >
            Analytics
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;