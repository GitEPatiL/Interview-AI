import React, { useState } from "react";

import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";



const Login = () => {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleLogin({ email, password });
    if (data?.user) {
      navigate("/");
    }
  };

  if(loading){
    return (<main><h1>Loading......</h1></main>)
  }

  return (
    <div className="min-h-screen w-full bg-[#FFF9D2] flex justify-center items-center p-4">
      <main className="w-full max-w-[350px] bg-[#FFEBCC] p-8 rounded-2xl shadow-sm border border-black/5">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Login</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="email"
                className="w-full border-none outline-none px-4 py-3 rounded-xl bg-white shadow-inner focus:ring-2 focus:ring-[#8CC0EB] text-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full border-none outline-none px-4 py-3 rounded-xl bg-white shadow-inner focus:ring-2 focus:ring-[#8CC0EB] text-gray-800"
              />
            </div>
            <button className="w-full mt-2 bg-[#8CC0EB] hover:bg-[#BFDDF0] text-gray-900 font-bold py-3 px-6 rounded-2xl transition-colors shadow-sm active:scale-95">
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Don't have an Account?{" "}
            <Link to={"/register"} className="text-[#8CC0EB] font-bold hover:text-[#BFDDF0] transition-colors">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
