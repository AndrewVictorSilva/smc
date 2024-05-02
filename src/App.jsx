import { useEffect, useState } from "react";
import { Login } from "./components/auth/login";
//import { Register } from "./components/auth/register";

import { Header } from "./components/header";
import { Home } from "./components/home";

import { AuthProvider } from "./contexts/authContext";

//import { useRoutes } from "react-router-dom";
import { auth } from "./firebase/firebase";

function App() {
  const [authenticated, setAuthenticated] = useState({
    loading: true,
    user: false,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthenticated({
        loading: false,
        user,
      });
    });
  }, []);

  if (authenticated.loading) {
    return <div>Loading</div>;
  }

  return (
    <AuthProvider>
      <Header />
      {authenticated.user ? (
        <Home />
      ) : authenticated.user === false ? (
        <Login />
      ) : (
        <Login />
      )}
    </AuthProvider>
  );
}

export default App;
