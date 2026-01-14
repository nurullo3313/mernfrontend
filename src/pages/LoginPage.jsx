import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth, login } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, status, error } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkAuth);
  const navigate = useNavigate();

  const usernameError = error?.username;
  const passwordError = error?.password;

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (usernameError) {
      toast(usernameError);
    }
    if (passwordError) {
      toast(passwordError);
    }
    if (isAuth) {
      navigate("/main");
    }
  }, [status, navigate, isAuth]);

  function loginUser() {
    try {
      dispatch(login({ username, password }));
      if (isAuth) {
        setUserName("");
        setPassword("");
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
        <h1 className="text-center text-3xl font-semibold">Авторизатция</h1>
        <label htmlFor="">
          Username :{" "}
          <input
            type="text"
            placeholder="username"
            value={username}
            className="bg-amber-50 text-1xl py-0.5 px-4 rounded-xl outline-none  mt-1 w-80"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label htmlFor="">
          password :{" "}
          <input
            type="password"
            placeholder="password"
            value={password}
            className="bg-amber-50 text-1xl py-0.5 px-4 rounded-xl outline-none  mt-1 w-80"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="flex justify-center flex-col items-center  mt-2">
          <button
            onClick={loginUser}
            className="py-1 px-4 bg-black text-amber-50 w-80 text-xl rounded-2xl hover:bg-amber-50 hover:text-amber-500 cursor-pointer "
          >
            Войти
          </button>
          <Link to="/register" className="mt-2 text-blue-950">
            У меня нет аккаунт!
          </Link>
        </div>
      </form>
    </div>
  );
}
