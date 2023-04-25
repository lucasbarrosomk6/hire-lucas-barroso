// src/components/TransactionsPage/TransactionsPage.tsx

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./TransactionsPage.module.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import { Network, getLatestTransactions } from "../../utils/api";

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [network, setNetwork] = useState<Network>(Network.Ethereum);
  useEffect(() => {
    const addTransactions = async () => {
      const latestTransactions = await getLatestTransactions(network);
      setTransactions(latestTransactions);
    };
    addTransactions();
  }, [network]);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNetwork(event.target.value as Network);
  };
  return (
    <div className={styles.transactionsPage}>
      <h1>Transactions</h1>
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={network}
          onChange={handleChange}
        >
          <option value={Network.Ethereum}>Ethereum</option>
          <option value={Network.Polygon}>Polygon</option>
        </select>
        <span className={styles.arrow}>▼</span>
      </div>
      <div className={styles.transactionsList}>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.hash}
            network={network}
            {...transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
