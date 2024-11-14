import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to bottom, #000000, #2C2C2C)",
  padding: "2rem",
});

const StyledCard = styled(Card)({
  padding: "2.5rem",
  maxWidth: "600px",
  width: "100%",
  borderRadius: "15px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
});

const StyledButton = styled(Button)({
  backgroundColor: "#000000",
  color: "#FFFFFF",
  padding: "0.75rem",
  fontSize: "1rem",
  textTransform: "none",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

const StyledAlert = styled(Alert)({
  backgroundColor: "#333333",
  color: "#FFFFFF",
});

const EditCar = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    tags: "",
    images: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Failed to update car!");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/cars/${id}`, {
          withCredentials: true,
        });
        const { title, description, tags, images } = res.data.data.car;
        setCarData({
          title,
          description,
          tags: tags.join(", "),
          images: images.join(", "),
        });
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!carData.title) newErrors.title = "Title is required";
    if (!carData.description) newErrors.description = "Description is required";
    if (!carData.tags) newErrors.tags = "Tags are required";
    if (!carData.images) newErrors.images = "Images are required";
    return newErrors;
  };

  const handleUpdate = async () => {
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const tagsArray = carData.tags.split(",").map((tag) => tag.trim());
      const imagesArray = carData.images
        .split(",")
        .map((image) => image.trim());

      const updatedCarData = {
        title: carData.title,
        description: carData.description,
        tags: tagsArray,
        images: imagesArray,
      };

      try {
        await axios.put(`${BASE_URL}/api/v1/cars/${id}`, updatedCarData, {
          withCredentials: true,
        });
        setIsSuccess(true);
        setTimeout(() => navigate("/home"), 1500);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to update car!"
        );
        setIsError(true);
      }
    }
  };

  return (
    <>
      <Navbar />
      <StyledContainer>
        <StyledCard>
          <Typography variant="h4" align="center" gutterBottom>
            Edit Car Details
          </Typography>

          {isSuccess && (
            <StyledAlert severity="success" sx={{ mb: 2 }}>
              Car updated successfully!
            </StyledAlert>
          )}
          {isError && (
            <StyledAlert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </StyledAlert>
          )}

          <TextField
            label="Car Title"
            name="title"
            value={carData.title}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Description"
            name="description"
            value={carData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
            error={!!errors.description}
            helperText={errors.description}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Tags (comma separated)"
            name="tags"
            value={carData.tags}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.tags}
            helperText={errors.tags}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Image URLs (comma separated)"
            name="images"
            value={carData.images}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.images}
            helperText={errors.images}
            sx={{ mb: 3 }}
          />

          <StyledButton onClick={handleUpdate} fullWidth>
            Update Car
          </StyledButton>
        </StyledCard>
      </StyledContainer>
    </>
  );
};

export default EditCar;
