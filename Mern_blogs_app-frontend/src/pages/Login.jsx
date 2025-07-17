import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext'


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const { setUser} = useContext(UserContext)
  const navigate = useNavigate()
  


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Using axios to make the POST request
      const res = await axios.post(URL + "/api/auth/login",
        {
          email: email,
          password: password
        },
        {
          withCredentials: true,  // This is similar to the 'credentials: include' in fetch
        }
      );

      // If the request was successful
      if (res.status === 200) {
        const data = res.data;  // Extract JSON data
        // const cookies = res.headers['set-cookie'];  // Extract cookies if needed
        // console.log('Data:', data);
        // console.log('Cookies:', cookies);
        const token = data.token
        const role = data.role


        if (token){
          console.log(token);
          localStorage.setItem("token",token)
          const authData = { token, role };
          localStorage.setItem("authData", JSON.stringify(authData));
          setUser(data);  // Update the state with user data
          navigate("/");  // Navigate after successful login
        } else {
          console.error('Request failed with status:', res.status);
        }
  
        
        }

    }
    catch (err) {
      setError(true)
      console.log(err);

    }
  }

  return (
    <div>
      <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-xl front-extrabold'>
          <Link to="/">Blogospher </Link>

        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>

      </div>
      <div className='w-full flex justify-center items-center h-[80vh]'>
        <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
          <h1 className='text-xl font-bold text-left'>
            Login to your account
          </h1>

          <input onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-2 border-black outline-0' type='email' placeholder='Enter your email'>
          </input>
          <input onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-2 border-black outline-0' type='password' placeholder='Enter your password'>
          </input>

          <button onClick={handleLogin} className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover-bg-grey-500 hover:text-black'>
            Login
          </button>

          {
            error && <h3 className='text-red-500 text -sm'>Something went wrong</h3>
          }
          <div className='flex justify-center items-center space-x-3'>
            <p>
              New Here?
            </p>
            <p className='text-green-500 hover:text-black'>

              <Link to='/register'>Register</Link>
            </p>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Login


