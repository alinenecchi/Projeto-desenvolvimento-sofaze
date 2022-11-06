import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./view/profile";
import Register from "./view/register";
import VerifyEmail from "./view/verify-email";
import Login from "./view/login";
import Home from "./view/home";

import { AuthProvider } from "./auth-context";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./PrivateRoute";
import { Provider } from "react-redux";
import store from "../src/store";
import RecoverPassword from "./view/recover-password";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route exact path="/home" element={<Home />} />
            <Route
              path="/login"
              element={
                !currentUser?.emailVerified ? (
                  <Login />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/register"
              element={
                !currentUser?.emailVerified ? (
                  <Register />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;
