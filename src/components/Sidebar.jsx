import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  BarChart3,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-full md:w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 text-white p-5 flex flex-col">
      <h1 className="text-3xl font-bold mb-10 text-blue-400">
        StudyFlow AI
      </h1>

      <ul className="space-y-5 flex-1">
        <li>
          <Link
            to="/"
            className="flex items-center gap-3 hover:text-blue-400 hover:translate-x-2 transition duration-300"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/tasks"
            className="flex items-center gap-3 hover:text-blue-400 hover:translate-x-2 transition duration-300"
          >
            <CheckSquare size={20} />
            Tasks
          </Link>
        </li>

        <li>
          <Link
            to="/timer"
            className="flex items-center gap-3 hover:text-blue-400 hover:translate-x-2 transition duration-300"
          >
            <Timer size={20} />
            Pomodoro Timer
          </Link>
        </li>

        <li>
          <Link
            to="/analytics"
            className="flex items-center gap-3 hover:text-blue-400 hover:translate-x-2 transition duration-300"
          >
            <BarChart3 size={20} />
            Analytics
          </Link>
        </li>
      </ul>

      {/* User Profile Section */}
      <div className="mt-10 border-t border-zinc-800 pt-5">
        <p className="text-sm text-gray-400">
          Logged in as
        </p>

        <p className="font-semibold text-blue-400">
          Sathana
        </p>
      </div>
    </div>
  );
}

export default Sidebar;