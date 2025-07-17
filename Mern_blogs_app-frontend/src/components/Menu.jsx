import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url'


function Menu() {
  const { user } = useContext(UserContext)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [token,setToken] = useState(localStorage.getItem("authData"))
  useEffect(() => {
         // If no token exists, force logout
         setToken(localStorage.getItem("authData"))
      },[]);

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL+"/api/auth/logout", { withCredentials: true })
      localStorage.removeItem("authData")
      setToken(null)
      setUser(null)
      navigate("/login")
    } catch (err) {
      console.log(err);

    }
  }


  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
    {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}
    {!user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
    {user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user._id}>My blogs</Link></h3>}
    {user &&<h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}

    </div>
  )
}

export default Menu


// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../context/UserContext";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";


// function Menu() {
//   const { user, setUser } = useContext(UserContext);
//   const navigate = useNavigate();


//   // Fetch token from localStorage
//   const [token,setToken] = useState(localStorage.getItem("authData"))

//   useEffect(() => {
//     // If no token exists, force logout
//     setToken(localStorage.getItem("authData"))
//   },[]);

//   const handleLogout = async () => {
//     try {
//       const res=await axios.get("/api/auth/logout", { withCredentials: true });
//       localStorage.removeItem("authData"); // Clear token
//       setUser(null);
//       setToken(null)
//       navigate("/login");
//     } 
//     catch (err) {
//       console.error("Logout Error:", err);
//     }
//   };

//   return (
//     <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
//       {!token && (
//         <>
//           <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
//             <Link to="/login">Login</Link>
//           </h3>
//           <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
//             <Link to="/register">Register</Link>
//           </h3>
//         </>
//       )}

//       {token && user && (
//         <>
//           <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
//             <Link to={"/profile/"+user._id}>Profile</Link>
//           </h3>
//           <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
//             <Link to="/write">Write</Link>
//           </h3>
//           <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
//             <Link to={"/myblogs/"+user._id}>My Blogs</Link>
//           </h3>
//           <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer" onClick={handleLogout}>
//             Logout
//           </h3>
//         </>
//       )}
//     </div>
//   );
// }

// export default Menu;
