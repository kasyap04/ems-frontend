import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const [result, data] = await login(loginData);
    if(result){
        navigate("/profile");
    } else {
        toast.error(data) ;
    }
  };

  return (<>
    <Container maxWidth="xs" sx={{position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <Paper elevation={4} sx={{ padding: 4, mt: 10 }}>
        <Typography variant="h5" mb={3} align="center">
          Login
        </Typography>
        <Box>
          <TextField
            label="Username"
            name="email"
            // type="email"
            value={loginData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
    <Toaster/>
    </>
  );
}

export default Login;
