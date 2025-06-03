import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import ApiService from "../service/apiService";

function Profile() {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await ApiService.get("/me"); // Adjust endpoint as per your backend
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUser();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.post("/change-password", passwordData);
      setMessage("Password changed successfully.");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      setMessage("Error changing password.");
    }
  };

  return (
    <Container maxWidth="sm">
      sdaf
    </Container>
  );
}

export default Profile;
