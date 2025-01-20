import axios from "axios";
import { Base_Url } from "../utils/Constants";

const Premium = () => {
  const handleClick = async (type) => {
    const response = await axios.post(
      Base_Url + "/payments/create",
      {
        memberShipType: type
      },
      { withCredentials: true }
    );
  };
  return (
    <div className="m-10 h-screen w-full flex justify-center">
      <div className="flex gap-5">
        <div className="border  w-72 h-96 relative">
          <h1 className="text-center text-3xl py-5">Basic </h1>
          <ul className="space-y-6 px-5">
            <li>1. One month Membership</li>
            <li>2. 50 connection requests / day</li>
            <li>3. Max 500 words for post</li>
          </ul>
          <div className="absolute bottom-3  w-full flex justify-center">
            <button
              onClick={() => handleClick("Basic")}
              className="px-4 py-1 bg-pink-500 text-white rounded"
            >
              Buy Basic
            </button>
          </div>
        </div>
        <div className="border w-72 h-96 relative">
          <h1 className="text-center text-3xl py-5">Premium </h1>
          <ul className="space-y-6 px-5">
            <li>1. Three month Membership</li>
            <li>2. 100 connection requests / day</li>
            <li>3. Unlimited words for post</li>
            <li>4. Chat with anyone</li>
          </ul>
          <div className="absolute bottom-3  w-full flex justify-center">
            <button
              onClick={() => handleClick("Premium")}
              className="px-4 py-1 bg-purple-500 text-white rounded"
            >
              Buy Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
