import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='flex justify-center items-center h-200 '>

    <form onSubmit={(e)=>e.preventDefault()}
    className='bg-amber-500 w-1/4 p-7 rounded-4xl'
    >

      <h1 className='text-center text-3xl font-semibold'>Авторизатция</h1>
      <label htmlFor="">
        Username : <input type="text" placeholder='username'
          className='bg-amber-50 text-1xl py-0.5 px-4 rounded-xl outline-none  mt-1 w-80'
        />
      </label>
      <label htmlFor="">
        password : <input type="password" placeholder='password'
          className='bg-amber-50 text-1xl py-0.5 px-4 rounded-xl outline-none  mt-1 w-80'
        />
      </label>

      <div className='flex justify-center flex-col items-center  mt-2'>
        <button 
        className='py-1 px-4 bg-black text-amber-50 w-80 text-xl rounded-2xl hover:bg-amber-50 hover:text-amber-500 cursor-pointer '
        >Войти</button>
        <Link to="/register"
        className='mt-2 text-blue-950'
        >У меня нет аккаунт!</Link>
      </div>
    </form>
      </div>
  )
}
