import { useEffect, useState } from "react";
import Profile from "./Profile";
import Authenticate from "./Authenticate";

import { useIsLoggedIn, useEmbeddedWallet } from "@dynamic-labs/sdk-react-core";

const Main = ({ setViews }) => {
  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();

  const isLoggedIn = useIsLoggedIn();
  const [shouldCreateEmbeddedWallet, setShouldCreateEmbeddedWallet] =
    useState(true);

  useEffect(() => {
    const handleCreateEmbeddedWallet = async () => {
      try {
        await createEmbeddedWallet();
        console.log("Embedded wallet created");
      } catch (error) {
        console.error("Error creating embedded wallet", error);
      }
    };

    if (isLoggedIn && shouldCreateEmbeddedWallet && !userHasEmbeddedWallet()) {
      console.log("Creating embedded wallet");
      handleCreateEmbeddedWallet();
    }
  }, [
    shouldCreateEmbeddedWallet,
    isLoggedIn,
    userHasEmbeddedWallet,
    createEmbeddedWallet,
  ]);

  return (
    <div>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <Authenticate
          setViews={setViews}
          createEmbeddedWallet={createEmbeddedWallet}
          setShouldCreateEmbeddedWallet={setShouldCreateEmbeddedWallet}
        />
      )}
    </div>
  );
};

export default Main;
