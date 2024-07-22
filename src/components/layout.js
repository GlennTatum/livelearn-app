import { useAuth } from "../AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./navBar";

const Layout = () => {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn, setUserType } = useAuth();

  const handleLogout = () => {
    setIsSignedIn(false);
    setUserType("");
    navigate("/Login");
  };
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default Layout;
