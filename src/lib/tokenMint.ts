import {
  createMint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  Mint,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Cluster,
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
} from "@solana/web3.js";

const validClusters: Cluster[] = ["devnet", "testnet", "mainnet-beta"];
const clusterType = validClusters.includes(process.env.CLUSTER_TYPE as Cluster)
  ? (process.env.CLUSTER_TYPE as Cluster)
  : "devnet";

export const createMintForTokenPayer = async (
  payer: Keypair,
  mintAuthority: Keypair
) => {
  try {
    const connection = new Connection(clusterApiUrl(clusterType));
    const mint = await createMint(
      connection,
      payer,
      mintAuthority.publicKey,
      null,
      0,
      undefined,
      undefined,
      TOKEN_PROGRAM_ID
    );

    console.log(`Mint address: ${mint.toBase58()}`);
    return mint.toBase58();
  } catch (error) {
    console.error(error);
  }
};

export const verifyTokenMint = async (mintAddress: string) => {
  try {
    const connection = new Connection(clusterApiUrl(clusterType));
    const mintPublicKey = new PublicKey(mintAddress);
    const mintInfo: Mint = await getMint(connection, mintPublicKey);

    console.log("Mint Address:", mintAddress);
    console.log("Supply:", mintInfo.supply.toString());
    console.log("Decimals:", mintInfo.decimals);
    console.log(
      "Mint Authority:",
      mintInfo.mintAuthority?.toBase58() || "None"
    );
    console.log(
      "Freeze Authority:",
      mintInfo.freezeAuthority?.toBase58() || "None"
    );
  } catch (error) {
    console.error("Error verifying token mint:", error);
    throw error;
  }
};

export const mintNewTokens = async (
  mint: PublicKey,
  to: string,
  amount: number,
  payer: Keypair
) => {
  const connection = new Connection(clusterApiUrl(clusterType));
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    new PublicKey(to)
  );

  console.log("Token account:", tokenAccount.address.toBase58());

  await mintTo(connection, payer, mint, tokenAccount.address, payer, amount);
  console.log(`Minted ${amount} tokens to ${tokenAccount.address.toBase58()}`);
};
