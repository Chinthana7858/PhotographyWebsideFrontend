import axios from "axios";
import { useState } from "react";
import NavBar from "../Ui/Templates/NavBar";


export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://chinthanaphotography.azurewebsites.net/api/v1/user/login", {
        email,
        password,
      });

      const token = response.data; // Assuming your server returns the JWT token
      localStorage.setItem("jwtToken", token);
      console.log("JWT Token:", token);
      window.location.href = "/Home/Pw-Admin";
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error, e.g., show an error message to the user
    }
  };
  return (
    <div> <div className='fixed z-20 w-full'>
    <NavBar/>
   </div>
      <div className="flex items-center min-h-screen pt-32 bg-gray-100 lg:justify-center">
      <div
        className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          className="p-4 py-6 text-white bg-blue-100 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
          <img
              src={`${process.env.PUBLIC_URL}https://i.imgur.com/eRQNKoM.png`}
              alt="logo"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Admin Login</h3>
          <form onSubmit={handleLogin} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            {/* <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
            </div> */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
              </span>
              <div className="flex flex-col space-y-4">

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
