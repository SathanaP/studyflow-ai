import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const { user } = useAuth();

  const [analyticsData, setAnalyticsData] = useState([]);
  const [focusTime, setFocusTime] = useState(0);
  const [productivity, setProductivity] = useState(0);

  useEffect(() => {
    if (!user) return;

    const loadAnalytics = async () => {
      try {
        // Tasks
        const taskSnapshot = await getDocs(
          collection(db, "users", user.uid, "tasks")
        );

        const tasks = taskSnapshot.docs.map((doc) => doc.data());

        const completedTasks = tasks.filter(
          (task) => task.completed
        ).length;

        const productivityValue =
          tasks.length > 0
            ? Math.round(
                (completedTasks / tasks.length) * 100
              )
            : 0;

        setProductivity(productivityValue);

        // Study Plans
        const planSnapshot = await getDocs(
          collection(db, "users", user.uid, "studyPlans")
        );

        // Pomodoro Sessions
        const sessionSnapshot = await getDocs(
          collection(
            db,
            "users",
            user.uid,
            "pomodoroSessions"
          )
        );

        const sessions = sessionSnapshot.size;

        setFocusTime(sessions * 25);

        setAnalyticsData([
          {
            name: "Tasks",
            value: tasks.length,
          },
          {
            name: "Completed",
            value: completedTasks,
          },
          {
            name: "Plans",
            value: planSnapshot.size,
          },
          {
            name: "Sessions",
            value: sessions,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    loadAnalytics();
  }, [user]);

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-6">
        Analytics Dashboard 📊
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl">
          <h2 className="text-xl font-semibold">
            Productivity
          </h2>

          <p className="text-4xl font-bold mt-4">
            {productivity}%
          </p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl">
          <h2 className="text-xl font-semibold">
            Focus Time
          </h2>

          <p className="text-4xl font-bold mt-4">
            {Math.floor(focusTime / 60)}h{" "}
            {focusTime % 60}m
          </p>
        </div>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl">
        <h2 className="text-2xl font-semibold mb-6">
          StudyFlow Analytics
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={analyticsData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
            />

            <XAxis
              dataKey="name"
              stroke="#aaa"
            />

            <YAxis stroke="#aaa" />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;