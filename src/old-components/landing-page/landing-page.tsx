import { Box, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        color: "white",
        textAlign: "center",
        px: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "2rem", md: "3rem" }, // Adjust for smaller screens
        }}
      >
        WELCOME TO MED EYE AI
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1rem", md: "1.25rem" }, // Adjust for readability
        }}
      >
        Your trusted platform for online medical consultation
      </Typography>
    </Box>
  );
};
export default LandingPage;
