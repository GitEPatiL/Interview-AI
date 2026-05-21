import React, { use, useState } from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({email, password});
  };

  if(loading){
    return (<main><h1>Loading......</h1></main>)
  }

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                placeholder="Enter Email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                placeholder="Enter password"
              />
            </div>
            <button className="button primary-button">Login</button>
          </form>
          <p>
            Dont have an Account , Register{" "}
            <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
