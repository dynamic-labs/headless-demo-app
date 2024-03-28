import "../styles/signup.css";

import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [OTP, setOTP] = useState("");
  const [UUID, setUUID] = useState("");
  const [JWT, setJWT] = useState("");

  const updateUserWithInfo = async (JWT) => {
    const options = {
      method: "PUT",
      headers: {
        Authorization: JWT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    };

    fetch(
      `https://app.dynamicauth.com/api/v0/sdk/${process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID}/users`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const emailVerification = async () => {
    setVerifying(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };

    fetch(
      `https://app.dynamicauth.com/api/v0/sdk/${process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID}/emailVerifications/create`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setUUID(response.verificationUUID);
      })
      .catch((err) => console.error(err));
  };

  const verify = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verificationToken: OTP,
        verificationUUID: UUID,
      }),
    };

    fetch(
      `https://app.dynamicauth.com/api/v0/sdk/${process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID}/emailVerifications/signIn`,
      options
    )
      .then((response) => response.json())
      .then(async (response) => {
        // await updateUserWithInfo(response.jwt);
        setJWT(response.jwt);
        setVerifying(false);
        setVerified(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="email-signup-container">
      <h1 className="email-signup-heading">Signup with Email</h1>
      {!verifying && !verified && (
        <div>
          <div className="email-username-inputs-container">
            <div className="input-container">
              <input
                className="input"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                value={email}
              />
            </div>
            <div className="input-container">
              <input
                className="input"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
              <p className="optional-text">Optional</p>
            </div>
          </div>
          <button
            className="email-username-submit-button"
            onClick={() => emailVerification(email)}
          >
            Submit
          </button>
        </div>
      )}
      {verifying && !verified && (
        <div className="verify-container">
          <input
            type="text"
            onChange={(e) => setOTP(e.target.value)}
            placeholder="Enter your OTP"
            value={OTP}
          />
          <button className="verify-button" onClick={() => verify()}>
            Verify
          </button>
        </div>
      )}
      {verified && <p className="jwt-text">Your JWT is: {JWT}</p>}
    </div>
  );
};

export default Signup;
