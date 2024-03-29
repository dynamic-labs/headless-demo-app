import { useSocialAccounts } from "@dynamic-labs/sdk-react-core";

import { Flex } from "@chakra-ui/react";

import "../styles/socials.css";

const Avatar = ({ avatarUrl }) => {
  return (
    <div className="avatar">
      <img src={avatarUrl} alt="avatar" />
    </div>
  );
};

const icons = {
  discord: "https://img.icons8.com/color/48/000000/discord-logo.png",
  facebook: "https://img.icons8.com/color/48/000000/facebook-new.png",
  github: "https://img.icons8.com/ios-filled/50/000000/github.png",
  google: "https://img.icons8.com/color/48/000000/google-logo.png",
  instagram: "https://img.icons8.com/color/48/000000/instagram-new.png",
  twitch: "https://img.icons8.com/color/48/000000/twitch--v1.png",
  twitter: "https://img.icons8.com/color/48/000000/twitter--v1.png",
};

const Icon = ({ provider }) => {
  return (
    <div className="icon-container">
      <img className="icon" src={icons[provider]} />
    </div>
  );
};

const UserProfileSocialAccount = ({ provider }) => {
  const {
    linkSocialAccount,
    unlinkSocialAccount,
    isProcessing,
    isLinked,
    getLinkedAccountInformation,
  } = useSocialAccounts();

  const isProviderLinked = isLinked(provider);
  const connectedAccountInfo = getLinkedAccountInformation(provider);

  return (
    <Flex>
      <div className="icon">
        {isProviderLinked ? (
          <Avatar avatarUrl={connectedAccountInfo?.avatar} />
        ) : (
          <Icon provider={provider} />
        )}
      </div>
      <div className="label">
        <p>{connectedAccountInfo?.publicIdentifier ?? provider}</p>
      </div>
      {isProviderLinked ? (
        <button
          onClick={() => unlinkSocialAccount(provider)}
          loading={isProcessing}
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={() => linkSocialAccount(provider)}
          loading={isProcessing}
        >
          Connect
        </button>
      )}
    </Flex>
  );
};

const Socials = () => {
  const providers = [
    "discord",
    "facebook",
    "github",
    "google",
    "instagram",
    "twitch",
    "twitter",
  ];

  return (
    <Flex direction="column" align="stretch">
      {providers.map((provider) => (
        <UserProfileSocialAccount provider={provider} />
      ))}
    </Flex>
  );
};

export default Socials;
