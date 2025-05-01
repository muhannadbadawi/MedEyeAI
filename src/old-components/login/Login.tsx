import { useState } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { whiteTextFieldStyles } from "../../old-screens/common-styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logging in with", email, password);
  };

  const handleRegister = () => {
    console.log("Navigate to registration page");
    navigate("/register");
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p:2
      }}
    >
      <Box
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
          label="Email Address"
          variant="outlined"
          margin="normal"
          value={email}
          type="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "white" }} />
                  ) : (
                    <Visibility sx={{ color: "white" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            borderRadius: 3,
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            color: "white",
            borderRadius: 3,
          }}
          onClick={handleRegister}
        >
          Forgot Password?
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
