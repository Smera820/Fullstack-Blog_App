import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import HomePost from '../components/HomePost'
import Footer from '../components/Footer'
import { URL } from '../url'


function MyBlogs() {
  const { search } = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)


  const fetchPosts = async () => {
    setLoader(true)
    const token=localStorage.getItem("token")
    try {
      const res = await axios.get(URL+`/api/post/user/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      )
      setPosts(res.data)
      if (res.data.length === 0) {
        setNoResults(true)
      }
      else {
        setNoResults(false)
      }
      setLoader(false)
    }
    catch(err) {
      console.log(err);
      setLoader(true)


    }
    console.log("User from context:", user);

  }

  useEffect(() => {
    if(user?._id)
    fetchPosts()
  }, [user._id])

  return (
    <div>
      <Navbar />
     <div className='px-4 md:px-[100px] min-h-[80vh] mt-8'>
  {loader ? (
    <div className='h-[40vh] flex justify-center items-center'>
      <Loader />
    </div>
  ) : !noResults ? (
    <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post) => (
        <Link
          to={user ? `/posts/post/${post._id}` : '/login'}
          key={post._id}
          className='block hover:scale-105 transition-transform duration-200'
        >
          <HomePost post={post} />
        </Link>
      ))}
    </div>
  ) : (
    <h3 className='text-center font-bold mt-16'>No posts available</h3>
  )}
</div>

      <Footer/>
    </div>
  )
}

export default MyBlogs