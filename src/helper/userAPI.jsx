import axios from "axios";

const fetchUserData = async () => {
  try {
    const res = await axios.get("https://carmanagement-backend.vercel.app/api/v1/users/profile", {
      withCredentials: true,
    });
    return res.data.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export { fetchUserData };
