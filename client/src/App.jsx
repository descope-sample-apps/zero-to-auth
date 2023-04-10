import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider
      projectId="P2O9zUpunOAGLdVHie8He79diqHU"
      sessionTokenViaCookie
    >
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
