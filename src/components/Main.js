import Profile from "./Profile";

const Main = ({ showDynamicNav, setShowDynamicNav }) => {
  return (
    <div>
      <Profile
        showDynamicNav={showDynamicNav}
        setShowDynamicNav={setShowDynamicNav}
      />
    </div>
  );
};

export default Main;
