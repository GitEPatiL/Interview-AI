import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router';
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const [username,setUsername]= useState("")
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");

    const {loading,handleRegister}= useAuth()

    const navigate = useNavigate()

     const handleSubmit=async (e)=>{
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/login")
    }
  return (
    <div>
       <main>
        <div className='form-container'>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label htmlFor='username'>Username</label>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type='text' id='username' placeholder='Enter username' autoComplete='username' />

                </div>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type='email' id='email' placeholder='Enter Email' autoComplete='email' />

                </div>

                <div className="input-group">
                    <label htmlFor='password'>password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type='password' id='password' placeholder='Enter password' autoComplete='new-password' />
                    
                </div>
                <button className='button primary-button'>Register</button>
            </form>

            <p>Already have an Account  ?<Link to={"/login"}>Login</Link> </p>
        </div>
      </main>
    </div>
  )
}

export default Register
