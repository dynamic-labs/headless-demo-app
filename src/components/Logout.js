import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const Logout = () => {
  const { handleLogOut } = useDynamicContext();

  return (
    <div className="log-out-container">
      <button className="profile-button" onClick={() => handleLogOut()}>
        Log out
      </button>
    </div>
  );
};

export default Logout;
