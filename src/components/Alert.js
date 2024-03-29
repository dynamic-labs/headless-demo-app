import React, { useEffect } from "react";

import { Alert, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";

import "../styles/alert.css";

const AlertWrapper = ({ setAlertProps, show, type, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertProps({
        show: false,
        type: "",
        message: "",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [setAlertProps]);

  const handleDismiss = () => {
    setAlertProps({
      show: false,
      type: "",
      message: "",
    });
  };

  return (
    <>
      {show && (
        <Alert status={type}>
          <AlertIcon />
          <Box>
            <AlertTitle>{message}</AlertTitle>
          </Box>
          <button onClick={handleDismiss}>Close</button>
        </Alert>
      )}
    </>
  );
};

export default AlertWrapper;
