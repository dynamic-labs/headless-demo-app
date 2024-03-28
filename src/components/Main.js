import Profile from "./Profile";
import Authenticate from "./Authenticate";

import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  const isLoggedIn = useIsLoggedIn();

  return <div>{isLoggedIn ? <Profile /> : <Authenticate />}</div>;
};

export default Main;
