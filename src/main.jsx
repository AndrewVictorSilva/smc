import "./styles/global.css";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/auth/login/index.jsx";
import { AuthProvider } from "./contexts/authContext/index.jsx";
import { AdminDashboard } from "./components/AdminDashboard.jsx";
import { Register } from "./components/auth/register/index.jsx";
import { Company } from "./components/Company.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import {LoginTest} from './components/LoginTest.jsx'

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
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute element={<AdminDashboard />} />
  },
  {
    path: "/admin/users",
    element: <ProtectedRoute element={<Register />} />
  },
  {
    path: "/admin/company",
    element: <ProtectedRoute element={<Company />} />
  },
  {
    path: "/login-test",
    element: <ProtectedRoute element={<LoginTest />} />
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);