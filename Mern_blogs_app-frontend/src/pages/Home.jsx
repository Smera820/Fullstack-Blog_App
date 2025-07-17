import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import HomePosts from '../components/HomePost'
import { URL } from '../url'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Footer from '../components/Footer'
import Loader from '../components/Loader'


function Home() {
  const { search } = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)
  const [cat, setCat] = useState([])
  const [filter,setFilter]=useState(false)
  const [filterData, setFilterData] = useState([])

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/post/" + search)
      // console.log(res.data);

      setPosts(res.data)
      setFilterData(res.data)
      let cata = res.data.map((item) => { return item.categories })
      let sets = new Set()
      cata.forEach((category) => {
        category?.forEach((catas) => {
          if (catas.length > 0) sets.add(catas)
        })
      })

      setCat(Array.from(sets))

      console.log(res.data);

      if (res.data.length === 0) {
        setNoResults(true)
      }
      else {
        setNoResults(false)
      }
      setLoader(false)

    }
    catch (err) {
      console.log(err);
      setLoader(true)

    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  useEffect(()=>{
    console.log("posts data:",posts);
    
  },[posts])

  const fillterData = (filterDatas) => {
    let newpost = posts.filter((pos) => {
      return pos?.categories.includes(filterDatas)
    })
    setFilterData(newpost)

  }

  return (
    <div>
      <Navbar />

      <div>
        <div className="flex flex-wrap">
          <div className="p-3 m-5 flex flex-wrap justify-center">
            {cat.length>0 && cat?.map((category,index) => {
                return <button  key={index}
                className='p-3 m-5 h-[90px] w-[150px] border text-lg font-semibold bg-white hover:shadow-blue-300 shadow shadow-black'
                  onClick={() => fillterData(category)}>
                  {category}
                </button>
              })
            }
          </div>

        </div>
      </div>
      <div className='flex flex-wrap w-[95%] justify-center'>
        { loader ? <div className='h-screen flex justify-center item-center'>
            <Loader /> </div> : !noResults ?
            filterData.map((post) => 
              (
                <div key={post._id} className='flex flex-wrap m-2 sm:w[35vw] lg:w-[45vw] md:w-[50vw]'>
                  <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                    <HomePosts  post={post} />
                  </Link>
                </div>
              )) :( <h3 className='text-center font-bold mt-16'>
              No posts available
            </h3>)}
      </div>
      <Footer />
    </div>
  )
}

export default Home