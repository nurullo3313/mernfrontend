import React, { useEffect, useState } from "react";

import { createPost } from "../store/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

export default function AddPost() {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate()

  

  

  function addPost() {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);
  formData.append("image", imgUrl); 
  
  dispatch(createPost(formData));
  if (status) {
    toast(status);
  }
  navigate("/main")
  setText("");
  setTitle("");
  setImgUrl("");
}

  return (
    <form
      className="w-full max-w-2xl mx-auto py-8 px-6 sm:px-10 border-2 rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-amber-800">
          Добавить новый пост
        </h2>

        <div className="flex flex-col items-center">
          <label
            htmlFor="img"
            className="w-full sm:w-3/4 text-center border-2 border-dotted border-amber-700 py-4 px-5 bg-amber-700 text-white rounded-lg cursor-pointer hover:bg-amber-600 transition-colors duration-200"
          >
            Прикрепить изображение
            <input
              type="file"
              id="img"
              className="hidden"
              onChange={(e) => setImgUrl(e.target.files[0])}
            />
          </label>

          <div className="mt-3 w-full sm:w-3/4 h-48 bg-gray-100 border overflow-hidden border-gray-300 rounded-lg flex items-center justify-center text-gray-400 p-2">
           
            {imgUrl ? (<img src={URL.createObjectURL(imgUrl)} alt=""  className="w-full h-auto"/>):("Предпросмотр изображения")}

          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label htmlFor="title" className="flex-1 flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">
              Заголовок поста
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Заголовок поста"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </label>
        </div>

        <label htmlFor="content" className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-700">
            Содержимое поста
          </span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Содержимое поста"
            className="border border-gray-300 rounded-lg p-3 w-full h-48 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </label>

        <div className="flex justify-center w-full  gap-2">
          <button
            type="submit"
            className="cursor-pointer mt-2 py-3 px-6 bg-amber-700 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition-colors duration-200"
            onClick={addPost}
          >
            Добавить пост
          </button>
          <button
            type="submit"
            className="cursor-pointer   mt-2 py-3 px-6 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition-colors duration-200"
          >
            Отменить
          </button>
        </div>
      </div>
    </form>
  );
}
