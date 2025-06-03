import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { register } from "../utils/auth";


function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    const [result, data] = await register(formData);

    if(result){
        navigate("/profile");
    } else {
        toast.error(data) ;
    }
    
  };

  return (<>
    <Container maxWidth="xs" sx={{position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <Paper elevation={3} sx={{ padding: 4, mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <Box>
          <TextField
            label="Username"
            name="username"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
    <Toaster/>
    </>
  );
}

export default Register;
