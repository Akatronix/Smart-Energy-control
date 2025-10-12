import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "../pages/Homepage";
import AuthLayoutPages from "../layout/auth/AuthLayoutPages";
import LoginPage from "../pages/LoginPage";
import MainAppsPages from "../layout/app/MainAppsPages";
import NotFound from "../pages/Not-Found";
import ProtectedRoute from "@/components/ProtectedRoute ";
import ProtectAuthRoute from "@/components/ProtectAuthRoute";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainAppsPages />}>
          <Route index element={<Homepage />} />
        </Route>

        {/* <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainAppsPages />}>
            <Route index element={<Homepage />} />
          </Route>
        </Route> */}

        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectAuthRoute />}>
          <Route path="/auth" element={<AuthLayoutPages />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
