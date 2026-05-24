import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Timer from "./pages/Timer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-black min-h-screen">
        <Sidebar />

        <div className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/timer" element={<Timer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;