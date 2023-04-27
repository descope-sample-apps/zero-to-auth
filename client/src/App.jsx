import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider projectId="<Insert Project ID here>" sessionTokenViaCookie>
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
