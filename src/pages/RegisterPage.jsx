import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth, register } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, status ,error} = useSelector((state) => state.auth);
  const isAuth = useSelector(checkAuth)
  const navigate = useNavigate()

  const usernameError = error?.username;
  const passwordError = error?.password;

  useEffect(()=>{
    if(status){
      toast(status)
    }
    if(usernameError){
      toast(usernameError)
    }
    if(passwordError){
      toast(passwordError)
    }
    if(isAuth){
      navigate("/main")
    }
  },[status])

  function registerUser() {
    try {
      dispatch(register({ username, password }));
      if(isAuth){
        setUserName("")
        setPassword("")
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-200 ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-amber-500 w-1/4 p-7 rounded-4xl"
      >
        <h1 className="text-center text-3xl font-semibold">Ргистратция</h1>
        <label htmlFor="">
          Username :{" "}
          <input
            type="text"
            placeholder="username"
            className="bg-amber-50 text-1xl py-0.5 px-4 rounded-xl outline-none  mt-1 w-80"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
        </label>
        <label htmlFor="">
          password :{" "}
          <input
            type="password"
            placeholder="password"
            className="bg-amber-50 text-1xl py-0.5 px-4 rounded-xl outline-none  mt-1 w-80"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <div className="flex justify-center flex-col items-center  mt-2">
          <button
            className="py-1 px-4 bg-black text-amber-50 w-80 text-xl rounded-2xl hover:bg-amber-50 hover:text-amber-500 cursor-pointer "
            onClick={registerUser}
          >
            Зарегисрироваться
          </button>
          <Link to="/login" className="mt-2 text-blue-950">
            У меня есть аккаунт!
          </Link>
        </div>
      </form>
    </div>
  );
}
