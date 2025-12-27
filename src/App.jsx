import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import MainPage from "./pages/MainPage";



function App() {
  return (
    
        <Layout>
          
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/editpost:id" element={<EditPost />} />
            <Route path="/post:id" element={<PostPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="*" element={<h1>404 not faund</h1>} />

          </Routes>
        </Layout>
        
      
    
  );
}

export default App;
