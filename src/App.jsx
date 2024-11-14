import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Oops from "./components/Oops";
import UserNotFoundPage from "./pages/userNotFoundPage";
import { fetchUserData } from "./helper/userAPI";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/foregettingPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={<Profile />} />}
          />
          <Route
            path="/about"
            element={<PrivateRoute component={<AboutUs />} />}
          />
          <Route
            path="/contact"
            element={<PrivateRoute component={<ContactUs />} />}
          />
          <Route
            path="/home"
            element={<PrivateRoute component={<CarList />} />}
          />
          <Route
            path="/car/:id"
            element={<PrivateRoute component={<CarDetail />} />}
          />
          <Route
            path="/add-car"
            element={<PrivateRoute component={<AddCar />} />}
          />
          <Route
            path="/edit-car/:id"
            element={<PrivateRoute component={<EditCar />} />}
          />
          <Route
            path="/car/:id"
            element={<PrivateRoute component={<CarDetail />} />}
          />
          <Route path="/user-not-found" element={<UserNotFoundPage />} />
          <Route path="*" element={<Oops />} />
        </Routes>
      </main>
    </Router>
  );
}

// A private route component to check if user exists
const PrivateRoute = ({ component }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return userData ? component : <Navigate to="/user-not-found" />;
};

export default App;
