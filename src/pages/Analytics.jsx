import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const data = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 6 },
    { day: "Sat", hours: 4 },
    { day: "Sun", hours: 7 },
  ];

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-6">
        Analytics Dashboard 📊
      </h1>

      <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl">
        <h2 className="text-2xl font-semibold mb-6">
          Weekly Study Hours
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />

            <XAxis dataKey="day" stroke="#aaa" />

            <YAxis stroke="#aaa" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="hours"
              stroke="#3b82f6"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;