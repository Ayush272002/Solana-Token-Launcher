import { airDrop } from "./lib/airdrop";
import dotenv from "dotenv";
import { checkBalance } from "./lib/checkBalance";
import {
  createMintForTokenPayer,
  mintNewTokens,
  verifyTokenMint,
} from "./lib/tokenMint";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

dotenv.config();

async function main() {
  console.log("Airdropping 0.1 SOL to", process.env.PUBLIC_KEY);
  await airDrop(process.env.PUBLIC_KEY as string, 0.1);
  console.log("==============================================================");

  console.log("Checking balance of", process.env.PUBLIC_KEY);
  await checkBalance(process.env.PUBLIC_KEY as string);
  console.log("==============================================================");

  console.log("Creating token mint");
  const payer = Keypair.fromSecretKey(
    bs58.decode(process.env.PRIVATE_KEY as string)
  );
  const mintAuthority = payer;
  const tokenAddress = await createMintForTokenPayer(payer, mintAuthority);
  console.log("==============================================================");

  if (tokenAddress) {
    console.log("Verifying token mint");
    await verifyTokenMint(tokenAddress);
    console.log(
      "=============================================================="
    );

    console.log("Minting tokens");
    await mintNewTokens(
      new PublicKey(tokenAddress),
      process.env.TO_PUBLIC_KEY as string,
      10,
      payer
    );

    console.log(
      "Checking balance of the receipient",
      process.env.TO_PUBLIC_KEY
    );
    await checkBalance(process.env.TO_PUBLIC_KEY as string);
    console.log(
      "=============================================================="
    );
  }
}

main();
