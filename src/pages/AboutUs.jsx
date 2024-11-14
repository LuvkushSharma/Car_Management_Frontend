import React from "react";
import { Typography, Container, Grid, Box, Link } from "@mui/material";
import Navbar from "../components/Navbar";
import "./CSS_Files/AboutUs.css";
import { FaCar, FaTools, FaRegHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              component="h1"
              align="center"
              gutterBottom
              className="gradient-text"
            >
              About Car Management App
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Our Mission
            </Typography>
          </Grid>
          <Grid container spacing={4}>
            {/* Feature 1 */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  className="icon-container"
                  sx={{
                    mr: 2,
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaCar size={24} color="#fff" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Efficient Fleet Management
                </Typography>
              </Box>
              <Typography variant="body2" align="justify">
                Our app provides a comprehensive platform to efficiently manage
                your fleet of vehicles, keeping track of all your car-related
                data in one place.
              </Typography>
            </Grid>

            {/* Feature 2 */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  className="icon-container"
                  sx={{
                    mr: 2,
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaTools size={24} color="#fff" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Maintenance & Servicing
                </Typography>
              </Box>
              <Typography variant="body2" align="justify">
                Schedule maintenance, track service history, and receive
                reminders for upcoming services to ensure your vehicles run
                smoothly and efficiently.
              </Typography>
            </Grid>

            {/* Feature 3 */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  className="icon-container"
                  sx={{
                    mr: 2,
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaRegHandshake size={24} color="#fff" />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Enhanced User Experience
                </Typography>
              </Box>
              <Typography variant="body2" align="justify">
                Our app is designed to simplify car management with an intuitive
                interface, enabling users to effortlessly manage vehicles,
                service records, and more.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Why Choose Us?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              align="justify"
              sx={{ lineHeight: 1.6 }}
            >
              Whether you're an individual car owner or a business managing a
              fleet, our app helps you streamline your vehicle management
              processes. From tracking service schedules to managing expenses,
              we are here to simplify your life.
            </Typography>
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Link
              href="#"
              variant="body1"
              underline="none"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Get Started with Car Management Today!
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutUs;
