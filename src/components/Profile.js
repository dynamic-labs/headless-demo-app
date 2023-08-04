import { DynamicNav, useDynamicContext } from "@dynamic-labs/sdk-react";
import UserInfo from "./UserInfo";
import "../styles/profile.css";

const Profile = ({ showDynamicNav, setShowDynamicNav }) => {
  const {
    primaryWallet,
    setShowAuthFlow,
    connectedWallets,
    handleUnlinkWallet,
    handleLogOut,
  } = useDynamicContext();

  const unLink = (id) => {
    handleUnlinkWallet(id)
      .then((res) =>
        console.log("res", res, "connected wallets", connectedWallets)
      )
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="user-info">
          <UserInfo />
        </div>
        {connectedWallets && connectedWallets.length > 0 && (
          <div className="profile-wallets-container">
            <h2>Connected Wallets</h2>
            <div className="profile-wallets-inner-container">
              {connectedWallets.map((wallet) => (
                <div key={wallet.address} className="wallet-item">
                  <div className="wallet-address">{wallet.address}</div>
                  <div className="wallet-chain">{wallet.chain}</div>
                  <button
                    className="profile-wallet-button"
                    onClick={() => unLink(wallet.id)}
                  >
                    Unlink
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {!connectedWallets ||
          (connectedWallets.length === 0 && (
            <div className="no-wallets-message">
              <p>No connected wallets found.</p>
              <p>Connect a wallet to view your connected wallets.</p>
              <button
                className="profile-button"
                onClick={() => setShowAuthFlow(true)}
              >
                Connect Wallet
              </button>
            </div>
          ))}
        {primaryWallet && (
          <div>
            {showDynamicNav && <DynamicNav />}
            <div className="profile-main-actions-container">
              {!showDynamicNav && (
                <button
                  className="profile-button"
                  onClick={() => setShowDynamicNav(true)}
                >
                  Link new wallet
                </button>
              )}
              <div className="log-out-container">
                <button
                  className="profile-button"
                  onClick={() => handleLogOut()}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
