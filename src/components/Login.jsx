import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!user ? (
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-xl"
        >
          Login with Google
        </button>
      ) : (
        <div>
          <img
            src={user.photoURL}
            alt="profile"
            className="w-12 h-12 rounded-full mx-auto"
          />

          <p className="text-center mt-2">
            {user.displayName}
          </p>

          <button
            onClick={handleLogout}
            className="w-full mt-3 bg-red-500 hover:bg-red-600 p-3 rounded-xl"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;