import axios from "axios";
import { Base_Url } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/feed", {
        withCredentials: true,
      });
      console.log(res?.data);

      dispatch(addFeed(res?.data));
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return <div></div>;
};

export default Feed;
