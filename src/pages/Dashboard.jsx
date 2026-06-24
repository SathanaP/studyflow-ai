import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Dashboard() {
  const { user } = useAuth();

  const [taskCount, setTaskCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [planCount, setPlanCount] = useState(0);
  const [productivity, setProductivity] = useState(0);

  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      try {
        const taskSnapshot = await getDocs(
          collection(db, "users", user.uid, "tasks")
        );

        const tasks = taskSnapshot.docs.map((doc) => doc.data());

        const completed = tasks.filter(
          (task) => task.completed
        ).length;

        setTaskCount(tasks.length);
        setCompletedTasks(completed);

        const productivityValue =
          tasks.length > 0
            ? Math.round(
                (completed / tasks.length) * 100
              )
            : 0;

        setProductivity(productivityValue);

        const planSnapshot = await getDocs(
          collection(db, "users", user.uid, "studyPlans")
        );

        setPlanCount(planSnapshot.size);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboardData();
  }, [user]);

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="text-gray-400 mt-3">
        Track your productivity and study smarter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Total Tasks
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {taskCount}
          </p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Completed Tasks
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {completedTasks}
          </p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Study Plans
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {planCount}
          </p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Productivity
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {productivity}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;