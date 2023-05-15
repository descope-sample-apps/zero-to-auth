import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ProjectLayout from "../layout/ProjectLayout";
import Login from "../auth/Login";

const Container = () => {
  return (
    <div>
      <ProjectLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </ProjectLayout>
    </div>
  );
};

export default Container;
