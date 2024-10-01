import axios from "axios";
import { Base_Url } from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/connections", {
        withCredentials: true,
      });
      //   console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="text-red-500">No Connections Found</h1>;

  return (
    <>
      <div className="flex justify-center my-16">
        <h1 className="text-2xl ">Connections</h1>
      </div>
      <div className=" border-red-500 flex flex-wrap justify-center gap-10 py-2 ite">
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, about, photoUrl } =
            connection;

          return (
            // eslint-disable-next-line react/jsx-key
            <div
              className="border border-gray-800 rounded-lg flex bg-gray-800 shadow-lg flex-col p-4 gap-y-5 w-72"
              key={firstName}
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
