import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div data-theme="dark" className="h-screen bg-gray-500">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
