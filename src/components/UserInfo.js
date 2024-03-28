import {
  useDynamicContext,
  useUserUpdateRequest,
  useEmailVerificationRequest,
} from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

import "../styles/user-info.css";

export const UserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showVerifyEmailForm, setShowVerifyEmailForm] = useState(false);

  // Get the current user's information from the DynamicContext
  const { user } = useDynamicContext();
  // Get the updateUser function from the useUserUpdateRequest hook
  const { updateUser } = useUserUpdateRequest();
  // Get the verifyEmail function from the useEmailVerificationRequest hook
  const { verifyEmail } = useEmailVerificationRequest();

  // Handler for the profile update form submission
  const onProfileFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call the updateUser function with the new values entered by the user
      const { isEmailVerificationRequired } = await updateUser({
        firstName: e.target[0].value,
        email: e.target[1].value,
      });
      // If email verification is required, show the email verification form
      if (isEmailVerificationRequired) {
        setShowVerifyEmailForm(true);
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
      setShowUpdateForm(false);
    }
    return false;
  };

  // Handler for the email verification form submission
  const onVerifyEmailFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const verificationToken = e.target[0].value;
      // Call the verifyEmail function with the entered verification token
      await verifyEmail(verificationToken);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
      // Hide the email verification form after the process is completed
      setShowVerifyEmailForm(false);
    }
    return false;
  };

  return (
    <div>
      {user && (
        <div>
          {/* Render the user's information */}
          <div className="user-info">
            <div className="title-container">
              <h6>User</h6>
              <button
                className="update-button"
                onClick={() => setShowUpdateForm(!showUpdateForm)}
              >
                {!showUpdateForm ? "Update" : "Cancel"}
              </button>
            </div>
            <div className="user-details">
              {user?.firstName && <p>First name: {user.firstName} </p>}
              {user?.email && <p>E-Mail: {user.email} </p>}
              {user?.alias && <p>Alias: {user.alias} </p>}
              {user?.lastName && <p>Last name: {user.lastName} </p>}
              {user?.jobTitle && <p>Job: {user.jobTitle} </p>}
              {user?.phoneNumber && <p>Phone: {user.phoneNumber} </p>}
              {user?.tShirtSize && <p>Tshirt size: {user.tShirtSize} </p>}
              {user?.team && <p>Team: {user.team} </p>}
              {user?.country && <p>Country: {user.country} </p>}
              {user?.username && <p>Username: {user.username} </p>}
            </div>
          </div>

          {/* Render the profile update form */}
          {showUpdateForm && (
            <div>
              <form onSubmit={onProfileFormSubmit} className="form">
                <div className="form__row">
                  <label className="label" htmlFor="firstName">
                    First-Name
                  </label>
                  <input
                    id="firstName"
                    className="form__input"
                    defaultValue={user.firstName}
                    disabled={loading || showVerifyEmailForm}
                  />
                </div>
                <div className="form__row">
                  <label className="label" htmlFor="email">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form__input"
                    defaultValue={user.email}
                    disabled={loading || showVerifyEmailForm}
                  />
                </div>
                <button
                  disabled={loading || showVerifyEmailForm}
                  className="form__button"
                  type="submit"
                >
                  Save
                </button>
              </form>
            </div>
          )}

          {/* Render the email verification form if needed */}
          {showVerifyEmailForm && (
            <form onSubmit={onVerifyEmailFormSubmit} className="form">
              <h6>Verify Email</h6>
              <div className="form__row">
                <label htmlFor="verificationToken">Verification Token</label>
                <input
                  disabled={loading}
                  pattern="^\d{6}$"
                  name="verificationToken"
                />
              </div>
              <button disabled={loading} className="form__button" type="submit">
                Send
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
