import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;
