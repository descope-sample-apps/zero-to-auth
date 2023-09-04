import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../auth/signIn/SignIn";
import Dashboard from "../dashboard/Dashboard";
import { AuthProvider } from "@descope/react-sdk";

import ProjectLayout from "../layout/ProjectLayout";

const Container = () => {
  return (
    <div>
      <AuthProvider projectId="<your-project-id>">
        <ProjectLayout>
          <Routes>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </ProjectLayout>
      </AuthProvider>
    </div>
  );
};

export default Container;
