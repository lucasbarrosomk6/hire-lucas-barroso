// types.ts
import { BigNumber } from "ethers";
export type Transaction = {
  hash: string;
  type?: number | null | undefined;
  accessList?: Array<{
    address: string;
    storageKeys: string[];
  }>;
  blockHash?: string;
  blockNumber?: number;
  transactionIndex?: number;
  confirmations: number;
  from: string;
  gasPrice?: BigNumber;
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  gasLimit?: BigNumber;
  to?: string;
  value?: BigNumber;
  nonce: number;
  data: string;
  r?: string;
  s?: string;
  v?: number;
  creates?: string | null;
  chainId: number;
};
