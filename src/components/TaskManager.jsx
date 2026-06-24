import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const { user } = useAuth();

  // Load tasks from Firestore
  useEffect(() => {
    if (!user) return;

    const loadTasks = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "tasks")
        );

        const loadedTasks = [];

        querySnapshot.forEach((doc) => {
          loadedTasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, [user]);

  // Add task
  const addTask = async () => {
    if (task.trim() === "") return;

    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "tasks"),
        {
          text: task,
          completed: false,
          createdAt: new Date(),
        }
      );

      setTasks([
        ...tasks,
        {
          id: docRef.id,
          text: task,
          completed: false,
        },
      ]);

      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task completion
  const toggleTask = async (taskItem) => {
    try {
      await updateDoc(
        doc(
          db,
          "users",
          user.uid,
          "tasks",
          taskItem.id
        ),
        {
          completed: !taskItem.completed,
        }
      );

      setTasks(
        tasks.map((t) =>
          t.id === taskItem.id
            ? {
                ...t,
                completed: !t.completed,
              }
            : t
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(
        doc(
          db,
          "users",
          user.uid,
          "tasks",
          taskId
        )
      );

      setTasks(
        tasks.filter(
          (task) => task.id !== taskId
        )
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
          tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between bg-black p-4 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.completed || false}
                  onChange={() => toggleTask(t)}
                />

                <p
                  className={
                    t.completed
                      ? "line-through text-gray-500"
                      : ""
                  }
                >
                  {t.text}
                </p>
              </div>

              <button
                onClick={() => deleteTask(t.id)}
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