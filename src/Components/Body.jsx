import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { Base_Url } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUserData = async () => {
    if (user) return;
    try {
      const res = await axios.get(Base_Url + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div data-theme="dark" className="h-full bg-gray-400 ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
