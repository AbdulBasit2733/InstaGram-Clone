import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
const App = () => {
  const [authUser] = useAuthState(auth);
  return (
    <>
      <Router>
        <PageLayout>
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to={"/auth"} />}
            />
            <Route
              path="/auth"
              element={!authUser ? <AuthPage /> : <Navigate to={"/"} />}
            />
            <Route path="/:username" element={<ProfilePage />} />
          </Routes>
        </PageLayout>
      </Router>
    </>
  );
};

export default App;
