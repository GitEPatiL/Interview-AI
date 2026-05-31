import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import logo from "../../../assets/logo.png";
import { LockOutlined, MailOutlined, ArrowRightOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FFF9D2]">
      {/* Left Branding Side (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#BFDDF0] to-[#8CC0EB] p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIi8+PC9zdmc+')] opacity-50 z-0"></div>
        <div className="absolute w-[800px] h-[800px] bg-white/20 blur-[120px] rounded-full -top-40 -left-40 z-0 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-lg text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-3xl p-2 shadow-2xl mb-8 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-2xl" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Master your next interview.
          </h1>
          <p className="text-xl text-gray-800/80 font-medium leading-relaxed">
            AI-powered insights, personalized feedback, and actionable preparation plans in seconds.
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex-1 flex justify-center items-center p-8 relative">
        <div className="absolute w-[500px] h-[500px] bg-[#FFEBCC]/60 blur-[100px] rounded-full top-0 right-0 z-0 pointer-events-none"></div>
        
        <div className="w-full max-w-md relative z-10 bg-white/60 backdrop-blur-2xl p-10 rounded-[2rem] shadow-xl border border-white/50">
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden w-16 h-16 bg-white rounded-2xl p-2 shadow-sm mb-6 mx-auto">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 mt-2 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 group">
              <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative flex items-center">
                <MailOutlined className="absolute left-4 text-gray-400 group-focus-within:text-[#8CC0EB] transition-colors text-lg" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8CC0EB]/20 focus:border-[#8CC0EB] outline-none transition-all text-gray-800 font-medium placeholder-gray-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label htmlFor="password" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative flex items-center">
                <LockOutlined className="absolute left-4 text-gray-400 group-focus-within:text-[#8CC0EB] transition-colors text-lg" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8CC0EB]/20 focus:border-[#8CC0EB] outline-none transition-all text-gray-800 font-medium placeholder-gray-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="group w-full mt-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-gray-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : (
                <>Sign in <ArrowRightOutlined className="transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 font-medium mt-8">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-gray-900 font-bold hover:text-[#8CC0EB] transition-colors underline decoration-2 underline-offset-4 decoration-[#8CC0EB]/40 hover:decoration-[#8CC0EB]">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
