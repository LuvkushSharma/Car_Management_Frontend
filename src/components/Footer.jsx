import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  MailOutline,
  Phone,
  DirectionsCar,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer
      style={{
        background: theme.palette.background.default,
        padding: "2rem 0",
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 -5px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Quick Links Section */}
          <Grid item xs={12} sm={4} textAlign={{ xs: "center", sm: "left" }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1">
                <a
                  href="/home"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  Dashboard
                </a>
              </Typography>
              <Typography variant="body1">
                <a
                  href="/add-car"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  Add New Car
                </a>
              </Typography>
              <Typography variant="body1">
                <a
                  href="/profile"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  My Profile
                </a>
              </Typography>
              <Typography variant="body1">
                <a
                  href="/contact"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  Contact Support
                </a>
              </Typography>
            </Box>
          </Grid>

          {/* Contact Information Section */}
          <Grid
            item
            xs={12}
            sm={4}
            textAlign={{ xs: "center", sm: "center" }}
            container
            direction="column"
            alignItems="center"
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Get In Touch
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MailOutline
                  sx={{ mr: 1, color: theme.palette.text.secondary }}
                />
                <Typography variant="body1">support@carmgmt.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ mr: 1, color: theme.palette.text.secondary }} />
                <Typography variant="body1">+1 (555) 987-6543</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid
            item
            xs={12}
            sm={4}
            container
            direction="column"
            alignItems="center"
            textAlign={{ xs: "center", sm: "right" }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Follow Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              {[
                { icon: <Facebook />, link: "https://facebook.com" },
                { icon: <Twitter />, link: "https://twitter.com" },
                { icon: <Instagram />, link: "https://instagram.com" },
                { icon: <LinkedIn />, link: "https://linkedin.com" },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  href={social.link}
                  target="_blank"
                  aria-label="Social Media"
                  sx={{
                    color: theme.palette.text.primary,
                    "&:hover": {
                      transform: "scale(1.2)",
                      color: theme.palette.primary.main,
                    },
                    transition: "transform 0.3s ease, color 0.3s ease",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Footer Bottom Section */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()}{" "}
            <DirectionsCar sx={{ mr: 1 }} color="black" /> Car Management App.
            All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
