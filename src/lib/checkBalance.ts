import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Cluster,
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  ParsedAccountData,
  PublicKey,
  TokenAmount,
} from "@solana/web3.js";

const validClusters: Cluster[] = ["devnet", "testnet", "mainnet-beta"];
const clusterType = validClusters.includes(process.env.CLUSTER_TYPE as Cluster)
  ? (process.env.CLUSTER_TYPE as Cluster)
  : "devnet";

export const checkBalance = async (publicKey: string) => {
  try {
    const connection = new Connection(clusterApiUrl(clusterType));
    const balance = await connection.getBalance(new PublicKey(publicKey));
    console.log(`Balance of ${publicKey} is ${balance / LAMPORTS_PER_SOL} SOL`);

    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(publicKey),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    console.log(`Token balances of ${publicKey}:`);
    for (const tokenAccount of tokenAccounts.value) {
      const accountInfo = await connection.getParsedAccountInfo(
        tokenAccount.pubkey
      );

      const data = accountInfo.value?.data as ParsedAccountData | undefined;
      if (data?.parsed) {
        const tokenAmount: TokenAmount = data.parsed.info.tokenAmount;
        const tokenMint = data.parsed.info.mint;

        const amount = tokenAmount.uiAmount;
        const decimals = tokenAmount.decimals;

        console.log(`- Token Address: ${tokenMint}`);
        console.log(`  Balance: ${amount} (Decimals: ${decimals})`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
