import Container from "./containers";
import React from "react";
import { AuthProvider } from "@descope/react-sdk";

const App = () => {
  return (
    <AuthProvider projectId="P2My9KRakUMj40L8KOBjAJLVWhWC">
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
