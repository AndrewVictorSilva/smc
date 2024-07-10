import "./styles/global.css";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/auth/login/index.jsx";
import { AuthProvider } from "./contexts/authContext/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { HomePage } from './components/HomeTest.jsx';
import { Admin } from "./components/Admin/index.jsx";

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
    path: "/home-test",
    element: <ProtectedRoute element={<HomePage />} />
  },
  {
    path: "/admin",
    element: <ProtectedRoute element={<Admin />} />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
