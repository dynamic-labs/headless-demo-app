import { WalletIcon } from "@dynamic-labs/wallet-book";
import { normalizeWalletName } from "@dynamic-labs/wallet-connector-core";

import "../styles/icon.css";

const WalletIconWrapped = ({ connector }) => {
  const normalizedWalletName = normalizeWalletName(connector.name);

  console.log(normalizedWalletName);

  return (
    <div className="wallet-icon-container">
      <WalletIcon walletName={normalizedWalletName} />
    </div>
  );
};

export default WalletIconWrapped;
