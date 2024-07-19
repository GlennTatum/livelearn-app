import React from "react";
import LearnForm from "./components/LearnForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Layout from "./components/layout";
import { AuthProvider, useAuth } from "./AuthContext";

function Home() {
  return (
    <div className="flex-row flex-1" style={{ backgroundColor: "blueviolet" }}>
      Welcome to the Home Page
    </div>
  );
}

const AppRoute = () => {
  const { isSignedIn } = useAuth();
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route
          index
          element={isSignedIn ? <Home /> : <Navigate to="/Login" />}
        />
        <Route
          path="/LearnForm"
          element={isSignedIn ? <LearnForm /> : <Navigate to="/Login" />}
        />
      </Route>
      <Route
        path="*"
        element={isSignedIn ? <Navigate to="/" /> : <Navigate to="/Login" />}
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoute />
      </Router>
    </AuthProvider>
  );
}

export default App;
