import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";

import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api";

import Email from "./Email";
import { useState } from "react";

import { Button } from "@chakra-ui/react";

import "../styles/authenticate.css";

const Authenticate = ({
  setViews,
  createEmbeddedWallet,
  setShouldCreateEmbeddedWallet,
}) => {
  const [showEmailFlow, setShowEmailFlow] = useState(false);
  const [showWalletAuthFlow, setShowWalletAuthFlow] = useState(false);

  const handleWalletAuth = () => {
    setShowWalletAuthFlow(true);
    setShouldCreateEmbeddedWallet(false);

    setViews([
      {
        type: SdkViewType.Login,
        sections: [
          {
            type: SdkViewSectionType.Wallet,
          },
        ],
      },
    ]);

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
        {showWalletAuthFlow && <DynamicEmbeddedWidget />}
      </div>

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
