import { useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { changePassword } from "../utils/auth";


const ChangePassword = () => {
    const [passwords, setPasswords] = useState({current: "", newPassword: "", confirm: ""}) ;

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        if(passwords.newPassword !== passwords.confirm){
            toast.error("New password and confirm password do not match") ;
            return ;
        }

        const [result, data] = await changePassword(passwords) ;
        if(result){
            toast.success(data) ;
        } else {
            toast.error(data) ;        
        }

    };

    return (<>
        <Container maxWidth="xs" sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translateX( -50%)'}}>
          <Paper elevation={4} sx={{ padding: 4, mt: 10 }}>
            <Typography variant="h5" mb={3} align="center">
              Change my password
            </Typography>
            <Box>
              <TextField
                label="Current password"
                name="current"
                type="password"
                value={passwords.current}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Create new passowrd"
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Confirm your password"
                name="confirm"
                type="password"
                value={passwords.confirm}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                Change password
              </Button>
            </Box>
          </Paper>
        </Container>
        <Toaster/>
        </>
      );
} ;


export default ChangePassword ;