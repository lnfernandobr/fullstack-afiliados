import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { Transactions } from "../transcations/Transactions";

export const AuthenticatedRoutes = () => (
  <Routes>
    <Route path={RoutePaths.ROOT} element={<Transactions />} />
  </Routes>
);
