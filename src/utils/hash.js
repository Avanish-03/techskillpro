// src/utils/hash.js
import sha256 from 'crypto-js/sha256';

export const hashPassword = (password) => {
  return sha256(password).toString();
};
