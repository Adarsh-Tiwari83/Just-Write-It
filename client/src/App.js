import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/my-blogs" element={<UserBlogs />}></Route>
        <Route path="/create-blog" element={<CreateBlog />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
