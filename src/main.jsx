import "./styles/global.css";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/auth/login/index.jsx";
import { AuthProvider } from "./contexts/authContext/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/home",
    element: (
      <App />
    ),
  },
  {
    path: "/login",
    element: <Login />
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);