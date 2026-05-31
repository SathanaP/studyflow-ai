import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Timer from "./pages/Timer";
import Analytics from "./pages/Analytics";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  if (!user) {
  return <LoginPage />;
}

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col md:flex-row min-h-screen ${
          darkMode ? "bg-black" : "bg-gray-100"
        }`}
      >
        <Sidebar />

        <div className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;