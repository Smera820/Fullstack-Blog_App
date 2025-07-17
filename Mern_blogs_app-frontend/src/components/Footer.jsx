import React from 'react'

function Footer() {
  return (
    <div>
      <div className='mt-8 w-full bg-gray-800 px-8  md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 
      item-start md:justify-between text-sm md:text-md py-8'>
        <div className='flex flex-col class="rounded-md px-3 py-2 text-sm font-medium text-gray-300'> 
          <p> Featured Blogs </p>
          <p>Most Viewed</p>
          <p>Reader Choice</p>
        </div>


        <div className='flex flex-col class="rounded-md px-3 py-2 text-sm font-medium text-gray-300'> 
          <p> Forum </p>
          <p>Support</p>
          <p>Recent Post</p>
        </div>


        <div className='flex flex-col class="rounded-md px-3 py-2 text-sm font-medium text-gray-300'> 
          <p> Privacy Policy </p>
          <p>About Us</p>
          <p>Terms and Conditions</p>
        </div>
      </div>
      <p className='pb-6 text-center class="rounded-md px-3 py-2 font-medium text-gray-300 hover:text-white bg-gray-800 text-sm '>All rights reserved @Blogoshere 2025</p>



    </div>
  )
}

export default Footer
