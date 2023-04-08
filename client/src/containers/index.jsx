import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "../auth/signIn/SignIn";
import Dashboard from "../dashboard/Dashboard";

import ProjectLayout from "../layout/ProjectLayout";

const Container = () => {
  return (
    <div>
      <ProjectLayout>
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="admin" element={<Dashboard />} />
          <Route
            path="*"
            element={<Navigate to="/sign-in" replace />}
        />
        </Routes>
      </ProjectLayout>
    </div>
  );
};

export default Container;
