import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { UploadTransactions } from "../transcations/UploadTransactions";

const Dashboard = () => <h1>dashboard</h1>;

export const AuthenticatedRoutes = () => (
  <Routes>
    <Route path={RoutePaths.ROOT} element={<UploadTransactions />} />
  </Routes>
);
