const createEmbeddedWallet = async (email, chain) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: "<authorization>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chain: chain, identifier: email, type: "email" }),
  };

  fetch(
    `https://app.dynamicauth.com/api/v0/environments/${process.env.DYNAMIC_ENVIRONMENT_ID}/embeddedWallets`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
};

export default createEmbeddedWallet;
