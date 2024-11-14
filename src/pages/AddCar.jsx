import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Input,
  Typography,
  IconButton,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Navbar from "../components/Navbar";

const AddCar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Handle file change
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Upload image to Cloudinary
  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dost_luvkush");
      formData.append("cloud_name", "dx2vel6vy");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dx2vel6vy/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryImageUrl = response.data.secure_url;
      setImages((prev) =>
        prev ? `${prev},${cloudinaryImageUrl}` : cloudinaryImageUrl
      );
      setUploading(false);
      setImage(null);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    const imagesArray = images.split(",").map((image) => image.trim());

    const carData = {
      title,
      description,
      tags: tagsArray,
      images: imagesArray,
    };

    try {
      await axios.post(`${BASE_URL}/api/v1/cars`, carData, {
        withCredentials: true,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: "3rem",
          maxWidth: "700px",
          margin: "auto",
          background: "rgba(0, 0, 0, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          color: "#FFFFFF",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Add New Car
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Car Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{
              marginBottom: "1.5rem",
              backgroundColor: "#1e1e1e",
              borderRadius: 2,
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{
              marginBottom: "1.5rem",
              backgroundColor: "#1e1e1e",
              borderRadius: 2,
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Tags (comma separated)"
            variant="outlined"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            sx={{
              marginBottom: "1.5rem",
              backgroundColor: "#1e1e1e",
              borderRadius: 2,
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          {/* Image Upload Section */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Input
              type="file"
              onChange={handleImageChange}
              sx={{ color: "#fff" }}
            />
            <IconButton
              onClick={handleImageUpload}
              disabled={uploading}
              sx={{
                color: "#fff",
                marginLeft: "1rem",
                backgroundColor: "#333",
                "&:hover": { backgroundColor: "#555" },
              }}
            >
              {uploading ? <CircularProgress size={24} /> : <CloudUpload />}
            </IconButton>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              mt: 2,
              "&:hover": { backgroundColor: "#333" },
              padding: "0.75rem",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            Add Car
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddCar;
