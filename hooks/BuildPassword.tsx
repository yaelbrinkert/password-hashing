"use client";
import { useState } from "react";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import argon2 from "argon2";
import tryArgon from "@/lib/tryArgon";

function BuildPassword() {
  const [paramHash, setParamHash] = useState("sha256");
  const [pw, setPw] = useState("");
  const [hashed, setHashed] = useState("");

  const hashParams = ["sha256", "bcrypt", "Argon2", "PBKDF2"];
  function changePassword() {
    let selectedType = hashParams.find((obj) => obj === paramHash);

    if (selectedType === "sha256")
      return setHashed(crypto.createHash("sha256").update(pw).digest("hex"));

    if (selectedType === "bcrypt") {
      const saltrounds = 10;
      return setHashed(bcrypt.hashSync(pw, saltrounds));
    }

    async function hashArgon2(pw: string) {
      const hashing = await tryArgon(pw);
      setHashed(hashing);
    }

    if (selectedType === "Argon2") {
      hashArgon2(pw);
    }

    if (selectedType === "PBKDF2") {
      const salt = crypto.randomBytes(16).toString("hex");
      const iterations = 100000;
      const keyLength = 64;

      crypto.pbkdf2(
        pw,
        salt,
        iterations,
        keyLength,
        "sha256",
        (err, derivedKey) => {
          if (err) throw err;
          setHashed(derivedKey.toString("hex"));
        }
      );
    }
  }

  //   const radioLabel =
  //     "flex cursor-pointer h-[30px] bg-white shadow-xl rounded-[50px] checked:bg-black checked:content-[✓]";
  // const radioLabel = `flex cursor-pointer shadow-xl rounded-[50px]`;
  const radioLabel = `flex cursor-pointer`;

  // const activeLabel = "bg-black content-[✓]";
  const radioInput = "flex";

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Write your password</label>
        <Input
          type="text"
          name="password"
          id="password"
          required
          minLength={4}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <label htmlFor="sha256" className={radioLabel}>
            SHA-256
          </label>
          <input
            type="radio"
            name="typesalt"
            value={"sha256"}
            id="sha256"
            onChange={(e) => setParamHash(e.target.value)}
            defaultChecked
            className={radioInput}
          />
        </div>

        <div className="flex flex-row gap-4">
          <label htmlFor="bcrypt" className={radioLabel}>
            Bcrypt
          </label>
          <input
            type="radio"
            name="typesalt"
            value={"bcrypt"}
            id="bcrypt"
            onChange={(e) => setParamHash(e.target.value)}
            className={radioInput}
          />
        </div>
        <div className="flex flex-row gap-4">
          <label htmlFor="pbkdf2" className={radioLabel}>
            PBKDF2
          </label>
          <input
            type="radio"
            name="typesalt"
            value={"PBKDF2"}
            id="pbkdf2"
            onChange={(e) => setParamHash(e.target.value)}
            className={radioInput}
          />
        </div>
        <div className="flex flex-row gap-4">
          <label htmlFor="argon" className={radioLabel}>
            Argon2
          </label>
          <input
            type="radio"
            id="argon"
            name="typesalt"
            value={"Argon2"}
            onChange={(e) => setParamHash(e.target.value)}
            className={radioInput}
          />
        </div>
        <Button variant="outline" type="button" onClick={changePassword}>
          Generate hashed password
        </Button>
      </form>
      <p className="flex">Your hashed password: </p>
      <p className="flex bg-muted px-[0.5rem] py-[0.3rem] font-mono text-lg w-full h-fit">
        {hashed}
      </p>
    </div>
  );
}

export default BuildPassword;
