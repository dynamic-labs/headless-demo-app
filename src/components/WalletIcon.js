import { WalletIcon } from "@dynamic-labs/wallet-book";

import "../styles/icon.css";

const WalletIconWrapped = ({ connector }) => {
  const normalizeWalletName = (name) => name.replace(/\W/g, "").toLowerCase();
  const normalizedWalletName = normalizeWalletName(connector.name);

  return (
    <div className="wallet-icon-container">
      <WalletIcon walletKey={normalizedWalletName} />
    </div>
  );
};

export default WalletIconWrapped;
