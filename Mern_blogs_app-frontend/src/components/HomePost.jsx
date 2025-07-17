import React from 'react'
import { IF } from "../url";


function HomePost({ post }) {
  return (
    <div>
      <div className='flex flex-wrap bg-white border-gray-300 shadow'>

        <div className='overflow-hidden w-full sm:w-1/3 h-48'>
          <img
            className='object-cover w-full h-full hover:scale-105 transition-transform duration-300'
            src={IF + post.photo}
            alt='Post image'
          />
        </div>


        <div className='pl-3 w-full sm:w-2/3 flex flex-col justify-between p-4'>
          <h5 className='text-xl font-bold tracking-tight text-gray-950'>
            {post.title}
          </h5>
          <div className='mb-3 text-xs font-semibold text-gray-500'>
            <p className='text-blue-400'>BY {post.username}</p>
            <div className='mt-2 font-normal text-gray-700'>
              <p>{post.desc.slice(0, 75)}...Read more</p>
            </div>
            <div className="flex flex-wrap pt-4 text-gray-400 text-xs">
              <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomePost
