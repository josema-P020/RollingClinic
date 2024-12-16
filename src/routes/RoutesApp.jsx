import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

function RoutesApp() {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default RoutesApp;
