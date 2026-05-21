import React from 'react';
import { useNavigate,Link } from 'react-router';

const Register = () => {
    const navigate = useNavigate()

     const handleSubmit=(e)=>{
        e.preventDefault()
    }
  return (
    <div>
       <main>
        <div className='form-container'>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label htmlFor='username'>Username</label>
                    <input type='username' id='username' placeholder='Enter username' />

                </div>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='Enter Email' />

                </div>

                <div className="input-group">
                    <label htmlFor='password'>password</label>
                    <input type='password' id='password' placeholder='Enter password' />
                    
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
