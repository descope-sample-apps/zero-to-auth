import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider projectId="P2OEsPZdWHN2CkaERPhpTd8M25aR">
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
