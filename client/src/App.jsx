import Container from "./containers";
import React from "react";
import { AuthProvider } from "@descope/react-sdk";

// App Container - Descope project ID: P2QEMO7FGX3WC8s3ZmEwlfuOkXb8
const App = () => {
  return (
    <div className="App">
      <AuthProvider projectId="P2QEMO7FGX3WC8s3ZmEwlfuOkXb8">
        <Container />
      </AuthProvider>
    </div>
  );
};

export default App;
