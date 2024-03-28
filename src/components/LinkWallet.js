import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const LinkWallet = ({ text }) => {
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="link-wallet-container">
      <button className="profile-button" onClick={() => setShowAuthFlow(true)}>
        {text}
      </button>
    </div>
  );
};

export default LinkWallet;
