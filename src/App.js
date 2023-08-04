import { useState } from "react";
import Main from "./components/Main";
import Alert from "./components/Alert";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";

import "./App.css";

function App() {
  const [alertProps, setAlertProps] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [showDynamicNav, setShowDynamicNav] = useState(false);

  return (
    <div className="App">
      <DynamicContextProvider
        settings={{
          environmentId: "f0b977d0-b712-49f1-af89-2a24c47674da",
          eventsCallbacks: {
            onLinkSuccess: (args) => {
              setAlertProps({
                show: true,
                type: "success",
                message: "Wallet linked!",
              });
              setShowDynamicNav(false);
            },
            onAuthSuccess: (args) => {
              setAlertProps({
                show: true,
                type: "success",
                message: "Auth success!",
              });
            },
            onLogout: (args) => {
              setAlertProps({
                show: true,
                type: "success",
                message: "Logout success!",
              });
            },
            onUserProfileUpdate: (user) => {
              setAlertProps({
                show: true,
                type: "success",
                message: "Profile update success!",
              });
            },
          },
        }}
      >
        {alertProps.show && (
          <Alert
            setAlertProps={setAlertProps}
            show={alertProps.show}
            type={alertProps.type}
            message={alertProps.message}
          />
        )}
        <Main
          showDynamicNav={showDynamicNav}
          setShowDynamicNav={setShowDynamicNav}
        />
      </DynamicContextProvider>
    </div>
  );
}

export default App;
