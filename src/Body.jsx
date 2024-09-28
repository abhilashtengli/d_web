import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Components/Footer";

const Body = () => {
  return (
    <div className="">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
