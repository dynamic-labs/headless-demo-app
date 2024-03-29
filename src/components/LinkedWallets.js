import {
  useDynamicContext,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { Tooltip } from "react-tooltip";

import { Button, Flex, Spacer } from "@chakra-ui/react";

const LinkedWallets = () => {
  const { handleUnlinkWallet, primaryWallet, setPrimaryWallet } =
    useDynamicContext();

  const userWallets = useUserWallets();

  const handleChangePrimaryWallet = async (walletId) => {
    return await setPrimaryWallet(walletId);
  };

  const isPrimaryWallet = (walletId) => {
    return primaryWallet.id === walletId;
  };

  const filteredWallets = userWallets.filter(
    (wallet) => wallet.id !== primaryWallet.id
  );

  return (
    <>
      {filteredWallets.length > 0 && (
        <div
          style={{
            minWidth: "100%",
            paddingTop: "25px",
            paddingBottom: "25px",
          }}
        >
          <h2>Connected Wallets</h2>

          {filteredWallets.map((wallet) => (
            <Flex p="4" key={wallet.address}>
              <p>...{wallet.address.slice(-5)}</p>
              <Spacer />
              <Button
                size="xs"
                onClick={() => handleUnlinkWallet(wallet.id)}
                disabled={userWallets.length < 2}
              >
                Unlink
              </Button>
              <Spacer />
              <Button
                size="xs"
                onClick={() => handleChangePrimaryWallet(wallet.id)}
                disabled={userWallets.length < 2}
              >
                Make Primary Wallet
              </Button>
            </Flex>
          ))}
        </div>
      )}
    </>
  );
};

export default LinkedWallets;
