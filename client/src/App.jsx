import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider
      projectId={process.env.REACT_APP_DESCOPE_PROJECT_ID}
      sessionTokenViaCookie
    >
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
