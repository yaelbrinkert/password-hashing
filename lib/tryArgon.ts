"use server";
import argon2 from "argon2";

async function tryArgon(pw: string) {
  const hash = await argon2.hash(pw, { type: argon2.argon2id });
  return hash;
}

export default tryArgon;
