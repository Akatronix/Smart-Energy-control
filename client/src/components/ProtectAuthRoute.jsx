import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectAuthRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      return navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return !token ? <Outlet /> : null;
};

export default ProtectAuthRoute;
