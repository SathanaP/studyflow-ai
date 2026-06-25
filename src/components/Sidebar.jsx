import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Login from "./Login";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  BarChart3,
  Brain,
} from "lucide-react";
function Sidebar() {
  const { darkMode, toggleTheme } = useTheme();
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
        <li>
          <Link
            to="/planner"
            className="flex items-center gap-3 hover:text-blue-400 hover:translate-x-2 transition duration-300"
          >
          <Brain size={20} />
            AI Planner
          </Link>
        </li>
        <li>
          <Link
            to="/ai-chat"
            className="flex items-center gap-3 hover:text-blue-400 hover:translate-x-2 transition duration-300"
          >
          <Brain size={20} />
            AI Assistant
          </Link>
        </li>
      </ul>
      {/*
      <button
        onClick={toggleTheme}
        className="w-full mb-5 bg-zinc-800 hover:bg-zinc-700 rounded-xl p-3 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      */}
      <Login />
      
    </div>
  );
}

export default Sidebar;