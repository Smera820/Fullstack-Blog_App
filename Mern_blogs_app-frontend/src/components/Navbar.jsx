// import { useState, useEffect, useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// import {FaBars} from "react-icons/fa"
// import Menu from './Menu'
// import { UserContext } from "../context/UserContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   // const [token, setToken] = useState(localStorage.getItem("authData"));
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const[menu,setMenu]=useState(false)
// const path=useLocation().pathname

//   const showMenu =()=>{
//     setMenu(!menu)
//   }
// const {user}=useContext(UserContext)

//   // useEffect(() => {
//   //   setToken(localStorage.getItem("authData"));
//   // }, []);

//   // const handleLogout = () => {
//   //   localStorage.removeItem("authData"); // Remove token
//   //   setToken(null);
//   //   navigate("/login"); // Redirect to login
//   // };

//   return (
//     <nav className="bg-gray-800">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           {/* Mobile Menu Button */}
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//              <button
//              type="button"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
//             >
//               <span className="sr-only">Open main menu</span>
//             {isMobileMenuOpen ? (
//                 <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                  </svg>
//               )}
//              </button>
//            </div>

//           {/* Desktop Menu */}
//            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//              <div className="flex shrink-0 items-center">
//                <Link to="/" className="text-white text-xl font-bold">Blogosphere</Link>
//              </div>


//             {/* Search Bar (Only on Home Page) */}
//              {path === "/" && (
//             <div className="hidden sm:flex items-center ml-6">
//                  <input
//                    className="outline-none rounded-l-xl px-3 py-1 text-black bg-white"
//                    placeholder="Search a post"
//                    type="text"
//                    value={searchQuery}
//                    onChange={(e) => setSearchQuery(e.target.value)}
//                  />
//                  <button
//                    onClick={() => navigate(searchQuery ? `?search=${searchQuery}` : "/")}
//                    className="cursor-pointer p-2 bg-white text-black rounded-r-xl"
//                  >
//                    <BsSearch />
//               </button>
//                </div>
//              )}

//              {/* Right Side Buttons (Desktop) */}


           



//            <div className="hidden sm:flex items-center space-x-4 ml-auto">
//            <div className='hidden md:flex items-center justify-center space-x-4'> 
//              {
//                           user ? <h3><Link to='/write' className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Write</Link></h3> : <h3>
//                               <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</Link>
//                           </h3>
//                       }
//                       {user ? <div onClick={showMenu}>
//                           <p className='cursor-pointer relative text-gray-300'><FaBars /></p>
                            
//                               {menu && <Menu />}

                        
//                       </div> : <h3><Link to='/register' className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</Link></h3>}
//                   </div>
//                   <div onClick={showMenu} className='md:hidden text-lg'>
//                       <p className='cursor-pointer relative'><FaBars /></p>
                    
//                     {menu && <Menu />} 

//  </div>
//               {/* {token ? (
//                 <button
//                   onClick={handleLogout}
//                   className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <>
//                   <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
//                     Login
//                   </Link>
//                   <Link to="/register" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
//                     Register
//                   </Link>
//                 </>
//               )} */}
//              </div> 
//            </div>
//          </div>
//        </div>

//       {/* Mobile Menu */}
//       {menu && (
//          <div className="sm:hidden absolute top-16 left-0 w-full bg-gray-800 z-50 p-4 flex flex-col items-start space-y-3">
//            {user ? (
//              <>
//                <Link to="/write" className="text-white text-sm hover:text-gray-400">Write</Link>
//                <Link to={`/profile/${user._id}`} className="text-white text-sm hover:text-gray-400">Profile</Link>
//                <Link to={`/myblogs/${user._id}`} className="text-white text-sm hover:text-gray-400">My Blogs</Link>
//                <button onClick={() => setMenu(false)} className="text-white text-sm hover:text-gray-400">
//                  Close Menu
//                </button>
//              </>
//            ) : (
//              <>
//                <Link to="/login" className="text-white text-sm hover:text-gray-400">Login</Link>
//                <Link to="/register" className="text-white text-sm hover:text-gray-400">Register</Link>
//                <button onClick={() => setMenu(false)} className="text-white text-sm hover:text-gray-400">
//                  Close Menu
//                </button>
//              </>
//            )}
//          </div>
//        )}
//      </nav>
//    );
//  };

//  export default Navbar;





import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"



const Navbar = () => {
  
  const [prompt,setPrompt]=useState("")
  const [menu,setMenu]=useState(false)
  const navigate=useNavigate()
  const path=useLocation().pathname
  
  // console.log(prompt)
  

  const showMenu=()=>{
    setMenu(!menu)
  }
  
   
    const {user}=useContext(UserContext)
    
  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white  ">
    <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blogosphere </Link></h1>
    {path==="/" && <div className="flex justify-center items-center space-x-0">
    <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 text-black  bg-white rounded-l-xl" placeholder="Search a post" type="text"/>
    <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer p-1 bg-white text-black  rounded-r-xl "><BsSearch/></p>
    
    </div>}
    <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
      {user? <h3><Link to="/write">Write</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
      {user? <div onClick={showMenu}>
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>:<h3><Link to="/register">Register</Link></h3>}
    </div>
    <div onClick={showMenu} className="md:hidden text-lg">
      <p className="cursor-pointer relative"><FaBars/></p>
      {menu && <Menu/>}
    </div>

    </div>
  )
}


export default Navbar