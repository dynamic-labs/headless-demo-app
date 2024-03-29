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

import { Button, ButtonGroup, VStack } from "@chakra-ui/react";

const Profile = () => {
  const { primaryWallet, user } = useDynamicContext();
  const [showProfile, setShowProfile] = useState(false);
  const [showWallets, setShowWallets] = useState(true);

  return (
    <div className="profile-page">
      <div className="profile-container">
        {user && (
          <ButtonGroup className="profile-header">
            <Button
              onClick={() => {
                setShowProfile(true);
                setShowWallets(false);
              }}
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                setShowProfile(false);
                setShowWallets(true);
              }}
            >
              Wallets
            </Button>
          </ButtonGroup>
        )}

        {showProfile && (
          <div>
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
                <Logout />
              </div>
            ) : (
              <div>
                <VStack spacing="2F4px">
                  <PrimaryWallet />
                  <CustomNetworkPicker />
                  <LinkedWallets />
                </VStack>

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
