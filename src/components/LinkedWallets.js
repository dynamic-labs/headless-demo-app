import {
  useDynamicContext,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { Tooltip } from "react-tooltip";

const LinkedWallets = () => {
  const { primaryWallet, connectedWallets, handleUnlinkWallet } =
    useDynamicContext();

  const userWallets = useUserWallets();
  console.log(userWallets);

  return (
    <>
      {connectedWallets && userWallets.length > 0 && (
        <div className="profile-wallets-container">
          <h2>Connected Wallets</h2>
          {userWallets.length < 2 && <Tooltip id="unlink-tooltip" />}
          <div className="profile-wallets-inner-container">
            {userWallets.map((wallet) => (
              <div key={wallet.address} className="wallet-item">
                <div className="wallet-address">{wallet.address}</div>
                <div className="wallet-chain">{wallet.chain}</div>
                <a
                  data-tooltip-id="unlink-tooltip"
                  data-tooltip-content="Can't unlink your only wallet!"
                >
                  <button
                    className="profile-wallet-button"
                    onClick={() => handleUnlinkWallet(wallet.id)}
                    disabled={userWallets.length < 2}
                  >
                    Unlink
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LinkedWallets;
