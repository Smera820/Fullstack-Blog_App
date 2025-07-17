import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import { MdDelete } from 'react-icons/md';
import Comment from '../components/Comment'
import Footer from '../components/Footer'
import { BiEdit } from 'react-icons/bi'
import { URL, IF } from '../url'
import { FcManager } from "react-icons/fc"

function PostDetails() {

  const postId = useParams().id
  const [post, setPost] = useState({})
  const { user } = useContext(UserContext)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + `/api/post/${postId}`)
        if (res.data) {
          setPost(res.data)
        }
      }
      catch (err) {
        console.log(err);

      }
    }
    if (postId) {
      fetchPost()
    }

  }, [postId])



  const fetchPostComments = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + `/api/comments/post/${postId}`)
      setComments(res.data)
      setLoader(false)
    }
    catch (err) {
      setLoader(true)
      console.log(err);

    }
  }

  useEffect(() => {
    if (postId) {

      fetchPostComments()
    }
  }, [postId])

  const handleDeletePost = async () => {
    const authData = localStorage.getItem("authData");
    const token = authData ? JSON.parse(authData).token : null;

    if (!token) {
      console.log("No token found in localStorage.");
      return;
    }

    try {
      const res = await axios.delete(URL + `/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })
      console.log(res.data);
      navigate('/')

    }
    catch (err) {
      console.log(err);
    }
  }

  const postComment = async (e) => {
    e.preventDefault()

    const authData = localStorage.getItem("authData");
    const token = authData ? JSON.parse(authData).token : null;
    if (!token) {
      console.log("No token found in localStorage.");
      return;
    }

    console.log(token);
    console.log("Sending Comment:", comment);


    try {

      const res = await axios.post(URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      )
      console.log("comment post", res.data);


      setComment("")
      fetchPostComments()
    }
    catch (err) {
      console.log(err);


    }
  }

  return (
    <div>
      <Navbar />
      {loader ? <div className='h-[80vh] flex justify-center items-center w-full'>
        <Loader />
      </div> : <div className='px-8 md:px-[200px] mt-8'>
        <div className='border p-3 shadow'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-black md:3-xl'>
              {post.title}
            </h1>
            {user?._id === post?.userId && <div className='flex items-center justify-center x-2'>
              <p className="cursor-pointer" onClick={() => navigate("/edit/" + postId)} ><BiEdit /></p>
              <p className='cursor-pointer' onClick={handleDeletePost}>
                <MdDelete />
              </p>
            </div>
            }
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-4">


            <div className="flex " >   <FcManager className=" text-2xl mr-2 " > </FcManager> By {post.username}</div>
            <div className="flex  space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
            </div>
          </div>
          <div className='w-[100%] flex flex-col justify-center'>
            <img src={IF + post.photo}
              className='object-cover h-[45vh] mx-auto mt-8' />
            <p className='mx-auto mt-8 w-[80vh] border p-5 shadow-xl'>{post.desc}</p>
            <div className='flex justify-center items-center mt-8 space-x-4 font-semibold'>
              <p>Categories: </p>
              <div className='flex justify-center items-center space-x-2'>
                {post.categories?.map((c, i) => (
                  <div>
                    <div key={i} className='bg-gray-500 rounded-xl px-3 py-1'>
                      {c}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-center items-center p-3 flex-col mt-4'>
              <h3 className='flex justify-center items-center mt-8 space-x-4 font-semibold'>Comments:</h3>
              {comments?.map((c, index) => (
                <Comment key={c._id || index} c={c} post={post} />
              ))
              }

            </div>
            <div className="w-[90vh] border flex justify-center flex-col mt-4 md:flex-row">
              <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
              <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
            </div>

          </div>
        </div>

      </div>
      }
      <Footer />
    </div>

  )
}

export default PostDetails
