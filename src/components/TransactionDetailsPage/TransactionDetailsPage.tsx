import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TransactionDetailsPage.module.css";
import { Transaction } from "../TransactionsPage/types";
import { ethers, BigNumberish } from "ethers";
import { Network, getTransaction } from "../../utils/api";

type RouteParams = {
  hash: string;
  network: string;
};

const TransactionDetailsPage: React.FC = () => {
  const { hash, network } = useParams<RouteParams>();
  const [transaction, setTransaction] =
    useState<ethers.providers.TransactionResponse | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const fetchedTransaction = await getTransaction(
        network as Network,
        hash as string
      );
      setTransaction(fetchedTransaction);
    };

    fetchTransaction();
  }, [hash]);
  const formatValue = (valueHex: BigNumberish) =>
    ethers.utils.formatEther(valueHex); //recieved all values in BigNumber. unsure if the polygon values are correct.
  const formatGas = (gasHex: BigNumberish) =>
    ethers.utils.formatUnits(gasHex, "gwei");

  if (!transaction) return null;

  return (
    <div className={styles.transactionDetailsPage}>
      <h1>Transaction Details</h1>
      <div className={styles.transactionDetailSection}>
        <h2 className={styles.transactionDetailHeading}>Basic Information</h2>
        <div className={styles.transactionDetailRow}>
          <span className={styles.transactionDetailLabel}>Transaction ID:</span>
          <span className={styles.transactionDetailValue}>{hash}</span>
        </div>
        <div className={styles.transactionDetailRow}>
          <span className={styles.transactionDetailLabel}>Timestamp:</span>
          <span
            className={styles.transactionDetailValue}
          >{`${transaction.timestamp}`}</span>
        </div>
        <div className={styles.transactionDetailRow}>
          <span className={styles.transactionDetailLabel}>From:</span>
          <span className={styles.transactionDetailValue}>
            {transaction?.from}
          </span>
        </div>
        <div className={styles.transactionDetailRow}>
          <span className={styles.transactionDetailLabel}>To:</span>
          <span className={styles.transactionDetailValue}>
            {transaction?.to || "Contract Creation"}
          </span>
        </div>
        <div className={styles.transactionDetailRow}>
          <span className={styles.transactionDetailLabel}>Value:</span>
          <span className={styles.transactionDetailValue}>
            {formatValue(transaction?.value?._hex as string)}{" "}
            {network === Network.Ethereum ? " ETH" : " MATIC"}
          </span>
        </div>
      </div>
      <div className={styles.transactionDetailSection}>
        <h2 className={styles.transactionDetailHeading}>Gas</h2>
        <div className={styles.transactionDetailRow}>
          <span className={styles.transactionDetailLabel}>Gas Limit:</span>
          <span className={styles.transactionDetailValue}>
            {formatValue(transaction?.gasLimit?._hex as string)}{" "}
            {network === Network.Ethereum ? " ETH" : " MATIC"}
          </span>
        </div>
        <div className={styles.transactionDetailRow}>
          <span className={styles.transactionDetailLabel}>Gas Price:</span>
          <span className={styles.transactionDetailValue}>
            {formatGas(transaction?.gasPrice?._hex as string)} Gwei
          </span>
        </div>
        {transaction?.maxPriorityFeePerGas && (
          <div className={styles.transactionDetailRow}>
            <span className={styles.transactionDetailLabel}>
              Max Priority Fee Per Gas:
            </span>
            <span className={styles.transactionDetailValue}>
              {formatGas(transaction?.maxPriorityFeePerGas?._hex as string)}{" "}
              Gwei
            </span>
          </div>
        )}
        {transaction?.maxFeePerGas && (
          <div className={styles.transactionDetailRow}>
            <span className={styles.transactionDetailLabel}>
              Max Fee Per Gas:
            </span>
            <span className={styles.transactionDetailValue}>
              {formatGas(transaction?.maxFeePerGas?._hex as string)} Gwei
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
