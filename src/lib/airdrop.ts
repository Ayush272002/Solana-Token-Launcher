import {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
  Cluster,
} from "@solana/web3.js";

const validClusters: Cluster[] = ["devnet", "testnet", "mainnet-beta"];
const clusterType = validClusters.includes(process.env.CLUSTER_TYPE as Cluster)
  ? (process.env.CLUSTER_TYPE as Cluster)
  : "devnet";

export const airDrop = async (to: string, amount: number) => {
  try {
    const connection = new Connection(clusterApiUrl(clusterType));
    const airDropSignature = await connection.requestAirdrop(
      new PublicKey(to),
      amount * LAMPORTS_PER_SOL
    );

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airDropSignature,
    });

    console.log(`Airdrop of ${amount} SOL to ${to} completed`);
  } catch (error) {
    console.error(error);
  }
};
