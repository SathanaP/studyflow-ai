import TaskManager from "../components/TaskManager";

function Tasks() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-6">
        Tasks
      </h1>

      <TaskManager />
    </div>
  );
}

export default Tasks;