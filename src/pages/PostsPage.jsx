import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import axios from "../utils/axios"
import moment from "moment"

export default function PostsPage() {
    const [myPosts , setMypost] = useState([])
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState("")
    console.log(myPosts)
  
    async  function getMyPosts(){
      try {
          
          setLoading(true)
            const {data} = await axios.get("/post/myposts")
           setMypost(data.list)
           setLoading(false)
          

        } catch (error) {
          setError(error.response?.data?.msg)
          setLoading(false)
        }
     } 

     useEffect(()=>{
      getMyPosts()
     },[])

  return (
    <div>
      {
         loading ? "loading..." :
         myPosts.length > 0 ?
           myPosts?.map((posts , i)=>(
          <div key={i} className="w-[80%] mx-auto my-4 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
            {posts?.username[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-800 text-base truncate">
              {posts?.username}
              helloo
            </p>
            <p className="text-xs text-gray-500">
              Lorem, ipsum.
              {moment(posts?.createdAt).format("DD.MM.YYYY")}
            </p>
            {posts?.title}
            test
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-64 bg-gray-200 overflow-hidden flex items-center justify-center">
          <img
            src={`http://localhost:5500${posts?.imgUrl}`}
            alt="Post"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <p className="text-gray-700 text-base leading-relaxed font-medium line-clamp-3">
            {posts?.text}
           
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-white/60">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaRegEye className="w-5 h-5" />
            <span> {posts?.view}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <TfiCommentAlt className="w-5 h-5" />
            <span>
              {posts?.comments.length}
              
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="flex gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-100">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-purple-600 hover:bg-purple-100 rounded-lg font-semibold transition-colors text-base">
            <TfiCommentAlt className="w-5 h-5" />
            <span>Коммент</span>
          </button>
        </div>
      </div>
        )) 
        : "Посты ненайден!!"
      }

      
    </div>
  );
}
