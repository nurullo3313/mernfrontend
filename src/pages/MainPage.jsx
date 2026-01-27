import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../store/slices/postSlice'
import { toast } from 'react-toastify'
import PostItem from '../components/PostItem'
import PopularItem from '../components/PopularItem'
import { useNavigate , useLocation } from 'react-router-dom'

export default function MainPage() {

  const dispatch = useDispatch()
  const {status, post, popularPosts } =  useSelector(state => state.post)
  const navigate =  useNavigate()
  const lacation  = useLocation()

  useEffect(()=>{
    dispatch(getAllPost())
     if(status){
      toast(status)
    }
    
  },[lacation.pathname])



  
  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* All Posts Section */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Все посты</h1>
          <div className="space-y-6">
            {post?.length > 0 ? (
              post.map((post, index) => (
                <PostItem key={index} post={post} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Посты не найдены</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Popular Posts Section */}
        <div className="lg:col-span-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Популярные посты</h1>
          <div className="space-y-6">
            {popularPosts?.length > 0 ? (
              popularPosts.map((post, i) => (
                <PopularItem key={i} post={post} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Популярные посты отсутствуют</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
