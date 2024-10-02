/* eslint-disable no-unused-vars */
import axios from "axios";
import { Base_Url } from "../utils/Constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

// eslint-disable-next-line react/prop-types
const UserFeedCard = ({ user }) => {
  const [error, setError] = useState();
  const dispatch = useDispatch();

  // Ensure user exists and fallback to empty string for undefined properties
  const {
    _id,
    firstName = "",
    lastName = "",
    photoUrl = "",
    about = "",
    age = "",
    gender = "",
  } = user || {};

  // Return null or some loading state if the user object is not ready
  if (!user) {
    return <div>Loading...</div>; // Or handle this in a more sophisticated way, like a spinner
  }

  const handleSendRequest = async (status, user_id) => {
    try {
      const res = await axios.post(
        Base_Url + "/request/send/" + status + "/" + user_id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(user_id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl border border-gray-500">
      <figure>
        <img
          src={photoUrl}
          alt="photo"
          className="w-56 object-cover mt-5 rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary px-7"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
