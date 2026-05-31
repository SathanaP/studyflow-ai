import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const { user } = useAuth();

  // Load tasks for current user
  useEffect(() => {
    if (!user) return;

    const savedTasks = localStorage.getItem(
      `tasks_${user.email}`
    );

    try {
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks([]);
      }
    } catch {
      console.log("Error loading tasks");
    }
  }, [user]);

  // Save tasks for current user
  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      `tasks_${user.email}`,
      JSON.stringify(tasks)
    );
  }, [tasks, user]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter(
      (_, i) => i !== index
    );

    setTasks(updatedTasks);
  };

  return (
    <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Task Manager
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-black border border-zinc-700 text-white outline-none"
        />

        <button
          onClick={addTask}
          className="px-5 py-3 bg-blue-500 rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400">
            No tasks yet. Add your first task!
          </p>
        ) : (
          tasks.map((t, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black p-4 rounded-xl"
            >
              <p>{t}</p>

              <button
                onClick={() => deleteTask(index)}
                className="text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskManager;