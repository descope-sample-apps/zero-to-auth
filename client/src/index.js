import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// export const Context = createContext({ isAuthenticated: false });
// const AppWrapper = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   return (
//     <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       <App />
//     </Context.Provider>
//   );
// };
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
