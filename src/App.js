import React from "react";
import LearnForm from "./components/LearnForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./components/Login";
import Layout from "./components/layout";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import StudentLab from "./components/StudentLab";

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
        <Route
          path="/StudentLab"
          element={isSignedIn ? <StudentLab /> : <Navigate to="/Login" />}
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
