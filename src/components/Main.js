import { useDynamicContext, DynamicWidget} from '@dynamic-labs/sdk-react';

const Main = () => {
    const { primaryWallet } = useDynamicContext();

    const signMessage = async (primaryWallet) => {
        if (!primaryWallet) return null
        else {console.log(primaryWallet.address)}
    
        const signer = await primaryWallet.connector.getSigner();
    
        return signer ? await signer.signMessage('example') : null;
    };

    return (
        <div>
            <DynamicWidget /> 
            <button onClick={() => signMessage(primaryWallet)}>Sign Message</button>
        </div>
)};

export default Main;