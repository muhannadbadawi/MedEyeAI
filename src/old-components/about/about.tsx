import { Box, Button, Alert, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
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
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to our application! We are dedicated to providing the best
          experience for our users. Our team is committed to continuous
          improvement and innovation.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={navigateToHome}
        >
          Go Back Home
        </Button>
        <Alert severity="info" sx={{ marginTop: 2 }}>
          This is an informational alert.
        </Alert>
      </Box>
    </Container>
  );
};
export default About;
