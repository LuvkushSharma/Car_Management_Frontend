import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Box,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/Navbar";

const StyledBox = styled(Box)(() => ({
  background: "linear-gradient(180deg, #D3D3D3, #2C2C2C)", // Light grey at the top
  padding: "3rem 0",
  minHeight: "100vh",
}));

const StyledCard = styled(Card)(() => ({
  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: "#000000",
  color: "#FFFFFF",
  fontSize: "1rem",
  textTransform: "none",
  padding: "0.75rem 2rem",
  "&:hover": {
    backgroundColor: "#333333",
  },
}));

const StyledChip = styled(Chip)(() => ({
  marginRight: "0.5rem",
  marginBottom: "0.5rem",
  backgroundColor: "#000000",
  color: "#FFFFFF",
  borderRadius: "16px",
  padding: "0.5rem",
}));

const StyledCardMedia = styled(CardMedia)(() => ({
  borderRadius: "8px",
  objectFit: "cover",
  height: "200px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch car details using the ID
  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/cars/${id}`, {
        withCredentials: true,
      });
      setCar(response.data.data.car);
    } catch (error) {
      console.error("Error fetching car details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/cars/${id}`, {
        withCredentials: true,
      });
      console.log("Car deleted successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  if (!car) {
    return (
      <Box sx={{ textAlign: "center", padding: "2rem" }}>
        <Typography variant="h5" color="error">
          No car details available.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <StyledBox>
        <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
          <StyledCard>
            <CardContent>
              <Typography
                variant="h4"
                color="text.primary"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                {car.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.7 }}
              >
                {car.description}
              </Typography>

              {/* Display tags */}
              {car.tags && car.tags.length > 0 && (
                <Box sx={{ marginBottom: "1.5rem" }}>
                  {car.tags.map((tag, index) => (
                    <StyledChip key={index} label={tag} />
                  ))}
                </Box>
              )}

              {/* Display car images */}
              <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
                {car.images.map((img, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <StyledCardMedia
                      component="img"
                      image={img}
                      alt={car.title}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Action buttons */}
              <Box sx={{ textAlign: "center" }}>
                <StyledButton
                  variant="contained"
                  onClick={() => navigate(`/edit-car/${car._id}`)}
                  sx={{ marginRight: "1rem" }}
                >
                  Edit
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </StyledButton>
              </Box>
            </CardContent>
          </StyledCard>
        </Box>
      </StyledBox>
    </>
  );
};

export default CarDetail;
