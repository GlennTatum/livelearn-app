import NavBar from "./navBar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default StudentLayout;
