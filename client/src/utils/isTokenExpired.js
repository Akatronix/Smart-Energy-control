import { jwtDecode } from "jwt-decode";

const validateToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found! Logging out...");
    localStorage.removeItem("token");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp || decoded.exp < Date.now() / 1000) {
      console.log("Token expired! Logging out...");
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    console.log("Invalid token:", error);
    localStorage.removeItem("token");
    return false;
  }
};

export default validateToken;
