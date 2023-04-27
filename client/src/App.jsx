import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider
      projectId="P2Of1JkkbUkaw9Gv17xsjZcPOf5o"
      sessionTokenViaCookie
    >
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
