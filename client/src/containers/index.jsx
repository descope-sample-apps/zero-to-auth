import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ProjectLayout from "../layout/ProjectLayout";

const Container = () => {
  return (
    <div>
      <ProjectLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ProjectLayout>
    </div>
  );
};

export default Container;
