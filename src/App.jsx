import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import MainPage from "./pages/MainPage";
import {ToastContainer} from "react-toastify"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, getMe } from "./store/slices/authSlice";



function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkAuth)

  useEffect(()=>{
      dispatch(getMe())
  },[dispatch])
  return (
    
        <Layout>
          
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<h1>404 not faund</h1>} />

            {
              isAuth ? <>
              <Route path="/main" element={<MainPage />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/editpost:id" element={<EditPost />} />
            <Route path="/post:id" element={<PostPage />} />
            <Route path="/posts" element={<PostsPage />} />
              </>
            : null
            }

          </Routes>
          <ToastContainer position="bottom-right" />
        </Layout>
        
      
    
  );
}

export default App;
