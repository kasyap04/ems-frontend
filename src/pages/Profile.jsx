import React, { useEffect, useState } from "react";
import {Box, Typography, Button, Paper, Avatar, Stack, ButtonGroup, CircularProgress, Card} from "@mui/material";
import { Link } from "react-router-dom";
import { getProfileData, getAllEmployee } from "../utils/profile";
import { getCreatedForm, deleteEmployee } from '../utils/auth';
import { Delete } from "@mui/icons-material";
import toast from "react-hot-toast";



function Profile() {
  const [profile, setProfile] = useState({username: "", email: "", date_joined:""}) ;
  const [employeList, setEmployeeList] = useState([]) ;

  const fetchProfile = async () => {
    console.log('OK')
    const data = await getProfileData() ;
    console.log('data = ', data);
    
    if(data){
      setProfile(data) ;
    }
  } ;


  const fetchEmployees = async () => {
    const forms = await getCreatedForm() ;
    if(forms){
      const employees = await getAllEmployee(forms[0].id) ;
      if(employees){
        setEmployeeList(employees);
      }
    }
  } ;

   
  const getJoinDate = () => {
    const date = new Date(profile.date_joined) ;
    const monthName = date.toLocaleDateString('default', { month: 'short' });
    
    return `${monthName} ${date.getDate()}, ${date.getUTCFullYear()} ` ;
  } ;
  
  const handleDeleteEmployee = async (empId) => {
    const result = await deleteEmployee(empId) ;
    if(result){
      setEmployeeList((prev) => prev.filter((value, index) => value.id !== empId)) ;
      toast.success("Employee deleted") ;
    } else {
      toast.error("Failed to delete emploayye") ;
    }
  } ;


  useEffect(() => {    
    fetchProfile();
    fetchEmployees() ;
  }, []);


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
          <Button>
            <Link to='/register-employee'>Register an employee</Link>
          </Button>
        </ButtonGroup>
      </Paper> : <CircularProgress  />
      }

      <Typography variant="h5" sx={{mt:5}}>Employee List</Typography>
      {
        !employeList?.length ? <Typography sx={{ mt:3, textAlign: 'center', color: 'grey'}}>No Employees are registered</Typography>  :
        <Stack direction='row' gap={2} flexWrap='wrap'>
        {
          employeList?.map((value, index) => <Card key={index} sx={{width: 'fit-content', p: 2}}>
            {
              Object.entries(value.data).map((emp, empIndex) => <Stack key={empIndex} direction='row' gap={1} flex={1} sx={{m:1}}>
              <label style={{color: 'grey'}}>{emp[0]}: </label>
              <Typography>
                {
                  emp[0] === "password" ? "******" : emp[1]
                }
              </Typography>
            </Stack>)
            }
            <Button 
              variant="outlined" 
              sx={{color: 'red', mt:2, borderColor: 'red'}} 
              fullWidth 
              endIcon={<Delete />}
              onClick={() => handleDeleteEmployee(value.id)}
            >
                Delete
              </Button>
        </Card>)
        }
        
      </Stack>
      }

      
  </>
  );
}

export default Profile;
