import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Email from "./Email";
import { useState } from "react";

import "../styles/authenticate.css";

const Authenticate = () => {
  const [showEmailFlow, setShowEmailFlow] = useState(false);
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="authenticate-container">
      <div className="modes-container">
        <button className="mode" onClick={() => setShowEmailFlow(true)}>
          Email
        </button>
        <button
          className="mode"
          onClick={() => {
            setShowEmailFlow(false);
            setShowAuthFlow(true);
          }}
        >
          Wallet
        </button>
      </div>

      <div className="authenticate-option">{showEmailFlow && <Email />}</div>
    </div>
  );
};

export default Authenticate;
