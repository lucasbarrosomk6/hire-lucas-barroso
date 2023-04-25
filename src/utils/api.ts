import { ethers, providers } from "ethers";

export enum Network {
  Ethereum = "ethereum",
  Polygon = "polygon",
}

const ETHEREUM_RPC_URL = process.env.REACT_APP_ETHEREUM_RPC_URL;
const POLYGON_RPC_URL = process.env.REACT_APP_POLYGON_RPC_URL;
const createProvider = (network: Network) => {
  let provider: providers.JsonRpcProvider;
  if (network === Network.Ethereum) {
    provider = new ethers.providers.JsonRpcProvider(ETHEREUM_RPC_URL);
  } else if (network === Network.Polygon) {
    provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);
  } else {
    throw new Error("Invalid network");
  }
  return provider;
};
export const getLatestTransactions = async (
  network: Network
): Promise<ethers.providers.TransactionResponse[]> => {
  const provider = createProvider(network);

  const blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlockWithTransactions(blockNumber);

  // Fetch wallet balances for all transactions
  const balancePromises = block.transactions.map(async (transaction) => {
    const fromBalance = await provider.getBalance(transaction.from);
    const toBalance = transaction.to
      ? await provider.getBalance(transaction.to)
      : ethers.BigNumber.from(0);

    return {
      fromBalance,
      toBalance,
    };
  });

  //these balances should have been included, this slows down the app significantly
  const balances = await Promise.all(balancePromises);

  // Combine transaction data with balances
  return block.transactions.map((transaction, index) => ({
    ...transaction,
    timestamp: block.timestamp,
    fromBalance: balances[index].fromBalance,
    toBalance: balances[index].toBalance,
  }));
};
export const getTransaction = async (
  network: Network,
  hash: string
): Promise<ethers.providers.TransactionResponse> => {
  const provider = createProvider(network);
  const fetchedTransaction: ethers.providers.TransactionResponse =
    await provider.getTransaction(hash as string);

  const blockNumber = fetchedTransaction.blockNumber;
  const block = await provider.getBlockWithTransactions(blockNumber as number);

  return { ...fetchedTransaction, timestamp: block.timestamp };
};
export const getWalletBalance = async (
  network: Network,
  address: string
): Promise<ethers.BigNumber> => {
  const provider = createProvider(network);
  const balance: ethers.BigNumber = await provider.getBalance(
    address as string
  );

  return balance;
};
