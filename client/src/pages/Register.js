import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
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
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
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
          Register
        </Typography>
        <TextField
          placeholder="name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
          margin="normal"
          type="text"
        />
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
          onClick={() => navigate("/login")}
          type="submit"
          color="primary"
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Already Registered? Please Login
        </Button>
      </Box>
      </form>
    </>
  );
};

export default Register;
