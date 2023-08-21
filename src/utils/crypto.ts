/**
 * Gets the _crypto implementation if available in the current context
 * @returns {Crypto}
 */
export default function getCrypto(): Crypto {
  if (typeof globalThis.crypto?.subtle === "object") return globalThis.crypto;
  throw new Error(
    "no native implementation of _crypto is available in current context",
  );
}
