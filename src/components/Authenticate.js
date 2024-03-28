import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Email from "./Email";
import { useState } from "react";

import "../styles/authenticate.css";

const Authenticate = () => {
  const [showEmailFlow, setShowEmailFlow] = useState(false);
  const [showWalletAuthFlow, setShowWalletAuthFlow] = useState(false);
  const { setShowAuthFlow } = useDynamicContext();

  const handleWalletAuth = () => {
    setShowWalletAuthFlow(true);
    setShowAuthFlow(true);

    if (showEmailFlow) setShowEmailFlow(false);
  };

  return (
    <div className="authenticate-container">
      {!showEmailFlow && !showWalletAuthFlow && (
        <div>
          <h3>Please Signup/Login to continue</h3>
          <div className="modes-container">
            <button className="mode" onClick={() => setShowEmailFlow(true)}>
              Email
            </button>
            <button className="mode" onClick={() => handleWalletAuth()}>
              Wallet
            </button>
          </div>
        </div>
      )}

      <div className="authenticate-option">{showEmailFlow && <Email />}</div>
    </div>
  );
};

export default Authenticate;
