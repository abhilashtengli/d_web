import axios from "axios";
import { Base_Url } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/RequestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    const res = await axios.get(Base_Url + "/user/requests/pending", {
      withCredentials: true,
    });
    // console.log(res.data.data);

    dispatch(addRequest(res.data.data));
  };

  const reviewRequest = async (status, _id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        Base_Url + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="text-red-500">No requests Found</h1>;

  return (
    <>
      <div className="flex justify-center my-16">
        <h1 className="text-2xl ">Connection Requests</h1>
      </div>
      <div className=" border-red-500 flex justify-center gap-10 py-2 ite">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId;

          return (
            <div
              className="border border-gray-800 rounded-lg flex bg-gray-800 shadow-lg flex-col p-4 gap-y-5 w-72"
              key={_id}
            >
              <div className="w-full grid place-content-center  h-[50%]">
                <img alt="" className="w-36 h-36 rounded-full" src={photoUrl} />
              </div>
              <div className="space-y-3  h-[50%]">
                <h1 className="font-semibold text-xl ">
                  {firstName + " " + lastName}
                </h1>
                <h2>{age + ", " + gender}</h2>
                <h2>{about}</h2>
              </div>
              <div className="flex justify-center items-center gap-x-16">
                <button
                  className="btn btn-primary w-20"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
