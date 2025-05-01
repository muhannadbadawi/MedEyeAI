import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast  } from "react-hot-toast"
import { whiteTextFieldStyles } from "../../old-screens/common-styles";
const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
    //   setError("All fields are required.");
    toast.error("All fields are required.", {
        position: "bottom-left",
    });
      return;
    }

    setEmail("");
    setMessage("");
    toast.success("Message sent successfully!", {
        position: "bottom-left",
    });
    navigate("/"); 
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
          width: { xs: "90%", sm: "70%", md: 400 },
          height: { xs: "90%", sm: "70%", md: 500 },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={whiteTextFieldStyles}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          multiline
          rows={4}
          value={message}
          sx={whiteTextFieldStyles}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ContactUs;