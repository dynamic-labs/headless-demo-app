import { useFunding } from "@dynamic-labs/sdk-react-core";

import "../styles/onramp.css";

const Onramp = () => {
  const { enabled, openFunding } = useFunding();

  return (
    <div>
      {enabled && (
        <button className="onramp-button" onClick={openFunding}>
          Onramp
        </button>
      )}
    </div>
  );
};

export default Onramp;
