import React, { useEffect } from "react";

import "../styles/alert.css";

const Alert = ({ setAlertProps, show, type, message, onClose }) => {
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
        <div className={`alert alert-${type}`}>
          <div className="alert-message">{message}</div>
          <button className="alert-close-button" onClick={handleDismiss}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Alert;
