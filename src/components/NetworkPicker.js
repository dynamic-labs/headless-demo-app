import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { useDynamicContext, getNetwork } from "@dynamic-labs/sdk-react-core";

const CustomNetworkPicker = () => {
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const { primaryWallet } = useDynamicContext();

  const handleNetworkChange = async (event) => {
    const chainId = parseInt(event.target.value);

    if (primaryWallet.connector.supportsNetworkSwitching()) {
      try {
        return await primaryWallet.connector.switchNetwork({
          networkChainId: chainId,
        });
      } catch (error) {
        console.error("Error switching network", error);
      }
    }
  };

  useEffect(() => {
    getNetwork(primaryWallet?.connector).then((network) => {
      if (!currentNetwork || currentNetwork !== network) {
        const fullNetworkObject = primaryWallet.connector.evmNetworks.find(
          (evmNetwork) => evmNetwork.chainId === network
        );
        setCurrentNetwork(fullNetworkObject);
      }
    });
  }, [primaryWallet, currentNetwork]);

  return (
    <>
      {currentNetwork && (
        <Select
          placeholder="Select option"
          defaultValue={currentNetwork.chainId}
          onChange={handleNetworkChange}
        >
          {primaryWallet?.connector?.evmNetworks?.map((network) => (
            <option key={network.chainId} value={network.chainId}>
              {network.name} - {network.chainId}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};

export default CustomNetworkPicker;
