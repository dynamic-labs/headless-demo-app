import Profile from "./Profile";
import Authenticate from "./Authenticate";

import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  const { useIsLoggedIn } = useDynamicContext();

  return <div>{useIsLoggedIn ? <Profile /> : <Authenticate />}</div>;
};

export default Main;
