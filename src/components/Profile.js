import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import UserInfo from "./UserInfo";
import "../styles/profile.css";

import LinkedWallets from "./LinkedWallets";
import Logout from "./Logout";
import LinkWallet from "./LinkWallet";
import PrimaryWallet from "./PrimaryWallet";
import CustomNetworkPicker from "./NetworkPicker";

import "react-tooltip/dist/react-tooltip.css";
import Socials from "./Socials";
import Onramp from "./Onramp";
import Signup from "./Email";

const Profile = () => {
  const { primaryWallet, user } = useDynamicContext();
  const [showProfile, setShowProfile] = useState(false);
  const [showWallets, setShowWallets] = useState(true);

  return (
    <div className="profile-page">
      <div className="profile-container">
        {user && (
          <div className="profile-header">
            <button
              onClick={() => {
                setShowProfile(true);
                setShowWallets(false);
              }}
            >
              Profile
            </button>
            <button
              onClick={() => {
                setShowProfile(false);
                setShowWallets(true);
              }}
            >
              Wallets
            </button>
          </div>
        )}

        {showProfile && (
          <div>
            <h1>Profile</h1>
            <div className="user-info-container">
              <UserInfo />
              <Socials />
            </div>
          </div>
        )}

        {showWallets && (
          <div>
            {!primaryWallet ? (
              <div className="no-wallets-message">
                <p>No connected wallets.</p>
                <LinkWallet text="Link a wallet" />
              </div>
            ) : (
              <div>
                <PrimaryWallet />
                <CustomNetworkPicker />
                <LinkedWallets />

                <div className="profile-main-actions-container">
                  <Onramp />
                  <div className="profile-bottom-actions-container">
                    <LinkWallet text="Link another wallet" />
                    <Logout />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
