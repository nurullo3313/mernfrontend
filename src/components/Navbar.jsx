import React from 'react'
import {Link , NavLink} from "react-router-dom"

export default function Navbar() {

  const activePage = {
    color: "white"
  }
  const isAuth = false

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
        <button className='bg-black text-amber-50 py-2 px-4 rounded-2xl hover:bg-amber-50 hover:text-black cursor-pointer'>Выйти</button>
        :
        <Link to={"/login"} className='bg-black text-amber-50 py-2 px-4 rounded-2xl hover:bg-amber-50 hover:text-black cursor-pointer'>Войти</Link>
      }
   </nav>
  )
}
