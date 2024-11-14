import axios from "axios";

const fetchUserData = async () => {
  try {
    const res = await axios.get("https://car-management-backend-bm90.onrender.com/api/v1/users/profile", {
      withCredentials: true,
    });
    return res.data.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export { fetchUserData };
