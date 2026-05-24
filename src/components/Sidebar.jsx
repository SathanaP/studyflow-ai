function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        StudyFlow AI
      </h1>

      <ul className="space-y-4">
        <li className="hover:text-blue-400 hover:translate-x-2 transition duration-300 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-blue-400 hover:translate-x-2 transition duration-300 cursor-pointer">
          Tasks
        </li>

        <li className="hover:text-blue-400 hover:translate-x-2 transition duration-300 cursor-pointer">
          Pomodoro Timer
        </li>

        <li className="hover:text-blue-400 hover:translate-x-2 transition duration-300 cursor-pointer">
          Analytics
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;