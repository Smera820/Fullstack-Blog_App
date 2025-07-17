import { Route, Routes, Navigate } from 'react-router-dom'
import UserContextProvider, { UserContext } from './context/UserContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import EditPost from './pages/EditPost'
import MyBlogs from './pages/MyBlogs'
import Profile from './pages/Profile'
import { useContext } from 'react'

function App() {

  // const storedData = localStorage.getItem("authData");
  // const data=storedData?JSON.parse(storedData):{}
  // console.log(data);
  // const {token} = data
  // console.log(token);

  return (
    <>
      <div>

        <UserContextProvider>
          <Routes>
            <Route exact path='/' element={<Home />} />
            {/* <Route exact path='/' element={token? <Home/>:<Navigate to={"/login"}/>}/> */}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/write' element={<CreatePost />} />
            <Route exact path='/posts/post/:id' element={<PostDetails />} />
            <Route exact path='/edit/:id' element={<EditPost />} />
            <Route exact path='/myblogs/:id' element={<MyBlogs />} />
            <Route exact path='/profile/:id' element={<Profile />} />
          </Routes>
        </UserContextProvider>

      </div>
    </>
  )
}

export default App
