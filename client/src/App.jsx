import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider
      projectId="P2My9KRakUMj40L8KOBjAJLVWhWC"
      sessionTokenViaCookie
    >
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
