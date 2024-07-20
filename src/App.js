import React from "react";
import LearnForm from "./components/LearnForm";
import Navbar from "./components/navBar";
import StudentLab from "./components/StudentLab";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div className="flex-row flex-1 bg-red-500">Welcome to the Home Page</div>
  );
}

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
