import{ useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault(); 

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard/upload");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <form
        onSubmit={handleLogin}
        className="w-[90%] sm:w-[30%] flex flex-col gap-4 bg-white rounded shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to your account
        </h2>

        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
