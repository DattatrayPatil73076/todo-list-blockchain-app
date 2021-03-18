import Key from "./Key.json";
const EthCrypto = require("eth-crypto");

export const encrypt = async (input) => {
  const encrypted = await EthCrypto.encryptWithPublicKey(
    Key.alice.publicKey,
    input
  );
  return JSON.stringify(encrypted);
};

export const decrypt = async (input) => {
  const decrypted = await EthCrypto.decryptWithPrivateKey(
    Key.alice.privateKey,
    JSON.parse(input)
  );
  return decrypted;
};
