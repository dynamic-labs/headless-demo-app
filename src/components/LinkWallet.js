import { useDynamicModals, DynamicMultiWalletPromptsWidget } from "@dynamic-labs/sdk-react-core";

import { Button } from "@chakra-ui/react";

const LinkWallet = ({ text }) => {
  const { setShowLinkNewWalletModal } = useDynamicModals();

  return (
    <div className="link-wallet-container">
      <Button
        className="profile-button"
        onClick={() => setShowLinkNewWalletModal(true)}
      >
        {text}
      </Button>
      <DynamicMultiWalletPromptsWidget />
    </div>
  );
};

export default LinkWallet;
