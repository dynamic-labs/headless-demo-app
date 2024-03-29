import {
  useDynamicModals,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import Email from "./Email";
import { useState } from "react";

import { Button } from "@chakra-ui/react";

import "../styles/authenticate.css";

const Authenticate = ({
  createEmbeddedWallet,
  setShouldCreateEmbeddedWallet,
}) => {
  const { setShowAuthFlow } = useDynamicContext();
  const [showEmailFlow, setShowEmailFlow] = useState(false);
  const [showWalletAuthFlow, setShowWalletAuthFlow] = useState(false);

  const { setShowLinkNewWalletModal } = useDynamicModals();

  const handleWalletAuth = () => {
    setShowWalletAuthFlow(true);
    setShowAuthFlow(true);
    // setShowLinkNewWalletModal(true);

    setShouldCreateEmbeddedWallet(false);

    if (showEmailFlow) setShowEmailFlow(false);
  };

  return (
    <div className="authenticate-container">
      {!showEmailFlow && !showWalletAuthFlow && (
        <div>
          <h3>Please Signup/Login to continue</h3>
          <div className="modes-container">
            <Button className="mode" onClick={() => setShowEmailFlow(true)}>
              Email
            </Button>
            <Button className="mode" onClick={() => handleWalletAuth()}>
              Wallet
            </Button>
          </div>
        </div>
      )}

      <div className="authenticate-option">
        {showEmailFlow && (
          <Email
            createEmbeddedWallet={createEmbeddedWallet}
            setShouldCreateEmbeddedWallet={setShouldCreateEmbeddedWallet}
          />
        )}
      </div>
    </div>
  );
};

export default Authenticate;
