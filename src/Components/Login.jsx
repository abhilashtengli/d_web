import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/Constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
        // To save token in cookies you need this
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      // console.error(err);
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
        // To save token in cookies you need this
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      // console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center my-16 ">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <div>
              {!isLoginForm && (
                <>
                  <label className="form-control w-full max-w-xs ">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder="firstname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs ">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder="lastname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>{" "}
                </>
              )}
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Email Id</span>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <p className="text-lg text-red-600">{error}</p>
            <div className="card-actions justify-center mt-5">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignup}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            <p
              className="m-auto cursor-pointer my-5 hover:text-blue-500"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Signup Here"
                : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
