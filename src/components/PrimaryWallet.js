import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import WalletIconWrapped from "./WalletIcon";

import "../styles/primary-wallet.css";

const PrimaryWallet = () => {
  const { primaryWallet, handleLogOut } = useDynamicContext();

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(primaryWallet.address);
  };

  return (
    <div className="primary-wallet-container">
      <h3>Primary Wallet</h3>
      <div className="primary-wallet-info-container">
        <WalletIconWrapped connector={primaryWallet.connector} />
        <p>...{primaryWallet.address.slice(-6)}</p>
      </div>
      <div className="primary-wallet-actions-container">
        <button
          className="secondary-button"
          onClick={() => copyWalletAddress()}
        >
          Copy wallet address
        </button>
        <button className="secondary-button" onClick={() => handleLogOut()}>
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default PrimaryWallet;
