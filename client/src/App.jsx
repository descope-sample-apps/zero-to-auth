import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider
      projectId="P2WW9HM7L4dT7vN6WWTi5toT8SEr"
      sessionTokenViaCookie
    >
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
