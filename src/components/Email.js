import "../styles/signup.css";

import {
  useConnectWithEmailOtp,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";

const EmailSignup = () => {
  const { user } = useDynamicContext();

  const { connectWithEmail, verifyOneTimePassword } = useConnectWithEmailOtp({
    provider: "dynamic",
  });

  const onSubmitEmailHandler = async (event) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;

    await connectWithEmail(email);
  };

  const onSubmitOtpHandler = async (event) => {
    event.preventDefault();

    const otp = event.currentTarget.otp.value;

    await verifyOneTimePassword(otp);
  };

  return (
    <div>
      <form key="email-form" onSubmit={onSubmitEmailHandler}>
        <input type="email" name="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>

      <form key="otp-form" onSubmit={onSubmitOtpHandler}>
        <input type="text" name="otp" placeholder="OTP" />
        <button type="submit">Submit</button>
      </form>

      {!!user && (
        <div>
          <p>Authenticated user:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EmailSignup;
