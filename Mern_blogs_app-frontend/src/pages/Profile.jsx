import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { URL } from '../url'


function Profile() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [posts,setPosts]=useState([])
  const [updated, setUpdated] = useState(false)

  const fetchProfile = async () => {
    if(!user||!user._id){
      console.log("User is not logged in");
      return
    }
    try {
      const res = await axios.get(URL+`/api/user/${user._id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true,
      })
      
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword("")
      console.log("USer profile fetched:",res.data);
      

    }

    catch (err) {
      console.log("error fetching profile:",err);

    }


  }

  const handleUserUpdate = async () => {
    setUpdated(false)

    const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage.");
    return;
  }

    try {
      const res = await axios.put(URL+`/api/user/${user._id}`, 
        { username,email,password},
       { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials:true,
       
      })
      console.log("User updated",res.data);
      setUpdated(true)
      setUser(res.data)

    }
    catch (error) {
      console.log("Update failed",error);
      setUpdated(false)
    }

  }
  const handleUserDelete = async () => {
    setUpdated(false)
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage.");
      return;
    }
    try {
      const res = await axios.delete(URL+`/api/user/${user._id}`, {
        headers:{
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      })
      console.log("User deleted:",res.data);
      
      setUser(null)
      navigate("/")

    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(user?._id){

      fetchProfile()
    }
  }, [user?._id])


  return (
    <div>
      <Navbar />
     
     <div className='min-h-screen flex items-center justify-center px-4 py-8'>
  <div className='w-full max-w-md border p-6 rounded-lg shadow-2xl shadow-gray-500'>
    <div className='flex flex-col space-y-4'>
      <h1 className="text-xl font-bold text-center mb-4">Profile</h1>

      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className='outline-none border-b py-2 text-gray-700'
        placeholder='Your username'
      />

      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className='outline-none border-b py-2 text-gray-700'
        placeholder='Your email'
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className='outline-none border-b py-2 text-gray-700'
        placeholder='Enter new password'
      />

      <div className='flex justify-between mt-6'>
        <button
          onClick={handleUserUpdate}
          className='bg-black text-white font-semibold px-4 py-2 rounded hover:bg-gray-700'
        >
          Update Password
        </button>
        <button
          onClick={handleUserDelete}
          className='bg-black text-white font-semibold px-4 py-2 rounded hover:bg-red-800'
        >
          Delete Account
        </button>
      </div>

      {updated && (
        <h3 className='text-green-600 text-sm text-center mt-4'>
          User data updated successfully!
        </h3>
      )}
    </div>
  </div>
</div>

      <Footer />
    </div>
  )
}

export default Profile