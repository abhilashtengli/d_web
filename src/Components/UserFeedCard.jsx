// eslint-disable-next-line react/prop-types
const UserFeedCard = ({ user }) => {
  // Ensure user exists and fallback to empty string for undefined properties
  const {
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

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary px-7">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
