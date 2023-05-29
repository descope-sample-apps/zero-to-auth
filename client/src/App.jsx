import Container from "./containers";
import React from "react";
import { AuthProvider } from "@descope/react-sdk";

const App = () => {
  return (
    <div className="App">
      <AuthProvider projectId="P2My9KRakUMj40L8KOBjAJLVWhWC">
        <Container />
      </AuthProvider>
    </div>
  );
};

export default App;
