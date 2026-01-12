import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link , NavLink, useNavigate} from "react-router-dom"
import { checkAuth , logout} from '../store/slices/authSlice'
import { toast } from 'react-toastify'


export default function Navbar() {

  const activePage = {
    color: "white"
  }
  const isAuth = useSelector(checkAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logoutHendler(){
    dispatch(logout())
    window.localStorage.removeItem("token")
    toast("Вы вышли из систему")
    navigate("/login")
  }
  

  return (
   <nav className='flex justify-between items-center bg-orange-500 px-10 py-3 rounded-2xl'>
        <span className='bg-black text-amber-50 py-2 px-4 rounded-2xl hover:bg-amber-50 hover:text-black cursor-pointer'>E</span>
       {
        isAuth &&
         <ul className='flex gap-6 text-2xl'>
            <li className=' text-zinc-950 hover:text-amber-50'><NavLink to={"/"} style={({isActive})=> isActive ? activePage : undefined}>Гаваная</NavLink></li>
            <li className='text-zinc-950 hover:text-amber-50'><NavLink to={"/posts"} style={({isActive})=> isActive ? activePage : undefined}>Мои посты</NavLink></li>
            <li className='text-zinc-950 hover:text-amber-50'><NavLink to={"/addpost"} style={({isActive})=> isActive ? activePage : undefined}>Добавыт пост</NavLink></li>
        </ul>
       }
      {
        isAuth ? 
        <button 
        className='bg-black text-amber-50 py-2 px-4 rounded-2xl hover:bg-amber-50 hover:text-black cursor-pointer'
          onClick={logoutHendler}
        >Выйти</button>
        :
        <Link to={"/login"} className='bg-black text-amber-50 py-2 px-4 rounded-2xl hover:bg-amber-50 hover:text-black cursor-pointer'>Войти</Link>
      }
   </nav>
  )
}
