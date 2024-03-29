import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import WalletIconWrapped from "./WalletIcon";

import { Button, ButtonGroup, VStack } from "@chakra-ui/react";

import "../styles/primary-wallet.css";

const PrimaryWallet = () => {
  const { primaryWallet, handleLogOut } = useDynamicContext();

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(primaryWallet.address);
  };

  return (
    <VStack spacing={"24px"} className="primary-wallet-container">
      <h3>Primary Wallet</h3>
      <div className="primary-wallet-info-container">
        <WalletIconWrapped connector={primaryWallet.connector} />
        <p>...{primaryWallet.address.slice(-6)}</p>
      </div>
      <ButtonGroup className="primary-wallet-actions-container">
        <Button
          className="secondary-button"
          onClick={() => copyWalletAddress()}
        >
          Copy wallet address
        </Button>
        <Button className="secondary-button" onClick={() => handleLogOut()}>
          Disconnect
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default PrimaryWallet;
