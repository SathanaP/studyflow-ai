import { useState, useEffect } from "react";

function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    try {
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch {
      console.log("Error loading tasks");
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
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
        {tasks.map((t, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default TaskManager;