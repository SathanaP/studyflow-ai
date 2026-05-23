import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex-1 text-white p-10">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mt-3">
          Track your productivity and study smarter.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">
              Tasks Completed
            </h2>

            <p className="text-4xl mt-4 font-bold">
              12
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">
              Study Hours
            </h2>

            <p className="text-4xl mt-4 font-bold">
              5.2h
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">
              Productivity
            </h2>

            <p className="text-4xl mt-4 font-bold">
              87%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;