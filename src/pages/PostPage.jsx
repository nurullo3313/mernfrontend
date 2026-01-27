import React, { useEffect, useState } from "react";
import { FaRegEye, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../store/slices/postSlice";
import { toast } from "react-toastify";

export default function PostPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const {status} = useSelector((state)=>state.post)
  const dispath = useDispatch()



  const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/post/getonepost/${id}`);
        setPost(data.onePost);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPost();
  }, [id]);


  function removeHendler(){
    try {
      dispath(deletePost(id))
    toast("Пост успешно удалён")
    navigate(-1) 
    } catch (error) {
       toast(error.response?.message)
    }   
  }


  return (
    <div className="my-10">
      <button
        onClick={() => navigate(-1)}
        className="px-5 py-3 bg-amber-700 text-amber-50 rounded-xl hover:text-amber-500 hover:bg-amber-50 hover:border-1 cursor-pointer"
      >
        Назад
      </button>

      <div className="w-[80%] mx-auto my-4 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer">
        {/* Header */}
        <div className=" flex justify-between items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10  px-4 py-3">
          <div className="flex items-center gap-3 px-4 py-3 ">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
              {post?.username[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-800 text-base truncate">
                {post?.username}
              </p>
              <p className="text-xs text-gray-500">
                {moment(post?.createdAt).format("DD.MM.YYYY")}
              </p>
              {post?.title}
            </div>
          </div>

          {
            user._id ==post?.author  && 
            <div className="flex gap-3 text-2xl">
            <FaTrashAlt onClick={()=>removeHendler()}/>
            <CiEdit/>
          </div>
          }
        </div>

        {/* Image */}
        <div className="w-full h-64 bg-gray-200 overflow-hidden flex items-center justify-center">
          <img
            src={`http://localhost:5500${post?.imgUrl}`}
            alt="Post"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <p className="text-gray-700 text-base leading-relaxed font-medium line-clamp-3">
            {post?.text}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-white/60">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaRegEye className="w-5 h-5" />
            <span>{post?.view}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <TfiCommentAlt className="w-5 h-5" />
            <span>{post?.comments.length}</span>
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
    </div>
  );
}
