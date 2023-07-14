import React,{useState,useEffect} from 'react'
import axios from 'axios';
const UserBlogs = () => {
    const [blogs,setBlogs]=useState([]);
    //get user blogs
    const getUserBlogs=()=>{
        try{
            const id=localStorage.getItem('userId');
            const {data}=await axios.get(`/api/v1/blog/`)
        }catch(error){

        }
    }
  return (
    <div>
      <h1>User's blogs</h1>
    </div>
  )
}

export default UserBlogs
