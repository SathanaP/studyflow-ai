import Login from "../components/Login";

function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl text-center w-96">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">
          StudyFlow AI
        </h1>

        <p className="text-gray-400 mb-6">
          Sign in to continue
        </p>

        <Login />
      </div>
    </div>
  );
}

export default LoginPage;