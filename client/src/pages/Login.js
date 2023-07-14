import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange=(e)=>{
    setInputs(prevState=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  //handle form submit
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.post('/api/v1/user/login',{email:inputs.email,password:inputs.password});
      if(data.success){
        dispatch(authActions.login());
        alert('User Login Successful');
        navigate('/');
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <Box
        maxWidth={450}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        marginTop={5}
        padding={3}
        boxShadow={"10px 10px 20px #ccc"}
        borderRadius={5}
      >
        <Typography
          variant="h4"
          padding={3}
          sx={{ textTransform: "uppercase" }}
          textAlign={"center"}
        >
          Login
        </Typography>
        <TextField
          placeholder="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          required
          margin="normal"
          type="email"
        />
        <TextField
          placeholder="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
          margin="normal"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/register")}
          type="submit"
          color="primary"
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Not a user? Please Register
        </Button>
      </Box>
      </form>
    </>
  );
}

export default Login
