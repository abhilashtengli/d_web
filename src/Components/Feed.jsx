import axios from "axios";
import { Base_Url } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserFeedCard from "./UserFeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(Base_Url + "/user/feed", {
        withCredentials: true,
      });
      //   console.log(res?.data);

      dispatch(addFeed(res?.data));
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center items-center py-14">
        <UserFeedCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
