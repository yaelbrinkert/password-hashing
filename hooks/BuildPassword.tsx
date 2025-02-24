"use client";
import { useState } from "react";
import crypto from "crypto";
import bcrypt from "bcryptjs";

function BuildPassword() {
  const [paramHash, setParamHash] = useState("");
  const [pw, setPw] = useState("");
  const [hashed, setHashed] = useState("");

  const hashParams = [
    "sha256",
    "bcrypt",
    "Argon2",
    "PBKDF2",
    // {
    //   type: "sha256",
    // },
    // {
    //   type: "bcrypt",
    // },
    // {
    //   type: "Argon2",
    //   length: "4",
    //   chars: "abcdefghijklmnopqrstuvwxyz1234567890",
    // },
    // {
    //   type: "PBKDF2",
    //   length: "2",
    //   chars: "abcdefghijklmnopqrstuvwxyz1234567890",
    // },
  ];
  function changePassword() {
    let selectedType = hashParams.find((obj) => obj === paramHash);

    if (selectedType === "sha256")
      return setHashed(crypto.createHash("sha256").update(pw).digest("hex"));

    if (selectedType === "bcrypt") {
      const saltrounds = 10;
      return setHashed(bcrypt.hashSync(pw, saltrounds));
    }
  }

  //   const radioLabel =
  //     "flex cursor-pointer h-[30px] bg-white shadow-xl rounded-[50px] checked:bg-black checked:content-[✓]";
  const radioLabel = "flex cursor-pointer shadow-xl rounded-[50px]";

  // const activeLabel = "bg-black content-[✓]";
  const radioInput = "flex";

  return (
    <div className="w-[100%]">
      <form className="flex flex-col">
        <label htmlFor="password">Write your password</label>
        <input
          type="text"
          name="password"
          id="password"
          className="border border-white rounded-3xl w-full"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </form>
      <form className="flex flex-col">
        <div className="flex flex-row gap-4">
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
        <button type="button" onClick={changePassword}>
          Generate hashed password
        </button>
      </form>
      <div>
        <p>
          Your hashed password:{" "}
          <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-lg">
            {hashed}
          </code>
        </p>
      </div>
    </div>
  );
}

export default BuildPassword;
