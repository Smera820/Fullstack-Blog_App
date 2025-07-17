import React, { useContext } from 'react'
import { URL } from '../url'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../context/UserContext'


function Comment({ c, post }) {
  const { user } = useContext(UserContext)
  const deleteComment = async (id) => {
    const authData = localStorage.getItem("authData");
    const token = authData ? JSON.parse(authData).token : null;

    if (!token) {
      console.log("No token found in localStorage.");
      return;
    }

    try {
      await axios.delete(URL + "/api/comments/" + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }, withCredentials: true
      })
      window.location.reload(true)
    }
    catch (err) {
      console.log(err);

    }
  }

  return (
    <div className='px-2 py-2 bg-gray-400 w-[90vh] rounded-lg my-2'>
      <div className='flex items-center justify-between'>
        <h3 className='flex-bold text-gray-600'>@{c.author}</h3>
        <div className='flex justify-center items-center space-x-4'>
          <p>{new Date(c.updatedAt).toString().slice(3, 15)}</p>
          {user?._id === c?.userId ?
            <div className='flex justify-center items-center space-x-2'>
              <p className='cursor_pointer' onClick={() => deleteComment(c._id)}>
                <MdDelete />
              </p>
            </div> : ""}

        </div>

      </div>
      <p className='px-4 mt-2'> {c.comment}</p>

    </div>
  )
}

export default Comment