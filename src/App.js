import React from "react";
import LearnForm from "./components/LearnForm";
import Navbar from "./components/navBar";
import StudentLab from "./components/StudentLab";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LearnForm" element={<LearnForm />} />
            <Route path="/StudentLab" element={<StudentLab />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
