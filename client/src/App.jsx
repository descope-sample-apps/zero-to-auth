import Container from "./containers";
import { AuthProvider } from "@descope/react-sdk";
import React from "react";

const App = () => {
  return (
    <AuthProvider projectId="P2UEmfEerYrRzTavvNJI9bMTWePg">
      <div className="App">
        <Container />
      </div>
    </AuthProvider>
  );
};

export default App;
