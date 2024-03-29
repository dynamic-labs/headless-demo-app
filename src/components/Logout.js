import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import { Button } from "@chakra-ui/react";

const Logout = () => {
  const { handleLogOut } = useDynamicContext();

  return (
    <div className="log-out-container">
      <Button className="profile-button" onClick={() => handleLogOut()}>
        Log out
      </Button>
    </div>
  );
};

export default Logout;
