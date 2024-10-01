/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserFeedCard from "./UserFeedCard";
import axios from "axios";
import { Base_Url } from "../utils/Constants";
import { addUser } from "../utils/UserSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState(user.error);
  const [userUpdate, setUserUpdate] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        Base_Url + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          age,
          photoUrl,
          gender,
        },
        { withCredentials: true }
      );
      setUserUpdate(true);
      setTimeout(() => {
        setUserUpdate(false);
      }, 3000);
      dispatch(addUser(res.data.data));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center my-16 ">
      <div className="flex items-center justify-center gap-x-10 ">
        <div className="card bg-base-100 w-96 shadow-xl border border-gray-500">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">First name</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Last name</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  type="text"
                  placeholder=""
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input input-bordered w-full h-fit max-w-xs p-2"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            {error && <p className="text-lg text-red-600">{error}</p>}
            {userUpdate && (
              <p className="text-lg text-green-600">
                User Data saved successfully
              </p>
            )}
            <div className="card-actions justify-center mt-5">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <UserFeedCard
          user={{ firstName, lastName, about, age, photoUrl, gender }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
