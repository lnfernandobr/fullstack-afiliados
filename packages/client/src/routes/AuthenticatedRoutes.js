import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";

const Dashboard = () => <h1>dashboard</h1>;

export const AuthenticatedRoutes = () => (
  <Routes>
    <Route path={RoutePaths.ROOT} element={<Dashboard />} />
  </Routes>
);
