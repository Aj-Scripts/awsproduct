import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form2, setForm2] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4900/user/login", form2);

      console.log("Form Submitted:", form2);
      alert(res.data.message);

      if (res.data.usertoken) {
        localStorage.setItem("token", res.data.usertoken);
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 404) {
        alert("User not found");
      } else if (err.response && err.response.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Invalid credentials or server error");
      }
      navigate("/login");
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={4} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <form onSubmit={handleLogin} autoComplete="off">
          <Stack spacing={3}>
            <h2 style={{ textAlign: "center", margin: 0 }}>Login</h2>

            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={form2.email}
              onChange={(e) => setForm2({ ...form2, email: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={form2.password}
              onChange={(e) => setForm2({ ...form2, password: e.target.value })}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
