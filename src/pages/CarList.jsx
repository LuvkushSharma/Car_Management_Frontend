import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Search, AddCircle } from "@mui/icons-material";
import CarDetail from "./CarDetail";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Wave from "../components/Wave/Wave";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch cars for the logged-in user
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/cars`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setCars(response.data.data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // Search cars based on keyword
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/cars/search?q=${searchKeyword}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCars(response.data.data.cars);
    } catch (error) {
      console.error("Error searching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarDelete = (carId) => {
    setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          padding: "2rem",
          background: "linear-gradient(to right, #ece9e6, #ffffff)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          🚗 Your Car Collection
        </Typography>

        {/* Search Section */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <TextField
            label="Search Cars"
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            sx={{ width: "50%", mr: 2 }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000000", // Dark black color
              color: "#FFFFFF", // White text color for contrast
              "&:hover": {
                backgroundColor: "#333333", // Slightly lighter black on hover
              },
            }}
            startIcon={<Search />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        {/* Add Car Button */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddCircle />}
            onClick={() => navigate("/add-car")}
          >
            Add New Car
          </Button>
        </Box>

        {/* Display Cars */}
        <Grid container spacing={3}>
          {cars.length > 0 ? (
            cars.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car._id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ cursor: "pointer" }}
                >
                  <Card
                    sx={{
                      borderRadius: "15px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    {car.images && car.images.length > 0 && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={car.images[0]}
                        alt={car.title}
                        sx={{ borderRadius: "15px 15px 0 0" }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {car.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1 }}
                      >
                        {car.description.length > 80
                          ? `${car.description.substring(0, 80)}...`
                          : car.description}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          backgroundColor: "#000000", // Dark black color
                          color: "#FFFFFF", // White text color for contrast
                          "&:hover": {
                            backgroundColor: "#333333", // Slightly lighter black on hover
                          },
                        }}
                        onClick={() => navigate(`/car/${car._id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: "bold", // Bold for emphasis
                fontSize: "2rem", // Larger font size for better visibility
                color: "#212121", // Dark grey color for a sleek and modern look
                textShadow:
                  "2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.3)", // Black and white shadow for depth
                letterSpacing: "1px", // Slightly increased letter spacing for readability
                textTransform: "uppercase", // Uppercase for impact
                animation: "fadeInUp 1.5s ease-in-out", // Animate the text upwards with fade-in
                mt: 6, // Add margin-top for spacing
                mb: 4, // Add margin-bottom for spacing
              }}
            >
              No cars available. Start by adding one!
            </Typography>
          )}
        </Grid>
      </Box>
      <Footer />
      <Wave />
    </>
  );
};

export default CarList;
