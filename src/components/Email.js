import { useState } from "react";

import { useConnectWithEmailOtp } from "@dynamic-labs/sdk-react-core";

import { Input, Button, Flex, Checkbox } from "@chakra-ui/react";

import "../styles/signup.css";

const EmailSignup = ({
  createEmbeddedWallet,
  setShouldCreateEmbeddedWallet,
}) => {
  const [waitingForOtp, setWaitingForOtp] = useState(false);
  const [waitingForAuth, setWaitingForAuth] = useState(false);

  const { connectWithEmail, verifyOneTimePassword } = useConnectWithEmailOtp();

  const onSubmitEmailHandler = async (event) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;

    setWaitingForOtp(true);

    await connectWithEmail(email);
  };

  const onSubmitOtpHandler = async (event) => {
    event.preventDefault();

    const otp = event.currentTarget.otp.value;

    setWaitingForAuth(true);
    setWaitingForOtp(false);

    await verifyOneTimePassword(otp);
    setWaitingForAuth(false);
  };

  const handleEmbeddedWalletCreationChange = (event) => {
    const isChecked = event.target.checked;

    if (createEmbeddedWallet !== isChecked) {
      setShouldCreateEmbeddedWallet(isChecked);
    }
  };

  return (
    <div>
      {!waitingForOtp && (
        <form key="email-form" onSubmit={onSubmitEmailHandler}>
          <Flex>
            <Input type="email" name="email" placeholder="Enter your email" />
            <Button type="submit">Submit</Button>
          </Flex>
          <Checkbox
            onChange={handleEmbeddedWalletCreationChange}
            defaultChecked
          >
            Create an embedded wallet?
          </Checkbox>
        </form>
      )}

      {waitingForOtp && !waitingForAuth && (
        <form key="otp-form" onSubmit={onSubmitOtpHandler}>
          <Flex>
            <Input type="text" name="otp" placeholder="Enter your OTP" />
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      )}

      {waitingForOtp && !waitingForAuth && <p>Waiting for your OTP...</p>}

      {waitingForAuth && <p>Waiting for authentication...</p>}
    </div>
  );
};

export default EmailSignup;
