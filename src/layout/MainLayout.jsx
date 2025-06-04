import { useEffect, useMemo } from "react";
import { AppBar, CssBaseline, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constant/config";


const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN) ;
    location.href = "/login" ;
  } ;

  const checkLogin = () => {
    const token = localStorage.getItem(AUTH_TOKEN) ;
    if(!token){
      location.href = "/login" ;
    }
  } ;

  const handleChangePassword = () => {
    navigate('/change-password') ;
  } ;
 
  useEffect(() => {
    checkLogin() ;
  }, []) ;

    return (
      <CssBaseline>
       <AppBar sx={{ mb:10}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Profile</Typography>
          <Button color="inherit" onClick={handleChangePassword}>Change password</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{position: 'relative', top: '100px'}}>
        {useMemo(() => <Outlet />, []) }
      </Container>
    </CssBaseline>
    ) ;
} ;


export default MainLayout ;