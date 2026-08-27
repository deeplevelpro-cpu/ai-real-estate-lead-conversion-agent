import crypto from "crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const derivedKey = (await scrypt(
    password,
    salt,
    64
  )) as Buffer;

  return {
    hash: derivedKey.toString("hex"),
    salt,
  };
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string
) {
  const derivedKey = (await scrypt(
    password,
    salt,
    64
  )) as Buffer;

  const storedHash = Buffer.from(hash, "hex");

  return crypto.timingSafeEqual(
    derivedKey,
    storedHash
  );
}
