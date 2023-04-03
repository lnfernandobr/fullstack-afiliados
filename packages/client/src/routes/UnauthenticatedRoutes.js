import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { Login } from "../Login";

export const UnauthenticatedRoutes = () => (
  <Routes>
    <Route path={`/${RoutePaths.LOGIN}`} element={<Login />} />
    <Route path="*" element={<Login />} />
  </Routes>
);
