import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Alert,
  Container,
} from "@mui/material";
import { whiteTextFieldStyles } from "../../old-screens/common-styles";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("All fields are required.");
      return;
    }

    setEmail("");
    setUsername("");
    setPassword("");
    setError("");
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
        onSubmit={handleRegister}
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
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={whiteTextFieldStyles}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          sx={whiteTextFieldStyles}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={whiteTextFieldStyles}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={whiteTextFieldStyles}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            borderRadius: 3,
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
