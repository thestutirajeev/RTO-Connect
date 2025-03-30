import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login"); // Redirect to login if not logged in
    } else if (role === "user") {
      navigate("/user-home"); // Redirect to user home if role is 'user'
    } else if (role === "admin") {
      navigate("/admin-home"); // Redirect to admin home if role is 'admin'
    } else {
      navigate("/login"); // Default case: send to login
    }
  }, [navigate]); // Runs on mount

  return <div>Redirecting...</div>;
};

export default Dashboard;
