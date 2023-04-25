import React from "react";
import styles from "./TransactionCard.module.css";
import { ethers, BigNumberish } from "ethers";
import { Link } from "react-router-dom";
import { Network, getWalletBalance } from "../../utils/api";
interface TransactionCardProps {
  hash: string;
  from: string;
  fromBalance: { _hex: number; _isBigNumber: boolean };
  toBalance: { _hex: number; _isBigNumber: boolean };
  to: string;
  value: { _hex: number; _isBigNumber: boolean };
  network: Network;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  hash,
  from,
  fromBalance,
  toBalance,
  to,
  value,
  network,
}) => {
  const formatValue = (valueHex: BigNumberish) =>
    ethers.utils.formatEther(valueHex);

  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCardContent}>
        <div className={styles.transactionCardRow}>
          <div className={styles.transactionCardLabel}>Hash:</div>
          <div className={styles.transactionCardValue}>
            <Link to={`/transaction-details/${network}/${hash}`}>{hash}</Link>
          </div>
        </div>
        <div className={styles.transactionCardRow}>
          <div className={styles.transactionCardLabel}>From:</div>
          <div className={styles.transactionCardValue}>{from}</div>
        </div>
        <div className={styles.transactionCardRow}>
          <div className={styles.transactionCardLabel}>
            From wallet Balance:
          </div>
          <div className={styles.transactionCardValue}>
            {formatValue(fromBalance._hex)}
            {network === Network.Ethereum ? " ETH" : " MATIC"}
          </div>
        </div>
        <div className={styles.transactionCardRow}>
          <div className={styles.transactionCardLabel}>To:</div>
          <div className={styles.transactionCardValue}>{to}</div>
        </div>
        <div className={styles.transactionCardRow}>
          <div className={styles.transactionCardLabel}>to wallet Balance:</div>
          <div className={styles.transactionCardValue}>
            {formatValue(toBalance._hex)}
            {network === Network.Ethereum ? " ETH" : " MATIC"}
          </div>
        </div>
        <div className={styles.transactionCardRow}>
          <div className={styles.transactionCardLabel}>Value:</div>
          <div className={styles.transactionCardValue}>
            {/* {parseInt(`${value._hex}`)} */}
            {formatValue(value?._hex)}{" "}
            {network === Network.Ethereum ? "ETH" : " MATIC"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
