import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import moment from "moment"

export default function PopularItem({post}) {
  
  const {username, title, text, imgUrl,comments,view, createdAt} = post
  
  return (
     <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md flex-shrink-0">
              {username[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{username}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {moment(createdAt).format("DD.MM.YYYY")}
              </p>
            </div>
          </div>
    
          {/* Image */}
          <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 bg-gray-200 overflow-hidden flex items-center justify-center">
            <img 
            src={`http://localhost:5500${imgUrl}`} 
            alt="Post" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          </div>
    
          {/* Text Content */}
          <div className="px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium overflow-hidden">
              <span className="block max-h-[2.8em] sm:max-h-[4.2em] overflow-hidden">
                {title}
              </span>
            </p>
          </div>
    
          {/* Stats */}
          <div className="flex items-center justify-between px-4 py-2 sm:px-5 sm:py-2 border-t border-gray-100 bg-white/60">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm">
              <FaRegEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{view}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm">
              <TfiCommentAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{comments.length}</span>
            </div>
          </div>
    
          {/* Actions */}
          <div className="flex gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-100">
            
            <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 text-purple-600 hover:bg-purple-100 rounded-lg font-semibold transition-colors text-sm sm:text-base">
              <TfiCommentAlt className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Коммент</span>
              <span className="xs:hidden">Комм</span>
            </button>
            <button>
              
            </button>
          </div>
        </div>
  )
}
