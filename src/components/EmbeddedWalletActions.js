import React, { useState, useEffect } from "react";
import {
  useDynamicContext,
  useEmbeddedWallet,
} from "@dynamic-labs/sdk-react-core";
import "../styles/embedded-wallet.css";

import { Button, ButtonGroup } from "@chakra-ui/react";
import AlertWrapper from "./Alert";

const EmbeddedWalletActions = () => {
  const { primaryWallet } = useDynamicContext();

  const {
    createOrRestoreSession,
    createPasskey,
    getPasskeys,
    isLoadingEmbeddedWallet,
    isSessionActive,
    sendOneTimeCode,
    userHasEmbeddedWallet,
  } = useEmbeddedWallet();

  const [selectedAction, setSelectedAction] = useState("one-time-code");
  const [passkeys, setPasskeys] = useState(undefined);
  const [codeSent, setCodeSent] = useState(isSessionActive);
  const [alertProps, setAlertProps] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const loadPasskeys = async () => {
      await getPasskeys().then((passkeys) => setPasskeys(passkeys));
    };
    loadPasskeys();
  }, [getPasskeys]);

  const onSendOneTimeCodeHandler = async () => {
    if (!isSessionActive) {
      try {
        await sendOneTimeCode();
        setCodeSent(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onCreateSessionHandler = async (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      if (!primaryWallet || !userHasEmbeddedWallet()) return;

      const otc = event.currentTarget.otc.value;

      await createOrRestoreSession({ oneTimeCode: otc })
        .then((result) =>
          setAlertProps({ message: result, type: "success", show: true })
        )
        .catch((error) =>
          setAlertProps({
            message: JSON.stringify(error, null, 2),
            type: "error",
            show: true,
          })
        );
    } catch (err) {
      console.error(err);
    }
  };

  const onCreatePasskeyHandler = async (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      if (!primaryWallet || !userHasEmbeddedWallet()) return;

      const otc = event.currentTarget.otc.value;

      createPasskey({ oneTimeCode: otc })
        .then(() =>
          setAlertProps({
            message: "Passkey created!",
            type: "success",
            show: true,
          })
        )
        .catch((error) =>
          setAlertProps({
            message: JSON.stringify(error, null, 2),
            type: "error",
            show: true,
          })
        );
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoadingEmbeddedWallet || !userHasEmbeddedWallet()) {
    return <div>Looking for embedded wallet...</div>;
  }

  return (
    <div className="embedded-wallet-actions-container">
      <div className="embedded-wallet-actions-type">
        <ButtonGroup className="profile-header">
          <Button
            onClick={() => {
              setSelectedAction("one-time-code");
            }}
          >
            One-Time Code
          </Button>
          <Button
            onClick={() => {
              setSelectedAction("passkeys");
            }}
          >
            Passkeys
          </Button>
        </ButtonGroup>
      </div>
      <div className="embedded-wallet-actions-wrapper">
        <div>
          <p className={isSessionActive ? "active" : "inactive"}>
            Session {isSessionActive ? "active" : "inactive"}
          </p>
          <p>
            <AlertWrapper
              setAlertProps={setAlertProps}
              show={alertProps.show}
              type={alertProps.type}
              message={alertProps.message}
            />
          </p>
        </div>
        {!codeSent && (
          <button className="cta-button" onClick={onSendOneTimeCodeHandler}>
            Send one-time code
          </button>
        )}
        {selectedAction === "one-time-code" && (
          <div className="embedded-wallet-actions-one-time-code">
            {codeSent && (
              <form
                onSubmit={onCreateSessionHandler}
                className="create-session-method"
              >
                <p>Enter one-time code sent to email to create a session</p>

                <input name="otc" type="text" placeholder="One-time code" />
                <br />
                <button className="cta-button" type="submit">
                  Create session
                </button>
              </form>
            )}
          </div>
        )}
        {selectedAction === "passkeys" && (
          <>
            <div className="embedded-wallet-actions-passkey">
              {codeSent && (
                <>
                  <form
                    onSubmit={onCreatePasskeyHandler}
                    className="create-session-method"
                  >
                    <p>
                      Enter one-time code sent to email to create a new passkey
                    </p>

                    <input name="otc" type="text" placeholder="One-time code" />
                    <br />
                    <button className="cta-button" type="submit">
                      Create passkey
                    </button>
                  </form>
                </>
              )}
            </div>
            <div className="embedded-wallet-actions-created-passkeys">
              <p>Created Passkeys:</p>
              {passkeys.map((passkey) => (
                <div key={passkey.id}>
                  {passkey.createdAt.toDateString()}-{passkey.alias}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmbeddedWalletActions;
