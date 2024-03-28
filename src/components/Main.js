import Profile from "./Profile";
import Authenticate from "./Authenticate";

import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  const isLoggedIn = useIsLoggedIn();

  console.log("isLoggedIn", isLoggedIn);

  return <div>{isLoggedIn ? <Profile /> : <Authenticate />}</div>;
};

export default Main;
