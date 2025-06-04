import React, { useEffect, useState } from "react";
import {Box, Typography, Button, Paper, Avatar, Stack, ButtonGroup, CircularProgress} from "@mui/material";
import { getProfileData } from "../utils/profile";
import { Link } from "react-router-dom";



function Profile() {
  const [profile, setProfile] = useState({username: "", email: "", date_joined:""}) ;

  const fetchProfile = async () => {
    console.log('OK')
    const data = await getProfileData() ;
    console.log('data = ', data);
    
    if(data){
      setProfile(data) ;
    }
  } ;

  
  const getJoinDate = () => {
    const date = new Date(profile.date_joined) ;
    const monthName = date.toLocaleDateString('default', { month: 'short' });
    
    return `${monthName} ${date.getDate()}, ${date.getUTCFullYear()} ` ;
  } ;
  
  useEffect(() => {    
    fetchProfile();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      {
        profile.username ?  <Paper sx={{p:4}}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' >
          <Stack direction='row' alignItems='center' gap={2} sx={{mb:2}}>
            <Avatar />
            <Box>
              <Typography variant="h5">{profile.username}</Typography>
              {
                profile.email ? <Typography sx={{color: 'grey'}}>vishnu@gmail.com</Typography> : null
              }
            </Box>
          </Stack>
          <Box>
            <Typography sx={{color: 'grey'}}>Join date</Typography>
            <Typography>{getJoinDate()}</Typography>
          </Box>
        </Stack>
        <hr />

        <ButtonGroup variant="text" sx={{mt:2, justifyContent: 'center', width: '100%'}}>
          <Button>
            <Link to='/form-builder'>Create custome form</Link>
          </Button>
          <Button>View Employee</Button>
        </ButtonGroup>
      </Paper> : <CircularProgress  />
      }
  </>
  );
}

export default Profile;
