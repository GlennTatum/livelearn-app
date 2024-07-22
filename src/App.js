import React from "react";
import LearnForm from "./components/LearnForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./components/Login";
import Layout from "./components/layout";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import StudentLab from "./components/StudentLab";
import StudentLayout from "./components/studentLayout";
import StudentHome from "./components/StudentHome";
import TeacherHome from "./components/TeacherHome";

const ProtectedRoute = ({ element: Element, requiredUserType }) => {
  const { isSignedIn, userType } = useAuth();
  return isSignedIn && userType === requiredUserType ? (
    <Element />
  ) : (
    <Navigate to="/Login" />
  );
};

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />

      <Route path="/teacher" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute
              element={TeacherHome}
              requiredUserType={"teacher"}
            />
          }
        />
        <Route
          path="LearnForm"
          element={
            <ProtectedRoute element={LearnForm} requiredUserType={"teacher"} />
          }
        />
      </Route>

      <Route path="/student" element={<StudentLayout />}>
        <Route
          path="lab"
          element={
            <ProtectedRoute element={StudentLab} requiredUserType={"student"} />
          }
        />
        <Route
          index
          element={
            <ProtectedRoute
              element={StudentHome}
              requiredUserType={"student"}
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/Login" />} />
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
